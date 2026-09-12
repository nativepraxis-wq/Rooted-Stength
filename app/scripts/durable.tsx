/*
  Durability gate — every state key is a decision.

  ─────────────────────────────────────────
  WHY

  Persistence saves an ALLOWLIST. That is right for privacy - a new field is
  not written to disk until somebody says so - but it has a failure mode of its
  own: a field nobody thought about is silently forgotten on every reload.

  That happened. The first DURABLE list was written from memory, and it left out
  `teaSafety`: the intake answers for pregnant or nursing, blood-pressure
  medication and blood thinners. A reader who said they were pregnant had it
  forgotten on reload, and the brews traditionally avoided in pregnancy went back
  to being shown unflagged. No test noticed, because nothing was broken - the
  app just stopped knowing.

  So every key must now appear in DURABLE or in EPHEMERAL. Forgetting is still
  allowed; forgetting without deciding is not.

  ─────────────────────────────────────────
  WHAT COUNTS AS A KEY

    - every top-level key of initialState, read from the real object
    - every top-level key written by a set(...) call in src/ - several are never
      seeded (`sleepHabit`, `hikeChecked`, `pantryId`) and exist only from the
      first tap

  Only depth-1 keys of the object literal are taken, so `sb: { protein }` yields
  `sb` and not `protein`. Comments and strings are stripped first so prose
  cannot trip it.

  It also fails on:
    - a key in BOTH lists
    - a listed key that no longer exists anywhere (stale entries rot the list)
*/
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { initialState } from '../src/data/initialState';
import { DURABLE, EPHEMERAL } from '../src/state/persist';

function strip(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1 ')
    .replace(/'(?:[^'\\\n]|\\.)*'/g, "''")
    .replace(/"(?:[^"\\\n]|\\.)*"/g, '""')
    .replace(/`(?:[^`\\]|\\.)*`/g, '``');
}

/** Top-level keys of the object literal that starts at `open` (a `{`). */
function topKeys(code: string, open: number): string[] {
  const keys: string[] = [];
  let depth = 0;
  for (let i = open; i < code.length; i += 1) {
    const c = code[i];
    if (c === '{' || c === '(' || c === '[') depth += 1;
    else if (c === '}' || c === ')' || c === ']') {
      depth -= 1;
      if (depth === 0) break;
    }
    /* The opening brace itself lands here at depth 1, so the first key counts. */
    if (depth === 1 && (c === '{' || c === ',')) {
      const m = /^\s*([A-Za-z_$][\w$]*)\s*:/.exec(code.slice(i + 1, i + 80));
      if (m) keys.push(m[1]);
    }
  }
  return keys;
}

const written = new Map<string, string>();

function walk(dir: string) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    if (!/\.(ts|tsx)$/.test(e.name)) continue;
    const code = strip(readFileSync(p, 'utf8'));
    const re = /\bset\(/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(code))) {
      /* set({ ... })  or  set((s) => ({ ... })) */
      const head = /^\s*(?:\(?\s*\w*\s*\)?\s*=>\s*\(\s*)?\{/.exec(code.slice(m.index + 4));
      if (!head) continue;
      const open = m.index + 4 + head[0].length - 1;
      for (const k of topKeys(code, open)) {
        if (!written.has(k)) written.set(k, relative('.', p));
      }
    }
  }
}
walk('src');

const seeded = new Set(Object.keys(initialState));
const all = new Set([...seeded, ...written.keys()]);
const durable = new Set(DURABLE);
const ephemeral = new Set(EPHEMERAL);

const unclassified = [...all].filter((k) => !durable.has(k) && !ephemeral.has(k)).sort();
const both = [...durable].filter((k) => ephemeral.has(k)).sort();
const stale = [...durable, ...ephemeral].filter((k) => !all.has(k)).sort();

console.log('-'.repeat(72));
console.log('State durability - every key saved or deliberately forgotten');
console.log('-'.repeat(72));

for (const k of unclassified) {
  const where = seeded.has(k) ? 'initialState' : written.get(k);
  console.log('  UNCLASSIFIED  ' + k.padEnd(18) + ' ' + where);
}
for (const k of both) console.log('  IN BOTH LISTS ' + k);
for (const k of stale) console.log('  STALE         ' + k + '  (listed, but no longer seeded or set)');

if (unclassified.length) {
  console.log('');
  console.log('  Add each to DURABLE or EPHEMERAL in src/state/persist.ts.');
  console.log('  The test: would the reader be annoyed - or unsafe - if it were gone');
  console.log('  tomorrow? An answer they gave, yes. Which tab was open, no.');
}

const failing = unclassified.length + both.length + stale.length;
console.log('-'.repeat(72));
console.log(all.size + ' keys (' + seeded.size + ' seeded, ' + (all.size - seeded.size)
  + ' set-only): ' + durable.size + ' durable, ' + ephemeral.size + ' ephemeral, '
  + failing + ' problem(s)');

process.exit(failing ? 1 : 0);
