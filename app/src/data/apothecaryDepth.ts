/*
  Process depth for the Apothecary guides.

  Every guide item carried a `why` - what it is and what it is for, evidence-
  tiered - and no `how` at all. This adds the process. Separate file, because
  README rule 3 keeps content.ts verbatim; nothing there is edited.

  ────────────────────────────────────────────────────────────────────────
  THE LINE THIS FILE HOLDS

  Culinary process is written in full: salt percentages, temperatures, timings,
  and the signals that tell you a ferment has gone wrong. That is craft, it is
  well established, and getting it right matters - a kraut left above the brine
  is a real hazard, not a stylistic failure.

  Herbal process is written as TECHNIQUE ONLY. How to make an infusion, how a
  decoction differs, why a covered cup keeps what an open one loses. There are
  no doses, no frequencies, and no "take this for that" anywhere in this file.
  Several of these herbs are pharmacologically active and carry real
  interactions - the app already flags them and points at a clinician, and a
  method note must not quietly become a prescription.

  Three groups get NO process at all, deliberately:

    - "Working with care" in the diabetes guide - meds needing adjustment,
      testing frequency, what to bring to a visit. That is clinical guidance and
      it is not mine to instruct.
    - "Remission" in the same guide, for the same reason.
    - The rationale items throughout - "Live cultures for the gut", "Fat that
      carries vitamins", "Provision-ground economy". These are reasons and
      history, not things you make. There is no process to write.

  Cultural practices - libation, the grater as family memory, serving others
  first - are described as what the practice IS, never as instructions for
  performing someone's tradition.
  ────────────────────────────────────────────────────────────────────────
*/

export type ApothecaryDepth = {
  /** The process itself. */
  how: string;
  /** The failure or safety signal, where a real one exists. */
  watch?: string;
};

