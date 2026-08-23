/*
  Depth for the Nourish section: pairings, preparation methods, hydration,
  water filters, the household, and kids' smoothies.

  Separate file; content.ts is untouched per README rule 3.

  ────────────────────────────────────────────────────────────────────────
  WHAT WAS ALREADY COVERED, AND WHAT WAS NOT

  Nourish already had depth in two places - recipeDepth for the 28 plate
  recipes and prepDepth for the 8 salads and 8 smoothies - and images on the
  hub, the scan flow, the kitchen screens and the restaurant surfaces. What had
  nothing was the reference material underneath: the pairings that explain WHY
  a plate works, the four preparation methods everything else keeps referring
  back to, the hydrators, the filters and the household cards.

  This is the layer the rest of the app cites. The Mineral atlas talks about
  phytate and vitamin C; the frequency bands say iron needs the vitamin C in the
  same mouthful; the codex says fermentation frees minerals. All of those point
  here, and until now they pointed at a single line.

  ON NUMBERS

  The pairings carry real magnitudes because the source data does - "2-6x",
  "~20x", "25 mg doubles it". Those are strong claims and the depth is written
  to hold them to their conditions rather than to repeat them louder: the
  vitamin C only works in the same meal, the piperine effect is measured on
  isolated curcumin, the iron multiplier is a multiplier on a small base. A
  fourfold increase on 2% absorption is still 8%.

  ON THE FILTERS

  `filterStops` - "Yam & Yarrow Co-op", "Community Water Justice Hub", "Sankofa
  Hardware" - are seeded demo listings for places that do not exist, and they
  get NO depth here for the same reason the Community screen got none: writing
  detail about a fictional shop would make it read as a real one. The filter
  TYPES are real technology and are covered; the shops are not.
  ────────────────────────────────────────────────────────────────────────
*/

export type PairingDepth = {
  /** How to actually do it. */
  how: string;
  /** The mechanism, and the conditions the number depends on. */
  mechanism: string;
  /** Where the claim stops. */
  limit?: string;
};

