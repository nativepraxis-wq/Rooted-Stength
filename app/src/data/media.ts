/*
  Generated imagery.

  Every file under public/media was produced by an image model, not photographed.
  That matters here more than it would in most apps: this product's whole claim is
  that it does not state what it cannot support, so a picture is a claim like any
  other sentence on the screen.

  Two consequences are built into how these are used:

  1. Every image ships with a visible "Illustration" mark and a fuller
     screen-reader sentence. See PhotoHeader in components/Headers.tsx.

  2. Nothing figurative is generated for the five warrior traditions. Those are
     real, living peoples - Zulu, Agojie, Maasai, and the Kalenda and capoeira
     lineages - and a synthetic photograph of them would both fabricate a
     depiction of identifiable groups and invite the romanticised-warrior framing
     the Move hub explicitly disclaims. `tradition-*` images are foodways and
     ground: grain, root, oil, matting, earth. No people, no costume, no weapons.

  Accuracy is not guaranteed and the model does get things wrong - an early pass
  rendered fregola in place of millet and pinto beans in place of cowpeas. That is
  precisely why they are marked as illustrations rather than presented as the dish.
*/

/* Vite serves public/ at the root, so these are absolute paths, not imports. */
const base = (name: string) => '/media/' + name + '.webp';

/* Ids come from plateDefs; every one of the 28 has a file. */
export function plateImage(id: string): string {
  return base('plate-' + id);
}

/* Ids come from warriorDefs. Foodways stills, never figures - see above. */
export function traditionImage(id: string): string {
  return base('tradition-' + id);
}

/*
  Move imagery is per training family rather than per exercise, and shows the
  tool and the ground rather than a body mid-movement. A generated image of a
  hip hinge can easily show a rounded spine, and this app prescribes movement to
  elders and postpartum users - a picture that teaches the wrong shape is worse
  than no picture. These carry the setting; the written cues carry the form.
*/
export type MoveFamily = 'farm' | 'carry' | 'seated' | 'mobility';

export function moveImage(family: MoveFamily): string {
  return base('move-' + family);
}

/* The sentence read out in place of the visible "Illustration" mark. */
export const ILLUSTRATION_NOTE =
  'Illustration, generated - not a photograph of this dish.';

export const TRADITION_NOTE =
  'Illustration of the foodways of this tradition, generated - it does not depict people.';

/* Ids come from greenDefs; all 17 have a tray still. */
export function greenImage(id: string): string {
  return base('green-' + id);
}

/*
  Place imagery.

  The six places are named businesses carrying a distance and a map pin, and the
  Explore screen states that ownership tags "come from the business". The app is
  therefore telling the user these are real and findable. There are no addresses,
  URLs or phone numbers behind them, which says placeholder.

  Either way a photoreal storefront is the wrong image. If the businesses are
  invented, a facade makes them look findable and someone may go looking. If any
  are real, a synthetic facade misrepresents premises the owners did not agree to.

  So these illustrate the KIND of place - crates of produce, a pot on a stove,
  raised beds, kelp drying - with no signage, no shopfront, no building exterior
  and no people. They say what sort of place this is without asserting that a
  particular building stands anywhere.
*/
const PLACE_SLUGS: Record<string, string> = {
  'Yam & Yarrow Co-op Market': 'yam-yarrow-co-op-market',
  'Ital Roots Kitchen': 'ital-roots-kitchen',
  'Abuela Verde': 'abuela-verde',
  'Three Sisters Farm Stand': 'three-sisters-farm-stand',
  'Kelp & Coir Sea-Veg Supply': 'kelp-coir-sea-veg-supply',
  'Sankofa Community Garden': 'sankofa-community-garden',
};

export function placeImage(name: string): string {
  return base('place-' + (PLACE_SLUGS[name] || 'sankofa-community-garden'));
}

/*
  Codex region headers.

  Land, not people. Three of these volumes - African American, Indenture and
  Afro-Italy - are about coerced and exploited agricultural labour, and a header
  full of workers in a field would romanticise exactly what the text is there to
  name. So these are the agro-ecology the volume describes: the crop, the soil,
  the water, the terrace. No figures anywhere.
*/
export function regionImage(id: string): string {
  return base('region-' + id);
}

/* Pantry volume headers - an arrangement of what the volume is about. */
export function volumeImage(id: string): string {
  return base('vol-' + id);
}

export const LANDSCAPE_NOTE =
  'Illustration of this region, generated - not a photograph of a specific place.';

export const VOLUME_NOTE =
  'Illustration, generated - not a photograph.';

