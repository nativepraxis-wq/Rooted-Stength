import { useStore } from './store';
import { plateDefs } from '../data/content';

/*
  Everything the Journey surfaces show is derived from the log set — streaks,
  the week strip, the protein trend, the most-cooked plates and the history
  timeline. Nothing here is a stored score.

  The handoff is firm that this section is a record, not a rating: the copy
  reports what happened and stops. No grades, no "you're falling behind".
*/

export const LOG_KINDS: Record<string, { label: string; c: string }> = {
  plate: { label: 'Plate', c: '#2F4A31' },
  move: { label: 'Movement', c: '#2E6B7A' },
  water: { label: 'Water', c: '#2E6B7A' },
  brew: { label: 'Brew', c: '#7A3C4A' },
  ferment: { label: 'Ferment', c: '#7E5F1C' },
  note: { label: 'Note', c: '#7E5124' },
};

export const HIST_FILTERS: [string, string][] = [
  ['all', 'Everything'], ['plate', 'Plates'], ['move', 'Movement'],
  ['water', 'Water'], ['brew', 'Brews'], ['ferment', 'Ferments'], ['note', 'Notes'],
];

/* Sort key for a logged time: "all day" first, "just now" last. */
function minutesOf(t: string) {
  if (t === 'just now') return 10001;
  if (t === 'all day') return -1;
  const m = /^(\d+):(\d+)([ap])$/.exec(t || '');
  if (!m) return 0;
  let h = Number(m[1]) % 12;
  if (m[3] === 'p') h += 12;
  return h * 60 + Number(m[2]);
}

