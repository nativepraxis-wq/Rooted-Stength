/*
  Allergen-declaration gate.

  A menu dish declares its allergen in a single `has` string. A dish containing
  two can only declare one, and the second is invisible to the fit check:

      const clash = !!(m.has && blocked.includes(m.has));

  The co-op's Ginger-Tamari Braised Tofu spent its `has` on 'soy' while its own
  description read "Hot-bar tray · scallion, sesame oil". With soy-free off and
  sesame-free on, the app counted it inside "6 of 7 dishes fit your profile" and
  offered an add-to-order button, with the word sesame on the same card.

  This gate reads every menu dish and compares the allergens its OWN text names
  - name, description, tags - against what `has` plus data/menuDepth.ts declare.
  It fails on a dish that names an allergen nothing declares.

  It fails on a STALE menuDepth entry too: an id whose dish text no longer
  supports the extra allergen, or an id that is not a menu dish at all. An
  over-declaration is not harmless here - it flags food as unsafe for someone
  who could have eaten it, and the app's rule is that a restriction never makes
  something vanish without saying why.

  content.ts is verbatim, which is why the second allergen lives in a depth
  module rather than being added to `has` as an array.

  NOT a claim that the word list is complete. It is deliberately narrow: it
  catches an allergen the app has already written down and failed to declare. It
  cannot know what a kitchen actually does, and does not guess - guessing would
  invent a safety claim, which is worse than the gap it closes.
*/
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'src/data';
const B = String.fromCharCode(92);

const un = (s) => s.replace(new RegExp(B + B + 'u([0-9a-fA-F]{4})', 'g'),
  (_, h) => String.fromCharCode(parseInt(h, 16)));

const content = un(readFileSync(join(DIR, 'content.ts'), 'utf8'));
const depthSrc = readFileSync(join(DIR, 'menuDepth.ts'), 'utf8');

/* extraAllergens, read out of the depth module. */
const extra = {};
{
  const block = depthSrc.slice(depthSrc.indexOf('extraAllergens'));
  const body = block.slice(block.indexOf('{'), block.indexOf('};') + 1);
  for (const m of body.matchAll(/'([\w-]+)':\s*\[([^\]]*)\]/g)) {
    extra[m[1]] = [...m[2].matchAll(/'([^']+)'/g)].map((x) => x[1]);
  }
}

/*
  Words that name an allergen in prose. `tamari` is soy sauce and `tamarind` is
  a fruit - without the lookahead, Chickpea Doubles was reported as undeclared
  soy on the strength of its tamarind.
*/
const WORDS = {
  sesame: [/sesame/, /tahini/, /dukkah/, /benne/],
  nuts: [/peanut/, /cashew/, /almond/, /walnut/, /pecan/, /nut butter/],
  soy: [/\bsoy\b/, /tofu/, /tamari(?!nd)/, /miso/, /edamame/, /tempeh/],
  gluten: [/wheat/, /\bbread\b/, /\brolls?\b/, /seitan/, /barley/, /\bflour\b/],
};

const dishes = [];
for (const m of content.matchAll(/\{[^{}]*\}/g)) {
  const t = m[0];
  if (!t.includes('price:') || !t.includes('kcal:')) continue;
  const name = /name:\s*'([^']*)'/.exec(t);
  const id = /\bid:\s*'([^']*)'/.exec(t);
  if (!name || !id) continue;
  const desc = /desc:\s*'([^']*)'/.exec(t);
  const tags = /tags:\s*\[([^\]]*)\]/.exec(t);
  const has = /has:\s*'([^']*)'/.exec(t);
  dishes.push({
    id: id[1],
    name: name[1],
    has: has ? has[1] : null,
    prose: [name[1], desc ? desc[1] : '', tags ? tags[1] : ''].join(' ').toLowerCase(),
  });
}

let failing = 0;
const declaredBy = {};

console.log('-'.repeat(74));
console.log('Menu dishes: allergens named in their own text vs. declared');
console.log('-'.repeat(74));

for (const d of dishes) {
  const named = Object.keys(WORDS).filter((a) => WORDS[a].some((re) => re.test(d.prose)));
  const declared = (d.has ? [d.has] : []).concat(extra[d.id] || []);
  const missing = named.filter((a) => !declared.includes(a));
  if (extra[d.id]) declaredBy[d.id] = { named, extra: extra[d.id] };

  if (missing.length) {
    failing += 1;
    console.log('UNDECLARED ' + d.name);
    console.log('           names ' + missing.join(', ')
      + ' | declares ' + (declared.join(', ') || '(nothing)'));
    console.log('           "' + d.prose.slice(0, 66) + '"');
  }
}

/* A depth entry must point at a real dish, and its text must still support it. */
for (const id of Object.keys(extra)) {
  const d = dishes.find((x) => x.id === id);
  if (!d) {
    failing += 1;
    console.log('STALE      menuDepth id "' + id + '" is not a menu dish');
    continue;
  }
  for (const a of extra[id]) {
    const supported = WORDS[a] && WORDS[a].some((re) => re.test(d.prose));
    if (!supported) {
      failing += 1;
      console.log('STALE      ' + d.name + ' is declared ' + a
        + ', but its text no longer names it');
    } else {
      console.log('ok (depth) ' + d.name + ' — ' + a + ', named in its own description');
    }
  }
}

console.log('-'.repeat(74));
console.log(dishes.length + ' menu dishes checked, ' + failing + ' failing');
process.exit(failing ? 1 : 0);
