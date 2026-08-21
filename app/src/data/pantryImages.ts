/*
  Pantry Codex illustrations, keyed by "<volumeId>|<entry name>".

  Unlike the Foodways Codex, this volume is NOT uniformly illustrated, and the
  gaps are deliberate. 13 of its 54 entries are not things that can be
  photographed, and for several of them a picture would work against the text:

    - Concepts and clinical guidance. "Gluten-free framing", "Oral rehydration
      solution", "Blending vs. whole fruit", "Microgreen vs. sprout",
      "Concentration vs. contribution", "Vitamin D2 from UV". There is no
      subject to photograph.

    - Hazard warnings. "Shiitake dermatitis", "Golden oyster spore load",
      "Wild foraged mushrooms", "Sun tea", "Fungicide-treated seed". An
      appetising image beside a warning undercuts the warning - a handsome
      photograph of wild mushrooms next to "do not forage these" is worse than
      no photograph at all.

    - A declared gap. "Diaspora mushroom foodways" carries the `gap` tier: the
      entry IS the absence of documentation. Illustrating it would manufacture
      presence exactly where the app says it has none.

  So a null return here is a decision, not a missing file. Callers render the
  card without an image; the empty cards are how the volume shows which of its
  entries are ingredients and which are cautions and concepts.
*/

const PANTRY_SLUGS: Record<string, string> = {
  "grains|Fonio": "fonio",
  "grains|Teff": "teff",
  "grains|Sorghum": "sorghum",
  "grains|Pearl millet": "pearl-millet",
  "grains|African rice": "african-rice",
  "grains|Maize + nixtamalization": "maize-nixtamalization",
  "grains|Quinoa": "quinoa",
  "grains|Wild rice": "wild-rice",
  "legumes|Cowpea / black-eyed pea": "cowpea-black-eyed-pea",
  "legumes|Bambara groundnut": "bambara-groundnut",
  "legumes|African yam bean": "african-yam-bean",
  "legumes|Marama bean": "marama-bean",
  "legumes|Pigeon pea": "pigeon-pea",
  "legumes|Peanut / groundnut": "peanut-groundnut",
  "legumes|Kidney beans & lectins": "kidney-beans-lectins",
  "legumes|Soy": "soy",
  "fungi|Turkey tail (PSK/PSP)": "turkey-tail-psk-psp",
  "fungi|Lion’s mane": "lion-s-mane",
  "fungi|Reishi & cordyceps": "reishi-cordyceps",
  "fungi|Termitomyces": "termitomyces",
  "infusions|Hibiscus": "hibiscus",
  "infusions|Ginger": "ginger",
  "infusions|Turmeric": "turmeric",
  "infusions|Rooibos & honeybush": "rooibos-honeybush",
  "infusions|Soursop leaf": "soursop-leaf",
  "infusions|Guinea hen weed": "guinea-hen-weed",
  "infusions|Cerasee": "cerasee",
  "infusions|Sea moss": "sea-moss",
  "infusions|Cassia vs. true cinnamon": "cassia-vs-true-cinnamon",
  "liquid|Beet juice & nitrate": "beet-juice-nitrate",
  "liquid|Coconut water": "coconut-water",
  "liquid|Plant protein powders": "plant-protein-powders",
  "liquid|Home ferments": "home-ferments",
  "liquid|Sorrel / bissap / karkade": "sorrel-bissap-karkade",
  "liquid|Peanut punch & mauby": "peanut-punch-mauby",
  "micro|Radish": "radish",
  "micro|Pea shoots": "pea-shoots",
  "micro|Sunflower shoots": "sunflower-shoots",
  "micro|Amaranth": "amaranth",
  "micro|Buckwheat": "buckwheat",
  "micro|Cucurbit microgreens": "cucurbit-microgreens",
};

/* null where the entry is a concept, a caution, or a declared gap - see above. */
export function pantryImage(volumeId: string, name: string): string | null {
  const slug = PANTRY_SLUGS[volumeId + '|' + name];
  return slug ? '/media/pantry-' + slug + '.webp' : null;
}

export const PANTRY_ILLUSTRATED = 41;
export const PANTRY_INTENTIONALLY_BARE = 13;
