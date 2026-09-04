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

/*
  ─────────────────────────────────────────
  COLOURS TOO PALE TO BE TEXT AT ALL

  The map above is an identity mapping: same colour, theme-aware. Some data
  colours are not readable as text in EITHER theme, because they were chosen to
  be a fill and a fill can be far lighter than text is allowed to be.

  Measured against the card (#FFFDF7), where 4.5:1 is required:

    #C79A45  ochre       2.54:1   ->  --gold   5.83:1
    #C9B98C  pale tan    1.91:1   ->  --earth  6.68:1
    #A9736F  dusty rose  3.85:1   ->  --clay   6.90:1

  These are substitutions, not identity mappings, and that is the point: the
  darker member of the same family carries the same meaning at a legible weight.
  A pricing table whose price is unreadable has not kept its colour coding, it
  has lost its price.
*/
const TOO_PALE_FOR_TEXT: Record<string, string> = {
  '#C79A45': 'gold',
  '#C9B98C': 'earth',
  '#A9736F': 'clay',
};

/**
 * The theme-aware form of a data colour, for use as TEXT.
 * Returns `var(--token)` when the hex is a known palette colour, substitutes a
 * darker sibling when the colour cannot be read as text, and returns the input
 * unchanged otherwise - including when it is already a `var(...)`.
 */
export function textColour(c: string | undefined): string {
  if (!c) return 'var(--ink-meta)';
  if (c.startsWith('var(')) return c;
  const up = c.toUpperCase();
  const pale = TOO_PALE_FOR_TEXT[up];
  if (pale) return 'var(--' + pale + ')';
  const tok = BY_HEX[up];
  return tok ? 'var(--' + tok + ')' : c;
}

/**
 * Text to place ON a solid fill of `c`: ink for a light fill, cream for a dark
 * one.
 *
 * The membership badge hardcoded cream, which is right for the two dark tier
 * accents and wrong for the one light one - "Most chosen" is the only badge
 * that renders, and it sits on the light ochre at 2.22:1. Deciding by the
 * fill's own luminance is correct whichever accent a tier carries later.
 */
export function onColour(c: string | undefined): string {
  if (!c || c.startsWith('var(')) return 'var(--on-dark)';
  const rgb = /^#([0-9a-fA-F]{6})$/.exec(c.trim());
  if (!rgb) return 'var(--on-dark)';
  const n = rgb[1];
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return L > 0.28 ? 'var(--ink)' : 'var(--on-dark)';
}