/*
  Crop profiles show the plant growing - vine, panicle, pod, log, tree - which
  keeps them distinct from the Pantry Codex, where the same species appear as the
  dried ingredient. A cowpea in the field and a bowl of dried cowpeas are two
  different claims, so they are two different pictures.
*/
export function cropImage(id: string): string {
  return base('crop-' + id);
}

/*
  The three restaurants are the same businesses as three of the six places, so
  they reuse those files rather than generating near-duplicates. Same reasoning
  applies: no storefront, no signage - see the placeImage note above.
*/
const RESTAURANT_TO_PLACE: Record<string, string> = {
  ital: 'ital-roots-kitchen',
  coop: 'yam-yarrow-co-op-market',
  abuela: 'abuela-verde',
};

export function restaurantImage(restId: string): string {
  return base('place-' + (RESTAURANT_TO_PLACE[restId] || 'ital-roots-kitchen'));
}

/* The single dish on the blood-sugar meal screen. */
export function mealImage(): string {
  return base('meal-sugarbowl');
}

export const CROP_NOTE =
  'Illustration of this crop, generated - not a photograph of a specific plant.';

export const PLACE_NOTE =
  'Illustration of the kind of place, generated - it does not depict these premises.';

/*
  Farm-Fitness Library movement photographs.

  These depict Black and Afro-Indigenous people performing each movement, which
  is a deliberate reversal of the earlier decision to keep training imagery
  non-figurative. That decision was about form, not about depicting people: a
  generated hip hinge can easily show a rounded spine, and this app prescribes
  movement to elders and postpartum users.

  So every one of these was inspected before it shipped, specifically for a
  rounded lumbar spine under load. The compost-turning hinge and the shovel lift
  were checked at zoom; the harvest squat was regenerated twice - once because
  the body was hidden behind a basket so the squat was not visible at all, and
  again because the squat was asymmetric with a raised rear heel, which does not
  match the "quads, glutes, ankles" the card claims it trains.

  The card carries a note saying the written cues govern form, because a
  generated image must not be the authority on how to move under load.
*/
const FARM_MOVE_SLUGS: Record<string, string> = {
  'Shovel lift': 'shovel-lift',
  'Loaded shovel press': 'loaded-shovel-press',
  'Water carry': 'water-carry',
  'Wheelbarrow push': 'wheelbarrow-push',
  'Compost turning': 'compost-turning',
  'Harvest squat': 'harvest-squat',
};

export function farmMoveImage(farmName: string): string | null {
  const slug = FARM_MOVE_SLUGS[farmName];
  return slug ? base('farmmove-' + slug) : null;
}

export const FARM_MOVE_NOTE =
  'Illustrations of each movement. The written cues govern form, not the picture.';

/*
  Session photography for the six non-farm Move sessions.

  All six depict African American people, with age, gender, body and personal
  style varied deliberately across the set rather than one archetype repeated.
  Wardrobe is styled up - fine knits, tailored trousers, silk headwraps, good
  outerwear - in the app's own clay, ochre, forest and cream palette.

  Same form discipline as the Farm-Fitness Library, and it changed two of them:

  - `mobility` was regenerated. The first attempt was a deep backbend with the
    head dropped back. Not dangerous, but the session is labelled "12 min,
    joint-friendly" and that pose oversells the intensity to somebody with joint
    problems. It is now a supine figure-four, unmistakably gentle.
  - `elder` and `seated` are the two safety-critical ones. Elder shows a
    sit-to-stand with a hand resting on the chair arm, upright and stable rather
    than frail. Seated shows an upright chair-supported row, feet flat, spine
    neutral.

  `ancestral` shows a present-day person moving barefoot in contemporary dress.
  It is deliberately NOT a costumed reenactment - the warrior-tradition rule from
  the tradition imagery still holds: do not fabricate documentary depictions of a
  living tradition's practitioners.
*/
export function sessionImage(id: string): string {
  return base('session-' + id);
}

export const SESSION_NOTE =
  'Illustration of this session. The written cues govern form, not the picture.';

