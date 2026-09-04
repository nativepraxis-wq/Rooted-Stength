/*
  Inherited-colour contrast, for every route, without a browser.

  ─────────────────────────────────────────
  THE GAP THIS CLOSES

  scripts/contrast.mjs compares token to token, and its derived pass (item 47)
  reads style objects. Neither can see inherited colour: text that takes its
  colour from one element and its ground from an ancestor three levels up is
  invisible to both. A runtime DOM audit found seven such failures (item 50) -
  but it needs a browser, so it never entered CI and the class stayed ungated.

  This gets the same answer without one. h1-check.tsx already renders all 86
  routes through react-dom/server, and this app styles everything with inline
  `style={{…}}`, so the rendered HTML carries every colour that matters. Walk
  that HTML with a stack, inherit down it the way a browser would, and the
  effective foreground and background of each text node fall out.

  The h1 gate's note applies here too: no browser means seconds in CI rather
  than a Chromium download.

  ─────────────────────────────────────────
  WHAT IT CANNOT SEE, STATED PLAINLY

  - A gradient or image ground. `getComputedStyle` cannot resolve one either;
    those elements are skipped and counted, not guessed at.
  - Anything a stylesheet paints rather than an inline style. This app is
    inline-styled almost throughout, which is what makes the approach work.
  - Layout. An element may be positioned over a different ground than its DOM
    parent. That is why the runtime audit still has a job.

  It is a lower bound on what a browser would find, and a large one.
*/
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { StoreProvider } from '../src/state/store';
import { SCREENS } from '../src/App';
import { ROUTES } from '../src/nav/routes';

/* ---------- colour ---------- */

const hexRgb = (h: string): number[] | null => {
  const s = h.replace('#', '').trim();
  if (!/^[0-9a-fA-F]{3,8}$/.test(s)) return null;
  const n = s.length === 3 ? s.split('').map((c) => c + c).join('') : s;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
};

const chan = (v: number) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const lum = (rgb: number[]) => {
  const [r, g, b] = rgb.map(chan);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a: number[], b: number[]) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
/* src over dst */
const over = (src: number[], alpha: number, dst: number[]) =>
  dst.map((d, i) => Math.round(alpha * src[i] + (1 - alpha) * d));

