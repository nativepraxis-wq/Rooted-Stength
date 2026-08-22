/* eslint-disable */
// Content ported verbatim from 'Rooted Strength.dc.html' (lines 5824-8141).
// Copy is editorial and load-bearing: see README 'Content & Editorial Rules'.
// Do not paraphrase, compress or reword anything in this file.

export const crops = [
    { id: 'cowpea', name: 'Black-eyed Pea', botanical: 'Vigna unguiculata', region: 'West Africa', c1: '#C79A45', c2: '#A8783A' },
    { id: 'fonio', name: 'Fonio', botanical: 'Digitaria exilis', region: 'Sahel', c1: '#C9A85E', c2: '#B08F42' },
    { id: 'callaloo', name: 'Callaloo', botanical: 'Amaranthus spp.', region: 'Caribbean', c1: '#2F4A31', c2: '#263D28' },
    { id: 'moringa', name: 'Moringa', botanical: 'Moringa oleifera', region: 'East Africa', c1: '#2F4A31', c2: '#3C5A42' },
    { id: 'seamoss', name: 'Sea Moss', botanical: 'Chondrus / Gracilaria', region: 'Caribbean coast', c1: '#2E6B7A', c2: '#265863' },
    { id: 'sorghum', name: 'Sorghum', botanical: 'Sorghum bicolor', region: 'Northeast Africa', c1: '#8F4230', c2: '#8F3E2C' },
    { id: 'okra', name: 'Okra', botanical: 'Abelmoschus esculentus', region: 'Ethiopia / W. Africa', c1: '#2F4A31', c2: '#587A4C' },
    { id: 'oyster', name: 'Oyster Mushroom', botanical: 'Pleurotus ostreatus', region: 'Global / cultivated', c1: '#665C4A', c2: '#574E3F' },
    { id: 'peagreens', name: 'Pea Microgreens', botanical: 'Pisum sativum', region: 'Windowsill', c1: '#3A5540', c2: '#2C4231' },
    { id: 'sweetpotato', name: 'Sweet Potato', botanical: 'Ipomoea batatas', region: 'The Americas', c1: '#B5622E', c2: '#97501F' },
    { id: 'plantain', name: 'Plantain', botanical: 'Musa spp.', region: 'W. Africa / Caribbean', c1: '#7A5A1E', c2: '#553D12' },
    { id: 'teff', name: 'Teff', botanical: 'Eragrostis tef', region: 'Ethiopian highlands', c1: '#8A5A3A', c2: '#6E452C' },
    { id: 'baobab', name: 'Baobab', botanical: 'Adansonia digitata', region: 'African savanna', c1: '#665C4A', c2: '#574E3F' },
    { id: 'coconut', name: 'Coconut', botanical: 'Cocos nucifera', region: 'Tropical diaspora', c1: '#665C4A', c2: '#574E3F' }
  ];

export const adminStats = [
    { n: '7', label: 'Pending review', c: '#D4AA5C' },
    { n: '12', label: 'Citations to verify', c: '#6FB3C4' },
    { n: '23', label: 'User corrections', c: '#9ABF85' },
    { n: '3', label: 'Flagged claims', c: '#D98C74' }
  ];

export const reviewQueue = [
    { id: 'q1', title: 'Sea moss & thyroid support', type: 'Crop · Sea Moss', ev: 'Emerging evidence', conf: 62 },
    { id: 'q2', title: 'Fenugreek microgreens & testosterone', type: 'Nutrient claim', ev: 'Emerging evidence', conf: 48 },
    { id: 'q3', title: 'Jollof-spiced millet adaptation note', type: 'Recipe · attribution', ev: 'Traditional use', conf: 88 },
    { id: 'q4', title: 'Elder leucine target (2.5–2.8g)', type: 'Nutrient · elder', ev: 'Well established', conf: 94 }
  ];

export const corrections = [
    { text: '"Callaloo" is taro leaf in Jamaica, amaranth in Trinidad.', on: 'Callaloo profile', status: 'Merge' },
    { text: 'Doubles bara is often fried in shared oil — flag for allergens.', on: 'Ital Roots Kitchen', status: 'Applied' },
    { text: 'Fonio matures in 6–8 weeks, not 10.', on: 'Fonio profile', status: 'Review' }
  ];

export const biasTests = [
    { name: 'Race never used as biological proxy', status: 'pass' },
    { name: 'Gender identity vs. physiology separated', status: 'pass' },
    { name: 'Plans safe for low-budget / food-desert users', status: 'pass' },
    { name: 'Elder & disability adaptive coverage', status: 'warn' },
    { name: 'Non-diagnostic language in AI replies', status: 'pass' }
  ];

export const bioregions = {
    northeast: { name: 'Northeast U.S.', climate: 'Coastal Connecticut · four temperate seasons', periods: [
      { label: 'Spring', accent: '#2F4A31', months: 'Mar – May', train: 'Mobility, farm preparation and a gradual return to volume.', nourish: 'Tender greens, microgreens and the first wild bitters wake the body up.', foods: ['Dandelion', 'Stinging nettle', 'Pea microgreens', 'Radish microgreens', 'Amaranth greens', 'Spring peas'] },
      { label: 'Summer', accent: '#7A5A1E', months: 'Jun – Aug', train: 'Endurance and hypertrophy, outdoor work, heat adaptation and hydration.', nourish: 'Abundant produce and cooling, mineral-rich plants for long hot days.', foods: ['Okra', 'Callaloo', 'Tomatoes', 'Sweet peppers', 'Purslane', 'Sorrel / hibiscus', 'Sweet-potato greens'] },
      { label: 'Fall', accent: '#8F4230', months: 'Sep – Nov', train: 'Harvest conditioning, loaded carries and strength cycles; food preservation.', nourish: 'Roots, squashes and pulses to store energy as the light shortens.', foods: ['Sweet potato', 'Winter squash', 'Pigeon peas', 'Sorghum', 'Collards', 'Sunflower seeds'] },
      { label: 'Winter', accent: '#2E6B7A', months: 'Dec – Feb', train: 'Foundational strength, heavier resistance and grounding, warming work.', nourish: 'Stored roots, grains and beans; warming stews and sea vegetables.', foods: ['Black-eyed peas (dried)', 'Millet', 'Yam', 'Cassava', 'Kale', 'Sea moss', 'Teff'] } ] },
    caribbean: { name: 'Caribbean', climate: 'Jamaica / Trinidad · dry & wet seasons', periods: [
      { label: 'Dry season', accent: '#7A5A1E', months: 'Dec – Apr', train: 'Peak outdoor training and endurance in the cooler dry air.', nourish: 'Citrus, root provisions and abundant callaloo at market.', foods: ['Callaloo', 'Ackee (careful prep)', 'Breadfruit', 'Yam', 'Sorrel', 'Star apple', 'Pigeon peas'] },
      { label: 'Wet season', accent: '#2E6B7A', months: 'May – Nov', train: 'Indoor & sheltered strength; hydrate hard through the humidity.', nourish: 'Mangoes, dasheen and rain-fed greens; cooling hibiscus drinks.', foods: ['Mango', 'Dasheen / taro', 'Green plantain', 'Cassava', 'Okra', 'Coconut', 'Scotch bonnet'] } ] },
    westafrica: { name: 'West Africa', climate: 'Sahel & coast · rainy & harmattan', periods: [
      { label: 'Rainy season', accent: '#2F4A31', months: 'May – Oct', train: 'Farm-heavy planting and weeding — labor is the training.', nourish: 'Fresh greens, early grains and leafy amaranth flush in.', foods: ['Amaranth (efo)', 'Okra', 'Fonio (young)', 'Bitterleaf', 'Egusi greens', 'Roselle', 'Moringa'] },
      { label: 'Harmattan / dry', accent: '#7E5124', months: 'Nov – Apr', train: 'Strength and carries as the harvest is stored and milled.', nourish: 'Stored grains, cowpeas, baobab and dried leaves.', foods: ['Fonio', 'Sorghum', 'Millet', 'Cowpeas', 'Baobab', 'Groundnut-free stews', 'Dried okra'] } ] },
    eastafrica: { name: 'East Africa', climate: 'Ethiopia / Zanzibar · long & short rains', periods: [
      { label: 'Long rains', accent: '#2F4A31', months: 'Mar – May', train: 'Planting labor; steady aerobic base in mild weather.', nourish: 'Teff greens, fresh legumes and highland vegetables.', foods: ['Teff', 'Ensete / false banana', 'Kale (gomen)', 'Chickpeas', 'Lentils', 'Amaranth', 'Moringa'] },
      { label: 'Dry / cool', accent: '#2E6B7A', months: 'Jun – Sep', train: 'Strength cycles and preservation as harvests come in.', nourish: 'Injera from stored teff, pulses and warming spice.', foods: ['Teff', 'Fava beans', 'Split peas', 'Collards', 'Sweet potato', 'Sesame-free spice blends'] },
      { label: 'Short rains', accent: '#7A5A1E', months: 'Oct – Dec', train: 'Mobility and lighter volume during the second planting.', nourish: 'Second greens, gourds and fresh legumes return.', foods: ['Pumpkin leaves', 'Green maize', 'Cowpeas', 'Amaranth', 'Okra', 'Roselle'] } ] },
    centralam: { name: 'Central America', climate: 'Costa Rica / Cuba · verano & invierno', periods: [
      { label: 'Verano (dry)', accent: '#7A5A1E', months: 'Dec – Apr', train: 'Long outdoor endurance in the drier, sunnier months.', nourish: 'Beans, squash and tropical fruit at their peak.', foods: ['Black beans', 'Maize', 'Squash', 'Yuca', 'Plantain', 'Chaya', 'Avocado'] },
      { label: 'Invierno (wet)', accent: '#2F4A31', months: 'May – Nov', train: 'Sheltered strength work; hydrate through the rains.', nourish: 'Rain-fed greens, tubers and the Three Sisters harvest.', foods: ['Chaya', 'Malanga', 'Green plantain', 'Pumpkin', 'Amaranth', 'Cacao', 'Hearts of palm'] } ] }
  };

export const _MO = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

export const sowAdvice = {
    spring: { crops: 'Pea · radish · amaranth', line: 'Light is climbing. Fast trays bridge the gap until the first outdoor greens come in.' },
    dry: { crops: 'Radish · mustard · sunflower', line: 'Trays finish quicker in the heat — water twice a day and cut a day early before they stretch.' },
    fall: { crops: 'Sunflower · broccoli · beet', line: 'Dense mineral trays as the outdoor greens fade. Sow the next tray the day you cut this one.' },
    winter: { crops: 'Sunflower · pea · lentil', line: 'The sill does the most work now — this is your whole fresh-greens season. Add light if shoots lean.' },
    wet: { crops: 'Lentil · mustard · kale', line: 'Humidity invites mould. Thin the sow rate, keep air moving, and skip the weighted dark stack.' }
  };

export const bioNotes = {
    northeast: 'Four temperate seasons and a hard frost line. From December to March the sill farm carries your greens — outdoor beds sleep.',
    caribbean: 'Two seasons, not four: dry December–April, wet May–November. Storm months move training under shelter and lean on stored provisions.',
    westafrica: 'The rains and the harmattan set the year. Planting labor is the training in the wet months; carrying, milling and drying in the dry.',
    eastafrica: 'Two rains mean two plantings and two green flushes — highland cool in Ethiopia, coastal humid in Zanzibar.',
    centralam: 'Verano and invierno — dry and wet. The Three Sisters harvest lands at the tail of the rains, and dooryard greens hold all year.'
  };

export const events = [
    { id: 'e1', title: 'Cowpea & Callaloo Cook-Along', host: 'Ital Roots Kitchen', when: 'Sat · Aug 23 · 11:00a', where: 'Sankofa Community Garden · 0.6 mi', kind: 'Learn', c: '#8F4230', spots: '6 spots left' },
    { id: 'e2', title: 'Saturday Farm Day: Beds & Compost', host: 'Three Sisters Farm', when: 'Sat · Aug 23 · 8:00a', where: 'Three Sisters Farm Stand · 2.1 mi', kind: 'Farm', c: '#2F4A31', spots: 'Open · all levels' },
    { id: 'e3', title: 'Foraging Walk: Weeds as Medicine', host: 'Guide: Mama Yaa', when: 'Sun · Aug 24 · 9:00a', where: 'Ridge Trailhead · 5 mi', kind: 'Move', c: '#2F4A31', spots: '10 spots left' },
    { id: 'e4', title: 'Elder Strength Circle', host: 'Rooted Strength Council', when: 'Wed · Aug 27 · 5:30p', where: 'Yam & Yarrow Co-op · 0.4 mi', kind: 'Move', c: '#7E5124', spots: 'Chair-supported' },
    { id: 'e5', title: 'Ancestral Movement & Drum Night', host: 'Talawa collective', when: 'Fri · Aug 29 · 7:00p', where: 'Community Hall', kind: 'Move', c: '#2E6B7A', spots: 'Family-friendly' }
  ];

export const courses = [
    { title: 'Grow microgreens in 10 days', mins: '6 lessons', c: '#3E5C40' },
    { title: 'Diaspora crop histories', mins: '12 lessons', c: '#7E5F1C' },
    { title: 'Seed-saving basics', mins: '4 lessons', c: '#2F4A31' },
    { title: 'Reading a lab report', mins: '5 lessons', c: '#2E6B7A' }
  ];

export const tiers = [
    { id: 'seedling', name: 'Seedling', tagline: 'Begin, free forever', mo: 0, yr: 0, accent: '#2F4A31',
      features: ['Personalized onboarding & goals', 'Today dashboard & Root rhythms', 'Food Roots Atlas browsing', 'Find Rooted Food map'] },
    { id: 'rooted', name: 'Rooted', tagline: 'The full living ecosystem', mo: 9, yr: 84, accent: '#C79A45', popular: true,
      features: ['Everything in Seedling', 'AI Council & Scan My Plate', 'Complete recipe generator & meal plans', 'Encrypted Medical Vault', 'Seasonal & farm/hike programming', 'Offline access for land & trail'] },
    { id: 'village', name: 'Village', tagline: 'Up to 5 in the household', mo: 16, yr: 150, accent: '#8F4230',
      features: ['Everything in Rooted', 'Elder & youth profiles', 'Shared plans & grocery lists', 'Intergenerational Strength Garden'] }
  ];

export const vaultLabs = [
    { name: 'Ferritin (iron stores)', value: '38 ng/mL', range: '30–200', status: 'In range · low-normal', flag: 'watch' },
    { name: 'Vitamin B12', value: '210 pg/mL', range: '200–900', status: 'Below optimal — discuss with clinician', flag: 'low' },
    { name: 'Vitamin D (25-OH)', value: '31 ng/mL', range: '30–100', status: 'In range · low end', flag: 'watch' },
    { name: 'Hemoglobin', value: '13.6 g/dL', range: '12.0–15.5', status: 'In range', flag: 'ok' },
    { name: 'HbA1c', value: '5.2 %', range: '<5.7', status: 'In range', flag: 'ok' }
  ];

export const vaultDocs = [
    { name: 'CBC + metabolic panel', kind: 'PDF · lab report', date: 'Jun 2026', c: '#2E6B7A' },
    { name: 'Ferritin & B12 follow-up', kind: 'Photo · results', date: 'Jun 2026', c: '#8F4230' },
    { name: 'Nutritionist plan', kind: 'PDF · summary', date: 'May 2026', c: '#2F4A31' },
    { name: 'Physical-therapy notes', kind: 'PDF · knee', date: 'Mar 2026', c: '#7E5F1C' }
  ];

export const vaultPerms = [
    { key: 'labs', label: 'Council may read lab values', sub: 'Used only to soften food & training tips' },
    { key: 'meds', label: 'Council may reference medications', sub: 'For interaction-aware suggestions' },
    { key: 'exports', label: 'Include vault in progress exports', sub: 'Off by default' }
  ];

export const sleepWeek = [
    { day: 'M', h: 6.2, bar: 62 }, { day: 'T', h: 7.3, bar: 79 }, { day: 'W', h: 6.8, bar: 72 },
    { day: 'T', h: 7.5, bar: 82 }, { day: 'F', h: 6.1, bar: 60 }, { day: 'S', h: 8.1, bar: 92 }, { day: 'S', h: 7.3, bar: 79 }
  ];

export const sleepStages = [
    { label: 'Deep', pct: '22%', hrs: '1h 36m', c: '#2C3A63' },
    { label: 'REM', pct: '24%', hrs: '1h 45m', c: '#2F4A31' },
    { label: 'Light', pct: '48%', hrs: '3h 31m', c: '#2F4A31' },
    { label: 'Awake', pct: '6%', hrs: '0h 28m', c: '#7E5F1C' }
  ];

export const sleepHabits = [
    { name: 'Screens down by 9:00p', on: true },
    { name: 'Evening long-exhale breath', on: true },
    { name: 'Magnesium-rich dinner', on: true },
    { name: 'No caffeine after 2:00p', on: false },
    { name: 'Consistent wake time', on: true }
  ];

export const filters = [
    { name: 'Countertop gravity filter', tier: 'Best all-round', removes: 'Lead · chlorine · PFAS · microplastics', cost: '$60–90 + refills', c: '#2E6B7A', fit: 'No plumbing — works on farms & rentals' },
    { name: 'Faucet-mount filter', tier: 'Budget entry', removes: 'Lead · chlorine · some PFAS', cost: '$25–40', c: '#2F4A31', fit: 'Quick install, good first step' },
    { name: 'Reverse-osmosis (under-sink)', tier: 'Deepest filtration', removes: 'Nearly everything — then remineralize', cost: '$180–350', c: '#2C3A63', fit: 'Add sea salt or sea moss back in' },
    { name: 'Activated-charcoal stick', tier: 'Low-cost / travel', removes: 'Chlorine · some metals', cost: '$10–15', c: '#7E5124', fit: 'Ancestral charcoal method, portable' }
  ];

export const filterStops = [
    { name: 'Yam & Yarrow Co-op', type: 'Stocks gravity filters & refills', dist: '0.4 mi', c: '#2F4A31' },
    { name: 'Community Water Justice Hub', type: 'Free lead test kits · install help', dist: '1.1 mi', c: '#2E6B7A' },
    { name: 'Sankofa Hardware', type: 'Faucet mounts & charcoal sticks', dist: '0.9 mi', c: '#7E5124' }
  ];

export const matrixDims = [
    { id: 'physical', name: 'Physical', status: 'Strong', pct: 82, c: '#2E6B7A', feeds: 'Training, farm labor, protein and repair sleep.', week: ['3 strength sessions completed', 'Farm-day carries: 200 ft × 6', 'Protein on target 6 of 7 days'], action: 'Open training plan', route: 'trainPlan' },
    { id: 'mental', name: 'Mental', status: 'Steady', pct: 74, c: '#2F4A31', feeds: 'Focus, learning, and rest from the scroll.', week: ['2 crop histories read', 'Breathwork 3 sessions', 'Screens down 4 of 7 nights'], action: 'Learn at your pace', route: 'community' },
    { id: 'emotional', name: 'Emotional', status: 'Open', pct: 68, c: '#8F4230', feeds: 'Reflection, connection, and calming nervines.', week: ['2 journal reflections', 'RSVP\u2019d to drum night', 'Hibiscus evenings × 3'], action: 'Open Growth Journal', route: 'journey' },
    { id: 'spiritual', name: 'Spiritual', status: 'Rooted', pct: 79, c: '#7E5F1C', feeds: 'Ritual, land time, and gratitude practice.', week: ['Root Rise kept 5 of 7 mornings', 'Nature-immersion walk', 'Gratitude before meals'], action: 'Recovery & breath', route: 'breath' }
  ];

export const budgetCats = [
    { cat: 'Beans & grains', spent: 22, budget: 30, c: '#2F4A31' },
    { cat: 'Produce & greens', spent: 34, budget: 35, c: '#7E5F1C' },
    { cat: 'Seeds & fats', spent: 12, budget: 20, c: '#7E5124' },
    { cat: 'Sea veg & extras', spent: 9, budget: 15, c: '#2E6B7A' }
  ];

export const budgetTips = [
    { t: 'Buy beans & sorghum dried, in bulk', save: '~40%' },
    { t: 'Grow microgreens on the windowsill', save: '~$1/oz' },
    { t: 'Cook once, eat thrice — batch on Saturday', save: 'less waste' },
    { t: 'Shop the co-op hot bar by weight', save: 'no overbuy' }
  ];

export const smoothies = [
    { name: 'Caribbean Sorrel Recovery', p: '28g', kcal: '340', base: 'Hemp + pea protein, sorrel, banana, sea moss gel', tag: 'Post-workout', c: '#8F4230' },
    { name: 'West African Baobab Builder', p: '32g', kcal: '420', base: 'Baobab, hemp, sunflower-seed butter, oats, date', tag: 'Muscle', c: '#7E5F1C', has: 'gluten', swapTo: 'swap oats for sorghum flakes' },
    { name: 'Moringa Green Warrior', p: '24g', kcal: '300', base: 'Moringa, pea protein, pineapple, ginger, coconut water', tag: 'Greens', c: '#2F4A31' },
    { name: 'Cacao Root Strength', p: '30g', kcal: '380', base: 'Cacao, hemp, pumpkin seed, plantain, cinnamon', tag: 'Bulking', c: '#7E5124' },
    { name: 'Sea Moss Sunrise', p: '22g', kcal: '290', base: 'Sea moss, mango, pea protein, turmeric, lime', tag: 'Recovery', c: '#2E6B7A' }
  ];

export const sbOptions = {
    protein: [
      { id: 'pea', name: 'Pea protein', short: 'pea-protein', p: 18, k: 110 },
      { id: 'hemp', name: 'Hemp seeds', short: 'hemp', p: 10, k: 120 },
      { id: 'pumpkin', name: 'Pumpkin seed', short: 'pumpkin-seed', p: 8, k: 130 },
      { id: 'sunflower', name: 'Sunflower butter', short: 'sunflower', p: 7, k: 140 },
      { id: 'tofu', name: 'Silken tofu', short: 'silken-tofu', p: 12, k: 100, has: 'soy' },
      { id: 'almond', name: 'Almond butter', short: 'almond', p: 7, k: 160, has: 'nuts' },
      { id: 'tahini', name: 'Tahini', short: 'tahini', p: 6, k: 170, has: 'sesame' }
    ],
    fruit: [
      { id: 'banana', name: 'Banana', p: 1, k: 100 },
      { id: 'mango', name: 'Mango', p: 1, k: 90 },
      { id: 'pineapple', name: 'Pineapple', p: 1, k: 80 },
      { id: 'plantain', name: 'Ripe plantain', p: 2, k: 120 }
    ],
    boost: [
      { id: 'moringa', name: 'Moringa', p: 2, k: 15 },
      { id: 'microgreens', name: 'Pea microgreens', p: 2, k: 20 },
      { id: 'cacao', name: 'Cacao', p: 2, k: 50 },
      { id: 'seamoss', name: 'Sea moss gel', p: 1, k: 10 }
    ],
    liquid: [
      { id: 'coconut', name: 'Coconut water', p: 2, k: 45 },
      { id: 'oat', name: 'Oat milk', p: 3, k: 120 },
      { id: 'hibiscus', name: 'Hibiscus tea', p: 0, k: 5 },
      { id: 'water', name: 'Filtered water', p: 0, k: 0 },
      { id: 'soymilk', name: 'Soy milk', p: 7, k: 110, has: 'soy' },
      { id: 'almondmilk', name: 'Almond milk', p: 1, k: 40, has: 'nuts' }
    ]
  };

export const proteinLeaders = [
    { name: 'Spirulina', g: '60g / 100g', note: 'Traditional Chad & W. Africa' },
    { name: 'Hemp seeds', g: '32g / 100g', note: 'All 9 amino acids' },
    { name: 'Pumpkin seeds', g: '30g / 100g', note: 'Zinc + magnesium' },
    { name: 'Radish microgreens', g: '~30% dry wt', note: 'Beats many powders' },
    { name: 'Black-eyed peas', g: '22g / 100g', note: 'Lysine-rich' },
    { name: 'Teff', g: '8.7–11%', note: 'Complete grain protein' }
  ];

export const hydrators = [
    { name: 'Sea moss gel in water', why: 'Trace minerals + electrolytes for long days', c: '#2E6B7A' },
    { name: 'Coconut water', why: 'Natural potassium for hot-day rehydration', c: '#2F4A31' },
    { name: 'Hibiscus–lime cooler', why: 'Cooling, vitamin C, gentle minerals', c: '#8F4230' },
    { name: 'Pinch of sea salt + citrus', why: 'Sodium helps you hold water on farm days', c: '#7E5F1C' }
  ];

export const teas = [
    { name: 'Hibiscus / Sorrel (zobo)', supports: 'Circulation & heat relief', notes: 'Anthocyanins + vitamin C; cooling and cardiovascular. The zobo/sobolo of West Africa & the Caribbean.', brew: 'Steep 15–20 min · hot or iced', caution: 'May lower blood pressure — care if on BP medication', c: '#8F4230', ev: 'Emerging evidence' },
    { name: 'Tulsi (Holy Basil)', supports: 'Stress & cortisol', notes: 'Adaptogen that calms the HPA stress axis without sedation.', brew: 'Steep 5–10 min', caution: 'Ask a clinician if pregnant', c: '#2F4A31', ev: 'Emerging evidence' },
    { name: 'Lemongrass', supports: 'Calm & digestion', notes: 'A gentle nervine that eases tension and settles the gut.', brew: 'Steep 5–8 min', caution: 'Generally gentle', c: '#2F4A31', ev: 'Traditional use' },
    { name: 'Blue Vervain', supports: 'Tension & overwhelm', notes: 'Traditional nervine for a wired, overworked system — carried by maroon healers.', brew: 'Steep 10 min · bitter', caution: 'Avoid in pregnancy', c: '#2C3A63', ev: 'Traditional use' },
    { name: 'Moringa', supports: 'Recovery & minerals', notes: 'Iron, calcium and antioxidants for post-labor recovery days.', brew: 'Steep 5 min · mild', caution: 'Start with small amounts', c: '#3C5A42', ev: 'Emerging evidence' },
    { name: 'Ginger + Turmeric', supports: 'Inflammation & warmth', notes: 'A post-training soother; add black pepper to absorb the curcumin.', brew: 'Simmer 10 min', caution: 'High doses may thin blood', c: '#7E5F1C', ev: 'Well established' }
  ];

export const pairings = [
    { combo: 'Cowpeas + lime', gain: 'Iron uptake 2–6×', why: 'Vitamin C reduces Fe³⁺ to absorbable Fe²⁺ and shields it from phytates — 25 mg doubles it, 100 mg peaks', c: '#8F4230' },
    { combo: 'Diri kole ak pwa + pikliz', gain: 'Ferment + vitamin C', why: 'Haitian rice and beans beside a fermented citrus slaw: phytate down, iron up, in one plate', c: '#2E6B7A' },
    { combo: 'Beans + red pepper or guava', gain: '~190 / ~228 mg vitamin C', why: 'The two highest-vitamin-C foods on the shelf — either one carries an iron meal', c: '#8F4230' },
    { combo: 'Three Sisters: corn + beans + squash', gain: 'Complete protein', why: 'Complementary amino acids — the Haudenosaunee & Cherokee triad', c: '#2F4A31' },
    { combo: 'Turmeric + black pepper', gain: 'Curcumin absorption ~20×', why: 'Piperine slows curcumin breakdown in the gut', c: '#7E5F1C' },
    { combo: 'Greens + a healthy fat', gain: 'More vitamins A, D, E, K', why: 'Fat-soluble vitamins need oil to cross the gut wall', c: '#2F4A31' },
    { combo: 'Fermented food + whole grains', gain: 'Minerals freed from phytates', why: 'Fermentation & souring cut anti-nutrients', c: '#2E6B7A' },
    { combo: 'Sea moss + microgreens', gain: 'Broad trace-mineral matrix', why: 'Complementary mineral spectra, land + sea', c: '#265863' }
  ];

export const prepMethods = [
    { m: 'Soak', e: 'Cuts phytates; softens beans & grains for faster cooking' },
    { m: 'Sprout', e: 'Frees iron, zinc & calcium; adds living enzymes' },
    { m: 'Ferment', e: 'Pre-digests food; boosts B-vitamins & gut flora' },
    { m: 'Cook', e: 'Breaks plant cell walls so minerals release' }
  ];

export const minerals = [
    { sym: 'Fe', name: 'Iron', c: '#8F4230', builds: 'Blood & oxygen transport', feels: 'Steady energy, focus, warmth', sources: 'Moringa, cowpeas, amaranth, dandelion', tip: 'Pair with vitamin C (lime, pepper); hold tea & coffee away from meals', ev: 'Well established' },
    { sym: 'Mg', name: 'Magnesium', c: '#2F4A31', builds: 'Nerves, muscles, 300+ enzymes', feels: 'Calm, stress resilience, better sleep', sources: 'Pumpkin seeds, millet, cacao, leafy greens', tip: 'Soak grains & beans overnight to free it from phytates', ev: 'Well established' },
    { sym: 'Zn', name: 'Zinc', c: '#7E5F1C', builds: 'Immunity, hormones, tissue repair', feels: 'Mood, libido, wound healing', sources: 'Hemp seeds, pumpkin seeds, lentils, sorghum', tip: 'Sprout or ferment to cut phytates and boost uptake', ev: 'Well established' },
    { sym: 'Ca', name: 'Calcium', c: '#665C4A', builds: 'Bones, muscle & nerve signaling', feels: 'Steadiness, structural strength', sources: 'Collards, moringa, sea moss, amaranth', tip: 'Comes with vitamin D & K in whole greens for real uptake', ev: 'Well established' },
    { sym: 'K', name: 'Potassium', c: '#2E6B7A', builds: 'Heart rhythm, fluid & cell voltage', feels: 'Mood stability, endurance', sources: 'Plantain, sweet potato, beans, callaloo', tip: 'Whole foods beat pills — the food matrix carries it in', ev: 'Well established' },
    { sym: 'I', name: 'Iodine', c: '#2C3A63', builds: 'Thyroid & metabolism', feels: 'Energy, temperature, clarity', sources: 'Sea moss, dulse, kelp', tip: 'A little goes a long way — excess can harm the thyroid', ev: 'Emerging evidence' }
  ];

export const sourceLibrary = [
    { title: 'Rooted Strength Master Field Manual', org: 'Root Life · Native Praxis · 2026', topic: 'Liberation-centered fitness doctrine', ev: 'Community oral history' },
    { title: 'Whole Foods vs Commercial Supplements', org: 'Afro-Indigenous vegan nutrition analysis', topic: 'Insulin response, food-order effect, processing losses', ev: 'Emerging evidence' },
    { title: 'Elder Plant-Based Fitness', org: 'Sarcopenia & functional strength review', topic: 'Minimum effective dose, leucine, ADL mapping', ev: 'Well established' },
    { title: 'Microgreens for Bodybuilding Recovery', org: 'Functional-foods synthesis', topic: 'Sulforaphane, chlorophyll, amino density', ev: 'Emerging evidence' },
    { title: 'Foraged Plants, Weeds & Sea Vegetables', org: 'Ancestral wildcrafting + performance science', topic: 'Mineral density, electrolytes, glycogen', ev: 'Traditional use' },
    { title: 'Nature Immersion as Anabolic Medicine', org: 'Recovery-science synthesis', topic: 'Cortisol, sunlight, grounding, immunity', ev: 'Emerging evidence' },
    { title: 'Ancestral Movement, Dance & Ritual', org: 'Talawa Technique · T. Talawa Prestø', topic: 'Rhythm, call-and-response, joint resilience', ev: 'Traditional use' },
    { title: 'Gender-Responsive Training', org: 'Trauma-informed, gender-affirming practice', topic: 'Physiological literacy without stereotyping', ev: 'Well established' },
    { title: 'Daily Rhythms for Land-Based Retreats', org: 'Circadian + Afro-Indigenous framework', topic: 'Root Rise / Root Rest, cortisol window', ev: 'Traditional use' },
    { title: 'Sea Moss & Mineral Density', org: 'Sea-vegetable review', topic: 'Iodine, trace minerals, joints', ev: 'Emerging evidence' },
    { title: 'Traditional Diets Prior to Industrial Agriculture', org: 'SuperCouncil ancestral-nutrition report', topic: '2–10× nutrient density; 90g vs 30g fiber; mineral decline', ev: 'Emerging evidence' },
    { title: 'Ancestral Food Practices & Mineral Balance', org: 'Afro-Indigenous foodways review', topic: 'Moringa 25× iron of spinach; baobab 10× vitamin C', ev: 'Traditional use' },
    { title: 'Mineral Bioavailability: An Afro-Indigenous Framework', org: 'Absorption & food-matrix study', topic: 'Enhancers, inhibitors, soaking, fermentation', ev: 'Well established' },
    { title: 'Mapping Essential Minerals to Human Organs', org: 'Root Life · 54 mineral–organ relationships', topic: 'Which minerals build which systems', ev: 'Well established' },
    { title: 'Mineral Balance & Emotional Alchemy', org: 'Bioelectric & nutritional review', topic: 'Minerals in mood, calm and stress response', ev: 'Emerging evidence' },
    { title: 'Nutrient Intake as Sacred Ceremony', org: 'Afro-Indigenous food-ritual framework', topic: 'How, when & with whom we eat (Root Life rituals)', ev: 'Community oral history' },
    { title: 'Nutrient Frequencies: An Integrative Map', org: 'Chakra · meridian · mineral synthesis', topic: 'Spiritual frameworks — held separate from clinical care', ev: 'Community oral history' },
    { title: 'Traditional Food Combinations That Boost Minerals', org: 'Afro-Indigenous food-pairing analysis', topic: 'Iron + vitamin C, Three Sisters, fermentation synergy', ev: 'Well established' },
    { title: 'Nutrient Accessibility & Digestive Compatibility', org: 'Food-preparation biochemistry', topic: 'Soaking, sprouting, fermenting, cooking effects', ev: 'Well established' },
    { title: 'Seasonal Diets Across Five Bioregions', org: 'NE U.S. · Caribbean · W/E Africa · C. America', topic: 'Bioregional seasonal food calendars', ev: 'Traditional use' },
    { title: 'Plant-Based Strategies for Type 2 Diabetes', org: 'Whole-food glycemic-management review', topic: 'Fiber, chromium, magnesium — clinician-guided', ev: 'Emerging evidence' },
    { title: 'Nutritional Frequencies for Nervous-System Regulation', org: 'Vagal-tone & bioenergetics review', topic: 'Omega-3s, magnesium, ferments for calm', ev: 'Emerging evidence' },
    { title: 'Root Life Plant-Based Therapeutic Nutrition', org: 'Functional-nutrition framework', topic: 'Soil-to-body healing; not a substitute for care', ev: 'Community oral history' },
    { title: 'Plants as Alchemists', org: 'Soil-to-nutrient transformation study', topic: 'How roots convert soil minerals to bioavailable food', ev: 'Emerging evidence' },
    { title: 'Water as First Medicine', org: 'Afro-Indigenous water protocol', topic: 'Water quality & justice; filtration, remineralization', ev: 'Community oral history' },
    { title: 'Hydration Physiology in Afro-Indigenous Bodies', org: 'Thermoregulation & hydration review', topic: 'Melanin, heat, sweat losses, electrolyte needs', ev: 'Emerging evidence' },
    { title: 'Afro-Indigenous Herbal Tea Intelligence', org: 'Ethnobotanical tea system', topic: 'Hibiscus/zobo, brewing, cardiovascular & cooling actions', ev: 'Traditional use' },
    { title: 'Nervines, Adaptogens & Emotional Resilience', org: 'Liberation-herbalism framework', topic: 'Tulsi, vervain, lemongrass for cortisol & HPA axis', ev: 'Traditional use' },
    { title: 'Coconut in Afro-Diasporic Cuisine', org: 'Food-history & cultural study', topic: 'Coconut as ancestral hydration & culinary keystone', ev: 'Community oral history' },
    { title: 'Afro-Indigenous Vegan Protein Mastery', org: 'Plant-protein & muscle-synthesis review', topic: 'Spirulina, cowpeas, teff; ancestral strength foods', ev: 'Well established' },
    { title: 'Complete Plant-Based Bodybuilding Nutrition', org: 'Vegan sports-nutrition framework', topic: '1.6–2.2 g/kg protein via traditional crops', ev: 'Well established' },
    { title: 'Plant-Based Supplement Alternatives', org: 'Whole-food swaps guide', topic: 'Pea PDCAAS 0.928; skip synthetic powders', ev: 'Emerging evidence' },
    { title: 'Microgreens as Natural Supplements', org: 'Living-supplement analysis', topic: 'Radish 30% protein; ~54% cheaper than powder', ev: 'Emerging evidence' },
    { title: 'Root Life Smoothie Science System', org: 'Plant-protein smoothie formulas', topic: '14–35g protein blends from diaspora foods', ev: 'Emerging evidence' },
    { title: 'Ancestral Athlete: Warrior Traditions', org: 'Zulu · Maasai · Capoeira · Garifuna study', topic: 'Rhythm/BPM training & warrior conditioning', ev: 'Traditional use' },
    { title: 'Permaculture Diet Systems', org: 'Closed-loop food-forest design', topic: 'Grow high-protein crops & build soil', ev: 'Traditional use' },
    { title: 'Farming as Fitness', org: 'Agricultural biomechanics review', topic: 'Farm tasks 350–700 cal/hr; farmer\u2019s walk 420', ev: 'Well established' },
    { title: 'Gluten-Free Vegan Bodybuilding Framework', org: 'Ancient-grain nutrition guide', topic: 'Fonio, teff, quinoa, amaranth, millet', ev: 'Well established' },
    { title: 'Root Life Longevity Blueprint', org: 'Elder plant-based longevity', topic: 'Bone density & muscle preservation with age', ev: 'Emerging evidence' },
    { title: 'Ritualized Training', org: 'Ceremony & warrior-tradition study', topic: 'Training as ceremony — Eunoto, Sun Dance', ev: 'Traditional use' },
    { title: 'Holistic Health Matrix', org: '4-D wellness framework', topic: 'Physical · mental · emotional · spiritual', ev: 'Community oral history' },
    { title: 'Global Afro-Indigenous Nutrition Network', org: 'Cross-diaspora food systems', topic: 'Quinoa, teff, sea moss (92/102 minerals)', ev: 'Emerging evidence' },
    { title: 'Cultural Vegan Bodybuilding Practices', org: 'Strength-tradition history', topic: 'Taíno batey, Nguni stick fighting, areytos', ev: 'Traditional use' },
    { title: 'Soy-Free Vegan Bodybuilding Blueprint', org: 'Legume-protein framework', topic: 'Sprouting +18–23% protein, +14–18% digestibility', ev: 'Well established' },
    { title: 'Root Life Vitality: Gamified Ecosystem', org: 'Ubuntu-centered app framework', topic: 'Strength Garden, village grove & growth-over-grind design', ev: 'Community oral history' },
    { title: 'The Global History of Afro-Indigenous Plant-Based Foodways', org: 'Codex methodology volume · land, seed, liberation', topic: 'The eight-tier evidence system this app labels every claim with', ev: 'Verified historical' },
    { title: 'West African Plant-Based Cuisines & Agricultural Systems', org: 'Codex regional volume · 16 nations, 6 belts', topic: 'Fermented locust bean at 30–40% protein; women hold the value chain', ev: 'Verified historical' },
    { title: 'East African, Horn & Swahili Coast Vegan Foodways', org: 'Codex regional volume · highlands to Zanzibar', topic: '180+ Orthodox fasting days; teff, enset and sour-grain fermentation', ev: 'Verified historical' },
    { title: 'North African, Nubian, Saharan & Nile Valley Cuisines', org: 'Codex regional volume · nine agro-culinary systems', topic: 'Archaeobotany of emmer and fava; Nile hydropolitics and food security', ev: 'Verified historical' },
    { title: 'Central & Southern African Plant-Based Food Systems', org: 'Codex regional volume · 17 countries', topic: 'Indigenous leafy vegetables, Miombo foraging, cassava safety systems', ev: 'Verified historical' },
    { title: 'Caribbean Vegan Foodways, Ital & Maroon Agriculture', org: 'Codex regional volume · 28+ nations and territories', topic: 'Conuco polyculture, provision grounds, Ital livity, bush-tea safety', ev: 'Community oral history' },
    { title: 'African American Vegan Foodways', org: 'Codex regional volume · ancestral survival to future cuisine', topic: 'Gullah rice line; coercion foods vs. celebration foods; Freedom Farm', ev: 'Verified historical' },
    { title: 'The Science of Nutrient Uptake & Food Combinations', org: 'Nutrient-pairing engine · scientific foundation', topic: 'Vitamin C dose-response, phytate reduction, oxalate, myth vs. evidence', ev: 'Well established' },
    { title: 'Plant-Based Nutrition Fundamentals for African-Descended Communities', org: 'Culturally grounded nutrition codex', topic: 'Protein per 100 kcal by traditional crop; B12, D, iron, iodine, omega-3', ev: 'Well established' },
    { title: 'Designing the Master Afro-Indigenous Vegan Recipe Database', org: 'Archive, nutrition engine & platform architecture', topic: 'Recipe classification tiers, cultural metadata, data sovereignty model', ev: 'Contemporary innovation' },
    { title: 'Afro-South American, Quilombola, Palenquero & Maroon Foodways', org: 'Codex regional volume · Brazil to the Guianas', topic: 'Quilombo agroforestry, dendê, Palenque sweets, Amazonian terra preta', ev: 'Verified historical' },
    { title: 'Afro-Asian and Indian Ocean Foodways', org: 'Codex regional volume · trade, migration, ethical fusion', topic: 'Monsoon dhow trade vs. indenture vs. parallel invention; the 8-question fusion check', ev: 'Verified historical' },
    { title: 'Afro-Indian, Siddi, Indo-Caribbean & Indian Ocean Vegan Cuisines', org: 'Codex regional volume · six diasporas, one ocean', topic: 'Indenture 1834–1917; doubles and dholl puri as traditionally vegan; caste, apartheid and the bunny chow', ev: 'Verified historical' },
    { title: 'The Afro-Italian Culinary Codex', org: 'Codex regional volume · Africa, Italy and the politics of the plate', topic: 'Arab Sicily, gastrofascism and wheat autarky, caporalato labour justice, citizenship', ev: 'Verified historical' },
    { title: 'Afro-Indigenous Grains, Pseudograins, Porridges, Breads & Cereal Sovereignty', org: 'Pantry Codex volume', topic: 'Fonio, teff and the 2018 patent voiding; nixtamalization and pellagra; Black Rice and Eagles Island; orphan-crop climate resilience', ev: 'Verified historical' },
    { title: 'Legumes, Peas, Beans, Groundnuts & Afro-Indigenous Plant-Protein Sovereignty', org: 'Pantry Codex volume', topic: 'Cowpea and Bambara domestication; nitrogen fixation by species; lectin food safety; orphan-crop revival', ev: 'Strong scientific' },
    { title: 'Culinary & Functional Mushrooms in Afro-Indigenous Vegan Cuisine', org: 'Pantry Codex volume · farming, medicine-claim ethics, circular agriculture', topic: 'Oyster and lion’s mane cultivation; PSK/PSP evidence grading; Termitomyces ethnomycology; wild-ID safety policy', ev: 'Moderate scientific' },
    { title: 'Global Afro-Indigenous Herbal Teas, Infusions, Decoctions & Beverage Safety', org: 'Pantry Codex volume', topic: 'Nine-tier evidence hierarchy; hibiscus and ginger RCTs; soursop, guinea hen weed and cerasee risk signals; botanical name disambiguation', ev: 'Moderate scientific' },
    { title: 'Smoothies, Juices, Tonics, Electrolyte Drinks & Plant-Based Liquid Nutrition', org: 'Pantry Codex volume · the Afro-Indigenous Beverage Codex', topic: 'Seventeen-class taxonomy with permitted and prohibited claims; blending vs. juicing glycemic evidence; ORS boundary', ev: 'Strong scientific' },
    { title: 'Microgreens as Food, Farm Product, Nutritional Ingredient & Community Enterprise', org: 'Pantry Codex volume · a Root Life Systems report', topic: 'FDA sprout vs. microgreen distinction; per-gram vs. per-serving honesty; 38→300 tray cooperative model', ev: 'Moderate scientific' },
    { title: 'The Global Afro-Indigenous Plant-Based Ingredient Encyclopedia', org: 'Pantry Codex architecture · research, architecture, implementation design', topic: 'Six-axis classification; name normalisation across hundreds of regional names; safety-critical warning tiers; cultural-integrity framework', ev: 'Verified historical' }
  ];

