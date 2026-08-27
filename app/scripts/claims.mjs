/*
  Claim-consistency gate.

  The app makes comparative nutrition claims - "six times the vitamin C of
  oranges", "up to 25x the iron of spinach". They are written on different
  screens, in different exports, by different passes of work, and nothing had
  ever checked that two claims about the SAME food and the SAME nutrient agree.

  One pair did not. The Nutrient Frequencies band called baobab "Six times the
  vitamin C of oranges"; the crop atlas called the same fruit "around 10x the
  vitamin C of oranges". A reader who opened both screens saw the app disagree
  with itself by two thirds, and no gate noticed.

  This is that gate. It reads every multiplier claim out of src/data, keys it by
  (subject, nutrient, what it is compared against), and fails when one key
  carries more than one figure.

  WHY THE SUBJECT IS PART OF THE KEY: keying on (nutrient, comparator) alone
  would flag two DIFFERENT foods both compared against spinach for iron, which
  is not a contradiction at all. The subject is taken from the nearest preceding
  `name:` field, which is the card the claim is written on.

  WHAT THIS GATE DOES NOT DO: it does not judge whether a figure is TRUE, only
  whether the app says the same thing twice. Whether a number is well framed -
  dried versus fresh, per-100g versus per-portion - is the job of the reading
  notes in the *Depth.ts modules.

  Ranges are compared as written: "10-50" is one value, not two. A range and a
  point figure for the same key are a disagreement, because one of them claims a
  precision the other says is not available.
*/
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'src/data';

const NUTRIENT = [
  'vitamin [a-k]\\d?', 'iron', 'calcium', 'potassium', 'zinc', 'magnesium',
  'protein', 'fibre', 'fiber', 'glucoraphanin', 'folate', 'selenium',
  'iodine', 'antioxidants', 'beta-carotene',
].join('|');

/* "Six times" and "6x" are the same claim written two ways. */
const WORDS = {
  two: '2', twice: '2', three: '3', four: '4', five: '5',
  six: '6', seven: '7', eight: '8', nine: '9', ten: '10',
};

/* A comparator runs until the sentence turns to something else. */
const STOP = /^(with|plus|and|by|in|for|the|a|an|per|of|which|that)$/;

const wordRe = new RegExp('\\b(' + Object.keys(WORDS).join('|') + ')\\s+times\\b', 'gi');

const claimRe = new RegExp(
  '(?:up to |around |about |roughly |nearly )?'
  + '(\\d[\\d.]*(?:\\s*[-–]\\s*\\d[\\d.]*)?)\\s*'
  + '(?:×|x|times|-fold|fold)\\s+(?:the\\s+)?'
  + '(' + NUTRIENT + ')'
  + '(?:\\s+(?:of|than)\\s+([a-z][a-z ]{2,30}))?',
  'gi',
);

/*
  Entries are keyed by `name:` in most exports and by `title:` in a few
  (sourceLibrary is one). Looking for `name:` alone walked back past the whole
  source library into the mineral list and attributed a moringa/baobab claim to
  "Iodine", which is how a real disagreement could hide: two figures for the
  same food filed under two different subjects never meet.
*/
const nameRe = /\b(?:name|title):\s*'([^']{2,60})'/g;

/*
  KNOWN DISAGREEMENTS.

  content.ts is verbatim (README rule 3), so a contradiction already written
  into it cannot be fixed at source - it can only be explained underneath. This
  list is what "explained" means: a key here must name where the reading note
  lives, and the note must exist.

  The list is a ratchet, not an amnesty. Anything NOT on it fails the gate, and
  an entry that has STOPPED disagreeing also fails, so a stale acknowledgement
  cannot sit here quietly granting cover to a claim it no longer describes.
*/
const ACKNOWLEDGED = {
  'baobab | vitamin c | vs oranges':
    'freqBandDefs says "Six times", cropProfiles says "around 10x". '
    + 'sourceLibrary cites 10x, so "Six times" is the outlier. '
    + 'Explained in data/cropDepth.ts -> baobab.',
};

const claims = new Map();

for (const file of readdirSync(DIR).filter((f) => f.endsWith('.ts'))) {
  let s = readFileSync(join(DIR, file), 'utf8')
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
  s = s.replace(wordRe, (_, w) => WORDS[w.toLowerCase()] + ' times');

  for (const m of s.matchAll(claimRe)) {
    const value = m[1].replace(/\s+/g, '');
    const nutrient = m[2].toLowerCase();

    let comparator = '';
    if (m[3]) {
      const kept = [];
      for (const w of m[3].trim().toLowerCase().split(/\s+/)) {
        if (STOP.test(w)) break;
        kept.push(w);
        if (kept.length === 2) break;
      }
      comparator = kept.join(' ');
    }

    /* The card the claim is written on: nearest preceding `name:`. */
    const before = s.slice(0, m.index);
    const names = [...before.matchAll(nameRe)];
    const subject = names.length ? names[names.length - 1][1] : '(unattributed)';

    const key = subject.toLowerCase() + ' | ' + nutrient
      + ' | vs ' + (comparator || '(nothing named)');
    if (!claims.has(key)) claims.set(key, []);
    claims.get(key).push({ value, file, text: m[0].replace(/\s+/g, ' ').trim() });
  }
}

let failing = 0;
const rows = [...claims.entries()].sort();

console.log('-'.repeat(78));
console.log('Comparative claims, keyed by subject / nutrient / comparator');
console.log('-'.repeat(78));

for (const [key, list] of rows) {
  const distinct = [...new Set(list.map((x) => x.value))];
  const ack = ACKNOWLEDGED[key];
  if (distinct.length > 1) {
    if (ack) {
      console.log('known      ' + key);
      console.log('           ' + ack);
    } else {
      failing += 1;
      console.log('DISAGREES  ' + key);
    }
    for (const x of list) console.log('           "' + x.text + '"  [' + x.file + ']');
  } else {
    if (ack) {
      failing += 1;
      console.log('STALE ACK  ' + key);
      console.log('           listed as a known disagreement but the figures now agree.');
      console.log('           Remove it from ACKNOWLEDGED in scripts/claims.mjs.');
    } else {
      console.log('ok         ' + key);
    }
    for (const x of list) console.log('             "' + x.text + '"  [' + x.file + ']');
  }
}

/* An acknowledgement for a claim that no longer exists is also stale. */
for (const key of Object.keys(ACKNOWLEDGED)) {
  if (!claims.has(key)) {
    failing += 1;
    console.log('STALE ACK  ' + key);
    console.log('           listed as a known disagreement but no such claim exists.');
  }
}

/*
  An acknowledgement is only worth anything if the note it points at is really
  there. Baobab is the one entry, so this checks the one thing it promises.
*/
const cropDepth = readFileSync(join(DIR, 'cropDepth.ts'), 'utf8');
if (ACKNOWLEDGED['baobab | vitamin c | vs oranges'] && !/^ {2}baobab: \{/m.test(cropDepth)) {
  failing += 1;
  console.log('MISSING    the baobab acknowledgement points at data/cropDepth.ts');
  console.log('           -> baobab, and that entry is not there.');
}

console.log('-'.repeat(78));
console.log(rows.length + ' claim group' + (rows.length === 1 ? '' : 's')
  + ' checked, ' + failing + ' failing');
process.exit(failing ? 1 : 0);