/*
  Warrior tradition practitioner photographs.

  These depict people, which reverses the rule the tradition foodways stills were
  built on. The owner directed the change; the reasoning that made the original
  rule right is preserved in HOW these are made, not by refusing.

  Every one shows a CONTEMPORARY PRACTITIONER PERFORMING THE DRILL THE APP
  ACTUALLY PRESCRIBES - the endurance run, the obstacle climb and sandbag carry,
  the ginga, the tall-spine vertical jump, the stick figure-eight flow. The screen
  itself says these traditions are "adapted for modern training", so a modern
  person training is what the screen is actually about.

  What they deliberately are NOT: staged historical reenactments. No shields, no
  spears, no shuka, no beadwork, no invented regalia or insignia. Fabricating
  ethnographic documentation of Zulu regiments, the Agojie or Maasai ceremony was
  the original objection and it still stands - a synthetic photograph of a real
  people's ceremony is a claim nobody can back.

  Two are living practices shown as they are actually practised today: capoeira
  in white abada trousers in a modern roda, and kalenda with a training stick to
  a drummer in a yard. That is documentation of a present-day practice, not an
  invented past.
*/
export function warriorImage(id: string): string {
  return base('warrior-' + id);
}

export const WARRIOR_NOTE =
  'Contemporary practitioners training these traditions today - not a historical depiction.';

/*
  Hub imagery for the Today, Journey and Nourish tabs.

  Hubs only. The sub-screens under these tabs - Progress, History, the profile
  recap, the scan flow, the recipe generator - show the user's own record, and a
  generated photograph there would compete with their data rather than support it.

  The scan flow is the sharpest case: it walks the user through photographing
  their own meal and then reports on it. A generated plate sitting inside that
  flow could be read as their scan result, which is a claim about their food that
  nobody made.
*/
export function hubImage(id: string): string {
  return base('hub-' + id);
}

export const HUB_NOTE = 'Illustration, generated - not a photograph.';

/*
  Sub-screen imagery for the Journey and Nourish tabs.

  The hub note above explains why these were initially left bare. The owner asked
  for them, so the risk is handled in the CHOICE OF SUBJECT rather than by
  refusing.

  Nothing inside the scan flow is a plated dish. That flow photographs the user's
  own meal and reports on it, so a finished plate sitting in it could be read as
  their scan result - a claim about their food nobody made. Instead:

    scan     - the ACT of photographing, food soft in the lower frame
    detected - hands sorting SEPARATE components on a board, not a plate
    hidden   - oil going into a pan, the seasonings that go unrecorded
    report   - a working kitchen mid-cook, components at different stages

  Those four also carry SCAN_NOTE rather than the usual line, because "not a
  photograph" is not the confusion worth foreclosing there. "Not your photo" is.
*/
export function subImage(id: string): string {
  return base('sub-' + id);
}

export const SCAN_NOTE =
  'Illustration, generated - not your photo.';

/*
  Kitchen screens - meal plan, pantry, grocery list and the pantry input flows.

  Each shows the ACTIVITY rather than an inventory. The pantry screen tracks the
  user's real stock and draws it down as plates are logged, so an idealised
  full-shelf photograph could be read as theirs. The image is someone mid-restock
  with gaps on the shelf and jars still in a crate - a pantry being kept, not a
  pantry being claimed.
*/
export function kitchenImage(id: string): string {
  return base('kit-' + id);
}

/*
  Apothecary guide imagery.

  This is the herbal section, so two of the twelve needed deciding rather than
  just prompting.

  `swaps` is "Supplement swaps". It shows whole foods laid out - pumpkin seeds,
  hibiscus, brazil nuts, sea moss, greens, dried mushrooms, lentils - and no
  pills, capsules or supplement packaging anywhere in frame. The screen argues
  for food as the source, and a picture of capsules would argue the opposite.

  `diabetes` is "Living with diabetes". It shows a man at his own table over
  collards, beans and rice, mid-conversation. No pills, no glucose meter, no
  clinical equipment, and crucially no herbal remedy: this app must not imply
  that a herb treats a diagnosed condition. It is a picture of somebody living
  well, not of a condition being managed.

  The rest are the plant, the preparation or the practice. None of them is a
  before-and-after, and none shows a remedy producing a result - the evidence
  tiers and caution flags on these screens do that work in words, and a
  photograph must not outrun them.
*/
export function apoImage(id: string): string {
  return base('apo-' + id);
}

export const APOTHECARY_NOTE =
  'Illustration, generated - not a photograph, and not evidence of an effect.';

