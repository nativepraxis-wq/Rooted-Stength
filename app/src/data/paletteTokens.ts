/*
  Data colours, mapped to the theme token that carries the same colour.

  ─────────────────────────────────────────
  WHY

  273 uses of 28 distinct colours are written as fixed hexes in the data layer
  (`c: '#2F4A31'`). Most of them are decorative - a 12px stripe down a card, a
  dot beside a row - where a fixed hex is harmless and 4.5:1 does not apply.

  Where one of those colours is used as TEXT, it is not harmless. A fixed hex
  does not respond to the theme, so a colour chosen against a light card stays
  dark on a dark one. A runtime audit of every text node found seven such
  failures, all in dark mode, none in light:

    Today   "Fermentation jar" eyebrow        2.41:1
    Journey five victory tags            1.65 - 2.72:1
    Move    logged-session button            1.75:1

  Ten of the 28 data colours are EXACTLY a light-theme token value - the data
  was written by copying the palette. Those have a theme-aware equivalent
  already; the hex just never reached it.

  ─────────────────────────────────────────
  WHAT THIS DOES NOT DO

  It does not remap the data layer. content.ts is verbatim, and the 273 uses are
  overwhelmingly decorative and correct as they are. This is applied at the few
  render sites where a data colour becomes text, and nowhere else.

  An unknown hex is returned unchanged rather than guessed at. A colour with no
  token is not improved by being mapped to an approximation of itself.
*/

/** Light-theme hex -> the token that carries it. Uppercase keys. */
const BY_HEX: Record<string, string> = {
  '#2F4A31': 'leaf',
  '#3C5A42': 'leaf-mid',
  '#8F4230': 'clay',
  '#8F3E2C': 'clay-hover',
  '#2E6B7A': 'teal',
  '#7E5124': 'earth',
  '#7A3C4A': 'plum',
  '#2C3A63': 'indigo',
  '#C79A45': 'ochre',
  '#D4AA5C': 'ochre-light',
  '#7E5F1C': 'gold',
};

/**
 * The theme-aware form of a data colour, for use as TEXT.
 * Returns `var(--token)` when the hex is a known palette colour, and the input
 * unchanged otherwise - including when it is already a `var(...)`.
 */
export function textColour(c: string | undefined): string {
  if (!c) return 'var(--ink-meta)';
  if (c.startsWith('var(')) return c;
  const tok = BY_HEX[c.toUpperCase()];
  return tok ? 'var(--' + tok + ')' : c;
}
