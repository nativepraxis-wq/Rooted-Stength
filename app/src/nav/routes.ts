/*
  The 86 routes, and the tab each one lights up. Route names and groupings are
  taken from the prototype, not paraphrased — `pantry` (inventory) and
  `pantryCodex` (the ingredient codex) are deliberately distinct and were
  collided once during design; keep them apart.
*/

export const ROUTES = [
  'welcome', 'ob1', 'ob2', 'ob3', 'consent', 'obHerb', 'obRecap', 'profile',
  'today', 'nourish', 'scan', 'detected', 'hidden', 'report', 'recipe', 'recipeDetail',
  'mealPlan', 'pantry', 'grocery', 'planGrocery', 'barcode', 'voice', 'restaurant', 'order',
  'move', 'farm', 'explore', 'crop', 'map', 'journey', 'progress', 'history',
  'sugarMeal', 'breath', 'hike', 'elder', 'ancestral', 'forage', 'sources', 'a11y',
  'privacy', 'dataSov', 'membership', 'community', 'seasonal', 'minerals', 'hydration', 'filters',
  'sleep', 'mobility', 'seated', 'apothecary', 'teaIntel', 'warrior', 'coconut', 'honey',
  'shroomRecipes', 'nervines', 'waterMed', 'sovereignty', 'ferment', 'diabetes', 'ceremony', 'swaps',
  'frequencies', 'mushrooms', 'microgreens', 'croplib', 'variety', 'garden', 'family', 'intimacy',
  'pregnancy', 'admin', 'exercise', 'trainPlan', 'pairings', 'codex', 'fusion', 'pantryCodex',
  'pantryVol', 'codexRegion', 'budget', 'smoothies', 'smoothieBuilder', 'vault',
] as const;

export type Route = (typeof ROUTES)[number];

/* Onboarding hides the tab bar and the Council FAB, and stays out of history. */
export const OB_ROUTES: string[] = ['welcome', 'ob1', 'ob2', 'ob3', 'obHerb', 'consent', 'obRecap'];

export const showChrome = (r: string) => !OB_ROUTES.includes(r);

/* Which routes belong to which tab, ported from the prototype's groupings. */
const TODAY = ['today', 'hydration', 'filters', 'garden'];

const NOURISH = [
  'nourish', 'scan', 'detected', 'hidden', 'report', 'recipe', 'recipeDetail', 'mealPlan',
  'pantry', 'grocery', 'planGrocery', 'barcode', 'voice', 'pairings', 'sugarMeal', 'smoothies',
  'smoothieBuilder', 'budget', 'microgreens', 'family', 'croplib', 'variety',
];

const MOVE = [
  'move', 'farm', 'breath', 'hike', 'elder', 'ancestral', 'exercise', 'trainPlan',
  'warrior', 'mobility', 'seated',
];

const EXPLORE = [
  'explore', 'crop', 'map', 'restaurant', 'order', 'forage', 'community', 'seasonal',
  'minerals', 'apothecary', 'teaIntel', 'nervines', 'waterMed', 'swaps', 'ferment', 'diabetes',
  'ceremony', 'frequencies', 'coconut', 'honey', 'shroomRecipes', 'mushrooms', 'codex',
  'codexRegion', 'fusion', 'pantryCodex', 'pantryVol',
];

const JOURNEY = [
  'journey', 'vault', 'sources', 'a11y', 'privacy', 'membership', 'pregnancy', 'admin',
  'sleep', 'intimacy', 'sovereignty', 'diabetes', 'profile', 'progress', 'history', 'dataSov',
];

export type TabId = 'today' | 'nourish' | 'move' | 'explore' | 'journey';

export const TAB_ROUTES: Record<TabId, string[]> = {
  today: TODAY, nourish: NOURISH, move: MOVE, explore: EXPLORE, journey: JOURNEY,
};

export const TABS: { id: TabId; label: string; route: Route }[] = [
  { id: 'today', label: 'Today', route: 'today' },
  { id: 'nourish', label: 'Nourish', route: 'nourish' },
  { id: 'move', label: 'Move', route: 'move' },
  { id: 'explore', label: 'Explore', route: 'explore' },
  { id: 'journey', label: 'Journey', route: 'journey' },
];

export const activeTab = (r: string): TabId | null =>
  (Object.keys(TAB_ROUTES) as TabId[]).find((t) => TAB_ROUTES[t].includes(r)) ?? null;

/*
  Section accent, used for card stripes, chips and headers. The tab bar itself
  uses a single active colour (see TabBar) — that is the prototype's behaviour
  and differs from the README's description; see docs/DISCREPANCIES.md.
*/
export const SECTION_COLOR: Record<TabId, string> = {
  today: 'var(--forest)',
  nourish: 'var(--clay)',
  move: 'var(--teal)',
  explore: 'var(--earth)',
  journey: 'var(--plum)',
};