/*
  Mushroom mastery and Foraged foods.

  These two sets are governed by rules the rest of the media is not, and the
  rules changed what got drawn rather than just what got captioned.

  MUSHROOMS - Content Rule 5. The screen's own band says a wild mushroom is
  never identified from a photo, "not from this app, not from any app". A set of
  six species portraits would be exactly that, whatever the caption said. So
  every mushroom image here is a KITCHEN PROCESS on already-cultivated fungi:
  torn oysters searing in cast iron, shiitake drying gills-up, reishi simmering,
  a decoction going through a sieve. None of them shows a mushroom growing, and
  none is framed as a specimen.

  FORAGE - the same reasoning, and the screen's first band says it outright:
  "Never eat a wild plant identified from an app, a photo or a single book."
  So these are preparations too - roots roasting, nettle wilting, sorrel
  steeping, sea moss gelling, chaya at a hard boil in an open steel pot. A user
  cannot key a plant from any of them, which is the point.

  Both sets carry ATLAS_PREP_NOTE rather than the usual illustration line,
  because "not a photograph" is not the confusion worth foreclosing here. "Not
  something to identify a plant from" is.
*/
export function shroomImage(name: string): string {
  return base('shroom-' + (SHROOM_SLUG[name] ?? 'oyster'));
}

export function forageImage(name: string): string {
  return base('forage-' + (FORAGE_SLUG[name] ?? 'dandelion'));
}


/*
  Per-GROUP imagery for the tabbed guides and the two banded screens.

  These screens already had one header image each, which stayed put while the
  reader moved between four quite different tabs - the calming tea and the
  morning-fire tea shared a picture. Keying the image to the active group means
  the header actually tracks what is being read.

  Ids are the group ids in content.ts, so there is no name-to-slug map to drift.

  SUPPLEMENT SWAPS carries one extra rule: no pills, no capsules, no supplement
  tubs and no branded packaging in any of the four. The screen's whole argument
  is tub versus bulk bin, and illustrating it with the tub would undercut the
  page. Creatine is the one item where the page says the supplement genuinely
  wins - and even there the image is honey water and coffee, because the
  alternative was drawing the product the rest of the screen argues against.

  LIVING WITH DIABETES deliberately gets no group images. That screen's copy
  keeps pointing at the reader's clinician, and illustrating "Herbs & kitchen
  allies" or "Remission" would put a picture where the text is careful to leave
  a question. Its single header image stays.
*/
export function swapGroupImage(id: string): string {
  return base('swapg-' + id);
}

export function freqImage(id: string): string {
  return base('freq-' + id);
}

export function teaGoalImage(id: string): string {
  return base('teag-' + id);
}


/*
  The remaining seven tabbed guides, same reasoning as swaps above: one image per
  group, keyed to the group id in content.ts.

  Two of these needed the rule stated rather than assumed.

  SACRED WATER is a still life of a plain clay vessel and wet earth, with no
  people and no ceremony being performed. Libation and river ceremony are living
  religious practices with their own authorities and initiations; depicting them
  being carried out would be staging someone's religion for decoration. The
  depth text takes the same position - it describes that the practice exists and
  does not instruct.

  CEREMONY & STORY under coconut is the grater bench and the bowl, not a rite,
  for the same reason.
*/
const guideImage = (prefix: string) => (id: string) => base(prefix + '-' + id);

export const nervImage = guideImage('nerv');
export const waterImage = guideImage('water');
export const fermImage = guideImage('ferm');
export const cocoImage = guideImage('coco');
export const honeyImage = guideImage('honey');
export const cerImage = guideImage('cer');
export const shrecImage = guideImage('shrec');


/*
  The six core teas on the Apothecary hub. Brewed cups and the plant part that
  goes into them - calyx, stalk base, rhizome - because the depth text for these
  is largely about what the plant actually is and what the brew is extracting.

  Keyed by the exact `name` in content.ts, which is not a slug: "Hibiscus /
  Sorrel (zobo)" and "Ginger + Turmeric" both contain characters a derived
  filename would mangle, so the map is explicit.
*/
export function teaImage(name: string): string {
  return base('tea-' + (TEA_SLUG[name] ?? 'hibiscus'));
}

const TEA_SLUG: Record<string, string> = {
  'Hibiscus / Sorrel (zobo)': 'hibiscus',
  'Tulsi (Holy Basil)': 'tulsi',
  Lemongrass: 'lemongrass',
  'Blue Vervain': 'vervain',
  Moringa: 'moringa',
  'Ginger + Turmeric': 'gingerturmeric',
};


/*
  Nourish reference screens.

  The Nourish hub comment says "hub image only", because the sub-screens under
  that tab show the USER'S OWN record and a stock picture there would compete
  with their data - on the scan flow it could even be read as their own meal
  photo. That reasoning still holds and these do not break it.

  These four screens are the exception the rule allows for: uptake and
  pairings, the grocery budget, the household and the smoothie builder are
  REFERENCE material, not the user's log. Nothing here can be mistaken for
  something the user recorded.

  `pairImage` is per-pairing and keyed on the exact `combo` string, because each
  one is a specific concrete combination of two foods and a generic header would
  waste the clearest illustration opportunity in the section.
*/
export function nourImage(id: string): string {
  return base('nour-' + id);
}