/* Keyed on the exact `combo` strings in content.ts. */
export const pairingDepth: Record<string, PairingDepth> = {
  'Cowpeas + lime': {
    how: 'Squeeze it at the table, over the food, immediately before eating. Not into the pot twenty minutes earlier - vitamin C is degraded by sustained heat, and a lime cooked into a stew has already lost much of what it was added for. A wedge on the plate does more than a tablespoon in the pan.',
    mechanism: 'Plant iron is non-heme and arrives as Fe3+, which the gut absorbs poorly. Ascorbic acid reduces it to Fe2+, which the gut takes up readily, and it also forms a soluble complex that shields the iron from the phytate and polyphenols competing for it. The dose-response is well characterised: around 25 mg roughly doubles absorption, 50 mg triples it, 100 mg reaches four- to sixfold, and it plateaus somewhere past that.',
    limit: 'It is a multiplier on a small base. Doubling absorption from 3% to 6% is a real gain and it is not the same as doubling the iron in the meal. It also only applies to the meal it is in - vitamin C taken hours later does nothing for the beans you ate at lunch.',
  },
  'Diri kole ak pwa + pikliz': {
    how: 'The pikliz goes on the plate raw and cold, beside the rice, not stirred into it while hot. This is how it is already served, which is the point of the entry - nothing needs changing, it just needs noticing.',
    mechanism: 'Two mechanisms in one plate. The fermentation and acid in pikliz lower the pH and help release minerals bound in the rice and beans, and the raw cabbage, carrot and citrus supply the vitamin C that converts the iron. The beans provide the iron, the slaw provides both of the things that free it.',
    limit: 'The vitamin C in a spoonful of slaw is modest next to a whole lime, so this is a good habit rather than a large intervention. It is here because it shows the pairing already built into a traditional plate rather than bolted on.',
  },
  'Beans + red pepper or guava': {
    how: 'Raw, in the same meal. Red pepper sliced into a salad beside the beans, or guava eaten as the fruit at the end of it. Cooking either one costs a large share of the vitamin C, so a roasted pepper is a much weaker version of this pairing than a raw one.',
    mechanism: 'These two are simply the densest ordinary sources on the shelf - a raw red bell pepper runs around 190 mg and a guava around 228 mg, both far above an orange. Either one on its own carries an iron meal past the point where more vitamin C stops helping.',
    limit: 'Past roughly 100-200 mg the curve flattens, so a second pepper adds very little. The gain is in having any substantial vitamin C source in the meal, not in maximising it.',
  },
  'Three Sisters: corn + beans + squash': {
    how: 'Cook them together or serve them together; either works, because the amino acid pooling happens in the body rather than in the pot. Posole, succotash and a squash-and-bean stew with cornbread are all the same nutritional structure.',
    mechanism: 'Corn is low in lysine and adequate in methionine; beans are the reverse. Eaten together the two protein profiles complete each other. It is also an agricultural system before it is a nutritional one - corn gives the beans a pole, beans fix nitrogen for the corn, squash shades out weeds and holds moisture - and the field design and the plate design are the same design.',
    limit: 'The old rule that complementary proteins must appear in the same meal is outdated: the body pools amino acids across the day and variety over a day is sufficient for healthy adults. The uptake screen already says this. The triad is excellent food and a remarkable piece of agronomy; the same-meal requirement is not real.',
  },
  'Turmeric + black pepper': {
    how: 'Both in the same dish, with a fat. Piperine is the pepper compound doing the work, so ground black pepper added at the end is enough - it does not need to be cooked in. Curcumin is fat-soluble, so a dish with oil or coconut milk in it carries more than a water-based one.',
    mechanism: 'Curcumin is absorbed poorly and cleared fast, largely by glucuronidation in the gut wall and liver. Piperine inhibits that clearance, which is why the co-administration study that produced the widely quoted figure found around a twentyfold increase in bioavailability.',
    limit: 'That figure comes from a study using isolated curcumin and isolated piperine at measured doses, not turmeric in a pot. It describes how much curcumin reaches the blood, not whether that produces a clinical effect - and human trials on curcumin outcomes are more mixed than the popular account suggests. Twenty times a very small number is still a small number.',
  },
  'Greens + a healthy fat': {
    how: 'The fat has to be in the same meal, not merely in the diet. Cook the greens in oil, dress them with it, or eat them alongside something that carries it - coconut milk, groundnut paste, avocado, tahini. Greens boiled and drained plain deliver noticeably less of what is in them.',
    mechanism: 'Vitamins A, D, E and K are fat-soluble and need fat present in the gut to be absorbed at all. The same applies to the carotenoids in dark greens and orange roots, which are converted to vitamin A. This is why so many traditional greens dishes across the diaspora are built on a fat rather than on water - it is the mechanism rather than a preference.',
  },
  'Fermented food + whole grains': {
    how: 'Either eat a ferment alongside the grain, or ferment the grain itself. Injera, kisra, ogi and sourdough are all the second version, and they are more effective than the first because the phytate reduction happens inside the food rather than beside it. Soaking overnight and discarding the water does a smaller version of the same job.',
    mechanism: 'Phytate binds iron, zinc, magnesium and calcium in grains and legumes and carries them out. Fermentation activates phytase, which breaks phytate down, and the acid conditions help further. This is the same mechanism the Mineral atlas describes under zinc and the codex describes under "Nutrients unlocked" - one fact, three screens.',
  },
  'Sea moss + microgreens': {
    how: 'Both go in cold and late. Sea moss gel stirs into a finished drink or dish off the heat; microgreens are scattered over the top of a plate rather than cooked into it. Heat is what ruins both.',
    mechanism: 'The claim here is complementarity rather than any single nutrient: sea vegetables concentrate what is dissolved in seawater, including iodine and trace elements, while microgreens concentrate what the seed packed for the seedling. The two mineral profiles overlap very little.',
    limit: 'This is the least-established pairing on the screen and deserves saying so. Sea moss iodine varies by orders of magnitude between harvests - the Mineral atlas refuses to put a number on it for that reason - and microgreen figures vary by variety and method. A broad trace-mineral matrix is a plausible description, not a measured one.',
  },
};

