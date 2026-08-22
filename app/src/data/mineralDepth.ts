/*
  Depth for the Mineral & body atlas.

  The six mineral cards carried `builds`, `feels`, `sources` and a `tip`, and no
  numbers at all. This adds intake reference ranges, what the named plant sources
  actually carry, the absorption story, and the combinations - then links each
  mineral to the recipes in this app that genuinely contain its sources.

  Separate file; content.ts is untouched per README rule 3.

  ────────────────────────────────────────────────────────────────────────
  HOW THE NUMBERS ARE STATED

  The app already sets this rule for itself, in the Atlas copy for microgreens:
  "nutrient figures vary by variety and method; the Atlas cites ranges, not
  single numbers."

  So every figure here is a range, and every range is labelled for what it is:

    - `target` is a general adult REFERENCE INTAKE, not a personal target. Needs
      differ by age, menstruation, pregnancy, medication and absorption, which is
      why the screen already says feeling is not a test.
    - `carries` figures are approximate per typical serving and move with
      variety, soil and cooking method.

  Iodine is deliberately the exception and says so. Sea moss iodine content
  varies by orders of magnitude between harvests, and too much iodine harms the
  thyroid as surely as too little. A number there would be a false precision with
  a real cost, so it is not given.

  RECIPE LINKS are derived, not asserted. Each id below was produced by scanning
  plateRecipes' actual ingredient lists for the foods the mineral card names as
  sources - so a link means that recipe genuinely contains one.
  ────────────────────────────────────────────────────────────────────────
*/

export type MineralDepth = {
  /** General adult reference intake, always a range. */
  target: string;
  /** What the range is and is not. */
  targetNote: string;
  /** Approximate content of the sources this app actually uses. */
  carries: { food: string; amount: string }[];
  /** What raises absorption. */
  absorb: string;
  /** What lowers it. */
  blocks: string;
  /** The fuller story. */
  depth: string;
  /** Recipe ids whose ingredient lists contain a named source. */
  recipes: string[];
};