export function useJournal() {
  const { state, dayName, proteinTarget, cupsOn, removeLog } = useStore();
  const logs = state.logs as any[];
  const tgt = proteinTarget();

  const dayPlates = (d: number) => logs.filter((l) => l.kind === 'plate' && l.d === d);
  const dayProtein = (d: number) => dayPlates(d).reduce((a, l) => a + (l.p || 0), 0);
  const moved = (d: number) => logs.some((l) => l.kind === 'move' && l.d === d);
  const cups = (d: number) => cupsOn(d);

  /* Seven-day strip: bar height is protein against target, dots are move + water. */
  const letters = ['T', 'M', 'S', 'S', 'F', 'T', 'W'];
  const week = [];
  for (let d = 6; d >= 0; d--) {
    const pr = dayProtein(d);
    const pc = dayPlates(d).length;
    week.push({
      d,
      letter: letters[d % 7],
      barH: Math.max(5, Math.round(Math.min(1, pr / tgt) * 62)),
      barBg: pr >= tgt ? '#2F4A31' : (pr > 0 ? '#C79A45' : '#E7DDC9'),
      plateCount: pc ? pc + ' pl' : '—',
      moveOn: moved(d),
      waterOn: cups(d) >= 8,
      isToday: d === 0,
    });
  }

  /* Streaks count back from today; the water streak allows today to be unfinished. */
  let ps = 0;
  while (ps < 30 && dayPlates(ps).length) ps++;
  let ms = 0;
  while (ms < 30 && moved(ms)) ms++;
  let ws = 0;
  let wd = cups(0) >= 8 ? 0 : 1;
  while (wd < 30 && cups(wd) >= 8) { ws++; wd++; }

  const trend = [];
  for (let d = 13; d >= 0; d--) {
    const pr = dayProtein(d);
    trend.push({
      d,
      h: Math.max(4, Math.round(Math.min(1.1, pr / tgt) * 76)),
      c: pr >= tgt ? '#2F4A31' : (pr >= tgt * 0.75 ? '#C79A45' : '#DACFB8'),
      isToday: d === 0,
    });
  }

  let sum = 0;
  let onTarget = 0;
  let daysLogged = 0;
  for (let d = 0; d < 14; d++) {
    const v = dayProtein(d);
    sum += v;
    if (v >= tgt) onTarget++;
    if (v > 0 || moved(d)) daysLogged++;
  }
  const avgP = Math.round(sum / 14);

  /* Most-cooked plates, by how often they appear in the log. */
  const cmap: Record<string, any> = {};
  logs.filter((l) => l.kind === 'plate').forEach((l) => {
    const k = l.plateId || l.name;
    if (!cmap[k]) cmap[k] = { n: 0, name: l.name, plateId: l.plateId, last: l.d };
    cmap[k].n++;
    if (l.d < cmap[k].last) cmap[k].last = l.d;
  });
  const sorted = Object.values(cmap).sort((a: any, b: any) => b.n - a.n);
  const maxN = sorted.length ? (sorted[0] as any).n : 1;
  const topPlates = sorted.slice(0, 4).map((x: any, i) => ({
    name: x.name,
    plateId: x.plateId,
    n: x.n + '×',
    lastLabel: 'last ' + dayName(x.last).toLowerCase(),
    barW: Math.round((x.n / maxN) * 100) + '%',
    c: ['#2F4A31', '#7E5F1C', '#2E6B7A', '#7A3C4A'][i % 4],
  }));

  /*
    Today's water is synthesised into the timeline so the day reads complete —
    it is a live counter rather than a discrete entry, and is not removable.
  */
  const synthWater = {
    id: 'water-today', kind: 'water', d: 0, t: 'all day', cups: cups(0),
    name: cups(0) + ' cups of water',
    meta: cups(0) >= 8 ? 'target met' : (8 - cups(0)) + ' cups short of today’s target',
  };
  const allLogs = [synthWater].concat(logs);

  const hf = state.histFilter;
  const histFilters = HIST_FILTERS.map(([id, label]) => ({
    id, label,
    count: id === 'all' ? allLogs.length : allLogs.filter((l) => l.kind === id).length,
    selected: id === hf,
  }));

  const histDays = [];
  for (let d = 0; d < 14; d++) {
    const all = allLogs.filter((l) => l.d === d);
    const shown = (hf === 'all' ? all : all.filter((l) => l.kind === hf))
      .slice()
      .sort((a, b) => minutesOf(b.t) - minutesOf(a.t));
    if (!shown.length) continue;
    histDays.push({
      name: dayName(d),
      summary: dayPlates(d).length + ' plates · ' + dayProtein(d) + 'g protein · '
        + (moved(d) ? 'moved' : 'rest day') + ' · ' + cups(d) + ' cups',
      isToday: d === 0,
      rows: shown.map((l) => ({
        id: l.id,
        name: l.name,
        meta: l.meta || '',
        t: l.t || '',
        c: LOG_KINDS[l.kind]?.c || '#67604F',
        kindLabel: LOG_KINDS[l.kind]?.label || '',
        canRemove: d === 0 && l.id !== 'water-today',
      })),
    });
  }

  const plateCount14 = logs.filter((l) => l.kind === 'plate' && l.d < 14).length;
  const sessionCount14 = logs.filter((l) => l.kind === 'move' && l.d < 14).length;

  return {
    week, trend, topPlates, histFilters, histDays, removeLog,
    streakPlates: ps,
    streakPlatesLabel: ps === 1 ? 'day with a plate logged' : 'days running with a plate logged',
    streakMove: ms,
    streakMoveLabel: ms === 0
      ? 'no session logged yet today'
      : (ms === 1 ? 'day moved' : 'days moved in a row'),
    streakWater: ws,
    streakWaterLabel: cups(0) >= 8
      ? 'days at 8+ cups'
      : (8 - cups(0)) + ' more cups keeps it alive',
    daysLogged, plateCount14, sessionCount14,
    proteinAvg: avgP + 'g',
    proteinTargetLabel: 'target ' + tgt + 'g · set by your goal',
    onTargetLabel: onTarget + ' of 14 days hit it',
    proteinReadLine: avgP >= tgt
      ? 'You are averaging above target — protein is not the limiter right now.'
      : 'Averaging ' + (tgt - avgP) + 'g under target. One more legume-forward plate a day closes it.',
    weekQuiet: week.every((w) => w.plateCount === '—' && !w.moveOn),
    weekQuietLine: 'Nothing logged in the last seven days — the strip fills in as you cook and move. Nothing here is a score.',
    histEmpty: histDays.length === 0,
    histBlank: logs.length === 0,
    histEmptyTitle: logs.length === 0 ? 'Your record starts empty' : 'Nothing of that kind yet',
    histCountLabel: allLogs.length === 0
      ? 'No entries yet'
      : allLogs.length + ' entries · last 14 days',
    plateDefs: plateDefs as any[],
  };
}