export type MethodDepth = {
  /** How it is actually done. */
  how: string;
  /** What it changes, and how much. */
  effect: string;
};

/*
  Keyed on the `m` strings in prepMatrix - the six cards the uptake screen
  actually renders. NOT prepMethods, which is a different four-item array of
  shorter labels joined into a single summary line lower down the same screen,
  and which shares only three of these names.

  These are the techniques the rest of the app keeps citing: the Mineral atlas
  points at soaking and fermenting for phytate, the codex points at fermentation
  for freeing minerals, the forage screen points at soaking for the same reason.
  This is where they are explained rather than referenced.
*/
export const methodDepth: Record<string, MethodDepth> = {
  Soak: {
    how: 'Cover with plenty of warm water and leave overnight, then throw the water away and rinse - the discarding is the step, and keeping the soak water undoes most of the point. Warm water works faster than cold. Adding a spoonful of something acidic, or a little of a previous soak, speeds phytate breakdown further. Beans roughly double in size, so use more water than looks necessary.',
    effect: 'Cuts phytate meaningfully, shortens cooking time substantially, and removes a good share of the oligosaccharides responsible for the gas beans are known for. It is the lowest-effort intervention in this whole section and the most reliably worthwhile.',
  },
  Sprout: {
    how: 'Soak first, then drain and keep the seed damp but not wet, rinsing twice a day, until a small tail appears - one to three days for most legumes and seeds. Air flow matters as much as moisture; a jar on its side with a mesh lid, tilted to drain, is the standard setup. Stop while the tail is short.',
    effect: 'Germination activates phytase in the seed itself, so phytate falls further than soaking alone achieves, and iron, zinc and calcium become more available. Vitamin C appears where the dry seed had almost none. The seed is doing this for its own seedling; you are interrupting it partway.',
  },
  Ferment: {
    how: 'Salt, submerge, wait - for vegetables. For grains and legumes, a wet batter left at room temperature until it smells sour and lifts, often started with a spoonful of a previous batch. Temperature sets the speed and the character: warm is fast and sharp, cool is slow and rounder. The Apothecary fermentation guide carries the full method for each.',
    effect: 'The most thorough of the six. Phytate is broken down, B vitamins including folate are produced, protein is partly pre-digested, and the acid that results preserves the food. It is why leavened bread beats unleavened for mineral availability and why a fermented porridge is a different food from an unfermented one.',
  },
  Grind: {
    how: 'Grind close to when you use it, and keep what you do not use cold. Flax is the clearest case: whole seed passes through largely intact, and ground flax goes rancid within weeks at room temperature because the fats it just released are now exposed. Tahini and groundnut paste are the same principle applied to seeds that are then stored in oil.',
    effect: 'Breaks open a food matrix the gut cannot open by itself. A whole seed is engineered to survive digestion - that is the seed\\u2019s purpose - so grinding is what turns it from a passenger into food. This is the least discussed of the six and one of the most consequential.',
  },
  'Cook, cool, reheat': {
    how: 'Cook the rice, potato, plantain or yam, then chill it thoroughly - overnight in the fridge, not twenty minutes on the counter - and reheat gently. The cooling is the step that does the work, and the effect survives reheating, which is the useful part. Cooked and eaten hot the first time, none of this happens.',
    effect: 'Cooling gelatinised starch causes some of it to recrystallise into resistant starch, which the small intestine cannot digest. It passes to the colon and is fermented by gut bacteria instead, so it behaves more like fibre than like sugar and blunts the glucose curve. It is one of the few genuinely free interventions in this section - the same food, the same portion, prepared a day earlier.',
  },
  'Add fat': {
    how: 'In the pot or on the plate, in the same meal - not merely in the diet. Palm oil, coconut milk, tahini, groundnut paste, avocado. This is why so many traditional greens dishes across the diaspora are built on a fat rather than on water.',
    effect: 'Vitamins A, D, E and K are fat-soluble and cannot cross the gut wall without it, and the carotenoids in dark greens and orange roots behave the same way. Greens boiled and drained plain deliver measurably less of what is in them than the same greens cooked in coconut milk. The pairing is the mechanism, not a flourish.',
  },
};

