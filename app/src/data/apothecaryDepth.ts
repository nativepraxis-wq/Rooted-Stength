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
  LATER: `context`, AND WHY THOSE ITEMS ARE NO LONGER BLANK

  The three groups above kept no `how`, and still have none. But for a while
  they rendered as nothing at all, which was the wrong conclusion from a right
  premise. The premise was that a method note must not become a prescription or
  a script for someone else's tradition. "Therefore say nothing" does not
  follow, and on the diabetes screen it was actively unhelpful: an item reading
  "Meds need adjusting fast" with no explanation is an instruction without a
  reason, which is the least persuasive thing a safety note can be.

  So those items now carry `context` instead - what the mechanism IS, what the
  practice IS, what the evidence does and does not show. For the clinical ones
  it explains why the decision belongs to a prescriber rather than making it,
  which argues FOR the appointment instead of standing in for it. Still no
  doses, still no instructions, still no numbers on this screen.
  ────────────────────────────────────────────────────────────────────────
  ────────────────────────────────────────────────────────────────────────
*/

export type ApothecaryDepth = {
  /**
   * The process itself. Optional, because a number of these items are not things
   * you make - see `context`.
   */
  how?: string;
  /**
   * Depth for items that have no process to write.
   *
   * The header above names three groups that deliberately got no `how`: clinical
   * guidance, cultural practice, and pure rationale. Leaving them with nothing at
   * all was the wrong conclusion from a right premise. The premise was that a
   * method note must not quietly become a prescription, or a script for
   * performing someone else's tradition. `context` honours that and still says
   * something worth reading.
   *
   * So: what the practice IS, what the mechanism IS, what the evidence does and
   * does not show. Never an instruction and never a dose - and for the clinical
   * items it explains why the question belongs to a clinician instead of
   * answering it.
   */
  context?: string;
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
  /* ═══════════ SUPPLEMENT SWAPS ═══════════ */

  'Lentil & pea microgreens over grains': {
    how: 'Soak the seed overnight, spread it thickly on shallow trays of damp compost, and keep it covered and dark for the first three or four days so it roots hard before it reaches for light. Uncover, give it bright indirect light, and water from below to keep the leaves dry - wet leaves in a warm tray is how you get mould rather than greens. Cut above the soil line with scissors at eight to eleven days, when the first true leaves are showing. Scatter them over the grain off the heat, never into the pot: they are a fresh garnish and heat collapses both the texture and the point of them.',
    watch: 'Trays are warm, damp and dense - exactly what mould likes. Airflow and bottom-watering are what prevent it, and a fuzzy grey bloom at the soil line means start again rather than rinse and hope.',
  },
  'Creatine \u2014 the one worth buying': {
    how: 'Buy creatine monohydrate, plain and unflavoured, and ignore the rest. It is the form the research was done on, it is the cheapest by a wide margin, and the more elaborate variants - hydrochloride, buffered, liquid - are more expensive without better evidence behind them. Look for a third-party purity certification on the tub, because this is an unregulated category and that mark is doing real work.',
    context: 'This is the one item on the whole screen where the supplement genuinely beats the food, and the page says so rather than pretending otherwise. Creatine is concentrated in meat, plant-based intakes are low, and it is among the most-studied sports supplements there is. No dose is given here - that is a conversation for a clinician or a coach who knows you.',
  },
  'Honey water intra-workout': {
    how: 'Dissolve the honey in a little warm water first and then top it up cold, because honey will sit in a stubborn lump at the bottom of a cold bottle and never disperse. A pinch of salt and a squeeze of citrus turns it from sweet water into something that replaces what a heavy sweat actually takes out - the sodium matters as much as the sugar on a long hot session. Sip it across the session rather than drinking it in one go.',
  },
  'B12 & vitamin D \u2014 supplement, don\u2019t improvise': {
    context: 'No `how` here, deliberately, because the item\u2019s own point is that this is not a thing to work out for yourself. B12 is made by bacteria rather than by plants, and the plant foods often claimed to supply it - spirulina, unfortified nutritional yeast, fermented foods - largely carry analogues that occupy the receptor without doing the job, which can look like sufficiency on a cheap test while a deficiency progresses. Vitamin D is made in skin from sunlight, and how much you make depends on latitude, season, age and melanin: darker skin needs substantially more sun exposure for the same synthesis, which is exactly why this cannot be estimated from a card. Both are testable. Test, then talk to a clinician about what the number means.',
  },
  'Sea moss + moringa': {
    how: 'Rinse the sea moss until the water runs clear and the low-tide smell goes, soak it until it swells pale and translucent, then blend with fresh water into a gel that sets in the fridge without heat. Shade-dry the moringa rather than sun-drying it - direct sun takes the colour and a good part of the vitamin content with it - and grind only once it shatters. Stir both in off the heat at the end. Boiling moringa makes it bitter and cooking the gel just thins it back to liquid.',
    context: 'Sea moss carries iodine, and how much varies by orders of magnitude between harvests. That is why the Mineral atlas refuses to put a number on it, and it is why daily use is a clinician conversation rather than a habit to drift into. Too much iodine harms the thyroid as surely as too little.',
  },

  /* ═══════════ HONEY ═══════════ */

  'Raw honey for throat & cough': {
    how: 'Take it neat off the spoon, or stir it into water that is warm rather than boiling - it is the coating of the throat that does the work, so anything that dilutes it thin or washes it straight down is working against you. A squeeze of lemon is traditional and does no harm.',
    context: 'This is one of the better-evidenced entries in the whole Apothecary. Honey performs well for acute night-time cough in children over one, comparing favourably with several over-the-counter cough preparations, and it is cheap and pleasant. The demulcent effect - a physical coating - is most of the mechanism, which is why the delivery above matters more than the variety of honey.',
    watch: 'Never give honey to an infant under twelve months, in any form, cooked or raw. Infant botulism is rare, serious, and entirely avoidable by waiting. This is the single most important line on this screen.',
  },
  'Wound-care lineage': {
    context: 'The use of honey on wounds is long and genuinely documented, and it did not stay folk practice: medical-grade honey is a licensed product, gamma-irradiated to kill spores and standardised for antibacterial activity, and it is used in dressings under clinical supervision today. The mechanism is real - high sugar draws water out of bacteria, gluconic acid keeps the pH low, and an enzyme in the honey slowly generates hydrogen peroxide.',
    watch: 'None of that transfers to the jar in your cupboard. Table honey is not sterile, is not standardised, and can carry the same spores that make it unsafe for infants - which is exactly the problem in an open wound. Wound care is a clinical matter.',
  },
  'Local honey & the seasons': {
    context: 'Worth being straight about: the popular idea that local honey desensitises you to seasonal allergies is not well supported. Hay fever is mostly driven by light, wind-borne pollen from grasses and trees, while honey carries the heavy, sticky, insect-borne pollen bees actually visit - largely not the pollen making you sneeze - and the trials that have looked for the effect have not found a convincing one. What local honey genuinely gives you is a real record of a particular place and season, and a beekeeper you can ask questions of. That is worth buying it for.',
  },
  'Tanzania & Zanzibar apiculture': {
    context: 'East African beekeeping has largely worked with the bees rather than around them: log and bark hives hung high in trees, colonies of African honeybee subspecies that are more defensive and far more inclined to abscond than the European stock most Western equipment was designed for. Miombo woodland honey is a significant forest product and a real argument for keeping the woodland standing, since the hives depend on the trees. Much of the harvesting is done at night, when the colony is settled.',
  },
  'Black beekeeping in the Americas': {
    context: 'Beekeeping travelled with people who already knew it, and honey hunting and keeping were established across West and Central Africa long before the Atlantic crossing. In the Americas that knowledge went into plantation apiaries and, later, into independent Black farms where bees were both an income and a way to hold ground. There is a live present tense to this: Black-led beekeeping cooperatives and urban apiaries are a visible part of the current food-sovereignty movement.',
  },
  'Honey as offering': {
    context: 'Honey appears as an offering across a wide range of traditions, including several in the West African and diaspora religious world, where it is associated with sweetness, with particular deities, and with the asking of favour. What is offered, by whom, and on whose authority are matters internal to those traditions. This app names that the practice exists and does not print instructions for performing it.',
  },
  'Strict vegan: swap it': {
    how: 'Date syrup is the closest match for depth and minerals; maple is thinner and cleaner; agave is the most neutral and the sweetest by volume, so use less of it. In baking, expect differences rather than a straight substitution - honey is hygroscopic and holds moisture, so bakes made with it stay soft longer, and it browns faster because of its fructose. Drop the oven about fifteen degrees and check early when swapping in the other direction. In a dressing or a drink, any of them stands in without adjustment.',
  },
  'Bee-inclusive plant-based': {
    context: 'A real and widely held position rather than a compromise: eating plants for health, climate and animal-welfare reasons while including honey from small-scale keepers, on the argument that the relationship is closer to husbandry than to extraction and that pollinator-keeping sustains the plants the rest of the diet depends on. Strict veganism disagrees, on the grounds that the bees are still being kept and their stores still taken. The page carries both because both are honestly held.',
  },
  'Buy Black & local': {
    how: 'Ask three questions at the market and you will learn most of what matters: where the hives actually are, what the bees were foraging in that batch, and whether it has been heated or filtered. Raw, minimally filtered honey clouds and crystallises over time - that is a sign of the real thing rather than a fault, and gentle warmth in a water bath brings it back. Buying direct from the keeper is also the only reliable defence against a category with a long and well-documented history of adulteration with cheap syrups.',
  },

  /* ═══════════ FOOD AS CEREMONY ═══════════ */

  'Sunday abundance': {
    how: 'The practical spine of it is one big pot and a hot oven doing several jobs at once: beans that will be lunch three times, a tray of roots, a pot of greens, rice that reheats. Cook the things that improve on standing rather than the things that do not - stews, braises and beans are better on Monday, dressed greens and fried food are not. Portion it while it is still warm and it becomes next week\u2019s default instead of next week\u2019s leftovers.',
    context: 'The abundance is doing social work as much as nutritional work. A table with more on it than the household needs is what makes an unannounced visitor ordinary rather than awkward, and that is the point of the practice.',
  },
  'A lighter day after': {
    how: 'Not a fast and not a punishment - a smaller plate built from what is already cooked. Broth from the bones of the meal, greens, a little of the grain, plenty of water. The pattern is a natural swing rather than a correction, and treating it as making up for yesterday is how a rhythm turns into a cycle of restriction.',
  },
  'Fasting with elders\u2019 caution': {
    context: 'Fasting appears across most of the traditions this app draws on, and it is normal, communal and old. It is also the practice on this page with the most people who should not simply adopt it: anyone on blood-sugar medication, where fasting can drop glucose dangerously; anyone on medication that has to be taken with food; people who are pregnant or nursing; people with a history of disordered eating; and frail elders, for whom a missed day of protein is harder to recover than it is at thirty. The elders\u2019 caution in the title is the traditional version of exactly this knowledge.',
    watch: 'If you take medication for blood sugar or blood pressure, do not fast without speaking to your clinician first. This is the interaction most likely to cause immediate harm.',
  },

  /* ═══════════ COCONUT ═══════════ */

  'Fat that carries vitamins': {
    context: 'Vitamins A, D, E and K are fat-soluble, which means they need fat present in the same meal to be absorbed at all - and the carotenoids in greens and orange roots behave the same way. This is why greens cooked down in coconut milk deliver more of what is in them than the same greens boiled and drained, and it is the quiet reason so many traditional greens dishes are built on a fat rather than on water. The pairing is not a flourish; it is the mechanism.',
  },
  'Libations & offerings': {
    context: 'Pouring a portion of a drink onto the ground before anyone drinks is a practice found widely across West and Central African traditions and throughout the diaspora, and it is generally understood as acknowledging ancestors and those who are not at the table. Coconut water appears in this role in several Caribbean and West African contexts. What is poured, when, by whom and with what words are matters internal to particular traditions and particular families, and this app describes that the practice exists rather than telling anyone how to perform it.',
  },
  'The grater as family memory': {
    context: 'Before a tin of coconut milk existed, extracting it was a household job of real duration: the nut cracked, the flesh grated by hand against a serrated blade or a bench-mounted grater that you sat astride, then the gratings squeezed with hot water through cloth to get the first pressing, and squeezed again for the thinner second. That labour is why the tool survives in kitchens that no longer strictly need it, and why the sound of it is a memory marker for a great many people. The first and second pressings are still different ingredients, which is why old recipes distinguish them.',
  },
  'Provision-ground economy': {
    context: 'Across the plantation Caribbean, enslaved people were commonly allotted marginal land - the provision grounds - and expected to feed themselves from it. What grew there was substantially African and Indigenous rather than European: yam, plantain, callaloo, pigeon pea, coconut. The surplus was sold at Sunday markets, and the money and the networks that came out of those markets are a documented root of Black economic life in the region. It is a genuinely double-edged history, an imposition that became a foundation, and much of what this app calls the diaspora plate comes directly from it.',
  },

  /* ═══════════ WATER - SACRED ═══════════ */

  'Libation': {
    context: 'The same practice named under coconut, and one of the most widely attested rituals across African and diaspora traditions: a measure of water or drink returned to the ground for the ancestors before the living drink. It opens gatherings, funerals and ceremonies, and in many settings the naming of the dead aloud is part of it. Who pours, in what order, and what is said belongs to the tradition and the family. Described here, not instructed.',
  },
  'River & ocean ceremony': {
    context: 'Rivers and the sea hold specific religious meaning across a range of West African and diaspora traditions - as deities, as boundaries, and in the Atlantic case as a passage and a grave. Offerings and ceremonies at water are correspondingly common and correspondingly serious. These are living religious practices with their own authorities, initiations and rules, and they are not a wellness technique to adopt. This app records that they exist.',
  },
  'Blessing the day\u2019s water': {
    context: 'Speaking over water before drinking it appears in many traditions, religious and domestic, and its meaning is entirely dependent on which one you are standing in. The most that can honestly be said here is that treating the first drink of the day as a marked moment rather than an automatic one is a widespread human practice. No claim is made that it alters the water.',
  },

  /* ═══════════ FERMENTATION - WHY ═══════════ */

  'Live cultures for the gut': {
    context: 'A live ferment delivers organisms, mostly lactic acid bacteria, and the honest state of the evidence is that this is promising and not settled. Established: fermentation changes food in ways that are measurable, and some specific strains have specific documented effects. Not established: that eating a jar of kraut colonises your gut, or that any particular ferment produces a particular health outcome. Most of these organisms are transient rather than permanent residents. Fermented foods are good food with a plausible and actively researched benefit, and that is the claim this page makes.',
  },
  'Nutrients unlocked': {
    context: 'This one is better established than the gut story and does more work. Fermentation cuts phytate, which binds zinc, iron, magnesium and calcium in grains and legumes and prevents you absorbing them - the same mechanism the Mineral atlas describes under zinc. It also produces B vitamins including folate, breaks down some of the oligosaccharides responsible for the gas beans are famous for, and pre-digests protein into forms the gut takes up more readily. This is why leavened bread beats unleavened, and why a fermented porridge is not the same food as an unfermented one.',
  },
  'Preserving the harvest': {
    context: 'The original reason, and still the sturdiest. Lactic bacteria convert sugars to acid, the pH falls below where spoilage organisms and pathogens can operate, and the food holds for months without refrigeration or fuel. That is what made a summer glut survive a winter, and it is why nearly every food culture on earth arrived at some version of it independently. Flavour and nutrition are real benefits, but they are downstream of a preservation technology that predates any understanding of why it worked.',
  },

  /* ═══════════ DIABETES - context only ═══════════ */
  /*
    No `how` anywhere in this group, and that is the same line PR #37 drew. What
    changes is that "no instruction" no longer has to mean "nothing at all":
    these explain the mechanism and why the decision is a clinician's, which
    pushes toward the visit rather than substituting for it.
  */

  'Low-fat whole-plant diets': {
    context: 'The interest here comes from intervention trials in which whole-food plant-based patterns, low in added fat, improved insulin sensitivity and in some participants reduced or removed the need for medication. The proposed mechanism is a reduction in fat stored inside muscle and liver cells, where it appears to interfere with insulin signalling. Real findings, in structured and supported settings, and generally in people with type 2 rather than type 1. What they cannot tell you is what your medication should be tomorrow.',
  },
  'Weight is a lever, not the whole story': {
    context: 'Weight loss is strongly associated with type 2 remission, and the association is dose-related - but plenty of people improve their glucose control markedly without much weight change, and plenty lose weight without remission. Sleep, muscle mass, stress, medication and how long the diabetes has been established all move the outcome independently. Treating the scale as the only instrument tends to hide the levers that are actually moving.',
  },
  'Bitter melon (cerasee)': {
    context: 'Bitter melon has been studied for blood-sugar effects and there is a plausible case that it lowers glucose. On this page that is a caution rather than a recommendation, because a food that lowers blood sugar taken alongside medication that also lowers blood sugar can stack, and the failure mode is hypoglycaemia rather than a disappointing result. The foraged-foods screen carries the same plant with its own warning against use in pregnancy.',
    watch: 'If you take any blood-sugar medication, this belongs in a conversation with your clinician before it belongs in your cup.',
  },
  'Fenugreek & cinnamon': {
    context: 'Both have been studied for glucose and both have mixed, modest and inconsistent results - cinnamon in particular has trials pointing in several directions, and much of the effect that does appear is small next to medication or diet. The same stacking caution applies as for bitter melon. Worth adding to a plate for flavour; not worth treating as a lever you can pull.',
    watch: 'Cassia cinnamon, the common supermarket kind, contains coumarin, which is hard on the liver in quantity over time. Ceylon cinnamon carries far less. Sprinkling is fine; daily heaped spoonfuls are not.',
  },
  'Meds need adjusting fast': {
    context: 'The reason this is urgent rather than eventual: insulin and the sulfonylurea class lower blood sugar by a fixed amount regardless of what you ate. Change the diet substantially and the same dose can suddenly be too much, and the result is hypoglycaemia - which arrives in hours or days, not months. This is the mechanism behind the instruction, and it is precisely why the adjustment is a prescriber\u2019s decision and not one this app will offer a number for.',
  },
  'Test more, not less, at first': {
    context: 'A period of dietary change is exactly when your readings stop being predictable, which makes it the worst possible time to test less. More frequent testing during a change is what turns a dangerous surprise into a data point you and your clinician can act on. How often, and what to do with what you see, is theirs to say.',
  },
  'Bring the food log to the visit': {
    context: 'A clinician looking at a fortnight of readings alongside what was actually eaten can see cause and effect that neither of you can see from the readings alone. Without the food alongside it, an appointment is largely guesswork about why a number moved. The log is what makes the visit useful - which is the whole reason this item is here rather than a set of targets.',
  },

};

export const APO_DEPTH_COUNT = Object.keys(apothecaryDepth).length;
