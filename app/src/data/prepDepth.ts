/*
  Added depth for the sixteen preparations that had no method at all: the eight
  microgreen salads, the five smoothies and the three kid smoothies.

  These were missed the first time depth was added, which only covered the 28
  plate recipes. They are food the app tells you to make, and every one of them
  listed its components without ever saying how to build it.

  Same rules as recipeDepth.ts. This is a separate file because README rule 3
  keeps content.ts verbatim, so nothing there is edited. Each entry adds only
  method and storage:

    build - the order of assembly, which is the whole omission. For a shoot salad
            that is when the dressing goes on; for a smoothie it is what goes in
            the jug first.
    keeps - how long, and what does not survive.

  What is NOT added: any nutrition figure, and any extension of the reasoning
  already carried in each item's own line. The salads' `mix` field already says
  why each one is built as it is - "vitamin C unlocks the iron", "mucilage and
  sulforaphane slow the curve" - and those claims are carefully worded and
  evidence-tiered elsewhere in the app. Nothing here restates or extends them.

  Mama & Baby carries "clear herbs with your midwife" in its own line. Nothing
  added here touches herbal guidance.
*/

export type PrepDepth = {
  build: string;
  keeps: string;
};

export const prepDepth: Record<string, PrepDepth> = {
  /* ---- microgreen salads ---- */
  'Iron Builder': {
    build: 'Dress the base first, pile the shoots on after, and squeeze the lime at the table.',
    keeps: 'Shoots wilt within minutes of dressing. Keep them dry and separate until the plate goes out.',
  },
  'Blood-Sugar Steady': {
    build: 'Let the chia sit in a little water until it gels before it goes anywhere near the beans.',
    keeps: 'The beans keep three days. Add the shoots and the chia fresh each time.',
  },
  'Heart & Pressure': {
    build: 'Cool the millet fully before it meets the shoots, or the steam collapses them.',
    keeps: 'The millet base keeps three days. Shoots go on at serving.',
  },
  'Kid Starter': {
    build: 'Cut the melon into cubes small enough to spear and keep every element separate on the plate.',
    keeps: 'Melon goes watery overnight — cut it the same day.',
  },
  'Detox Reset': {
    build: 'Toss the shoots through the lemon last, and only just enough to coat them.',
    keeps: 'Best within the hour. Undressed shoots keep three days in a lidded box with a dry sheet of paper.',
  },
  'Vitality & Desire': {
    build: 'Toast the pumpkin seeds dry and let them cool before they go on, or they steam the basil.',
    keeps: 'Toasted seeds keep a week. Assemble at serving.',
  },
  'Muscle Builder': {
    build: 'Warm grain underneath, shoots on top, dressing between the two so the leaves stay crisp.',
    keeps: 'Grain and lentils keep four days. Shoots go on at the plate.',
  },
  'Mama & Baby': {
    build: 'Fold the chia through the dressing first so it thickens evenly instead of clumping.',
    keeps: 'Dress at serving. Undressed components keep three days.',
  },

  /* ---- smoothies ---- */
  'Caribbean Sorrel Recovery': {
    build: 'Blend the sea moss gel into the liquid first so it disperses, then the protein, then the fruit.',
    keeps: 'Drink within the hour. It thickens and separates as the gel sets.',
  },
  'West African Baobab Builder': {
    build: 'Soak the oats and the date a few minutes first — the blend runs smoother and the date breaks down properly.',
    keeps: 'Thickens hard in the fridge. Loosen with water rather than re-blending.',
  },
  'Moringa Green Warrior': {
    build: 'Coconut water and moringa first, then the protein, and the pineapple last so it stays bright.',
    keeps: 'Best fresh — the pineapple keeps working and thins the texture as it stands.',
  },
  'Cacao Root Strength': {
    build: 'Use a properly ripe plantain and blend it with the liquid before the seeds go in.',
    keeps: 'Drink fresh. The pumpkin seed settles out on standing.',
  },
  'Sea Moss Sunrise': {
    build: 'Disperse the sea moss in the liquid first, add the turmeric with the lime, mango last.',
    keeps: 'Within the hour. Turmeric stains — rinse the jug straight away.',
  },

  /* ---- kid smoothies ---- */
  'Cocoa Banana Grow': {
    build: 'Freeze the banana ahead. It does the work of ice without watering the drink down.',
    keeps: 'Best fresh. Pour into a lidded cup — it separates in a lunchbox.',
  },
  'Mango Sunshine': {
    build: 'Blend the coconut milk and baobab smooth before the mango goes in, then the lime at the end.',
    keeps: 'Drink the same day. Baobab thickens on standing.',
  },
  'Callaloo Sneak': {
    build: 'Blend the greens into the coconut water until completely smooth before anything else joins them.',
    keeps: 'Best fresh. The colour dulls within a couple of hours.',
  },
};

export const PREP_DEPTH_COUNT = Object.keys(prepDepth).length;
