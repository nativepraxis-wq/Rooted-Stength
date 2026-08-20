import { StoreProvider, useStore } from './state/store';
import { Shell } from './components/Shell';
import { activeTab, ROUTES } from './nav/routes';
import { Screen, Gutter, Band } from './components/ui';
import { DarkHeader } from './components/Headers';

import { TodayScreen } from './screens/Today';
import { A11yScreen } from './screens/A11y';
import {
  WelcomeScreen, Ob1Screen, Ob2Screen, Ob3Screen, ObHerbScreen, ConsentScreen, ObRecapScreen,
} from './screens/Onboarding';
import {
  CodexScreen, CodexRegionScreen, PantryCodexScreen, PantryVolScreen,
} from './screens/Codex';
import {
  NourishScreen, ScanScreen, DetectedScreen, HiddenScreen, ReportScreen,
  RecipeScreen, RecipeDetailScreen,
} from './screens/Nourish';
import {
  MealPlanScreen, PantryScreen, GroceryScreen, PlanGroceryScreen,
  BarcodeScreen, VoiceScreen,
} from './screens/Kitchen';
import { SmoothiesScreen, SmoothieBuilderScreen } from './screens/Smoothies';
import { RestaurantScreen, OrderScreen, SugarMealScreen } from './screens/Restaurant';
import {
  MoveScreen, FarmScreen, ExerciseScreen, TrainPlanScreen, WarriorScreen,
} from './screens/Move';
import {
  MobilityScreen, SeatedScreen, ElderScreen, AncestralScreen, BreathScreen, HikeScreen,
} from './screens/MoveDetail';
import {
  ExploreScreen, CropScreen, MapScreen, ForageScreen, CommunityScreen,
  SeasonalScreen, MineralsScreen, FrequenciesScreen, FusionScreen,
} from './screens/Explore';
import {
  ApothecaryScreen, TeaIntelScreen, MushroomsScreen, NervinesScreen, WaterMedScreen,
  FermentScreen, SwapsScreen, DiabetesScreen, CeremonyScreen, CoconutScreen,
  HoneyScreen, ShroomRecipesScreen,
} from './screens/Apothecary';
import {
  JourneyScreen, ProgressScreen, HistoryScreen, ProfileScreen,
} from './screens/Journey';
import {
  SourcesScreen, PrivacyScreen, DataSovScreen, VaultScreen,
  MembershipScreen, SovereigntyScreen, AdminScreen,
} from './screens/Trust';
import { SleepScreen, PregnancyScreen, IntimacyScreen } from './screens/Wellbeing';
import {
  MicrogreensScreen, CropLibScreen, VarietyScreen, GardenScreen,
} from './screens/Farm';
import {
  PairingsScreen, BudgetScreen, HydrationScreen, FiltersScreen, FamilyScreen,
} from './screens/Extras';

