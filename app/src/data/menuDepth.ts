/*
  Allergens a menu dish contains beyond the one its `has` field can hold.

  Separate file; content.ts is untouched per README rule 3.

  ─────────────────────────────────────────
  WHY THIS FILE HAS TO EXIST

  The restaurant fit check reads a single value:

      const clash = !!(m.has && blocked.includes(m.has));

  `has` is one string, so a dish can declare exactly one allergen. A dish
  containing two declares the first and stays silent about the second.

  The co-op's Ginger-Tamari Braised Tofu is that dish. Its description reads
  "Hot-bar tray · scallion, sesame oil" and its `has` is 'soy'. With soy-free
  off and sesame-free on, the app counted it among "6 of 7 dishes fit your
  profile" and offered an add-to-order button - while the word sesame sat in
  the dish's own description on the same card.

  This is the same shape as the Tostones bug in DISCREPANCIES 39. That one was
  `allergen` never being read at all; this one is `has` not being able to carry
  what the dish already says out loud.

  ─────────────────────────────────────────
  THE LINE THIS FILE HOLDS

  Nothing here is inferred about what a kitchen might do. Every entry is an
  allergen the app's OWN text - the dish name, its description or its tags -
  already names. Guessing that a stew "probably" contains something would be
  inventing a safety claim, which is the opposite of the point.

  scripts/allergens.mjs enforces exactly that: it fails if any menu dish names
  an allergen that neither `has` nor this file covers, and it also fails on a
  stale entry here that the dish's text no longer supports.
*/

/** Extra allergens, keyed by menu-item id. Lowercase, matching `has` values. */
export const extraAllergens: Record<string, string[]> = {
  /*
    desc: 'Hot-bar tray · scallion, sesame oil'. `has` is already spent on
    'soy' - which the dish genuinely contains, via both tofu and tamari.
  */
  'c-tofu': ['sesame'],
};

/** Every allergen a dish carries: its own `has`, plus anything above. */
export function allAllergens(item: { id?: string; has?: string }): string[] {
  const extra = (item.id && extraAllergens[item.id]) || [];
  return (item.has ? [item.has] : []).concat(extra);
}
