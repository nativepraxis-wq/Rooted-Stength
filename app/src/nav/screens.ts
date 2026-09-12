/*
  The screen table — which module every route's screen lives in.

  ─────────────────────────────────────────
  WHY THIS EXISTS

  App.tsx used to import all 86 screens statically. The whole app, and every
  depth module those screens pull in, shipped as one 1.1 MB chunk that a phone
  had to download, parse and evaluate before it could draw Today.

  Now each screen module is loaded when a route in it is first opened. The same
  table serves two consumers that need opposite things:

    - the app, which wants each screen LAZY (see lazyScreens below)
    - the SSR gates (h1, contrast-ssr, sample-leak), which render every screen
      synchronously under react-dom/server and cannot suspend - they await
      loadScreens() once and get a plain map

  One table means the app and the gates cannot disagree about which component a
  route renders.

  ─────────────────────────────────────────
  WHAT THE STATIC IMPORTS USED TO CHECK

  A misspelt export in a static import was a compile error. A string here is
  not. So loadScreens() throws, naming the route, when an entry does not resolve
  to a component - and because every gate calls it, a typo fails CI instead of
  shipping a route that renders nothing.
*/
import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

type Module = Record<string, unknown>;

/* One loader per screen module. Vite splits each into its own chunk. */
const MODULES = {
  onboarding: () => import('../screens/Onboarding'),
  today: () => import('../screens/Today'),
  a11y: () => import('../screens/A11y'),
  codex: () => import('../screens/Codex'),
  nourish: () => import('../screens/Nourish'),
  kitchen: () => import('../screens/Kitchen'),
  smoothies: () => import('../screens/Smoothies'),
  restaurant: () => import('../screens/Restaurant'),
  move: () => import('../screens/Move'),
  moveDetail: () => import('../screens/MoveDetail'),
  explore: () => import('../screens/Explore'),
  apothecary: () => import('../screens/Apothecary'),
  journey: () => import('../screens/Journey'),
  trust: () => import('../screens/Trust'),
  wellbeing: () => import('../screens/Wellbeing'),
  farm: () => import('../screens/Farm'),
  extras: () => import('../screens/Extras'),
} satisfies Record<string, () => Promise<Module>>;

type ModuleKey = keyof typeof MODULES;