export const mineralDepth: Record<string, MineralDepth> = {
  Fe: {
    target: 'Adults: roughly 8-18mg a day, and higher in pregnancy.',
    targetNote: 'The spread is mostly menstruation. Plant iron is non-heme and absorbed less readily than iron from meat, so plant-based guidance often sets the figure around 1.8x higher again - which is a reason to pair well, not a reason to panic.',
    carries: [
      { food: 'Cooked black-eyed peas / cowpeas', amount: 'about 4-5mg a cup' },
      { food: 'Cooked amaranth greens', amount: 'about 2-3mg a cup' },
      { food: 'Cooked lentils', amount: 'about 6-7mg a cup' },
      { food: 'Moringa leaf powder', amount: 'about 1-2mg a tablespoon' },
    ],
    absorb: 'Vitamin C in the same mouthful, not the same day. Lime over the greens, tomato in the pot, pepper in the stew. It can lift non-heme absorption several-fold.',
    blocks: 'Tannins in tea and coffee, and calcium in a large dose, both cut it sharply - hold them an hour away from an iron-heavy plate. Phytates in unsoaked grains and beans bind it too.',
    depth: 'Non-heme iron arrives at the gut in a form the body has to work on before it can take it up, and that conversion is what vitamin C drives. This is why the same plate of greens can deliver very different amounts of usable iron depending on what is squeezed over it. It is also why the traditional pairings - lime on callaloo, tomato under the peas - are not decoration. Fatigue has many causes and low iron is only one; a blood panel is what tells you which.',
    recipes: ['moringa', 'jollof', 'redred', 'groundnut', 'porridge', 'akara', 'hoppin', 'bepcallaloo'],
  },

  Mg: {
    target: 'Adults: roughly 310-420mg a day.',
    targetNote: 'Lower end for most women, higher for most men. A general reference range, not a personal number.',
    carries: [
      { food: 'Pumpkin seeds', amount: 'about 145-165mg an ounce' },
      { food: 'Cooked millet', amount: 'about 75-105mg a cup' },
      { food: 'Cacao / cocoa solids', amount: 'about 60-100mg a tablespoon' },
      { food: 'Cooked leafy greens', amount: 'about 40-80mg a cup' },
    ],
    absorb: 'Soaking grains and beans overnight and discarding the water breaks down phytate and frees more of it. Fermenting does the same job.',
    blocks: 'Phytate in unsoaked whole grains and legumes, which is exactly where much of the magnesium sits - so the food carrying it is also the food holding it back until you soak it.',
    depth: 'Magnesium is a cofactor in hundreds of enzyme reactions, including the ones that make muscle relax rather than contract, which is why shortfall shows up as cramp, restlessness and poor sleep before it shows up anywhere else. It is also the mineral most reliably lost through heavy sweating, so a farm week or a hot training block raises the need. Whole plants carry it in quantity, but only if the phytate is dealt with first.',
    recipes: ['jollof', 'milletbars', 'trailbowl', 'redred', 'rundown', 'hoppin', 'tofu'],
  },

  Zn: {
    target: 'Adults: roughly 8-11mg a day.',
    targetNote: 'Plant-based intakes are often advised around 50% higher, because phytate binds a meaningful share of what is eaten.',
    carries: [
      { food: 'Hemp seeds', amount: 'about 2.5-3.5mg for three tablespoons' },
      { food: 'Pumpkin seeds', amount: 'about 2-3mg an ounce' },
      { food: 'Cooked lentils', amount: 'about 2.5-3mg a cup' },
      { food: 'Cooked sorghum', amount: 'about 1.5-2mg a cup' },
    ],
    absorb: 'Sprouting, soaking and fermenting all cut phytate and raise uptake measurably. Leavened bread beats unleavened for the same reason.',
    blocks: 'Phytate again, and a large calcium load alongside. High-dose zinc supplements block copper over time, which is the argument for getting it from food.',
    depth: 'Zinc turns over fast and the body holds no real reserve, so intake matters day to day rather than week to week. It is central to immune response, wound healing and hormone production, and shortfall tends to show as slow healing and blunted taste and smell before anything dramatic. The plant sources are seeds and legumes - the same foods that carry phytate - so preparation is doing as much work here as the shopping.',
    recipes: ['milletbars', 'groundnut', 'tofu', 'posole', 'porridge', 'moringa', 'trailwrap', 'sorghumbowl'],
  },

  Ca: {
    target: 'Adults: roughly 1000-1200mg a day.',
    targetNote: 'Higher end after about fifty. A reference range for adults generally, not a personal prescription.',
    carries: [
      { food: 'Cooked collard greens', amount: 'about 250-270mg a cup' },
      { food: 'Calcium-set tofu', amount: 'about 200-400mg a half cup, check the label' },
      { food: 'Moringa leaf powder', amount: 'about 40-60mg a tablespoon' },
      { food: 'Cooked amaranth greens', amount: 'about 250-275mg a cup' },
    ],
    absorb: 'Vitamin D governs how much you take up at all, and vitamin K directs where it goes once absorbed. Both travel with the greens themselves and with the fat cooked alongside.',
    blocks: 'Oxalate. This is the one that catches people out: spinach looks calcium-rich on paper but binds most of its own calcium and delivers very little. Collards, kale and amaranth greens are low-oxalate and give up most of theirs.',
    depth: 'The difference between collards and spinach is the single most useful thing to know about plant calcium. Collard calcium is absorbed at roughly half of what is present; spinach at closer to a twentieth. That is why this app names collards, moringa and amaranth greens as sources and does not name spinach, and why a "leafy greens are leafy greens" substitution quietly costs you most of the mineral.',
    recipes: ['rundown', 'tofu', 'seamoss', 'tofugreens', 'familyplate', 'jollof', 'bepcallaloo', 'butterbeangreens'],
  },

  K: {
    target: 'Adults: roughly 2600-3400mg a day.',
    targetNote: 'An adequate-intake figure rather than a hard requirement, and most people fall well short of it.',
    carries: [
      { food: 'Cooked plantain', amount: 'about 650-900mg a cup' },
      { food: 'Baked sweet potato', amount: 'about 450-550mg medium' },
      { food: 'Cooked beans', amount: 'about 600-800mg a cup' },
      { food: 'Cooked callaloo / amaranth greens', amount: 'about 800-900mg a cup' },
    ],
    absorb: 'Absorption is efficient and needs no partner. Eating the cooking liquid matters more - potassium leaches into the water, so pot liquor and stew gravy carry a real share of it.',
    blocks: 'Boiling and discarding the water. A drained boil can take a large fraction of the potassium down the sink with it.',
    depth: 'Potassium and sodium set the voltage across every cell membrane, which is why shortfall reads as fatigue, cramp and an unsteady heartbeat. Most diets are heavy in sodium and light in potassium, and the ratio between them matters more for blood pressure than either number alone - which is the quiet argument for the whole-plant plate over the packet. The tradition of drinking the pot liquor is not thrift, it is where the mineral went.',
    recipes: ['rundown', 'bepcallaloo', 'familyplate', 'jollof', 'redred', 'groundnut', 'cassava', 'okrastew'],
  },

  I: {
    target: 'Adults: about 150 micrograms a day, more in pregnancy, with an upper limit around 1100 micrograms.',
    targetNote: 'Iodine is the one mineral here where the ceiling matters as much as the floor. Too much causes thyroid disease as surely as too little.',
    carries: [
      { food: 'Sea moss', amount: 'NOT STATED - see below' },
      { food: 'Iodised salt', amount: 'about 45-75 micrograms a quarter teaspoon' },
    ],
    absorb: 'Selenium is required for the thyroid to use iodine at all - brazil nuts and sunflower seeds carry it. The two work as a pair or not at all.',
    blocks: 'Raw brassicas and cassava contain goitrogens that interfere at high intakes; cooking largely deals with them. This is a real interaction but a small one next to dose.',
    depth: 'Sea moss is the only iodine source this app names, and its iodine content varies by orders of magnitude between species, harvests and waters. Published figures for the same seaweed differ by more than a hundredfold. Putting a number on a spoonful of sea moss gel would be a false precision with a real cost attached, so this atlas does not give one. If you use sea moss daily, that is a conversation to have with a clinician who can test thyroid function - not a figure to estimate from a card.',
    recipes: ['rundown', 'seamoss'],
  },
};

