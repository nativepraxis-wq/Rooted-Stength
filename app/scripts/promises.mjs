/*
  Promise gate — the Privacy screen's factual claims, held to the code.

  ─────────────────────────────────────────
  WHY

  This app tells readers things about its own behaviour, on the one screen where
  being wrong matters most:

    "the app makes no network requests at all"
    "The vault stays on the device. Nothing is hosted anywhere"
    "of your records never leave the phone"
    "Every log, plate, session, note and photo you capture."

  All four are true today. Three of them are true BY ACCIDENT: there is no
  backend, so nothing can leave. The first was false until the fonts were
  self-hosted, because every cold load fetched them from Google and handed the
  reader's IP to a third party from the screen promising it did not.

  That is the failure this gate exists to prevent. A single fetch() added
  anywhere in src/ turns four sentences on a privacy screen into false
  statements, silently, with nothing to notice. This makes the code fail out
  loud instead, and names the copy that would need rewriting.

  ─────────────────────────────────────────
  WHAT IT DOES NOT DO

  It cannot check "never sold" or "encrypted at rest" - the first is a business
  commitment and the second is currently FALSE and recorded as such in
  DISCREPANCIES 51, awaiting an editorial decision rather than a script.

  It checks the two things that are mechanically checkable: that the app makes
  no outbound request, and that the shell loads nothing third-party.
*/
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const SRC = 'src';

/*
  The service worker is deliberately excluded. It calls fetch() constantly -
  that is its entire job - but only to serve same-origin assets the reader
  already asked for. It is not the app phoning anywhere.
*/
const EXCLUDE = new Set(['sw.js']);

/* Ways a browser makes an outbound request. */
const CALLS = [
  [/\bfetch\s*\(/, 'fetch()'],
  [/\bXMLHttpRequest\b/, 'XMLHttpRequest'],
  [/\bnavigator\.sendBeacon\b/, 'sendBeacon()'],
  [/\bnew\s+WebSocket\b/, 'WebSocket'],
  [/\bnew\s+EventSource\b/, 'EventSource'],
  [/\bimport\s*\(\s*['"]https?:/, 'remote dynamic import'],
];

/* The copy that stops being true if any of the above appears. */
const AT_STAKE = [
  'Trust.tsx  "the app makes no network requests at all"',
  'Trust.tsx  "The vault stays on the device. Nothing is hosted anywhere"',
  'Trust.tsx  "of your records never leave the phone"',
  'content.ts "Offline access for land & trail"',
];

/** Strip comments and string literals so prose cannot trip the scan. */
function strip(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1 ')
    .replace(/'(?:[^'\\\n]|\\.)*'/g, "''")
    .replace(/"(?:[^"\\\n]|\\.)*"/g, '""')
    .replace(/`(?:[^`\\]|\\.)*`/g, '``');
}

const findings = [];
let scanned = 0;

function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    if (!/\.(ts|tsx|js|jsx)$/.test(e.name)) continue;
    if (EXCLUDE.has(e.name)) continue;
    scanned += 1;
    const code = strip(readFileSync(p, 'utf8'));
    for (const [re, label] of CALLS) {
      const m = re.exec(code);
      if (!m) continue;
      const line = code.slice(0, m.index).split('\n').length;
      findings.push({ file: relative('.', p), line, label });
    }
  }
}
walk(SRC);

/* The shell must not pull anything from another origin either. */
const html = readFileSync('index.html', 'utf8');
const thirdParty = [...html.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)]
  .map((m) => m[1]);

console.log('-'.repeat(72));
console.log('Privacy-screen promises, checked against the code');
console.log('-'.repeat(72));

for (const f of findings) {
  console.log('  OUTBOUND  ' + f.file + ':' + f.line + '  ' + f.label);
}
for (const u of thirdParty) {
  console.log('  THIRD-PARTY  index.html  ' + u.slice(0, 60));
}

const failing = findings.length + thirdParty.length;

if (failing) {
  console.log('');
  console.log('  These sentences are no longer true and must be rewritten:');
  for (const s of AT_STAKE) console.log('    ' + s);
  console.log('');
  console.log('  If the request is intended, change the copy in the same commit.');
  console.log('  Leaving both is the one option that is not available.');
}

console.log('-'.repeat(72));
console.log(scanned + ' source files scanned, ' + failing + ' outbound request(s) found'
  + (failing ? '' : ' — the app still makes none'));

process.exit(failing ? 1 : 0);
