import {
  plateDefs, obRestrList, obTradList, allergenMap, allergenWord,
  detected as detectedDefs, hiddenList, microDefs,
} from '../data/content';
import type { AppState } from './store';

/*
  Derived values. Everything the generative surfaces show is computed here from
  actual state — the handoff is explicit that the scan report, the recipe
  generator and the smoothie builder must not display precomputed numbers.
*/

/* ---------- allergen filtering ---------- */

/*
  Filtering is honest: excluded plates are counted and listed WITH the reason.
  Nothing is silently dropped, which is why platesOut is returned alongside
  platesFit rather than discarded.
*/
export function platePools(state: AppState) {
  const activeRestr = (obRestrList as any[]).filter((x) => state.obRestr[x.id]);
  const activeTrad = (obTradList as any[]).filter((x) => state.obTrad[x.id]);
  const blocked = activeRestr.map((x) => (allergenMap as any)[x.id]).filter(Boolean);
  const tradIds = activeTrad.map((x) => x.id);

  const scored = (plateDefs as any[])
    .filter((p) => !p.planOnly)
    .map((p) => {
      const clash = p.has.filter((h: string) => blocked.includes(h));
      const modeFit = p.modes.includes(state.recipeMode);
      const tradFit = tradIds.length === 0 || p.trad.some((t: string) => tradIds.includes(t));
      return {
        ...p, clash, modeFit, tradFit,
        tradLabel: (obTradList as any[]).find((t) => p.trad.includes(t.id))?.label || 'Diaspora',
      };
    });

  const rank = (p: any) => (p.modes[0] === state.recipeMode ? 2 : 0) + (p.tradFit ? 1 : 0);
  const fit = scored.filter((p) => p.clash.length === 0 && p.modeFit).sort((a, b) => rank(b) - rank(a));
  const out = scored.filter((p) => p.clash.length > 0);

  return {
    activeRestr, tradIds, scored, fit, out,
    /* the copy shown next to the count, e.g. "contains peanut & sesame" */
    outReasons: out.map((p) => ({
      name: p.name,
      reason: 'contains ' + p.clash.map((c: string) => (allergenWord as any)[c]).join(' & '),
    })),
    fitCountLabel: fit.length + (fit.length === 1 ? ' plate fits' : ' plates fit'),
    fitSubLabel: activeRestr.length
      ? 'filtered for ' + activeRestr.map((x) => x.label.toLowerCase()).join(', ')
      : 'no restrictions set — everything is on the table',
    outCountLabel: out.length + (out.length === 1 ? ' plate hidden' : ' plates hidden'),
  };
}

/* ---------- plate scan ---------- */

/* n = [kcal, protein, carbs, fat, fibre, leucine]; m = the eight micros, as % of target. */
const r1 = (v: number) => Math.round(v * 10) / 10;
const sumAt = (arr: any[], key: string, i: number) =>
  arr.reduce((t, x) => t + ((x[key] || [])[i] || 0), 0);

const listWords = (a: string[]) =>
  a.length > 2 ? a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1] : a.join(' and ');

const microWord = (label: string) =>
  label === 'B12' ? 'B12' : label === 'Vitamin C' ? 'vitamin C' : label.toLowerCase();

export function detectedRows(state: AppState) {
  return (detectedDefs as any[]).map((f) => {
    const swapped = !!state.scanAlt[f.key];
    const kept = !state.scanDrop[f.key];
    const src = swapped ? f.alt : f;
    return {
      ...f, name: src.name, portion: src.portion, n: src.n, m: src.m, kept, swapped,
      swapLabel: swapped ? 'Swapped to ' + f.alt.name : 'Swap for ' + f.alt.name,
      keepLabel: kept ? 'Keeping ' + src.name : 'Removed from the plate',
    };
  });
}

/*
  The nutrient report. Totals are summed from whichever components survived the
  detected-foods step plus any disclosed hidden ingredients — so dropping a food
  or swapping it actually moves the numbers.
*/
export function scanReport(state: AppState) {
  const parts = detectedRows(state)
    .filter((f) => f.kept)
    .concat((hiddenList as any[]).filter((h) => !!state.hidden?.[h.key]));

  const macros = [
    { label: 'Calories', value: String(Math.round(sumAt(parts, 'n', 0))), unit: 'kcal' },
    { label: 'Protein', value: String(r1(sumAt(parts, 'n', 1))), unit: 'g' },
    { label: 'Carbs', value: String(Math.round(sumAt(parts, 'n', 2))), unit: 'g' },
    { label: 'Fat', value: String(r1(sumAt(parts, 'n', 3))), unit: 'g' },
    { label: 'Fiber', value: String(r1(sumAt(parts, 'n', 4))), unit: 'g' },
    { label: 'Leucine', value: String(r1(sumAt(parts, 'n', 5))), unit: 'g' },
  ];

  const micros = (microDefs as any[]).map((d, i) => {
    const pct = Math.round(sumAt(parts, 'm', i));
    let note: string;
    let col: string;
    if (pct >= 70) { note = 'strong'; col = 'var(--leaf)'; }
    else if (pct >= 45) { note = 'good'; col = 'var(--teal)'; }
    else if (pct >= 25) { note = 'partial'; col = 'var(--earth)'; }
    else { note = 'below your target'; col = 'var(--clay)'; }
    if (d.key === 'b12' && pct < 25) note = 'fortify / supplement';
    if (d.key === 'vitc' && pct >= 45) note = 'aids iron uptake';
    return { key: d.key, label: d.label, pct, note, col, barW: Math.min(pct, 100) + '%' };
  });

  const by = (k: string) => micros.find((m) => m.key === k)!;
  const strong = micros.filter((n) => n.pct >= 70).map((n) => microWord(n.label));
  const low = micros.filter((n) => n.pct < 25).map((n) => microWord(n.label));
  const protein = r1(sumAt(parts, 'n', 1));

  const supports = parts.length === 0
    ? 'Nothing is on the plate yet — keep at least one item to read a nutrient story.'
    : protein + ' g of protein and ' + r1(sumAt(parts, 'n', 4)) + ' g of fiber from '
      + parts.length + ' components.'
      + (strong.length ? ' Strongest here: ' + listWords(strong) + '.' : '')
      + (by('vitc').pct >= 45
        ? ' The vitamin C is doing real work — it converts the plant iron into a form you can absorb.'
        : '');

  const gaps = parts.length === 0
    ? 'Add something back to see where the gaps fall.'
    : low.length
      ? listWords(low) + (low.length === 1 ? ' sits' : ' sit')
        + ' below target on this plate. Expected on an all-plant meal — this is guidance, not a diagnosis.'
      : 'No micronutrient falls below target on this plate. Still guidance, not a diagnosis.';

  const fixList: string[] = [];
  if (by('iron').pct < 45) fixList.push('fold in amaranth or moringa and finish with lime');
  if (by('b12').pct < 25) fixList.push('add a fortified plant milk or a B12 source at breakfast');
  if (by('cal').pct < 45) fixList.push('lean on collard, turnip or mustard greens rather than spinach');
  if (by('zinc').pct < 45) fixList.push('scatter pumpkin or hemp seed over the top');
  if (protein < 25) fixList.push('a second scoop of beans or a side of tofu closes the protein gap');
  if (!fixList.length) fixList.push('nothing needed — this plate stands on its own');
  const fixes = fixList.slice(0, 3)
    .map((x, i) => (i === 0 ? x.charAt(0).toUpperCase() + x.slice(1) : x))
    .join('; ') + '.';

  return { parts, macros, micros, protein, supports, gaps, fixes, empty: parts.length === 0 };
}
