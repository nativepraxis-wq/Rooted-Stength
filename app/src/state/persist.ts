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
  /* Who the user said they are. Entered by hand at intake. `sample` records
     whether the history is still the demonstration person's - see sample.ts. */
  'sample', 'obName', 'obPronoun', 'obGoal', 'obGoal2', 'obGoalSet', 'obDays', 'obDaysSet',
  'obTrad',

  /*
    Restrictions and consent. `obRestr` drives the allergen checks, so losing it
    silently is a safety matter, not an inconvenience.
  */
  'obRestr', 'consent', 'vaultPerm', 'intimacyShare', 'dsDeviceOnly', 'dsRegion',

  /*
    Herb safety from intake: pregnant or nursing, blood-pressure medication,
    blood thinners. These put the "hold" flags on brews in teaIntel and the
    pregnancy notes in sleep.

    MISSING from the first version of this list. A reader who said they were
    pregnant had that forgotten on the next reload, and every brew traditionally
    avoided in pregnancy went back to being shown unflagged - silently, on the
    one surface that promised "never silently removed". Found by classifying
    every key rather than listing the ones that came to mind; the `durable` gate
    now makes that classification mandatory.
  */
  'teaSafety',

  /* Clearing the transfer ledger is a deliberate act. Without this it came
     back on reload, which is the forget() bug again in a smaller place. */
  'dsPurged',

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

  /* Checklists the reader keeps ticking over days: sleep habits and the hike
     pack list. Neither is seeded - both are first written by a tap. */
  'sleepHabit', 'hikeChecked',

  /* Money and plan. `spentAdd` is money the reader entered as spent this week;
     losing it would quietly put the budget back in credit. */
  'weeklyBudget', 'plan', 'billing', 'spentAdd',

  /* Community commitments. */
  'rsvp', 'approved',

  /*
    Standing preferences. These read as navigation but are not: they are the
    user saying which place and which way of eating are theirs, and they should
    not reset to Connecticut every morning.
  */
  'bioregion', 'forageRegion', 'recipeMode',

  /*
    The chosen frequency band. ob2 writes it from the goal, so the seed's
    invariant is freqBand === goalFreqMap[obGoal]. With obGoal durable and this
    not, every reload broke that invariant: the goal came back, the band reset
    to 'grounding'.
  */
  'freqBand',

  /*
    Pregnancy context. Personal health information the user set deliberately;
    `pregStep` is excluded because it is a position within the flow.
  */
  'pregStage', 'pregClinician',
];

/**
 * The keys that deliberately do NOT survive a reload.
 *
 * Nothing reads this at runtime - DURABLE alone decides what is saved. It exists
 * so that every key is a decision somebody made. `npm run durable` fails when a
 * seeded or set() key appears in neither list, so a new field cannot default to
 * forgotten without anyone choosing that.
 */
export const EPHEMERAL: readonly string[] = [
  /* Where the reader is standing. */
  'route', 'profileReturn', 'pregStep', 'mealDay', 'trainDay', 'seasonIdx', 'sourceFocus',

  /* Which item a detail screen is showing - set by the tap that opens it. */
  'codexId', 'pantryId', 'plateId', 'plateRelaxed', 'cropId', 'restId', 'familyId',
  'sovSystem', 'warriorId', 'greenId', 'libId', 'shroomRecipeId', 'exMove', 'exVariant',
  'matrixDim',

  /* Which tab of a guide is open. */
  'teaGoal', 'coconutUse', 'honeyUse', 'nervineUse', 'waterUse', 'swapUse', 'fermUse',
  'dbUse', 'cerUse', 'histFilter', 'libFilter', 'libQuery',

  /* Open, half-typed, or showing for a moment. */
  'noteOpen', 'noteDraft', 'councilOpen', 'councilDraft', 'logToast', 'toastLabel', 'toastTo',
  'sbToast', 'shareSmoothie', 'shareCopied', 'expenseOpen', 'expenseCat', 'expenseAmt',
  'resetOpen', 'resetDone',

  /*
    A flow in progress. The scan chain and the voice/barcode captures describe
    one plate being logged; the smoothie builder is a draft until saved, and
    saving writes savedSmoothies. The fusion check is answered per recipe.
  */
  'scanFromUpload', 'scanDrop', 'scanAlt', 'bcFound', 'voiceHeard', 'sb', 'fusionChecks',

  /* Cycles so results do not repeat early; a fresh cycle after reload is fine. */
  'genIdx',
];

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

