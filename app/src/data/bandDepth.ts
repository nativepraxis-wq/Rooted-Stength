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
