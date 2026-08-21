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
import { SCREENS } from '../src/App';
import { ROUTES } from '../src/nav/routes';

type Row = { route: string; count: number | null; note: string };

const rows: Row[] = [];

for (const route of ROUTES) {
  const Screen = (SCREENS as Record<string, (() => JSX.Element) | undefined>)[route];

  if (!Screen) {
    rows.push({ route, count: null, note: 'no screen component' });
    continue;
  }

  let html: string;
  try {
    html = renderToStaticMarkup(
      <StoreProvider>
        <Screen />
      </StoreProvider>,
    );
  } catch (err) {
    rows.push({ route, count: null, note: 'threw: ' + (err as Error).message.slice(0, 90) });
    continue;
  }

  rows.push({ route, count: (html.match(/<h1[\s>]/g) || []).length, note: '' });
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
