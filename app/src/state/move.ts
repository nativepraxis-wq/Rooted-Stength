import { useStore } from './store';
import {
  goalScreenMap, goalScreenLabel, obGoals, obDayDefs, sessionMeta,
} from '../data/content';

/*
  Shared behaviour for the Move surfaces.

  Every session screen ends in the same control: mark it complete, or undo it.
  That control writes a real `move` log entry, which is what Today, the elder
  dose meter and the weekly counts all read from — so nothing on these screens
  is a decorative counter.
*/

export type SessionCard = {
  label: string;
  logged: boolean;
  onClick: () => void;
};

/* Marks / unmarks a named session for today. */
export function useSession(name: string, meta: string): SessionCard {
  const { state, pushLog, removeLog } = useStore();
  const hit = (state.logs as any[]).find(
    (l) => l.kind === 'move' && l.d === 0 && l.name === name);

  return {
    logged: !!hit,
    label: hit ? 'Logged today ✓ — tap to undo' : 'Mark this session complete',
    onClick: () => {
      if (hit) removeLog(hit.id);
      else {
        pushLog({
          kind: 'move', name, meta,
          toast: name.split(/[—:]/)[0].trim() + ' logged',
        });
      }
    },
  };
}

/*
  How much load the user's work already supplies, derived from ob1's "Your days
  involve" answer. Only meaningful when obDaysSet is true - obDays has no default,
  and an unanswered question must not be read as "light".

  Two things this deliberately does NOT do.

  It does not touch `moved`. That counts real logged sessions and nothing else.
  Crediting assumed work days as logged training would invent entries the user
  never made, and would have the Move hub romanticising labour on the very screen
  that promises not to.

  It does not lower the elder Minimum effective dose. That 2-a-week figure sits
  under a cited claim - 3-8% muscle loss per decade, resistance training the only
  proven reversal - and manual work is not resistance training. Shovelling and
  carrying do not supply progressive loading, so "you farm, therefore one session
  is enough" is a health claim this app cannot support. Heavy work changes how
  much MORE the app asks for, never the floor underneath it.
*/
const WORK_LOAD: Record<string, 'heavy' | 'moderate' | 'light' | 'variable'> = {
  farm5: 'heavy',
  trades: 'heavy',
  farm3: 'moderate',
  onfeet: 'moderate',
  desk: 'light',
  none: 'light',
  mixed: 'variable',
};

/*
  Movement over the last seven days, plus the goal-derived session the Move hub
  offers to start. The goal comes from onboarding, so changing it in the profile
  changes what this screen leads with.
*/
export function useMoveStats() {
  const { state, proteinTarget } = useStore();
  const logs = state.logs as any[];
  const moved = logs.filter((l) => l.kind === 'move' && l.d < 7).length;
  const target = proteinTarget();

  const goalLabel = (obGoals as any[]).find((g) => g.id === state.obGoal)?.label || '';
  const goal2Label = (obGoals as any[]).find((g) => g.id === state.obGoal2)?.label || '';

  const daysSet = !!state.obDaysSet;
  const workLoad = daysSet ? (WORK_LOAD[state.obDays as string] || null) : null;
  const workLabel = daysSet
    ? ((obDayDefs as any[]).find((d) => d.id === state.obDays)?.label || '')
    : '';

  /*
    Only heavy work steps the offer down, and only for the strength-shaped goals.
    Someone doing trades all week whose goal is already mobility is being offered
    the lighter session anyway, so there is nothing to step down from.
  */
  const heavyGoal = state.obGoal === 'muscle' || state.obGoal === 'strength'
    || state.obGoal === 'farm';
  const deloadSuggested = workLoad === 'heavy' && heavyGoal;

  const loadNote = !daysSet
    ? ''
    : deloadSuggested
      ? 'Your days already carry heavy load, so the matching session below is '
        + 'mobility rather than another heavy lift. The strength work is still '
        + 'here when you want it.'
      : workLoad === 'heavy'
        ? 'Your days already carry heavy load. Treat this session as additional '
          + 'to that work.'
        : workLoad === 'moderate'
          ? 'Your days carry some load already. Pace this against the work week '
            + 'you are actually having.'
          : workLoad === 'variable'
            ? 'Your work load changes week to week. Pace this against the week '
              + 'you are actually having.'
            : '';

  return {
    moved,
    movedWeekLabel: moved + ' of the last 7 days moved',
    /*
      goalRoute and goalSessionLabel below fall back to a default so Move always
      has something to offer. goalSet says whether that default is the user's
      actual answer — only it may be described as "your goal".
    */
    goalSet: !!state.obGoalSet,
    goalLabel,
    goal2Label,

    /*
      Work load, from ob1. daysSet gates all of these exactly as goalSet gates
      the goal: an unanswered question is not an answer.
    */
    daysSet,
    workLoad,
    workLabel,
    deloadSuggested,
    loadNote,
    /*
      Which session screen the current goal points at. Heavy work steps this down
      to mobility - the adjustment ob1's "plans adjust so you are not overworked
      on farm days" actually promises. What is OFFERED changes; what is counted
      does not.
    */
    goalRoute: deloadSuggested
      ? 'mobility'
      : ((goalScreenMap as any)[state.obGoal] || 'farm'),
    goalSessionLabel: deloadSuggested
      ? 'Mobility & joint reset'
      : ((goalScreenLabel as any)[state.obGoal] || 'Farm-Strength: Push & Carry'),

    /*
      The offered session's own meta line, or '' where that screen has no single
      session - trainPlan and pregnancy. Callers must omit rather than invent.
    */
    goalSessionMeta: (sessionMeta as any)[
      deloadSuggested ? 'mobility' : ((goalScreenMap as any)[state.obGoal] || 'farm')
    ] || '',

    /*
      Elder strength measures against a stated minimum — two sessions a week —
      rather than an open-ended streak. The line says where you actually are.
    */
    elderSessionLine: moved >= 2
      ? 'You have logged ' + moved + ' sessions in the last 7 days — past the 2-a-week minimum below.'
      : moved === 1
        ? 'One session logged in the last 7 days. The minimum below is two.'
        : 'No sessions logged in the last 7 days. Start with one.',
    elderBarW: Math.round(Math.min(1, moved / 3) * 100) + '%',
    elderBarMet: moved >= 2,
    elderProteinLine: 'Your profile targets ' + target + 'g of protein a day — about '
      + Math.round(target / 4) + 'g across four plates, each with enough leucine to trigger repair.',
  };
}
