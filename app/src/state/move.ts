import { useStore } from './store';
import { goalScreenMap, goalScreenLabel, obGoals } from '../data/content';

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
    /* Which session screen the current goal points at. */
    goalRoute: (goalScreenMap as any)[state.obGoal] || 'farm',
    goalSessionLabel: (goalScreenLabel as any)[state.obGoal] || 'Farm-Strength: Push & Carry',

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