export const apothecaryDepth: Record<string, ApothecaryDepth> = {

  /* ═══════════ FERMENTATION ═══════════ */

  'Quick-pickled radish & mustard shoots': {
    how: 'Pack the shoots into a clean jar. Bring equal parts vinegar and water to a simmer with a tablespoon of salt and a teaspoon of sugar per two cups, pour it over hot, and let it cool on the counter uncovered before you lid it. Twenty-four hours gets you tang; the heat softens over the first week.',
    watch: 'This is a vinegar pickle, not a live ferment - it is acidic from the moment you pour. Keep it refrigerated after the first day and use within a month.',
  },
  'Collard & cabbage kraut': {
    how: 'Weigh the shredded greens and add exactly 2% of that weight in salt - 20g per kilo. Massage until the leaves slump and release enough liquid to cover them, which takes longer than you expect. Pack hard into the jar, press until brine rises over the top, and weight it down. Ferment at room temperature, 18-22C, for seven to fourteen days, tasting from day five.',
    watch: 'Everything must stay under the brine - that is the one rule that matters. A flat white film is kahm yeast and can be skimmed. Fuzzy growth, or anything blue, green or black, means discard the jar; do not scoop around it.',
  },
  'Green sauce that sours': {
    how: 'Blend the herbs with oil, garlic and salt as usual, then leave the jar loosely covered at room temperature for a single day. The lactic bacteria already on the leaves do the work. Refrigerate as soon as you taste the first faint fizz.',
    watch: 'One day, not three. This is a short sour with no protective brine behind it, so it goes into the fridge the moment it turns.',
  },
  'Mushroom garum': {
    how: 'Chop the mushrooms and weigh them, then add salt at around 4% of that weight plus a spoonful of koji if you have it. Seal and hold somewhere warm - 55-60C in a low oven or a proofing box - for two to three weeks, stirring every few days. Strain through cloth; the dark liquid is the garum.',
    watch: 'Salt and warmth are what keep this safe over weeks. Do not reduce the salt to taste, and do not run it at room temperature.',
  },
  'Koji-cured mushroom "bacon"': {
    how: 'Dust thick oyster caps with koji powder or crumbled rice koji, lay them in a single layer and refrigerate uncovered for one to two days. The enzymes break starch to sugar and protein to savoury. Pat dry, then sear hard in a hot pan - the sugars that developed are what let it caramelise like it does.',
    watch: 'Uncovered and cold, so the surface dries rather than sweats. If it turns slimy rather than tacky, start again.',
  },
  'Miso-cultured broth base': {
    how: 'Build and finish the broth completely, then take it off the heat and let it stop steaming hard. Slake the miso with a ladle of the warm broth in a separate bowl until smooth, and stir that back through.',
    watch: 'Boiling after the miso goes in kills the live cultures and coarsens the flavour. Off the heat, every time.',
  },
  'Ginger bug & ginger beer': {
    how: 'Start the bug with equal spoonfuls of grated unpeeled ginger and sugar in water, and feed it the same amount daily. In three to five days it fizzes when stirred and the bug is alive. Strain some into sweetened ginger tea, bottle it, and leave it at room temperature one to three days before refrigerating.',
    watch: 'Bottled ferments build real pressure. Use bottles rated for it, burp them daily, and refrigerate as soon as they are lively - cold is the brake. A plastic test bottle that goes rock-hard tells you the glass ones are ready.',
  },
  'Cashew & coconut yogurt': {
    how: 'Blend soaked cashews and coconut milk completely smooth, warm to about 110F, then whisk in the culture off the heat. Hold it at that temperature - oven with the light on, or a yogurt setting - for eight to twelve hours until it smells sour and holds a wobble. Chill to set fully.',
    watch: 'Everything the culture touches should be scalded clean first. If it smells yeasty or cheesy rather than cleanly sour, discard it.',
  },
  'Sorrel (hibiscus) with a slow fizz': {
    how: 'Brew and sweeten the sorrel, cool it to room temperature, then leave it loosely covered a day or two until it prickles on the tongue. Bottle and refrigerate at the first sign of carbonation.',
    watch: 'Same pressure rule as ginger beer. Refrigerate before it gets lively rather than after.',
  },

  /* ═══════════ MUSHROOM COOKERY ═══════════ */

  'Oyster-mushroom pepperpot': {
    how: 'Tear the oysters by hand rather than cutting - the ragged edges catch and brown. Sear them dry in a hot pot until they stop weeping and start colouring, then build the pot around them with thyme, whole scotch bonnet and the roots. Simmer long enough for the provisions to yield.',
    watch: 'Oil before the water has cooked off steams them grey. Dry pan first, fat afterwards.',
  },
  'Callaloo & shiitake pot': {
    how: 'Soak dried shiitake in hot water twenty minutes and keep the soaking liquid - that is the savoury base doing the work salt meat used to. Slice the caps, sear, then add the strained liquid with the callaloo and cook the greens down.',
    watch: 'Pour the soaking liquid off carefully and leave the last spoonful behind; grit settles there.',
  },
  'Smoky maitake oxtail-style gravy': {
    how: 'Roast the maitake ruffles hard until the edges are crisp, then build a brown gravy with onion, tomato and a dark roux and let the mushrooms braise in it. The ruffles hold the sauce the way the meat used to.',
    watch: 'Roast before braising. Straight into liquid gives you texture without the depth.',
  },
  'Jerk king-oyster skewers': {
    how: 'Score the thick stems in a crosshatch about halfway through and marinate at least four hours - the cuts are what let the jerk in past the surface. Thread and grill over real fire, turning until the scored faces char and open.',
    watch: 'Unscored stems take marinade only on the outside and stay bland in the middle.',
  },
  'Suya-spiced portobello': {
    how: 'Wipe the caps and remove the gills so the rub sits on the flesh. Brush with oil, press the suya rub on firmly and grill gill-side up first so the cap holds its juices, turning once.',
    watch: 'The rub is nut-free here; check it against your own profile before it goes on.',
  },
  'Lion’s mane grill-press steak': {
    how: 'Press the whole fruiting body between two pans or under a weight for ten minutes to drive out water and compact the strands. Sear in a hot pan under the same weight, turning once, until both faces are deep gold and the interior turns tender and shreddable.',
    watch: 'Unpressed, it steams in its own water and never develops the crust.',
  },
  'Reishi-ginger sipping broth': {
    how: 'Reishi is woody, so this is a decoction rather than a steep: simmer the sliced mushroom in water for at least forty-five minutes, adding ginger and a date in the last ten. Strain and sip warm.',
    watch: 'A five-minute steep pulls almost nothing out of hard fungal tissue. Time and simmer, not just hot water.',
  },
  'Immune shiitake dashi': {
    how: 'Cover dried shiitake with cold water and leave them overnight in the fridge rather than rushing it with heat - a cold extraction is cleaner and less bitter. Strain, then warm gently to use as a base.',
    watch: 'Boiling the soak turns it harsh. Warm it, do not boil it.',
  },
  'Lion’s mane recovery broth': {
    how: 'Simmer sliced lion’s mane in water or a light stock for thirty to forty minutes so the tissue softens and gives, then strain or leave the pieces in.',
  },
  'Mushroom taco crumble': {
    how: 'Pulse cremini in a food processor to a coarse crumb - stop well before paste. Spread on a dry hot pan in a single layer and leave it alone until the water has gone and it starts to catch, then add spice and fat.',
    watch: 'Crowding the pan steams the crumble into a wet mince. Two batches beat one.',
  },
  'Oyster bacalao-style sauté': {
    how: 'Tear the oysters, sear them dry and set aside. Soften peppers and onion slowly until sweet, then return the mushrooms so they take the sofrito without going soft.',
  },
  'Fonio & mushroom breakfast bowl': {
    how: 'Fonio steams in five minutes, so cook the mushrooms first and hold them. Rinse the fonio twice, steam it, fork it loose, then fold the mushrooms through with the pan juices.',
  },

  /* ═══════════ COCONUT ═══════════ */

  'Coconut milk & rundown': {
    how: 'Simmer the coconut milk alone over low heat, uncovered, until it thickens, the oil separates out and it smells nutty rather than raw. That is the "run down" - twelve minutes or so, and it cannot be rushed on high heat. Build the stew into that base.',
    watch: 'A hard boil splits it into grease and curd instead of reducing it.',
  },
  'Coconut cream for rice & peas': {
    how: 'Use the thick cream from the top of an unshaken tin, or the first press of fresh grated flesh. Cook the peas first, then the rice in the coconut liquid with thyme and a whole scotch bonnet laid on top, undisturbed.',
    watch: 'Lift the pepper out whole before serving unless you want the full heat. Stirring rice as it steams turns it sticky.',
  },
  'Fresh-grated vs canned': {
    how: 'To use fresh: crack the nut, prise the flesh from the shell, grate it and pour over hot water, then squeeze through cloth. The first squeeze is cream, the second is milk. Canned works; check the label for gums and stabilisers.',
  },
  'Coconut water after farm work': {
    how: 'Drink it cold from a young green nut, or from a carton with nothing added. Pair it with a pinch of salt on heavy-sweat days, since coconut water is high in potassium but low in sodium.',
  },
  'MCT quick energy': {
    how: 'Start with a teaspoon stirred into a warm drink or blended into a smoothie, not a tablespoon straight.',
    watch: 'Too much too soon causes cramping and urgency. Build up slowly.',
  },
  'Coconut + fruit pre-workout': {
    how: 'Eat it thirty to sixty minutes before you start so the fat has time to slow the sugar rather than sitting heavy while you move.',
  },
  'Oil as skin & hair ritual': {
    how: 'Warm solid oil between the palms until it melts, then work it into the scalp in sections with the pads of the fingers rather than the nails. On skin, apply to damp skin so it seals water in rather than sitting on top.',
  },

  /* ═══════════ WATER ═══════════ */

  'Sunrise pint before anything else': {
    how: 'Fill the glass the night before and leave it where you will see it first. Drink it before coffee, before the phone.',
  },
  'Pre-meal glass, 30 minutes before plates': {
    how: 'A full glass half an hour ahead, rather than a large volume during the meal.',
  },
  'Sip through farm work': {
    how: 'Carry a marked bottle and take a mouthful every fifteen minutes whether or not you feel thirsty - thirst lags behind loss on a hot day.',
  },
  'Sea moss water': {
    how: 'Whisk a spoonful of prepared gel into a little warm water until it disperses completely, then top up the bottle. It will not dissolve if you drop it straight into a full cold bottle.',
    watch: 'Make the gel from cleaned, soaked moss and keep it refrigerated; it holds about a week.',
  },
  'Salt + lime field water': {
    how: 'A quarter teaspoon of salt and the juice of half a lime per litre, shaken. Taste it - it should read faintly salty, not like seawater.',
  },
  'Cucumber-borage cooler': {
    how: 'Slice cucumber and bruise the borage leaves lightly, cover with cold water and leave in the fridge two to four hours. This is a cold infusion; heat turns it grassy.',
  },
  'Cold-water finish': {
    how: 'Finish an ordinary warm shower with thirty to sixty seconds of cold, breathing slowly out rather than gasping in.',
    watch: 'If you have a heart condition, this is one to raise with a clinician before starting.',
  },
  'Warm mineral baths': {
    how: 'A couple of handfuls of salts in water warm enough to relax in but not to redden the skin, for fifteen to twenty minutes. Drink water afterwards.',
  },
  'Steam & herbs': {
    how: 'Pour just-boiled water over the herbs in a bowl, wait a moment for the first scald of steam to pass, then lean over with a towel over the head and breathe through the nose for five minutes.',
    watch: 'Keep a hand’s width back from the surface, and keep children away from the bowl entirely - scalds are the real risk here, not the herbs.',
  },

  /* ═══════════ HONEY ═══════════ */

  'Pre-workout honey water': {
    how: 'A tablespoon stirred into warm water until it dissolves, taken about thirty minutes before you start. Warm water first - honey seizes into a lump in cold.',
  },
  'Intra-session quick carbs': {
    how: 'Carry it already diluted in a bottle rather than trying to take it neat mid-session.',
  },
  'Post-workout with protein': {
    how: 'Stir it into the protein drink or the yogurt rather than taking it separately, so the sugar and protein arrive together.',
  },

  /* ═══════════ NERVINES: TECHNIQUE, NOT DOSAGE ═══════════ */

  'Blue vervain': {
    how: 'A leaf-and-flower infusion: just-off-boil water, poured over and left COVERED for ten minutes. Covering matters - the volatile oils leave with the steam otherwise. The bitterness is functional and does not want sweetening away.',
    watch: 'Dose, frequency and whether this herb suits you at all are questions for a herbalist or clinician, not for this screen. Check the caution flags before brewing.',
  },
  'Lemon balm': {
    how: 'Delicate and volatile, so a covered steep of five minutes in water just off the boil. Fresh leaf gives far more than dried, and dried lemon balm fades fast in the cupboard.',
    watch: 'See the caution flags on this screen before use.',
  },
  'Passionflower': {
    how: 'The whole aerial part, infused covered for ten to fifteen minutes so the water has time to work on the plant material.',
    watch: 'Dose and suitability belong with a clinician, particularly alongside any sedative medication. See the caution flags.',
  },
  'Tulsi (holy basil)': {
    how: 'Covered infusion, five to seven minutes. Fresh leaf if you grow it, otherwise whole dried leaf rather than dust.',
    watch: 'See the caution flags on this screen before use.',
  },
  'Ashwagandha': {
    how: 'A root, so it is decocted rather than steeped: simmer gently in water or milk for fifteen to twenty minutes, covered. Hot water alone barely touches it.',
    watch: 'This root has documented interactions, including with thyroid and sedative medication. Whether to take it, and how much, is a clinical question - this note covers only how a decoction is made.',
  },
  'Reishi': {
    how: 'Woody fungal tissue, so a long decoction: sliced reishi simmered at least forty-five minutes, often longer. Ginger or date is traditionally added late to soften the bitterness.',
    watch: 'See the caution flags, particularly alongside anticoagulants.',
  },
  'Motherwort': {
    how: 'A covered infusion of the aerial parts, ten minutes. Strongly bitter, which is characteristic rather than a fault.',
    watch: 'Has documented interactions including with cardiac and anticoagulant medication. Suitability and dose are clinical questions. See the caution flags.',
  },
  'Rose & hibiscus': {
    how: 'Both are delicate colour and acid: pour hot but not boiling water over, cover, and steep five minutes. Longer turns hibiscus harshly sour and dulls rose entirely.',
  },
  'Mugwort': {
    how: 'A covered infusion, five to ten minutes; it is bitter and aromatic.',
    watch: 'Traditionally avoided in pregnancy. Check the caution flags on this screen, and treat suitability as a clinical question rather than something a method note can answer.',
  },
  'Morning tulsi + sunlight': {
    how: 'Brew the cup first, then take it outside and stay out for ten minutes while you drink it. The point is that the light and the cup happen together rather than the cup being carried back to a desk.',
  },
  'Evening nervine + long-exhale breath': {
    how: 'Brew, sit, and breathe with the exhale roughly twice the length of the inhale - in for four, out for eight - for a few minutes while the cup cools enough to drink.',
  },
  'Weekly check-in': {
    how: 'Pick one fixed time a week and read back the logs together - mood against sleep, sleep against plates - rather than trying to recall how the week felt.',
  },

  /* ═══════════ CEREMONY: WHAT THE PRACTICE IS ═══════════ */

  'Three breaths and a name': {
    how: 'Three slow breaths before anyone lifts a fork, and the naming aloud of someone whose hands are in the food - who grew it, who taught the dish, who is missing from the table.',
  },
  'Sit down, phone away': {
    how: 'Phone face down and out of reach rather than face down beside the plate, and everybody seated before anybody starts.',
  },
  'Water and a clean table': {
    how: 'Clear and wipe the surface and set water down before the food arrives, so the table is ready rather than being negotiated around.',
  },
  'Chew until it stops being food': {
    how: 'Chew each mouthful until the texture is gone and swallowing happens without a decision. Setting the fork down between mouthfuls is what makes it possible.',
  },
  'Serve others first': {
    how: 'Plates go out from the middle before your own, and the eldest or the guest is served first in most diaspora households.',
  },
  'Taste out loud': {
    how: 'Say what you notice - the heat, the smoke, the sourness - so the cook hears the food landing and the table pays attention.',
  },
  'Walk, don’t collapse': {
    how: 'Ten to fifteen minutes of easy walking within half an hour of finishing.',
  },
  'Clean as gratitude': {
    how: 'Wash as a closing rather than a chore, ideally with whoever did not cook doing it.',
  },
  'Log while it’s warm': {
    how: 'Log the plate before you leave the table, while you still remember what was on it.',
  },

  /* ═══════════ SWAPS: WHERE THERE IS A PROCESS ═══════════ */

  'Hemp + pea flour blend': {
    how: 'Blend roughly two parts pea to one part hemp by weight for a fuller amino profile than either alone, and mix it dry in a jar so it is ready by the spoon.',
  },
  'Pumpkin-seed butter': {
    how: 'Toast the seeds until they pop and smell nutty, cool them, then run the processor for eight to ten minutes - it goes from sand to paste to butter, and it stalls twice before it gets there.',
    watch: 'Adding oil early stops it releasing its own. Wait it out.',
  },
  'Beet + citrus pre-workout': {
    how: 'Juice or blend the beet with the citrus and take it sixty to ninety minutes before the session rather than immediately before.',
  },
  'Turmeric + pepper in the pot': {
    how: 'Bloom the turmeric in the fat at the start with a good grind of black pepper, rather than stirring it in at the end - the piperine and the fat both need to be there with it.',
  },
  'Iron from amaranth + vitamin C': {
    how: 'Put the acid in the same mouthful, not the same day - lime over the greens at the table, tomato in the pot.',
  },
  'Ferments over probiotic pills': {
    how: 'A few spoonfuls with a meal most days beats a large serving occasionally; keep two or three different jars going so the mix varies.',
  },
  'Microgreens over greens powder': {
    how: 'Cut them fresh onto the plate at serving and never cook them - the compounds the powder is sold for do not survive the pan.',
  },

  /* ═══════════ DIABETES: THE PLATE ONLY ═══════════ */

  'Beans at every lunch': {
    how: 'Cook a pot at the start of the week and portion it, so the default lunch already exists when the day gets away from you.',
  },
  'Intact grains over flours': {
    how: 'Cook the grain whole - sorghum, millet, intact wheat berries - rather than as flour. Batch it, because intact grains take longer and that is the usual reason people fall back to flour.',
  },
  'Greens before starch': {
    how: 'Serve and eat the greens and the beans first, and bring the starch to the table afterwards rather than plating everything at once.',
  },
  'Walk after you eat': {
    how: 'Ten to twenty minutes of easy walking, starting within about half an hour of the meal.',
  },
  'Okra and soluble fiber': {
    how: 'Sear it whole and dry in a hot pan before liquid goes near it, which keeps the texture while leaving the soluble fibre intact.',
  },
};

export const APO_DEPTH_COUNT = Object.keys(apothecaryDepth).length;
