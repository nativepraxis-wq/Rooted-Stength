import {
  createContext, useCallback, useContext, useMemo, useRef, useState,
  type ReactNode,
} from 'react';
import { initialState } from '../data/initialState';
import * as C from '../data/content';
import { OB_ROUTES, type Route } from '../nav/routes';

/*
  The prototype held one flat state object on a single component. That shape is
  kept deliberately — the screens' logic is ported from it and a premature
  normalisation would be a second translation to get wrong. What changes here is
  that navigation history is a real stack and the accessibility flags drive
  document attributes rather than a CSS filter.
*/
export type AppState = Record<string, any>;
type Updater = Partial<AppState> | ((s: AppState) => Partial<AppState>);

type Store = {
  state: AppState;
  set: (u: Updater) => void;
  go: (route: Route) => void;
  goBack: () => void;
  canGoBack: boolean;
  toast: (msg: string, label?: string, to?: Route) => void;
  pushLog: (entry: Record<string, any>) => void;
  removeLog: (id: string) => void;
  restockPantry: (pid: string, on: boolean) => void;
  dayName: (d: number) => string;
  proteinTarget: () => number;
  cupsOn: (d: number) => number;
  scrollTop: () => void;
  registerScroller: (el: HTMLDivElement | null) => void;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => ({ ...initialState, profileReturn: null }));
  const hist = useRef<Route[]>([]);
  const scroller = useRef<HTMLDivElement | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  const set = useCallback((u: Updater) => {
    setState((s) => ({ ...s, ...(typeof u === 'function' ? u(s) : u) }));
  }, []);

  const scrollTop = useCallback(() => {
    if (scroller.current) scroller.current.scrollTop = 0;
  }, []);

  const registerScroller = useCallback((el: HTMLDivElement | null) => {
    scroller.current = el;
  }, []);

  /*
    Push the route we are leaving onto the stack. Onboarding routes stay out of
    history so that finishing onboarding and pressing back does not walk the
    user back through the questions.
  */
  const go = useCallback((route: Route) => {
    setState((s) => {
      if (s.route !== route && !OB_ROUTES.includes(s.route)) {
        hist.current = hist.current.concat([s.route as Route]).slice(-30);
      }
      return { ...s, route, councilOpen: false };
    });
    scrollTop();
  }, [scrollTop]);

  const goBack = useCallback(() => {
    setState((s) => {
      const h = hist.current.slice();
      let prev = h.pop();
      while (prev && (prev === s.route || (OB_ROUTES.includes(prev) && !OB_ROUTES.includes(s.route)))) {
        prev = h.pop();
      }
      hist.current = h;
      return { ...s, route: prev || 'today', councilOpen: false };
    });
    scrollTop();
  }, [scrollTop]);

  const toast = useCallback((msg: string, label?: string, to?: Route) => {
    setState((s) => ({ ...s, logToast: msg, toastLabel: label || 'View', toastTo: to || 'history' }));
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(
      () => setState((s) => ({ ...s, logToast: '' })),
      2600,
    );
  }, []);

  const pushLog = useCallback((entry: Record<string, any>) => {
    const e = {
      id: 'L' + Date.now() + '-' + Math.round(Math.random() * 999),
      d: 0,
      t: 'just now',
      ...entry,
    };
    setState((s) => ({ ...s, logs: [e].concat(s.logs) }));
    toast(entry.toast || 'Logged', 'View', 'history');
  }, [toast]);

  const removeLog = useCallback((id: string) => {
    setState((s) => ({ ...s, logs: s.logs.filter((l: any) => l.id !== id) }));
  }, []);

  /*
    Restocking marks an item as full again and clears any "cooked to empty"
    override, so the pantry and the grocery list stay in agreement.
  */
  const restockPantry = useCallback((pid: string, on: boolean) => {
    setState((s) => {
      const pr = { ...s.pantryRestock };
      const po = { ...s.pantryOff };
      if (on) { pr[pid] = true; po[pid] = true; } else { delete pr[pid]; delete po[pid]; }
      return { ...s, pantryRestock: pr, pantryOff: po };
    });
  }, []);

  const dayName = useCallback((d: number) => {
    if (d === 0) return 'Today';
    if (d === 1) return 'Yesterday';
    const names = ['Tuesday', 'Monday', 'Sunday', 'Saturday', 'Friday', 'Thursday', 'Wednesday'];
    const n = names[d % 7];
    return d >= 7 ? n + ' · last week' : n;
  }, []);

  const proteinTarget = useCallback(() => {
    const byGoal: Record<string, number> = {
      muscle: 130, strength: 130, recomp: 125, postpartum: 125, farm: 120,
      hike: 115, elder: 110, vitality: 110, mobility: 105, return: 105,
    };
    return byGoal[state.obGoal] || 115;
  }, [state.obGoal]);

  const cupsOn = useCallback((d: number) => {
    if (d === 0) return state.hydrationCups;
    const w = state.logs.find((l: any) => l.kind === 'water' && l.d === d);
    return w ? w.cups : 0;
  }, [state.hydrationCups, state.logs]);

  const value = useMemo<Store>(() => ({
    state, set, go, goBack, canGoBack: hist.current.length > 0,
    toast, pushLog, removeLog, restockPantry, dayName, proteinTarget, cupsOn,
    scrollTop, registerScroller,
  }), [state, set, go, goBack, toast, pushLog, removeLog, restockPantry, dayName,
    proteinTarget, cupsOn, scrollTop, registerScroller]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useStore must be used inside <StoreProvider>');
  return v;
}

/* Convenience: the accessibility flag block, read by many surfaces. */
export function useA11y() {
  const { state, set } = useStore();
  const toggle = useCallback(
    (key: string) => set((s) => ({ a11y: { ...s.a11y, [key]: !s.a11y[key] } })),
    [set],
  );
  return { a11y: state.a11y as Record<string, boolean>, toggle, meta: C.a11yMeta as Record<string, any> };
}