/*
  Route table. Screens built in this pass are wired here; the remaining routes
  fall through to NotBuiltYet, which says plainly that the surface has not been
  implemented rather than showing an empty shell that looks finished.
*/
const SCREENS: Partial<Record<string, () => JSX.Element>> = {
  welcome: WelcomeScreen,
  ob1: Ob1Screen,
  ob2: Ob2Screen,
  ob3: Ob3Screen,
  obHerb: ObHerbScreen,
  consent: ConsentScreen,
  obRecap: ObRecapScreen,

  today: TodayScreen,
  a11y: A11yScreen,

  codex: CodexScreen,
  codexRegion: CodexRegionScreen,
  pantryCodex: PantryCodexScreen,
  pantryVol: PantryVolScreen,

  nourish: NourishScreen,
  scan: ScanScreen,
  detected: DetectedScreen,
  hidden: HiddenScreen,
  report: ReportScreen,
  recipe: RecipeScreen,
  recipeDetail: RecipeDetailScreen,
  mealPlan: MealPlanScreen,
  pantry: PantryScreen,
  grocery: GroceryScreen,
  planGrocery: PlanGroceryScreen,
  barcode: BarcodeScreen,
  voice: VoiceScreen,
  smoothies: SmoothiesScreen,
  smoothieBuilder: SmoothieBuilderScreen,
  restaurant: RestaurantScreen,
  order: OrderScreen,
  sugarMeal: SugarMealScreen,

  move: MoveScreen,
  farm: FarmScreen,
  exercise: ExerciseScreen,
  trainPlan: TrainPlanScreen,
  warrior: WarriorScreen,
  mobility: MobilityScreen,
  seated: SeatedScreen,
  elder: ElderScreen,
  ancestral: AncestralScreen,
  breath: BreathScreen,
  hike: HikeScreen,

  explore: ExploreScreen,
  crop: CropScreen,
  map: MapScreen,
  forage: ForageScreen,
  community: CommunityScreen,
  seasonal: SeasonalScreen,
  minerals: MineralsScreen,
  frequencies: FrequenciesScreen,
  fusion: FusionScreen,
  apothecary: ApothecaryScreen,
  teaIntel: TeaIntelScreen,
  mushrooms: MushroomsScreen,
  nervines: NervinesScreen,
  waterMed: WaterMedScreen,
  ferment: FermentScreen,
  swaps: SwapsScreen,
  diabetes: DiabetesScreen,
  ceremony: CeremonyScreen,
  coconut: CoconutScreen,
  honey: HoneyScreen,
  shroomRecipes: ShroomRecipesScreen,

  journey: JourneyScreen,
  progress: ProgressScreen,
  history: HistoryScreen,
  profile: ProfileScreen,
  sources: SourcesScreen,
  privacy: PrivacyScreen,
  dataSov: DataSovScreen,
  vault: VaultScreen,
  membership: MembershipScreen,
  sovereignty: SovereigntyScreen,
  admin: AdminScreen,
  sleep: SleepScreen,
  pregnancy: PregnancyScreen,
  intimacy: IntimacyScreen,

  microgreens: MicrogreensScreen,
  croplib: CropLibScreen,
  variety: VarietyScreen,
  garden: GardenScreen,
  pairings: PairingsScreen,
  budget: BudgetScreen,
  hydration: HydrationScreen,
  filters: FiltersScreen,
  family: FamilyScreen,
};

const TAB_LABEL: Record<string, string> = {
  today: 'Today', nourish: 'Nourish', move: 'Move', explore: 'Explore', journey: 'Journey',
};

function NotBuiltYet() {
  const { state, goBack, go } = useStore();
  const tab = activeTab(state.route);

  return (
    <Screen>
      <DarkHeader
        eyebrow={tab ? TAB_LABEL[tab] : 'Rooted Strength'}
        title={state.route}
        back={goBack}
      />
      <Gutter style={{ paddingTop: 18 }}>
        <Band tone="safety" title="This screen is not built yet">
          <p style={{ margin: 0, lineHeight: 1.55 }}>
            <code>{state.route}</code> is one of the 86 routes in the design handoff, but it has not
            been implemented in this pass. Its content and layout are specified in the prototype —
            nothing here is a stub standing in for missing design.
          </p>
        </Band>

        <Band tone="cream" title="What is built" style={{ marginTop: 12 }}>
          The shell, navigation, both themes and the accessibility layer; the shared tier-badge
          system; the full content data layer; the four codex screens; all seven onboarding steps;
          Today; the whole Nourish cluster — the plate-scan chain, the recipe generator, the meal
          plan, pantry, both grocery lists, barcode and voice capture, the restaurant order builder
          and the smoothie builder; the whole Move cluster; the whole Explore cluster; and the whole Journey cluster.
        </Band>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
          {(['today', 'nourish', 'move', 'explore', 'codex', 'a11y'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => go(r)}
              style={{
                border: '1px solid var(--border-2)', background: 'var(--card)',
                color: 'var(--ink-muted)', borderRadius: 999, padding: '9px 14px',
                minHeight: 44, fontSize: 'calc(12.5px * var(--scale))',
                fontWeight: 700, cursor: 'pointer',
              }}
            >{r}</button>
          ))}
        </div>
      </Gutter>
    </Screen>
  );
}

function Router() {
  const { state } = useStore();
  const known = (ROUTES as readonly string[]).includes(state.route);
  const Screen_ = (known && SCREENS[state.route]) || NotBuiltYet;
  /* Keying on the route restarts the rs-fade enter animation on every change. */
  return <Shell><div key={state.route}><Screen_ /></div></Shell>;
}

export default function App() {
  return (
    <StoreProvider>
      <Router />
    </StoreProvider>
  );
}
