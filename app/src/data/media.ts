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
