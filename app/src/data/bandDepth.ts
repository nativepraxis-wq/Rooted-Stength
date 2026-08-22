/*
  Depth for the two banded screens: Nutrient Frequencies and Tea Intelligence.

  Neither had been touched by any earlier depth pass. Both list items with a
  `why` - what the food or herb is for - and no method at all, except that the
  tea items carry a one-line `brew`.

  Separate file; content.ts is untouched per README rule 3.

  ────────────────────────────────────────────────────────────────────────
  TWO DIFFERENT JOBS, TWO DIFFERENT SHAPES

  FREQUENCY FOODS get `eat` - how to actually cook or use the thing so it does
  what the band claims. The bands are framed as states ("for scattered, anxious
  or depleted days"), and the honest gap in that framing is that a food only
  does the physiological thing if it is prepared in a way that lets it. Iron
  needs the vitamin C; magnesium needs the phytate dealt with; the tryptophan
  story needs the carbohydrate. `eat` closes that gap.

  TEA HERBS get `brewWhy` - what the one-line brew instruction is actually
  doing. "Steep 5 min, covered" and "simmer 10 min" are not interchangeable and
  the difference is not fussiness: volatile oils leave in the steam if the cup
  is open, and roots and barks do not give anything up to a steep at all.

  NO DOSES AND NO FREQUENCIES ANYWHERE, on either shape. That is the same line
  apothecaryDepth.ts holds, and several of these herbs are pharmacologically
  active with interactions the app already flags. Method is not a prescription.

  Where the app's own data already carries a caution on an item, this file does
  not repeat it - it is rendered from content.ts right next to this text.
  ────────────────────────────────────────────────────────────────────────
*/

export type FreqDepth = {
  /** How to prepare it so it does the thing the band claims. */
  eat: string;
  /** A real caveat, where there is one. */
  note?: string;
};