export type HydratorDepth = {
  how: string;
  when: string;
  note?: string;
};

export const hydratorDepth: Record<string, HydratorDepth> = {
  'Sea moss gel in water': {
    how: 'A spoonful of gel whisked or shaken into cool water - it will sit in a lump if you drop it into a still glass. Made from rinsed, soaked and blended sea moss, set cold; the Foraged foods screen carries the full preparation.',
    when: 'Long days rather than hard sessions. It is a mild mineral drink, not a sports formulation.',
    note: 'Iodine content varies enormously between harvests, so daily use is a clinician conversation rather than a habit to drift into. Too much iodine harms the thyroid as surely as too little.',
  },
  'Coconut water': {
    how: 'Straight from a young green nut if you can get one, or from a carton with nothing added. Cold. Nothing to prepare.',
    when: 'Hot days and moderate sweat. It is genuinely high in potassium and low in sodium, which is exactly the wrong balance for a very heavy sweat - sodium is what you lose most of - so on a hard farm day it wants a pinch of salt alongside rather than being relied on alone.',
  },
  'Hibiscus–lime cooler': {
    how: 'Steep the calyces hot for ten to twenty minutes or cold overnight, cool it, and add lime at the end rather than at the start so the vitamin C survives. Sweeten while it is warm so it dissolves.',
    when: 'Heat and cooling rather than replacement. It is pleasant, it carries real vitamin C, and it is the drink that gets people to drink water at all - which is most of what a hydrator has to do.',
    note: 'Hibiscus may lower blood pressure and it inhibits non-heme iron, so keep it about an hour off an iron-focused meal and treat it carefully alongside blood-pressure medication. Both cautions are already on the tea cards.',
  },
  'Pinch of sea salt + citrus': {
    how: 'A small pinch of salt and a squeeze of citrus in a bottle of water - enough to taste faintly of something, not enough to taste salty. If it tastes like seawater it is too much to drink in quantity.',
    when: 'Heavy sweat specifically: long farm days, hot weather, sessions that leave salt on your skin. This is the one on the list actually aimed at replacement rather than at pleasure.',
    note: 'Sodium is what a heavy sweat costs most, and plain water in quantity without it can dilute what is left. This matters at the extremes rather than on an ordinary day, and anyone managing blood pressure should ask before adding salt deliberately.',
  },
};

export type FilterDepth = {
  /** What it physically does. */
  how: string;
  /** What it does not do. */
  limit: string;
};

/* Keyed on the `name` strings in `filters`. The technology is real and is
   covered; the shops in `filterStops` are fictional and are not. */
export const filterDepth: Record<string, FilterDepth> = {
  'Countertop gravity filter': {
    how: 'Water passes by gravity through a dense ceramic or carbon-block element, which traps particulates and adsorbs chlorine, many organic compounds and some heavy metals. No plumbing, no power, and it keeps working in an outage - which is a real advantage in a house where the supply is unreliable.',
    limit: 'Slow, and the element has to be replaced on schedule rather than when the flow drops off. A saturated filter stops adsorbing and can eventually release what it caught. It is not a reverse-osmosis system and will not remove dissolved salts or nitrates.',
  },
  'Faucet-mount filter': {
    how: 'A small carbon cartridge that treats water at the tap on demand, with a diverter so you only filter what you drink. Cheapest way to deal with chlorine taste and a meaningful share of lead, and it installs in minutes with no tools.',
    limit: 'Small cartridges saturate fast, and capacity is measured in gallons rather than months. It only treats the tap it is on, so it does nothing for a shower or a second sink. Certification matters more than marketing here - the claims that count are the ones tested against a standard.',
  },
  'Reverse-osmosis (under-sink)': {
    how: 'Pressure forces water through a semi-permeable membrane that rejects the great majority of dissolved contaminants - lead, nitrates, fluoride, PFAS, dissolved salts - and sends them down the drain with the reject water. It is the most thorough of the four by a wide margin.',
    limit: 'It wastes water, several litres rejected per litre produced in many units, and it strips beneficial minerals along with everything else, which is why some systems remineralise afterwards. It needs plumbing, space under the sink, and periodic membrane replacement. It is the right answer to a genuine contamination problem and overkill for taste.',
  },
  'Activated-charcoal stick': {
    how: 'A stick of activated carbon dropped into a jug, where it slowly adsorbs chlorine and improves taste over a few hours. Traditional in Japan as binchotan, cheap, and it composts when finished.',
    limit: 'This is a taste improver, and the depth is here mainly to say so. It is not tested or certified for lead, PFAS or pathogens, and it should not be relied on where there is a real contamination concern. On the app’s own tier system it is the least protective option on the screen, and choosing it for a lead problem would be a serious mistake.',
  },
};