function tokens(css: string, selector: string) {
  const block = css.split(selector)[1]?.split('}')[0] ?? '';
  const out: Record<string, string> = {};
  for (const m of block.matchAll(/--([\w-]+):\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

/* Paths are relative to app/, where the npm script runs - the built bundle
   lives in .cssrcheck/, so import.meta.url would resolve into the wrong tree. */
const css = readFileSync('src/theme/tokens.css', 'utf8');
const LIGHT = tokens(css, ':root {');
const DARK = { ...LIGHT, ...tokens(css, "[data-theme='dark'] {") };

/**
 * A colour string to rgb, resolving var() against a theme and compositing
 * rgba() onto a known ground. Returns null when it cannot be resolved -
 * a gradient, or a token that is not a flat colour.
 */
function resolve(value: string | undefined, theme: Record<string, string>,
  ground: number[] | null): number[] | null {
  if (!value) return null;
  let v = value.trim();
  for (let i = 0; i < 4 && v.startsWith('var('); i += 1) {
    const name = /var\(\s*--([\w-]+)/.exec(v);
    if (!name) return null;
    v = (theme[name[1]] ?? '').trim();
  }
  if (!v || v === 'transparent' || v === 'none' || v === 'inherit') return null;
  if (v.includes('gradient') || v.includes('url(')) return null;
  if (v.startsWith('#')) return hexRgb(v);
  const m = /rgba?\(([^)]+)\)/.exec(v);
  if (m) {
    const p = m[1].split(',').map((x) => parseFloat(x));
    if (p.length >= 4) {
      if (p[3] <= 0.02) return null;
      return ground ? over(p.slice(0, 3), p[3], ground) : p.slice(0, 3);
    }
    return p.slice(0, 3);
  }
  return null;
}

/* ---------- a very small HTML walker ---------- */

type Frame = {
  fg?: string; bg?: number[] | null; size: number; weight: number; gradient: boolean;
};

/*
  There is deliberately no void-element list here.

  The first version had one, including the SVG shapes. That was wrong and it
  mattered: renderToStaticMarkup emits SVG children with EXPLICIT closing tags -
  `<polyline …></polyline>`, not `<polyline/>` - so a void list skipped the push
  and still took the pop. Every shape in a chart unwound the stack one frame too
  far, and text after an inline SVG was attributed to an ancestor of its real
  parent.

  On the hike screen that walked the stack clean past the DarkHeader's gradient,
  so a cream-on-dark stat chip was measured as if it sat on the light page
  ground and reported at 1.86:1. Checking it in a real browser showed the ground
  is a 13% cream wash over a forest gradient - not a failure at all.

  React self-closes true void elements, so `selfClose` already covers them.
  Push on every open tag that is not self-closed, pop on every close.
*/

/** `calc(12.5px * var(--scale))` -> 12.5, at scale 1. */
function px(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const m = /([\d.]+)px/.exec(value);
  return m ? parseFloat(m[1]) : fallback;
}

function styleMap(attr: string) {
  const out: Record<string, string> = {};
  /* split on ; that are not inside parentheses */
  let depth = 0; let cur = '';
  const parts: string[] = [];
  for (const ch of attr) {
    if (ch === '(') depth += 1;
    if (ch === ')') depth -= 1;
    if (ch === ';' && depth === 0) { parts.push(cur); cur = ''; continue; }
    cur += ch;
  }
  parts.push(cur);
  for (const p of parts) {
    const i = p.indexOf(':');
    if (i < 0) continue;
    out[p.slice(0, i).trim()] = p.slice(i + 1).trim();
  }
  return out;
}

const decode = (s: string) => s
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, ' ');

type Fail = { text: string; r: number; min: number; size: number };

function audit(html: string, theme: Record<string, string>) {
  const rootBg = resolve('var(--sand)', theme, null) ?? [255, 255, 255];
  const stack: Frame[] = [{ fg: 'var(--ink)', bg: rootBg, size: 16, weight: 400, gradient: false }];
  const fails: Fail[] = [];
  let checked = 0; let skipped = 0;

  const re = /<(\/?)([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>])*?)(\/?)>|([^<]+)/g;
  let m: RegExpExecArray | null;
  // eslint-disable-next-line no-cond-assign
  while ((m = re.exec(html))) {
    const [, closing, tag, attrs, selfClose, text] = m;

    if (text !== undefined) {
      const t = decode(text).replace(/\s+/g, ' ').trim();
      if (!t) continue;
      const f = stack[stack.length - 1];
      if (f.gradient) { skipped += 1; continue; }
      const fg = resolve(f.fg, theme, f.bg ?? null);
      if (!fg || !f.bg) continue;
      checked += 1;
      const min = (f.size >= 24 || (f.size >= 18.66 && f.weight >= 700)) ? 3 : 4.5;
      const r = ratio(fg, f.bg);
      if (r < min - 0.005) fails.push({ text: t.slice(0, 40), r: +r.toFixed(2), min, size: f.size });
      continue;
    }

    if (closing) {
      if (stack.length > 1) stack.pop();
      continue;
    }

    const parent = stack[stack.length - 1];
    const sm = /style="([^"]*)"/.exec(attrs || '');
    const st = sm ? styleMap(decode(sm[1])) : {};

    const bgRaw = st.background ?? st['background-color'];
    const gradient = parent.gradient || !!(bgRaw && (bgRaw.includes('gradient') || bgRaw.includes('url(')));
    const bg = gradient ? null : (resolve(bgRaw, theme, parent.bg ?? null) ?? parent.bg);

    const frame: Frame = {
      fg: st.color ?? parent.fg,
      bg,
      size: px(st['font-size'], parent.size),
      weight: st['font-weight'] ? parseInt(st['font-weight'], 10) || parent.weight : parent.weight,
      gradient,
    };

    if (!selfClose) stack.push(frame);
  }

  return { fails, checked, skipped };
}

