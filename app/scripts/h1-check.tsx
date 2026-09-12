/*
  Every route must expose exactly one <h1>.

  Most screens get theirs from DarkHeader. Screens that build their own header
  can quietly render the title as a plain div instead, which is how the Foodways
  Codex hub ended up with no h1 at all (docs/DISCREPANCIES.md §14) — a screen
  reader jumping by heading found the volume names but never the name of the
  screen they belong to.

  This renders each screen for real rather than grepping the source. That
  distinction matters: counting `<DarkHeader` and `<h1` in the source suggested
  several screens were affected when exactly one was, because screens can have
  both. A real render cannot be fooled that way.

  It runs under react-dom/server, so no browser is needed and it works in CI.
  Effects never fire during renderToStaticMarkup, which is why the handful of
  `document` and `window` uses in the app are not a problem here.
*/
import { renderToStaticMarkup } from 'react-dom/server';
import { StoreProvider } from '../src/state/store';
import { loadScreens } from '../src/nav/screens';
import { ROUTES } from '../src/nav/routes';
import { initialState } from '../src/data/initialState';
import { OWN_START } from '../src/state/sample';

/* Screens are lazy in the app; render needs them resolved. See nav/screens.ts. */
const SCREENS = await loadScreens();

type Row = { route: string; count: number | null; note: string };

const rows: Row[] = [];

/*
  Two starts. The seed is the sample person with a full fortnight of history;
  OWN_START is what a real reader has after tapping Begin - no logs, no jars, no
  thread, no name. Every screen was written against the first and had never
  been rendered against the second, so a `logs[0].name` anywhere would only
  have been found by a new user. Rendering both makes an empty history a
  tested case rather than a production surprise.
*/
const STARTS: Array<[string, Record<string, unknown> | undefined]> = [
  ['', undefined],
  ['own:', { ...initialState, ...OWN_START }],
];

for (const [prefix, initial] of STARTS) {
  for (const route of ROUTES) {
    const Screen = (SCREENS as Record<string, (() => JSX.Element) | undefined>)[route];
    const label = prefix + route;

    if (!Screen) {
      rows.push({ route: label, count: null, note: 'no screen component' });
      continue;
    }

    let html: string;
    try {
      html = renderToStaticMarkup(
        <StoreProvider initial={initial}>
          <Screen />
        </StoreProvider>,
      );
    } catch (err) {
      rows.push({ route: label, count: null, note: 'threw: ' + (err as Error).message.slice(0, 90) });
      continue;
    }

    rows.push({ route: label, count: (html.match(/<h1[\s>]/g) || []).length, note: '' });
  }
}

const bad = rows.filter((r) => r.count !== 1);

for (const r of bad) {
  const found = r.count === null ? r.note : r.count + ' h1 elements';
  console.log('  FAIL  ' + r.route.padEnd(18) + found);
}

console.log(
  '-'.repeat(60) + '\n' +
  rows.length + ' routes rendered, ' +
  (rows.length - bad.length) + ' with exactly one h1, ' +
  bad.length + ' failing',
);

process.exit(bad.length ? 1 : 0);