export const freqDepth: Record<string, FreqDepth> = {
  /* ── Grounding ── */
  'Yam & sweet potato': {
    eat: 'Cook them whole or in large pieces rather than diced small, and give them dry heat where you can - roasting or baking concentrates the sugars and holds the structure, while boiling in a lot of water leaches potassium into liquid you then pour away. Leave the skin on the sweet potato; most of the fibre is there. Eat them warm. The band calls for slowing the system down into the body, and a hot dense bowl does that in a way the same food eaten cold from the fridge does not.',
    note: 'Roasting drives the glycaemic response higher than boiling does, because it converts more starch to sugar. If blood sugar is something you are managing, boiled and cooled is the gentler version of the same food.',
  },
  'Sea moss': {
    eat: 'Rinse until the water runs clear, soak until it swells pale and translucent, then blend with fresh water into a gel that sets cold without any heat. Stir a spoonful into a drink or a stew at the end - cooking it just thins it back out.',
    note: 'Iodine content varies by orders of magnitude between harvests, which is why the Mineral atlas will not put a number on it. Daily use is a clinician conversation, not a habit to drift into.',
  },
  'Black-eyed peas': {
    eat: 'Soak overnight and throw the water away - that soak is what cuts the phytate binding the zinc and iron, and it takes most of the gas-forming sugars with it. Cook them until they are genuinely soft rather than just done; an undercooked bean is hard work for the gut and gives up less of what is in it. Salt at the end. Cook a pot at the start of the week and the slow-burn lunch already exists on the day you have no capacity to build one.',
  },

  /* ── Building ── */
  'Hemp seeds': {
    eat: 'No cooking at all - scatter them over the finished plate. They are soft enough to need no grinding, and heat damages the omega-3 fats that are the reason they are in this band rather than another one. Keep the bag in the fridge or the freezer, because those same fats go rancid at room temperature faster than people expect.',
  },
  'Amaranth & callaloo': {
    eat: 'Braise rather than flash-wilt: onion, tomato and fat, and long enough for the leaves to go glossy and soft. The tomato is not only flavour - the vitamin C in it is what converts the leaf iron into a form you can absorb, and the difference that makes is several-fold rather than marginal. Finish with lime if there is no tomato in the pot.',
    note: 'These are cooked greens rather than salad greens. Like spinach and chard they carry oxalates, and cooking is both what makes them taste right and what moderates that.',
  },
  'Fonio & millet': {
    eat: 'Rinse well, then toast the dry grain in the pot for a minute before the water goes in - it keeps the grains separate and adds a nuttiness neither has otherwise. Fonio is very fast, a few minutes, and turns to paste if you walk away; millet takes longer and wants a rest off the heat with the lid on. Serve either one alongside the beans rather than instead of them: the point of this pairing is that the grain supplies the methionine the legume is short of and the legume supplies the lysine the grain is short of, and neither half does it alone.',
  },

  /* ── Uplifting ── */
  'Mango & citrus': {
    eat: 'Eat them raw and eat them WITH the plate rather than after it. Vitamin C is heat-sensitive and degrades in cooking, and its most useful job here is converting the iron in the greens and beans beside it into a form you can absorb - which only happens if they are in the same meal. Segment the citrus over a bowl so the juice goes in too.',
  },
  Baobab: {
    eat: 'It is a dry powder rather than a fruit, and it needs rehydrating rather than cooking - whisk it into water, juice or a smoothie and let it sit a minute to stop clumping. Do not boil it; the vitamin C that is the main event does not survive that. It is naturally tart and sharpens a bland drink considerably.',
  },
  Moringa: {
    eat: 'Off the heat, always. Stir the powder into a finished soup or drink after it stops boiling - heat turns it bitter and takes a chunk of the vitamin content with it. If you are drying your own leaf, dry it in shade rather than sun: sun-dried moringa goes khaki and loses much of what shade-dried leaf keeps.',
  },

  /* ── Calming ── */
  'Pumpkin seeds & cacao': {
    eat: 'Toast the seeds briefly in a dry pan, which makes them far easier to eat in quantity, and use cacao as nibs or unsweetened powder rather than as chocolate - the magnesium is in the solids, not the sugar and fat. Both work as an evening handful rather than something to cook.',
    note: 'Cacao carries caffeine and theobromine. In an evening band that is worth knowing: for some people it is a mild lift at exactly the wrong hour, and the seeds alone are the safer version.',
  },
  'Oats & plantain': {
    eat: 'Cook them properly soft, and eat them a good while before bed rather than at it. The mechanism the card is pointing at needs the carbohydrate to do its work - the insulin response clears competing amino acids from the blood and lets tryptophan cross into the brain - and that is a slow process, not an instant one. A little protein alongside gives it something to work with.',
  },
  'Blue vervain & lemon balm': {
    eat: 'Steep them covered. Both are leaf herbs whose active aromatic compounds are volatile, and an open cup sends a real part of what you are brewing out of the room as steam. Blue vervain is genuinely bitter and the bitterness is not a fault to be sugared away.',
    note: 'The app already flags blue vervain against pregnancy. Traditional use is knowledge, not a safety clearance.',
  },
};

export type TeaDepth = {
  /** What the one-line brew instruction is actually doing. */
  brewWhy: string;
  /** A method or handling note, never a dose. */
  note?: string;
};