export function pairImage(combo: string): string {
  return base('pair-' + (PAIR_SLUG[combo] ?? 'cowpea'));
}

const PAIR_SLUG: Record<string, string> = {
  'Cowpeas + lime': 'cowpea',
  'Diri kole ak pwa + pikliz': 'dirikole',
  'Beans + red pepper or guava': 'beanpepper',
  'Three Sisters: corn + beans + squash': 'threesisters',
  'Turmeric + black pepper': 'turmeric',
  'Greens + a healthy fat': 'greensfat',
  'Fermented food + whole grains': 'fermentgrain',
  'Sea moss + microgreens': 'seamoss',
};


/*
  Mobility and seated-and-adaptive exercises, one illustration each.

  These are the only per-EXERCISE images in the app, and they exist because
  seeing the shape of a 90/90 switch or a band row genuinely helps someone
  perform it, in a way that a still of a landscape or a bowl of food does not.

  That makes them the images where being wrong actually costs something, so
  each one was checked against the cue it illustrates rather than against
  whether it looked good. Four were regenerated on that basis: a 90/90 that was
  really a cross-legged sit, an ankle drill that did not show the heel down, a
  "dead hang" with both feet on the floor, and an overhead press with the elbows
  flared wide against the cue text sitting directly beneath it.

  "Dead hang or doorframe stretch" is illustrated with the DOORFRAME half of
  its own title. Two attempts at the hang came back with the feet on the floor
  and the arms unloaded, which is a standing overhead reach and not a hang - and
  an ambiguous picture of a hang teaches nothing. The doorframe version is
  unmistakable, is equally the card, and needs no equipment.

  Ancestral movement deliberately gets none - see the header in
  data/moveDepth.ts for why.
*/
export function mobImage(name: string): string {
  return base('mob-' + (MOB_SLUG[name] ?? 'squat'));
}

export function seatImage(name: string): string {
  return base('seat-' + (SEAT_SLUG[name] ?? 'sitstand'));
}

const MOB_SLUG: Record<string, string> = {
  'Deep squat hold': 'squat',
  'Thoracic rotation, open book': 'openbook',
  '90/90 hip switches': '9090',
  'Ankle rocks at the wall': 'ankle',
  'Wrist & forearm circles': 'wrist',
  'Dead hang or doorframe stretch': 'hang',
};

const SEAT_SLUG: Record<string, string> = {
  'Chair sit-to-stand (or hover)': 'sitstand',
  'Seated marches': 'march',
  'Band row, anchored at a door': 'row',
  'Overhead press, light': 'press',
  'Heel & toe raises': 'heel',
  'Trunk rotation with a reach': 'rotate',
};


/*
  The four food-sovereignty systems on the Journey screen.

  Reference content rather than the user's own record, which is the line the
  Nourish hub draws: a picture beside somebody's logged data competes with it,
  a picture beside "here is what greens do for blood pressure" does not.

  Deliberately food, never anatomy or a body. These cards are about what the pot
  can carry for heart, blood sugar, blood and gut, and a diagram of an organ
  would push a food page toward looking like a medical one.
*/
export function sovImage(id: string): string {
  return base('sov-' + id);
}

export const ATLAS_PREP_NOTE =
  'Illustration of the preparation, generated - never a guide to identifying a plant.';

/* Keyed on the exact `name` strings in content.ts, which are not slugs. */
const SHROOM_SLUG: Record<string, string> = {
  Oyster: 'oyster',
  Shiitake: 'shiitake',
  "Lion's Mane": 'lionsmane',
  Reishi: 'reishi',
  Cordyceps: 'cordyceps',
  'Turkey Tail': 'turkeytail',
};

const FORAGE_SLUG: Record<string, string> = {
  Dandelion: 'dandelion',
  'Stinging nettle': 'nettle',
  'Purslane \u00b7 verdolaga': 'purslane',
  Lambsquarters: 'lambsquarters',
  'Dulse & kelp': 'dulse',
  'Sea moss': 'seamoss',
  'Sorrel \u00b7 roselle': 'sorrel',
  'Cerasee vine': 'cerasee',
  'Moringa leaf': 'moringa',
  'Baobab leaf': 'baobab',
  Bitterleaf: 'bitterleaf',
  'Wild amaranth \u00b7 efo': 'amaranth',
  'Pumpkin leaves & tendrils': 'pumpkin',
  'Chaya \u00b7 tree spinach': 'chaya',
  'Chipil\u00edn': 'chipilin',
};