export const elderDose = [
    { v: 'Frequency', min: '2 / week', opt: '2\u20133 / week' },
    { v: 'Duration', min: '20\u201330 min', opt: '30\u201345 min' },
    { v: 'Sets', min: '1\u20132', opt: '2\u20133' },
    { v: 'Reps', min: '6\u201312', opt: '8\u201312' },
    { v: 'Effort (RPE)', min: '5\u20136 / 10', opt: '6\u20138 / 10' }
  ];

export const elderMoves = [
    { move: 'Sit-to-stand', adl: 'Rising from a chair or toilet' },
    { move: 'Wall / counter push-up', adl: 'Pushing doors and carts' },
    { move: 'Seated row · band pull', adl: 'Pulling doors, carrying bags' },
    { move: 'Glute bridge · hip thrust', adl: 'Standing up, stair climbing' },
    { move: 'Heel raise on a step', adl: 'Walking stability, balance' },
    { move: 'Bird dog · modified plank', adl: 'Posture, fall prevention' }
  ];

export const ancestralTraditions = [
    { name: 'Talawa Technique', origin: 'Africognosomatic · T. Talawa Prestø', builds: 'Hips, core & lower-body power through danced martial arts and ritual dance', c: '#8F4230' },
    { name: 'Kemetic-inspired postures', origin: 'Nile Valley lineage', builds: 'Alignment, static strength, morning reawakening', c: '#7E5F1C' },
    { name: 'Call-and-response circles', origin: 'Pan-African communal', builds: 'Collective endurance; rhythm regulates effort and rest', c: '#2F4A31' },
    { name: 'Grounded stepping & stomp', origin: 'Diasporic ring traditions', builds: 'Joint-protective repetition, work capacity, embodiment', c: '#2E6B7A' },
    { name: 'Nguni stick fighting', origin: 'Zulu battlefield-to-sport lineage', builds: 'Footwork, rotational power, reaction speed — regulated sparring, never romanticized combat', c: '#7E5124' },
    { name: 'Batey ball games', origin: 'Taíno ceremonial plazas', builds: 'Agility, hip drive and team endurance — sport and ceremony inseparable', c: '#2C3A63' }
  ];

