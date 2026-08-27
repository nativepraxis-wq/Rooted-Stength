/*
  Independent contrast check for both palettes.

  The handoff requires that if any colour changes, the pairing is re-verified —
  and that the dark theme's contrast is verified on its own rather than assumed
  from the light theme. Run with `npm run contrast`.

  Thresholds: WCAG 2.2 AA — 4.5:1 for body text, 3:1 for large text (>=18.66px
  bold or >=24px) and for non-text boundaries (1.4.11).
*/

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

const hex = (h) => {
  const s = h.replace('#', '').trim();
  const n = s.length === 3 ? s.split('').map((c) => c + c).join('') : s;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
};

const lum = (h) => {
  const [r, g, b] = hex(h).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

/* Pull the token values straight out of the stylesheet so this cannot drift. */
function tokens(css, selector) {
  const block = css.split(selector)[1]?.split('}')[0] ?? '';
  const out = {};
  for (const m of block.matchAll(/--([\w-]+):\s*(#[0-9A-Fa-f]{3,8})\s*;/g)) out[m[1]] = m[2];
  return out;
}

const css = readFileSync(join(here, '..', 'src', 'theme', 'tokens.css'), 'utf8');
const light = tokens(css, ':root {');
const dark = { ...light, ...tokens(css, "[data-theme='dark'] {") };

/* Foreground / background pairs that actually occur in the UI. */
const PAIRS = [
  ['body text on app ground', 'ink-body', 'sand', 4.5],
  ['heading on app ground', 'ink', 'sand', 4.5],
  ['muted text on app ground', 'ink-muted', 'sand', 4.5],
  ['soft text on app ground', 'ink-soft', 'sand', 4.5],
  ['meta text on app ground', 'ink-meta', 'sand', 4.5],
  ['body text on card', 'ink-body', 'card', 4.5],
  ['heading on card', 'ink', 'card', 4.5],
  ['muted text on card', 'ink-muted', 'card', 4.5],
  ['meta text on card', 'ink-meta', 'card', 4.5],
  ['meta text on inset panel', 'ink-meta', 'surface-1', 4.5],
  ['meta text on chip', 'ink-meta', 'surface-2', 4.5],
  ['link / clay on app ground', 'clay', 'sand', 4.5],
  ['earth accent on app ground', 'earth', 'sand', 4.5],
  ['teal accent on app ground', 'teal', 'sand', 4.5],
  ['leaf accent on app ground', 'leaf', 'sand', 4.5],
  ['plum accent on app ground', 'plum', 'sand', 4.5],
  ['indigo accent on app ground', 'indigo', 'sand', 4.5],
  /*
    Accents also sit on card fill, not only on the app ground - the mineral
    atlas puts earth, clay and leaf there. Those pairings were never measured,
    so they are added rather than assumed from the ground figures; card and
    ground are different backgrounds and dark mode does not rank them the same.
  */
  ['earth accent on card', 'earth', 'card', 4.5],
  ['clay accent on card', 'clay', 'card', 4.5],
  ['leaf accent on card', 'leaf', 'card', 4.5],
  ['active tab ink', 'forest-tab-active', 'card', 4.5],
  ['inactive tab ink', 'tab-inactive', 'card', 4.5],
  ['cream band text', 'ink-muted', 'surface-cream', 4.5],
  ['safety band text', 'ink-muted', 'safety-bg', 4.5],
];

/*
  Default borders are decorative: cards are already separated from the ground by
  fill and shadow, so 1.4.11's 3:1 does not bind on them. They are reported as
  INFO rather than measured against an invented threshold. High-contrast mode is
  different — there the border IS the separator, so it is required to clear 3:1.
*/
const INFO_BORDERS = [
  ['card border vs ground', 'border', 'sand'],
  ['strong border vs card', 'border-2', 'card'],
];

const CONTRAST_BORDERS = [
  ['high-contrast border vs ground', 'border', 'sand', 3],
  ['high-contrast border vs card', 'border-2', 'card', 3],
];

/* Tier badge pairs, mirrored from src/data/tiers.ts. */
const TIER_FAMILIES = {
  green: [['#E4EDDD', '#2F4A31'], ['#1E2C1F', '#9DCB98']],
  blue: [['#D9E7EC', '#2E6B7A'], ['#17272C', '#86C2D2']],
  brown: [['#F0E3D2', '#7E5124'], ['#2C2114', '#DBAC6C']],
  rose: [['#EADBD5', '#8F4230'], ['#2E1D18', '#E89173']],
  alarm: [['#F6DED6', '#8F4230'], ['#3A211A', '#F09B7E']],
  indigo: [['#E1E4EF', '#2C3A63'], ['#1B2035', '#AEB9E6']],
  neutral: [['#EFEAE0', '#67604F'], ['#26221B', '#BCB2A0']],
  sage: [['#E9EADC', '#4C5340'], ['#22251C', '#B4BCA4']],
  amber: [['#F6E7D8', '#8A5320'], ['#2E2317', '#E0A96A']],
};

/*
  DERIVED PAIRS.

  PAIRS above is hand-maintained - "pairs that actually occur in the UI" - and a
  hand-maintained list of what occurs is a claim that goes stale the moment
  someone adds a screen. It did go stale: the hydration screen's "+ Add a cup"
  button set `background: var(--teal)` with `color: var(--on-dark)`, no pair
  covered it, and the gate reported "70 pairings, 0 failing" while that button
  rendered cream on pale teal at 1.85:1 in dark mode.

  This reads every style object in the app that sets BOTH a colour and a
  background from tokens, and checks each combination it finds.

  The curated list still earns its place: it carries real labels, non-4.5
  thresholds, and pairs split across elements, none of which this can see. A
  same-object pair is only a LOWER BOUND on what renders, because colour is
  inherited. This does not make the gate complete - it makes it self-maintaining
  for the one case it can see without guessing.
*/
function derivedPairs() {
  const dir = join(here, '..', 'src');
  const found = new Map();
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) { walk(p); continue; }
      if (!/\.tsx?$/.test(e.name)) continue;
      const src = readFileSync(p, 'utf8');
      for (const m of src.matchAll(/\{[^{}]*\}/g)) {
        const t = m[0];
        const f = /\bcolor:\s*'var\(--([\w-]+)\)'/.exec(t);
        const b = /\b(?:background|backgroundColor):\s*'var\(--([\w-]+)\)'/.exec(t);
        if (f && b) found.set(f[1] + '|' + b[1], [f[1], b[1], e.name]);
      }
    }
  };
  walk(dir);
  return [...found.values()];
}

const DERIVED = derivedPairs();

let failures = 0;
const rows = [];

for (const [themeName, t] of [['light', light], ['dark', dark]]) {
  for (const [label, fg, bg, min] of PAIRS) {
    if (!t[fg] || !t[bg]) { rows.push([themeName, label, 'MISSING TOKEN', '', '']); failures++; continue; }
    const r = ratio(t[fg], t[bg]);
    const ok = r >= min;
    if (!ok) failures++;
    rows.push([themeName, label, r.toFixed(2) + ':1', min + ':1', ok ? 'pass' : 'FAIL']);
  }
}

for (const [themeName, t] of [['light', light], ['dark', dark]]) {
  for (const [label, fg, bg] of INFO_BORDERS) {
    rows.push([themeName, label, ratio(t[fg], t[bg]).toFixed(2) + ':1', 'n/a', 'info']);
  }
}

/* Same-object colour/background combinations, read out of the source. */
for (const [themeName, t] of [['light', light], ['dark', dark]]) {
  for (const [fg, bg, file] of DERIVED) {
    if (!t[fg] || !t[bg]) continue;
    const r = ratio(t[fg], t[bg]);
    const ok = r >= 4.5;
    if (!ok) failures++;
    rows.push([themeName, 'derived · ' + fg + ' on ' + bg + ' (' + file + ')',
      r.toFixed(2) + ':1', '4.50:1', ok ? 'pass' : 'FAIL']);
  }
}

/* High-contrast mode must actually deliver a 3:1 separator. */
const hcLight = { ...light, ...tokens(css, "[data-contrast='on'] {") };
const hcDark = { ...dark, ...tokens(css, "[data-theme='dark'][data-contrast='on'] {") };
for (const [themeName, t] of [['light+hc', hcLight], ['dark+hc', hcDark]]) {
  for (const [label, fg, bg, min] of CONTRAST_BORDERS) {
    const r = ratio(t[fg], t[bg]);
    const ok = r >= min;
    if (!ok) failures++;
    rows.push([themeName, label, r.toFixed(2) + ':1', min.toFixed(2) + ':1', ok ? 'pass' : 'FAIL']);
  }
}

/* Badge text is 9.5px/800 — small text, so it needs the full 4.5:1. */
for (const [name, [[lbg, lfg], [dbg, dfg]]] of Object.entries(TIER_FAMILIES)) {
  for (const [themeName, bg, fg] of [['light', lbg, lfg], ['dark', dbg, dfg]]) {
    const r = ratio(fg, bg);
    const ok = r >= 4.5;
    if (!ok) failures++;
    rows.push([themeName, 'tier badge · ' + name, r.toFixed(2) + ':1', '4.50:1', ok ? 'pass' : 'FAIL']);
  }
}

const w = [9, 32, 10, 9, 6];
const line = (r) => r.map((c, i) => String(c).padEnd(w[i])).join(' ');
console.log(line(['THEME', 'PAIRING', 'RATIO', 'MIN', 'RESULT']));
console.log('-'.repeat(w.reduce((a, b) => a + b + 1, 0)));
for (const r of rows) console.log(line(r));
console.log('-'.repeat(w.reduce((a, b) => a + b + 1, 0)));
const measured = rows.filter((r) => r[4] !== 'info').length;
console.log(measured + ' pairings measured against a threshold, ' + failures + ' failing'
  + ' (' + (rows.length - measured) + ' reported as info)');

process.exit(failures ? 1 : 0);