/* ---------- run ---------- */

/*
  BASELINE.

  This check found 150 failures the moment it could see them - not because the
  app got worse, but because nothing had ever looked at inherited colour across
  86 routes. Fixing 150 in one change would be a worse idea than recording them:
  each needs judging in place, and item 49 is a standing reminder that what
  measures like a defect is sometimes intent.

  So this is a ratchet, exactly like ACKNOWLEDGED in claims.mjs. The known set is
  frozen in scripts/contrast-ssr.baseline.json. Anything NOT in it fails. Anything
  in it that has been FIXED also fails, so the baseline can only shrink.

  It is debt, and it is recorded as debt rather than as a passing gate.
*/
const baseline: string[] = JSON.parse(
  readFileSync('scripts/contrast-ssr.baseline.json', 'utf8'));
const known = new Set(baseline);
const seen = new Set<string>();

/*
  THE CLOCK IS PINNED, AND IT HAS TO BE.

  The seasonal calendar picks its default period from `new Date().getMonth()`:

      const now = new Date().getMonth();
      const i = region.periods.findIndex((p) => periodMonths(p).includes(now));

  So the rendered HTML - and therefore this gate's result - depends on the day
  it runs. That was not theoretical: baselining in one month and re-running in
  another turned "Jun – Aug" into a FIXED entry and "Sep – Nov" into a NEW
  failure, with nothing in the app having changed.

  A gate that fails on its own at every season boundary, with a message pointing
  at a screen nobody touched, teaches people to ignore gates. Pinning to a fixed
  month makes the render reproducible; the seasonal screen's other periods are
  still reachable through state.seasonIdx and are not what this measures.
*/
const FIXED_NOW = new Date('2026-01-15T12:00:00Z').getTime();
const RealDate = Date;
// eslint-disable-next-line no-global-assign
(globalThis as { Date: DateConstructor }).Date = class extends RealDate {
  constructor(...args: ConstructorParameters<DateConstructor>) {
    // @ts-expect-error - forwarding a variadic Date constructor
    if (args.length === 0) super(FIXED_NOW); else super(...args);
  }

  static now() { return FIXED_NOW; }
} as unknown as DateConstructor;

let failing = 0;
let totalChecked = 0;
let totalSkipped = 0;
const report: string[] = [];

for (const route of ROUTES) {
  const Screen = (SCREENS as Record<string, (() => JSX.Element) | undefined>)[route];
  if (!Screen) continue;

  let html: string;
  try {
    html = renderToStaticMarkup(<StoreProvider><Screen /></StoreProvider>);
  } catch {
    continue;
  }

  for (const [name, theme] of [['light', LIGHT], ['dark', DARK]] as const) {
    const { fails, checked, skipped } = audit(html, theme);
    totalChecked += checked;
    totalSkipped += skipped;
    for (const f of fails) {
      const key = route + '|' + name + '|' + f.text;
      seen.add(key);
      if (known.has(key)) continue;
      failing += 1;
      report.push('  NEW   ' + (route + ' · ' + name).padEnd(26)
        + (f.r + ':1').padEnd(8) + 'needs ' + f.min + ':1  '
        + f.size + 'px  "' + f.text + '"');
    }
  }
}

/* A baseline entry that no longer fails must be removed, so the debt shrinks. */
const fixed = [...known].filter((k) => !seen.has(k));
for (const k of fixed) {
  failing += 1;
  report.push('  FIXED ' + k.replace(/\|/g, ' · ')
    + '\n        no longer fails - delete it from contrast-ssr.baseline.json');
}

for (const line of report) console.log(line);
console.log('-'.repeat(72));
console.log(totalChecked + ' text nodes measured across ' + ROUTES.length
  + ' routes in both themes');
console.log(seen.size + ' failing, ' + known.size + ' of them baselined'
  + ' (' + totalSkipped + ' on a gradient ground, unmeasurable)');
if (failing) {
  console.log(failing + ' need attention: NEW failures, or baselined entries that now pass');
}

process.exit(failing ? 1 : 0);