/*
  ─────────────────────────────────────────
  WHETHER THE BROWSER WILL KEEP IT

  Saving to localStorage is not the same as keeping. By default a browser
  stores it "best-effort": it may clear the data by itself under storage
  pressure. Safari goes further and deletes script-written storage "after seven
  days of Safari use without user interaction on the site" (WebKit blog 10218).
  Home-screen web apps are exempt in practice - WebKit gives them their own
  counter that only advances on days the app is actually used.

  persist() changes the first of those. Chrome and Safari grant or refuse it
  silently from the reader's history with the site; Firefox asks (MDN, "Storage
  quotas and eviction criteria"). A refusal is normal, not an error.

  A reader who logged for a month and lost it to eviction would have been told,
  by this app, that it was "stored in this browser, on this device". True at the
  time; not a promise the app could keep. So the Privacy screen asks the browser
  and says what it answered, rather than implying permanence.

  persist() is requested only from a button. Firefox shows a permission prompt
  for it, and a prompt on first launch, before the reader knows what the app
  keeps, is the wrong moment to ask.
*/

export type Keeping = 'persisted' | 'best-effort' | 'unknown';

/** What the browser has agreed to. Never throws; 'unknown' where unsupported. */
export async function keeping(): Promise<Keeping> {
  try {
    if (typeof navigator === 'undefined' || !navigator.storage?.persisted) return 'unknown';
    return (await navigator.storage.persisted()) ? 'persisted' : 'best-effort';
  } catch {
    return 'unknown';
  }
}

/** Ask the browser to exempt this app's storage from eviction. */
export async function askToKeep(): Promise<Keeping> {
  try {
    if (typeof navigator === 'undefined' || !navigator.storage?.persist) return 'unknown';
    return (await navigator.storage.persist()) ? 'persisted' : 'best-effort';
  } catch {
    return 'unknown';
  }
}

/** Opened from the home screen rather than a browser tab. */
export function installed(): boolean {
  try {
    return window.matchMedia('(display-mode: standalone)').matches
      || (navigator as Navigator & { standalone?: boolean }).standalone === true;
  } catch {
    return false;
  }
}

/*
  ─────────────────────────────────────────
  TAKING IT WITH YOU

  The Privacy screen says, accurately, that "nothing is recoverable if you lose
  the phone." That is the honest consequence of keeping everything on the device
  and hosting nothing - but on a health app it also means a cleared browser or a
  new phone silently costs someone every plate, session and lab value they have
  logged.

  So the data has to be able to leave when its owner says so. Not to a server:
  to a file they hold.

  The export is built from the SAME DURABLE allowlist as the save. There is no
  second list to drift, and a reader can satisfy themselves that the file
  contains exactly what the app kept and nothing it did not.
*/

export type ExportFile = Stored & { app: string; exportedAt: string };

const APP_TAG = 'rooted-strength';

/** The stored state as a file the reader keeps. */
export function exportFile(state: Record<string, unknown>): Blob {
  const payload: ExportFile = {
    app: APP_TAG,
    v: VERSION,
    exportedAt: new Date().toISOString(),
    s: pick(state),
  };
  return new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
}

/** `rooted-strength-2026-09-05.json` */
export function exportName(): string {
  return APP_TAG + '-' + new Date().toISOString().slice(0, 10) + '.json';
}

export type ImportResult =
  | { ok: true; data: Record<string, unknown>; keys: number }
  | { ok: false; reason: string };

/**
 * Read a file back.
 *
 * Everything is checked and nothing is trusted. The file is JSON somebody may
 * have edited, moved between versions, or picked by mistake, so it is told
 * apart from an arbitrary .json before any of it reaches app state - and it is
 * read THROUGH the allowlist, so a key that is not durable cannot be injected
 * by editing the file.
 */
export function parseImport(text: string): ImportResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, reason: 'That file is not JSON.' };
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { ok: false, reason: 'That file is not a Rooted Strength export.' };
  }
  const f = parsed as Partial<ExportFile>;
  if (f.app !== APP_TAG) {
    return { ok: false, reason: 'That file was not exported by Rooted Strength.' };
  }
  if (f.v !== VERSION) {
    return {
      ok: false,
      reason: 'That export is from a different version of the app (' + String(f.v) + ').',
    };
  }
  if (!f.s || typeof f.s !== 'object') {
    return { ok: false, reason: 'That export has no data in it.' };
  }
  const data: Record<string, unknown> = {};
  for (const k of DURABLE) {
    if (k in f.s && (f.s as Record<string, unknown>)[k] !== undefined) {
      data[k] = (f.s as Record<string, unknown>)[k];
    }
  }
  if (!Object.keys(data).length) {
    return { ok: false, reason: 'That export contained nothing this version keeps.' };
  }
  return { ok: true, data, keys: Object.keys(data).length };
}