export const teaDepth: Record<string, TeaDepth> = {
  /* ── Morning fire ── */
  'Ginger + lime': {
    brewWhy: 'Ginger is a rhizome, dense and fibrous, and a steep barely scratches it - which is why the instruction says simmer rather than steep. Ten minutes of actual heat is what pulls the gingerols out. Slice it thin or grate it to give the water more surface to work on, and add the lime at the end off the heat, since its vitamin C degrades with sustained heat.',
    note: 'Dried ground ginger is a different ingredient rather than a convenience substitute - the drying converts gingerols to shogaols, which are sharper and hotter. Neither is wrong; they do not taste the same.',
  },
  'Moringa leaf': {
    brewWhy: 'The instruction says do not boil the leaf, and that is the whole method. Moringa turns bitter and loses vitamin content in sustained heat, so this is a gentle steep in water off the boil rather than a brew you leave on the stove. Five minutes is enough; longer mostly adds bitterness.',
  },
  'Cacao-husk brew': {
    brewWhy: 'The husk is the papery shell left after the nib is separated, and it is tough - which is why it needs eight to ten minutes rather than the three or four a leaf would take. It gives a light, cocoa-scented brew rather than a chocolate one. It carries theobromine and a little caffeine, which is the lift the card describes.',
  },

  /* ── Evening cool-down ── */
  'Blue vervain': {
    brewWhy: 'Ten minutes, and the card says bitter is the point. The bitterness is the compound profile the herb is used for, so a short steep sweetened into palatability has largely removed what was being brewed. Cover the cup - these are volatile aromatics and an open cup loses them to the air.',
  },
  'Tulsi (holy basil)': {
    brewWhy: 'A soft-leaved aromatic, so covered is doing real work here: the essential oils that carry most of the character will leave with the steam otherwise. Five to ten minutes, water off the boil rather than at a rolling boil. It re-steeps reasonably well, which is unusual among these.',
  },
  'Lemon balm': {
    brewWhy: 'The most volatile of the three, which is exactly why the instruction specifies covered. Lemon balm brewed in an open cup smells wonderful and tastes of very little, because what you can smell is what has left the water. Five minutes, lid on, and fresh leaf is markedly better than old dried leaf here - it loses aroma fast in storage.',
  },

  /* ── Training recovery ── */
  'Hibiscus / sorrel': {
    brewWhy: 'The calyces give up their colour and acidity readily, so ten minutes is plenty hot - and a cold overnight steep gives a rounder, less astringent drink from the same material, which is why the card says it is lovely cold. It is genuinely tart, and the sweetening is doing structural work rather than just making it sweet.',
    note: 'The app already flags keeping this an hour away from iron-rich meals. That is not arbitrary: the polyphenols that make it useful here also bind non-heme iron in the gut, which is the same interaction the Mineral atlas describes for tea and coffee.',
  },
  'Turmeric + black pepper': {
    brewWhy: 'Three things have to happen together and the instruction encodes all of them. Curcumin is poorly absorbed on its own; piperine from black pepper raises that absorption dramatically, which is the ratio the card cites; and curcumin is fat-soluble, which is why the brew is made in plant milk rather than water. Simmering rather than steeping matters because this is a root, like ginger. Leave out any one of the three and you have made a nice yellow drink.',
  },
  'Soursop leaf': {
    brewWhy: 'A leaf, so a steep rather than a simmer, covered to keep the aromatics in the cup.',
    note: 'This is the one on this screen to be most careful with. Soursop and its relatives contain annonacin, a compound investigated in connection with an atypical parkinsonism seen in populations with high habitual intake, and that concern is about sustained regular use rather than an occasional cup. This app is not going to tell you how much or how often - and that is a reason to raise it with a clinician rather than to work it out from a tea card.',
  },

  /* ── Mineral builders ── */
  'Stinging nettle': {
    brewWhy: 'Minerals are not volatile and they are not quickly extracted, which makes this a different technique from the aromatic cups above: a long infusion, often several hours or overnight in a covered jar, rather than a five-minute steep. The result is dark, green and faintly savoury rather than fragrant. Drying destroys the sting completely, so dried nettle is entirely safe to handle.',
  },
  'Yellow dock root': {
    brewWhy: 'A root, so a decoction - simmered, not steeped. Water passes straight through a root in five minutes and takes almost nothing with it, so this needs sustained heat to open up at all. It is bitter and astringent, which is the character of the plant rather than a brewing error.',
    note: 'Yellow dock is high in oxalates and is traditionally used in short courses rather than continuously. That is a pattern the traditional use itself observes, and worth respecting.',
  },
  'Dandelion leaf': {
    brewWhy: 'Leaf, so a steep rather than a simmer - and note this is a different preparation from the roasted root on the Foraged foods screen, which needs a proper decoction. Same plant, two preparations, two methods. The leaf is bitter, more so after the plant flowers.',
  },
};

export const FREQ_DEPTH_COUNT = Object.keys(freqDepth).length;
export const TEA_DEPTH_COUNT = Object.keys(teaDepth).length;

/*
  The six core teas on the Apothecary hub.

  These are the reference cards the rest of the tea surfaces point back to, and
  they were the last list in the Atlas with no depth at all - a `supports` line,
  a `notes` line, a one-line `brew` and a short caution.

  They get four fields rather than the two the goal-brews get, because a
  reference card is doing a different job from a suggestion:

    plant    - what it actually is, botanically and geographically. Several of
               these names travel badly: "sorrel" is one plant in the Caribbean
               and a completely different one in Europe, and moringa tea and
               moringa powder are not interchangeable.
    brewWhy  - what the one-line brew instruction is doing. Steep and simmer are
               not preferences.
    evidence - what the badge on the card actually covers, stated narrowly. This
               is where an "Emerging evidence" tier gets held to its meaning
               instead of being read as a promise.
    interacts- the mechanism behind the short caution already on the card.

  NO DOSES AND NO FREQUENCIES, same line as everywhere else. Several of these
  are pharmacologically active and the app already flags them and points at a
  clinician; a method note must not become a prescription. Where the honest
  answer to "how much" is that it belongs with a clinician, that is what the
  entry says.
*/

