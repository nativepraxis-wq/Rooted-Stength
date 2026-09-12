/*
  Sample-leak gate — the sample person's data never reaches a real reader.

  ─────────────────────────────────────────
  WHY

  Begin clears the sample person's history from STATE (state/sample.ts). But a
  second kind of sample data never lived in state at all: content fixtures that
  screens render as the reader's own. After Begin, a new reader was still shown
  a sleep week with "you are 5h 46m short of target", a vault of lab results
  including a low-normal ferritin, four medical documents, a transfer ledger
  with a lab panel shared to a named doctor, and a list of wins they never had.

  None of that came from them. This renders every route as the state after
  Begin and fails if any of those values appear.

  ─────────────────────────────────────────
  WHY IT CANNOT PASS VACUOUSLY

  The markers are READ FROM THE FIXTURES, not typed here, and every marker must
  also be FOUND when the same routes render with the sample in place. A marker
  that matches nothing in the sample render is a broken matcher (an escaped
  ampersand, a reformatted value), and that fails too - otherwise a renamed
  field would turn the whole gate into a silent pass.

  Council replies are not covered: they render only after a question is typed,
  which a static render never does. They are guarded in CouncilSheet by the same
  flag, and that is stated here rather than implied.
*/
import { renderToStaticMarkup } from 'react-dom/server';
import { StoreProvider } from '../src/state/store';
import { loadScreens } from '../src/nav/screens';
import { ROUTES } from '../src/nav/routes';
import { initialState } from '../src/data/initialState';
import { OWN_START } from '../src/state/sample';
import {
  vaultLabs, vaultDocs, egressLog, sleepStages, journal,
  trays, gardenMilestones, budgetCats,
} from '../src/data/content';

/* Screens are lazy in the app; render needs them resolved. See nav/screens.ts. */
const SCREENS = await loadScreens();

type Marker = { from: string; text: string };

const markers: Marker[] = [
  ...(vaultLabs as any[]).map((l) => ({ from: 'vaultLabs', text: l.value })),
  ...(vaultDocs as any[]).map((d) => ({ from: 'vaultDocs', text: d.name })),
  /*
    The payload, not the destination. The first version matched `dest`, and
    "Sankofa Community Garden" is also a real place on the community, map and
    restaurant screens - public content, not the reader's data. Three false
    leaks. What is personal about a ledger row is what was sent.
  */
  ...(egressLog as any[]).map((e) => ({ from: 'egressLog', text: e.payload })),
  ...(sleepStages as any[]).map((s) => ({ from: 'sleepStages', text: s.hrs })),
  ...(journal as any[]).map((j) => ({ from: 'journal', text: j.text })),
  /* Not a fixture: a sentence written into Move.tsx describing the sample week. */
  { from: 'Move.tsx', text: 'from 150 to 200 ft' },

  /*
    The second sweep: the sample person's PROGRESS, not just her records - a
    sill of trays mid-growth, a third-season garden with milestones, a $77
    grocery week, and her age on the reader's own household card. Each marker
    is the rendered form, so it is specific to that fixture rather than to a
    crop or category name that is also public content elsewhere.
  */
  ...(trays as any[]).map((t) => ({ from: 'trays', text: 'Day ' + t.day + ' of ' + t.days })),
  ...(gardenMilestones as any[]).map((m) => ({ from: 'gardenMilestones', text: m.s })),
  ...(budgetCats as any[]).map((c) => ({ from: 'budgetCats', text: '$' + c.spent + ' / $' + c.budget })),
  /*
    Not covered: the sample age on the reader's own household card. A marker
    for it ("34 · Training adult") was tried and the matcher guard rejected it -
    the family screen opens on familyId 'kofi', so that card never renders
    statically in EITHER state. Same gap as the Council replies, stated rather
    than implied; the age was verified in the browser instead.
  */
  /* Written into Farm.tsx and Today.tsx, not a fixture. */
  { from: 'Farm.tsx', text: 'Season 3 · late summer' },
];

function decode(html: string): string {
  return html
    /*
      React puts <!-- --> between adjacent text nodes, so `Day {d} of {n}`
      renders as "Day <!-- -->10<!-- --> of <!-- -->10". Removed outright, not
      turned into spaces, or no marker built from a value could ever match.
    */
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")
    .replace(/&rsquo;/g, '’').replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');
}

function renderAll(initial?: Record<string, unknown>): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  for (const route of ROUTES) {
    const Screen = (SCREENS as Record<string, (() => JSX.Element) | undefined>)[route];
    if (!Screen) continue;
    const html = renderToStaticMarkup(
      <StoreProvider initial={initial}><Screen /></StoreProvider>,
    );
    out.push([route, decode(html)]);
  }
  return out;
}

const seed = renderAll({ ...initialState });
const own = renderAll({ ...initialState, ...OWN_START });

const unmatched = markers.filter((m) => !seed.some(([, t]) => t.includes(m.text)));
const leaks: Array<{ route: string; m: Marker }> = [];
for (const [route, text] of own) {
  for (const m of markers) if (text.includes(m.text)) leaks.push({ route, m });
}

console.log('-'.repeat(72));
console.log('Sample data, checked against a first real run');
console.log('-'.repeat(72));
for (const m of unmatched) {
  console.log('  MATCHER BROKEN  ' + m.from + '  "' + m.text + '" is not in the sample render either');
}
for (const l of leaks) {
  console.log('  LEAK  ' + l.route.padEnd(12) + ' ' + l.m.from + '  "' + l.m.text + '"');
}
if (leaks.length) {
  console.log('');
  console.log('  A real reader is being shown the sample person\'s data as their own.');
  console.log('  Render it only while state.sample is true - see state/sample.ts.');
}
const failing = unmatched.length + leaks.length;
console.log('-'.repeat(72));
console.log(markers.length + ' sample values, all found in the sample render: '
  + (unmatched.length ? 'NO' : 'yes') + ' · ' + own.length + ' routes after Begin · '
  + leaks.length + ' leak(s)');
process.exit(failing ? 1 : 0);
