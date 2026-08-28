/*
  Striped-header legibility.

  Neither existing contrast pass can see these headers.

  - PAIRS in contrast.mjs is a list of token-to-token pairings, and a striped
    header's ground is not a token: it is a per-item colour out of content.ts,
    47 of them, painted as a two-colour stripe.
  - The derived pass added in #61 reads style objects, and this ground is built
    by stripes(c1, c2) at runtime from data.
  - A runtime DOM audit cannot read it either: it is a repeating-linear-gradient,
    so getComputedStyle gives no single background colour to measure against.

  So the most variable ground in the app - 47 different colour pairs, authored
  per crop and per codex volume - was the one nobody was checking.

  HOW THE GROUND IS ACTUALLY BUILT (PhotoHeader, components/Headers.tsx):

      background: stripes(c1, c2, 12)          <- fallback, behind a lazy image
      overlaid by linear-gradient(180deg, rgba(15,13,10,0.58), rgba(15,13,10,0.34))
      text: var(--on-dark)

  The scrim is what makes these headers work, and it is NOT uniform: 58% black
  at the top, thinning to 34% at the bottom. So the honest worst case is the
  LIGHTER of the two stripe colours under the WEAKEST scrim, and where in the
  header the text sits decides which scrim applies to it.

  Two things are measured, at the two thresholds that bind:

    title  - large text high in the header, so 3:1
    mark   - the "Illustration" label at 9.5px/700, pinned to the bottom right
             where the scrim is thinnest, so 4.5:1

  The mark now carries its own backing, so the binding case for it is not the
  fallback stripe at all but the worst image that could load behind it. That is
  measured separately, against pure white.
*/
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

const hex = (h) => {
  const s = h.replace('#', '').trim();
  const n = s.length === 3 ? s.split('').map((c) => c + c).join('') : s;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
};
const chan = (v) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const lum = (rgb) => {
  const [r, g, b] = rgb.map(chan);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
/* src over dst, both opaque-backed. */
const over = (src, alpha, dst) => dst.map((d, i) => Math.round(alpha * src[i] + (1 - alpha) * d));

const css = readFileSync(join(here, '..', 'src', 'theme', 'tokens.css'), 'utf8');
const onDark = /--on-dark:\s*(#[0-9A-Fa-f]{3,8})/.exec(css)[1];

const content = readFileSync(join(here, '..', 'src', 'data', 'content.ts'), 'utf8');

/*
  These are PhotoHeader's numbers, not StripedHeader's.

  StripedHeader exists, takes the same c1/c2, and is imported by NOTHING - it is
  dead. The 47 colour pairs are actually consumed by PhotoHeader, where the
  stripes are the ground BEHIND a lazy-loaded image: what a reader sees while
  the image is still arriving, or if the file is missing. PhotoHeader's scrim is
  slightly stronger than the dead component's (0.58/0.34 against 0.55/0.30), so
  measuring the dead one's numbers would have been pessimistic by a hair and
  wrong in principle.

  What this does NOT measure is text over the loaded photograph. No static check
  can: the ground is then an image. The scrim is the mitigation, and the
  component's own comment says so - "without it they are illegible over a light
  image".
*/
const SCRIM = [15, 13, 10];
const WEAKEST = 0.34;   /* bottom of the header - where the small mark sits */
const STRONGEST = 0.58; /* top */

/* The "Illustration" mark's own backing, from PhotoHeader. */
const MARK_BG = [15, 13, 10];
const MARK_BG_ALPHA = 0.68;

const rows = [];
let failing = 0;

for (const m of content.matchAll(/c1:\s*'(#[0-9A-Fa-f]{6})',\s*c2:\s*'(#[0-9A-Fa-f]{6})'/g)) {
  const before = content.slice(0, m.index);
  const name = [...before.matchAll(/\b(?:name|title):\s*'([^']{2,50})'/g)].pop();
  const label = name ? name[1] : '(unnamed)';

  const [c1, c2] = [hex(m[1]), hex(m[2])];
  /* the lighter stripe is the harder one for cream text */
  const pale = lum(c1) >= lum(c2) ? c1 : c2;

  /* Title text sits high, where the scrim is strongest; it is large, so 3:1. */
  const groundTop = over(SCRIM, STRONGEST, pale);
  const title = ratio(hex(onDark), groundTop);

  /* The mark's own ground, over the fallback stripe. */
  const groundBottom = over(SCRIM, WEAKEST, pale);
  const mark = ratio(hex(onDark), over(MARK_BG, MARK_BG_ALPHA, groundBottom));

  const okTitle = title >= 3;
  const okMark = mark >= 4.5;
  if (!okTitle || !okMark) failing += 1;
  rows.push([label, m[1], m[2], title, mark, okTitle, okMark]);
}

rows.sort((a, b) => a[3] - b[3]);

console.log('PhotoHeader fallback ground: text over the pale stripe, under the scrim');
console.log('-'.repeat(88));
console.log(['ITEM'.padEnd(34), 'PALE'.padEnd(8), 'TITLE'.padEnd(7), 'MARK'.padEnd(7), 'TITLE 3:1', 'MARK 4.5:1'].join(' '));
console.log('-'.repeat(88));
for (const [label, a, b, worst, best, okT, okS] of rows) {
  console.log([
    label.slice(0, 33).padEnd(34),
    (lum(hex(a)) >= lum(hex(b)) ? a : b).padEnd(8),
    (worst.toFixed(2) + ':1').padEnd(7),
    (best.toFixed(2) + ':1').padEnd(7),
    (okT ? 'pass' : 'FAIL').padEnd(9),
    okS ? 'pass' : 'below',
  ].join(' '));
}
console.log('-'.repeat(88));

/*
  The mark carries its own backing, so its legibility does not depend on the
  fallback stripe at all - it has to hold against ANY illustration that loads.
  Pure white is the worst image there is, so that is the case worth stating.
*/
const worstImage = ratio(hex(onDark), over(MARK_BG, MARK_BG_ALPHA, [255, 255, 255]));
const okWorst = worstImage >= 4.5;
if (!okWorst) failing += 1;
console.log("'Illustration' mark over a pure white image: "
  + worstImage.toFixed(2) + ':1  ' + (okWorst ? 'pass' : 'FAIL')
  + '  (image-independent, so this is the binding case)');

const badTitle = rows.filter((r) => !r[5]).length;
const badMark = rows.filter((r) => !r[6]).length;
console.log(rows.length + ' fallback grounds measured · '
  + badTitle + ' titles below 3:1 · ' + badMark + ' marks below 4.5:1');
process.exit(failing ? 1 : 0);
