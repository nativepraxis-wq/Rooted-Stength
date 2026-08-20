/* eslint-disable */
// Seed state ported verbatim from the prototype (lines 5666-5822).
// The 14-day log script and the council thread are demo content, not user data.

export const initialState: any = {
    route: 'welcome',
    codexId: 'west',
    scanFromUpload: false,
    genIdx: 0,
    councilDraft: '',
    scanDrop: {},
    scanAlt: {},
    fusionChecks: {},
    histFilter: 'all',
    logToast: '',
    noteOpen: false,
    noteDraft: '',
    logs: (function () {
      const P: Record<string, any> = {
        jollof: ['Jollof-spiced millet, black-eyed peas & oyster mushrooms', 34, 650],
        redred: ['Red red — black-eyed pea stew with fried plantain', 38, 720],
        rundown: ['Callaloo rundown with coconut & sea moss', 28, 560],
        hoppin: ['Hoppin’ John bowl with Carolina Gold rice', 40, 700],
        moringa: ['Moringa & lentil soup with plantain', 32, 540],
        porridge: ['Amaranth porridge with pea shoots & lime', 26, 460],
        posole: ['Three Sisters posole — corn, beans & squash', 30, 530]
      };
      const M: Record<string, any> = {
        farm: ['Farm-Strength: Push & Carry', '42 min · loaded carry'],
        hike: ['Ridge hike — zone 2', '5.2 mi · 1,180 ft climb'],
        anc: ['Ancestral movement — Kalenda rhythm', '28 min · barefoot'],
        breath: ['Breathwork & mobility reset', '14 min · long exhale'],
        elder: ['Elder strength circuit', '24 min · fall-safe']
      };
      const script: any[] = [
        { d: 0, plates: [['porridge', '7:10a'], ['jollof', '1:05p']], move: ['farm', '6:35a'], brew: ['Nettle & moringa infusion', '3:20p'] },
        { d: 1, plates: [['redred', '8:00a'], ['hoppin', '12:40p'], ['moringa', '4:15p'], ['porridge', '7:30p']], move: ['hike', '7:15a'], cups: 8,
          note: ['Carried the 40 lb feed sack the whole row without setting it down.', '6:50p'] },
        { d: 2, plates: [['jollof', '8:15a'], ['moringa', '1:20p'], ['redred', '4:40p'], ['porridge', '8:10p']], move: ['breath', '9:00p'], cups: 7, ferm: ['Collard kraut', '5:10p'] },
        { d: 3, plates: [['hoppin', '7:45a'], ['porridge', '12:15p'], ['rundown', '4:30p'], ['jollof', '7:05p']], move: ['farm', '6:40a'], cups: 10 },
        { d: 4, plates: [['posole', '8:30a'], ['redred', '1:00p'], ['moringa', '7:15p']], cups: 6, brew: ['Blue vervain', '8:40p'] },
        { d: 5, plates: [['moringa', '7:20a'], ['jollof', '12:50p'], ['porridge', '4:20p'], ['hoppin', '7:40p']], move: ['anc', '6:00p'], cups: 9 },
        { d: 6, plates: [['rundown', '8:05a'], ['hoppin', '1:30p'], ['jollof', '4:50p'], ['redred', '7:25p']], move: ['farm', '6:30a'], cups: 8,
          note: ['Knees quiet on the stairs all week. First time since spring.', '9:10p'] },
        { d: 7, plates: [['porridge', '7:35a'], ['redred', '12:20p'], ['hoppin', '7:10p']], move: ['hike', '7:00a'], cups: 7 },
        { d: 8, plates: [['jollof', '8:20a'], ['moringa', '1:15p'], ['posole', '4:35p'], ['porridge', '7:50p']], cups: 6 },
        { d: 9, plates: [['hoppin', '7:50a'], ['porridge', '12:10p'], ['posole', '4:25p'], ['jollof', '7:20p']], move: ['farm', '6:45a'], cups: 9,
          ferm: ['Radish & mustard quick pickle', '4:30p'] },
        { d: 10, plates: [['rundown', '8:10a'], ['redred', '1:40p'], ['hoppin', '4:45p'], ['moringa', '7:35p']], move: ['breath', '9:05p'], cups: 8 },
        { d: 11, plates: [['jollof', '7:30a'], ['porridge', '12:35p'], ['redred', '7:50p']], move: ['anc', '6:15p'], cups: 7 },
        { d: 12, plates: [['moringa', '8:00a'], ['hoppin', '12:45p'], ['jollof', '4:40p'], ['porridge', '7:55p']], move: ['elder', '10:00a'], cups: 9,
          note: ['Cooked with Mama Ruth. She names the callaloo different than this app does.', '8:15p'] },
        { d: 13, plates: [['posole', '7:40a'], ['rundown', '12:30p'], ['porridge', '4:15p'], ['redred', '7:10p']], cups: 6 }
      ];
      const out: any[] = []; let n = 0;
      script.forEach(function (day: any) {
        (day.plates || []).forEach(function (row: any) {
          const p = P[row[0]];
          out.push({ id: 'L' + (++n), kind: 'plate', d: day.d, t: row[1], name: p[0], plateId: row[0], p: p[1], kcal: p[2],
            meta: p[1] + 'g protein · ' + p[2] + ' kcal' });
        });
        if (day.move) { const m = M[day.move[0]]; out.push({ id: 'L' + (++n), kind: 'move', d: day.d, t: day.move[1], name: m[0], meta: m[1] }); }
        if (day.cups) out.push({ id: 'L' + (++n), kind: 'water', d: day.d, t: 'all day', cups: day.cups, name: day.cups + ' cups of water',
          meta: day.cups >= 8 ? 'target met' : (8 - day.cups) + ' cups short of target' });
        if (day.brew) out.push({ id: 'L' + (++n), kind: 'brew', d: day.d, t: day.brew[1], name: day.brew[0], meta: 'Brewed & sipped' });
        if (day.ferm) out.push({ id: 'L' + (++n), kind: 'ferment', d: day.d, t: day.ferm[1], name: day.ferm[0], meta: 'Tasted from the jar' });
        if (day.note) out.push({ id: 'L' + (++n), kind: 'note', d: day.d, t: day.note[1], name: day.note[0], meta: 'Note' });
      });
      return out;
    })(),
    obPronoun: 'she/her',
    obGoal: 'muscle',
    obGoal2: 'farm',
    obRestr: { soyfree: true, nutfree: true },
    obTrad: { caribbean: true, gullah: false, westafrican: true, creole: false, indigenous: false },
    consent: { health: true, photos: false, location: true, research: false },
    vaultPerm: { labs: true, meds: false, exports: false },
    a11ySize: 'M',
    billing: 'annual',
    plan: 'rooted',
    sb: { protein: 'pea', fruit: 'banana', boost: { moringa: true, seamoss: false, cacao: false, microgreens: false }, liquid: 'coconut' },
    savedSmoothies: [],
    weeklyBudget: 100,
    spentAdd: { 0: 0, 1: 0, 2: 0, 3: 0 },
    expenseOpen: false,
    matrixDim: null,
    expenseCat: 0,
    expenseAmt: 0,
    sbToast: false,
    shareSmoothie: null,
    shareCopied: false,
    rsvp: { e2: true },
    bioregion: 'northeast',
    seasonIdx: null,
    approved: {},
    exVariant: 'standard',
    trainDay: 1,
    pregStep: 0,
    pregStage: 'pregnant',
    pregClinician: false,
    a11y: { dark: false, contrast: false, colorblind: true, plain: false, dyslexia: false, reduce: false, lowbw: false, offline: true, voice: false, captions: false, elder: false },
    mealDay: 1,
    pantryOff: {},
    pantryRestock: {},
    toastLabel: 'View',
    toastTo: 'history',
    got: { 'g-limes': true },
    order: { 'm-stew': true, 'm-callaloo': true },
    restId: 'ital',
    planGot: { 'p-millet': true },
    bcFound: false,
    voiceHeard: false,
    cropId: 'cowpea',
    councilOpen: false,
    hydrationCups: 5,
    watered: {},
    tended: { move: true, nourish: false, rest: false },
    intimacyShare: false,
    familyId: 'kofi',
    sovSystem: 'heart',
    dsDeviceOnly: false,
    dsRegion: 'coop',
    dsPurged: false,
    plantsEaten: { collards: true, cowpeas: true, plantain: true, hemp: true, okra: true, millet: true, mango: true, seamoss: true, tomato: true, lime: true, oats: true, cacao: true, callaloo: true, sweetpot: true, fonio: true, pumpkin: true, hibiscus: true, mushroom: true },
    hidden: { oil: true, broth: true, salt: true, seasoning: true, coconut: false, nutbutter: false },
    recipeMode: 'muscle',
    teaGoal: 'energy',
    teaSafety: { pregnant: false, bp: false, thinners: false },
    savedBrews: { 'Blue vervain': true },
    freqBand: 'grounding',
    warriorId: 'zulu',
    coconutUse: 'kitchen',
    honeyUse: 'fuel',
    greenId: 'pea',
    profileReturn: null,
    plateId: 'jollof',
    plateRelaxed: false,
    resetOpen: false,
    resetDone: false,
    libId: 'pea',
    libFilter: 'all',
    libQuery: '',
    seedCart: {},
    sownTrays: [],
    shroomRecipeId: 'stew',
    nervineUse: 'nervines',
    waterUse: 'daily',
    fermJars: [
      { id: 'j1', name: 'Radish & mustard quick pickle', day: 4, target: 7, c: '#8F4230', tasted: true },
      { id: 'j2', name: 'Collard kraut', day: 9, target: 14, c: '#2F4A31', tasted: false },
      { id: 'j3', name: 'Ginger bug', day: 2, target: 5, c: '#7E5F1C', tasted: false }
    ],
    swapUse: 'protein', fermUse: 'why', dbUse: 'plate', cerUse: 'before',
    councilThread: [
      { council: true, text: "Morning, Amara. Your readiness reads Grounded today — sleep and energy are solid, soreness is low. It's a good day to carry load at the farm session.", hasWhy: false },
      { you: true, text: "I'm feeling a little low on energy actually." },
      { council: true, text: "Thank you for telling me. Let's not push a heavy day. I'd suggest keeping the Push & Carry work but dropping one round, and front-loading carbs — add plantain and fonio to lunch. If low energy lasts more than a week alongside pale nails or breathlessness, that's worth an iron/ferritin check with a clinician.", hasWhy: true,
        why: ["You logged 6h10 sleep last night — below your 7h30 average", "Your last plate ran low on iron (38% of target) two days running", "You noted a heavy farm-work day tomorrow"],
        confidence: "Confidence: Medium", evidence: "Emerging evidence + your logs" }
    ]
};