export type CoreTeaDepth = {
  /** What the plant actually is, and where the name misleads. */
  plant: string;
  /** What the brew line is doing. */
  brewWhy: string;
  /** What the evidence badge actually covers. */
  evidence: string;
  /** The mechanism behind the caution on the card. */
  interacts: string;
};

/* Keyed on the exact `name` strings in content.ts - note these differ from the
   goal-brew names above ("Blue Vervain" here, "Blue vervain" there). */
export const coreTeaDepth: Record<string, CoreTeaDepth> = {
  'Hibiscus / Sorrel (zobo)': {
    plant: 'Hibiscus sabdariffa, and the part used is the calyx - the fleshy crimson sepal left after the flower drops - not the petal. It is called zobo in Nigeria, sobolo in Ghana, bissap in Senegal and sorrel across the anglophone Caribbean, and the Caribbean name causes real confusion: European sorrel is Rumex, a sour green leaf, and has nothing to do with it. Grown across West Africa and the Caribbean and harvested as the pods swell.',
    brewWhy: 'Fifteen to twenty minutes because the pigment and acid come out readily but the body of the drink does not - a short steep gives colour without much else. A cold overnight steep extracts more gently and gives a rounder, less astringent result, which is why it is as good iced as hot. Ginger, clove and orange peel are the traditional company; the sweetener goes in hot so it dissolves.',
    evidence: 'Emerging evidence, and specifically for blood pressure: several controlled trials in people with mild hypertension have found modest reductions from regular hibiscus tea. Modest is the operative word, and the trials are small and short. The anthocyanins and vitamin C are simply present rather than proven to do anything in particular.',
    interacts: 'The blood-pressure effect is the caution as well as the finding: taken alongside antihypertensive medication the two can stack, which is why the card flags it. It also binds non-heme iron in the gut like tea and coffee do - the same mechanism the Mineral atlas describes - so it is worth keeping an hour away from the plate you are relying on for iron.',
  },
  'Tulsi (Holy Basil)': {
    plant: 'Ocimum tenuiflorum, native to the Indian subcontinent and grown at the threshold of many Hindu households as a sacred plant rather than a culinary one. It is a different species from the sweet basil used in cooking and tastes it - clove-like and peppery rather than sweet.',
    brewWhy: 'Five to ten minutes with the cup covered. The active compounds here include volatile aromatic oils, and an open cup loses a real part of them to the steam - which is the same reason lemon balm and blue vervain are brewed covered. Water off the boil rather than at a rolling boil. It re-steeps reasonably well, which is unusual in this list.',
    evidence: 'Emerging evidence. There are human trials pointing at reduced stress scores and modest metabolic effects, and they are mostly small, short and heterogeneous. Adaptogen is a useful descriptive category rather than a regulated or mechanistically settled one, and the card saying it calms the HPA axis without sedation is describing the reported subjective pattern, not a demonstrated pathway.',
    interacts: 'The pregnancy caution on the card is the important one, and it is precautionary rather than alarmist: animal work has raised questions about effects on fertility and pregnancy, human data is thin, and thin data in pregnancy is a reason to ask rather than assume. There is also a possible effect on clotting and on blood sugar, which matters if you take anything for either.',
  },
  Lemongrass: {
    plant: 'Cymbopogon citratus, a tropical grass grown across West Africa, the Caribbean, South and Southeast Asia. The usable part is the pale swollen base of the stalk rather than the tough green blade, and the citrus note is citral - the same compound that dominates lemon peel, which is why it reads as lemon without any relation to the fruit.',
    brewWhy: 'Five to eight minutes, and bruise or crush the stalk first - the oils sit in the fibres and an unbruised stalk gives you hot water with a hint of something. Fresh stalk is markedly better than dried here; it loses aroma faster than most in storage. Cut it into short lengths and split them.',
    evidence: 'Traditional use, and the badge is doing its job. Lemongrass has a long and wide record as a calming and digestive tea across many cultures, and the laboratory work on citral is interesting, but there is very little human trial evidence for either claim. The card calls it a gentle nervine, which is what tradition says rather than what a trial has shown.',
    interacts: 'The card says generally gentle and that is fair - it is one of the few here with no significant flagged interaction. Very large intakes have been associated with liver and kidney effects in animal studies, which is a reason not to treat "gentle" as "unlimited" rather than a reason for concern about a cup.',
  },
  'Blue Vervain': {
    plant: 'Verbena hastata, native to North America, with slender purple flowering spikes. It is not the same plant as European vervain (Verbena officinalis) or as lemon verbena, and the three are routinely confused in shops and recipes. The codex line that it was carried by maroon healers places it in a specific tradition of plant knowledge held by people who had escaped enslavement.',
    brewWhy: 'Ten minutes, covered, and the card says bitter is the point. That is not a flourish: the bitter iridoid compounds are what the plant is used for, so a short steep sweetened into palatability has removed most of what was being brewed. Covering the cup keeps the volatiles in. It is genuinely unpleasant to many people and traditional use does not pretend otherwise.',
    evidence: 'Traditional use, and there is very little else. The human trial literature on Verbena hastata specifically is close to non-existent, and most of what circulates online conflates it with European vervain, which has slightly more study behind it. The app grades it honestly rather than borrowing another species\u2019 evidence.',
    interacts: 'Avoid in pregnancy, as the card says - vervains have a traditional reputation as uterine stimulants, and that reputation alone is sufficient reason to stay away without better data. It may also interact with blood-pressure medication and with hormone-sensitive conditions. Traditional use is knowledge, not a safety clearance, and this is the entry where that distinction bites hardest.',
  },
  Moringa: {
    plant: 'Moringa oleifera leaf, from a fast-growing tree that stays in leaf through drought when little else does - which is most of why it matters agriculturally. The leaf tea and the powder are related but not interchangeable: the powder is the whole leaf and delivers the minerals the Mineral atlas credits it with, while the tea is a water extract and carries far less of them.',
    brewWhy: 'Five minutes and mild, and the instruction elsewhere in this app not to boil the leaf applies here too - sustained heat turns it bitter and degrades the vitamin content. Water off the boil, short steep, no aggressive extraction. If you are drying your own, shade-dry rather than sun-dry: sun-dried moringa goes khaki and loses much of what shade-dried leaf keeps.',
    evidence: 'Emerging evidence. There are small human trials on blood sugar and lipids and a large body of laboratory and animal work, and the gap between the two is wide. The card credits it for recovery and minerals; the honest position is that moringa leaf is a genuinely nutrient-dense food and that its therapeutic claims are much less settled than its enthusiasts suggest.',
    interacts: 'The card says start with small amounts, which is unusually practical advice: moringa is a mild laxative for some people and a large first serving finds that out unpleasantly. It may also lower blood sugar and blood pressure, so it stacks with medication for either. Root and root bark are a different matter entirely and are not food - the leaf is what is meant here.',
  },
  'Ginger + Turmeric': {
    plant: 'Two rhizomes in the same family - Zingiber officinale and Curcuma longa - rather than roots, which is why both are dense, fibrous and slow to give anything up. Turmeric stains permanently; the colour is the curcuminoids, so the staining is a fair proxy for the compound being there.',
    brewWhy: 'Simmer ten minutes, not steep, because a rhizome does not release much to hot water sitting still. The card adds the black pepper and that is the whole mechanism: curcumin is very poorly absorbed on its own, and piperine from pepper raises that absorption dramatically. Curcumin is also fat-soluble, so a fat in the cup - coconut or plant milk - does real work. Leave out the pepper or the fat and you have made an attractive yellow drink.',
    evidence: 'Well established is the highest badge on this list and it is carried mostly by the pepper-absorption interaction and by ginger for nausea, both of which have solid human evidence. Curcumin\u2019s anti-inflammatory effects in humans are more mixed than the popular account suggests, and much of the encouraging trial work uses concentrated extracts at doses a cup does not approach - the same extract gap the Mushroom mastery screen describes.',
    interacts: 'High intakes of both may affect clotting, which is the card\u2019s caution and matters if you take anticoagulants or have surgery scheduled. Turmeric can also aggravate gallstones and may interfere with iron absorption. A cup is a cup; the concern belongs to sustained high-dose supplementation, and that is a clinician conversation rather than a card one.',
  },
};

export const CORE_TEA_DEPTH_COUNT = Object.keys(coreTeaDepth).length;