export type HouseholdDepth = {
  /** Why this person's needs differ. */
  why: string;
  /** How one pot serves them without a separate, lesser meal. */
  onePot: string;
};

/* Keyed on the `id` strings in familyDefs. */
export const householdDepth: Record<string, HouseholdDepth> = {
  amara: {
    why: 'A training adult is the straightforward case: protein spread across the day rather than banked in one meal, iron paired with vitamin C at every plate, and intake that moves up on farm and training days rather than staying flat. The spreading matters more than the total - muscle protein synthesis responds to repeated doses better than to one large one.',
    onePot: 'This is the portion the pot is built around. Everything below is an adjustment from it rather than a separate meal.',
  },
  kofi: {
    why: 'A growing child has a small stomach and a large requirement, which is a genuine engineering problem: the same food that satisfies an adult can fill a child before it has fed them. Energy density is the answer - avocado, coconut, seed butters, oil - rather than volume. B12 and vitamin D are non-negotiable and come from fortified foods or drops, not from improvisation.',
    onePot: 'Take the child’s portion from the same pot and enrich it: a spoon of seed butter stirred through, extra coconut milk, avocado on the side. Nothing is removed and nothing separate is cooked.',
  },
  nana: {
    why: 'Older adults absorb and use protein less efficiently, so an elder needs a protein anchor at every meal rather than a large one at dinner - the leucine threshold that triggers muscle synthesis is higher with age. Texture matters as much as content, because chewing and swallowing change. Thirst signalling fades, so hydration goes on a schedule rather than waiting to be asked for.',
    onePot: 'The same stew, cooked longer or blended softer, with the beans mashed slightly and a drink placed alongside without being requested. Softer is a texture change, not a lesser meal.',
  },
};

export type KidSmoothieDepth = {
  /** How to build it and why it is put together this way. */
  build: string;
  /** The point of it. */
  why: string;
};

export const kidSmoothieDepth: Record<string, KidSmoothieDepth> = {
  'Cocoa Banana Grow': {
    build: 'Frozen banana is what makes it thick without ice watering it down, so freeze the banana rather than chilling the drink. Hemp seeds blend smooth and need no soaking. One date is enough sweetness on top of a ripe banana; two makes it a dessert.',
    why: 'Energy density in a form a child will finish. Cacao carries magnesium and makes the greens-free version taste like a treat rather than a supplement.',
  },
  'Mango Sunshine': {
    build: 'Baobab powder is tart and dissolves best whisked into the coconut milk before the fruit goes in, otherwise it clumps. Lime at the end. Frozen mango again does the thickening.',
    why: 'Vitamin C from both baobab and lime, in the same glass as the iron in whatever the child ate alongside it. The tartness is what stops it being cloying.',
  },
  'Callaloo Sneak': {
    build: 'Pineapple is doing the concealing and it has to go in generously - it is acidic and assertive enough to cover the amaranth greens, which most fruit is not. Blend the greens with the coconut water first until completely smooth before anything else joins, or the texture gives it away.',
    why: 'Iron and calcium from the amaranth in a glass that tastes of pineapple. The name is honest about the strategy, which is the right way round - the child is not being deceived about what food is, they are being given greens in a form that works.',
  },
};

export const PAIRING_DEPTH_COUNT = Object.keys(pairingDepth).length;
export const METHOD_DEPTH_COUNT = Object.keys(methodDepth).length;
export const HYDRATOR_DEPTH_COUNT = Object.keys(hydratorDepth).length;
export const FILTER_DEPTH_COUNT = Object.keys(filterDepth).length;
