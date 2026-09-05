import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
  type ReactNode,
} from 'react';
import { initialState } from '../data/initialState';
import { load, save, clear as clearStored } from './persist';
/*
  A named import, not a namespace one.

  This was `import * as C`, used for exactly one export out of a 292 KB module.

  Changed on the theory that a namespace object asks the bundler to keep every
  export reachable. Measured before and after: the bundle came out BYTE
  IDENTICAL - same hash, 1,104.95 KB either way. Rollup was already resolving
  the static property access and shaking the rest.

  Kept because one named import reads better than a namespace alias used once.
  It is not a payload win, and this note is here so the theory does not get
  re-derived by someone expecting one.
*/
import { a11yMeta } from '../data/content';
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
  /** Erase everything stored on this device and return to first run. */
  forget: () => void;
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
  /*
    Saved state merged over the seed. `profileReturn` is forced null afterwards
    because it is a "where to go back to" marker - restoring one would send a
    returning reader to a screen they never asked for.

    load() runs inside the initialiser, so once per mount rather than on every
    render, and it never throws. Under renderToStaticMarkup there is no
    localStorage, so the h1 and contrast gates keep rendering the seed and stay
    deterministic.
  */
  const [state, setState] = useState<AppState>(
    () => ({ ...(load() as unknown as AppState), profileReturn: null }),
  );
  const hist = useRef<Route[]>([]);
  const scroller = useRef<HTMLDivElement | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  /*
    Write on change, coalesced. Toggling a chip fires several updates in a row,
    and each one would otherwise be its own JSON.stringify plus a synchronous
    localStorage write on the main thread.
  */
  const saveTimer = useRef<number | undefined>(undefined);

  /*
    Set while a deliberate erase is in flight.

    Without it, "forget everything" did not: clear() removed the record, the
    reset then counted as a state change, and the debounced save wrote a fresh
    file 250ms later. Storage came back on its own and the button silently lied.
    Verified in the browser - stored before: true, stored after: true.

    One skip is enough. Whatever the reader does next is a real change and is
    saved normally, which is what should happen once they are using the app
    again.
  */
  const skipSave = useRef(false);

  useEffect(() => {
    if (saveTimer.current !== undefined) window.clearTimeout(saveTimer.current);
    if (skipSave.current) {
      skipSave.current = false;
      return undefined;
    }
    saveTimer.current = window.setTimeout(() => {
      save(state as unknown as Record<string, unknown>);
    }, 250);
    return () => {
      if (saveTimer.current !== undefined) window.clearTimeout(saveTimer.current);
    };
  }, [state]);

  /*
    Erase what is on the device and return to the first-run state.

    This lives in the store rather than on the Privacy screen because clearing
    storage and resetting state have to happen together, with the save
    suppressed between them. A screen doing it by hand would hit the bug above.
  */
  const forget = useCallback(() => {
    skipSave.current = true;
    clearStored();
    if (saveTimer.current !== undefined) window.clearTimeout(saveTimer.current);
    hist.current = [];
    setState({ ...initialState, profileReturn: null } as AppState);
  }, []);

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
    state, set, forget, go, goBack, canGoBack: hist.current.length > 0,
    toast, pushLog, removeLog, restockPantry, dayName, proteinTarget, cupsOn,
    scrollTop, registerScroller,
  }), [state, set, forget, go, goBack, toast, pushLog, removeLog, restockPantry, dayName,
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
  return { a11y: state.a11y as Record<string, boolean>, toggle, meta: a11yMeta as Record<string, any> };
}