/*
  Combinations.

  Asked for at the same depth as the individual minerals, because in practice
  these interactions decide more than the raw intake does. A plate can be rich in
  iron and hand over very little of it.
*/

export type MineralPair = {
  pair: string;
  /** 'helps' raises what you absorb; 'competes' lowers it; 'needs' is dependency. */
  kind: 'helps' | 'competes' | 'needs';
  short: string;
  detail: string;
  /** What to actually do about it. */
  practice: string;
  ev: string;
  /** Recipes in this app where the pairing is already built in. */
  recipes?: string[];
};

export const mineralPairs: MineralPair[] = [
  {
    pair: 'Iron + vitamin C',
    kind: 'helps',
    short: 'The single most useful pairing on a plant plate.',
    detail: 'Plant iron is non-heme, and the gut absorbs it far less readily than the iron in meat. Vitamin C converts it to the form the gut can take up and holds it there against the compounds that would otherwise bind it. The effect is large - several-fold - and it is dose-dependent within a meal, which is why a squeeze rather than a sprinkle matters.',
    practice: 'Same mouthful, not the same day. Lime over the callaloo at the table, tomato in the pepper base, raw pepper in the salad beside the beans. A vitamin C tablet at breakfast does nothing for the beans at dinner.',
    ev: 'Well established',
    recipes: ['porridge', 'moringa', 'bepcallaloo', 'seamoss'],
  },
  {
    pair: 'Iron + calcium',
    kind: 'competes',
    short: 'They use the same door, and calcium is bigger.',
    detail: 'Calcium interferes with non-heme iron absorption when both arrive in quantity at once, competing for the same transport. The effect is real at supplement-sized doses and at large single servings; it is much smaller across a mixed day of ordinary food.',
    practice: 'Do not take a calcium supplement with the iron-heavy meal. Keep strong coffee, tea and a big calcium dose about an hour either side of the plate you are relying on for iron. Whole foods eaten together are far less of a problem than pills taken together.',
    ev: 'Well established',
  },
  {
    pair: 'Iron + tannins',
    kind: 'competes',
    short: 'Tea and coffee with the meal cost you iron.',
    detail: 'Polyphenols in tea, coffee and cocoa bind non-heme iron in the gut and carry it out. A cup with the meal can cut absorption from that meal substantially - one of the larger dietary effects on iron status, and one of the easiest to avoid.',
    practice: 'This is why the iron card already says to hold tea and coffee away from meals. An hour either side is enough. The tea is not the problem; the timing is.',
    ev: 'Well established',
  },
  {
    pair: 'Zinc + phytate',
    kind: 'competes',
    short: 'The foods richest in zinc are the ones holding onto it.',
    detail: 'Phytate binds zinc tightly in the gut, and phytate sits in exactly the seeds, grains and legumes that carry the zinc. This is why plant-based zinc guidance runs higher than the general figure - not because the food lacks it, but because a share of it never gets released.',
    practice: 'Soak overnight and discard the water. Sprout. Ferment. All three cut phytate meaningfully, and all three are already techniques this app uses - the kraut, the ginger bug and the overnight bean soak are doing mineral work as well as flavour work.',
    ev: 'Well established',
    recipes: ['creole', 'redred', 'akara'],
  },
  {
    pair: 'Zinc + copper',
    kind: 'competes',
    short: 'A reason to take zinc from food rather than a pill.',
    detail: 'Sustained high-dose zinc supplementation induces a protein in the gut that binds copper and blocks it, and long-term copper deficiency causes anaemia and neurological damage. Food-level zinc does not do this; supplement-level zinc taken for months can.',
    practice: 'If zinc is coming from seeds, lentils and sorghum, this is not a concern. If it is coming from a high-dose supplement taken daily, it is a conversation to have with a clinician.',
    ev: 'Well established',
  },
  {
    pair: 'Calcium + vitamin D + vitamin K',
    kind: 'needs',
    short: 'Calcium alone is only the first of three.',
    detail: 'Vitamin D governs how much calcium is absorbed from the gut at all; without enough, a high calcium intake still underdelivers. Vitamin K then directs calcium into bone rather than leaving it in soft tissue. The three are a chain, and the weakest link sets the result.',
    practice: 'The greens carry the calcium and the vitamin K together, which is the elegance of the collard plate. Vitamin D is the one that does not come with them - it comes from sun or a supplement, and at higher latitudes or on darker skin it often needs the supplement. That is a testable thing rather than a guessable one.',
    ev: 'Well established',
    recipes: ['tofu', 'tofugreens', 'butterbeangreens', 'familyplate'],
  },
  {
    pair: 'Calcium + oxalate',
    kind: 'competes',
    short: 'Why this app names collards and not spinach.',
    detail: 'Oxalate binds calcium in the plant itself, before it ever reaches you. Spinach is high in oxalate and hands over a small fraction of the calcium it contains - absorption around a twentieth. Collards, kale, amaranth greens and moringa are low-oxalate and give up roughly half. Two greens with similar numbers on the label can differ tenfold in what actually arrives.',
    practice: 'Treat "greens" as several different foods where calcium is concerned. Spinach is a fine green for other reasons; it is a poor calcium source and swapping it in for collards quietly costs most of the mineral.',
    ev: 'Well established',
  },
  {
    pair: 'Magnesium + vitamin D',
    kind: 'needs',
    short: 'Magnesium is what switches vitamin D on.',
    detail: 'The enzymes that convert vitamin D into its active form are magnesium-dependent. Low magnesium therefore blunts what a vitamin D intake can do, and supplementing D hard against a magnesium shortfall gets less than the label suggests.',
    practice: 'Seeds, whole grains and greens carry the magnesium. This is one of the reasons the answer to a flat vitamin D result is not always more vitamin D.',
    ev: 'Well established',
    recipes: ['milletbars', 'trailbowl'],
  },
  {
    pair: 'Potassium + sodium',
    kind: 'competes',
    short: 'The ratio matters more than either number.',
    detail: 'These two set cell voltage and fluid balance between them, and blood pressure tracks the balance more closely than it tracks sodium alone. Most modern diets run high sodium and low potassium, which loads the ratio in the wrong direction from both ends at once.',
    practice: 'Raising potassium with plantain, beans, greens and sweet potato moves the ratio as surely as cutting salt does, and it is easier to sustain. On heavy-sweat farm days both need replacing - which is what the salt-and-lime field water is for.',
    ev: 'Well established',
    recipes: ['redred', 'familyplate', 'cassava', 'rundown'],
  },
  {
    pair: 'Iodine + selenium',
    kind: 'needs',
    short: 'The thyroid cannot use one without the other.',
    detail: 'The enzymes that convert thyroid hormone into its active form are selenium-dependent. Iodine without selenium leaves the thyroid unable to finish the job, and selenium deficiency alongside high iodine intake is worse than either alone.',
    practice: 'Brazil nuts and sunflower seeds carry selenium; a couple of brazil nuts covers a day and more than a handful overshoots badly. As with the iodine card itself, if sea moss is a daily habit this belongs with a clinician who can test, not with an estimate from a card.',
    ev: 'Well established',
  },
];

export const MINERAL_DEPTH_COUNT = Object.keys(mineralDepth).length;
export const MINERAL_PAIR_COUNT = mineralPairs.length;