/** route -> [module, exported component name] */
export const SCREEN_TABLE: Record<string, readonly [ModuleKey, string]> = {
  welcome: ['onboarding', 'WelcomeScreen'],
  ob1: ['onboarding', 'Ob1Screen'],
  ob2: ['onboarding', 'Ob2Screen'],
  ob3: ['onboarding', 'Ob3Screen'],
  obHerb: ['onboarding', 'ObHerbScreen'],
  consent: ['onboarding', 'ConsentScreen'],
  obRecap: ['onboarding', 'ObRecapScreen'],

  today: ['today', 'TodayScreen'],
  a11y: ['a11y', 'A11yScreen'],

  codex: ['codex', 'CodexScreen'],
  codexRegion: ['codex', 'CodexRegionScreen'],
  pantryCodex: ['codex', 'PantryCodexScreen'],
  pantryVol: ['codex', 'PantryVolScreen'],

  nourish: ['nourish', 'NourishScreen'],
  scan: ['nourish', 'ScanScreen'],
  detected: ['nourish', 'DetectedScreen'],
  hidden: ['nourish', 'HiddenScreen'],
  report: ['nourish', 'ReportScreen'],
  recipe: ['nourish', 'RecipeScreen'],
  recipeDetail: ['nourish', 'RecipeDetailScreen'],
  mealPlan: ['kitchen', 'MealPlanScreen'],
  pantry: ['kitchen', 'PantryScreen'],
  grocery: ['kitchen', 'GroceryScreen'],
  planGrocery: ['kitchen', 'PlanGroceryScreen'],
  barcode: ['kitchen', 'BarcodeScreen'],
  voice: ['kitchen', 'VoiceScreen'],
  smoothies: ['smoothies', 'SmoothiesScreen'],
  smoothieBuilder: ['smoothies', 'SmoothieBuilderScreen'],
  restaurant: ['restaurant', 'RestaurantScreen'],
  order: ['restaurant', 'OrderScreen'],
  sugarMeal: ['restaurant', 'SugarMealScreen'],

  move: ['move', 'MoveScreen'],
  farm: ['move', 'FarmScreen'],
  exercise: ['move', 'ExerciseScreen'],
  trainPlan: ['move', 'TrainPlanScreen'],
  warrior: ['move', 'WarriorScreen'],
  mobility: ['moveDetail', 'MobilityScreen'],
  seated: ['moveDetail', 'SeatedScreen'],
  elder: ['moveDetail', 'ElderScreen'],
  ancestral: ['moveDetail', 'AncestralScreen'],
  breath: ['moveDetail', 'BreathScreen'],
  hike: ['moveDetail', 'HikeScreen'],

  explore: ['explore', 'ExploreScreen'],
  crop: ['explore', 'CropScreen'],
  map: ['explore', 'MapScreen'],
  forage: ['explore', 'ForageScreen'],
  community: ['explore', 'CommunityScreen'],
  seasonal: ['explore', 'SeasonalScreen'],
  minerals: ['explore', 'MineralsScreen'],
  frequencies: ['explore', 'FrequenciesScreen'],
  fusion: ['explore', 'FusionScreen'],
  apothecary: ['apothecary', 'ApothecaryScreen'],
  teaIntel: ['apothecary', 'TeaIntelScreen'],
  mushrooms: ['apothecary', 'MushroomsScreen'],
  nervines: ['apothecary', 'NervinesScreen'],
  waterMed: ['apothecary', 'WaterMedScreen'],
  ferment: ['apothecary', 'FermentScreen'],
  swaps: ['apothecary', 'SwapsScreen'],
  diabetes: ['apothecary', 'DiabetesScreen'],
  ceremony: ['apothecary', 'CeremonyScreen'],
  coconut: ['apothecary', 'CoconutScreen'],
  honey: ['apothecary', 'HoneyScreen'],
  shroomRecipes: ['apothecary', 'ShroomRecipesScreen'],

  journey: ['journey', 'JourneyScreen'],
  progress: ['journey', 'ProgressScreen'],
  history: ['journey', 'HistoryScreen'],
  profile: ['journey', 'ProfileScreen'],
  sources: ['trust', 'SourcesScreen'],
  privacy: ['trust', 'PrivacyScreen'],
  dataSov: ['trust', 'DataSovScreen'],
  vault: ['trust', 'VaultScreen'],
  membership: ['trust', 'MembershipScreen'],
  sovereignty: ['trust', 'SovereigntyScreen'],
  admin: ['trust', 'AdminScreen'],
  sleep: ['wellbeing', 'SleepScreen'],
  pregnancy: ['wellbeing', 'PregnancyScreen'],
  intimacy: ['wellbeing', 'IntimacyScreen'],

  microgreens: ['farm', 'MicrogreensScreen'],
  croplib: ['farm', 'CropLibScreen'],
  variety: ['farm', 'VarietyScreen'],
  garden: ['farm', 'GardenScreen'],
  pairings: ['extras', 'PairingsScreen'],
  budget: ['extras', 'BudgetScreen'],
  hydration: ['extras', 'HydrationScreen'],
  filters: ['extras', 'FiltersScreen'],
  family: ['extras', 'FamilyScreen'],
};

type Screen = () => JSX.Element;

/**
 * Every screen, resolved. For the SSR gates, which cannot suspend.
 * Throws on an entry that does not resolve to a component.
 */
export async function loadScreens(): Promise<Record<string, Screen>> {
  const loaded: Partial<Record<ModuleKey, Module>> = {};
  const out: Record<string, Screen> = {};
  for (const [route, [mod, name]] of Object.entries(SCREEN_TABLE)) {
    const m: Module = loaded[mod] ?? (loaded[mod] = (await MODULES[mod]()) as Module);
    const C = m[name];
    if (typeof C !== 'function') {
      throw new Error('screen table: route "' + route + '" names ' + mod + '.' + name
        + ', which is not an exported component');
    }
    out[route] = C as Screen;
  }
  return out;
}

/** Every screen as a React.lazy component, built once. For the app. */
export function lazyScreens(): Record<string, LazyExoticComponent<ComponentType>> {
  const out: Record<string, LazyExoticComponent<ComponentType>> = {};
  for (const [route, [mod, name]] of Object.entries(SCREEN_TABLE)) {
    out[route] = lazy(() => MODULES[mod]().then((m: Module) => ({
      default: m[name] as ComponentType,
    })));
  }
  return out;
}