export const forageItems = [
    { name: 'Dandelion', botanical: 'Taraxacum officinale', use: 'Deep taproot pulls iron (more than spinach), calcium and potassium. Bitter greens young, roots roasted like coffee.', season: 'Spring–Fall', c: '#7E5F1C', regions: ['northeast', 'centralam'], mo: [2, 3, 4, 5, 6, 7, 8, 9] },
    { name: 'Stinging nettle', botanical: 'Urtica dioica', use: 'Iron, calcium and real protein once cooked or dried — the classic spring tonic green.', season: 'Spring', c: '#2F4A31', regions: ['northeast', 'eastafrica'], mo: [2, 3, 4], warn: 'Gloves to harvest. Heat or drying removes the sting entirely.' },
    { name: 'Purslane · verdolaga', botanical: 'Portulaca oleracea', use: 'Rare plant omega-3s plus magnesium — cooling and crisp in heat, from a sidewalk crack to a market stall.', season: 'Summer', c: '#2F4A31', regions: ['northeast', 'caribbean', 'centralam', 'westafrica'], mo: [5, 6, 7, 8] },
    { name: 'Lambsquarters', botanical: 'Chenopodium album', use: 'Wild amaranth cousin — dense calcium and vitamin A. Cook like spinach; it outgrows anything you planted.', season: 'Summer', c: '#587A4C', regions: ['northeast', 'westafrica'], mo: [5, 6, 7, 8] },
    { name: 'Dulse & kelp', botanical: 'Palmaria / Laminaria', use: 'Electrolytes and iodine for hydration and thyroid. Cut above the holdfast so the plant regrows.', season: 'Coastal, year-round', c: '#2E6B7A', regions: ['northeast'], mo: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    { name: 'Sea moss', botanical: 'Gracilaria / Chondrus spp.', use: 'Rinsed, gelled and stirred into drinks for minerals and joint comfort — a Caribbean staple long before the wellness aisle.', season: 'Year-round · reefs', c: '#3F7F86', regions: ['caribbean', 'centralam'], mo: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    { name: 'Sorrel · roselle', botanical: 'Hibiscus sabdariffa', use: 'Tart calyces steeped hot or cold for vitamin C and anthocyanins — the season drink from Dakar to Kingston.', season: 'Nov – Jan', c: '#8F4230', regions: ['caribbean', 'westafrica'], mo: [10, 11, 0] },
    { name: 'Cerasee vine', botanical: 'Momordica charantia', use: 'Fiercely bitter bush-tea leaf, taken traditionally in short courses for blood and skin.', season: 'Wet season', c: '#7E9A4E', regions: ['caribbean'], mo: [4, 5, 6, 7, 8, 9, 10], warn: 'Not while pregnant or nursing, and not alongside blood-sugar medication — flagged against your herb-safety answers.' },
    { name: 'Moringa leaf', botanical: 'Moringa oleifera', use: 'Iron, calcium and a near-complete amino profile from a tree that leafs through drought. Strip, dry, powder.', season: 'Year-round', c: '#2F4A31', regions: ['westafrica', 'eastafrica', 'caribbean', 'centralam'], mo: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    { name: 'Baobab leaf', botanical: 'Adansonia digitata', use: 'Young leaves dried into kuka powder for calcium and iron; the fruit pulp carries more vitamin C than citrus.', season: 'Rainy season', c: '#7E5124', regions: ['westafrica'], mo: [5, 6, 7, 8, 9] },
    { name: 'Bitterleaf', botanical: 'Vernonia amygdalina', use: 'Washed by hand until the bitterness eases, then cooked long into soup — a traditional digestive green.', season: 'Rainy season', c: '#2F4A31', regions: ['westafrica'], mo: [4, 5, 6, 7, 8, 9] },
    { name: 'Wild amaranth · efo', botanical: 'Amaranthus spp.', use: 'Volunteers in every disturbed field — iron, folate and lysine-rich leaves; seed heads thresh into grain.', season: 'Rains', c: '#3E5C40', regions: ['westafrica', 'eastafrica', 'caribbean', 'centralam'], mo: [4, 5, 6, 7, 8, 9] },
    { name: 'Pumpkin leaves & tendrils', botanical: 'Cucurbita spp.', use: 'Tender tips cooked down with groundnut or coconut — iron and vitamin A, a second harvest off the same vine.', season: 'Short rains', c: '#7E5F1C', regions: ['eastafrica', 'westafrica'], mo: [9, 10, 11] },
    { name: 'Chaya · tree spinach', botanical: 'Cnidoscolus aconitifolius', use: 'Maya dooryard tree with extraordinary calcium and iron — one of the most productive greens on earth.', season: 'Year-round', c: '#2F4A31', regions: ['centralam'], mo: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], warn: 'Must be boiled at least five minutes in an open pot. Never eaten raw, never in aluminium.' },
    { name: 'Chipilín', botanical: 'Crotalaria longirostrata', use: 'Aromatic legume green folded into tamales and rice for iron and protein. Wilts fast — cook it the day you cut it.', season: 'Wet season', c: '#587A4C', regions: ['centralam'], mo: [4, 5, 6, 7, 8, 9, 10] }
  ];

export const mushrooms = [
    { name: 'Oyster', role: 'Meals & muscle', use: 'Tear, sear hot and dry — "pepper steak" texture with protein, B-vitamins and the rare antioxidant ergothioneine.', ev: 'Well established', c: '#665C4A' },
    { name: 'Shiitake', role: 'Immunity & vitamin D', use: 'Sun-dry gills-up before cooking for vitamin D; deep umami plus lentinan, among the most-studied mushroom polysaccharides.', ev: 'Emerging evidence', c: '#6E5A44' },
    { name: "Lion's Mane", role: 'Focus & nerve support', use: 'Shred and sear into a crab-cake texture; studied for nerve growth factor, memory and clarity.', ev: 'Emerging evidence', c: '#C9B98C' },
    { name: 'Reishi', role: 'Calm & sleep tonic', use: 'Too woody to eat — simmer 20 minutes into a bitter evening tea that closes a heavy training day.', ev: 'Traditional use', c: '#8F4230' },
    { name: 'Cordyceps', role: 'Stamina & oxygen use', use: 'Pre-training tea or powder; studied for endurance and oxygen uptake in older adults. Cultivated only.', ev: 'Emerging evidence', c: '#7E5F1C' },
    { name: 'Turkey Tail', role: 'Immune ally', use: 'The striped shelf fungus, decocted as tea. Promising research — clinician-aware use, never a treatment substitute.', ev: 'Emerging evidence', c: '#2E6B7A' }
  ];

export const trays = [
    { id: 'sunflower', name: 'Sunflower shoots', day: 10, days: 10, note: '', c: '#7E5F1C', c2: '#B0872F' },
    { id: 'pea', name: 'Pea shoots', day: 9, days: 11, note: 'joins the pantry Friday', c: '#3A5540', c2: '#2C4231' },
    { id: 'radish', name: 'Rainbow radish', day: 4, days: 10, note: 'spicy · ~30% protein dry weight', c: '#8F4230', c2: '#9C4A35' },
    { id: 'amaranth', name: 'Red amaranth (callaloo)', day: 2, days: 12, note: 'just sprouted', c: '#2F4A31', c2: '#5F8050' }
  ];

export const gardenBase = [
    { s: 3, c: '#8FB37A' }, { s: 2, c: '#C79A45' }, { s: 3, c: '#7FA8B5' }, { s: 1, c: '#C97F63' },
    { s: 2, c: '#8FB37A' }, { s: 3, c: '#C79A45' }, { s: 1, c: '#7FA8B5' }, { s: 2, c: '#C97F63' },
    { s: 3, c: '#8FB37A' }
  ];

export const tendDefs = [
    { key: 'move', label: 'Move — Push & Carry session', sub: '42 min · plants a teal sapling', c: '#7FA8B5' },
    { key: 'nourish', label: 'Nourish — a complete Rooted Plate', sub: 'protein + green + carb · plants clay', c: '#C97F63' },
    { key: 'rest', label: 'Rest — Root Rest wind-down', sub: '4 min long exhale · plants green', c: '#3E5C40' }
  ];

export const sovStats = [
    { n: '1.3×', label: 'hypertension burden vs. general population', c: '#8F3E2C' },
    { n: '2.5×', label: 'type 2 diabetes in Native communities', c: '#7E5124' },
    { n: '20', label: 'diet-related conditions this framework addresses', c: '#3C5A42' }
  ];

export const plantWeek = [
    { id: 'collards', name: 'Collards' }, { id: 'cowpeas', name: 'Cowpeas' }, { id: 'plantain', name: 'Plantain' },
    { id: 'hemp', name: 'Hemp' }, { id: 'okra', name: 'Okra' }, { id: 'millet', name: 'Millet' },
    { id: 'mango', name: 'Mango' }, { id: 'seamoss', name: 'Sea moss' }, { id: 'tomato', name: 'Tomato' },
    { id: 'lime', name: 'Lime' }, { id: 'oats', name: 'Oats' }, { id: 'cacao', name: 'Cacao' },
    { id: 'callaloo', name: 'Callaloo' }, { id: 'sweetpot', name: 'Sweet potato' }, { id: 'fonio', name: 'Fonio' },
    { id: 'pumpkin', name: 'Pumpkin seed' }, { id: 'hibiscus', name: 'Hibiscus' }, { id: 'mushroom', name: 'Oyster mushroom' },
    { id: 'flax', name: 'Flax' }, { id: 'amaranth', name: 'Amaranth' }, { id: 'baobab', name: 'Baobab' },
    { id: 'blackbeans', name: 'Black beans' }, { id: 'moringa', name: 'Moringa' }, { id: 'ginger', name: 'Ginger' }
  ];

export const sovSystemDefs = [
    { id: 'heart', name: 'Heart & vessels', c: '#8F3E2C', tintBg: '#F3E4DC',
      headline: 'Nitrates from collards and callaloo, potassium from beans, hibiscus as a natural ACE-inhibitor — the pot is cardiology.',
      conditions: [
        { name: 'High blood pressure', fix: 'Leafy greens daily, beans over salt-heavy meats, sorrel/hibiscus tea in the rotation, and potassium-rich provisions like plantain.', stat: 'DASH-style eating: −5.5 mmHg systolic', ev: 'Well established' },
        { name: 'Cholesterol & triglycerides', fix: 'Okra\u2019s mucilage binds cholesterol; soluble fiber from legumes and amaranth carries bile acids out; sea moss adds omega-3 precursors.', stat: 'Vegan patterns: LDL −0.30 mmol/L', ev: 'Well established' } ] },
    { id: 'metabolic', name: 'Blood sugar', c: '#7E5124', tintBg: '#F0E3D2',
      headline: 'So rare before contact that many Indigenous languages had no word for diabetes — fonio, millet and beans are the way back.',
      conditions: [
        { name: 'Type 2 diabetes', fix: 'Low-GI ancient grains (fonio, millet) instead of refined starch; resistant starch from beans; whole-food fat kept moderate to clear the insulin channel.', stat: 'A1c reductions of 0.5–1.2 points in trials', ev: 'Well established' },
        { name: 'Weight & metabolic syndrome', fix: 'Fiber-dense plates satisfy on fewer calories — no restriction talk, just density. Batch-cooked stews beat ultra-processed convenience.', stat: 'Greater fat loss than control diets', ev: 'Well established' } ] },
    { id: 'blood', name: 'Blood & energy', c: '#8F4230', tintBg: '#F3E4DC',
      headline: 'Iron, B12 and vitamin D are the plant-based watch-list — all three are solvable with ancestral foods plus two supplements.',
      conditions: [
        { name: 'Iron & anemia', fix: 'Moringa (28mg iron per 100g — nearly 4× the RDA), amaranth, collards and cowpeas — always with vitamin C, which lifts absorption up to 6-fold.', stat: 'Vit C: up to 6× iron absorption', ev: 'Well established' },
        { name: 'Vitamin D', fix: 'Sun on skin 15–30 minutes most days; UV-exposed mushrooms carry real vitamin D; fortified milks or lichen-D3 through winter.', stat: 'UV mushrooms: 18µg per 75g serving', ev: 'Emerging evidence' } ] },
    { id: 'immune', name: 'Immune & gut', c: '#3C5A42', tintBg: '#E4EDDD',
      headline: '70–80% of immunity lives in the gut. Variety, fiber and ferments are the training program.',
      conditions: [
        { name: 'Chronic inflammation', fix: 'Moringa\u2019s 46 antioxidants, turmeric with black pepper, and omega-3 ALA from hemp, chia and flax quiet the background fire.', stat: 'Vegan diets: CRP −0.54 mg/L', ev: 'Well established' },
        { name: 'Gut microbiome', fix: 'Aim for 30+ different plants a week and 1–3 daily servings of ferments — fermented sea moss gel, sauerkraut, plant yogurts. Diversity of plants beats any single "superfood".', stat: '30+ plants/week: richer microbiome', ev: 'Emerging evidence' } ] }
  ];

export const familyDefs = [
    { id: 'amara', name: 'Amara', age: '34', role: 'Training adult', initial: 'A', c: '#2E6B7A',
      points: ['1.6–2.2 g/kg protein spread across the day', 'Iron paired with vitamin C at every plate', 'Fuel shifts up on farm and training days'] },
    { id: 'kofi', name: 'Kofi', age: '9', role: 'Growing child', initial: 'K', c: '#7E5F1C',
      points: ['Energy density first — small stomach, big growth: add avocado, coconut, seed butters', 'B12 and vitamin D are non-negotiable, from fortified milk or drops', 'Calcium from fortified milks, amaranth greens and sesame-free seeds'] },
    { id: 'nana', name: 'Nana', age: '68', role: 'Elder', initial: 'N', c: '#7E5124',
      points: ['A protein anchor every meal — 2.5g+ leucine holds muscle with age', 'Softer textures: stews, porridges, well-cooked greens', 'Hydration on a schedule — thirst signals fade with age'] }
  ];

export const teaGoalDefs = [
    { id: 'energy', name: 'Morning fire', c: '#7E5F1C', tintBg: '#F0E3D2', ritual: 'Brew before the sunrise stretch — warm ginger wakes digestion before the first plate.', teas: [
      { name: 'Ginger + lime', why: 'Circulation and digestive fire without a caffeine crash.', brew: 'Simmer fresh root 10 min', ev: 'Well established', avoid: ['thinners'] },
      { name: 'Moringa leaf', why: 'Gentle lift plus iron, calcium and 46 antioxidants.', brew: 'Steep 5 min \u00b7 don\u2019t boil the leaf', ev: 'Emerging evidence' },
      { name: 'Cacao-husk brew', why: 'Theobromine — smooth, heart-opening energy of the diaspora.', brew: 'Steep husks 8\u201310 min', ev: 'Traditional use' } ] },
    { id: 'calm', name: 'Evening cool-down', c: '#2E6B7A', tintBg: '#D9E7EC', ritual: 'Last cup 90 minutes before bed — let the nervous system land before the pillow.', teas: [
      { name: 'Blue vervain', why: 'Caribbean nervine for the wired-but-tired evening.', brew: 'Steep 10 min \u00b7 bitter is the point', ev: 'Traditional use', caution: 'Avoid in pregnancy', avoid: ['pregnant'] },
      { name: 'Tulsi (holy basil)', why: 'Adaptogen that lowers cortisol without sedation.', brew: 'Steep 5\u201310 min', ev: 'Emerging evidence', caution: 'Ask a clinician if pregnant', avoid: ['pregnant', 'thinners'] },
      { name: 'Lemon balm', why: 'Softens racing thoughts; pairs well with breathwork.', brew: 'Steep 5 min, covered', ev: 'Emerging evidence' } ] },
    { id: 'recovery', name: 'Training recovery', c: '#2F4A31', tintBg: '#E4EDDD', ritual: 'Post-session, alongside protein — anti-inflammatory herbs work best next to food.', teas: [
      { name: 'Hibiscus / sorrel', why: 'Anthocyanins cool inflammation and support the vessels.', brew: 'Steep 10 min \u00b7 lovely cold', ev: 'Well established', caution: 'Keep 1h from iron-rich meals', avoid: ['bp'] },
      { name: 'Turmeric + black pepper', why: 'Curcumin quiets soreness; pepper lifts absorption ~20\u00d7.', brew: 'Simmer 10 min in plant milk', ev: 'Well established', avoid: ['thinners'] },
      { name: 'Soursop leaf', why: 'Island evening recovery brew for deep rest.', brew: 'Steep 8 min', ev: 'Traditional use', caution: 'Not for daily long-term use', avoid: ['pregnant', 'bp'] } ] },
    { id: 'iron', name: 'Mineral builders', c: '#8F4230', tintBg: '#F3E4DC', ritual: 'Cold-brew overnight and sip between meals — minerals without the tannin tax.', teas: [
      { name: 'Stinging nettle', why: 'Iron, calcium and magnesium in a weedy package.', brew: 'Overnight cold infusion', ev: 'Well established' },
      { name: 'Yellow dock root', why: 'Classic low-iron ally of Southern root doctors.', brew: 'Decoct root 15 min', ev: 'Traditional use', caution: 'Start small — moves the bowels', avoid: ['pregnant'] },
      { name: 'Dandelion leaf', why: 'Bitter minerals plus gentle liver support.', brew: 'Steep 7 min', ev: 'Traditional use', avoid: ['bp'] } ] }
  ];

export const teaRules = [
    { t: 'Tannins block iron', s: 'Keep hibiscus and true teas an hour away from iron-forward plates; ginger and moringa are safe alongside.' },
    { t: 'Cold overnight brews', s: 'Nettle and moringa steep overnight in cold water for fuller minerals and less tannin.' },
    { t: 'Honor the source', s: 'Buy from diaspora growers where you can — the Atlas flags community suppliers.' }
  ];

export const freqBandDefs = [
    { id: 'grounding', name: 'Grounding', c: '#7E5124', tintBg: '#F0E3D2', state: 'Rooted & steady',
      feel: 'For scattered, anxious or depleted days — dense roots and minerals that slow the system down into the body.',
      practice: 'Eat these warm and slow: a root stew before a hard conversation lands better than a cold snack.',
      foods: [
        { name: 'Yam & sweet potato', why: 'Complex carbs steady blood sugar — the physiological floor of a calm mood.', ev: 'Well established' },
        { name: 'Sea moss', why: '92 trace minerals in traditional preparation; iodine feeds the thyroid\u2019s set-point.', ev: 'Traditional use' },
        { name: 'Black-eyed peas', why: 'Zinc and B6 for neurotransmitter production, fiber for a slow burn.', ev: 'Well established' } ] },
    { id: 'building', name: 'Building', c: '#8F4230', tintBg: '#F3E4DC', state: 'Strong & repairing',
      feel: 'For training blocks, postpartum and recovery — the amino acids and iron that rebuild tissue and blood.',
      practice: 'Anchor every plate with a protein and pair iron with vitamin C — building is rhythm, not one big meal.',
      foods: [
        { name: 'Hemp seeds', why: 'Complete protein with an anti-inflammatory omega balance.', ev: 'Well established' },
        { name: 'Amaranth & callaloo', why: 'Iron plus lysine — the diaspora\u2019s muscle-and-blood green.', ev: 'Well established' },
        { name: 'Fonio & millet', why: 'Methionine-rich ancient grains that complete legume protein.', ev: 'Well established' } ] },
    { id: 'uplifting', name: 'Uplifting', c: '#7E5F1C', tintBg: '#FBF3E0', state: 'Bright & clear',
      feel: 'For heavy, foggy or low mornings — B-vitamins, vitamin C and natural color that lift energy metabolism.',
      practice: 'Front-load brightness: fruit and greens before noon ride the cortisol wave instead of fighting it.',
      foods: [
        { name: 'Mango & citrus', why: 'Vitamin C for iron absorption, adrenals and neurotransmitter synthesis.', ev: 'Well established' },
        { name: 'Baobab', why: 'Six times the vitamin C of oranges with prebiotic fiber — the savanna\u2019s morning powder.', ev: 'Emerging evidence' },
        { name: 'Moringa', why: 'B-vitamins, iron and 46 antioxidants in a spoon of leaf.', ev: 'Emerging evidence' } ] },
    { id: 'calming', name: 'Calming', c: '#2E6B7A', tintBg: '#D9E7EC', state: 'Settled & soft',
      feel: 'For wired evenings and racing minds — magnesium and gentle nervines that let the nervous system land.',
      practice: 'Pair a magnesium-rich dinner with a nervine cup and long-exhale breath — the trio works better than any alone.',
      foods: [
        { name: 'Pumpkin seeds & cacao', why: 'Magnesium — the mineral most depleted by stress and sweat.', ev: 'Well established' },
        { name: 'Oats & plantain', why: 'Slow carbs help tryptophan cross into the brain for serotonin and sleep.', ev: 'Emerging evidence', has: 'gluten', swapTo: 'sorghum or teff instead of oats' },
        { name: 'Blue vervain & lemon balm', why: 'Diaspora nervines that soften the wired-but-tired edge.', ev: 'Traditional use' } ] }
  ];

export const warriorDefs = [
    { id: 'zulu', name: 'Zulu regiments', origin: 'Southern Africa', c: '#8F4230', tint: '#F3E4DC',
      practice: 'Amabutho regiments ran barefoot for hours and drilled in formation — endurance, discipline and shared rhythm were the training.',
      fuel: 'Sorghum porridge, amadumbe (taro) and cowpeas — slow carbs and plant protein for all-day legs.',
      moves: [
        { name: 'Long barefoot-style run', sets: '30–45 min · soft ground, easy pace' },
        { name: 'Formation march intervals', sets: '6 × 2 min brisk · 1 min walk' },
        { name: 'Spear-reach lunge', sets: '3 × 10 each side · slow reach' } ] },
    { id: 'agojie', name: 'Agojie conditioning', origin: 'Dahomey (Benin)', c: '#8F3E2C', tint: '#F0DED8',
      practice: 'The women warriors of Dahomey trained obstacle climbs, wrestling and pain-tolerance drills — full-body toughness built daily.',
      fuel: 'Bean cakes (akara-style), palm-nut stews and roasted maize — dense protein and fat for hard conditioning.',
      moves: [
        { name: 'Wall / obstacle climb-over', sets: '5 rounds · controlled up & down' },
        { name: 'Partner or sandbag wrestle-carry', sets: '4 × 30 sec · rest 90 sec' },
        { name: 'Crawl-to-stand sprint', sets: '6 × 15 m' } ] },
    { id: 'capoeira', name: 'Capoeira flow', origin: 'Afro-Brazilian', c: '#7E5F1C', tint: '#FBF3E0',
      practice: 'Born in resistance, capoeira hides fight in dance — ginga rhythm, inversions and kicks build mobile, elastic strength.',
      fuel: 'Black beans and rice, cassava and tropical fruit — the roda runs on carbs and rhythm.',
      moves: [
        { name: 'Ginga (base sway)', sets: '3 × 2 min continuous' },
        { name: 'Negativa → role transition', sets: '3 × 6 each side' },
        { name: 'Bridge / au (cartwheel) practice', sets: '5 slow, supported reps' } ] },
    { id: 'maasai', name: 'Maasai jumping', origin: 'East Africa', c: '#2E6B7A', tint: '#D9E7EC',
      practice: 'The adumu jump-dance rewards vertical spring held with a tall, still spine — elastic power from the ankles up.',
      fuel: 'Milk-free adaptation: fortified plant milks, millet and greens keep calcium and iron behind the spring.',
      moves: [
        { name: 'Vertical pogo jumps', sets: '4 × 12 · minimal knee bend' },
        { name: 'Tall-spine hop & stick', sets: '3 × 8 · land silent' },
        { name: 'Single-leg ankle bounces', sets: '3 × 15 each' } ] },
    { id: 'kalenda', name: 'Stick fighting', origin: 'Kalenda · Caribbean', c: '#2F4A31', tint: '#E4EDDD',
      practice: 'Carried from West Africa into Trinidad and beyond, kalenda trains reaction, footwork and wrist endurance to drum rhythm.',
      fuel: 'Provision ground plates — dasheen, plantain, callaloo — steady fuel for fast hands.',
      moves: [
        { name: 'Stick figure-8 flows', sets: '3 × 1 min each hand' },
        { name: 'Lateral step-and-strike', sets: '4 × 10 each side' },
        { name: 'Reaction partner taps', sets: '5 × 30 sec' } ] }
  ];

export const coconutDefs = [
    { id: 'kitchen', name: 'In the kitchen', c: '#665C4A', tint: '#EFEAE0',
      story: 'Rundown, oil-down, rice and peas — across the islands the pot starts with milk pressed from fresh-grated flesh. The technique is the inheritance.',
      items: [
        { name: 'Coconut milk & rundown', why: 'Simmered down to a rich gravy for callaloo, provisions and fish-free stews.', ev: 'Traditional use' },
        { name: 'Coconut cream for rice & peas', why: 'The Sunday-pot signature from Jamaica to Trinidad — cream, thyme, scotch bonnet.', ev: 'Traditional use' },
        { name: 'Fresh-grated vs canned', why: 'Fresh flesh carries more aroma and fiber; canned works — check for additives.', ev: 'Traditional use' } ] },
    { id: 'training', name: 'Training fuel', c: '#7E5F1C', tint: '#FBF3E0',
      story: 'The original sports drink grows on a tree — water for minerals, flesh and oil for dense energy on long farm and trail days.',
      items: [
        { name: 'Coconut water after farm work', why: 'Potassium-rich natural electrolytes for sweat-heavy days.', ev: 'Emerging evidence' },
        { name: 'MCT quick energy', why: 'Medium-chain fats absorb fast — a steady lift without a sugar spike.', ev: 'Emerging evidence' },
        { name: 'Coconut + fruit pre-workout', why: 'Carbs plus fat slow the burn for long sessions.', ev: 'Well established' } ] },
    { id: 'body', name: 'Body & recovery', c: '#2F4A31', tint: '#E4EDDD',
      story: 'Beyond the plate: oil worked into scalp and skin is a grooming ritual carried through generations of the diaspora.',
      items: [
        { name: 'Oil as skin & hair ritual', why: 'Protective styling and scalp care — care of the body as practice, not product.', ev: 'Traditional use' },
        { name: 'Fat that carries vitamins', why: 'Coconut fat helps absorb A, D, E and K from the greens beside it.', ev: 'Well established' } ] },
    { id: 'ceremony', name: 'Ceremony & story', c: '#2E6B7A', tint: '#D9E7EC',
      story: 'Cracked for libations, split at thresholds, grated at the family table — the coconut marks openings, offerings and memory.',
      items: [
        { name: 'Libations & offerings', why: 'Water poured for ancestors across African and Caribbean traditions.', ev: 'Traditional use' },
        { name: 'The grater as family memory', why: 'Grating coconut is intergenerational kitchen labor — stories move with the work.', ev: 'Traditional use' },
        { name: 'Provision-ground economy', why: 'Palms on the margins fed families outside plantation control.', ev: 'Traditional use' } ] }
  ];

export const honeyDefs = [
    { id: 'fuel', name: 'Training fuel', c: '#7E5F1C', tint: '#FBF3E0',
      story: 'Fast glycogen timed around work — honey water before the field, a spoon mid-session on long days, paired with protein after.',
      items: [
        { name: 'Pre-workout honey water', why: 'Quick carbs plus fluid 30 minutes before farm or training work.', ev: 'Emerging evidence' },
        { name: 'Intra-session quick carbs', why: 'A tablespoon (~17g carbs) holds output on sessions past 90 minutes.', ev: 'Well established' },
        { name: 'Post-workout with protein', why: 'Fast sugar restocks glycogen while protein rebuilds.', ev: 'Well established' } ] },
    { id: 'medicine', name: 'Traditional medicine', c: '#2F4A31', tint: '#E4EDDD',
      story: 'Before pharmacies, the hive was the cabinet — throat, cough, wounds and seasonal transitions.',
      items: [
        { name: 'Raw honey for throat & cough', why: 'Matches or beats OTC syrups for night cough in studies. Never for infants under 1.', ev: 'Well established' },
        { name: 'Wound-care lineage', why: 'Medical-grade honey dressings continue an ancient practice.', ev: 'Emerging evidence' },
        { name: 'Local honey & the seasons', why: 'Eating with local bloom cycles ties the pantry to place.', ev: 'Traditional use' } ] },
    { id: 'story', name: 'Beekeeping & story', c: '#7E5124', tint: '#F0E3D2',
      story: 'From Tanzanian log hives to Southern backyard boxes, keeping bees has been Black land-skill, trade and ceremony.',
      items: [
        { name: 'Tanzania & Zanzibar apiculture', why: 'East African forest beekeeping is centuries-old craft and income.', ev: 'Traditional use' },
        { name: 'Black beekeeping in the Americas', why: 'Freedmen kept hives for sweetness, medicine and market.', ev: 'Traditional use' },
        { name: 'Honey as offering', why: 'Poured for sweetness in life across diaspora spiritual traditions.', ev: 'Traditional use' } ] },
    { id: 'ethics', name: 'The vegan question', c: '#2E6B7A', tint: '#D9E7EC',
      story: 'Honey is animal-made — where it sits in plant-based practice is yours to decide, with honest options either way.',
      items: [
        { name: 'Strict vegan: swap it', why: 'Date syrup, sorghum syrup and agave cover every use in this app.', ev: 'Traditional use' },
        { name: 'Bee-inclusive plant-based', why: 'Some choose small-scale, ethically kept hives as pollinator stewardship.', ev: 'Traditional use' },
        { name: 'Buy Black & local', why: 'If you opt in, source from local and Black-owned apiaries.', ev: 'Traditional use' } ] }
  ];

export const greenDefs = [
    { id: 'pea', name: 'Pea', c: '#3E5C40', days: '10–14 days', flavor: 'Sweet, crunchy, fresh-pea snap — the gateway green kids actually eat.',
      nutrients: [
        { name: 'Protein leader', why: 'Highest protein of the common microgreens — a true training green.', ev: 'Well established' },
        { name: 'Vitamin C + folate', why: 'Fresh-cut shoots hold far more vitamin C than shelf peas.', ev: 'Well established' } ],
      grow: 'Soak seed overnight, sow dense, harvest above the lowest leaf — many trays regrow for a second cut.' },
    { id: 'broccoli', name: 'Broccoli', c: '#2F4A31', days: '8–12 days', flavor: 'Mild, fresh brassica — disappears into smoothies and bowls.',
      nutrients: [
        { name: 'Sulforaphane dense', why: 'Up to 10–50× the glucoraphanin of mature broccoli by weight — the most-studied microgreen compound.', ev: 'Well established' },
        { name: 'Detox & recovery support', why: 'Sulforaphane activates the body\u2019s own antioxidant (Nrf2) pathways.', ev: 'Emerging evidence' } ],
      grow: 'No soak; even misting; harvest at first true leaf for peak compound density.' },
    { id: 'amaranth', name: 'Amaranth', c: '#8F4230', days: '8–12 days', flavor: 'Earthy beet-like magenta shoots — diaspora heritage in miniature.',
      nutrients: [
        { name: 'Iron & betalains', why: 'Iron-forward with red betalain pigments — pair with citrus for absorption.', ev: 'Emerging evidence' },
        { name: 'Complete-ish protein', why: 'Carries amaranth\u2019s lysine advantage into the shoot stage.', ev: 'Emerging evidence' } ],
      grow: 'Tiny seed — surface-sow thinly, keep warm; delicate stems, cut gently.' },
    { id: 'collard', name: 'Collard', c: '#3C5A42', days: '10–14 days', flavor: 'Sweet young cabbage-collard taste, none of the long-pot bitterness.',
      nutrients: [
        { name: 'Calcium + vitamin K', why: 'The Sunday-greens minerals, concentrated in a 12-day shoot.', ev: 'Well established' },
        { name: 'Heritage in a tray', why: 'The same crop that anchors Southern foodways, grown on a windowsill.', ev: 'Traditional use' } ],
      grow: 'Steady moderate light; harvest at 2–3 inches; handles cooler rooms well.' },
    { id: 'kale', name: 'Kale', c: '#2F4A31', days: '8–12 days', flavor: 'Mild, nutty, no chew — kale without the kale argument.',
      nutrients: [
        { name: 'Beats mature kale by weight', why: 'Higher vitamin C, E and beta-carotene per gram than the bunch.', ev: 'Well established' },
        { name: 'Lutein for eyes', why: 'Carotenoids concentrate in the seedling stage.', ev: 'Emerging evidence' } ],
      grow: 'Fast, forgiving, dense trays; cut low and use stems too.' },
    { id: 'mustard', name: 'Mustard', c: '#7E5F1C', days: '6–10 days', flavor: 'Hot wasabi-adjacent bite — a seasoning green, not a salad base.',
      nutrients: [
        { name: 'Glucosinolate spice', why: 'The heat is the medicine — pungent isothiocyanates like its mature greens.', ev: 'Emerging evidence' },
        { name: 'Vitamin K dense', why: 'A small pinch carries real vitamin K.', ev: 'Well established' } ],
      grow: 'Fastest of the set; sow weekly for a rolling spice supply.' },
    { id: 'purplecabbage', name: 'Purple cabbage', c: '#7A3C4A', days: '8–12 days', flavor: 'Crisp, mild, violet-stemmed — color for the plate.',
      nutrients: [
        { name: 'Anthocyanins', why: 'The purple varieties out-carry green cabbage on antioxidant pigments.', ev: 'Well established' },
        { name: 'Vitamin C dense', why: 'Among the highest vitamin C of the brassica microgreens.', ev: 'Well established' } ],
      grow: 'Same protocol as broccoli; more light deepens the purple.' },
    { id: 'basil', name: 'Basil', c: '#2E6B7A', days: '14–21 days', flavor: 'Full basil aroma in a tender shoot — finish plates, don\u2019t cook it.',
      nutrients: [
        { name: 'Aromatic polyphenols', why: 'Rosmarinic acid and volatile oils peak in young leaves.', ev: 'Emerging evidence' },
        { name: 'Flavor as medicine', why: 'Herbs pull people to plants — flavor drives the habit.', ev: 'Traditional use' } ],
      grow: 'Slowest here: warm, bright, patient; mucilaginous seed needs gentle misting.' },
    { id: 'radish', name: 'Radish', c: '#8F4230', days: '6–10 days', flavor: 'Spicy, crisp, peppery bite — wakes up any bowl or sandwich.',
      nutrients: [
        { name: '~30% protein by dry weight', why: 'One of the most protein-dense shoots — a training green in disguise.', ev: 'Emerging evidence' },
        { name: 'Fast antioxidant crop', why: 'Vitamins C and E in the quickest tray of the set.', ev: 'Well established' } ],
      grow: 'No soak needed; fastest turnaround here — sow weekly for constant supply.' },
    { id: 'beet', name: 'Beet', c: '#7A3C4A', days: '10–14 days', flavor: 'Earthy-sweet with crimson stems — color and depth for plates.',
      nutrients: [
        { name: 'Betalain pigments', why: 'The red compounds studied for circulation and inflammation.', ev: 'Emerging evidence' },
        { name: 'Folate & nitrates', why: 'Carries mature beet\u2019s blood-flow chemistry into the shoot.', ev: 'Well established' } ],
      grow: 'Multi-germ seed — soak 8 hours; slower to shed hulls, mist them off.' },
    { id: 'cilantro', name: 'Cilantro', c: '#2F4A31', days: '14–21 days', flavor: 'Full cilantro aroma in a tender shoot — made for salsas and stews.',
      nutrients: [
        { name: 'Aromatic polyphenols', why: 'Carotenoids and volatile oils concentrate in young leaves.', ev: 'Emerging evidence' },
        { name: 'The bridge herb', why: 'Ties Caribbean, Latin and African plates together — flavor drives the habit.', ev: 'Traditional use' } ],
      grow: 'Split or crush the round seed husk for better germination; patient like basil.' },
    { id: 'chia', name: 'Chia', c: '#2E6B7A', days: '8–12 days', flavor: 'Mild, tender shoots with gel-coated stems — slips into any bowl.',
      nutrients: [
        { name: 'Mucilage fiber', why: 'The soluble gel soothes digestion and steadies blood sugar.', ev: 'Emerging evidence' },
        { name: 'Omega-3 ALA', why: 'Carries the seed\u2019s omega-3s into the living shoot.', ev: 'Well established' } ],
      grow: 'Do NOT soak — gel seed mats. Mist-sow thinly on the surface.' },
    { id: 'sesame', name: 'Sesame', c: '#7E5124', days: '10–14 days', flavor: 'Nutty, faintly bitter — a seasoning green for bowls and grains.',
      nutrients: [
        { name: 'Calcium & lignans', why: 'From the calcium-densest common seed in the pantry.', ev: 'Well established' },
        { name: 'Methionine complement', why: 'Rounds out legume-heavy plates\u2019 amino profile.', ev: 'Emerging evidence' } ],
      grow: 'Warm tray; use unhulled seed; harvest young before bitterness builds.' },
    { id: 'melon', name: 'Cantaloupe', c: '#7E5F1C', days: '8–12 days', flavor: 'Sweet melon-cucumber shoots — the dessert of the tray.',
      nutrients: [
        { name: 'Sweetness without the sugar load', why: 'A kid-friendly gateway green for reluctant eaters.', ev: 'Traditional use' },
        { name: 'Vitamin C + carotenoids', why: 'The melon line\u2019s pigments in seedling form.', ev: 'Emerging evidence' } ],
      grow: 'Loves heat; soak 4 hours; the favorite kids\u2019 starter tray.' },
    { id: 'lentil', name: 'Lentil', c: '#7E5124', days: '8–12 days', flavor: 'Mild, nutty crunch — the workhorse protein sprout-green.',
      nutrients: [
        { name: 'Legume protein leader', why: 'With pea, the densest cheap protein in the tray — and it regrows.', ev: 'Well established' },
        { name: 'Folate & iron', why: 'Blood-building minerals from any whole lentil in the pantry.', ev: 'Well established' } ],
      grow: 'Soak 8 hours; any whole (not split) lentil works; heaviest yield per dollar.' },
    { id: 'moringa', name: 'Moringa', c: '#2F4A31', days: '14–21 days', flavor: 'Peppery-green horseradish note — the tree of life in tray form.',
      nutrients: [
        { name: 'Iron, calcium & 46 antioxidants', why: 'The famous leaf profile, concentrated in the seedling.', ev: 'Emerging evidence' },
        { name: 'Complete leaf protein', why: 'Rare among trees — a true diaspora supplement crop.', ev: 'Emerging evidence' } ],
      grow: 'Warm rooms only (70°F+); crack the shell before sowing; slow but potent.' },
    { id: 'borage', name: 'Borage', c: '#2E6B7A', days: '12–16 days', flavor: 'Cool cucumber taste with a soft fuzzy leaf — the summer cooler.',
      nutrients: [
        { name: 'GLA omega-6', why: 'Rare in greens — studied for skin and inflammation support.', ev: 'Emerging evidence' },
        { name: 'Cooling hydrator', why: 'The traditional hot-day green for heavy field afternoons.', ev: 'Traditional use' } ],
      grow: 'Big seed, easy germination; harvest young before the fuzz toughens.' }
  ];

export const cropMeta = {
    pea: { bot: 'Pisum sativum', fam: 'Legume', tags: ['protein','kid'], carries: 'Protein · vitamin C', soak: 'Overnight, 8–12 hrs', yield: '10–14 oz / 10×20 tray', rate: '1½ cups seed', dark: '3 days weighted', cut: 'Above the lowest leaf — often regrows for a second cut', price: '$4.50',
      uses: ['Piled raw on any bowl or sandwich — the crunch does the work', 'Stirred into callaloo or light soup at the very end', 'Blended into a green sauce with lime, garlic and oil'], pair: 'Squeeze lime over them — vitamin C on top of vitamin C, and it keeps the sweetness bright.' },
    broccoli: { bot: 'Brassica oleracea', fam: 'Brassica', tags: ['detox'], carries: 'Sulforaphane', soak: 'No soak', yield: '6–8 oz / tray', rate: '3 tbsp seed', dark: '3 days weighted', cut: 'At the first true leaf, when compounds peak', price: '$5.00',
      uses: ['Vanishes into a smoothie — mild enough for kids', 'Handful over stewed beans off the heat', 'Chopped into a chickpea scramble at the finish'], pair: 'Keep it raw or barely warm — the sulforaphane enzyme dies above ~140°F.' },
    amaranth: { bot: 'Amaranthus spp.', fam: 'Amaranth', tags: ['mineral','protein'], carries: 'Iron · betalains', soak: 'No soak', yield: '4–5 oz / tray', rate: '2 tbsp seed', dark: '2 days, unweighted', cut: 'Gently with scissors — the magenta stems bruise', price: '$4.00',
      uses: ['Magenta finish on amaranth porridge — the plant twice', 'Over red red or any bean stew for color and iron', 'Folded into a beet salad with citrus'], pair: 'Iron here is non-heme — lime, tomato or pepper alongside multiplies what you absorb.' },
    collard: { bot: 'Brassica oleracea', fam: 'Brassica', tags: ['mineral'], carries: 'Calcium · vitamin K', soak: 'No soak', yield: '7–9 oz / tray', rate: '3 tbsp seed', dark: '3 days weighted', cut: 'At 2–3 inches; handles a cool room well', price: '$4.25',
      uses: ['Sunday-greens flavor without the long pot', 'Raw in a wrap with pickled onion and chickpea', 'Quick-wilted into millet with red palm oil'], pair: 'Fat carries the vitamin K — a little red palm or sesame oil doubles the uptake.' },
    kale: { bot: 'Brassica oleracea', fam: 'Brassica', tags: ['detox','mineral'], carries: 'Vitamin C · lutein', soak: 'No soak', yield: '6–8 oz / tray', rate: '3 tbsp seed', dark: '3 days weighted', cut: 'Low — use the stems too, they are tender', price: '$4.50',
      uses: ['Kale with no chew and no argument — raw by the handful', 'Blended into a green smoothie base', 'Under a hot grain bowl so it wilts on contact'], pair: 'Pair with sesame or pumpkin seed for the fat-soluble carotenoids.' },
    mustard: { bot: 'Brassica juncea', fam: 'Brassica', tags: ['herb'], carries: 'Glucosinolate heat', soak: 'No soak', yield: '5–6 oz / tray', rate: '2 tbsp seed', dark: '2 days weighted', cut: 'Young — the heat sharpens with age', price: '$3.75',
      uses: ['A pinch as seasoning, not a salad base', 'Quick-pickled in lime brine for a hot condiment', 'Over pepperpot to cut the richness'], pair: 'The bite is the medicine — eat it raw, heat destroys the isothiocyanates.' },
    purplecabbage: { bot: 'Brassica oleracea', fam: 'Brassica', tags: ['detox'], carries: 'Anthocyanins · vitamin C', soak: 'No soak', yield: '6–8 oz / tray', rate: '3 tbsp seed', dark: '3 days weighted', cut: 'When the violet stems stand up straight', price: '$4.75',
      uses: ['Color across a plate of rice and peas', 'Slaw-style with lime and a little oil', 'Over jerk mushrooms for crunch and contrast'], pair: 'More light deepens the purple — and the pigment is the antioxidant.' },
    basil: { bot: 'Ocimum basilicum', fam: 'Herb', tags: ['herb'], carries: 'Aromatic polyphenols', soak: 'No soak — mist only', yield: '3–4 oz / tray', rate: '2 tbsp seed', dark: 'None — surface sow into light', cut: 'Finish plates with it; never cook it', price: '$4.25',
      uses: ['Torn over tomato and salt as a whole meal', 'Green sauce with pea shoots and lime', 'Steeped into a hot-day cooler with hibiscus'], pair: 'The oils are volatile — add off the heat, at the last second.' },
    radish: { bot: 'Raphanus sativus', fam: 'Brassica', tags: ['protein'], carries: '~30% protein dry weight', soak: 'No soak', yield: '8–10 oz / tray', rate: '¼ cup seed', dark: '2 days weighted', cut: 'Day 6–8 — the fastest tray on the sill', price: '$3.50',
      uses: ['Peppery heat on a bean-and-grain bowl', 'In lime brine as a fast ferment', 'Sandwiches — it stands in for hot sauce'], pair: 'Sow a new tray every week; this one turns fastest and feeds the rotation.' },
    beet: { bot: 'Beta vulgaris', fam: 'Amaranth', tags: ['mineral'], carries: 'Betalains · nitrates', soak: '8 hrs', yield: '5–7 oz / tray', rate: '½ cup seed', dark: '3 days weighted', cut: 'Mist the hulls off before cutting', price: '$4.50',
      uses: ['Earthy crimson over any orange root dish', 'Pre-training with citrus for blood flow', 'Chopped into a lentil salad'], pair: 'Nitrates work best about 2 hours before you train.' },
    cilantro: { bot: 'Coriandrum sativum', fam: 'Herb', tags: ['herb'], carries: 'Carotenoids · volatile oils', soak: '4 hrs, husk cracked', yield: '3–4 oz / tray', rate: '⅓ cup seed', dark: '4 days weighted', cut: 'Patient crop — 14–21 days, worth the wait', price: '$4.00',
      uses: ['Salsa and pepper sauce, whole shoot and all', 'Over rice and peas by the fistful', 'Stirred into groundnut-style stew at the end'], pair: 'The bridge herb — it ties Caribbean, Latin and West African plates together.' },
    chia: { bot: 'Salvia hispanica', fam: 'Mint family', tags: ['detox','mineral'], carries: 'Mucilage fiber · ALA', soak: 'Never soak — gel seed', yield: '3–4 oz / tray', rate: '2 tbsp seed', dark: 'None — surface mist', cut: 'Snip at the base; gel-coated stems are fine to eat', price: '$4.00',
      uses: ['Into porridge where the gel belongs anyway', 'Over a blood-sugar plate to slow the rise', 'Blended into a hydrating cooler'], pair: 'The soluble gel steadies blood sugar — good on a starch-heavy plate.' },
    sesame: { allergen: 'sesame', bot: 'Sesamum indicum', fam: 'Sesame', tags: ['mineral'], carries: 'Calcium · lignans', soak: '4 hrs', yield: '5–6 oz / tray', rate: '½ cup unhulled seed', dark: '3 days weighted', cut: 'Young — bitterness builds after day 14', price: '$4.25',
      uses: ['Nutty seasoning green over millet or rice', 'With collard shoots for a calcium-forward salad', 'Toasted-oil dressing, shoots stirred in raw'], pair: 'Methionine here rounds out legume-heavy plates — beans and sesame complete each other.' },
    melon: { bot: 'Cucumis melo', fam: 'Cucurbit', tags: ['kid'], carries: 'Sweetness · carotenoids', soak: '4 hrs', yield: '4–6 oz / tray', rate: '½ cup seed', dark: '3 days weighted', cut: 'Sweetest young; loves a warm room', price: '$3.75',
      uses: ['The kids\u2019 tray — sweet enough to eat off the sill', 'Over cut fruit with lime and chili', 'Blended into a mild green smoothie'], pair: 'The gateway green for a reluctant eater — start a child here.' },
    lentil: { bot: 'Lens culinaris', fam: 'Legume', tags: ['protein','mineral'], carries: 'Protein · folate · iron', soak: '8 hrs', yield: '10–12 oz / tray', rate: '1 cup whole lentil', dark: '3 days weighted', cut: 'Cut high — many trays give a second flush', price: '$2.00',
      uses: ['Heaviest yield per dollar — bulk it into everything', 'Raw crunch on a hoppin\u2019 John bowl', 'Wilted into soup off the heat'], pair: 'Any whole (not split) lentil from the pantry works — no special seed needed.' },
    moringa: { bot: 'Moringa oleifera', fam: 'Moringa', tags: ['mineral','protein'], carries: 'Iron · calcium · antioxidants', soak: '24 hrs, shell cracked', yield: '3–4 oz / tray', rate: '30–40 seeds', dark: 'None — light from day one', cut: 'Slow but potent; 70°F+ rooms only', price: '$6.50',
      uses: ['A peppery pinch where you\u2019d use the powder', 'Into lentil soup at the finish', 'Over porridge with lime for iron uptake'], pair: 'Iron plus lime at the same meal; the shoots are peppery enough to season a whole pot.' },
    borage: { bot: 'Borago officinalis', fam: 'Borage', tags: ['herb'], carries: 'GLA omega-6', soak: '6 hrs', yield: '4–5 oz / tray', rate: '½ cup seed', dark: '3 days weighted', cut: 'Young, before the leaf fuzz toughens', price: '$4.75',
      uses: ['Cool cucumber note for a hot farm afternoon', 'In a hydrating cooler with mint', 'Over a heavy stew to lighten it'], pair: 'The traditional hot-day green — cooling, and rare in GLA.' }
  };

export const shroomRecipeDefs = [
    { id: 'stew', name: 'Stews & one-pots', c: '#8F4230', tint: '#F3E4DC',
      story: 'Mushrooms are the meat of the pot — seared first, stewed low, seasoned like the elders did.',
      items: [
        { name: 'Oyster-mushroom pepperpot', why: 'Torn oysters carry the deep pot — thyme, scotch bonnet, provision-ground roots.', ev: 'Traditional use' },
        { name: 'Callaloo & shiitake pot', why: 'Shiitake umami stands in for salt meat under the greens.', ev: 'Traditional use' },
        { name: 'Smoky maitake oxtail-style gravy', why: 'Maitake\u2019s ruffles hold a rich brown gravy over millet or rice.', ev: 'Traditional use' } ] },
    { id: 'grill', name: 'Grilled & jerked', c: '#7E5F1C', tint: '#FBF3E0',
      story: 'Fire and scotch bonnet — jerk technique translates whole to king oyster and portobello.',
      items: [
        { name: 'Jerk king-oyster skewers', why: 'Scored stems soak marinade like meat; char over real fire.', ev: 'Traditional use' },
        { name: 'Suya-spiced portobello', why: 'West African peanut-free suya rub on grilled caps.', ev: 'Traditional use' },
        { name: 'Lion\u2019s mane grill-press steak', why: 'Pressed under weight it sears into a crab-cake-tender steak.', ev: 'Traditional use' } ] },
    { id: 'broth', name: 'Broths & medicine', c: '#2F4A31', tint: '#E4EDDD',
      story: 'Sipping broths carry the functional compounds — beta-glucans extract into water.',
      items: [
        { name: 'Reishi-ginger sipping broth', why: 'Bitter reishi mellowed with ginger and date — an evening wind-down cup.', ev: 'Emerging evidence' },
        { name: 'Immune shiitake dashi', why: 'Kombu-free mushroom dashi as a base for every soup on this app.', ev: 'Emerging evidence' },
        { name: 'Lion\u2019s mane recovery broth', why: 'Studied for nerve-growth-factor support; sip after hard weeks.', ev: 'Emerging evidence' } ] },
    { id: 'everyday', name: 'Everyday protein', c: '#2E6B7A', tint: '#D9E7EC',
      story: 'Fast weeknight swaps — crumble, sauté, breakfast bowl.',
      items: [
        { name: 'Mushroom taco crumble', why: 'Pulsed cremini + spices sears into a nut-free taco filling.', ev: 'Traditional use' },
        { name: 'Oyster bacalao-style sauté', why: 'Peppers, onion and torn oysters — the saltfish frame, plant-based.', ev: 'Traditional use' },
        { name: 'Fonio & mushroom breakfast bowl', why: 'Savory grains and mushrooms front-load protein before farm work.', ev: 'Traditional use' } ] }
  ];

export const saladDefs = [
    { name: 'Iron Builder', need: 'Low energy · blood building', mix: 'Amaranth + beet + pea shoots, squeeze of lime — vitamin C unlocks the iron.', c: '#8F4230' },
    { name: 'Blood-Sugar Steady', need: 'Type 2 support · steady energy', mix: 'Chia + broccoli + radish shoots over beans — mucilage and sulforaphane slow the curve.', c: '#2E6B7A' },
    { name: 'Heart & Pressure', need: 'Blood pressure · circulation', mix: 'Beet + kale + cilantro shoots — nitrates and potassium over a millet base.', c: '#7A3C4A' },
    { name: 'Kid Starter', need: 'Small plates · picky eaters', mix: 'Cantaloupe + pea + cabbage shoots — sweet, crunchy, no argument.', c: '#7E5F1C' },
    { name: 'Detox Reset', need: 'Liver support · fresh start', mix: 'Broccoli + cilantro + radish shoots with lemon — sulforaphane and chlorophyll do the work.', c: '#2F4A31' },
    { name: 'Vitality & Desire', need: 'Circulation · energy', mix: 'Beet + basil shoots with a pumpkin-seed sprinkle — nitrates for flow, zinc for drive.', c: '#7A3C4A' },
    { name: 'Muscle Builder', need: 'Post-training · repair', mix: 'Lentil + pea + sesame shoots over grains — the legume protein stack.', c: '#8F3E2C', has: 'sesame', swapTo: 'drop the sesame shoots — lentil and pea carry it' },
    { name: 'Mama & Baby', need: 'Pre-partum · gentle building', mix: 'Moringa + kale + chia shoots — folate, calcium and iron; clear herbs with your midwife.', c: '#2F4A31' }
  ];

export const nervineDefs = [
    { id: 'nervines', name: 'Calming nervines', c: '#2E6B7A', tint: '#D9E7EC',
      story: 'Herbs that soften a wired nervous system — the maroon healers\u2019 evening pharmacy.',
      items: [
        { name: 'Blue vervain', why: 'The Caribbean nervine for wired-but-tired evenings; bitter is the point.', ev: 'Traditional use' },
        { name: 'Lemon balm', why: 'Softens racing thoughts without sedation; gentle enough for daily use.', ev: 'Emerging evidence' },
        { name: 'Passionflower', why: 'Studied for sleep onset — the cup for nights the mind won\u2019t land.', ev: 'Emerging evidence' } ] },
    { id: 'adaptogens', name: 'Adaptogens', c: '#2F4A31', tint: '#E4EDDD',
      story: 'Build stress capacity over weeks, not hours — daily allies for heavy seasons.',
      items: [
        { name: 'Tulsi (holy basil)', why: 'Modulates cortisol along the HPA stress axis; the daily anchor cup.', ev: 'Emerging evidence' },
        { name: 'Ashwagandha', why: 'Studied for stress and strength recovery — trials show lower cortisol and better training adaptation.', ev: 'Emerging evidence' },
        { name: 'Reishi', why: 'The calm mushroom — a bitter evening tonic for long-haul resilience.', ev: 'Emerging evidence' } ] },
    { id: 'emotional', name: 'Emotional release', c: '#7A3C4A', tint: '#F0DEE3',
      story: 'Plants held in ceremony for grief, anger and heartbreak — medicine as witness.',
      items: [
        { name: 'Motherwort', why: 'The lion-hearted herb for anxious, pounding hearts.', ev: 'Traditional use' },
        { name: 'Rose & hibiscus', why: 'Grief and heart-opening blends across diaspora traditions.', ev: 'Traditional use' },
        { name: 'Mugwort', why: 'Held in dreamwork traditions — an evening herb for processing.', ev: 'Traditional use' } ] },
    { id: 'practice', name: 'Daily practice', c: '#7E5F1C', tint: '#FBF3E0',
      story: 'Herbs work best inside a rhythm — pair each cup with breath, journaling or stillness.',
      items: [
        { name: 'Morning tulsi + sunlight', why: 'Anchor the cortisol wave with the cup and ten minutes outside.', ev: 'Traditional use' },
        { name: 'Evening nervine + long-exhale breath', why: 'The pairing lands deeper than either alone.', ev: 'Emerging evidence' },
        { name: 'Weekly check-in', why: 'Track mood against sleep and plates — patterns beat guesses.', ev: 'Traditional use' } ] }
  ];

export const waterMedDefs = [
    { id: 'daily', name: 'Daily rhythm', c: '#2E6B7A', tint: '#D9E7EC',
      story: 'Water before hunger, before caffeine, before the field — the first medicine is timing.',
      items: [
        { name: 'Sunrise pint before anything else', why: 'Rehydrate the night\u2019s losses before the day asks anything of you.', ev: 'Traditional use' },
        { name: 'Pre-meal glass, 30 minutes before plates', why: 'Primes digestion and steadies appetite.', ev: 'Emerging evidence' },
        { name: 'Sip through farm work', why: 'Steady sips beat chugging after — absorption keeps pace with sweat.', ev: 'Well established' } ] },
    { id: 'mineral', name: 'Mineral waters', c: '#2F4A31', tint: '#E4EDDD',
      story: 'Plain water carries minerals in — sea moss gels, pinches of salt and citrus turn it into an electrolyte tradition.',
      items: [
        { name: 'Sea moss water', why: 'The island mineral base — a spoon of gel dissolved in the morning bottle.', ev: 'Traditional use' },
        { name: 'Salt + lime field water', why: 'Sodium and vitamin C for heavy-sweat days, made from the pantry.', ev: 'Well established' },
        { name: 'Cucumber-borage cooler', why: 'Cooling summer infusion straight from the windowsill.', ev: 'Traditional use' } ] },
    { id: 'healing', name: 'Water as healing', c: '#7A3C4A', tint: '#F0DEE3',
      story: 'Cold rivers, warm baths, steam — water applied to the body is the oldest recovery tool.',
      items: [
        { name: 'Cold-water finish', why: '30–60 seconds cool at the end of a shower — studied for mood and recovery.', ev: 'Emerging evidence' },
        { name: 'Warm mineral baths', why: 'Sore-day soaks with salts — the elder remedy that still works.', ev: 'Traditional use' },
        { name: 'Steam & herbs', why: 'Respiratory steams with thyme or eucalyptus across diaspora households.', ev: 'Traditional use' } ] },
    { id: 'sacred', name: 'Sacred water', c: '#7E5F1C', tint: '#FBF3E0',
      story: 'Libations, river ceremonies, baptism — across the diaspora water marks passage and memory.',
      items: [
        { name: 'Libation', why: 'The first pour to the ancestors before the gathering drinks.', ev: 'Traditional use' },
        { name: 'River & ocean ceremony', why: 'Water as threshold — cleansing, grief work and renewal.', ev: 'Traditional use' },
        { name: 'Blessing the day\u2019s water', why: 'A moment of intention over the morning bottle — hydration as ritual.', ev: 'Traditional use' } ] }
  ];

export const fermDefs = [
    { id: 'why', name: 'Why ferment', c: '#2F4A31', tint: '#E4EDDD',
      story: 'Salt, time and patience — the oldest way to keep food alive and make it easier to digest.',
      items: [
        { name: 'Live cultures for the gut', why: 'Daily small servings beat occasional probiotic pills for microbiome diversity.', ev: 'Emerging evidence' },
        { name: 'Nutrients unlocked', why: 'Fermentation breaks down phytates, freeing iron and zinc from beans and grains.', ev: 'Well established' },
        { name: 'Preserving the harvest', why: 'A full tray or a market glut keeps for months in a jar instead of rotting.', ev: 'Traditional use' } ] },
    { id: 'greens', name: 'Ferment your greens', c: '#2F4A31', tint: '#E4EDDD',
      story: 'Spicy shoots and mature greens both pickle fast — the sill feeds the jar.',
      items: [
        { name: 'Quick-pickled radish & mustard shoots', why: 'Lime or vinegar brine, 24 hours on the counter, tangy heat for weeks.', ev: 'Traditional use' },
        { name: 'Collard & cabbage kraut', why: '2% salt by weight, pounded, submerged — 7–14 days to sour.', ev: 'Well established' },
        { name: 'Green sauce that sours', why: 'Cilantro-basil sauces left one day at room temp gain gentle fizz and depth.', ev: 'Emerging evidence' } ] },
    { id: 'mushroom', name: 'Mushroom ferments', c: '#665C4A', tint: '#EFEAE0',
      story: 'Fungi ferment fungi — umami on umami, the deepest savory in a plant kitchen.',
      items: [
        { name: 'Mushroom garum', why: 'Salted mushrooms broken down over weeks into a dark savory liquid — fish-sauce depth, no fish.', ev: 'Traditional use' },
        { name: 'Koji-cured mushroom "bacon"', why: 'Koji enzymes tenderize and sweeten thick oyster caps before searing.', ev: 'Emerging evidence' },
        { name: 'Miso-cultured broth base', why: 'Stir miso in off the heat — live cultures survive, flavor deepens.', ev: 'Well established', has: 'soy', swapTo: 'chickpea miso is soy-free' } ] },
    { id: 'drinks', name: 'Drinks & dairy', c: '#7E5F1C', tint: '#FBF3E0',
      story: 'Ginger beer, sorrel, plant yogurts — the drinks and dairies of the diaspora are ferments too.',
      items: [
        { name: 'Ginger bug & ginger beer', why: 'A wild starter of ginger, sugar and water — the ancestor of every soda.', ev: 'Traditional use' },
        { name: 'Cashew & coconut yogurt', why: 'Cultured overnight at ~110°F; thicker and cheaper than store tubs.', ev: 'Well established' },
        { name: 'Sorrel (hibiscus) with a slow fizz', why: 'Christmas sorrel left to bubble a day or two gains gentle carbonation.', ev: 'Traditional use' } ] }
  ];

export const dbDefs = [
    { id: 'plate', name: 'The plate', c: '#2E6B7A', tint: '#D9E7EC',
      story: 'Whole plants, in this order — fiber first, fat and protein alongside, refined starch last.',
      items: [
        { name: 'Beans at every lunch', why: 'Legume-forward plates flatten post-meal glucose for hours afterward.', ev: 'Well established' },
        { name: 'Intact grains over flours', why: 'Whole fonio, millet and brown rice raise glucose far less than the same grain milled.', ev: 'Well established' },
        { name: 'Greens before starch', why: 'Eating the salad first blunts the spike from the rice that follows.', ev: 'Emerging evidence' } ] },
    { id: 'reverse', name: 'Remission', c: '#2F4A31', tint: '#E4EDDD',
      story: 'Type 2 is often reversible — plant-based patterns have put it into remission in trial after trial.',
      items: [
        { name: 'Low-fat whole-plant diets', why: 'Repeatedly improve A1c, insulin sensitivity and medication needs within weeks.', ev: 'Well established' },
        { name: 'Weight is a lever, not the whole story', why: 'Glucose control improves even before much weight moves.', ev: 'Emerging evidence' },
        { name: 'Walk after you eat', why: 'Ten to fifteen minutes of walking clears glucose faster than sitting.', ev: 'Well established' } ] },
    { id: 'herbs', name: 'Herbs & kitchen allies', c: '#7A3C4A', tint: '#F0DEE3',
      story: 'Bitter melon, okra, cinnamon, fenugreek — the traditional blood-sugar shelf, honestly rated.',
      items: [
        { name: 'Bitter melon (cerasee)', why: 'Long diaspora use for sugar; small trials show modest glucose lowering.', ev: 'Traditional use' },
        { name: 'Fenugreek & cinnamon', why: 'Modest but real effects on fasting glucose — a seasoning, not a substitute.', ev: 'Emerging evidence' },
        { name: 'Okra and soluble fiber', why: 'Viscous fiber slows absorption; the slime is the medicine.', ev: 'Emerging evidence' } ] },
    { id: 'care', name: 'Working with care', c: '#8F4230', tint: '#F3E4DC',
      story: 'Changing how you eat changes how your medication works — plan it with your clinician.',
      items: [
        { name: 'Meds need adjusting fast', why: 'Insulin and sulfonylureas can cause lows once the diet changes — dose reviews matter.', ev: 'Well established' },
        { name: 'Test more, not less, at first', why: 'Two weeks of denser readings shows what each plate actually does to you.', ev: 'Well established' },
        { name: 'Bring the food log to the visit', why: 'Your logged plates and readings make the case better than memory does.', ev: 'Traditional use' } ] }
  ];

export const cerDefs = [
    { id: 'before', name: 'Before the meal', c: '#7E5F1C', tint: '#FBF3E0',
      story: 'A pause before the first bite changes the whole meal — the body eats better when it is not braced.',
      items: [
        { name: 'Three breaths and a name', why: 'Naming who grew it or cooked it shifts eating from fuel to relationship.', ev: 'Traditional use' },
        { name: 'Sit down, phone away', why: 'Distracted eating consistently means eating more and tasting less.', ev: 'Well established' },
        { name: 'Water and a clean table', why: 'A small set-up ritual signals the nervous system to switch into digest mode.', ev: 'Emerging evidence' } ] },
    { id: 'during', name: 'At the table', c: '#2F4A31', tint: '#E4EDDD',
      story: 'Eat slower than the hunger tells you to — the meal is also the medicine and the company.',
      items: [
        { name: 'Chew until it stops being food', why: 'Slower eating improves fullness signaling and eases digestion.', ev: 'Well established' },
        { name: 'Serve others first', why: 'Communal serving paces the meal and turns it into an act of care.', ev: 'Traditional use' },
        { name: 'Taste out loud', why: 'Naming flavors builds the palate that makes plant food crave-able.', ev: 'Traditional use' } ] },
    { id: 'after', name: 'After', c: '#2E6B7A', tint: '#D9E7EC',
      story: 'What happens in the twenty minutes after the plate shapes how the meal lands.',
      items: [
        { name: 'Walk, don\u2019t collapse', why: 'A short walk steadies glucose and helps digestion.', ev: 'Well established' },
        { name: 'Clean as gratitude', why: 'Closing the kitchen is the last movement of the ritual, not a chore left over.', ev: 'Traditional use' },
        { name: 'Log while it\u2019s warm', why: 'A one-line note beats a perfect entry written from memory tomorrow.', ev: 'Emerging evidence' } ] },
    { id: 'feast', name: 'Feast & fast', c: '#7A3C4A', tint: '#F0DEE3',
      story: 'Ancestral eating had seasons — days of plenty and days of rest, both on purpose.',
      items: [
        { name: 'Sunday abundance', why: 'One deliberate feast a week holds the family and kills the sense of deprivation.', ev: 'Traditional use' },
        { name: 'A lighter day after', why: 'Broth, greens and fruit days give the gut a rest without extremes.', ev: 'Emerging evidence' },
        { name: 'Fasting with elders\u2019 caution', why: 'Skip long fasts with diabetes medication, pregnancy or a history of disordered eating.', ev: 'Well established' } ] }
  ];

export const swapDefs = [
    { id: 'protein', name: 'Protein powder', c: '#8F4230', tint: '#F3E4DC',
      story: 'The scoop is convenience, not magic — whole foods hit the same targets for less.',
      items: [
        { name: 'Hemp + pea flour blend', why: '~20g per serving as a smoothie base, from bulk-bin staples.', ev: 'Well established' },
        { name: 'Lentil & pea microgreens over grains', why: 'Living protein from the sill on top of every bowl.', ev: 'Emerging evidence' },
        { name: 'Pumpkin-seed butter', why: 'The nut-free protein spread — zinc and iron included.', ev: 'Well established' } ] },
    { id: 'performance', name: 'Creatine & pre-workout', c: '#7E5F1C', tint: '#FBF3E0',
      story: 'Some supplements earn their place — know which, and what food covers the rest.',
      items: [
        { name: 'Creatine — the one worth buying', why: 'Plants carry almost none; vegan lifters see the biggest response.', ev: 'Well established' },
        { name: 'Beet + citrus pre-workout', why: 'Dietary nitrates outperform most proprietary blends.', ev: 'Well established' },
        { name: 'Honey water intra-workout', why: 'Fast carbs for long sessions, from the pantry.', ev: 'Emerging evidence' } ] },
    { id: 'micros', name: 'Multis & minerals', c: '#2F4A31', tint: '#E4EDDD',
      story: 'B12 and D are non-negotiable pills on a vegan plate — the rest is food.',
      items: [
        { name: 'B12 & vitamin D — supplement, don\u2019t improvise', why: 'No reliable whole-food vegan source; keep these two.', ev: 'Well established' },
        { name: 'Sea moss + moringa', why: 'The traditional mineral base in place of a multi.', ev: 'Traditional use' },
        { name: 'Iron from amaranth + vitamin C', why: 'Food-first iron, pills only when labs say so.', ev: 'Well established' } ] },
    { id: 'recovery', name: 'Recovery & gut', c: '#2E6B7A', tint: '#D9E7EC',
      story: 'Tart cherry, greens powders, probiotics — the tray and the pot already make them.',
      items: [
        { name: 'Microgreens over greens powder', why: 'Fresher, cheaper, and it\u2019s food, not dust.', ev: 'Emerging evidence' },
        { name: 'Ferments over probiotic pills', why: 'Quick-pickled shoots and plant yogurts feed the gut daily.', ev: 'Emerging evidence' },
        { name: 'Turmeric + pepper in the pot', why: 'Cook the anti-inflammatory in — skip the capsules.', ev: 'Well established' } ] }
  ];

export const kidSmoothies = [
    { name: 'Cocoa Banana Grow', p: '14g', kcal: '320', base: 'Banana, cacao, hemp seeds, oat milk, one date', c: '#8A5A3A', has: 'gluten', swapTo: 'swap oat milk for coconut milk' },
    { name: 'Mango Sunshine', p: '10g', kcal: '280', base: 'Mango, coconut milk, baobab, squeeze of lime', c: '#7E5F1C' },
    { name: 'Callaloo Sneak', p: '12g', kcal: '260', base: 'Pineapple, amaranth greens, half-scoop pea protein, coconut water', c: '#2F4A31' }
  ];

export const vitalityFoods = [
    { name: 'Pumpkin seeds', why: 'Zinc — the mineral of testosterone, ovulation and desire. A daily handful covers most of the need.', ev: 'Well established', c: '#7E5F1C' },
    { name: 'Cacao', why: 'Theobromine and flavanols open circulation and lift mood — the original diaspora heart-opener.', ev: 'Traditional use', c: '#8A5A3A' },
    { name: 'Maca root', why: 'Andean adaptogen studied for libido and steady energy. Start with small amounts.', ev: 'Emerging evidence', c: '#C9A85E' },
    { name: 'Watermelon', why: 'Citrulline (densest near the rind) feeds nitric oxide — nature\u2019s circulation support.', ev: 'Emerging evidence', c: '#8F4230' },
    { name: 'Sorrel / hibiscus', why: 'Cooling, vessel-friendly anthocyanins keep blood moving where it\u2019s wanted.', ev: 'Emerging evidence', c: '#7A3C4A' },
    { name: 'Damiana', why: 'A nervine of Mexican and Caribbean lineage, long brewed to relax the body toward desire.', ev: 'Traditional use', c: '#2F4A31' }
  ];

export const gardenMilestones = [
    { t: 'Baobab planted', s: 'Carry capacity up 18% across 8 weeks', c: '#7E5F1C' },
    { t: 'First full harvest', s: 'Four home-cooked Rooted Plates in one week', c: '#C97F63' },
    { t: 'Deep roots', s: 'Five nights of 7h+ sleep in a row', c: '#7FA8B5' }
  ];

export const cropProfiles = {
    cowpea: { name: 'Black-eyed Pea', botanical: 'Vigna unguiculata · cowpea · niébé · fèves', c1: '#C79A45', c2: '#A8783A',
      origin: 'Domesticated in West Africa over 3,000 years ago. Carried across the Atlantic through the transatlantic slave trade, cowpeas became central to Caribbean, Gullah Geechee, Creole and Southern US foodways — a crop of survival, resistance and celebration.',
      body: '~13g protein / cooked cup, lysine-rich, high folate & iron. Pair with vitamin C.',
      grow: 'Heat- & drought-tolerant; fixes nitrogen. Container-friendly. Save dried seed easily.',
      dishes: 'Akara (West African fritters), Hoppin\u2019 John (Lowcountry), red red (Ghana). Many are already plant-based; where pork seasons the pot, we label smoked paprika & mushroom as an adaptation, not a rewrite of history.',
      contested: 'Some lineages of specific dishes are debated across regions — where interpretation differs, the Atlas presents multiple perspectives rather than one claim.' },
    fonio: { name: 'Fonio', botanical: 'Digitaria exilis · acha · findi', c1: '#C9A85E', c2: '#B08F42',
      origin: 'One of Africa\u2019s oldest cultivated grains, grown in the Sahel for millennia and central to Manding and Dogon foodways. Long overlooked by global markets, it is now celebrated as a climate-resilient "ancient grain."',
      body: 'Gluten-free, quick-cooking; supplies methionine & cystine (amino acids scarce in legumes) — a natural partner to cowpeas for a complete profile.',
      grow: 'Thrives in poor, sandy soils with little water; matures in 6\u20138 weeks — among the fastest-maturing cereals.',
      dishes: 'Fonio jollof, porridge, and fonio-stuffed vegetables. Naturally vegan in most preparations.',
      contested: 'Marketed widely as a "superfood"; the Atlas centers Sahelian growers whose knowledge sustained it, and labels nutrient claims by evidence strength.' },
    callaloo: { name: 'Callaloo (Amaranth)', botanical: 'Amaranthus spp. · calalu · bhaji', c1: '#2F4A31', c2: '#2F4A31',
      origin: 'Amaranth greens and grain were staples across West Africa and the pre-colonial Americas. In the Caribbean, "callaloo" names both the dish and the greens; the word and plant travel differently island to island.',
      body: 'Leaves are rich in iron, calcium and vitamin C; the grain is a complete protein containing lysine. Microgreen form concentrates antioxidants further.',
      grow: 'Fast, heat-loving, cut-and-come-again greens. Grows well in containers and as microgreens on a windowsill.',
      dishes: 'Trinidad callaloo (with okra & coconut), Jamaican steamed callaloo, West African amaranth stews. Traditionally vegan-friendly.',
      contested: '"Callaloo" refers to different plants (amaranth vs. taro leaf) across islands — the Atlas notes both rather than flattening them.' },
    moringa: { name: 'Moringa', botanical: 'Moringa oleifera · drumstick tree · zogale', c1: '#2F4A31', c2: '#3C5A42',
      origin: 'Native to the foothills of the Himalayas and long naturalized across East and West Africa, where leaves, pods and seeds are food, medicine and fodder.',
      body: 'Dried leaf carries — gram for gram — up to 25× the iron of spinach, plus calcium, potassium and all nine essential amino acids. A potent recovery green in small amounts.',
      grow: 'Fast-growing tree; leaves harvestable within months. Grows in pots in warm climates; drought-hardy once established.',
      dishes: 'Zogale salad (Nigeria), moringa soups and leaf powders stirred into stews or smoothies.',
      contested: 'Sold globally as a supplement; the Atlas flags marketing claims and grounds use in traditional foodways.' },
    seamoss: { name: 'Sea Moss', botanical: 'Chondrus crispus / Gracilaria · Irish moss', c1: '#2E6B7A', c2: '#265863',
      origin: 'Harvested along Atlantic coasts from Ireland to the Caribbean. In Jamaica and across the diaspora, sea moss gel is a long-standing tonic and thickener.',
      body: 'A mucilaginous source of iodine and trace minerals; supports thyroid and joint comfort. Iodine varies widely — a little goes a long way.',
      grow: 'Wild-harvested or ocean-farmed on lines. Not home-growable; buy from reputable suppliers.',
      dishes: 'Sea moss gel in smoothies, callaloo rundown, punches and puddings.',
      contested: 'Health claims often outrun the evidence; the Atlas labels most benefits emerging or traditional, and warns that excess iodine can harm the thyroid.' },
    sorghum: { name: 'Sorghum', botanical: 'Sorghum bicolor · guinea corn · dawa', c1: '#8F4230', c2: '#8F3E2C',
      origin: 'Domesticated in northeastern Africa (Sudan/Ethiopia region) ~5,000\u20138,000 years ago and spread across the continent as a drought-proof staple before traveling worldwide.',
      body: 'Gluten-free whole grain with steady-release carbs and polyphenols; good farm-day fuel.',
      grow: 'Exceptionally heat- and drought-tolerant; a keystone climate-resilient cereal.',
      dishes: 'Tuwo, ogi/akamu porridge, injera blends, and sorghum flatbreads. Vegan in most forms.',
      contested: 'Regional origin points are debated among archaeobotanists; the Atlas presents the range rather than one date.' },
    okra: { name: 'Okra', botanical: 'Abelmoschus esculentus · gumbo · quiabo', c1: '#2F4A31', c2: '#587A4C',
      origin: 'Likely domesticated in Ethiopia/West Africa; the word "gumbo" derives from Bantu ki-ngombo. Okra crossed the Atlantic with enslaved Africans and anchors Creole and Gullah cooking.',
      body: 'Fiber- and mucilage-rich (gut support), with vitamin C, K and folate; low calorie.',
      grow: 'Loves heat; productive in containers. Harvest pods young and often.',
      dishes: 'Gumbo, okra & callaloo, soup okra, bhindi. Vegan versions skip the seafood/meat and lean on smoked spice.',
      contested: 'Okra vs. filé as gumbo thickener marks distinct regional lineages — both are noted.' },
    oyster: { name: 'Oyster Mushroom', botanical: 'Pleurotus ostreatus', c1: '#665C4A', c2: '#574E3F',
      origin: 'Cultivated worldwide and foraged across temperate forests. A cornerstone of the functional-fungi tradition and a reliable meat texture in plant-based diaspora cooking.',
      body: 'Provides protein, B-vitamins, and beta-glucans; UV-exposed mushrooms supply vitamin D. A satisfying savory, umami base.',
      grow: 'Among the easiest fungi to grow at home on straw, coffee grounds or logs.',
      dishes: 'Torn and browned for "pepper steak," jerk oyster mushrooms, and stews.',
      contested: 'Medicinal-mushroom claims vary; the Atlas separates culinary use from clinical evidence.' },
    peagreens: { name: 'Pea Microgreens', botanical: 'Pisum sativum (shoots)', c1: '#3A5540', c2: '#2C4231',
      origin: 'A windowsill crop rather than a field one — part of a living tradition of growing your own food for sovereignty and freshness, adaptable from Connecticut winters to Zanzibar humidity.',
      body: 'High in plant protein and BCAAs, ~397 mg/100g amino acids, plus carotenoids and chlorophyll for recovery and oxygen delivery. Pair with amaranth microgreens for a complete profile.',
      grow: '7\u201314 days from seed on a tray; ~$1 per ounce; no yard needed. A daily watering ritual that builds discipline.',
      dishes: 'Fold raw into finished plates, smoothies and salads to preserve living enzymes.',
      contested: 'Microgreen nutrient figures vary by variety and method; the Atlas cites ranges, not single numbers.' },
    sweetpotato: { name: 'Sweet Potato', botanical: 'Ipomoea batatas · batata · nyami', c1: '#B5622E', c2: '#97501F',
      origin: 'Domesticated in the Americas and carried across the Pacific and Atlantic; embraced across African and Caribbean foodways where it often stands in for the true African yam.',
      body: 'Beta-carotene, potassium and slow carbs; excellent pre-training and farm-day fuel. Leaves are edible and iron-rich.',
      grow: 'Grows from slips in warm soil; vigorous ground cover. Stores for months after curing.',
      dishes: 'Roasted, in stews, candied (vegan), and sweet-potato greens sautéed with pepper.',
      contested: 'Often conflated with yam in US English; the Atlas distinguishes Ipomoea from true Dioscorea yam.' },
    plantain: { name: 'Plantain', botanical: 'Musa spp. · plátano · dodo', c1: '#7A5A1E', c2: '#553D12',
      origin: 'Domesticated in Southeast Asia and central to Central/West African and Caribbean diets for over a thousand years — a daily energy staple across the humid tropics.',
      body: 'Starchy, potassium-rich energy; green = lower sugar/higher resistant starch, ripe = fast carbs for training days.',
      grow: 'A tropical perennial; needs warmth and water. Not suited to cold climates outdoors.',
      dishes: 'Dodo (fried ripe), boiled green plantain, mofongo, tostones, plantain porridge.',
      contested: 'Plantain vs. cooking banana naming varies regionally; both are noted.' },
    coconut: { name: 'Coconut', botanical: 'Cocos nucifera · kokonut · coco', c1: '#665C4A', c2: '#574E3F',
      origin: 'Spread across the tropics by ocean and trade, the coconut became a keystone of Afro-diasporic cooking — from Bahia\u2019s "Coconut Coast" and Garifuna rice-and-beans to Gullah Geechee coconut-molasses sweets and Trinidadian toolum.',
      body: 'Fat carries vitamins A, D, E and K; the water is a potassium electrolyte; fresh flesh adds fiber. Whole-food forms and moderation — see Coconut Foodways.',
      grow: 'Coastal tropics only: salt-tolerant, sun-hungry, 6–10 years to first fruit. Not a windowsill crop — buy from island growers.',
      dishes: 'Rundown (Jamaica), oil-down (Grenada), rice and peas, coconut bake, sorrel with coconut cream — the pot starts with milk pressed from grated flesh.',
      contested: 'Health-food and saturated-fat framings disagree — the Atlas presents both traditional practice and mainstream heart guidance rather than one claim.' },
    baobab: { name: 'Baobab', botanical: 'Adansonia digitata · "tree of life"', c1: '#665C4A', c2: '#574E3F',
      origin: 'From the savannas of mainland Africa; the "upside-down tree" whose dried fruit pulp has fed and healed communities across the Sahel and East Africa for millennia.',
      body: 'The tangy fruit pulp offers around 10× the vitamin C of oranges, plus potassium, calcium and prebiotic fiber — the vitamin C sharply boosts iron uptake from a plant plate.',
      grow: 'A long-lived savanna tree, not home-growable in most climates; fruit pulp is imported dried as a powder.',
      dishes: 'Stirred into porridge, water and smoothies; used to sour stews and drinks across West and East Africa.',
      contested: 'Marketed globally as a "superfood"; the Atlas centers the African communities whose stewardship sustained the tree and labels nutrient claims by evidence strength.' },
    teff: { name: 'Teff', botanical: 'Eragrostis tef', c1: '#8A5A3A', c2: '#6E452C',
      origin: 'Domesticated in the Ethiopian highlands thousands of years ago; the foundation of injera and a pillar of Ethiopian and Eritrean food sovereignty.',
      body: 'Tiny gluten-free grain notably high in iron and calcium for a cereal, plus resistant starch for gut health.',
      grow: 'Tolerates both drought and waterlogging; extremely small seed. Mostly farm-grown.',
      dishes: 'Injera (naturally vegan fermented flatbread), porridge, and teff flatbreads.',
      contested: 'Export restrictions have aimed to protect Ethiopian growers; the Atlas notes the food-sovereignty context.' }
  };

export const detected = [
    { key: 'bep', name: 'Black-eyed peas', portion: '1 cup', pct: 94,
      n: [200, 13.3, 36, 0.9, 11, 1.0], m: [20, 4, 15, 22, 14, 0, 88, 1],
      alt: { name: 'Pigeon peas', portion: '1 cup', n: [209, 11.4, 39, 0.6, 11.3, 0.85], m: [18, 7, 15, 19, 18, 0, 92, 0] } },
    { key: 'collard', name: 'Collard greens', portion: '1½ cups', pct: 88,
      n: [63, 5, 11, 1, 8, 0.25], m: [6, 27, 4, 9, 7, 0, 30, 58],
      alt: { name: 'Mustard greens', portion: '1½ cups', n: [54, 4.5, 9, 0.9, 6, 0.22], m: [7, 20, 3, 6, 6, 0, 26, 71] } },
    { key: 'rice', name: 'Brown rice', portion: '¾ cup', pct: 81,
      n: [162, 3.8, 34, 1.3, 2.6, 0.3], m: [4, 1, 8, 14, 4, 0, 2, 0],
      alt: { name: 'Fonio', portion: '¾ cup', n: [140, 3.2, 29, 0.8, 1.5, 0.28], m: [6, 1, 7, 12, 3, 0, 3, 0] } },
    { key: 'plantain', name: 'Fried plantain', portion: '½ medium', pct: 72,
      n: [105, 0.6, 20, 3, 1.6, 0.05], m: [2, 0, 1, 6, 10, 0, 4, 11],
      alt: { name: 'Boiled plantain', portion: '½ medium', n: [68, 0.6, 18, 0.1, 1.6, 0.05], m: [2, 0, 1, 6, 10, 0, 4, 11] } }
  ];

export const hiddenList = [
    { key: 'oil', name: 'Red palm oil', amt: '1 tbsp', n: [120, 0, 0, 13.6, 0, 0], m: [2, 0, 0, 0, 0, 0, 0, 0] },
    { key: 'broth', name: 'Vegetable broth', amt: '½ cup', n: [8, 0.4, 1, 0, 0, 0.02], m: [1, 1, 0, 1, 3, 0, 1, 0] },
    { key: 'salt', name: 'Salt', amt: '½ tsp', n: [0, 0, 0, 0, 0, 0], m: [0, 0, 0, 0, 0, 0, 0, 0] },
    { key: 'seasoning', name: 'Scotch bonnet + seasoning', amt: '1 tsp', n: [6, 0.3, 1, 0.1, 0.4, 0.01], m: [1, 0, 0, 1, 1, 0, 2, 4] },
    { key: 'coconut', name: 'Coconut milk', amt: '¼ cup', n: [110, 1.1, 2.6, 11.4, 1, 0.06], m: [8, 0, 3, 9, 6, 0, 2, 1] },
    { key: 'nutbutter', name: 'Nut / seed butter', amt: '1 tbsp', n: [95, 3.5, 3.5, 8, 1, 0.25], m: [4, 2, 6, 11, 2, 0, 3, 0] }
  ];

export const microDefs = [
    { key: 'iron', label: 'Iron' }, { key: 'cal', label: 'Calcium' }, { key: 'zinc', label: 'Zinc' },
    { key: 'mag', label: 'Magnesium' }, { key: 'pot', label: 'Potassium' }, { key: 'b12', label: 'B12' },
    { key: 'fol', label: 'Folate' }, { key: 'vitc', label: 'Vitamin C' }
  ];

export const macros = [
    { label: 'Calories', value: '640', unit: 'kcal' },
    { label: 'Protein', value: '34', unit: 'g' },
    { label: 'Carbs', value: '78', unit: 'g' },
    { label: 'Fat', value: '19', unit: 'g' },
    { label: 'Fiber', value: '16', unit: 'g' },
    { label: 'Leucine', value: '2.4', unit: 'g' }
  ];

export const micros = [
    { label: 'Iron', pct: 38, note: 'below your target', col: '#8F4230' },
    { label: 'Calcium', pct: 22, note: 'partial', col: '#C79A45' },
    { label: 'Zinc', pct: 41, note: 'good', col: '#2F4A31' },
    { label: 'Magnesium', pct: 58, note: 'good', col: '#2F4A31' },
    { label: 'Potassium', pct: 47, note: 'good', col: '#2F4A31' },
    { label: 'B12', pct: 12, note: 'fortify / supplement', col: '#8F4230' },
    { label: 'Folate', pct: 63, note: 'strong', col: '#2F4A31' },
    { label: 'Vitamin C', pct: 71, note: 'aids iron uptake', col: '#2F4A31' }
  ];

export const plateDefs = [
    { id: 'jollof', name: 'Jollof-spiced millet, black-eyed peas & oyster mushrooms', trad: ['westafrican'], modes: ['muscle','recovery','farm'], has: [], p: '29g', time: '28 min', cost: '$2.10', c: '#8F4230' },
    { id: 'redred', name: 'Red red — black-eyed pea stew with fried plantain', trad: ['westafrican'], modes: ['muscle','budget','farm'], has: [], p: '36g', time: '35 min', cost: '$1.60', c: '#8F3E2C' },
    { id: 'rundown', name: 'Callaloo rundown with coconut & sea moss', trad: ['caribbean'], modes: ['recovery','calm','iron'], has: [], p: '25g', time: '30 min', cost: '$2.40', c: '#3C5A42' },
    { id: 'hoppin', name: 'Hoppin\u2019 John bowl with Carolina Gold rice', trad: ['gullah'], modes: ['muscle','farm','budget'], has: [], p: '34g', time: '40 min', cost: '$1.90', c: '#7E5124' },
    { id: 'groundnut', name: 'Groundnut stew with teff flatbread', trad: ['westafrican'], modes: ['muscle','hike','farm'], has: ['nuts'], p: '32g', time: '45 min', cost: '$2.20', c: '#7E5F1C' },
    { id: 'tofu', name: 'Braised tofu, sesame collards & sorghum', trad: ['westafrican','afrolatin'], modes: ['muscle','recovery'], has: ['soy','sesame'], p: '38g', time: '25 min', cost: '$1.80', c: '#2F4A31' },
    { id: 'creole', name: 'Creole red beans, okra & wheat dumplings', trad: ['creole'], modes: ['budget','farm'], has: ['gluten'], p: '30g', time: '50 min', cost: '$1.50', c: '#8F4230' },
    { id: 'posole', name: 'Three Sisters posole — corn, beans & squash', trad: ['indigenous'], modes: ['bloodsugar','farm','budget'], has: [], p: '26g', time: '40 min', cost: '$1.70', c: '#2F4A31' },
    { id: 'porridge', name: 'Amaranth porridge with pea shoots & lime', trad: ['indigenous','afrolatin'], modes: ['recovery','calm','iron','bloodsugar'], has: [], p: '22g', time: '15 min', cost: '$1.20', c: '#7A3C4A' },
    { id: 'moringa', name: 'Moringa & lentil soup with plantain', trad: ['westafrican','caribbean'], modes: ['iron','recovery','budget','bloodsugar'], has: [], p: '30g', time: '35 min', cost: '$1.40', c: '#2F4A31' },
    { id: 'trailwrap', name: 'Trail wraps — chickpea, collards & pickled onion', trad: ['gullah','creole'], modes: ['hike','budget'], has: ['gluten'], p: '29g', time: '20 min', cost: '$1.75', c: '#7E5F1C' },
    { id: 'akara', name: 'Akara fritters with peanut pepper sauce', trad: ['westafrican'], modes: ['muscle','hike'], has: ['nuts'], p: '27g', time: '30 min', cost: '$1.55', c: '#7E5124' },
    { id: 'fonioporridge', name: 'Fonio porridge with plantain & hemp', trad: ['westafrican'], modes: ['farm','recovery'], has: [], p: '24g', time: '15 min', cost: '$1.30', c: '#7E5F1C', planOnly: true },
    { id: 'sorghumbowl', name: 'Sorghum bowl, oyster mushrooms & sesame drizzle', trad: ['westafrican'], modes: ['farm','muscle'], has: ['sesame'], p: '31g', time: '30 min', cost: '$1.85', c: '#7E5124', planOnly: true },
    { id: 'sorghumbowlsf', name: 'Sorghum bowl, oyster mushrooms & pumpkin-seed drizzle', trad: ['westafrican'], modes: ['farm','muscle'], has: [], p: '31g', time: '30 min', cost: '$1.85', c: '#7E5124', planOnly: true },
    { id: 'bepcallaloo', name: 'Black-eyed pea & callaloo plate', trad: ['caribbean','westafrican'], modes: ['muscle','iron'], has: [], p: '38g', time: '30 min', cost: '$1.70', c: '#3C5A42', planOnly: true },
    { id: 'scramble', name: 'Broccoli-microgreen chickpea scramble', trad: [], modes: ['recovery','bloodsugar'], has: [], p: '26g', time: '15 min', cost: '$1.25', c: '#2F4A31', planOnly: true },
    { id: 'okrastew', name: 'Okra & butter bean stew with wild rice', trad: ['gullah'], modes: ['recovery','budget'], has: [], p: '28g', time: '40 min', cost: '$1.80', c: '#2F4A31', planOnly: true },
    { id: 'seamoss', name: 'Sea moss smoothie with sunflower-seed butter', trad: ['caribbean'], modes: ['iron','recovery'], has: [], p: '21g', time: '8 min', cost: '$1.95', c: '#2E6B7A', planOnly: true },
    { id: 'tofugreens', name: 'Tofu-braised greens & Carolina Gold rice', trad: ['gullah'], modes: ['muscle'], has: ['soy'], p: '34g', time: '35 min', cost: '$1.85', c: '#2F4A31', planOnly: true },
    { id: 'butterbeangreens', name: 'Butter-bean braised greens & Carolina Gold rice', trad: ['gullah'], modes: ['muscle'], has: [], p: '34g', time: '35 min', cost: '$1.75', c: '#2F4A31', planOnly: true },
    { id: 'milletbars', name: 'Millet & date bars with hibiscus cooler', trad: ['westafrican'], modes: ['hike'], has: [], p: '18g', time: '25 min', cost: '$0.95', c: '#7E5F1C', planOnly: true },
    { id: 'cassava', name: 'Cassava & pigeon pea one-pot', trad: ['caribbean'], modes: ['farm','budget'], has: [], p: '33g', time: '45 min', cost: '$1.45', c: '#7E5124', planOnly: true },
    { id: 'cornmeal', name: 'Cornmeal porridge with stewed fruit', trad: ['caribbean'], modes: ['calm','budget'], has: [], p: '16g', time: '20 min', cost: '$0.85', c: '#7E5F1C', planOnly: true },
    { id: 'familyplate', name: 'Family plate: yam, greens & beans', trad: ['westafrican'], modes: ['budget','farm'], has: [], p: '30g', time: '45 min', cost: '$1.55', c: '#7E5124', planOnly: true },
    { id: 'lightsoup', name: 'Light soup with microgreen salad', trad: ['westafrican'], modes: ['calm','recovery'], has: [], p: '22g', time: '30 min', cost: '$1.40', c: '#8F4230', planOnly: true },
    { id: 'groundnutsf', name: 'Sunflower-seed groundnut-style stew', trad: ['westafrican'], modes: ['muscle','hike'], has: [], p: '32g', time: '45 min', cost: '$2.00', c: '#7E5F1C', planOnly: true },
    { id: 'trailbowl', name: 'Trail bowls — chickpea, collards & pickled onion', trad: ['gullah','creole'], modes: ['hike','budget'], has: [], p: '29g', time: '20 min', cost: '$1.65', c: '#7E5F1C', planOnly: true }
  ];

export const plateRecipes = {
    jollof: { eyebrow: 'High-protein muscle · one pot', kcal: '610', iron: '7.9mg', fiber: '14g', serves: '4 servings',
      grid: { protein: 'black-eyed peas', grain: 'millet', green: 'callaloo', fat: 'red palm oil', finish: 'pea microgreens + pickled scotch bonnet' },
      ing: '1 cup millet · 1½ cups cooked black-eyed peas · 200g oyster mushrooms · 2 cups callaloo · 1 onion · 3 tomatoes · 1 red pepper · 1 tbsp red palm oil · scotch bonnet · thyme, ginger, garlic',
      steps: ['Blend tomatoes, pepper and onion; simmer with palm oil, ginger and thyme until deepened.', 'Stir in millet and stock; cover and cook 18 min until tender.', 'Fold in peas, mushrooms and callaloo for the last 6 min. Finish with microgreens off the heat.'],
      swaps: [{ t: 'millet → fonio or sorghum', why: 'both cook faster and stay gluten-free' }, { t: 'red palm oil → olive oil', why: 'if palm is hard to source locally' }, { t: 'callaloo → collards or amaranth greens', why: 'whatever the season gives you' }],
      attrib: 'Jollof is a West African rice tradition (Senegambia\u2019s thieboudienne lineage); this is a labeled vegan, millet-based adaptation — not the original dish.' },
    redred: { eyebrow: 'Budget muscle · Ghanaian one-pot', kcal: '680', iron: '8.4mg', fiber: '18g', serves: '4 servings',
      grid: { protein: 'black-eyed peas', grain: 'ripe plantain', green: 'spinach or kontomire', fat: 'red palm oil', finish: 'shito pepper + lime' },
      ing: '2 cups cooked black-eyed peas · 3 ripe plantains · 1 onion · 3 tomatoes · 2 tbsp red palm oil · 2 cups spinach · ginger, garlic, chili · salt',
      steps: ['Fry sliced plantain in a little oil until caramelized; set aside on paper.', 'Build the pepper base — onion, tomato, ginger, chili in palm oil — until the oil separates.', 'Fold in the peas and greens, simmer 10 min, serve alongside the plantain.'],
      swaps: [{ t: 'palm oil → groundnut or olive oil', why: 'flavour shifts, the dish still holds' }, { t: 'spinach → kontomire or collards', why: 'traditional greens where you can get them' }, { t: 'dried peas soaked overnight', why: 'cheapest protein in the whole plan' }],
      attrib: 'Red red is Ghanaian home cooking — named for palm oil and tomato. Naturally vegan as commonly cooked.' },
    rundown: { eyebrow: 'Recovery · Caribbean rundown', kcal: '520', iron: '6.1mg', fiber: '11g', serves: '4 servings',
      grid: { protein: 'butter beans', grain: 'boiled yam or dumpling', green: 'callaloo', fat: 'coconut milk', finish: 'sea moss gel + thyme' },
      ing: '2 cups callaloo · 1 can coconut milk · 1½ cups butter beans · 2 tbsp sea moss gel · 1 onion · scotch bonnet · thyme · allspice · yam or green banana',
      steps: ['Reduce the coconut milk until it "runs down" and the oil separates — 12 min, low heat.', 'Add onion, thyme, allspice and whole scotch bonnet; simmer 5 min.', 'Fold in callaloo and beans; stir the sea moss gel in off the heat.'],
      swaps: [{ t: 'callaloo → spinach or taro leaf', why: 'cook taro leaf fully, never raw' }, { t: 'butter beans → pigeon peas', why: 'firmer bite, same protein' }, { t: 'sea moss → skip it', why: 'the dish stands without the mineral boost' }],
      attrib: 'Rundown (run-dun) is Jamaican and Eastern Caribbean technique — coconut milk reduced to oil. Vegan by construction here.' },
    hoppin: { eyebrow: 'Farm fuel · Gullah Geechee', kcal: '640', iron: '7.2mg', fiber: '16g', serves: '4 servings',
      grid: { protein: 'field peas', grain: 'Carolina Gold rice', green: 'braised collards', fat: 'benne or olive oil', finish: 'pepper vinegar' },
      ing: '1½ cups Carolina Gold rice · 2 cups cooked field peas · 4 cups collards · 1 onion · 2 celery ribs · smoked paprika · bay · pepper vinegar',
      steps: ['Sweat onion and celery, add peas with their liquor, bay and paprika.', 'Cook the rice in the pea broth so it takes the colour and salt.', 'Braise collards separately with pepper vinegar; serve alongside, not stirred in.'],
      swaps: [{ t: 'field peas → black-eyed or sea island red peas', why: 'all are the same tradition' }, { t: 'Carolina Gold → any long grain', why: 'heirloom rice is a treat, not a requirement' }, { t: 'smoked paprika for smoke', why: 'replaces the ham hock cleanly' }],
      attrib: 'Hoppin\u2019 John is Gullah Geechee — rice and field peas from West African rice culture. This is a vegan adaptation.' },
    groundnut: { eyebrow: 'Muscle · West African stew', kcal: '720', iron: '6.8mg', fiber: '13g', serves: '4 servings',
      grid: { protein: 'peanut + chickpea', grain: 'teff flatbread', green: 'amaranth greens', fat: 'groundnut paste', finish: 'lime + chili oil' },
      ing: '¾ cup natural peanut butter · 1½ cups chickpeas · 2 sweet potatoes · 3 tomatoes · 1 onion · 3 cups amaranth greens · ginger · chili · 2 cups teff flour for flats',
      steps: ['Loosen the peanut paste with hot stock so it never splits in the pot.', 'Simmer onion, tomato, ginger and sweet potato 20 min; stir the paste through.', 'Add chickpeas and greens for the last 8 min; griddle teff flats to serve.'],
      swaps: [{ t: 'peanut → sunflower-seed butter', why: 'the nut-free version, same body' }, { t: 'teff flats → fonio or rice', why: 'skip the griddle entirely' }, { t: 'sweet potato → cassava', why: 'starchier, holds longer on the trail' }],
      attrib: 'Groundnut stew (maafe / domoda) spans Senegal to Ghana. Contains peanut unless swapped.' },
    tofu: { eyebrow: 'Muscle · 25-minute weeknight', kcal: '590', iron: '7.4mg', fiber: '12g', serves: '4 servings',
      grid: { protein: 'firm tofu', grain: 'sorghum', green: 'sesame collards', fat: 'toasted sesame oil', finish: 'scallion + chili crisp' },
      ing: '2 blocks firm tofu · 1½ cups sorghum · 6 cups collards · 2 tbsp toasted sesame oil · tamari · garlic, ginger · scallion · chili',
      steps: ['Press and sear the tofu hard on two sides before anything else touches the pan.', 'Braise it 8 min in tamari, ginger and garlic while the sorghum cooks.', 'Wilt the collards in sesame oil at the end; pile everything over the grain.'],
      swaps: [{ t: 'tofu → butter beans or chickpea flour cake', why: 'the soy-free build' }, { t: 'tamari → coconut aminos', why: 'soy-free, slightly sweeter' }, { t: 'sesame oil → pumpkin-seed oil', why: 'sesame-free with the same nuttiness' }],
      attrib: 'A diaspora weeknight plate rather than a heritage dish — soy and sesame technique meeting Southern greens.' },
    creole: { eyebrow: 'Budget · Louisiana Creole', kcal: '660', iron: '7.6mg', fiber: '19g', serves: '5 servings',
      grid: { protein: 'red beans', grain: 'wheat dumplings', green: 'okra', fat: 'olive oil roux', finish: 'filé + hot sauce' },
      ing: '2 cups dried red beans · 1 lb okra · 1 onion · 2 celery ribs · 1 green pepper · 2 cups flour for dumplings · thyme, bay, cayenne · filé powder',
      steps: ['Soak beans overnight, then simmer with the trinity, bay and thyme until creamy — 45 min.', 'Cut okra in and cook 10 min so it thickens the pot rather than sliming it.', 'Drop dumplings on top, cover, steam 12 min. Filé off the heat, never boiled.'],
      swaps: [{ t: 'wheat dumplings → rice or cornmeal drop dumplings', why: 'the gluten-free route' }, { t: 'okra → skip, thicken with filé', why: 'if okra texture is not for you' }, { t: 'canned beans in a rush', why: 'cuts 40 minutes off' }],
      attrib: 'Creole red beans belong to Monday washday in New Orleans. Vegan here; contains wheat unless swapped.' },
    posole: { eyebrow: 'Blood-sugar steady · Three Sisters', kcal: '540', iron: '5.4mg', fiber: '17g', serves: '4 servings',
      grid: { protein: 'tepary or pinto beans', grain: 'nixtamalized hominy', green: 'squash greens', fat: 'pepita cream', finish: 'lime + oregano' },
      ing: '2 cups cooked hominy · 1½ cups beans · 1 winter squash · 1 onion · 2 dried guajillo chiles · Mexican oregano · lime · pumpkin seeds',
      steps: ['Toast and soak the chiles, then blend into a smooth red base.', 'Simmer hominy, beans and cubed squash in the chile broth 25 min.', 'Blend pumpkin seeds with a ladle of broth for a cream; swirl in at the table with lime.'],
      swaps: [{ t: 'hominy → whole corn kernels', why: 'nixtamal is traditional but not always stocked' }, { t: 'tepary → pinto or bayo beans', why: 'tepary if you can find Indigenous growers' }, { t: 'squash greens → chard', why: 'use the vines if you grow squash' }],
      attrib: 'Corn, beans and squash — the Three Sisters — is Indigenous agriculture and cuisine across the Americas. Grown together, eaten together.' },
    porridge: { eyebrow: 'Recovery · 15-minute breakfast', kcal: '420', iron: '6.6mg', fiber: '10g', serves: '2 servings',
      grid: { protein: 'amaranth + hemp', grain: 'amaranth grain', green: 'pea shoots', fat: 'coconut milk', finish: 'lime + honey or date syrup' },
      ing: '1 cup amaranth grain · 2 cups water · ½ cup coconut milk · 3 tbsp hemp seeds · handful pea shoots · lime · cinnamon · date syrup',
      steps: ['Simmer amaranth in water 12 min, stirring — it thickens fast at the end.', 'Stir in coconut milk and hemp off the heat so the protein stays intact.', 'Top with pea shoots and a squeeze of lime; the vitamin C is what unlocks the iron.'],
      swaps: [{ t: 'amaranth → fonio or teff', why: 'same 12-minute porridge, different grain' }, { t: 'coconut milk → fortified plant milk', why: 'adds the B12 and calcium' }, { t: 'date syrup instead of honey', why: 'the fully plant-based sweetener' }],
      attrib: 'Amaranth is an Indigenous American grain carried through Afro-Latin kitchens as atole and porridge.' },
    moringa: { eyebrow: 'High-iron · one pot', kcal: '480', iron: '9.1mg', fiber: '15g', serves: '4 servings',
      grid: { protein: 'red lentils', grain: 'plantain or rice', green: 'moringa leaf', fat: 'coconut oil', finish: 'lime + toasted cumin' },
      ing: '1½ cups red lentils · 2 cups moringa leaves (or 2 tbsp powder) · 2 plantains · 1 onion · garlic, ginger, cumin · 1 tbsp coconut oil · lime',
      steps: ['Cook lentils with turmeric and ginger until collapsing — about 20 min.', 'Bloom cumin and garlic in coconut oil, pour into the pot.', 'Stir moringa in for the final 2 minutes only; heat past that costs you the vitamin C.'],
      swaps: [{ t: 'moringa leaf → powder off the heat', why: 'what most of us actually have' }, { t: 'red lentils → pigeon peas', why: 'longer cook, deeper flavour' }, { t: 'plantain → rice or teff flat', why: 'whatever carbs are in the house' }],
      attrib: 'Moringa is a West African and South Asian staple tree. Iron-forward and paired with lime here for absorption.' },
    trailwrap: { eyebrow: 'Trail fuel · 20 minutes', kcal: '520', iron: '5.8mg', fiber: '14g', serves: '4 wraps',
      grid: { protein: 'smashed chickpeas', grain: 'wheat wraps', green: 'raw collard ribbons', fat: 'tahini or sunflower dressing', finish: 'pickled red onion' },
      ing: '2 cups chickpeas · 4 wraps · 4 collard leaves · ¼ cup tahini or sunflower butter · lemon · 1 red onion quick-pickled in vinegar · smoked paprika',
      steps: ['Quick-pickle the onion in vinegar and salt while you work — 15 min is enough.', 'Smash chickpeas with the dressing, lemon and paprika; keep it coarse.', 'Roll with collard ribbons and pickle; wrap tight in paper so it survives the pack.'],
      swaps: [{ t: 'wraps → a bowl, no wrap', why: 'the gluten-free version travels in a jar' }, { t: 'tahini → sunflower butter', why: 'sesame-free and cheaper' }, { t: 'collards → cabbage', why: 'holds up even better in a backpack' }],
      attrib: 'A trail adaptation of Southern collard-and-bean plates — built for a five-mile ridge, not a table.' },
    akara: { eyebrow: 'Muscle · fritters & sauce', kcal: '560', iron: '6.4mg', fiber: '12g', serves: '4 servings',
      grid: { protein: 'peeled black-eyed peas', grain: 'served with pap or bread', green: 'side of spinach', fat: 'frying oil + peanut', finish: 'peanut pepper sauce' },
      ing: '2 cups dried black-eyed peas (peeled) · 1 onion · 1 chili · oil for frying · ½ cup peanuts · 2 tomatoes · ginger · salt',
      steps: ['Soak and rub the peas to slip the skins, then blend to a stiff, airy batter with onion and chili.', 'Whip the batter by hand 2 min — the air is what makes akara light.', 'Fry spoonfuls until deep gold; blend the peanut pepper sauce to serve alongside.'],
      swaps: [{ t: 'peanut sauce → pumpkin-seed sauce', why: 'the nut-free version' }, { t: 'shallow-fry or air-fry', why: 'less oil, close enough texture' }, { t: 'canned peas won\u2019t work', why: 'the batter needs raw soaked peas' }],
      attrib: 'Akara is Yoruba — carried to Brazil as acarajé and to the Carolinas as bean fritters. Vegan as traditionally made.' },
    fonioporridge: { eyebrow: 'Farm morning · 15 minutes', kcal: '520', iron: '5.2mg', fiber: '9g', serves: '2 servings',
      grid: { protein: 'hemp seeds', grain: 'fonio', green: 'none — fruit-forward', fat: 'coconut milk', finish: 'ripe plantain + cinnamon' },
      ing: '1 cup fonio · 2 cups water · 1 ripe plantain · 3 tbsp hemp seeds · ½ cup coconut milk · cinnamon · pinch salt · date syrup',
      steps: ['Rinse fonio twice, then steam it 5 min — it needs almost nothing.', 'Caramelize sliced plantain in a dry pan while the grain rests.', 'Fold coconut milk and hemp through off the heat; top with plantain and cinnamon.'],
      swaps: [{ t: 'fonio → millet or teff', why: 'all three cook in under 15 minutes' }, { t: 'hemp → pumpkin seeds', why: 'cheaper, similar protein' }, { t: 'fortified plant milk', why: 'adds the B12 and calcium' }],
      attrib: 'Fonio is the ancient West African grain of the Sahel — drought-tolerant and quick-cooking.' },
    sorghumbowl: { eyebrow: 'Farm fuel · seared mushrooms', kcal: '600', iron: '6.4mg', fiber: '13g', serves: '4 servings',
      grid: { protein: 'oyster mushrooms + hemp', grain: 'sorghum', green: 'braised collards', fat: 'toasted sesame oil', finish: 'sesame drizzle + scallion' },
      ing: '1½ cups sorghum · 400g oyster mushrooms · 4 cups collards · 2 tbsp toasted sesame oil · 2 tbsp tahini · lemon · garlic · scallion',
      steps: ['Simmer sorghum 45 min ahead, or use a batch from Saturday.', 'Tear mushrooms and sear them hard and dry before any oil goes in.', 'Thin tahini with lemon and water; drizzle over grain, greens and mushrooms.'],
      swaps: [{ t: 'tahini → pumpkin-seed butter', why: 'the sesame-free drizzle' }, { t: 'sorghum → millet or brown rice', why: 'faster on a weeknight' }, { t: 'any firm mushroom works', why: 'king oyster and maitake sear the same way' }],
      attrib: 'Sorghum is a West African staple grain; the searing method is technique, not tradition.' },
    sorghumbowlsf: { eyebrow: 'Farm fuel · sesame-free', kcal: '600', iron: '6.4mg', fiber: '13g', serves: '4 servings',
      grid: { protein: 'oyster mushrooms + hemp', grain: 'sorghum', green: 'braised collards', fat: 'pumpkin-seed oil', finish: 'pumpkin-seed drizzle + scallion' },
      ing: '1½ cups sorghum · 400g oyster mushrooms · 4 cups collards · 2 tbsp pumpkin-seed butter · 1 tbsp pumpkin-seed oil · lemon · garlic · scallion',
      steps: ['Simmer sorghum 45 min ahead, or use a batch from Saturday.', 'Tear mushrooms and sear them hard and dry before any oil goes in.', 'Loosen pumpkin-seed butter with lemon and water; drizzle over everything.'],
      swaps: [{ t: 'pumpkin-seed → sunflower-seed butter', why: 'both are seed-based and nut-free' }, { t: 'sorghum → millet or brown rice', why: 'faster on a weeknight' }, { t: 'add a handful of microgreens', why: 'raw finish, more vitamin C' }],
      attrib: 'The sesame-free build of the same bowl — seeds carry the drizzle instead of tahini.' },
    bepcallaloo: { eyebrow: 'Muscle · 30-minute plate', kcal: '580', iron: '8.8mg', fiber: '17g', serves: '4 servings',
      grid: { protein: 'black-eyed peas', grain: 'boiled yam or rice', green: 'callaloo', fat: 'red palm oil', finish: 'lime + pepper sauce' },
      ing: '2 cups cooked black-eyed peas · 4 cups callaloo · 1 onion · 2 tomatoes · 1 tbsp red palm oil · thyme · scotch bonnet · lime · yam',
      steps: ['Steam the callaloo just until it collapses — 4 min, no longer.', 'Sweat onion, tomato and thyme in palm oil; add peas and their liquor.', 'Plate greens and peas side by side with yam; finish with lime, not salt.'],
      swaps: [{ t: 'callaloo → amaranth or spinach', why: 'same family, same cooking time' }, { t: 'peas → pigeon peas', why: 'firmer, more Caribbean' }, { t: 'yam → rice or plantain', why: 'whatever carb is cheapest that week' }],
      attrib: 'Peas-and-greens plates run from West Africa through the Caribbean; lime for iron uptake is the practical part.' },
    scramble: { eyebrow: 'Recovery breakfast · 15 minutes', kcal: '380', iron: '4.6mg', fiber: '8g', serves: '2 servings',
      grid: { protein: 'chickpea flour', grain: 'toast or fonio', green: 'broccoli microgreens', fat: 'olive oil', finish: 'black salt + microgreens' },
      ing: '1 cup chickpea flour · 1 cup water · handful broccoli microgreens · 1 tomato · ½ onion · turmeric · kala namak (black salt) · olive oil',
      steps: ['Whisk chickpea flour with water, turmeric and black salt; rest 5 min.', 'Cook onion and tomato soft, pour the batter in and scramble like eggs.', 'Kill the heat, then fold microgreens through — sulforaphane does not survive the pan.'],
      swaps: [{ t: 'chickpea flour → mung bean flour', why: 'softer set, same protein' }, { t: 'black salt is the egg flavour', why: 'skip it and it is simply savoury' }, { t: 'any microgreen works raw', why: 'radish adds heat, pea adds sweetness' }],
      attrib: 'A plant-based scramble built on besan technique from South Asian kitchens.' },
    okrastew: { eyebrow: 'Recovery · anti-inflammatory pot', kcal: '540', iron: '6.0mg', fiber: '16g', serves: '4 servings',
      grid: { protein: 'butter beans', grain: 'wild rice', green: 'okra + collards', fat: 'olive oil', finish: 'lemon + thyme' },
      ing: '1 lb okra · 2 cups butter beans · 1 cup wild rice · 1 onion · 3 tomatoes · 2 cups collards · thyme · garlic · turmeric · lemon',
      steps: ['Cook wild rice separately — it takes 40 min and refuses to hurry.', 'Sear okra whole in a hot dry pan first; that is what stops the slime.', 'Simmer with tomato, beans and greens 15 min; lemon at the very end.'],
      swaps: [{ t: 'wild rice → brown rice', why: 'a third of the price' }, { t: 'butter beans → lima or cannellini', why: 'same creamy body' }, { t: 'frozen okra is fine', why: 'sear it straight from frozen' }],
      attrib: 'Okra crossed the Atlantic with enslaved West Africans; it thickens pots from Louisiana to Lagos.' },
    seamoss: { eyebrow: 'Iron & minerals · 8 minutes', kcal: '420', iron: '5.6mg', fiber: '9g', serves: '1 serving',
      grid: { protein: 'sunflower-seed butter + hemp', grain: 'oats optional', green: 'moringa powder', fat: 'sunflower-seed butter', finish: 'lime + mango' },
      ing: '2 tbsp sea moss gel · 1 cup mango · 2 tbsp sunflower-seed butter · 1 tbsp hemp · 1 tsp moringa · 1 cup fortified plant milk · lime · ice',
      steps: ['Blend the sea moss gel with the milk first so it disperses smoothly.', 'Add fruit, seed butter, hemp and moringa; blend 45 seconds.', 'Finish with lime — the vitamin C is what carries the iron in.'],
      swaps: [{ t: 'sunflower butter → pumpkin-seed butter', why: 'both nut-free' }, { t: 'skip the oats', why: 'the gluten-free version' }, { t: 'frozen mango over fresh', why: 'thicker, cheaper, always in season' }],
      attrib: 'Sea moss (Irish moss / Chondrus crispus) is Caribbean sea-vegetable practice — a mineral tonic, not a cure.' },
    tofugreens: { eyebrow: 'Muscle · Lowcountry weeknight', kcal: '600', iron: '7.0mg', fiber: '12g', serves: '4 servings',
      grid: { protein: 'firm tofu', grain: 'Carolina Gold rice', green: 'braised collards', fat: 'olive oil', finish: 'pepper vinegar' },
      ing: '2 blocks firm tofu · 1½ cups Carolina Gold rice · 6 cups collards · tamari · smoked paprika · garlic · onion · pepper vinegar',
      steps: ['Press the tofu, cube it, sear all sides before adding any liquid.', 'Braise it in tamari, paprika and garlic while the rice steams.', 'Braise collards with pepper vinegar; serve the three parts side by side.'],
      swaps: [{ t: 'tofu → butter beans', why: 'the soy-free build of this plate' }, { t: 'tamari → coconut aminos', why: 'soy-free, a touch sweeter' }, { t: 'any long-grain rice', why: 'Carolina Gold is a treat, not a rule' }],
      attrib: 'Rice-and-greens is Gullah Geechee foundation; the tofu is a modern protein standing in for the pot meat.' },
    butterbeangreens: { eyebrow: 'Muscle · soy-free build', kcal: '580', iron: '7.4mg', fiber: '15g', serves: '4 servings',
      grid: { protein: 'butter beans', grain: 'Carolina Gold rice', green: 'braised collards', fat: 'olive oil', finish: 'pepper vinegar' },
      ing: '3 cups cooked butter beans · 1½ cups Carolina Gold rice · 6 cups collards · smoked paprika · garlic · onion · bay · pepper vinegar',
      steps: ['Braise the beans with onion, bay and paprika until the liquor thickens.', 'Steam the rice in some of that bean liquor for colour and salt.', 'Braise collards with pepper vinegar; plate all three together.'],
      swaps: [{ t: 'butter beans → field or crowder peas', why: 'the same Lowcountry tradition' }, { t: 'smoked paprika for the smoke', why: 'replaces ham hock cleanly' }, { t: 'add microgreens raw', why: 'a fresh finish on a long-braised plate' }],
      attrib: 'The soy-free version of the same Gullah Geechee plate — beans carry it instead of tofu.' },
    milletbars: { eyebrow: 'Trail fuel · make ahead', kcal: '340', iron: '3.8mg', fiber: '7g', serves: '8 bars',
      grid: { protein: 'hemp + pumpkin seeds', grain: 'toasted millet', green: 'none — pocket food', fat: 'coconut oil', finish: 'dates + hibiscus cooler' },
      ing: '2 cups cooked millet · 1 cup dates · ½ cup pumpkin seeds · ¼ cup hemp · 2 tbsp coconut oil · cinnamon · salt · dried hibiscus for the cooler',
      steps: ['Toast the millet dry until it smells nutty, then cool it.', 'Blitz dates to a paste, work in millet, seeds, oil and salt.', 'Press hard into a tray, chill 30 min, cut into eight. Steep hibiscus cold for the flask.'],
      swaps: [{ t: 'millet → puffed sorghum', why: 'lighter bar, less chew' }, { t: 'dates → dried mango or figs', why: 'whatever the market has' }, { t: 'seed butter to bind', why: 'if the dates are dry and refuse' }],
      attrib: 'Pocket food in the tradition of kola-and-grain travelling rations; hibiscus is zobo/sorrel cooled.' },
    cassava: { eyebrow: 'Farm day · budget one-pot', kcal: '620', iron: '6.2mg', fiber: '15g', serves: '5 servings',
      grid: { protein: 'pigeon peas', grain: 'cassava', green: 'callaloo or spinach', fat: 'coconut milk', finish: 'thyme + scotch bonnet' },
      ing: '2 lb cassava · 2 cups pigeon peas · 1 can coconut milk · 1 onion · 2 tomatoes · 3 cups callaloo · thyme · allspice · scotch bonnet',
      steps: ['Peel cassava thickly and boil 20 min — it must be fully cooked, never raw.', 'Build coconut, onion, tomato and thyme into a gravy; add peas.', 'Fold cassava and greens in, simmer 10 min so the roots take the gravy.'],
      swaps: [{ t: 'cassava → yam or sweet potato', why: 'same role, no peeling battle' }, { t: 'pigeon peas → black-eyed peas', why: 'cheaper dried, cooks faster' }, { t: 'coconut milk → light coconut', why: 'cuts a third of the calories' }],
      attrib: 'Cassava is Indigenous to the Americas and central to Caribbean and West African cooking. Always cook it through.' },
    cornmeal: { eyebrow: 'Rest day · gentle breakfast', kcal: '380', iron: '3.4mg', fiber: '6g', serves: '3 servings',
      grid: { protein: 'hemp + fortified milk', grain: 'cornmeal', green: 'none — fruit-forward', fat: 'coconut milk', finish: 'stewed fruit + nutmeg' },
      ing: '1 cup fine cornmeal · 3 cups fortified plant milk · 2 tbsp hemp · 1 cup mixed fruit · cinnamon, nutmeg, bay · date syrup · pinch salt',
      steps: ['Whisk cornmeal into cold milk before heating — that is how you dodge lumps.', 'Cook 12 min on low with cinnamon, nutmeg and a bay leaf, stirring.', 'Stew the fruit separately with a splash of water; spoon over with hemp.'],
      swaps: [{ t: 'cornmeal → hominy grits', why: 'coarser, more Southern' }, { t: 'stewed fruit → whatever is bruised', why: 'this is the dish for tired fruit' }, { t: 'fortified milk matters here', why: 'it is the B12 in a rest-day plate' }],
      attrib: 'Cornmeal porridge is Jamaican and Southern breakfast alike — cornmeal from Indigenous American maize.' },
    familyplate: { eyebrow: 'Sunday table · feeds five', kcal: '560', iron: '7.8mg', fiber: '18g', serves: '5 servings',
      grid: { protein: 'brown beans', grain: 'boiled yam', green: 'stewed greens', fat: 'red palm oil', finish: 'pepper sauce + lime' },
      ing: '2 lb yam · 3 cups cooked brown beans · 6 cups greens (collard, amaranth or kale) · 1 onion · 2 tomatoes · 1 tbsp red palm oil · thyme · pepper sauce',
      steps: ['Boil yam in salted water until a knife slides through, 20 min.', 'Stew beans with onion, tomato and thyme until the liquor is thick.', 'Wilt greens in palm oil last so they stay bright; serve all three on one platter.'],
      swaps: [{ t: 'yam → sweet potato or plantain', why: 'cheaper and always available' }, { t: 'beans → whatever is in the pantry', why: 'the plate is a pattern, not a recipe' }, { t: 'palm oil → olive oil', why: 'if sourcing is a problem' }],
      attrib: 'The starch-greens-beans platter is the diaspora Sunday plate from Accra to the Carolinas.' },
    lightsoup: { eyebrow: 'Calm evening · 30 minutes', kcal: '340', iron: '4.4mg', fiber: '9g', serves: '4 servings',
      grid: { protein: 'butter beans', grain: 'none — broth-led', green: 'microgreen salad alongside', fat: 'a little olive oil', finish: 'lime + ginger' },
      ing: '1 onion · 3 tomatoes · 2-inch ginger · 2 cups butter beans · 4 cups vegetable stock · scotch bonnet · thyme · mixed microgreens · lime',
      steps: ['Blend onion, tomato and ginger raw, then boil hard 10 min — that is light soup.', 'Add beans, stock, whole pepper and thyme; simmer 15 min uncovered.', 'Cut the salad fresh from the tray and dress it with lime while the soup rests.'],
      swaps: [{ t: 'butter beans → mushrooms', why: 'lighter still, deeper savour' }, { t: 'add a little fonio', why: 'if you want it to hold you longer' }, { t: 'any tender microgreen', why: 'pea, cilantro or basil all work' }],
      attrib: 'Ghanaian light soup is the convalescent pot — thin, hot, ginger-forward. Vegan here with beans for body.' },
    groundnutsf: { eyebrow: 'Muscle · nut-free groundnut style', kcal: '700', iron: '6.6mg', fiber: '13g', serves: '4 servings',
      grid: { protein: 'sunflower butter + chickpeas', grain: 'teff flatbread or rice', green: 'amaranth greens', fat: 'sunflower-seed butter', finish: 'lime + chili oil' },
      ing: '¾ cup sunflower-seed butter · 1½ cups chickpeas · 2 sweet potatoes · 3 tomatoes · 1 onion · 3 cups amaranth greens · ginger · chili · lime',
      steps: ['Loosen the sunflower butter with hot stock before it goes near the pot.', 'Simmer onion, tomato, ginger and sweet potato 20 min; stir the paste through.', 'Add chickpeas and greens for the last 8 min; lime at the table.'],
      swaps: [{ t: 'sunflower → pumpkin-seed butter', why: 'both nut-free, pumpkin is greener' }, { t: 'teff flats → rice or fonio', why: 'skip the griddle' }, { t: 'sweet potato → cassava', why: 'starchier, better for the trail' }],
      attrib: 'The nut-free build of West African groundnut stew (maafe) — seed butter carries the body instead of peanut.' },
    trailbowl: { eyebrow: 'Trail fuel · no wrap', kcal: '480', iron: '5.6mg', fiber: '15g', serves: '4 bowls',
      grid: { protein: 'smashed chickpeas', grain: 'cooked millet in the jar', green: 'raw collard ribbons', fat: 'sunflower dressing', finish: 'pickled red onion' },
      ing: '2 cups chickpeas · 2 cups cooked millet · 4 collard leaves · ¼ cup sunflower-seed butter · lemon · 1 red onion quick-pickled · smoked paprika',
      steps: ['Quick-pickle the onion in vinegar and salt — 15 minutes is enough.', 'Smash chickpeas coarsely with the dressing, lemon and paprika.', 'Layer millet, greens, chickpeas and pickle into jars so it survives the pack.'],
      swaps: [{ t: 'millet → rice or quinoa', why: 'whatever batch is in the fridge' }, { t: 'sunflower → tahini', why: 'if sesame is fine for you' }, { t: 'collards → cabbage', why: 'the sturdiest green for a backpack' }],
      attrib: 'The gluten-free build of the trail wrap — a jar instead of bread, same Southern greens-and-bean logic.' }
  };

export const allergenMap = { soyfree: 'soy', nutfree: 'nuts', glutenfree: 'gluten', sesamefree: 'sesame' };

export const allergenWord = { soy: 'soy', nuts: 'nuts', gluten: 'wheat', sesame: 'sesame' };

export const freeWord = { soy: 'soy', nuts: 'nut', gluten: 'gluten', sesame: 'sesame' };

export const goalScreenMap = { muscle: 'farm', strength: 'farm', farm: 'farm', hike: 'hike', mobility: 'breath', elder: 'elder', recomp: 'trainPlan', postpartum: 'pregnancy', return: 'elder', vitality: 'ancestral' };

export const teaFlagWord = { pregnant: 'not while pregnant or nursing', bp: 'may interact with blood-pressure medication', thinners: 'may affect clotting' };

export const goalTeaMap = { muscle: 'recovery', strength: 'recovery', farm: 'energy', hike: 'energy', mobility: 'calm', elder: 'iron', recomp: 'recovery', postpartum: 'iron', return: 'calm', vitality: 'energy' };

export const goalTeaLabel = { muscle: 'Training recovery', strength: 'Training recovery', farm: 'Morning fire', hike: 'Morning fire', mobility: 'Evening cool-down', elder: 'Mineral builders', recomp: 'Training recovery', postpartum: 'Mineral builders', return: 'Evening cool-down', vitality: 'Morning fire' };

export const goalScreenLabel = { muscle: 'Farm-Strength: Push & Carry', strength: 'Farm-Strength: Push & Carry', farm: 'Farm-Strength: Push & Carry', hike: 'Ridge hiking plan', mobility: 'Breathwork & mobility reset', elder: 'Elder functional strength', recomp: 'Periodized weekly plan', postpartum: 'Postpartum rebuilding flow', return: 'Elder & return-to-movement', vitality: 'Ancestral movement' };

/*
  What each session screen actually offers, keyed by route.

  Every value here is copied verbatim from the SessionButton already on that
  screen - nothing is invented. `trainPlan` and `pregnancy` are absent on purpose:
  they are plan and guidance screens with no single session behind them, so there
  is no duration to state and callers must render without one rather than make a
  number up.
*/
export const sessionMeta: Record<string, string> = {
    farm: '42 min · loaded carry',
    mobility: '12 min · joint-friendly',
    breath: '14 min · long exhale',
    elder: '24 min · fall-safe',
    ancestral: '28 min · barefoot',
    hike: '5.2 mi · 1,180 ft climb',
  };


export const recipeModes = [
    { id: 'muscle', label: 'High-protein muscle' },
    { id: 'recovery', label: 'Recovery meal' },
    { id: 'farm', label: 'Long farm-work day' },
    { id: 'iron', label: 'High-iron' },
    { id: 'bloodsugar', label: 'Blood-sugar steady' },
    { id: 'calm', label: 'Calm & recovery' },
    { id: 'budget', label: 'Budget survival' },
    { id: 'hike', label: 'Hiking fuel' }
  ];

export const places = [
    { name: 'Yam & Yarrow Co-op Market', type: 'Food cooperative · hot bar · Black-owned', dist: '0.4 mi', tags: ['Locally grown', 'Hot bar'], c: '#2F4A31', rest: 'coop', top: '42%', left: '42%' },
    { name: "Ital Roots Kitchen", type: 'Afro-Caribbean · plant-forward', dist: '0.9 mi', tags: ['Vegan menu', 'High-protein'], c: '#8F4230', rest: 'ital', top: '60%', left: '60%' },
    { name: 'Abuela Verde', type: 'Afro-Latin · family-run', dist: '1.3 mi', tags: ['Vegan-marked', 'Pickup'], c: '#7E5F1C', rest: 'abuela', top: '32%', left: '66%' },
    { name: 'Three Sisters Farm Stand', type: 'Indigenous-owned farm', dist: '2.1 mi', tags: ['Seasonal', 'Organic'], c: '#665C4A', dest: 'community', top: '24%', left: '26%' },
    { name: 'Kelp & Coir Sea-Veg Supply', type: 'Sea-vegetable supplier', dist: '3.4 mi', tags: ['Sea moss', 'Bulk'], c: '#2E6B7A', dest: 'forage', top: '72%', left: '22%' },
    { name: 'Sankofa Community Garden', type: 'Community garden · CSA', dist: '0.6 mi', tags: ['Free plots', 'Microgreens'], c: '#2F4A31', dest: 'community', top: '56%', left: '38%' }
  ];

export const egressLog = [
    { when: 'Today · 6:41a', dest: 'Rooted vault (encrypted)', c: '#2F4A31', payload: '2 lab PDFs · sealed with your passphrase — we cannot read them',
      why: 'turned on Health Vault backup' },
    { when: 'Yesterday · 8:12p', dest: 'Council inference (cloud)', c: '#2E6B7A', payload: 'One question + your sleep hours and last two plates. Held 4s, never written to disk.',
      why: 'asked the Council about tomorrow\u2019s training' },
    { when: 'Aug 28 · 9:05a', dest: 'Dr. Amara Boateng', c: '#7E5124', payload: 'Iron & B12 panel, single-use link — expired after one open',
      why: 'shared a record from the Vault' },
    { when: 'Aug 27 · 7:30p', dest: 'Sankofa Community Garden', c: '#8F4230', payload: 'Your alias and an RSVP. No health data attached.',
      why: 'signed up for the cook-along' }
  ];

export const dsNeverList = [
    { label: 'Ad networks & trackers' },
    { label: 'Data brokers' },
    { label: 'Insurers & employers' },
    { label: 'Model training corpora' }
  ];

export const trainWeek = [
    { day: 'Mon', label: 'Farm day', focus: 'Field labor as training', dur: '3 hr', accent: '#2F4A31', done: true,
      blocks: [ { name: 'Beds & compost turning', meta: 'Hinge + rotation · work capacity', route: 'exercise', ev: 'trad' }, { name: 'Loaded water carries', meta: 'Grip & trunk · 6 × 200 ft', route: 'exercise', ev: 'well' } ] },
    { day: 'Tue', label: 'Push & carry', focus: 'Strength', dur: '42 min', accent: '#2E6B7A', done: true, today: true,
      blocks: [ { name: 'Farm-Strength: Push & Carry', meta: '6 movements · progressive load', route: 'farm', ev: 'well' }, { name: 'Long-exhale cooldown', meta: '4 min · nervous-system reset', route: 'breath', ev: 'emerging' } ] },
    { day: 'Wed', label: 'Recovery', focus: 'Mobility + breath', dur: '25 min', accent: '#7E5124',
      blocks: [ { name: 'Joint mobility flow', meta: '12 min · joint-friendly', route: 'move', ev: 'well' }, { name: 'Nature immersion walk', meta: 'Zone 1 · outdoors', route: 'hike', ev: 'emerging' } ] },
    { day: 'Thu', label: 'Hike prep', focus: 'Aerobic base', dur: '35 min', accent: '#C79A45',
      blocks: [ { name: 'Zone-2 conditioning', meta: 'Conversational pace', route: 'hike', ev: 'well' }, { name: 'Ancestral movement warm-up', meta: 'Rhythm & hips', route: 'ancestral', ev: 'trad' } ] },
    { day: 'Fri', label: 'Ridge hike', focus: 'Endurance', dur: '2:10', accent: '#2F4A31',
      blocks: [ { name: 'Ridge Trail — 5 miles', meta: '860 ft gain · Zone 2', route: 'hike', ev: 'well' } ] },
    { day: 'Sat', label: 'Community', focus: 'Play & culture', dur: '60 min', accent: '#8F4230',
      blocks: [ { name: 'Ancestral movement & drum night', meta: 'Call-and-response · full body', route: 'ancestral', ev: 'trad' }, { name: 'Elder strength circle', meta: 'Optional · chair-supported', route: 'elder', ev: 'well' } ] },
    { day: 'Sun', label: 'Rest', focus: 'Restore', dur: '15 min', accent: '#2C3A63',
      blocks: [ { name: 'Gentle mobility & breath', meta: 'Rest is training', route: 'breath', ev: 'emerging' } ] }
  ];

export const uptakeFacts = [
    { n: '2–20%', l: 'of plant iron is absorbed', d: 'Non-heme iron is the only form in plants. Heme iron from meat runs 15–35% and barely cares what else is on the plate — plant iron cares enormously.' },
    { n: '4–6×', l: 'iron uptake at 100 mg vitamin C', d: '25 mg roughly doubles absorption, 50 mg triples it, 100 mg reaches four- to sixfold, plateauing near 100–200 mg. It only works if the vitamin C is in the same meal — hours apart does nothing.' },
    { n: '~5%', l: 'of spinach calcium is usable', d: 'It is bound as calcium oxalate. Kale, collard, turnip and mustard greens are far more soluble and match or beat dairy milk for fractional absorption in trials.' },
    { n: '40–87%', l: 'oxalate removed by boiling', d: 'Boil high-oxalate greens and discard the water when calcium matters. Spreading calcium across two or three meals also beats one large dose.' }
  ];

export const prepMatrix = [
    { m: 'Soak', t: '4–24 hrs', e: 'Reduced phytate by up to 58% in wheat and faba beans — the longer the soak, the greater the reduction.' },
    { m: 'Sprout', t: '1–3 days', e: 'A 51% phytate cut moved bioaccessible iron from 4.8% to 7.8% and zinc from 5.3% to 8.4% in sprouted wheat.' },
    { m: 'Ferment', t: '1–5 days', e: 'Injera, kisra, ogi, sourdough and tempeh all activate phytases. The Horn of Africa built this into daily bread.' },
    { m: 'Grind', t: 'minutes', e: 'Tahini, groundnut paste and fresh-ground flax open the food matrix so bound nutrients can be released.' },
    { m: 'Cook, cool, reheat', t: 'overnight', e: 'Cooked-then-cooled rice and ground provisions build resistant starch and blunt the glucose curve. Reheat gently.' },
    { m: 'Add fat', t: 'at the pot', e: 'Carotenoids and vitamins A, D, E and K need dietary fat to cross the gut wall. Palm oil, coconut, tahini, avocado.' }
  ];

export const uptakeMyths = [
    { m: 'Fruit must be eaten alone', v: 'Not supported. The stomach does not sort a meal by food group.' },
    { m: 'Protein and starch cannot be combined', v: 'Not supported. Rice and peas, ful and bread, injera and shiro all digest exactly as the body expects.' },
    { m: 'Food rots in the stomach when combined', v: 'Not supported by digestive physiology or by controlled trials.' },
    { m: 'Complementary proteins must share a meal', v: 'Outdated. Variety across the day is sufficient for healthy adults.' },
    { m: 'Tea with dinner is harmless', v: 'Partly — but tea and coffee polyphenols do inhibit non-heme iron. Move the cup about an hour off an iron-focused meal.' }
  ];

export const fusionQs = [
    { id: 'q1', q: 'Which specific traditions and communities are involved?', s: 'Named precisely — never “African” or “Asian” as a category.' },
    { id: 'q2', q: 'Who developed the recipe, and what is their relationship to those traditions?', s: 'Authorship is part of the record, not a byline.' },
    { id: 'q3', q: 'Which elements are documented, and which are newly invented?', s: 'Both are allowed. Only one of them may be called traditional.' },
    { id: 'q4', q: 'What historical, migratory or labour connection justifies the combination?', s: 'Or state plainly that it is an experimental pairing with no historical basis.' },
    { id: 'q5', q: 'How are the origin communities credited in the presentation?', s: 'On the card, not buried in a footnote.' },
    { id: 'q6', q: 'Has community review or consultation occurred?', s: 'Required for anything with religious or ceremonial significance.' },
    { id: 'q7', q: 'Is revenue sharing or attribution owed to the originating community?', s: 'Especially once a product is commercialised.' },
    { id: 'q8', q: 'Does this risk trademark exploitation, sacred-food misuse or false “traditional” labelling?', s: 'The last gate before anything publishes.' }
  ];

export const codexRegions = [
    { id: 'west', name: 'West Africa', sub: '16 nations · six agro-ecological belts', c1: '#7E5124', c2: '#5F3C1A', tint: '#F0E3D2', ink: '#7E5124', ev: 'strong',
      hook: 'Domesticated African rice, pearl millet, sorghum, fonio, cowpea, Bambara groundnut, oil palm and okra — none of which need an animal to grow or to cook.',
      lede: 'Not one food culture but dozens of overlapping culinary civilisations, sitting across at least six agro-ecological zones, hundreds of ethnolinguistic nations and three major religious traditions. A substantial share of the region’s oldest repertoire is naturally plant-based; the New World crops now inseparable from it — cassava, maize, peanut, tomato, chilli, plantain — arrived after 1500 CE.',
      stats: [{ n: '16', l: 'nations across six belts' }, { n: '30–40%', l: 'protein in fermented locust bean' }, { n: '79.3%', l: 'of Nigerian cassava processing done by women' }, { n: '89–99%', l: 'of Mali cowpea vendors are women' }],
      zoneTitle: 'Six belts, six food systems', zoneSub: 'Rainfall runs from under 600 mm in the Sahel to over 1,500 mm in the forest zone — and the pot changes with it.',
      zones: [
        { z: 'Sahel', crops: 'Pearl millet · sorghum · groundnut · cowpea', note: 'Erratic, drought-prone rainfall favours short-cycle, low-water crops alongside Fulani, Tuareg and Moor pastoralism.' },
        { z: 'Sudan & Guinea savanna', crops: 'Sorghum · millet · maize · yam · groundnut', note: 'The grain belt through central Mali, Burkina Faso and northern Nigeria and Ghana.' },
        { z: 'Humid forest', crops: 'Cassava · yam · plantain · oil palm · leaf sauces', note: 'Root-and-leaf systems where palm oil is the cooking fat and the flavour base.' },
        { z: 'Coastal & mangrove', crops: 'Rice · cowpea · cassava · jute leaf · okra', note: 'Tidal rice engineering — banks and sluices built to manage water and salinity.' },
        { z: 'Cabo Verde', crops: 'Maize · common bean · cassava · cabbage', note: 'Island isolation produced Kriolu cuisine and cachupa, a corn-and-bean pot of its own lineage.' }
      ],
      dishes: [
        { n: 'Akara', p: 'Nigeria · Benin · Ghana', cls: 'vegan', d: 'Whipped cowpea-paste fritters. No egg, no dairy — the batter aerates itself.' },
        { n: 'Red red', p: 'Ghana', cls: 'vegan', d: 'Black-eyed peas stewed in palm oil, served with fried plantain.' },
        { n: 'Waakye', p: 'Ghana', cls: 'vegan', d: 'Rice and beans cooked with sorghum leaf for its deep red colour.' },
        { n: 'Attiéké', p: 'Côte d’Ivoire', cls: 'vegan', d: 'Fermented grated cassava, steamed to a couscous. Fermentation is the dish.' },
        { n: 'Jollof rice', p: 'Senegal · Nigeria · Ghana', cls: 'vegan', d: 'Rice, tomato and pepper at the base. Ownership is genuinely contested across the region — the Codex presents the claims rather than settling them.' },
        { n: 'Egusi soup', p: 'Nigeria', cls: 'forward', d: 'Thickened with ground melon seed. Commonly cooked with meat or fish; the seed-and-greens structure stands without either.' },
        { n: 'Thieboudienne', p: 'Senegal', cls: 'forward', d: 'The national rice-and-fish dish. A plant version is an adaptation — and should say so.' }
      ],
      craftT: 'Fermentation is the flavour engine',
      craftB: 'Alkaline-fermented locust bean — dawadawa, iru, soumbala — reaches 30–40% protein by weight and delivers the savoury depth most cuisines get from stock. Gari, attiéké and fufu ferment cassava; ogi and pito ferment grain. The region already owns the vegan flavour toolkit.',
      adapt: [
        'Smoked paprika, dried mushroom and fermented locust bean rebuild smoked-fish umami without pretending the original was meat-free.',
        'Meat-stock dishes get an adaptation label. The Codex does not rewrite a dish’s history to make it fit a diet.',
        'Palm oil is traditional and nutritionally significant — sourcing, not substitution, is the ethical question.'
      ],
      sov: 'Fonio, pearl millet, sorghum, cowpea and Bambara groundnut are the crops climate programmes now call “future foods” — and the same crops facing genetic erosion, aflatoxin risk and the quiet loss of indigenous processing knowledge. Women hold most of the value chain, which makes gender equity a precondition for any ethical commercialisation, not an add-on.' },

    { id: 'east', name: 'East Africa & the Horn', sub: 'Highlands · drylands · Great Lakes · Swahili coast', c1: '#8F4230', c2: '#6E3122', tint: '#EADBD5', ink: '#8F4230', ev: 'strong',
      hook: 'Orthodox fasting law institutionalised 180+ animal-free days a year for laypeople — centuries before “vegan” existed as a word.',
      lede: 'Some of the world’s deepest plant-forward traditions, and among the least credited. A mosaic rather than a region: highland cereal culture, dryland pastoral-agricultural hybrids, Nile Valley farming, Great Lakes banana-and-legume economies, and thirteen centuries of Indian Ocean exchange along the Swahili coast.',
      stats: [{ n: '180+', l: 'fasting days a year for laypeople' }, { n: '252', l: 'fasting days for clergy' }, { n: '37%', l: 'of daily iron in 100 g of teff' }, { n: '~20M', l: 'people fed by enset today' }],
      zoneTitle: 'Five worlds on one map', zoneSub: 'Altitude, rainfall and the Indian Ocean shaped five structurally different food systems.',
      zones: [
        { z: 'Ethiopian & Eritrean highlands', crops: 'Teff · barley · field pea · chickpea · lentil', note: 'Fasting-calendar cuisine, with injera serving as bread, plate and utensil at once.' },
        { z: 'Horn drylands', crops: 'Sorghum · maize · sesame · cowpea', note: 'Pastoral-agricultural hybrid systems; canjeero and lahoh carry the fermented flatbread line.' },
        { z: 'Nile & riverine Sudan', crops: 'Sorghum · millet · fava · date', note: 'Kisra, the fermented sorghum flatbread, is structurally kin to injera.' },
        { z: 'Great Lakes', crops: 'Matoke · beans · groundnut · sweet potato', note: 'Banana-and-legume economies across Uganda, Rwanda, Burundi and western Kenya and Tanzania.' },
        { z: 'Swahili coast & Zanzibar', crops: 'Rice · coconut · cassava · clove & spice', note: 'Persian, Arab and Indian techniques layered onto African foodways — a history inseparable from the Indian Ocean slave trade.' }
      ],
      dishes: [
        { n: 'Shiro wot', p: 'Ethiopia · Eritrea', cls: 'vegan', d: 'Spiced chickpea or broad-bean flour simmered to a stew. The backbone of a fasting day.' },
        { n: 'Misir wot', p: 'Ethiopia', cls: 'vegan', d: 'Red lentils cooked down in berbere.' },
        { n: 'Beyaynetu', p: 'Ethiopia · Eritrea', cls: 'vegan', d: 'The fasting platter — many stews arranged on one injera, shared from the middle.' },
        { n: 'Mchicha wa nazi', p: 'Tanzania', cls: 'vegan', d: 'Amaranth greens simmered in coconut milk.' },
        { n: 'Kachumbari', p: 'Kenya', cls: 'vegan', d: 'Tomato, onion and chilli, cut sharp with lime.' },
        { n: 'Kisra with mullah', p: 'Sudan', cls: 'forward', d: 'Fermented sorghum flatbread with a vegetable or legume stew — meat-based versions are common.' },
        { n: 'Matoke', p: 'Uganda', cls: 'forward', d: 'Steamed cooking banana, usually served under groundnut sauce.' }
      ],
      craftT: 'Sour grain fermentation',
      craftB: 'Injera and its cousins — canjeero and lahoh in Somalia, kisra in Sudan — all depend on one to five days of wild lactic-acid and yeast fermentation of a grain batter. The process improves digestibility, cuts phytate, adds B vitamins, and produces the “eyes” that define bread-as-plate eating.',
      adapt: [
        'Fasting cuisine is sacred practice, not a trend to harvest. Name the calendar it comes from.',
        'Most fasting-day dishes need no adaptation at all — they were built animal-free by design.',
        'Where niter kibbeh (spiced butter) carries the flavour, a spiced oil is an adaptation and gets labelled as one.'
      ],
      sov: 'Enset — the “false banana” of Ethiopia’s southern highlands — already feeds roughly 20 million people and has been modelled to feed over 100 million by 2070 as drought pressure grows. It carries almost no international recognition and almost no research funding: the same gap facing teff, sorghum and indigenous legumes while maize, wheat and rice absorb the investment.' },

    { id: 'north', name: 'North Africa & the Nile', sub: 'Egypt · Nubia · Sahara · Maghreb · Amazigh', c1: '#7E5F1C', c2: '#5E4614', tint: '#EDE0C8', ink: '#7E5F1C', ev: 'historical',
      hook: 'At minimum nine distinct agro-culinary systems — not “Mediterranean food,” and not reducible to couscous and tagine.',
      lede: 'Archaeobotany confirms emmer wheat, barley, lentils, fava beans, peas, chickpeas and flax as the agricultural base of ancient Egyptian and Nubian diets, alongside onion, garlic, leek, date, fig and sesame. Many staples across the region are traditionally vegan outright; others were built on meat, dairy or fish and need a respectful adaptation label rather than an authenticity claim.',
      stats: [{ n: '9', l: 'distinct agro-culinary systems' }, { n: '5', l: 'ecological forces shaping the region' }],
      zoneTitle: 'Water decides everything', zoneSub: 'Nile flood agriculture, Saharan aridity, Mediterranean trade, mountain terracing and oasis micro-irrigation.',
      zones: [
        { z: 'Nile Delta', crops: 'Rice · wheat · fava · vegetables', note: 'Irrigated alluvium, pickling and sun-drying, dense canal-fed urban markets. Threatened by sea-level rise and salinisation.' },
        { z: 'Upper Egypt', crops: 'Wheat · sugarcane · molokhia · dates', note: 'A narrow floodplain in arid surroundings, traded by riverboat and rural souk. Threatened by reduced Nile flow and heat.' },
        { z: 'Nubian river communities', crops: 'Sorghum · millet · dates · legumes', note: 'Cataract-zone farming with grain storage pits and diaspora exchange networks. Threatened by dam displacement.' },
        { z: 'Atlas & Rif mountains', crops: 'Barley · walnut · fig · legumes', note: 'Terraced and snowmelt-fed, moved by transhumance. Threatened by snowpack decline and erosion.' },
        { z: 'Oases', crops: 'Dates · barley · vegetables under palm canopy', note: 'Groundwater and spring-fed micro-irrigation, historically caravan-linked. Threatened by aquifer depletion.' }
      ],
      dishes: [
        { n: 'Ful medames', p: 'Egypt · Sudan', cls: 'vegan', d: 'Slow-cooked fava with oil, lemon and cumin. Older than most cuisines that borrowed it.' },
        { n: 'Koshari', p: 'Egypt', cls: 'vegan', d: 'Rice, lentils and macaroni under fried onion and tomato sauce.' },
        { n: 'Lablabi', p: 'Tunisia', cls: 'vegan', d: 'Chickpea broth poured over torn bread with harissa and cumin.' },
        { n: 'Zaalouk', p: 'Morocco', cls: 'vegan', d: 'Aubergine and tomato cooked right down with garlic and cumin.' },
        { n: 'Bissara', p: 'Morocco', cls: 'vegan', d: 'Split-fava purée finished with olive oil — a winter breakfast.' },
        { n: 'Couscous with seven vegetables', p: 'Morocco', cls: 'forward', d: 'Often finished with smen or meat stock; the vegetable version stands on its own and is widely cooked.' },
        { n: 'Fatta', p: 'Egypt', cls: 'adapt', d: 'Built on meat or fish stock. A legume-and-root broth version is an adaptation — it should not be presented as the historical dish.' }
      ],
      craftT: 'Nine systems, one misreading',
      craftB: '“Couscous, tagine, Mediterranean” flattens Nubian, Amazigh, Sahrawi, Coptic and Jewish North African traditions into a single story. Amazigh food technology — argan pressing, terraced barley, the desert tea ceremony — predates Arab expansion and persists alongside it.',
      adapt: [
        'Ful, koshari, lablabi, zaalouk and taktouka are traditionally vegan. Say so — do not call them “veganised.”',
        'Egg-topped ful, dairy-finished couscous and fish-based fatta need an adaptation label, not an authenticity claim.',
        'Source Nubian recipes from Nubian community organisations, elders and diaspora restaurants — not generic regional roundups.'
      ],
      sov: 'Nile hydropolitics sit directly on the plate. The Grand Ethiopian Renaissance Dam constrains downstream water for Egypt and Sudan and pushes both toward wheat-import dependency, while Nubian communities carry a longer history of displacement by dam construction — upstream engineering and dinner are the same conversation.' },

    { id: 'central', name: 'Central & Southern Africa', sub: '17 countries · rainforest to Kalahari', c1: '#2F4A31', c2: '#213524', tint: '#E4EDDD', ink: '#2F4A31', ev: 'historical',
      hook: 'Congo Basin forest cuisines, Miombo woodland foraging, Kalahari drylands, and a South African food system still shaped by apartheid geography.',
      lede: 'Indigenous grains, legumes, leafy vegetables and foraged forest and dryland foods form a deep substrate that predates and coexists with cassava, maize and groundnut. Many of the region’s iconic dishes are already plant-based or need only a modest substitution to become so while keeping their cultural identity intact.',
      stats: [{ n: '17', l: 'countries in the volume' }, { n: '12+', l: 'distinct ecological zones' }],
      zoneTitle: 'Forest, woodland, desert, township', zoneSub: 'Each zone produced a different plant-food repertoire — and a different set of threats to it.',
      zones: [
        { z: 'Congo Basin rainforest', crops: 'Cassava · plantain · fumbwa (Gnetum) · palm', note: 'Forest-clearing agriculture beside gathered greens, wild fruit and mushroom foraging tied closely to women’s knowledge systems. Threatened by deforestation.' },
        { z: 'Miombo woodland', crops: 'Sorghum · maize · wild mushrooms · wild fruit', note: 'Globally significant fungal diversity across Zambia, Malawi, Mozambique and Zimbabwe. Threatened by charcoal production and land clearance.' },
        { z: 'Kalahari & Namib drylands', crops: 'Marula · mongongo · melon · sorghum', note: 'Extreme aridity met with foraged fats, fruits and drought cereals.' },
        { z: 'South African highveld & townships', crops: 'Maize · samp · morogo · beans', note: 'Apartheid spatial planning still shapes what is sold where — and what a household can afford to cook.' },
        { z: 'Mozambican coast', crops: 'Cassava · coconut · cassava leaf', note: 'Indian Ocean influence layered onto a cassava-leaf base, most clearly in matapa.' }
      ],
      dishes: [
        { n: 'Umngqusho', p: 'South Africa · Xhosa', cls: 'vegan', d: 'Samp and beans, cooked slow until the maize gives.' },
        { n: 'Morogo / imifino', p: 'Southern Africa', cls: 'vegan', d: 'Wild and cultivated leafy greens as the relish beside pap. Dozens of species, region by region.' },
        { n: 'Koki', p: 'Cameroon', cls: 'vegan', d: 'Steamed black-eyed pea pudding, wrapped and cooked in leaves.' },
        { n: 'Fumbwa', p: 'DR Congo', cls: 'vegan', d: 'Forest Gnetum leaves with groundnut paste and palm oil.' },
        { n: 'Nsima or sadza with ndiwo', p: 'Malawi · Zimbabwe', cls: 'vegan', d: 'Stiff maize porridge with a greens-and-legume relish — the everyday plate.' },
        { n: 'Matapa', p: 'Mozambique', cls: 'forward', d: 'Young cassava leaves pounded with groundnut and coconut; commonly cooked with crab or prawn.' },
        { n: 'Ndolé', p: 'Cameroon', cls: 'forward', d: 'Bitterleaf and groundnut stew. Readily built plant-only without losing what makes it ndolé.' }
      ],
      craftT: 'Cassava must be processed, not just cooked',
      craftB: 'Bitter cassava carries cyanogenic glycosides. Soaking, grating, fermenting, pressing and thorough cooking are safety systems, not folklore — and sun-drying alone is not sufficient for bitter varieties. Any recipe programme that skips the processing step is dangerous, not rustic.',
      adapt: [
        'Dried fish, meat and dairy fat are usually a seasoning layer rather than the structure — most of these dishes survive substitution intact.',
        'Indigenous grains and greens were devalued as “poverty foods” under colonial and apartheid policy. Restoring them is the adaptation that actually matters.'
      ],
      sov: 'Land dispossession, mining-labour systems, forced cash-cropping and post-independence reliance on refined maize meal narrowed diets that were once among the world’s most diverse. Sorghum, millet, cowpea, Bambara groundnut and pigeon pea are the genuine climate-adaptation pathway — and the crops with the weakest seed systems and the least investment behind them.' },

    { id: 'caribbean', name: 'The Caribbean', sub: '28+ nations · conuco, provision ground, Ital', c1: '#2E6B7A', c2: '#1F4E59', tint: '#D9E7EC', ink: '#2E6B7A', ev: 'oral',
      hook: 'Taíno and Kalinago conuco farming, provision grounds and Rastafari Ital livity had already produced deeply plant-centred eating — as survival, resistance and spiritual practice.',
      lede: 'Not one cuisine but dozens of food systems shaped by distinct Indigenous nations, African ethnic groups, European colonial regimes and later Indian, Chinese, Middle Eastern and Javanese migrations. Cassava, plantain, breadfruit, callaloo, pigeon peas and coconut form a shared substrate — but each island combines them according to its own history.',
      stats: [{ n: '28+', l: 'nations and territories' }, { n: '5', l: 'major migration streams' }, { n: '1–2 m', l: 'across, the Taíno conuco mound' }],
      zoneTitle: 'Five ways of farming an island', zoneSub: 'These are agricultural systems, not just regions — each one a different answer to who controls the food.',
      zones: [
        { z: 'Conuco (Taíno)', crops: 'Cassava · yautía · batata · beans · squash · pepper', note: 'Knee-high raised polyculture mounds of soil, ash and organic matter. Cassava anchors the centre; beans fix nitrogen; squash fills the gaps. The opposite of the row monocrop Europeans imposed.' },
        { z: 'Provision grounds', crops: 'Yam · sweet potato · dasheen · cassava · breadfruit', note: 'Marginal hillside plots enslaved people farmed and marketed. The origin of “ground provisions” as a category and of Caribbean market economies.' },
        { z: 'Maroon forest farms', crops: 'Cassava · plantain · yam · foraged bush', note: 'Forest-based food sovereignty built by people who escaped enslavement. Accompong and Moore Town maintain it today.' },
        { z: 'Ital homesteads', crops: 'Callaloo · coconut · ground provisions · herbs', note: 'Livity: unsalted, unprocessed, fresh from the earth. A religious discipline before it was ever a diet.' },
        { z: 'Indo-Caribbean gardens', crops: 'Rice · dhal · bhaji · curry leaf', note: 'Indentureship brought split peas, roti and a second, older vegetarian tradition into the same kitchens.' }
      ],
      dishes: [
        { n: 'Ital stew', p: 'Jamaica', cls: 'vegan', d: 'Coconut-based and saltless by principle. Rastafari practice, not a menu category.' },
        { n: 'Rice and peas', p: 'Jamaica', cls: 'vegan', d: 'Pigeon or kidney peas with coconut milk, thyme and scallion.' },
        { n: 'Callaloo', p: 'Trinidad', cls: 'vegan', d: 'Dasheen or amaranth leaf with okra and coconut. The word names different plants island to island — the Codex keeps them separate.' },
        { n: 'Pikliz', p: 'Haiti', cls: 'vegan', d: 'Fermented cabbage, carrot and Scotch bonnet in citrus. Beside rice and beans it supplies both fermentation and the vitamin C that carries the iron.' },
        { n: 'Cassava bread (ereba)', p: 'Garifuna · Belize', cls: 'vegan', d: 'Continuous Indigenous technology — still grated, pressed and baked the same way.' },
        { n: 'Diri kole ak pwa', p: 'Haiti', cls: 'vegan', d: 'Rice and beans cooked together, usually with pikliz alongside.' },
        { n: 'Oil-down', p: 'Grenada', cls: 'forward', d: 'Breadfruit simmered down in coconut milk; commonly built with salted meat.' }
      ],
      craftT: 'Bush tea is medicine, and medicine has doses',
      craftB: 'Caribbean bush teas are a genuine pharmacopoeia and a genuine safety question at the same time. Some are contraindicated in pregnancy, some interact with blood-pressure medication or blood thinners. Rooted Strength carries those flags on every cup rather than treating “natural” as a synonym for safe.',
      adapt: [
        'Ital and provision-ground cooking are already plant-based. They do not need permission from a Western vegan category.',
        'Saltfish, salt pork and stewed meat entered these cuisines through plantation rationing — naming that history is part of the recipe.'
      ],
      sov: 'Island food systems import most of what they eat while exporting what they grow, and hurricanes take the rest. Cuba’s organopónicos, Haiti’s lakou systems and Puerto Rico’s post-María farm networks are the region’s live experiments in feeding itself — which is what Maroon agriculture was doing three centuries earlier.' },

    { id: 'afam', name: 'African American', sub: 'Lowcountry · Delta · Louisiana · Appalachia · the cities', c1: '#8A5320', c2: '#653B14', tint: '#F6E7D8', ink: '#8A5320', ev: 'historical',
      hook: 'It did not begin with meat and it did not begin with slavery. It began with African agricultural civilisations that had already domesticated rice, cowpeas, okra, sesame, sorghum, millet and yams.',
      lede: 'Those crops met Indigenous American corn, beans, squash, sweet potato and pepper through specific, documented relationships with Native nations — not a vague “Afro-Indigenous fusion.” Much of what later became soul food started life as a bean-and-grain, vegetable-forward, seasonally driven cuisine of survival.',
      stats: [{ n: '6 million', l: 'people moved in the Great Migration' }, { n: 'Oryza glaberrima', l: 'the African rice line to the Sea Islands' }],
      zoneTitle: 'Regional traditions, not one cuisine', zoneSub: 'The staples change every few hundred miles — and so does the plant-forward repertoire.',
      zones: [
        { z: 'Lowcountry & Sea Islands', crops: 'Rice · benne · red peas · okra', note: 'The clearest unbroken line to West African rice agriculture. Gullah Geechee culture-bearers are the authoritative voices on what is historically plant-forward here.' },
        { z: 'Mississippi Delta', crops: 'Cornmeal · greens · field peas', note: 'Skillet cornbread, mustard greens and potlikker — the broth was never the by-product.' },
        { z: 'Alabama & Georgia', crops: 'Peanuts · sweet potato · peaches', note: 'Peanut soup and candied sweet potatoes, on the ground Carver’s crop-diversification work rebuilt.' },
        { z: 'Black Louisiana', crops: 'Rice · okra · red beans', note: 'Red beans and rice, maque choux — a documented Afro-Indigenous meeting point.' },
        { z: 'Black Appalachia', crops: 'Corn · beans · foraged greens', note: 'Significantly under-documented next to the Lowcountry. The Codex flags the gap rather than filling it with invention.' }
      ],
      dishes: [
        { n: 'Okra soup', p: 'Lowcountry', cls: 'vegan', d: 'Okra, tomato, corn and butterbeans in one pot.' },
        { n: 'Benne wafers', p: 'Gullah Geechee', cls: 'vegan', d: 'African sesame, still baked on the Sea Islands.' },
        { n: 'Texas caviar', p: 'Texas', cls: 'vegan', d: 'Black-eyed peas dressed cold and eaten by the spoonful.' },
        { n: 'Hoppin’ John', p: 'Lowcountry', cls: 'forward', d: 'Red peas and rice. Traditionally pork-seasoned; the peas-and-rice structure underneath is African. Even the etymology is disputed.' },
        { n: 'Red rice', p: 'Lowcountry', cls: 'forward', d: 'Tomato rice cooked down — jollof’s Carolina descendant.' },
        { n: 'Maque choux', p: 'Louisiana', cls: 'forward', d: 'Corn, pepper and tomato; one of the better-documented Afro-Indigenous exchanges.' },
        { n: 'Potlikker greens', p: 'Delta · Deep South', cls: 'adapt', d: 'Smoked paprika, mushroom and a splash of vinegar rebuild the smoke without pork — an adaptation, and named as one.' }
      ],
      craftT: 'Coercion and celebration are different foods',
      craftB: 'Rations, provision grounds and hunger management produced one set of dishes; Sunday dinners, Juneteenth, Watch Night, fish fries and family reunions produced another. Collapsing them erases both the violence and the creativity. The Codex keeps them labelled apart.',
      adapt: [
        'The meat-heavy, fried, sugar-laden version of this cuisine is partly a mid-century marketing artefact — not its origin.',
        'Where pork seasons the pot, smoked paprika and mushroom are an adaptation, not a correction of history.',
        'Black veganism is not a 21st-century import: it runs through Black Muslim dietary codes, Ital-influenced cooking, 1960s–70s Black Nationalist health politics and independent Black-owned health food stores.'
      ],
      sov: 'Fannie Lou Hamer’s Freedom Farm Cooperative and George Washington Carver’s crop-diversification work at Tuskegee tied land stewardship and cooperative economics to food sovereignty long before the phrase existed. The Black Panther Party’s Free Breakfast for Children Program made feeding children a direct political strategy — and forced the federal government’s hand on school nutrition.' },

    { id: 'afrosam', name: 'Afro-South America', sub: 'Quilombo · palenque · Maroon · Pacific · Amazon', c1: '#2C3A63', c2: '#1D2949', tint: '#E1E4EF', ink: '#2C3A63', ev: 'historical',
      hook: 'Quilombo agroforestry, palenque patios and Maroon swidden gardens were built on cassava, plantain, beans, corn and palm fruit — crops that stored well and grew out of the overseer’s sight.',
      lede: 'Tens of millions of Afro-descended people across Brazil, Colombia, Venezuela, Ecuador, Peru and the Guianas — a mosaic of national, ecological, linguistic and religious food systems, not one “Latin” cuisine. Plant-forward eating here is a structural feature of survival, never a modern imposition.',
      stats: [{ n: '1,189', l: 'articles screened in the quilombola ethnobotany review' }, { n: '39', l: 'quilombola communities covered by it' }, { n: '1988', l: 'Brazil constitutionally recognised quilombola territory' }, { n: '1993', l: 'Colombian Law 70 recognised collective land councils' }],
      zoneTitle: 'Where the food was grown free', zoneSub: 'Each of these is a land-tenure system as much as an ecology — and most are still contested in court.',
      zones: [
        { z: 'Amazon várzea & terra preta', crops: 'Cassava · açaí · Brazil nut · cupuaçu · peach palm', note: 'Pre-Columbian dark earth built over generations from controlled burning, charcoal and fish bone — still farmed by river and quilombola communities on flood-timed calendars.' },
        { z: 'Quilombola Atlantic Forest & Cerrado', crops: 'Cassava · corn · beans · fruit trees', note: 'Swidden-fallow agroforestry recognised under Article 68 of Brazil’s 1988 constitution — and still fought over parcel by parcel.' },
        { z: 'Afro-Colombian Pacific (Chocó & Cauca)', crops: 'Plantain · cassava · coconut · rice', note: 'Consejos comunitarios hold collective title under Law 70 of 1993. Gold mining, mercury and armed displacement have broken river food systems and pushed cooking into the cities.' },
        { z: 'San Basilio de Palenque', crops: 'Cassava · coconut · corn · tropical fruit', note: 'Widely regarded as the first free town of formerly enslaved Africans in the Americas. Palenquero creole carries Kikongo-Bantu roots; the household patio is the teaching workshop.' },
        { z: 'Guiana Maroon forest gardens', crops: 'Cassava · plantain · rice · foraged forest', note: 'Saramaka, Ndyuka and other Maroon nations hold some of the most autonomous food-sovereignty structures in the hemisphere.' },
        { z: 'Afro-Peruvian coast', crops: 'Rice · beans · sweet potato · chilli', note: 'Chincha, Cañete and Ica: a culinary path shaped by urban kitchen labour and street vending rather than rural provision grounds.' }
      ],
      dishes: [
        { n: 'Farofa', p: 'Brazil', cls: 'vegan', d: 'Toasted cassava flour — the constant on the table, whatever else is on it.' },
        { n: 'Beiju & tapioca', p: 'Brazil', cls: 'vegan', d: 'Cassava-starch crêpes off the griddle. Indigenous technology, adopted and carried forward.' },
        { n: 'Enyucada', p: 'San Basilio de Palenque', cls: 'vegan', d: 'Cassava-and-coconut cake, sold by Palenquera vendors who carry the recipes and the teaching.' },
        { n: 'Alegría', p: 'Palenque', cls: 'vegan', d: 'Puffed rice and coconut. The name means “joy” — popularly for the freedom won at Palenque.' },
        { n: 'Tacu tacu', p: 'Peru', cls: 'vegan', d: 'Rice and beans pressed and fried; born from repurposed household leftovers under domestic slavery.' },
        { n: 'Patacones', p: 'Pacific coast', cls: 'vegan', d: 'Green plantain, smashed and twice-fried.' },
        { n: 'Acarajé', p: 'Bahia', cls: 'forward', d: 'The black-eyed pea fritter base is naturally vegan; the filling is built on dried shrimp. The baianas who make it hold religious and economic authority over the dish.' },
        { n: 'Moqueca', p: 'Bahia · Espírito Santo', cls: 'adapt', d: 'Built on fish or shrimp with dendê and coconut. A vegetable version is an adaptation and gets labelled as one.' }
      ],
      craftT: 'Dendê carries the cuisine — and the contradiction',
      craftB: 'Palm oil is the structural fat of Afro-Brazilian cooking and inseparable from Candomblé foodways. It is also the crop whose monoculture expansion — alongside land grabbing, mining and agribusiness — is dismantling the agrobiodiversity these same communities depend on. The Codex names both at once rather than choosing the comfortable half.',
      adapt: [
        'Acarajé, vatapá, caruru, moqueca, pepperpot and cook-up rice are historically built on dried shrimp, fish or meat. A vegan version is an adaptation — never “ancestral truth.”',
        'Ceremonial Candomblé and Umbanda foods require community consultation before any adaptation. They are not flavour inspiration.',
        'Writing about acarajé and dendê routinely flattens the baianas de acarajé — Black women holding religious and economic authority — into tourist-facing flavour copy. Credit the labour by name.'
      ],
      sov: 'Land grabbing, legal and illegal gold mining with its mercury load, agribusiness expansion, palm monoculture and climate displacement all press on the same agrobiodiversity. Brazil’s Article 68 and Colombia’s Law 70 gave these communities legal standing; enforcement is where the food system is actually won or lost.' },

    { id: 'afroasia', name: 'Afro-Asia & the Indian Ocean', sub: 'Dhow trade · indenture · diaspora · parallel invention', c1: '#265863', c2: '#17414B', tint: '#DCE8EB', ink: '#265863', ev: 'historical',
      hook: 'Two thousand years of monsoon trade linked East Africa, Arabia, Persia and South Asia — but most Afro-Asian culinary hybridity came later, through indenture.',
      lede: 'The Indian Ocean was navigable by sail centuries before the Atlantic was regularly crossed, and its seasonally reversing monsoon made round trips possible inside a single year. This volume traces exchange through named peoples rather than through “African cuisine” and “Asian cuisine” — and keeps direct historical influence strictly apart from parallel invention.',
      stats: [{ n: '~2,000 yrs', l: 'of monsoon dhow trade' }, { n: '90%', l: 'of the world clove crop from Zanzibar by 1834' }, { n: '1834–1917', l: 'Indian indenture — the source of most fusion' }, { n: '8', l: 'disclosures required per fusion recipe' }],
      zoneTitle: 'Four kinds of contact, and one that is not contact', zoneSub: 'Conflating these is the single most common error in popular Afro-Asian food history. The Codex keeps them apart.',
      zones: [
        { z: 'Pre-colonial dhow trade', crops: 'Rice · coconut · tamarind · clove · cardamom', note: 'Swahili city-states, Omani and Yemeni merchant families, Gujarati and Persian traders. Swahili is a Bantu language enriched with Arabic — the loanwords track the cargo.' },
        { z: 'Colonial plantation economy', crops: 'Clove · sugar · coffee', note: 'Omani rule moved to Zanzibar in 1832; the clove boom of the 1830s–50s ran on enslaved African labour and supplied up to 90% of the world crop by 1834. An Arabian dynasty, an African island, an Indonesian spice.' },
        { z: 'Indenture, 1834–1917', crops: 'Rice · dhal · roti · achar · chilli', note: 'Bhojpuri-speaking Indians in Mauritius and Réunion, Cantonese and Hakka migrants in Jamaica. Most documented Afro-Asian hybridity begins here — after the abolition of African slavery, not before it.' },
        { z: 'Contemporary diaspora', crops: 'Soy · gochujang · adobo · noodles', note: 'Afro-Filipino, Afro-Japanese and Afro-Korean cooking built on military history, family life and internet creativity. Real, recent, and labelled as such.' },
        { z: 'Parallel invention', crops: 'Injera · miso · tempeh · kimchi · achar', note: 'African grain fermentation and Asian soy fermentation evolved independently on the same microbial principles. Similar is not the same as connected.' }
      ],
      dishes: [
        { n: 'Pilau', p: 'Swahili coast', cls: 'vegan', d: 'Rice cooked with spice. The word descends from Persian polow, tracked through documented trade rather than assumed.' },
        { n: 'Dholl puri', p: 'Mauritius', cls: 'vegan', d: 'Split-pea flatbread — lived Indo-Mauritian tradition, not a fusion novelty.' },
        { n: 'Rougail', p: 'Réunion', cls: 'vegan', d: 'A raw chilli condiment set beside almost everything on the table.' },
        { n: 'Achar', p: 'Indian Ocean · Caribbean', cls: 'vegan', d: 'Oil-and-spice pickling, carried by indenture into a dozen creole kitchens.' },
        { n: 'Cari (Creole curry)', p: 'Réunion', cls: 'forward', d: 'Built on a roussi browned-onion base. The technique traces to Indian domestic labourers assigned kitchen work under period racial ideology — labour-driven transmission, not vague influence.' },
        { n: 'Chinese-Jamaican soy cooking', p: 'Jamaica', cls: 'diasporic', d: 'Cantonese and Hakka contract migrants brought soy sauce into Jamaican pots. Documented 19th-century diaspora fusion — not ancient exchange.' },
        { n: 'Mushroom adobo', p: 'Afro-Filipino kitchens', cls: 'contemp', d: 'An experimental pairing with no historical basis. The Codex says so on the card rather than inventing a lineage for it.' }
      ],
      craftT: 'Two rices, domesticated twice',
      craftB: 'Asian rice (Oryza sativa) was domesticated in the Yangtze basin around 9,000 years ago; African rice (Oryza glaberrima) independently in the Inner Niger Delta roughly 2,000–3,000 years ago. Genomic analysis of 246 accessions confirms two separate evolutionary events with convergent selection on similar genes — parallel invention, not diffusion. Portuguese traders introduced O. sativa to West Africa by the mid-16th century, and it has displaced glaberrima across most of the continent.',
      adapt: [
        'Name the peoples, not the continents. “African” and “Asian” are not culinary traditions.',
        'Separate direct historical influence from parallel invention. Fermentation arising twice is not fermentation travelling once.',
        'Ramadan dishes, prasadam-adjacent preparations and Orthodox fasting foods need community consultation before adaptation — never “flavour inspiration.”',
        'Afro-Filipino, Afro-Japanese and Afro-Korean cooking is real and recent. Label it contemporary rather than dressing it as ancient exchange.'
      ],
      sov: 'Smallholder coconut agriculture across Pacific and Indian Ocean islands is storm- and climate-exposed, and archipelagos at the scale of the Seychelles have almost no buffer. Any work here has to treat the coconut as a specific regional relationship rather than a universal tropical “connector.”' },

    { id: 'indenture', name: 'Indenture & the Indo-African Diaspora', sub: 'Siddi · Natal · Trinidad · Guyana · Suriname · Mauritius', c1: '#7A3D53', c2: '#5B2C3E', tint: '#EFDFE4', ink: '#7A3D53', ev: 'historical',
      hook: 'Between the 1830s and 1917, 1.2–1.5 million Indians were moved onto the plantations slavery had just been abolished from — and built a plant-based street-food canon out of the rations.',
      lede: 'Six distinct populations, not one “Indian diaspora”: East African Bantu-descended Siddi and Sheedi communities in Gujarat, Karnataka and Sindh; Gujarati merchants in colonial East Africa; Tamil and Telugu indentured labourers in Natal; and the Indo-Caribbean and Indian Ocean island societies of Trinidad, Guyana, Suriname, Mauritius and Réunion. Each carries its own religion, caste position, language and labour history — and its own repertoire.',
      stats: [{ n: '1.2–1.5M', l: 'Indians moved under indenture, 1830s–1917' }, { n: '1834', l: 'Mauritius, the first indenture destination' }, { n: '~200,000', l: 'indentured arrivals in Natal from 1860' }, { n: '45 days', l: 'the Natal crossing, eaten out of ship rations' }],
      zoneTitle: 'Six diasporas, six labour histories', zoneSub: 'One ocean, six unrelated contracts. Flattening them into “Indian food” is the error this volume exists to prevent.',
      zones: [
        { z: 'Siddi & Sheedi', crops: 'Pearl millet · sorghum · legumes · forest greens', note: 'East African Bantu ancestry carried into Gujarat, Karnataka and Sindh through Arab and Portuguese trade, Deccan military service and sailing work. Scheduled Tribe status in Junagadh; Hindu, Muslim and Christian households side by side. The documentation is thin and the community has not been paid for it.' },
        { z: 'Gujarati East Africa', crops: 'Dal · roti · chutney · cassava · sukuma wiki', note: 'Merchant and railway migration placed Indian traders in a legally enforced middle tier — above Black Africans, below white settlers. Samosa and chai are Kenyan, Ugandan and Tanzanian street food now. 80,000 people were expelled from Uganda in 1972.' },
        { z: 'Natal & Durban', crops: 'Bean curry · lentil · sugarcane · white bread', note: 'Tamil and Telugu field labour from 1860, alongside a separate Gujarati “passenger Indian” merchant class who arrived free. The two histories stayed distinct in caste, class and kitchen.' },
        { z: 'Trinidad & Guyana', crops: 'Split pea · channa · tamarind · culantro · pumpkin', note: 'Doubles, dhalpuri, pholourie and seven curry — one of the most thoroughly documented traditionally-vegan street canons anywhere on earth.' },
        { z: 'Suriname', crops: 'Roti · dal · peanut · sambal · pomtajer', note: 'Four traditions running in parallel: Hindustani, Javanese, Creole and Maroon. Javanese sambal is Southeast Asian and never gets filed as South Asian.' },
        { z: 'Mauritius & Réunion', crops: 'Yellow split pea · turmeric · butter bean · chilli', note: 'Dholl puri traced specifically to Bihar, griddled on a tawa rather than deep-fried, folded around Creole rougaille. Genuinely Indo-African-Creole rather than a marketing phrase.' }
      ],
      dishes: [
        { n: 'Doubles', p: 'Trinidad', cls: 'vegan', d: 'Curried channa between two fried bara with tamarind, cilantro sauce and kuchela. Descended from chana bhatura, reinvented on the street, named for customers asking to “double up” the bread. Nothing to adapt.' },
        { n: 'Dholl puri', p: 'Mauritius', cls: 'vegan', d: 'Split-pea-stuffed flatbread cooked dry on a tawa, folded around rougaille and butter-bean curry.' },
        { n: 'Dhalpuri roti', p: 'Trinidad · Guyana', cls: 'vegan', d: 'Ground split peas worked into the dough itself. Check the dough fat is plant-based and it is done.' },
        { n: 'Baigan choka', p: 'Trinidad · Guyana', cls: 'vegan', d: 'Fire-roasted aubergine mashed down with garlic and chilli.' },
        { n: 'Seven curry', p: 'Guyana', cls: 'vegan', d: 'Seven vegetable and legume curries served on a leaf at Hindu religious functions. Devotional food before it is a menu item.' },
        { n: 'Gateau piment', p: 'Mauritius', cls: 'vegan', d: 'Split-pea and chilli fritters off the street cart.' },
        { n: 'Pholourie & saheena', p: 'Trinidad', cls: 'vegan', d: 'Split-pea and dasheen-leaf fritters, fried and dipped in tamarind.' },
        { n: 'Bean-curry bunny chow', p: 'Durban', cls: 'forward', d: 'A hollowed quarter-loaf filled with curry — the form apartheid law produced, because non-white workers were barred from eating inside. The bean and lentil fillings are the Gujarati vegetarian line, not a modern swap.' },
        { n: 'Pelau', p: 'Trinidad', cls: 'adapt', d: 'The browned-sugar and coconut-milk base is plant-based; the dish is built on meat and butter. A vegetable version is an adaptation.' },
        { n: 'Kheer & gulab jamun', p: 'Indo-Caribbean festivals', cls: 'adapt', d: 'Hindu festival sweets are dairy-based by design. Coconut and cashew versions are adaptations — never “traditional vegan.”' }
      ],
      craftT: 'Rations set the technique, not recipes',
      craftB: 'Bara — the fried bread in doubles — was originally ground urad dal and shifted to wheat flour because wheat was cheaper. Indenture-era Mauritian chutney was crushed onion, salt and chilli, a fraction of mainland India’s spice architecture. Buss-up-shut is paratha, renamed for its torn shape. Nearly every adaptation in this volume traces to economic constraint under contract rather than free culinary choice — and the technique that came out of it is now the technique.',
      adapt: [
        'Hindu vegetarianism is not veganism. It permits dairy and ghee, and festival cooking depends on them. A vegan prasad is an adaptation, labelled as one.',
        'Jain practice avoids meat, eggs and often root vegetables while still permitting dairy. It predates Western veganism and is not a version of it.',
        'Muslim Indo-Caribbean Eid and Ramadan food is largely meat-based. There is no pre-existing vegan dish to “find” here — only an adaptation to declare.',
        'Name the specific tradition: Trinidadian doubles, Mauritian dholl puri, Durban bunny chow, Guyanese seven curry. Never generic “curry” branding.',
        'Siddi foodways are under-documented and the community is materially marginalised. Fund community-led oral history and pay knowledge-holders before publishing anything.'
      ],
      labourT: 'Caste, contract and who was allowed to sit down',
      labourB: 'Bunny chow got its shape because apartheid law barred Black and Indian workers from eating inside restaurants, and its name from “bania,” the merchant caste that sold it — passenger-Indian merchants and indentured-descended labourers were never the same people. Colonial hierarchy in East Africa placed Indian traders above Black Africans and below white settlers, and ended in the 1972 expulsion of 80,000 people from Uganda. Any exchange narrative that skips the hierarchy is marketing.',
      sov: 'Split pea, chickpea, pigeon pea, rice, turmeric, tamarind, coconut, cumin, coriander and chilli carry this entire volume — and every one grows in a Root Life-scale plot or greenhouse. Legumes run 15–25 g protein per cooked cup, and the tamarind, chilli, citrus and mango sitting beside them in traditional condiments are already the vitamin C that carries the iron. A doubles or dholl-puri cart has the lowest equipment barrier of any model in the Codex — a tawa, a karahi and a pot. The open question is who holds the recipe when it scales, and whether the elders carrying it are on the cap table.' },

    { id: 'italy', name: 'Afro-Italy & the Black Mediterranean', sub: 'Arab Sicily · gastrofascism · the harvest fields', c1: '#4E5B2E', c2: '#374220', tint: '#E7EBDA', ink: '#4E5B2E', ev: 'historical',
      hook: 'Five thousand years of Mediterranean exchange, then a fascist food empire, then a generation of Italian-born Africans still waiting on citizenship — all of it in one plate of berbere-spiced pasta.',
      lede: 'Not a story of spices sprinkled onto pasta. Grain, legumes and technique moved across the central Mediterranean for millennia through Carthaginian trade and Arab Sicily; then Italian colonialism in Eritrea, Ethiopia, Somalia and Libya used food as an instrument of conquest; and then African migrants and their Italian-born children rebuilt Italian food culture from below, often while harvesting the fields of a country that will not naturalise them.',
      stats: [{ n: '9th–11th c.', l: 'Arab and Amazigh rule reshaping Sicily' }, { n: '1937–41', l: 'wheat-autarky campaign in occupied Ethiopia' }, { n: '8.9%', l: 'of Italian residents were foreign nationals, Jan 2024' }, { n: '~100,000', l: 'farmworkers exposed to caporalato exploitation' }],
      zoneTitle: 'Four eras, four kinds of contact', zoneSub: 'Trade, conquest, occupation and migration are not the same event. The Codex refuses to file them all under “fusion.”',
      zones: [
        { z: 'Ancient Mediterranean basin', crops: 'Durum wheat · barley · lentil · chickpea · olive · fig', note: 'Phoenician and Carthaginian networks moved grain and legumes across the basin before Rome held power. Sicily fed the imperial city on agriculture it partly inherited from North Africa.' },
        { z: 'Arab & Amazigh Sicily', crops: 'Durum pasta · rice · citrus · sugar cane · couscous', note: 'Irrigation, rice paddies and sugar transformed the island permanently between the ninth and eleventh centuries. Cuscusu is still cooked on the Sicilian side of the same channel.' },
        { z: 'Italian East Africa', crops: 'Hybrid wheat · pasta · espresso · berbere', note: 'Asmara built as “Piccola Roma” with segregated dining rooms. Fascist agronomists pushed hybrid wheat into the Ethiopian highlands on indigenous farming knowledge they did not credit, while requisitioning local grain.' },
        { z: 'Somali & Libyan coasts', crops: 'Spaghetti · rice · couscous · cardamom', note: 'Baasto entered an already rice-forward Somali system rather than replacing it. Libyan couscous and legume cooking predates Italian arrival by centuries and outlasted it — the influence runs the other way.' },
        { z: 'Contemporary Italy', crops: 'Tomato · collard · teff · fonio · coffee', note: 'Milan’s Porta Venezia — “Asmarina” — and Rome’s Ostiense anchor an Eritrean and Ethiopian food economy built by families. Around one restaurant in twenty nationally is ethnic-owned; in Lombardy it is close to 27%.' }
      ],
      dishes: [
        { n: 'Pasta e ceci', p: 'Central Italy', cls: 'vegan', d: 'Pasta and chickpeas out of cucina povera. Plant-based by economics, centuries before it was a diet.' },
        { n: 'Farinata', p: 'Liguria', cls: 'vegan', d: 'Chickpea-flour flatbread baked in a wood oven. Nothing removed, nothing substituted.' },
        { n: 'Panelle', p: 'Sicily', cls: 'vegan', d: 'Chickpea fritters sold on the street — a legume technique with close North African kin.' },
        { n: 'Cuscusu trapanese', p: 'Western Sicily', cls: 'vegan', d: 'Vegetable couscous, directly adopted from North Africa rather than “inspired by” it.' },
        { n: 'Pizza marinara', p: 'Naples', cls: 'vegan', d: 'Garlic, oregano, tomato. The original poor person’s pizza — the cheese came later.' },
        { n: 'Zighinì with injera', p: 'Eritrea · Ethiopia', cls: 'vegan', d: 'Berbere lentil stew on fermented teff. The dish colonial menus excluded from their own dining rooms, now served across Milan and Rome.' },
        { n: 'Baasto with tomato & cardamom', p: 'Somalia', cls: 'forward', d: 'Spaghetti absorbed into a Somali spice architecture and eaten with ripe banana alongside. Colonial-era import, Somali dish.' },
        { n: 'Eritrean-style lasagna', p: 'Eritrea · Ethiopia', cls: 'recon', d: 'Reclaimed after independence, spiced with berbere, served at celebrations. Postcolonial reclamation born of occupation — not “cultural exchange.”' },
        { n: 'Teff polenta with mushroom ragù', p: 'Contemporary', cls: 'contemp', d: 'Italian stirring technique, Ethiopian and Eritrean grain. Invented recently. No historical dish is being claimed.' },
        { n: 'Fonio risotto', p: 'Contemporary', cls: 'contemp', d: 'West African grain, Italian stock-and-stir method. Contemporary fusion, said on the card.' },
        { n: 'Collard pesto pasta', p: 'Contemporary', cls: 'contemp', d: 'African American greens tradition meeting Ligurian pesto technique. Two credited sources, no invented lineage.' }
      ],
      craftT: 'Gastrofascism is a food history, not a metaphor',
      craftB: 'Between 1937 and 1941 the fascist administration ran wheat-autarky campaigns to turn occupied Ethiopia into an imperial breadbasket, deploying Italian agronomists onto indigenous farming systems while requisitioning grain and livestock for the military. Colonial menus and company feasts staged racial hierarchy at the table. Eritreans and Ethiopians then took the same pasta, spiced it with berbere and re-rooted it — agency under occupation, which is a different thing from friendly exchange.',
      adapt: [
        'Name colonialism where it happened. “Cultural exchange” is the wrong phrase for requisitioned grain and segregated dining rooms.',
        'Keep four labels apart: traditional dish, colonial imposition, postcolonial reclamation, contemporary fusion. Eritrean lasagna is the third, not the fourth.',
        'Teff polenta, fonio risotto, berbere focaccia and jollof arancini have no historical record. They are inventions and are sold as inventions.',
        'Coffee is Ethiopian before it is Italian. Espresso culture was built partly on beans taken out of occupied East Africa — source it from African cooperatives and say why.',
        'Cashew ricotta, oat béchamel and nutritional yeast are modern vegan adaptations. Neither Italy nor Africa cooked them.',
        'Never call an injera-style crêpe injera. Injera is a specific fermented teff bread with a specific home.'
      ],
      labourT: 'Who picked the tomatoes',
      labourB: 'The caporalato gangmaster system overwhelmingly exploits Sub-Saharan African workers harvesting tomato, citrus and grape across Puglia, Basilicata, Calabria and Sicily — roughly 100,000 people facing conditions from skimmed wages to informal settlements without water or power. Yvan Sagnet’s 2011 Puglia strike, called after a fellow worker collapsed in the heat and was refused help, became the landmark of Italian anti-caporalato organising and led to worker cooperatives that now sell direct to Italian households. Tomato sourcing is a labour-justice question before it is a flavour one.',
      sov: 'Italian citizenship remains jus sanguinis: children born in Italy to non-citizen parents do not receive it at birth, leaving an estimated million-plus second-generation residents outside full citizenship well into adulthood. That is not only a civil-rights matter — business licensing, credit access and long-term investment security all run through legal status, which means a menu cannot be called “authentic” while ignoring the legal standing of the people who grow and cook it.' }
  ];

export const pantryVols = [
    { id: 'grains', name: 'Grains & Pseudograins', sub: 'Fonio · teff · sorghum · millet · African rice · maize', c1: '#8A6A22', c2: '#6B5015', tint: '#F2E9CF', ink: '#7E5124', ev: 'historical',
      hook: 'Africa domesticated five of the world’s great cereals in one corridor — and the Green Revolution funded almost none of them.',
      lede: 'The Nubian Nile through the Sahel to the Ethiopian highlands produced sorghum, pearl millet, finger millet, fonio and teff independently of the Fertile Crescent and East Asia. Grain surplus underwrote the Sahelian states, trans-Saharan trade and craft specialisation — and grain has been an instrument of state power in every era since: granary taxation, colonial cash-cropping, plantation rations, and a Green Revolution that concentrated breeding investment in wheat and rice while filing African cereals as “orphan crops.”',
      stats: [{ n: '5', l: 'cereals domesticated in the African corridor' }, { n: '12.5 cm', l: 'annual rain pearl millet survives on' }, { n: '2018', l: 'the Dutch teff patent finally voided' }, { n: '45', l: 'water-control structures found at Eagles Island' }],
      famT: 'Six lineages, six domestication events', famS: 'Grouped by where the plant was actually domesticated — not by which colonial market later sold it.',
      fams: [
        { z: 'African cereals', crops: 'Fonio · teff · sorghum · pearl & finger millet · Oryza glaberrima', note: 'Fonio was domesticated twice as two separate species with no gene flow between them, per 2025 genomic work. Sorghum needs 40 cm of annual rain to maize’s 50 and runs C4 photosynthesis. African rice was domesticated in the Inland Niger Delta entirely separately from Asian rice.' },
        { z: 'Indigenous American', crops: 'Maize · amaranth · quinoa · wild rice · chia', note: 'Maize from teosinte in the Balsas valley ~9,000 years ago, inside the milpa system. Wild rice is Zizania palustris — a different genus from both rices — and Anishinaabe treaty rights attach specifically to lake-harvested grain, not the paddy commodity crop.' },
        { z: 'Asian grains', crops: 'Oryza sativa · foxtail & proso millet · Job’s tears · buckwheat', note: 'Asian rice reached the Swahili coast and Madagascar through Indian Ocean trade well before the Atlantic slave trade — so African rice history is layered, not sequential.' },
        { z: 'Mediterranean & European', crops: 'Emmer · einkorn · durum · barley · rye · oats', note: 'Roman North Africa was an imperial breadbasket. Colonial administrations later pushed wheat across sub-Saharan Africa and the Caribbean, embedding wheat bread as an urban status food at indigenous cereals’ expense.' },
        { z: 'Diaspora porridges & breads', crops: 'Injera · ogi · kenkey · ugali · grits · polenta · bammy', note: 'One technique family, many names: fermented maize and sorghum porridges run from West African ogi and kenkey to Southern African pap, sadza and nshima to Lowcountry grits.' },
        { z: 'Northeast-feasible', crops: 'Sorghum · proso millet · buckwheat · oats · rye · flint maize', note: 'Short-season dryland cereals that actually finish in a Massachusetts summer. Teff and fonio are trial-plot crops here, not production crops.' }
      ],
      entries: [
        { n: 'Fonio', p: 'Digitaria exilis / D. iburua', cls: 'staple', d: 'Thrives on poor sandy Sahelian soil with minimal rain. Dehulling, washing and steaming is punishing manual work that has always fallen to women — the reason its market never scaled despite ceremonial prestige. The “ancient grain” boom has not resolved farmer compensation.' },
        { n: 'Teff', p: 'Eragrostis tef', cls: 'caution', d: 'Ethiopian and Eritrean highland grain, base of injera. A Dutch company patented teff flour processing in Europe; the patent was voided in the Netherlands in 2018 after an Ethiopian-led challenge. Ethiopia now restricts raw grain export to protect domestic supply — source accordingly.' },
        { n: 'Sorghum', p: 'Sorghum bicolor', cls: 'staple', d: 'Among the most drought- and heat-tolerant staples on earth. Carried to the American South by enslaved Africans, where sorghum syrup entered Southern foodways.' },
        { n: 'Pearl millet', p: 'Pennisetum glaucum', cls: 'staple', d: 'Roughly 90% of West and Central African millet production, surviving on as little as 12.5 cm of rain a year.' },
        { n: 'African rice', p: 'Oryza glaberrima', cls: 'staple', d: 'Grown in floodplain, mangrove and tidal systems built and largely controlled by West African women. Displaced commercially by Asian varieties but retains flood tolerance and weed competitiveness worth conserving.' },
        { n: 'Maize + nixtamalization', p: 'Zea mays', cls: 'proven', d: 'Alkaline cooking releases bound niacin and improves amino-acid balance. Its absence outside Mesoamerica is directly linked to pellagra epidemics in the U.S. South, Italy and parts of Africa. This is settled nutrition science, not folklore.' },
        { n: 'Quinoa', p: 'Chenopodium quinoa', cls: 'caution', d: 'Andean, Aymara and Quechua. The post-2000s export boom brought income to some Bolivian altiplano communities while eroding communal ayllu land governance and pushing local diets toward cheaper processed food as prices rose.' },
        { n: 'Wild rice', p: 'Zizania palustris', cls: 'caution', d: 'Sacred and dietary staple of Anishinaabe nations, canoe-harvested. Paddy-grown “wild rice” from non-Native growers is a different product and an active seed-sovereignty dispute. Label the source or do not sell it.' },
        { n: 'Gluten-free framing', p: 'Clinical', cls: 'proven', d: 'Celiac disease, wheat allergy and non-celiac gluten sensitivity are real but narrow. A population-wide gluten-free diet has no proven benefit and usually cuts fibre, iron, zinc and B vitamins — unless it is rebuilt on teff, fonio, sorghum, millet, rice and maize, which is exactly what this volume is for.' }
      ],
      craftT: 'Fermentation and cooling are the two techniques that change the nutrition',
      craftB: 'Traditional grain fermentation — injera’s teff ferment, ogi, kenkey, mahewu — lowers phytate, raises mineral bioavailability and adds organic acids that extend shelf life without refrigeration. Cooking and then cooling starch converts a portion to resistant starch, which behaves more like fibre than sugar. Neither is a modern intervention: both are the default in the traditions this volume documents, and both are usually stripped out when a grain is industrially milled and instant-ised for export.',
      safeT: 'Aflatoxin, pellagra and storage', safeB: 'Poorly stored maize in humid climates carries real aflatoxin risk. Non-nixtamalized maize-dependent diets caused endemic pellagra until fortification and diversification. Neither is a historical curiosity where storage infrastructure is thin.',
      standards: [
        'Say which rice. African rice and Asian rice are separate domestications with separate histories; “rice” alone erases the Inland Niger Delta.',
        'The Carolina and Georgia rice economy was built on the coerced expertise of enslaved West Africans, overwhelmingly women. Judith Carney’s work reframed this from “contribution” to technical authorship. Do not soften it back.',
        'Never sell teff or fonio as a generic “ancient grain” without naming the origin community and the compensation arrangement.',
        'Wheat displacement is policy, not preference. Jamaica’s bammy industry nearly collapsed under Canadian-subsidised wheat imports in the early 1990s until FAO intervention revived small-scale production.',
        'Gluten-free is a clinical category, not a virtue. Say which condition it serves.'
      ],
      grow: 'Sorghum, proso millet, buckwheat, rye and flint maize all finish inside a Northeast season and mill on household or co-op equipment. A community mill is the highest-leverage single asset in this volume: it converts a commodity crop into a value-added local product and keeps the margin in the co-op rather than the export chain. Teff and fonio belong in trial plots for seed-keeping and education, not in the revenue model.' },

    { id: 'legumes', name: 'Legumes & Plant Protein', sub: 'Cowpea · Bambara · pigeon pea · groundnut · dal', c1: '#5B4A7A', c2: '#40325B', tint: '#E6E2F0', ink: '#4A3B68', ev: 'strong',
      hook: 'The only crop family that feeds the person and the soil in the same season — 15–25 g of protein per 100 g dry, and up to 354 kg of nitrogen per hectare a year.',
      lede: 'Legumes are the deepest continuous thread between Afro-Indigenous foodways, soil health and physical survival, and they refuse to be reduced to “protein sources.” Cowpea, Bambara groundnut, African yam bean and marama were domesticated in Africa; common beans, limas, teparies and peanuts by Indigenous peoples of the Americas; chickpea, lentil and fava in the Fertile Crescent; soy and mung in East and South Asia. Nearly every major Black diasporic cuisine has a defining bean-and-grain dish that braids at least two of those origins together.',
      stats: [{ n: '15–25 g', l: 'protein per 100 g dry weight' }, { n: '73–354', l: 'kg N/ha/yr fixed by cowpea' }, { n: '74%', l: 'of world Bambara from Burkina, Niger, Cameroon' }, { n: '18–24%', l: 'crude protein in Bambara groundnut' }],
      famT: 'Four domestication regions, one plate', famS: 'Hoppin’ John, feijoada, githeri, doubles and misir wot each braid an African legume or technique with a crop from somewhere else. The braid is the point.',
      fams: [
        { z: 'African domestications', crops: 'Cowpea · Bambara groundnut · African yam bean · marama', note: 'Cowpea came out of the Sahel with possible independent East African domestication, established from the Mediterranean to Southeast Asia by 400 BCE. Both seeds and tender leaves are eaten across West Africa.' },
        { z: 'Indigenous American', crops: 'Common bean · lima · tepary · peanut', note: 'The Three Sisters — maize trellis, nitrogen-fixing bean, weed-suppressing squash — is Haudenosaunee and broader Indigenous agroecology predating industrial agronomy by centuries.' },
        { z: 'Fertile Crescent & Asia', crops: 'Chickpea · lentil · fava · soy · mung', note: 'Lentils and favas anchor Ethiopian misir wot and shiro. Fava fixes the widest nitrogen range of any legume surveyed, 45–552 kg/ha/yr.' },
        { z: 'The shared corridor', crops: 'Pigeon pea', note: 'Most likely domesticated in peninsular India, but cultivated in East Africa for so long it is genuinely shared rather than borrowed. Gungo peas in the Caribbean, toor dal in India, githeri-adjacent stews in Kenya.' },
        { z: 'Orphan crops', crops: 'Bambara · African yam bean · marama', note: 'Neglected by formal breeding, sustained by women farmers’ informal seed systems. Marama has never been domesticated at all — it is still gathered by Khoisan communities on Kalahari sands.' },
        { z: 'Northeast-feasible', crops: 'Bush & pole beans · peas · favas · cowpea · edamame', note: 'Cool-season favas and peas as greenhouse nitrogen builders; cowpea as the rotational nitrogen crop between heavy feeders. Pigeon pea is not winter-hardy here and needs annual reseeding.' }
      ],
      entries: [
        { n: 'Cowpea / black-eyed pea', p: 'Vigna unguiculata', cls: 'staple', d: 'Sahelian domestication, drought-tolerant, quick to mature, among the highest nitrogen fixers of any food legume. Carried directly with enslaved Africans into the Caribbean and U.S. Southeast, where it became Hoppin’ John, and akara and moi moi in West Africa.' },
        { n: 'Bambara groundnut', p: 'Vigna subterranea', cls: 'staple', d: 'Nutritionally near-complete — 51–71% carbohydrate, 18–24% protein, meaningful fibre. The hard seed coat means long cooking, which is the real barrier to uptake; pressure cooking and pre-soaking solve it.' },
        { n: 'African yam bean', p: 'Sphenostylis stenocarpa', cls: 'gap', d: 'Dual-purpose: edible seeds and edible tubers, 19–25%+ seed protein with genotype-dependent iron, zinc and selenium. Revival needs breeding, farmer education and market development together — one alone does nothing.' },
        { n: 'Marama bean', p: 'Tylosema esculentum', cls: 'caution', d: 'Khoisan staple of the Kalahari, never formally domesticated. Any commercialisation must place Khoisan knowledge-holders as co-owners, not subjects — Southern Africa has already run the Hoodia experiment.' },
        { n: 'Pigeon pea', p: 'Cajanus cajan', cls: 'staple', d: 'Short-lived perennial, strongly drought-tolerant, fixes 168–280 kg N/ha/yr. Works as a living nitrogen-fixing hedge for years without replanting in warm zones.' },
        { n: 'Peanut / groundnut', p: 'Arachis hypogaea', cls: 'staple', d: 'Domesticated in South America, carried to West Africa by Portuguese traders, absorbed into existing Bambara-groundnut systems — which is why the two get confused to this day — then reintroduced to the Americas by enslaved Africans.' },
        { n: 'Kidney beans & lectins', p: 'Phaseolus vulgaris', cls: 'caution', d: 'Phytohaemagglutinin causes acute poisoning in undercooked kidney beans and is not reliably destroyed in a slow cooker. Soak, discard the water, and boil hard for at least ten minutes. This is the one non-negotiable in the volume.' },
        { n: 'Soy', p: 'Glycine max', cls: 'proven', d: 'The evidence does not support the feminisation and cancer-risk folklore attached to it. It also does not support treating soy as a miracle. It is one good protein among several — and it reached Africa recently through development programmes, so it is not ancestral there.' },
        { n: 'Legume leaves', p: 'Cowpea · sweet potato · pumpkin', note: '', cls: 'staple', d: 'The whole-plant use that Western agronomy consistently forgets to count: cowpea leaves are eaten across West Africa and carry iron and folate the seed does not.' }
      ],
      craftT: 'Soak, sprout, ferment, boil — in that order',
      craftB: 'Digestibility and safety are functions of preparation, not species. Soaking, sprouting and fermentation cut phytates and raise mineral availability; a hard boil destroys phytohaemagglutinin. Building digestive tolerance is gradual and real — starting with small portions of well-soaked, well-cooked legumes and increasing over weeks lets the gut microbiome adapt, which is why “beans give me trouble” is usually a ramp problem rather than an intolerance. Pair with the vitamin C already sitting in the traditional condiment — tamarind, chilli, citrus, tomato — and non-haem iron absorption rises substantially.',
      safeT: 'The lectin rule', safeB: 'Raw and undercooked kidney beans cause acute food poisoning. Slow cookers do not reach the temperature needed. Soak, discard the soaking water, and boil hard for at least ten minutes before any long simmer. No exceptions and no shortcuts for any recipe generated in this app.',
      standards: [
        'Cowpea, Bambara, African yam bean and marama are African domestications and belong in the record as such — not as generic “beans.”',
        'Forced migration is not the same as trade. Cowpeas crossed the Atlantic in provisioning cargoes with enslaved people; chickpeas crossed with indentured labourers in 1838. Different contracts, different histories.',
        'Marama and other wild-gathered legumes require benefit-sharing agreements before any commercial pathway opens.',
        'Legumes are not interchangeable with mushrooms as a protein source. Say so on every product that implies otherwise.',
        'Nitrogen figures are ranges, not promises — they depend on rhizobial strain, inoculation and soil. Publish the range.'
      ],
      grow: 'This is the strongest volume in the pantry for Root Life-scale production. Bush beans, cowpeas and peas succeed in confined root zones and raised beds; cowpea or soy rotates nitrogen between heavy feeders; favas and peas build nitrogen in greenhouses between cash crops; and bush beans germinate fast enough to hold a school garden’s attention, with visible root nodules as the lesson. Inoculate container and soil-block mixes that lack native rhizobia, and replant with inoculated seed where nodules fail to form.' },

    { id: 'fungi', name: 'Culinary & Functional Mushrooms', sub: 'Oyster · lion’s mane · Termitomyces · claim ethics', c1: '#6B4A3A', c2: '#4C3327', tint: '#EDE0D8', ink: '#6B4A3A', ev: 'moderate',
      hook: 'A separate kingdom of life, a low-land high-value crop — and the single easiest place in this app to make a medical claim the evidence does not carry.',
      lede: 'Fungi are neither plants nor animals: no chlorophyll, chitin cell walls, nutrients absorbed externally after enzymes are secreted onto the substrate. That chitin is why mushroom fibre behaves differently from plant fibre. Culinary mushrooms are genuinely valuable — fibre, B vitamins, minerals, beta-glucans, ergothioneine, and vitamin D2 after UV exposure — and they are categorically not a substitute for legumes as a primary protein source. This volume separates cultivation reality from marketing, and grades every medicinal claim.',
      stats: [{ n: '10–15 d', l: 'oyster colonisation, 5–7 days to fruit' }, { n: '3–5 wk', l: 'lion’s mane colonisation' }, { n: '<600 ppm', l: 'CO₂ ceiling for good oyster fruiting' }, { n: '40 lb/wk', l: 'the five-year cooperative target' }],
      famT: 'Grouped by what they actually do for the co-op', famS: 'Cultivation reliability and culinary use first; extract-only species kept firmly separate from table mushrooms.',
      fams: [
        { z: 'Production workhorses', crops: 'Blue, pearl, phoenix, pink, golden & king oyster', note: 'The most forgiving gourmet group on earth — broad substrate tolerance, 20–30°C, fast colonisation and strong biological efficiency. Blue oyster carries the 30 lb/week baseline because it is cold-tolerant and hardy in variable indoor climates.' },
        { z: 'Premium slower crops', crops: 'Lion’s mane · bear’s head tooth', note: 'Supplemented hardwood sawdust, full sterilisation at 121°C, 3–5 weeks to colonise, cooler 16–22°C fruiting. Harvest while the spines are still white. Premium price, more disciplined sterile technique.' },
        { z: 'Other cultivated culinary', crops: 'Shiitake · maitake · chestnut · pioppino · enoki · wood ear', note: 'Shiitake indoors on sawdust blocks runs 6–8 weeks against 6–12 months on logs. Wood ear and snow fungus dry and rehydrate well, which makes them shelf-stable product lines rather than fresh sales.' },
        { z: 'Extract-only, never a table mushroom', crops: 'Reishi · turkey tail · cordyceps', note: 'Woody, leathery or grain-substrate species that belong in teas, tinctures and powders. Selling them as food is a category error before it is an ethics problem.' },
        { z: 'Uncultivable at scale', crops: 'Chanterelle · porcini · morel · Termitomyces', note: 'Mycorrhizal species need living host trees. Termite mushrooms are obligate symbionts of fungus-growing termites and cannot be grown apart from the colony. These are curriculum content, not crops.' },
        { z: 'Circular inputs', crops: 'Hardwood sawdust · straw · spent brewery grain · coffee grounds · cardboard', note: 'Each carries its own carbon-to-nitrogen ratio, sterilisation requirement and contamination profile. Spent substrate then feeds compost and vermiculture — but characterise salinity, heavy metals and pathogens before reuse.' }
      ],
      entries: [
        { n: 'Turkey tail (PSK/PSP)', p: 'Trametes versicolor', cls: 'proven', d: 'The strongest medicinal evidence in this volume: moderate-to-high-quality clinical trial support as a cancer adjunct, largely from Japan. That evidence is for standardised extracts alongside conventional treatment — not for tea, and never as a replacement for oncology care.' },
        { n: 'Lion’s mane', p: 'Hericium erinaceus', cls: 'prelim', d: 'Hericenones in the fruiting body, erinacines in the mycelium, under active neuroscience research. Promising and preliminary, dose- and duration-dependent. Culinarily it is the crab-cake and seafood-texture mushroom, which is reason enough to grow it.' },
        { n: 'Reishi & cordyceps', p: 'Ganoderma · Cordyceps militaris', cls: 'prelim', d: 'Claims remain largely preclinical or extrapolated from concentrated extracts rather than anything resembling a culinary serving. Sell the tea as tea.' },
        { n: 'Termitomyces', p: 'Termite mushrooms', cls: 'tradonly', d: 'The best-documented African mushroom tradition — vernacular names, rainy-season collection timing and traditional uses recorded across Cameroon, Namibia, Côte d’Ivoire, South Africa and Tanzania. Namibian communities process it into powders and pastes for ailments including diarrhoea: ethnographic record, not health guidance.' },
        { n: 'Diaspora mushroom foodways', p: 'Caribbean · Gullah Geechee · Afro-Brazilian', cls: 'gap', d: 'Not enough primary-source depth was found to support confident regional claims. That is an evidence gap, not an absence of tradition — and the honest move is to fund oral history with elders and market vendors rather than invent a generalised tradition.' },
        { n: 'Vitamin D2 from UV', p: 'All species', cls: 'proven', d: 'Ultraviolet exposure genuinely converts ergosterol to vitamin D2 in harvested mushrooms. One of the few functional claims here that survives scrutiny at a realistic serving size.' },
        { n: 'Shiitake dermatitis', p: 'Lentinula edodes', cls: 'caution', d: 'Undercooked shiitake causes a well-documented flagellate rash. Cook them through — this is a real and frequently reported reaction, not an allergy edge case.' },
        { n: 'Golden oyster spore load', p: 'Pleurotus citrinopileatus', cls: 'caution', d: 'Higher documented respiratory sensitivity among growers than other oysters. Worker protection is a production decision, made before the first tent goes up.' },
        { n: 'Wild foraged mushrooms', p: 'Any species', cls: 'caution', d: 'No AI, photograph or comparison chart can establish edibility. Deadly Amanita species resemble edible field mushrooms to untrained eyes. Positive identification requires a regional expert holding the physical specimen. Any uncertainty means do not eat it.' }
      ],
      craftT: 'Culture, spawn, colonisation, pinning, fruiting',
      craftB: 'Every protocol in this volume is the same five-step lifecycle. Tissue cloning from a small piece of fruiting body onto nutrient agar regenerates genetically identical mycelium and maintains a master culture; spawn carries that mycelium onto grain or sawdust; the substrate colonises white; a temperature drop, humidity rise and fresh air trigger pinning; fruiting follows. Contamination is a successional-ecology problem, not bad luck — primary decomposers need fresh substrate, and anything that got there first wins.',
      safeT: 'Wild mushroom policy — non-negotiable', safeB: 'This app will never identify a wild mushroom, confirm one from a photo, or suggest a wild specimen is safe. Species-level identification of a physical specimen by an experienced regional expert is the only acceptable path, and uncertainty always means discard.',
      standards: [
        'Grade every medicinal claim by tier and name the preparation studied. Extract-based trial evidence does not transfer to a bowl of sautéed mushrooms.',
        'Never position mushrooms as a protein substitute for legumes. They are a fibre, mineral and umami crop.',
        'Termitomyces ethnomycology is a strong anchor for African mushroom heritage. Everything beyond it gets labelled under-researched rather than filled in.',
        '“Functional” is a marketing word. Say what compound, what dose, what trial, what population.',
        'Spent substrate is a genuine circular asset and still needs characterisation before unrestricted reuse.'
      ],
      grow: 'Mushrooms are the lowest-land, highest-value entry into food sovereignty in this whole pantry — a two-tent system reaches the 30 lb blue oyster and 10 lb lion’s mane weekly targets on regionally available substrate, including spent brewery grain and coffee grounds that would otherwise be waste. Youth curriculum here should be grounded in fungal ecology and cultivation, explicitly not in wild foraging.' },

    { id: 'infusions', name: 'Herbal Infusions & Beverage Safety', sub: 'Hibiscus · rooibos · bush tea · claim ethics', c1: '#8F4230', c2: '#6B2F21', tint: '#F3DFD8', ink: '#8F4230', ev: 'moderate',
      hook: 'Traditional use, laboratory promise and clinical proof are three different things — and the drinks with the deepest cultural standing are sometimes the ones carrying the clearest risk signals.',
      lede: 'True tea means Camellia sinensis and nothing else. Everything beyond it — infusions, decoctions, macerations, ferments, and grain, root, bark, seed and fruit beverages — is a far larger universe with sharply different chemistry by plant part. This volume draws that line hard, because a leaf steeped just off boil and a root simmered for twenty minutes are not the same drug at all. Nothing here cures disease, detoxifies, balances hormones or replaces treatment.',
      stats: [{ n: '5–10', l: 'mmHg systolic drop shown for hibiscus' }, { n: '26 RCTs', l: 'in the 2025 hibiscus dose-response meta-analysis' }, { n: '~1 g/day', l: 'the studied ginger dose for nausea' }, { n: '9 tiers', l: 'in the evidence hierarchy applied here' }],
      famT: 'By tradition, then by risk', famS: 'Cultural standing and safety are separate axes. A drink can be centuries old and still require a warning.',
      fams: [
        { z: 'West Africa & the Sahel', crops: 'Bissap · baobab · ginger · tamarind · kinkeliba', note: 'Kinkeliba leaf decoction is used across Senegal, Mali and Burkina Faso, with early clinical work comparing it to hibiscus decoction for hypertension. Grain and tamarind drinks suit arid climates and long storage.' },
        { z: 'Horn of Africa & North Africa', crops: 'Buna coffee · spiced tea · Maghrebi mint', note: 'The Ethiopian buna ceremony; shared spiced coffee culture with Yemen across the Red Sea corridor; and North African mint tea, which is Chinese green tea leaf brought in by Saharan trade and folded into Maghrebi hospitality.' },
        { z: 'Southern Africa', crops: 'Rooibos · honeybush', note: 'Fermented, caffeine-free infusions rooted in Khoisan botanical knowledge long before European settlement and commercialisation — a benefit-sharing question, not just a product.' },
        { z: 'African American', crops: 'Sassafras · sweet tea · shrubs · molasses drinks · mint · sage', note: 'Middle Passage plant knowledge combined with Indigenous American and settler practice. Fruit shrubs preserved fruit before refrigeration; molasses drinks repurposed a sugar-refining byproduct. Restricted Hoodoo and conjure formulas are deliberately not documented here.' },
        { z: 'Caribbean bush tea', crops: 'Cerasee · guinea hen weed · soursop leaf · sorrel · fever grass', note: 'Strong family and island specificity. Not all bush medicine is safe because it is traditional — several widely used plants carry documented reproductive or neurological risk signals.' },
        { z: 'Afro-Latin & Indigenous', crops: 'Cacao · yerba mate · guayusa · chicha', note: 'Cacao is Indigenous Mesoamerican, later worked into Afro-Brazilian and Afro-Colombian foodways through the labour of enslaved and free Black communities on cacao plantations. Maroon and quilombola forest-botanical knowledge is community-held and documented here only where already published.' }
      ],
      entries: [
        { n: 'Hibiscus', p: 'Hibiscus sabdariffa', cls: 'proven', d: 'Bissap, karkade, sorrel — one lineage across three continents. Multiple RCTs and meta-analyses show a modest 5–10 mmHg systolic reduction in mild-to-moderate hypertension. Therapeutic dosing is 1–2 g of calyx extract or several cups daily; a heavily sweetened festive glass is a different thing, and the sugar works against the benefit.' },
        { n: 'Ginger', p: 'Zingiber officinale', cls: 'proven', d: 'The strongest pregnancy-specific evidence here: multiple RCTs and systematic reviews for nausea and vomiting of pregnancy, listed by ACOG as a reasonable non-pharmacologic option at around 1 g/day divided across servings. Theoretically anticoagulant — caution near labour and with blood thinners.' },
        { n: 'Turmeric', p: 'Curcuma longa', cls: 'prelim', d: 'Curcumin has poor natural bioavailability and nearly all research uses standardised, piperine- or lipid-formulated extracts far above what a cup of golden milk delivers. Independent testing has also found heavy-metal adulteration in some commercial turmeric supply chains. Culinary quantities are broadly safe; supplement doses carry gallbladder and bleeding concerns.' },
        { n: 'Rooibos & honeybush', p: 'Aspalathus · Cyclopia', cls: 'tradonly', d: 'Caffeine-free, pleasant, culturally significant. The health claims stacked onto them commercially outrun the evidence.' },
        { n: 'Soursop leaf', p: 'Annona muricata', cls: 'caution', d: 'Neurotoxicity signals from Guadeloupe cohort studies. Not recommended as a routine or therapeutic beverage, regardless of the cancer-support claims circulating online.' },
        { n: 'Guinea hen weed', p: 'Petiveria alliacea', cls: 'caution', d: 'Lab and animal data only, no robust human trials, and a uterine-stimulant profile that makes pregnancy avoidance essential. Effective dose is simply unknown.' },
        { n: 'Cerasee', p: 'Momordica charantia', cls: 'caution', d: 'Small human trials exist on bitter melon extracts but none on cerasee tea specifically. Hepatotoxicity risk at high or frequent doses; avoid in pregnancy.' },
        { n: 'Sea moss', p: 'Chondrus / Eucheuma', cls: 'caution', d: 'Nutritional data is solid; the therapeutic claims are largely unproven. Iodine excess is a genuine risk and heavy-metal content varies with the water it grew in.' },
        { n: 'Cassia vs. true cinnamon', p: 'Cinnamomum cassia / verum', cls: 'caution', d: 'Most “cinnamon” sold in North America is cassia, which carries far higher coumarin — liver-relevant at high chronic doses. A naming problem with a clinical tail.' },
        { n: 'Sun tea', p: 'Any leaf', cls: 'caution', d: 'Passive solar steeping at 21–38°C for hours is ideal bacterial growth conditions, with cases linked to E. coli. Hot-brew then chill, and refrigerate immediately.' }
      ],
      craftT: 'Plant part decides the method, and the method decides the dose',
      craftB: 'Boiling water suits tough roots and barks but destroys the volatile aromatics in mint and lemongrass, which want just off boil under a lid — covering the vessel is what keeps the oils in the cup rather than in the air. Particle size changes extraction speed and therefore effective dose: powdered material is a stronger preparation than whole leaf at the same weight. Fresh-brewed herbal beverages without preservatives or high acidity need refrigeration and a 24–72 hour window; commercial scaling needs pH control or pasteurisation.',
      safeT: 'One common name, several species', safeB: 'Caribbean sorrel is Hibiscus sabdariffa, not European sorrel (Rumex acetosa). West Indian bay is Pimenta racemosa, not bay laurel. “Bush mint” is a folk category spanning Mentha, Hyptis and Ocimum. Every ingredient needs scientific-name verification before sourcing or publication — this is the single highest-frequency safety failure in herbal beverage work.',
      standards: [
        'Any claim below “small human clinical trial” is labelled preliminary. No exceptions for cultural standing.',
        'State the preparation, dose and plant part actually studied, and flag when household use is weaker than the tested intervention.',
        'Traditional use is a real category of knowledge and not a substitute for safety data. Both go on the card.',
        'Hibiscus, baobab, rooibos, ginger and cacao are all commodity chains historically extracted from Black and Indigenous labour with minimal grower value capture. Sourcing transparency is part of the claim.',
        'Restricted ritual knowledge stays out of the database. Publicly documented culinary custom only.'
      ],
      grow: 'Hibiscus, ginger, tulsi, lemongrass, mint and lemon balm all grow at Root Life scale in Northeast beds and greenhouses, and dry and mill into shelf-stable products with modest equipment. Drying, milling and storage discipline — moisture control, light exclusion, labelled harvest dates — is what separates a co-op tea line from a farmers-market side table.' },

    { id: 'liquid', name: 'Liquid Nutrition', sub: 'Smoothies · juices · electrolytes · claim ethics', c1: '#2E6B7A', c2: '#1E4C57', tint: '#DCEAEE', ink: '#2E6B7A', ev: 'strong',
      hook: 'Fiber is the variable that decides everything — and the viral claim that blending fruit “quadruples” its glycemic hit is the exact opposite of what the study found.',
      lede: 'No beverage format is universally superior. Juicing removes insoluble fibre and concentrates sugars and micronutrients into a small volume; blending keeps the whole matrix, giving lower glycemic impact, more satiety and more total nutrients per serving at lower concentration per millilitre. Seventeen beverage classes are held apart here because conflating them produces unsafe substitutions — most seriously, a homemade electrolyte drink standing in for a clinical oral rehydration solution during real illness.',
      stats: [{ n: '17', l: 'beverage classes, kept distinct' }, { n: '3–10 g', l: 'fibre in a smoothie · 0–1 g in juice' }, { n: 'n=20', l: 'in the trial behind the blending claim' }, { n: '24 hr', l: 'fridge life before real vitamin C loss' }],
      famT: 'Classes, not vibes', famS: 'A green smoothie and a vegetable juice share an ingredient family and occupy different physiological categories. Every generated recipe in this app is tagged by class.',
      fams: [
        { z: 'Hydration & electrolyte', crops: '0–80 kcal · no fibre', note: 'Fluid and sodium/potassium replacement. May claim “replaces electrolytes lost in sweat.” May never claim medical-grade unless formulated to ORS spec.' },
        { z: 'Smoothie & meal replacement', crops: '150–500 kcal · 3–10 g fibre', note: 'Whole-food fibre and nutrients. Five layers: liquid base, protein, fat, fruit-vegetable body, flavour and functional additions. May claim whole-food fibre. May never claim it detoxifies organs.' },
        { z: 'Juice & fruit drink', crops: '60–160 kcal · 0–1 g fibre', note: 'Concentrated micronutrients. May claim a concentrated source of vitamin C or potassium. May never claim equivalence to whole fruit.' },
        { z: 'Protein, recovery & pre-workout', crops: '120–400 kcal', note: 'May claim a contribution to daily protein or support for post-exercise recovery. May never claim muscle gain without training or guaranteed recovery.' },
        { z: 'Herbal, fermented & mocktail', crops: '0–250 kcal', note: 'May claim traditional culinary use and caffeine-free status. May never claim immunity boosting or probiotic cure-alls.' },
        { z: 'Cultural & ceremonial', crops: 'Sorrel · mauby · peanut punch · ginger beer · sea moss', note: 'May claim traditional preparation from a named culture and region. May never claim universal spiritual or medical power. Honest labelling of traditional, adapted or fusion applies here exactly as it does in the Foodways Codex.' }
      ],
      entries: [
        { n: 'Blending vs. whole fruit', p: 'Glycemic response', cls: 'proven', d: 'The primary study behind the viral “quadruples blood sugar” claim found the opposite: blended apple and blackberry produced lower glucose maximum and lower area-under-curve than the same fruit eaten whole, attributed to disrupted seed and fibre matrices releasing more glycemic-blunting compounds. Real but modest, n=20 — the practical driver is still portion size and added sugar.' },
        { n: 'Juice and satiety', p: 'Whole-diet context', cls: 'proven', d: 'Without fibre, juice is consumed fast and produces less satiety per calorie — a consistent driver of excess liquid calories. Slow sipping of any acidic sweet beverage also raises dental erosion risk.' },
        { n: 'Beet juice & nitrate', p: 'Performance', cls: 'proven', d: 'One of the better-evidenced ergogenic aids in the plant world, with real protocols around dose and timing. Specific, measurable and unglamorous — which is how a performance claim should look.' },
        { n: 'Coconut water', p: 'Electrolyte substitute', cls: 'prelim', d: 'A real but limited sports-drink substitute: reasonable potassium, low sodium relative to sweat losses. Fine for moderate sessions, insufficient alone for heavy sweat rates in farm labour or endurance work.' },
        { n: 'Plant protein powders', p: 'Pea · pumpkin seed · rice', cls: 'caution', d: 'Heavy-metal contamination is a documented and product-specific risk in this category. Third-party testing is the only meaningful answer, and it belongs on the label.' },
        { n: 'Home ferments', p: 'Kombucha · water kefir · tepache · ginger beer', cls: 'caution', d: 'Real fermentation safety parameters — pH, vessel hygiene, trace alcohol, pressure in sealed bottles. Fermentation is a controlled process, not a vibe.' },
        { n: 'Oral rehydration solution', p: 'Clinical', cls: 'caution', d: 'A clinical formulation for illness-related dehydration, per WHO and paediatric protocol. A homemade electrolyte drink is never a substitute for it. This is the hardest line in the volume.' },
        { n: 'Sorrel / bissap / karkade', p: 'Cultural', cls: 'tradonly', d: 'One hibiscus lineage carried across the Atlantic, with distinct festive traditions at each landing. Traditional recipes are heavily sweetened — low-sugar and fermented sparkling variations keep the tradition and lose the metabolic problem.' },
        { n: 'Peanut punch & mauby', p: 'Caribbean', cls: 'tradonly', d: 'Documented traditional drinks with genuine calorie and cultural function. Honest labelling of what is traditional, what is adapted and what is fusion applies here too.' }
      ],
      craftT: 'Five layers, in order',
      craftB: 'Liquid base, protein, fat, fruit-vegetable body, flavour and functional additions. Blend liquid and soft ingredients first and frozen or fibrous ones last — it affects thickness and blade wear rather than nutrition. Grittiness in a protein smoothie is solved by blending the protein with the liquid before anything thick goes in. Bitterness from cruciferous greens is moderated by citrus or banana. And a smoothie holds for about 24 hours refrigerated before oxidation and vitamin C loss become real.',
      safeT: 'Claim ethics policy', safeB: 'No beverage generated or documented in this app may be described as detoxifying, cleansing, immunity-boosting, fat-burning or disease-reversing. Those words are prohibited outright, in every class, regardless of ingredient. Where a claim is permitted, it is written in the class table above and nowhere else.',
      standards: [
        'Tag every generated recipe by class before it is described. Nothing defaults to “healthy.”',
        'Children get whole fruit and water, with juice limited per AAP guidance — juice displaces whole foods and adds sugar.',
        'Elders with chewing difficulty or low appetite are a real use case for thickened, fortified smoothies. Say who a high-calorie shake is for.',
        'Farm labour and heat stress need sodium quantities that a fruit smoothie does not supply. Match the drink to the sweat rate.',
        'Cultural beverages carry the same traditional / adapted / fusion labelling as every dish in the Foodways Codex.'
      ],
      grow: 'The beverage portfolio builds directly on the rest of this pantry — microgreens, oyster mushrooms, hibiscus, tulsi, ginger, baobab, sorghum, millet, and pea or pumpkin-seed protein. Juice bars, smoothie bars, CSA beverage packs and powder blends have genuinely different unit economics and equipment loads, and choosing between them is a business decision that should be made before the first blender is bought.' },

    { id: 'micro', name: 'Microgreens & Shoots', sub: '7–21 days · youth curriculum · cooperative entry crop', c1: '#3C7A4A', c2: '#2A5836', tint: '#DCEDDF', ink: '#2F4A31', ev: 'moderate',
      hook: 'Seven to twenty-one days from seed to sale, on a shelf, in a room — the lowest-capital crop in this pantry and the best classroom.',
      lede: 'Microgreens sit between sprouts and baby greens: harvested after cotyledon expansion and usually after the first true leaf, and cut above the medium rather than eaten whole with root and seed. That structural distinction carries regulatory weight — the FDA’s produce safety rule separates microgreens from sprouts, exempting them from sprout-specific Subpart M testing while still holding them to covered-produce standards. It also carries a food-safety difference worth understanding rather than glossing.',
      stats: [{ n: '7–21 d', l: 'seed to harvest' }, { n: '4–40×', l: 'nutrient concentration per gram vs. mature' }, { n: '38 → 300', l: 'trays per week, baseline to hub' }, { n: '0', l: 'outbreaks attributed to microgreens as distinct from sprouts' }],
      famT: 'By family, because the family sets the timing', famS: 'Germination speed, yield and flavour cluster by botanical family — which is what makes this a teachable crop as well as a sellable one.',
      fams: [
        { z: 'Brassicas', crops: 'Broccoli · kale · collard · mustard · radish · arugula · mizuna', note: 'The commercial and educational workhorses: fast germination, reliable yield, strong flavour. Radish is 6–10 days and among the best sellers. Kale and collard carry the cultural resonance of the mature crop into Southern and soul-food applications.' },
        { z: 'Legume & large-seed shoots', crops: 'Pea · sunflower · lentil · chickpea · cowpea · fava · fenugreek', note: 'High biomass, high yield. Sunflower hulls must be shed under a weighted blackout and removed before serving. Fenugreek is valuable for Afro-Indian and East African applications and strong enough to use sparingly.' },
        { z: 'Herbs', crops: 'Cilantro · basil · tulsi · parsley · dill · shiso · mint', note: '12–21 days, lower yield per tray, premium restaurant pricing. Cilantro is high value for Caribbean, Latin and African green-seasoning work. Tulsi carries ceremonial significance and gets labelled honestly about tradition versus modern adaptation.' },
        { z: 'Amaranth & chenopods', crops: 'Red & green amaranth · beet · chard · quinoa', note: 'Deep magenta cotyledons, 10–14 days, and strong cultural resonance across West African, Caribbean and South Asian foodways where the mature greens are traditional.' },
        { z: 'Grains & grasses', crops: 'Corn shoots · buckwheat · wheatgrass · sorghum · millet · teff', note: 'Corn shoots are genuinely sweet and underused for cornbread and succotash crossover. Sorghum, millet and teff shoots are experimental — teff connects meaningfully to Ethiopian and Eritrean heritage and merits pilot trialling.' },
        { z: 'Do not grow for food', crops: 'Tomato · potato · eggplant · pepper seedlings', note: 'Solanaceae foliage carries solanine and related glycoalkaloids. This is a hard exclusion list, not a caution.' }
      ],
      entries: [
        { n: 'Concentration vs. contribution', p: 'Nutrition', cls: 'proven', d: 'Peer-reviewed work repeatedly shows vitamins C, E, K and carotenoids at four to forty times mature-plant levels per gram of fresh weight. Per gram is not per serving — a garnish of radish microgreens is a garnish. Say both numbers or neither.' },
        { n: 'Microgreen vs. sprout', p: 'Regulatory', cls: 'proven', d: 'Sprouts are harvested at or before cotyledon stage and eaten whole including root and seed, grown warm, humid and enclosed — ideal bacterial amplification, legally a high-risk category under Subpart M. Microgreens are cut above the medium in more open, lower-humidity conditions and regulated as general covered produce.' },
        { n: 'Radish', p: '6–10 days', cls: 'staple', d: 'Fastest, spiciest, high-yielding and among the best-selling varieties commercially — visual appeal and pungency in one tray.' },
        { n: 'Pea shoots', p: '8–12 days', cls: 'staple', d: 'Sweet, high yield per tray, versatile in stir-fries and salads. Technically a shoot rather than a true microgreen, since harvest often comes at the multi-leaf vine stage.' },
        { n: 'Sunflower shoots', p: '8–12 days', cls: 'staple', d: 'Nutty and crunchy with strong biomass, but the fibrous hull must come off before serving and trays need weighting during blackout to encourage shedding.' },
        { n: 'Amaranth', p: '10–14 days', cls: 'staple', d: 'The magenta that sells a CSA box, and a direct line to amaranth greens across West African, Caribbean and South Asian traditions.' },
        { n: 'Buckwheat', p: '8–10 days', cls: 'caution', d: 'Fast and popular, hull removal required. Buckwheat greens contain fagopyrin, a photosensitising compound documented to cause dermatitis in large quantities — moderate serving sizes advised.' },
        { n: 'Cucurbit microgreens', p: 'Cucumber · squash · melon', cls: 'caution', d: 'Low yield, mucilaginous texture, and some seedlings develop bitterness from cucurbitacins present in wild-type genetics. Novelty garnish, not a salad-base crop.' },
        { n: 'Fungicide-treated seed', p: 'All families', cls: 'caution', d: 'Seed treated for field planting must never enter a microgreen tray. Only seed explicitly labelled for sprouting or microgreen use. This is the most common preventable failure in small-scale production.' }
      ],
      craftT: 'Blackout, then light, then airflow',
      craftB: 'The production arc is seed, germination and radicle at day 1–3, cotyledon emergence at day 2–5, blackout hypocotyl elongation at day 3–6, then cotyledon expansion and first true leaf from day 7–14 — the harvest window. Weighted blackout is what drives uniform hull-shedding in sunflower and buckwheat. After blackout, light quality, humidity control and steady airflow do most of the work of preventing damping-off, and airflow matters more than growers expect at tray density.',
      safeT: 'Lower risk than sprouts, not zero', safeB: 'Comparative data suggest microgreens carry a somewhat lower background bacterial load than sprouts but still higher than mature vegetables, and no published outbreak has been attributed to microgreens as distinct from sprouts. That is a good record to protect with seed sourcing, water quality and cold-chain discipline — not a reason to relax any of them.',
      standards: [
        'Never market microgreens as curing, treating or substituting for a varied diet. The concentration data does not support it and does not need to.',
        'Report nutrient density per realistic serving alongside per gram.',
        'Label sprout service and shoot service differently — the risk profiles and the regulations genuinely differ.',
        'Tulsi and other ceremonially significant crops get honest labelling about tradition versus modern adaptation.',
        'Publish the exclusion list. Solanaceae seedlings are not a judgement call.'
      ],
      grow: 'This is the entry crop: low capital, 7–21 day turnaround, revenue while it teaches botany, nutrition, business math and food sovereignty to young people. Trimmings and spent media feed vermicomposting and mushroom substrate, closing the loop with the fungi volume. A 38-tray weekly baseline scales toward a 300-tray cooperative hub without changing the fundamental method — only the discipline around seed sourcing, water quality and cold chain.' }
  ];

export const codexFamilies = [
    { t: 'Continental Africa', s: 'Where the crops were domesticated, and the systems that still grow them.', ids: ['west', 'east', 'north', 'central'] },
    { t: 'The Atlantic diaspora', s: 'Forced crossing, provision ground, free town — food built out of what was left over.', ids: ['caribbean', 'afam', 'afrosam'] },
    { t: 'Indian Ocean & Mediterranean', s: 'Monsoon trade, indenture contract and colonial occupation, kept strictly apart.', ids: ['afroasia', 'indenture', 'italy'] }
  ];

export const exVariantText = {
    beginner: 'Hinge to a box or raised bed so you never round the low back. Empty bucket or light load. 2 sets of 8, unhurried.',
    standard: 'Full hip hinge with a loaded shovel or sandbag. Soft knees, long spine, drive the hips back then through. 3 sets of 10.',
    seated: 'Seated good-morning: sit tall on a sturdy chair, hinge from the hips with a band across the lap. Same posterior-chain work, fall-safe.'
  };

export const movements = [
    { farm: 'Shovel lift', pattern: 'Hip hinge', muscles: 'Glutes · hamstrings · spinal erectors' },
    { farm: 'Loaded shovel press', pattern: 'Shoulder + core', muscles: 'Deltoids · obliques · bracing' },
    { farm: 'Water carry', pattern: 'Loaded carry', muscles: 'Grip · traps · trunk stability' },
    { farm: 'Wheelbarrow push', pattern: 'Full-body conditioning', muscles: 'Legs · chest · core drive' },
    { farm: 'Compost turning', pattern: 'Hinge + rotation', muscles: 'Posterior chain · obliques' },
    { farm: 'Harvest squat', pattern: 'Leg endurance', muscles: 'Quads · glutes · ankles' }
  ];

export const pantryCats = [
    { cat: 'Proteins & legumes', items: [
      { id: 'bep', name: 'Black-eyed peas (dried)', qty: '2 lb', have: true },
      { id: 'lentils', name: 'Red lentils', qty: '1 lb', have: true },
      { id: 'chickpea', name: 'Chickpea flour', qty: '½ bag', have: true },
      { id: 'hemp', name: 'Hemp seeds', qty: 'low', have: true, low: true },
      { id: 'pigeon', name: 'Pigeon peas', qty: '', have: false },
      { id: 'tofu', name: 'Firm tofu', qty: '2 blocks', have: true, has: 'soy', swapTo: 'butter beans or chickpea flour' },
      { id: 'peanutbtr', name: 'Peanut butter', qty: '1 jar', have: true, has: 'nuts', swapTo: 'sunflower-seed butter' } ] },
    { cat: 'Grains & roots', items: [
      { id: 'millet', name: 'Millet', qty: '3 cups', have: true },
      { id: 'fonio', name: 'Fonio', qty: '1 cup', have: true },
      { id: 'rice', name: 'Brown rice', qty: 'low', have: true, low: true },
      { id: 'sweetpot', name: 'Sweet potatoes', qty: '4', have: true },
      { id: 'plantain', name: 'Plantains', qty: '', have: false },
      { id: 'wheatflour', name: 'Whole-wheat flour', qty: '½ bag', have: true, has: 'gluten', swapTo: 'teff or cassava flour' } ] },
    { cat: 'Greens & fresh', items: [
      { id: 'collards', name: 'Collard greens', qty: '1 bunch', have: true },
      { id: 'peashoots', name: 'Pea microgreens (tray)', qty: 'ready Fri', have: true },
      { id: 'okra', name: 'Okra', qty: '', have: false },
      { id: 'tomato', name: 'Tomatoes', qty: '3', have: true } ] },
    { cat: 'Fats, minerals & ferments', items: [
      { id: 'palmoil', name: 'Red palm oil', qty: '½ bottle', have: true },
      { id: 'seamoss', name: 'Sea moss gel', qty: '1 jar', have: true },
      { id: 'sunbutter', name: 'Sunflower-seed butter', qty: 'low', have: true, low: true },
      { id: 'scotch', name: 'Pickled scotch bonnet', qty: '1 jar', have: true },
      { id: 'tahini', name: 'Tahini', qty: '1 jar', have: true, has: 'sesame', swapTo: 'sunflower-seed butter' } ] }
  ];

export const pantryUnits = { bep: 18, lentils: 10, chickpea: 6, hemp: 1, pigeon: 0, tofu: 4, peanutbtr: 8,
    millet: 9, fonio: 4, rice: 5, sweetpot: 4, plantain: 0, wheatflour: 6,
    collards: 6, peashoots: 6, okra: 6, tomato: 9,
    palmoil: 14, seamoss: 6, sunbutter: 8, scotch: 16, tahini: 8 };

export const plateUses = {
    jollof: ['millet','bep','palmoil','tomato','scotch'],
    redred: ['bep','palmoil','tomato','plantain'],
    rundown: ['collards','seamoss'],
    hoppin: ['bep','rice','collards'],
    moringa: ['lentils','plantain'],
    porridge: ['peashoots'],
    posole: ['sweetpot','bep']
  };

export const pantryKeywords = [['bep',['black-eyed pea','cowpea','red red','hoppin']],['millet',['millet']],['fonio',['fonio']],
    ['rice',['rice']],['lentils',['lentil']],['chickpea',['chickpea','gram flour']],['hemp',['hemp']],['tofu',['tofu']],
    ['peanutbtr',['peanut','groundnut']],['sweetpot',['sweet potato','squash','yam']],['plantain',['plantain']],
    ['collards',['collard','callaloo','greens','kale']],['peashoots',['pea shoot','microgreen']],
    ['tomato',['tomato','jollof','stew']],['palmoil',['palm oil','jollof','red red']],['seamoss',['sea moss']],
    ['sunbutter',['sunflower']],['scotch',['scotch bonnet','jollof']],['tahini',['tahini','sesame']],
    ['okra',['okra']],['pigeon',['pigeon pea']]];

export const groceryToPantry = { 'g-hemp': 'hemp', 'g-rice': 'rice', 'g-sunbutter': 'sunbutter',
    'g-plantain': 'plantain', 'g-okra': 'okra', 'g-collards': 'collards' };

export const sleepByDay = { 0: 7.33, 1: 6.9, 2: 7.5, 3: 6.2, 4: 8.1, 5: 6.8, 6: 7.4 };

export const sleepTargets = { muscle: 8, strength: 8, recomp: 8, postpartum: 8.5, elder: 7.5, farm: 7.75, hike: 7.75, mobility: 7.5, vitality: 7.5, return: 7.5 };

export const mobilityMoves = [
    { name: 'Deep squat hold', dose: '90 sec, feet flat', why: 'The resting position half the world still uses. Restores ankle and hip range that chairs take away.', c: '#2E6B7A' },
    { name: 'Thoracic rotation, open book', dose: '8 each side, slow', why: 'So loaded carries turn through the ribs instead of the low back.', c: '#2F4A31' },
    { name: '90/90 hip switches', dose: '10 switches', why: 'Trains internal and external rotation together — the range squats alone never reach.', c: '#7E5124' },
    { name: 'Ankle rocks at the wall', dose: '12 each side', why: 'Ankle range is what lets you walk downhill without the knees taking it.', c: '#8F4230' },
    { name: 'Wrist & forearm circles', dose: '30 sec each way', why: 'The joint that gives out first on farmer’s walks and bucket carries.', c: '#7A3C4A' },
    { name: 'Dead hang or doorframe stretch', dose: '30 sec', why: 'Decompresses the spine and opens the shoulders after a day of pulling.', c: '#7E5F1C' }
  ];

export const seatedMoves = [
    { name: 'Chair sit-to-stand (or hover)', dose: '8–12 reps', why: 'The single most protective daily movement there is — hover halfway if standing all the way is too much today.', c: '#7E5124' },
    { name: 'Seated marches', dose: '20 total', why: 'Warms the hips and wakes the deep core without any floor work.', c: '#2E6B7A' },
    { name: 'Band row, anchored at a door', dose: '12 reps', why: 'Pulls the shoulders back against the forward curl of sitting.', c: '#2F4A31' },
    { name: 'Overhead press, light', dose: '10 reps', why: 'Keeps the reach that puts a pot on a high shelf.', c: '#8F4230' },
    { name: 'Heel & toe raises', dose: '15 each', why: 'Calf pump for circulation and ankle strength — do these anywhere.', c: '#7A3C4A' },
    { name: 'Trunk rotation with a reach', dose: '8 each side', why: 'Rotation is what reaching for a seatbelt or a grandchild asks for.', c: '#7E5F1C' }
  ];

export const obGoals = [
    { id: 'muscle', label: 'Muscle growth' }, { id: 'strength', label: 'Strength' },
    { id: 'farm', label: 'Farming stamina' }, { id: 'hike', label: 'Hiking preparation' },
    { id: 'mobility', label: 'Mobility' }, { id: 'elder', label: 'Elder independence' },
    { id: 'recomp', label: 'Body recomposition' }, { id: 'postpartum', label: 'Postpartum rebuilding' },
    { id: 'return', label: 'Recovery from inactivity' }, { id: 'vitality', label: 'General vitality' }
  ];


/*
  What the user's days physically involve. The sample value the inert control
  used to display - "Farm & garden work, 3 days/week" - is kept here as one
  option rather than shown as an answer nobody gave.
*/
export const obDayDefs = [
    { id: 'farm3', label: 'Farm & garden work, 3 days/week' },
    { id: 'farm5', label: 'Farm & garden work, 5+ days/week' },
    { id: 'trades', label: 'Trades or manual work, most days' },
    { id: 'onfeet', label: 'On your feet all day \u2014 care, kitchen, retail' },
    { id: 'desk', label: 'Desk work, mostly seated' },
    { id: 'mixed', label: 'A mix, and it changes week to week' },
    { id: 'none', label: 'Not working right now' },
  ];

export const goalFreqMap = { muscle: 'building', strength: 'building', farm: 'grounding', hike: 'uplifting', mobility: 'calming', elder: 'building', recomp: 'building', postpartum: 'building', return: 'grounding', vitality: 'uplifting' };

export const obRestrList = [
    { id: 'soyfree', label: 'Soy-free' }, { id: 'nutfree', label: 'Nut-free' },
    { id: 'glutenfree', label: 'Gluten-free' }, { id: 'sesamefree', label: 'Sesame-free' },
    { id: 'lowsodium', label: 'Low-sodium' }, { id: 'lowcost', label: 'Low-cost' },
    { id: 'texture', label: 'Texture-sensitive' }, { id: 'religious', label: 'Religious / spiritual' }
  ];

export const obTradList = [
    { id: 'westafrican', label: 'West African' }, { id: 'caribbean', label: 'Caribbean' },
    { id: 'gullah', label: 'Gullah Geechee' }, { id: 'creole', label: 'Creole' },
    { id: 'afrolatin', label: 'Afro-Latin' }, { id: 'indigenous', label: 'Indigenous American' }
  ];

export const consentList = [
    { id: 'health', label: 'Use my health info to personalize', sub: 'Encrypted · revocable anytime · never sold' },
    { id: 'photos', label: 'Analyze progress photos', sub: 'Optional · private · no beauty scores, ever' },
    { id: 'location', label: 'Use location for local food & trails', sub: 'Approximate location only' },
    { id: 'research', label: 'Share anonymized data for research', sub: 'Fully optional · off by default' }
  ];

export const menu = [
    { id: 'm-stew', name: 'Ital Kitchen Stew', desc: 'Red peas, coconut, thyme, provisions', price: 12, kcal: 520, p: 21, tags: ['Vegan', 'GF'], role: 'protein', vegan: true },
    { id: 'm-doubles', name: 'Chickpea Doubles', desc: 'Curried channa, bara flatbread, tamarind', price: 8, kcal: 430, p: 14, tags: ['Vegan'], role: 'grain', vegan: true, has: 'gluten', note: 'Ask: fried in shared oil?' },
    { id: 'm-callaloo', name: 'Callaloo & Okra Bowl', desc: 'Steamed greens, scotch bonnet, lime', price: 7, kcal: 180, p: 8, tags: ['Vegan', 'GF', 'Low-cal'], role: 'green', vegan: true },
    { id: 'm-festival', name: 'Festival (2 pc)', desc: 'Sweet fried cornmeal dumplings', price: 4, kcal: 310, p: 4, tags: ['Vegan'], role: 'grain', vegan: true },
    { id: 'm-punch', name: 'Peanut Punch', desc: 'Blended peanut, oat milk, nutmeg', price: 6, kcal: 380, p: 12, tags: ['Contains peanut'], role: 'fat', vegan: true, allergen: true, has: 'nuts' },
    { id: 'm-sorrel', name: 'Sorrel Cooler', desc: 'Hibiscus, ginger, lime — unsweetened option', price: 4, kcal: 60, p: 0, tags: ['Vegan', 'GF'], role: 'hydration', vegan: true }
  ];

export const planAisles = [
    { aisle: 'Produce', c: '#2F4A31', items: [
      { id: 'p-callaloo', name: 'Callaloo', qty: '2 bunches', meals: 'Tue lunch · Wed dinner' },
      { id: 'p-plantain', name: 'Plantains', qty: '5', meals: 'Mon · Fri fuel' },
      { id: 'p-tomato', name: 'Tomatoes', qty: '6', meals: 'Tue · Sat' },
      { id: 'p-okra', name: 'Okra', qty: '1 lb', meals: 'Wed recovery stew' },
      { id: 'p-lime', name: 'Limes', qty: '6', meals: 'iron uptake · all week' } ] },
    { aisle: 'Dry & pantry', c: '#7E5124', items: [
      { id: 'p-millet', name: 'Millet', qty: '3 cups', meals: 'Tue dinner', have: true },
      { id: 'p-fonio', name: 'Fonio', qty: '2 cups', meals: 'Mon breakfast' },
      { id: 'p-bep', name: 'Black-eyed peas (dried)', qty: '2 lb', meals: 'Mon · Tue · Thu' },
      { id: 'p-rice', name: 'Brown rice', qty: '2 lb', meals: 'Wed · Sun' },
      { id: 'p-palm', name: 'Red palm oil', qty: '1 bottle', meals: 'Tue · Sat' } ] },
    { aisle: 'Fridge & other', c: '#2E6B7A', items: [
      { id: 'p-milk', name: 'Fortified plant milk', qty: '2 cartons', meals: 'B12 · breakfasts' },
      { id: 'p-mush', name: 'Oyster mushrooms', qty: '400 g', meals: 'Tue dinner' },
      { id: 'p-seamoss', name: 'Sea moss gel', qty: '1 jar', meals: 'Thu smoothie' } ] }
  ];

export const menuCoop = [
    { id: 'c-beans', name: 'Black Bean & Millet Bowl', desc: 'Cuban-style beans over millet, pikliz', price: 8, kcal: 520, p: 24, tags: ['Vegan', 'GF'], role: 'protein' },
    { id: 'c-greens', name: 'Hot Bar Greens Plate', desc: 'Braised collards, stewed okra', price: 6, kcal: 210, p: 9, tags: ['Vegan', 'GF'], role: 'green' },
    { id: 'c-sweet', name: 'Roasted Sweet Potato Wedges', desc: 'Sunflower-sesame dukkah, scallion', price: 4, kcal: 280, p: 5, tags: ['Vegan'], role: 'grain', has: 'sesame' },
    { id: 'c-tofu', name: 'Ginger-Tamari Braised Tofu', desc: 'Hot-bar tray · scallion, sesame oil', price: 6, kcal: 300, p: 20, tags: ['Vegan', 'Contains soy'], role: 'protein', has: 'soy' },
    { id: 'c-salad', name: 'Pea-Shoot & Radish Salad', desc: 'From the rooftop microgreen trays', price: 5, kcal: 120, p: 6, tags: ['Vegan', 'GF'], role: 'green' },
    { id: 'c-square', name: 'Sunflower Energy Square', desc: 'Seed butter, dates, sorghum puffs', price: 3, kcal: 240, p: 8, tags: ['Vegan', 'Nut-free'], role: 'fat' },
    { id: 'c-tea', name: 'Hibiscus Iced Tea', desc: 'Unsweetened, lime wedge', price: 3, kcal: 40, p: 0, tags: ['Vegan', 'GF'], role: 'hydration' }
  ];

export const menuAbuela = [
    { id: 'a-beans', name: 'Habichuelas Guisadas', desc: 'Stewed red beans, sofrito, calabaza', price: 9, kcal: 390, p: 18, tags: ['Vegan', 'GF'], role: 'protein' },
    { id: 'a-mofongo', name: 'Mofongo Verde', desc: 'Garlic plantain mash, mushroom broth', price: 11, kcal: 480, p: 9, tags: ['Vegan'], role: 'grain' },
    { id: 'a-pan', name: 'Pan de Coco', desc: 'Warm coconut wheat rolls', price: 4, kcal: 290, p: 6, tags: ['Vegan'], role: 'grain', has: 'gluten' },
    { id: 'a-yuca', name: 'Yuca con Mojo', desc: 'Citrus-garlic cassava', price: 6, kcal: 320, p: 3, tags: ['Vegan', 'GF'], role: 'grain' },
    { id: 'a-avocado', name: 'Ensalada de Aguacate', desc: 'Avocado, pickled onion, bitter greens', price: 7, kcal: 260, p: 4, tags: ['Vegan', 'GF'], role: 'green' },
    { id: 'a-tostones', name: 'Tostones', desc: 'Twice-fried green plantain', price: 5, kcal: 340, p: 3, tags: ['Shared fryer'], role: 'grain', allergen: true },
    { id: 'a-agua', name: 'Agua de Jamaica', desc: 'Hibiscus cooler, lime', price: 4, kcal: 70, p: 0, tags: ['Vegan', 'GF'], role: 'hydration' }
  ];

export const restaurants = {
    ital: { name: 'Ital Roots Kitchen', sub: 'Afro-Caribbean · plant-forward · 0.9 mi', rating: '4.8', reviews: '212', c1: '#8F4230', c2: '#9C4A35',
      ask: '"Is the doubles bara fried in shared oil?" · "Any peanut in the stew base?" — peanut flagged for your profile.',
      note: 'Peanut Punch is flagged — your profile lists a peanut allergy in the household.',
      chips: [ { t: 'Open · until 9pm', bg: '#E4EDDD', fg: '#3C5A42' }, { t: 'Black-owned · self-identified', bg: '#E4EDDD', fg: '#3C5A42' }, { t: '$$ · pickup & delivery', bg: '#F0E3D2', fg: '#7E5124' }, { t: 'Transit: bus 12 · 8 min', bg: '#D9E7EC', fg: '#2E6B7A' } ],
      menu: menu },
    coop: { name: 'Yam & Yarrow Hot Bar', sub: 'Food co-op kitchen · 0.4 mi', rating: '4.6', reviews: '148', c1: '#2F4A31', c2: '#5F8050',
      ask: '"Which hot-bar trays used coconut oil today?" · "Is the dukkah sesame-free?" — sesame flagged for your profile.',
      note: 'Hot-bar labels are member-verified daily; oils rotate — check the tray card.',
      chips: [ { t: 'Open · until 8pm', bg: '#E4EDDD', fg: '#3C5A42' }, { t: 'Cooperative · member-owned', bg: '#E4EDDD', fg: '#3C5A42' }, { t: '$ · hot bar by weight', bg: '#F0E3D2', fg: '#7E5124' }, { t: 'Wheelchair accessible', bg: '#D9E7EC', fg: '#2E6B7A' } ],
      menu: menuCoop },
    abuela: { name: 'Abuela Verde', sub: 'Afro-Latin · family-run · 1.3 mi', rating: '4.9', reviews: '87', c1: '#C79A45', c2: '#B0872F',
      ask: '"Is the mofongo broth vegetable-based?" · "Do tostones share a fryer?" — shared fryer flagged below.',
      note: 'Tostones are fried in a shared fryer — flagged for your strict-vegan preference.',
      chips: [ { t: 'Open · until 10pm', bg: '#E4EDDD', fg: '#3C5A42' }, { t: 'Afro-Latin · family-run', bg: '#E4EDDD', fg: '#3C5A42' }, { t: '$$ · pickup', bg: '#F0E3D2', fg: '#7E5124' }, { t: 'Vegan dishes marked', bg: '#D9E7EC', fg: '#2E6B7A' } ],
      menu: menuAbuela }
  };

export const groceryStops = [
    { store: 'Yam & Yarrow Co-op Market', meta: '0.4 mi · open until 8pm', c: '#2F4A31', est: '$42.10', items: [
      { id: 'g-hemp', name: 'Hemp seeds', qty: '1 lb', why: 'running low · protein', price: '$8.50', got: false },
      { id: 'g-rice', name: 'Brown rice', qty: '2 lb bulk', why: 'running low', price: '$3.20', got: false },
      { id: 'g-sunbutter', name: 'Sunflower-seed butter', qty: '1 jar', why: 'running low · nut-free fat', price: '$6.90', got: false },
      { id: 'g-limes', name: 'Limes', qty: '4', why: 'vitamin C → iron uptake', price: '$1.60', got: true },
      { id: 'g-fortmilk', name: 'Fortified oat milk', qty: '1 carton', why: 'B12 gap from Tue\u2019s scan', price: '$1.20', got: false },
      { id: 'g-tamari', name: 'Tamari', qty: '1 bottle', why: 'braising liquid · Thu greens', price: '$4.40', got: false, has: 'soy', swap: { name: 'Coconut aminos', qty: '1 bottle', why: 'soy-free braising liquid', price: '$5.20' } },
      { id: 'g-sesoil', name: 'Toasted sesame oil', qty: '1 bottle', why: 'Mon sorghum bowl finish', price: '$5.80', got: false, has: 'sesame', swap: { name: 'Pumpkin-seed oil', qty: '1 bottle', why: 'sesame-free finishing oil', price: '$6.40' } },
      { id: 'g-wraps', name: 'Whole-wheat wraps', qty: '6', why: 'Fri trail lunch', price: '$3.90', got: false, has: 'gluten', swap: { name: 'Teff flour, for flats', qty: '2 cups', why: 'gluten-free trail flats', price: '$4.60' } },
      { id: 'g-peanut', name: 'Peanuts, raw', qty: '2 cups', why: 'Thu groundnut stew', price: '$3.10', got: false, has: 'nuts', swap: { name: 'Sunflower seeds, raw', qty: '2 cups', why: 'nut-free groundnut swap', price: '$2.80' } },
      { id: 'g-salt', name: 'Sea salt, non-iodized', qty: '2 lb', why: 'brine shelf · 3 jars going', price: '$4.10', got: false },
      { id: 'g-jars', name: 'Wide-mouth quart jars', qty: '4', why: 'brine shelf · kraut & bug', price: '$9.60', got: false },
      { id: 'g-weights', name: 'Glass fermentation weights', qty: '4', why: 'brine shelf · keeps greens under', price: '$7.00', got: false } ] },
    { store: 'Three Sisters Farm Stand', meta: '2.1 mi · Sat market', c: '#7E5F1C', est: '$15.50', items: [
      { id: 'g-plantain', name: 'Plantains', qty: '5', why: 'Fri hike fuel', price: '$3.25', got: false },
      { id: 'g-okra', name: 'Okra', qty: '1 lb', why: 'Wed recovery stew', price: '$4.00', got: false },
      { id: 'g-squash', name: 'Summer squash', qty: '2', why: 'in season · local score', price: '$2.50', got: false },
      { id: 'g-collards', name: 'Collard greens', qty: '2 bunches', why: 'kraut jar · in season', price: '$3.50', got: false },
      { id: 'g-ginger', name: 'Ginger root', qty: '1/2 lb', why: 'ginger bug · feeds daily', price: '$2.25', got: false } ] }
  ];

export const mealWeek = [
    { day: 'Mon', label: 'Farm day', focus: 'High-carb fuel', kcal: '2,750', accent: '#2E6B7A', done: true,
      meals: [ { slot: 'Breakfast', name: 'Fonio porridge, plantain & hemp', p: '24g' }, { slot: 'Lunch', name: 'Red red (black-eyed pea stew)', p: '36g' }, { slot: 'Dinner', name: 'Sorghum bowl, oyster mushrooms & sesame drizzle', p: '31g', has: 'sesame', swap: 'Sorghum bowl, oyster mushrooms & pumpkin-seed drizzle' } ] },
    { day: 'Tue', label: 'Push & carry', focus: 'Muscle-building', kcal: '2,600', accent: '#8F4230', done: true, today: true,
      meals: [ { slot: 'Breakfast', name: 'Amaranth porridge + pea shoots', p: '22g' }, { slot: 'Lunch', name: 'Black-eyed pea & callaloo plate', p: '38g' }, { slot: 'Dinner', name: 'Jollof-spiced millet, mushrooms', p: '29g' } ] },
    { day: 'Wed', label: 'Recovery', focus: 'Anti-inflammatory', kcal: '2,350', accent: '#2F4A31',
      meals: [ { slot: 'Breakfast', name: 'Broccoli-microgreen scramble (chickpea)', p: '26g' }, { slot: 'Lunch', name: 'Moringa & lentil soup, teff flat', p: '30g' }, { slot: 'Dinner', name: 'Okra & butter bean stew, wild rice', p: '28g' } ] },
    { day: 'Thu', label: 'Hike prep', focus: 'Iron + hydration', kcal: '2,500', accent: '#C79A45',
      meals: [ { slot: 'Breakfast', name: 'Sea moss smoothie, sunflower seed butter', p: '21g' }, { slot: 'Lunch', name: 'Tofu-braised greens & Carolina Gold rice', p: '34g', has: 'soy', swap: 'Butter-bean braised greens & Carolina Gold rice' }, { slot: 'Dinner', name: 'Groundnut stew with teff flatbread', p: '32g', has: 'nuts', swap: 'Sunflower-seed groundnut-style stew' } ] },
    { day: 'Fri', label: 'Ridge hike', focus: 'Trail fuel', kcal: '2,800', accent: '#2F4A31',
      meals: [ { slot: 'Breakfast', name: 'Millet & date bars, hibiscus cooler', p: '18g' }, { slot: 'Lunch', name: 'Trail wraps: chickpea, collards, pickled onion', p: '29g', has: 'gluten', swap: 'Trail bowls: chickpea, collards, pickled onion — no wrap' }, { slot: 'Dinner', name: 'Cassava & pigeon pea one-pot', p: '33g' } ] },
    { day: 'Sat', label: 'Market + batch', focus: 'Batch prep', kcal: '2,400', accent: '#665C4A',
      meals: [ { slot: 'Brunch', name: 'Akara with pepper sauce', p: '27g' }, { slot: 'Batch', name: 'Cook: beans \u00d72, millet, greens', p: '\u2014' }, { slot: 'Dinner', name: 'Callaloo rundown (coconut, sea moss)', p: '25g' } ] },
    { day: 'Sun', label: 'Rest', focus: 'Gentle · family meal', kcal: '2,300', accent: '#2C3A63',
      meals: [ { slot: 'Breakfast', name: 'Cornmeal porridge, stewed fruit', p: '16g' }, { slot: 'Lunch', name: 'Family plate: yam, greens, beans', p: '30g' }, { slot: 'Dinner', name: 'Light soup + microgreen salad', p: '22g' } ] }
  ];

export const journal = [
    { icon: 'carry', text: 'Carried two 30-lb water buckets for 200 ft', meta: 'Yesterday · Farm capacity', c: '#2E6B7A' },
    { icon: 'hike', text: 'Completed a 5-mile ridge hike, zone 2', meta: 'Sun · Hiking', c: '#2F4A31' },
    { icon: 'back', text: 'Worked 3 hrs at the farm — no back pain', meta: '2 days ago · Function', c: '#2F4A31' },
    { icon: 'meal', text: 'Prepared 4 complete Rooted Plates at home', meta: 'This week · Nourish', c: '#8F4230' },
    { icon: 'sleep', text: 'Improved sleep consistency to 7h20 avg', meta: 'This week · Recovery', c: '#7E5F1C' }
  ];

export const councilReplies = {
    energy: { q: "I'm feeling low energy today.",
      a: "Thank you for telling me. Let's not force a heavy day — keep the Push & Carry work but drop one round, and front-load carbs with plantain and fonio at lunch. If low energy lingers past a week alongside pale nails or breathlessness, that's worth an iron/ferritin check with a clinician.",
      why: ["You slept 6h10 last night, below your 7h30 average", "Your last two plates ran low on iron (38% of target)", "A heavy farm-work day is on tomorrow's plan"],
      confidence: "Confidence: Medium", evidence: "Emerging evidence + your logs" },
    iron: { q: "Am I getting enough iron?",
      a: "Close, but trending low. Your plates average ~38% of target and your last ferritin read low-normal. Pair cowpeas and callaloo with vitamin C (lime, pepper), cook in a cast-iron pot, and add dandelion or amaranth microgreens. I can't diagnose — your vault flags this as worth re-testing.",
      why: ["Vault ferritin: 38 ng/mL (low-normal)", "3-day iron intake averaged 38% of your target", "You train on farm-work days that raise iron demand"],
      confidence: "Confidence: Medium", evidence: "Well established + your labs" },
    farm: { q: "Adjust my plan for a farm day tomorrow.",
      a: "Done — tomorrow shifts to fuel and function. I bumped carbs to ~2,750 kcal, moved your heavy hinge work to the field itself (shovel lifts count), and set an extra hydration reminder for the heat. Recovery tonight is the long-exhale breath so you wake ready.",
      why: ["Tomorrow is tagged 'farm day' in your week", "Your occupation profile includes 3 farm days/week", "Late-summer heat is forecast in your region"],
      confidence: "Confidence: High", evidence: "Traditional use + your profile" },
    tea: { q: "What should I brew tonight?",
      a: "Tonight calls for a calming cup. Blue vervain — the Caribbean nervine — steeped 10 minutes, about 90 minutes before bed; lemon balm if you want something gentler. Skip hibiscus this evening: your dinner plate is iron-forward and its tannins would blunt absorption. The full brew-by-goal guide is in Tea Intelligence.",
      why: ["Root Rest is set for 9:00p and sleep ran short last night", "Tonight's dinner is iron-forward — tannin-heavy teas would compete", "Blue vervain is flagged 'Traditional use' in your Apothecary"],
      confidence: "Confidence: Medium", evidence: "Traditional use + your logs" },
    state: { q: "What should I eat for how I feel today?",
      a: "Today reads Grounding — steady but with a heavy farm day ahead and sleep a little short. Build plates around roots and minerals: yam or sweet potato as the base, black-eyed peas for zinc and B6, a spoon of sea moss gel in the smoothie. Eat them warm and slow. The full band guide is in Nutrient Frequencies.",
      why: ["Readiness is Grounded but sleep ran 6h10, below your average", "Tomorrow is tagged as a heavy farm-work day", "Your last two plates ran low on minerals"],
      confidence: "Confidence: Medium", evidence: "Traditional use + your logs" },
    greens: { q: "Which microgreens should I grow next?",
      a: "Your sunflower tray is ready today and your plates ran low on iron this week — start amaranth and beet trays next (8–14 days), and keep a fast radish tray rolling for spice. Pea and lentil stay your protein anchors. The full growing guide is in the Variety Library.",
      why: ["Your last two plates ran low on iron (38% of target)", "Sunflower tray hits harvest today — a slot opens on the sill", "You favor spicy + sweet mixes in logged salads"],
      confidence: "Confidence: Medium", evidence: "Emerging evidence + your trays" },
    ferment: {
      q: "What should I ferment this week?",
      a: "Start a lime-brine quick pickle with your radish and mustard shoots tonight — 24 hours on the counter, tangy for weeks, and it gives your gut something living every day. If you want one slow jar too, a 2% collard kraut fits the greens you already have. Save the mushroom garum for a week when you're not traveling; it needs six weeks of patience.",
      why: ["Radish tray is at harvest and won't hold much longer", "Your logged plates carry almost no fermented food this week", "Collards are in season and cheap at your market right now"],
      confidence: "Confidence: Medium", evidence: "Traditional use + your logs" }
  };

export const _fallbackReply = {
    a: "I hear you. I can shape food, training, recovery or land-based plans around that — and I'll always show which of your data informed the suggestion. When something looks medical, I'll point you to a clinician rather than guess.",
    why: ["Grounded in your profile, logs and stated goals", "No diagnosis — patterns and options only"],
    confidence: "Confidence: Medium", evidence: "Your profile" };

export const a11yMeta = {
    dark: { label: 'Dark mode', sub: 'Easier on the eyes at night and on the trail' },
    contrast: { label: 'High-contrast mode', sub: 'Stronger foreground / background separation' },
    colorblind: { label: 'Color-blind-safe charts', sub: 'Add labels & patterns, never color alone' },
    plain: { label: 'Plain-language mode', sub: 'Shorter, simpler copy across the app' },
    dyslexia: { label: 'Dyslexia-friendly reading', sub: 'More legible letterforms & spacing' },
    reduce: { label: 'Reduced motion', sub: 'Pause growth, ripple & breathing animations' },
    lowbw: { label: 'Low-bandwidth mode', sub: 'Lighter images for slow connections' },
    offline: { label: 'Offline access', sub: 'Cache plans & maps for farms and trails' },
    voice: { label: 'Voice input', sub: 'Log meals and ask the Council by voice' },
    captions: { label: 'Captions', sub: 'On exercise & breathwork videos' },
    elder: { label: 'Elder-friendly interface', sub: 'Larger controls, simpler navigation' }
  };



