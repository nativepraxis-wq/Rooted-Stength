/*
  Depth for the crop profile cards on the Atlas.

  Separate file; content.ts is untouched per README rule 3.

  ─────────────────────────────────────────
  WHAT THIS FILE IS FOR

  Fourteen crops carry a `body` line. Four of them put a NUMBER in it, and a
  number is the one thing on a card that a reader takes literally. This file
  covers those four and no others - it is not a general expansion of the crop
  screen, it is the reading note that belongs under a figure.

    covers   - what the number on the card actually measures, and in what form
               of the food. Dried, fresh, cooked and raw are different foods.
    serving  - what a portion someone would really eat comes to. Per-100g is
               an analyst's unit, not a plate.

  ─────────────────────────────────────────
  THE CARD THAT REFUTES ITSELF

  Pea Microgreens is the reason this file exists. Its `body` reads
  "~397 mg/100g amino acids". Its `contested` line, four lines further down the
  same card, reads "the Atlas cites ranges, not single numbers."

  The card states the rule and breaks it, to three significant figures.

  It is also the wrong order of magnitude for the sentence it sits in. 397mg per
  100g is 0.4g per 100g. Pea shoots run a few grams of protein per 100g, so a
  figure ten times smaller cannot be the protein content that the first half of
  the same sentence calls high. It is readable as FREE amino acids - the unbound
  fraction, a real and different measurement - but nothing on the card says so,
  and next to "High in plant protein and BCAAs" it reads as the protein.

  This is the same failure as the iron card in data/healthDepth.ts: a defensible
  number, framed so it means something it does not. content.ts is verbatim, so
  the card stands and the depth beneath it corrects the impression.

  ─────────────────────────────────────────
  ON NOT REPLACING ONE FALSE PRECISION WITH ANOTHER

  Every figure below is a range, and where sources genuinely disagree that is
  said rather than averaged away. Nutrient content in leaves and pulp varies
  with variety, soil, season, and how the sample was dried - which is precisely
  what the Pea Microgreens card says, and precisely why a single number was the
  wrong way to say it.

  Cowpea is included even though its figure is sound. It is the card that gets
  it right - per cooked cup, hedged with a tilde - and the note says so. A file
  that only ever appears under a mistake teaches that a figure is a warning
  sign. The standard is worth naming where it is met.
  ─────────────────────────────────────────
*/

export type CropFigure = {
  /** The figure as the card states it. */
  claim: string;
  /** What that number actually measures, in what form of the food. */
  covers: string;
  /** What a portion someone would really eat comes to. */
  serving?: string;
};

export const cropFigureDepth: Record<string, CropFigure> = {
  cowpea: {
    claim: '~13g protein per cooked cup',
    covers:
      'This one is stated the way a food figure should be: per cooked cup, which is a portion '
      + 'someone actually eats, and hedged with a tilde. A cooked cup is a little over 170g, and '
      + 'most of that weight is water taken up in the pot - the same beans dry would be a much '
      + 'smaller pile for the same protein.',
    serving:
      'The lysine point is the useful half. Grains are low in lysine and cowpeas are high in it, '
      + 'which is why rice and peas, hoppin\u2019 john and waakye are built the way they are. The '
      + 'pairing is older than the biochemistry that explains it.',
  },

  moringa: {
    claim: 'up to 25\u00d7 the iron of spinach, gram for gram',
    covers:
      'Dried leaf against fresh spinach. Most of that multiple is water: drying removes around '
      + 'four fifths of a leaf\u2019s weight and concentrates everything left behind, so any dried '
      + 'leaf beats any fresh one gram for gram. Against spinach dried the same way the gap '
      + 'narrows sharply. The card is careful to say "dried leaf" and "up to" - both are doing '
      + 'real work, and 25\u00d7 sits at the top of a wide published spread rather than in the middle '
      + 'of it.',
    serving:
      'A heaped tablespoon of powder is around 7g, which puts it in the low single digits of '
      + 'milligrams of iron - the Mineral atlas gives about 1\u20132mg a tablespoon, and that is the '
      + 'figure to carry. It is also non-haem iron alongside oxalates and phytates that limit '
      + 'how much of it is absorbed, so vitamin C in the same meal matters more here than the '
      + 'headline number does.',
  },

  peagreens: {
    claim: '~397 mg/100g amino acids',
    covers:
      'Not the protein content. 397mg per 100g is 0.4g per 100g, and pea shoots carry a few '
      + 'grams of protein per 100g - roughly an order of magnitude more than the number printed '
      + 'beside the words "high in plant protein". The figure is readable as FREE amino acids, '
      + 'the unbound fraction rather than the protein-bound total, which is a real measurement '
      + 'and a different one. Nothing on the card marks the difference.',
    serving:
      'The card\u2019s own last line asks for the right thing: "the Atlas cites ranges, not single '
      + 'numbers." A tray-grown shoot varies with variety, light, water and cut day, and 397 to '
      + 'three significant figures claims a precision that no windowsill tray supports. Treat the '
      + 'shoots as a fresh-green, vitamin and carotenoid crop eaten by the handful, not as a '
      + 'protein source measured to the milligram.',
  },

  baobab: {
    claim: 'around 10\u00d7 the vitamin C of oranges',
    covers:
      'Dried fruit pulp against fresh orange, per 100g. Published figures for baobab pulp cover a '
      + 'wide band depending on provenance and how it was assayed, and the multiple that falls out '
      + 'lands anywhere from a few times an orange up to about the ten the card gives. Ten is the '
      + 'optimistic end of that band, not its centre.',
    serving:
      'The comparison is also between a fruit eaten whole and a powder eaten by the spoon. Nobody '
      + 'eats 100g of baobab powder; a tablespoon is closer to 10g. Per portion the honest claim '
      + 'is that a spoonful is a genuinely useful amount of vitamin C, not that it replaces ten '
      + 'oranges.',
  },
};
