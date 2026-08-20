/*
  The three tier vocabularies, ported from the prototype's evTier / clsTier /
  claimTier methods. Labels are copy — they are not editable here. Rewording a
  tier label changes what the app claims about a dish or a health effect, which
  the handoff treats as a correctness bug rather than a style choice.

  NOTE (flagged for editorial review): the handoff README's tier tables are a
  subset of, and in two places disagree with, the prototype's actual maps. The
  prototype is named as "the primary reference", so its values are used here.
  See docs/DISCREPANCIES.md.

  Each tier carries a light and a dark pair. Dark is a real palette, not an
  inversion. `glyph` is a redundant, non-colour encoding shown when the
  colourblind-safe setting is on (it is on by default).
*/

export type TierPair = { bg: string; fg: string };
export type Tier = { label: string; light: TierPair; dark: TierPair; glyph: string };

/* Colour families shared across the three vocabularies. */
const FAMILY = {
  green:  { light: { bg: '#E4EDDD', fg: '#2F4A31' }, dark: { bg: '#1E2C1F', fg: '#9DCB98' }, glyph: '\u25CF' },
  blue:   { light: { bg: '#D9E7EC', fg: '#2E6B7A' }, dark: { bg: '#17272C', fg: '#86C2D2' }, glyph: '\u25B2' },
  brown:  { light: { bg: '#F0E3D2', fg: '#7E5124' }, dark: { bg: '#2C2114', fg: '#DBAC6C' }, glyph: '\u25A0' },
  rose:   { light: { bg: '#EADBD5', fg: '#8F4230' }, dark: { bg: '#2E1D18', fg: '#E89173' }, glyph: '\u25C6' },
  alarm:  { light: { bg: '#F6DED6', fg: '#8F4230' }, dark: { bg: '#3A211A', fg: '#F09B7E' }, glyph: '\u25C6' },
  indigo: { light: { bg: '#E1E4EF', fg: '#2C3A63' }, dark: { bg: '#1B2035', fg: '#AEB9E6' }, glyph: '\u2726' },
  neutral:{ light: { bg: '#EFEAE0', fg: '#67604F' }, dark: { bg: '#26221B', fg: '#BCB2A0' }, glyph: '\u25CB' },
  sage:   { light: { bg: '#E9EADC', fg: '#4C5340' }, dark: { bg: '#22251C', fg: '#B4BCA4' }, glyph: '\u25D0' },
  amber:  { light: { bg: '#F6E7D8', fg: '#8A5320' }, dark: { bg: '#2E2317', fg: '#E0A96A' }, glyph: '\u25B3' },
} as const;

const t = (label: string, fam: keyof typeof FAMILY): Tier => ({ label, ...FAMILY[fam] });

/* Evidence strength behind a health or historical claim. */
export const EV_TIER: Record<string, Tier> = {
  well:         t('Well established', 'green'),
  emerging:     t('Emerging evidence', 'blue'),
  trad:         t('Traditional use', 'brown'),
  oral:         t('Community oral history', 'rose'),
  strong:       t('Strong scientific', 'green'),
  moderate:     t('Moderate scientific', 'blue'),
  historical:   t('Verified historical', 'sage'),
  contested:    t('Contested interpretation', 'amber'),
  spiritual:    t('Religious / spiritual', 'indigo'),
  contemporary: t('Contemporary innovation', 'neutral'),
};

/*
  How a dish stands in relation to its own history. These five-plus labels are
  the editorial core of the product: a dish is never relabelled to suit a diet,
  and diaspora food is never described as "veganised".
*/
export const CLS_TIER: Record<string, Tier> = {
  vegan:     t('Traditionally vegan', 'green'),
  forward:   t('Traditionally plant-forward', 'blue'),
  adapt:     t('Adaptation', 'brown'),
  recon:     t('Diasporic reconstruction', 'rose'),
  diasporic: t('Diasporic innovation', 'indigo'),
  contemp:   t('Contemporary innovation', 'neutral'),
};

/* What is actually known about an ingredient's claimed effect. */
export const CLAIM_TIER: Record<string, Tier> = {
  staple:   t('Culinary staple', 'neutral'),
  proven:   t('Multiple human trials', 'green'),
  prelim:   t('Preliminary evidence', 'blue'),
  tradonly: t('Traditional use only', 'brown'),
  caution:  t('Safety caution', 'alarm'),
  gap:      t('Documentation gap', 'indigo'),
};

export type TierKind = 'ev' | 'cls' | 'claim';

const TABLES: Record<TierKind, { map: Record<string, Tier>; fallback: string; noun: string }> = {
  ev:    { map: EV_TIER,    fallback: 'emerging', noun: 'Evidence' },
  cls:   { map: CLS_TIER,   fallback: 'forward',  noun: 'Classification' },
  claim: { map: CLAIM_TIER, fallback: 'staple',   noun: 'Claim' },
};

/* Resolves a tier key, matching the prototype's fallback behaviour exactly. */
export function resolveTier(kind: TierKind, key: string | undefined) {
  const table = TABLES[kind];
  return { tier: table.map[key ?? ''] ?? table.map[table.fallback], noun: table.noun };
}

/*
  Most of the Explore data carries its evidence grade as a display string
  ("Traditional use") rather than a tier key. Rather than let those render as
  loose text — which would sidestep the badge system and its colour-blind glyph
  and screen-reader prefix — they are resolved back to a real tier here.

  An unrecognised label is a content error worth seeing, so it falls back to the
  weakest grade rather than the strongest.
*/
const EV_BY_LABEL: Record<string, string> = Object.fromEntries(
  Object.entries(EV_TIER).map(([key, tier]) => [tier.label.toLowerCase(), key]),
);

export function evKeyFromLabel(label: string | undefined): string {
  return EV_BY_LABEL[(label ?? '').trim().toLowerCase()] ?? 'emerging';
}
