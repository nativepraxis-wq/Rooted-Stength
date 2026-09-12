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

  It cannot check "never sold" - that is a business commitment, not code.

  It checks three things that are mechanically checkable: that the app makes
  no outbound request, that the shell loads nothing third-party, and that no
  encryption is claimed unmarked. "Encrypted at rest" was FALSE; the project
  owner decided the copy says what is true, and the third check keeps it so.
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

/*
  ─────────────────────────────────────────
  ENCRYPTION CLAIMS

  Nothing in this app is encrypted. Nine places once said otherwise - the
  Privacy promise, the data map, the vault header, the Journey tile, onboarding,
  and two verbatim content.ts lines. The project owner decided the copy says what
  is true now.

  So any encryption claim in the source must be one of:
    - marked on the same line as not yet true or planned
    - a verbatim content.ts line listed in ACK below, which is rendered with the
      correction from data/claimNotes.ts beside it
  Comments are stripped first; strings are what the reader sees, so they stay.
  A new unmarked claim fails, and so does an ACK entry that no longer exists.
*/
const CLAIM = /\bencrypt\w*|end-to-end|sealed (?:by|with) your/i;
/* "encrypted yet" covers "Nothing here is encrypted yet" - the first version
   missed it and flagged the vault header's own correction as a claim. */
const MARKED = /not encrypted|encrypted yet|not true yet|not yet|planned|without encryption/i;
const ACK = [
  /* rendered with claimNote() in Trust.tsx and Onboarding.tsx (consent) */
  "sub: 'Encrypted · revocable anytime · never sold'",
  /* rendered with claimNote() in Trust.tsx (membership features) */
  "'Encrypted Medical Vault'",
  /* the sample person's ledger - shown only while state.sample is true */
  "dest: 'Rooted vault (encrypted)'",
  "payload: '2 lab PDFs · sealed with your passphrase — we cannot read them'",
];
const claimFindings = [];
const ackSeen = new Set();

function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1 ');
}

function scanClaims(file, src) {
  const lines = stripComments(src).split('\n');
  lines.forEach((line, i) => {
    if (!CLAIM.test(line) || MARKED.test(line)) return;
    /*
      Every acknowledgement on the line, not the first. The sample ledger row
      carries two - its destination and its payload - on one line, and taking
      only the first reported the second as stale.
    */
    const acks = ACK.filter((a) => line.includes(a));
    if (acks.length && file.endsWith('content.ts')) { acks.forEach((a) => ackSeen.add(a)); return; }
    claimFindings.push({ file, line: i + 1, text: line.trim().slice(0, 90) });
  });
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
    const raw = readFileSync(p, 'utf8');
    scanClaims(relative('.', p), raw);
    const code = strip(raw);
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

for (const c of claimFindings) {
  console.log('  UNMARKED ENCRYPTION CLAIM  ' + c.file + ':' + c.line + '  ' + c.text);
}
const staleAck = ACK.filter((a) => !ackSeen.has(a));
for (const a of staleAck) {
  console.log('  STALE ACK  ' + a + '  (no longer in content.ts)');
}
if (claimFindings.length) {
  console.log('');
  console.log('  Nothing in this app is encrypted. Say so, mark the line as planned,');
  console.log('  or - for verbatim content.ts - render claimNote() beside it and ACK it.');
}

/*
  ─────────────────────────────────────────
  THE BROWSER ENFORCES IT TOO

  public/_headers sets a Content-Security-Policy whose connect-src is 'self', so
  a hosted build cannot reach another origin even if code tried. That is the
  second lock on "makes no network requests", and loosening it quietly would
  undo it - so the policy must exist, must not name any other origin, and its
  connect-src must be exactly 'self'.
*/
const cspProblems = [];
let headersText = '';
try { headersText = readFileSync('public/_headers', 'utf8'); } catch { /* reported below */ }
const cspLine = headersText.split(/\r?\n/).find((l) => /^\s+Content-Security-Policy:/.test(l));
if (!headersText) {
  cspProblems.push('public/_headers is missing');
} else if (!cspLine) {
  cspProblems.push('public/_headers has no Content-Security-Policy');
} else {
  const policy = cspLine.split(':').slice(1).join(':');
  const connect = (policy.match(/connect-src([^;]*)/) || [])[1];
  if (connect === undefined) cspProblems.push("CSP has no connect-src (default-src would govern it silently)");
  else if (connect.trim() !== "'self'") cspProblems.push("CSP connect-src is '" + connect.trim() + "', not 'self'");
  const origins = policy.match(/\b(?:https?|wss?):\/\/[^\s;]+|\*(?=[\s;])/g);
  if (origins) cspProblems.push('CSP names another origin: ' + origins.join(', '));
}
for (const p of cspProblems) console.log('  CSP  ' + p);

const failing = findings.length + thirdParty.length + claimFindings.length + staleAck.length
  + cspProblems.length;

if (failing) {
  console.log('');
  console.log('  These sentences are no longer true and must be rewritten:');
  for (const s of AT_STAKE) console.log('    ' + s);
  console.log('');
  console.log('  If the request is intended, change the copy in the same commit.');
  console.log('  Leaving both is the one option that is not available.');
}

console.log('-'.repeat(72));
console.log(scanned + ' source files scanned, '
  + (findings.length + thirdParty.length) + ' outbound request(s), '
  + claimFindings.length + ' unmarked encryption claim(s), ' + staleAck.length + ' stale ack(s), '
  + cspProblems.length + ' CSP problem(s)'
  + (failing ? '' : " — no requests, no encryption claimed, and the browser holds connect-src to 'self'"));

process.exit(failing ? 1 : 0);
