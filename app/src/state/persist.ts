/*
  Persistence — the first place this app has ever kept anything.

  Until now nothing survived a refresh. Onboarding answers, allergy
  restrictions, logged plates, accessibility settings: all of it was in-memory
  React state, and reloading put you back as Amara on day one.

  ─────────────────────────────────────────
  AN ALLOWLIST, NOT A DENYLIST

  State has 100 top-level keys, and they are three different things mixed
  together: what the user has told us and accumulated, where they happen to be
  standing, and what is open or half-typed at this instant.

  Only the first kind is written to disk. DURABLE below is that list, and it is
  an ALLOWLIST on purpose:

    - A key added later is ephemeral until someone deliberately adds it here.
      A denylist would do the opposite and leak every new field by default.
    - The Privacy screen promises "Data minimization — we collect only what
      personalizes your plan." An allowlist is that sentence written as code,
      and it can be read and audited in one place.

  The test for durability: would the user be annoyed to lose it? A logged plate,
  a nut allergy, a text-size setting - yes. Which tab was open, which card was
  selected, a half-written note, a toast - no. Restoring someone into a modal
  they had closed is not persistence, it is a bug.

  ─────────────────────────────────────────
  WHAT THIS DELIBERATELY DOES NOT CLAIM

  localStorage is not encrypted. It is origin-scoped and device-local, which
  means another site cannot read it, but anything running on this origin can,
  and so can anyone with the unlocked device.

  The Privacy screen currently promises "Encrypted at rest & in transit —
  health records are sealed end-to-end." Before this file existed there was
  nothing at rest and nothing in transit, so the sentence described nothing.
  There is now something at rest, and it is not encrypted. That is recorded in
  docs/DISCREPANCIES.md as needing an editorial decision rather than quietly
  left to drift, because on this app that sentence is a promise and not a
  feature blurb.
*/
import { initialState } from '../data/initialState';

const KEY = 'rooted-strength/state';

/*
  Bumping this discards everything stored under an older shape rather than
  trying to reconcile it. At this stage a clean seed is a better outcome for a
  reader than a half-migrated profile, and it is honest about what happened.
*/
const VERSION = 1;

/**
 * The keys that survive a reload.
 *
 * Grouped by what they are rather than alphabetically, so that adding to the
 * wrong group is visible in review.
 */
export const DURABLE: readonly string[] = [
  /* Who the user said they are. Entered by hand at intake. */
  'obName', 'obPronoun', 'obGoal', 'obGoal2', 'obGoalSet', 'obDays', 'obDaysSet',
  'obTrad',

  /*
    Restrictions and consent. `obRestr` drives the allergen checks, so losing it
    silently is a safety matter, not an inconvenience.
  */
  'obRestr', 'consent', 'vaultPerm', 'intimacyShare', 'dsDeviceOnly', 'dsRegion',

  /* Accessibility. Losing these on every reload would make the app unusable
     for exactly the people the settings exist for. */
  'a11y', 'a11ySize',

  /* What they have done: the log set every figure on Today is computed from. */
  'logs', 'councilThread',

  /* Kitchen and pantry state the user maintains by hand. */
  'pantryOff', 'pantryRestock', 'got', 'planGot', 'order', 'seedCart', 'hidden',

  /* Things they saved on purpose. */
  'savedSmoothies', 'savedBrews',

  /* Growing and tending, which accumulate over days. */
  'fermJars', 'sownTrays', 'tended', 'watered', 'plantsEaten', 'hydrationCups',

  /* Money and plan. */
  'weeklyBudget', 'plan', 'billing',

  /* Community commitments. */
  'rsvp', 'approved',

  /*
    Standing preferences. These read as navigation but are not: they are the
    user saying which place and which way of eating are theirs, and they should
    not reset to Connecticut every morning.
  */
  'bioregion', 'forageRegion', 'recipeMode',

  /*
    Pregnancy context. Personal health information the user set deliberately;
    `pregStep` is excluded because it is a position within the flow.
  */
  'pregStage', 'pregClinician',
];

const DURABLE_SET = new Set(DURABLE);

export type Stored = { v: number; s: Record<string, unknown> };

/** Everything worth keeping, and nothing else. */
export function pick(state: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const k of DURABLE) if (k in state) out[k] = state[k];
  return out;
}

/**
 * The saved state merged over the seed, or the seed alone.
 *
 * Never throws. A browser with storage disabled, a private window, a blob left
 * by an older version, or JSON someone edited by hand all land in the same
 * place: the app starts on the seed rather than showing a white screen.
 */
export function load(): Record<string, unknown> {
  const seed = initialState as unknown as Record<string, unknown>;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...seed };
    const parsed = JSON.parse(raw) as Stored;
    if (!parsed || parsed.v !== VERSION || typeof parsed.s !== 'object') {
      return { ...seed };
    }
    const saved: Record<string, unknown> = {};
    /*
      Read through the allowlist rather than trusting the file. A key that has
      since been removed from DURABLE stays out even if an old blob still
      carries it, so shrinking the list actually shrinks what is restored.
    */
    for (const k of DURABLE) {
      if (k in parsed.s && parsed.s[k] !== undefined) saved[k] = parsed.s[k];
    }
    /*
      `route` is not stored, so it falls back to the seed's 'welcome'. For
      somebody who has been here before that is wrong in the other direction:
      the welcome screen is a first-run screen, and meeting it on every launch
      would read as the app having forgotten them - which is the exact problem
      persistence was added to fix.

      So a returning reader opens on Today. Not the screen they happened to
      leave from, which would drop them into a half-finished settings flow, but
      the app's own front door. Onboarding is still reachable from the profile.
    */
    return { ...seed, ...saved, route: 'today' };
  } catch {
    return { ...seed };
  }
}

/** Write the durable subset. Silent on failure - a full disk must not break the app. */
export function save(state: Record<string, unknown>): void {
  try {
    const payload: Stored = { v: VERSION, s: pick(state) };
    localStorage.setItem(KEY, JSON.stringify(payload));
  } catch {
    /* Private windows and quota errors throw here. Losing a write is survivable;
       taking the app down over one is not. */
  }
}

/**
 * Forget everything.
 *
 * Persistence without deletion would be the wrong half to ship on an app whose
 * Privacy screen says "everything here is granular and reversible."
 */
export function clear(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* nothing to do */
  }
}

/** Whether anything is stored — for a settings screen to say so honestly. */
export function hasStored(): boolean {
  try {
    return localStorage.getItem(KEY) !== null;
  } catch {
    return false;
  }
}
