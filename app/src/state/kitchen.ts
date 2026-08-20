import {
  obRestrList, allergenMap, allergenWord, freeWord,
  pantryCats, pantryUnits, plateUses, pantryKeywords, groceryToPantry,
  groceryStops, planAisles, restaurants, sbOptions,
} from '../data/content';
import type { AppState } from './store';

/*
  Derived state for the kitchen surfaces — pantry, grocery, restaurant order and
  the smoothie builder.

  The rule these all share: a profile restriction never makes something vanish.
  It swaps it, flags it, or counts it, and always says why.
*/

/* The allergen keys the profile currently blocks, e.g. ['soy','nuts']. */
export function blockedAllergens(state: AppState): string[] {
  return (obRestrList as any[])
    .filter((x) => state.obRestr[x.id])
    .map((x) => (allergenMap as any)[x.id])
    .filter(Boolean);
}

/* "1 serving" / "6 servings" — the prototype said "1 servings". */
export const servings = (n: number) => n + (n === 1 ? ' serving' : ' servings');

/*
  Restock confirmation. Some pantry entries carry no serving count at all
  (plantains, for one), and the prototype reported those as "0 servings back in
  the pantry". Say what actually happened instead of quoting a zero.
*/
export const restockMessage = (name: string, units: number) =>
  units > 0
    ? name + ' restocked — ' + servings(units) + ' back in the pantry'
    : name + ' added to the pantry';

const words = (a: string[]) =>
  (a.length > 2 ? a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1] : a.join(' and '));

/* ---------- pantry ---------- */

/*
  Which pantry items a logged plate consumes. Falls back to keyword matching on
  the plate's name when the plate has no explicit mapping — a scanned or
  voice-logged plate, for instance.
*/
export function usesOf(plateId: string | undefined, name: string | undefined): string[] {
  if (plateId && (plateUses as any)[plateId]) return (plateUses as any)[plateId];
  const t = (name || '').toLowerCase();
  const out: string[] = [];
  (pantryKeywords as any[]).forEach((k) => {
    if (k[1].some((w: string) => t.includes(w))) out.push(k[0]);
  });
  return out;
}

/* Days of freshness left, for the perishables that carry one. */
const PANTRY_EXP: Record<string, number> = {
  tomato: 3, peashoots: 2, collards: 4, sweetpot: 9, hemp: 20, seamoss: 10, lentils: 45,
};

/*
  The pantry, with stock drawn down by what has actually been cooked.

  Every plate logged in the last 7 days consumes a serving of each item it uses,
  so inventory moves as the user cooks. An item cooked to empty stops counting
  as "have" and surfaces on the restock list rather than staying quietly ticked.
*/
export function pantryView(state: AppState) {
  const blocked = blockedAllergens(state);
  const off = state.pantryOff || {};
  const restockSet = state.pantryRestock || {};

  const cookWindow = (state.logs as any[]).filter((l) => l.kind === 'plate' && l.d < 7);
  const cookUse: Record<string, number> = {};
  const cookBy: Record<string, { name: string; d: number }> = {};
  cookWindow.forEach((l) => usesOf(l.plateId, l.name).forEach((pid) => {
    cookUse[pid] = (cookUse[pid] || 0) + 1;
    if (!cookBy[pid] || l.d < cookBy[pid].d) cookBy[pid] = { name: l.name, d: l.d };
  }));

  const byId: Record<string, any> = {};
  (pantryCats as any[]).forEach((g) => g.items.forEach((it: any) => { byId[it.id] = it; }));

  const emptiedIds: string[] = [];
  const useSoon: { name: string; days: number }[] = [];
  let count = 0;
  let low = 0;
  let clash = 0;

  const cats = (pantryCats as any[]).map((g) => ({
    ...g,
    items: g.items.map((it: any) => {
      const units = (pantryUnits as any)[it.id] || 0;
      const used = cookUse[it.id] || 0;
      const restocked = !!restockSet[it.id];
      const left = restocked ? units : Math.max(0, units - used);
      const emptied = it.have && units > 0 && left === 0;
      const override = off[it.id];
      const have = override === undefined ? (it.have && !emptied) : override;
      if (emptied && !restocked) emptiedIds.push(it.id);
      if (have) count++;
      const lowNow = have && !restocked && (it.low || (left > 0 && left <= 1));
      if (lowNow) low++;

      const days = PANTRY_EXP[it.id];
      let freshLabel = '';
      let freshTone = '';
      if (have && days !== undefined) {
        if (days <= 3) {
          freshLabel = days + 'd left';
          freshTone = 'urgent';
          useSoon.push({ name: it.name, days });
        } else if (days <= 10) {
          freshLabel = days + 'd left';
          freshTone = 'soon';
        } else {
          freshLabel = 'fresh';
          freshTone = 'ok';
        }
      } else if (have) {
        freshLabel = 'stable';
        freshTone = 'neutral';
      }

      const clashes = !!(it.has && blocked.includes(it.has) && have);
      return {
        ...it, have, left, units, used, restocked, emptied, lowNow, freshLabel, freshTone, clashes,
        drawLabel: used > 0 && have && !restocked ? '−' + used + ' cooked' : '',
        qtyLabel: restocked
          ? 'restocked · ' + servings(units)
          : have
            ? (used > 0 ? servings(left) + ' left' : (it.qty || 'in stock'))
            : (emptied ? 'cooked to empty' : 'add to list'),
        clashLabel: clashes
          ? 'contains ' + ((allergenWord as any)[it.has] || it.has) + ' · swap to ' + it.swapTo
          : '',
      };
    }),
  }));

  (pantryCats as any[]).forEach((g) => g.items.forEach((it: any) => {
    const have = off[it.id] === undefined ? it.have : off[it.id];
    if (have && it.has && blocked.includes(it.has)) clash++;
  }));

  /* The six items closest to empty, so the drawdown is shown rather than implied. */
  const cookedDown = Object.keys(cookUse)
    .filter((id) => byId[id] && ((pantryUnits as any)[id] || 0) > 0)
    .map((id) => {
      const units = (pantryUnits as any)[id];
      const used = cookUse[id];
      const restocked = !!restockSet[id];
      const left = restocked ? units : Math.max(0, units - used);
      return {
        id, name: byId[id].name, used, left, units, restocked,
        usedLabel: restocked ? 'restocked' : '−' + Math.min(used, units),
        barW: Math.round((left / units) * 100) + '%',
        leftLabel: left === 0 ? 'empty' : left + ' of ' + units,
        lastLabel: 'last in ' + (cookBy[id]
          ? cookBy[id].name.split(/[—,(]/)[0].trim().toLowerCase()
          : 'a logged plate'),
      };
    })
    .sort((a, b) => ((a.left / a.units) - (b.left / b.units)) || (b.used - a.used))
    .slice(0, 6);

  const emptied = emptiedIds.map((id) => ({
    id,
    name: byId[id].name,
    why: 'ran out cooking ' + (cookBy[id]
      ? cookBy[id].name.split(/[—,(]/)[0].trim().toLowerCase()
      : 'this week’s plates'),
    units: (pantryUnits as any)[id] || 0,
  }));

  const emptiedNames = (() => {
    const n = words(emptied.map((x) => x.name.replace(/ \(.*\)/, '').toLowerCase()));
    return n.charAt(0).toUpperCase() + n.slice(1);
  })();

  const drawnCount = Object.keys(cookUse)
    .filter((id) => byId[id] && ((pantryUnits as any)[id] || 0) > 0).length;

  return {
    cats, count, low, clash, cookedDown, emptied,
    cookedHeadline: cookWindow.length + ' plates logged in the last 7 days drew down '
      + drawnCount + ' pantry items.',
    emptiedLine: emptied.length
      ? emptiedNames + ' — cooked to empty and already on your grocery list.'
      : 'Nothing has been cooked to empty this week.',
    useSoonText: useSoon.sort((a, b) => a.days - b.days).map((x) => x.name).join(', '),
  };
}

/* ---------- grocery ---------- */

/*
  The shopping list, by store. An item that clashes with the profile is swapped
  for its alternative and labelled as swapped — the original is never silently
  removed, and the swap count is reported at the top.
*/
export function groceryView(state: AppState) {
  const blocked = blockedAllergens(state);
  const got = state.got || {};
  let total = 0;
  let remaining = 0;
  let swaps = 0;
  let sum = 0;

  const stops = (groceryStops as any[]).map((st) => {
    const items = st.items.map((raw: any) => {
      const swapped = !!(raw.has && blocked.includes(raw.has));
      if (swapped) swaps++;
      const it = swapped ? { ...raw, ...raw.swap } : raw;
      sum += parseFloat(String(it.price).replace('$', '')) || 0;
      const g = !!got[it.id];
      total++;
      if (!g) remaining++;
      return {
        ...it, g, swapped,
        swapBadge: swapped
          ? 'swapped · ' + ((freeWord as any)[raw.has] || raw.has) + '-free'
          : '',
        pantryId: (groceryToPantry as any)[it.id],
        pantryTag: g ? 'pantry restocked ✓' : 'restocks your pantry',
      };
    });
    const est = st.items.reduce((n: number, raw: any) => {
      const it = (raw.has && blocked.includes(raw.has)) ? raw.swap : raw;
      return n + (parseFloat(String(it.price).replace('$', '')) || 0);
    }, 0);
    return { ...st, items, est: '$' + est.toFixed(2) };
  });

  return {
    stops, total, remaining,
    done: total > 0 && remaining === 0,
    doneLine: 'All ' + total
      + ' items picked up. Restock the jars in your pantry so the plates know what you have.',
    est: '$' + sum.toFixed(2),
    swapLine: swaps === 0
      ? 'Nothing on this list clashes with your profile'
      : swaps + (swaps === 1 ? ' item was swapped' : ' items were swapped') + ' for your profile',
  };
}

/*
  Staples the meal plan needs that have an allergen-safe alternative. When a
  swap fires, the replacement is grouped under its own visible aisle so the
  substitution is legible rather than buried among the originals.
*/
const SWAP_PAIRS = [
  {
    key: 'soy',
    base: { id: 'p-tofu', name: 'Firm tofu', qty: '2 blocks', meals: 'Thu lunch' },
    alt: { id: 'p-butterbean', name: 'Butter beans (dried)', qty: '1 lb', meals: 'Thu lunch · soy-free swap' },
  },
  {
    key: 'nuts',
    base: { id: 'p-peanut', name: 'Peanuts, raw', qty: '2 cups', meals: 'Thu dinner' },
    alt: { id: 'p-sunbutter', name: 'Sunflower-seed butter', qty: '1 jar', meals: 'Thu dinner · nut-free swap' },
  },
  {
    key: 'sesame',
    base: { id: 'p-sesoil', name: 'Toasted sesame oil', qty: '1 bottle', meals: 'Mon dinner' },
    alt: { id: 'p-pumpkin', name: 'Pumpkin seeds', qty: '1 cup', meals: 'Mon dinner · sesame-free swap' },
  },
  {
    key: 'gluten',
    base: { id: 'p-wraps', name: 'Whole-wheat wraps', qty: '6', meals: 'Fri lunch' },
    alt: { id: 'p-teff', name: 'Teff flour, for flats', qty: '2 cups', meals: 'Fri lunch · gluten-free swap' },
  },
];

export function planGroceryView(state: AppState) {
  const blocked = blockedAllergens(state);
  const got = state.planGot || {};

  const swapped = SWAP_PAIRS.filter((sp) => blocked.includes(sp.key)).map((sp) => sp.alt);
  const kept = SWAP_PAIRS.filter((sp) => !blocked.includes(sp.key)).map((sp) => sp.base);
  const extra = [
    { aisle: 'Protein & fats', c: '#7E5124', items: kept },
    { aisle: 'Swapped for your profile', c: '#2F4A31', items: swapped },
  ].filter((a) => a.items.length > 0);

  let need = 0;
  let have = 0;
  const aisles = (planAisles as any[]).concat(extra).map((a) => ({
    ...a,
    items: a.items.map((it: any) => {
      const checked = !!got[it.id];
      if (it.have) have++; else need++;
      return { ...it, checked, done: !!(it.have || checked), tag: it.have ? 'in pantry' : '' };
    }),
  }));

  return { aisles, need, have, swappedCount: swapped.length };
}

/* ---------- restaurant order ---------- */

/*
  Builds an order and checks it against the Complete Rooted Plate: protein,
  energy carb, green and hydration. Dishes that clash sort last, stay visible,
  and carry the reason.
*/
export function orderView(state: AppState) {
  const blocked = blockedAllergens(state);
  const ord = state.order || {};
  const rst = (restaurants as any)[state.restId] || (restaurants as any).ital;

  let kcal = 0;
  let prot = 0;
  let cost = 0;
  let fitCount = 0;
  let flagCount = 0;
  const roles: Record<string, boolean> = {};
  const flagged: string[] = [];

  const items = rst.menu.map((m: any) => {
    const sel = !!ord[m.id];
    const clash = !!(m.has && blocked.includes(m.has));
    if (clash) { flagCount++; if (sel) flagged.push(m.name); } else fitCount++;
    if (sel) { kcal += m.kcal; prot += m.p; cost += m.price; roles[m.role] = true; }
    return {
      ...m, sel, clash,
      clashLabel: clash
        ? 'off your profile · contains ' + ((allergenWord as any)[m.has] || m.has)
        : '',
      statLabel: m.kcal + ' kcal · ' + m.p + 'g protein',
      priceLabel: '$' + m.price,
    };
  });
  items.sort((a: any, b: any) => (a.clash ? 1 : 0) - (b.clash ? 1 : 0));

  const need: string[] = [];
  if (!roles.protein) need.push('protein');
  if (!roles.grain) need.push('energy carb');
  if (!roles.green) need.push('a green');
  if (!roles.hydration) need.push('hydration');

  const activeRestr = (obRestrList as any[]).filter((x) => state.obRestr[x.id]);
  const ask = rst.ask + (activeRestr.length
    ? ' Your profile is ' + activeRestr.map((x) => x.label.toLowerCase()).join(', ')
      + ' — ask about shared fryers, sauces and flour.'
    : '');

  return {
    rst: { ...rst, ask }, items, kcal, prot, cost: '$' + cost,
    gapText: need.length
      ? 'Still missing: ' + need.join(', ') + '.'
      : 'Complete Rooted Plate — protein, green, carb and hydration covered.',
    gapDone: need.length === 0,
    fitLine: flagCount === 0
      ? fitCount + ' dishes · nothing here clashes with your profile'
      : fitCount + ' of ' + (fitCount + flagCount) + ' dishes fit your profile · '
        + flagCount + ' flagged below',
    warnText: flagged.length
      ? 'In your order and off your profile: ' + flagged.join(', ')
        + ' — ask the kitchen or swap it out.'
      : '',
  };
}

/* ---------- smoothie builder ---------- */

/* Options the profile permits. Hidden ones are counted and named, not dropped. */
export function sbList(state: AppState, kind: string) {
  const blocked = blockedAllergens(state);
  return (sbOptions as any)[kind].filter((o: any) => !(o.has && blocked.includes(o.has)));
}

/*
  The effective selection. If a stored choice is no longer permitted by the
  profile, it falls back to the first allowed option — the builder must never
  total up something the user cannot drink.
*/
export function sbEffective(state: AppState) {
  const sb = state.sb;
  const pick = (kind: string, id: string) => {
    const l = sbList(state, kind);
    return l.some((o: any) => o.id === id) ? id : l[0]?.id;
  };
  const boost: Record<string, boolean> = {};
  sbList(state, 'boost').forEach((o: any) => { if (sb.boost[o.id]) boost[o.id] = true; });
  return {
    protein: pick('protein', sb.protein),
    fruit: pick('fruit', sb.fruit),
    liquid: pick('liquid', sb.liquid),
    boost,
  };
}

export function sbTotals(state: AppState) {
  const sb = sbEffective(state);
  let p = 0;
  let k = 0;
  const add = (arr: string, id: string) => {
    const o = (sbOptions as any)[arr].find((x: any) => x.id === id);
    if (o) { p += o.p; k += o.k; }
  };
  add('protein', sb.protein);
  add('fruit', sb.fruit);
  add('liquid', sb.liquid);
  (sbOptions as any).boost.forEach((o: any) => { if (sb.boost[o.id]) { p += o.p; k += o.k; } });
  return { p, k };
}

export function sbName(state: AppState) {
  const sb = sbEffective(state);
  const pr = (sbOptions as any).protein.find((x: any) => x.id === sb.protein);
  const fr = (sbOptions as any).fruit.find((x: any) => x.id === sb.fruit);
  const boosts = (sbOptions as any).boost.filter((o: any) => sb.boost[o.id]);
  const lead = boosts.length === 1 ? boosts[0].name.toLowerCase() : '';
  return [fr ? fr.name : 'Custom', lead, pr ? pr.short : 'protein', 'blend']
    .filter(Boolean).join(' ');
}

/*
  The protein verdict. It names the ~30 g post-training mark and says exactly how
  far off the current blend is — a number and a fix, not encouragement.

  The suggested fix is drawn from bases the profile actually permits. The
  prototype hard-coded "pea protein or silken tofu", which recommended soy to a
  soy-free user — an ingredient the same screen had just hidden. Nothing is
  suggested here that the profile excludes.
*/
export function sbVerdict(state: AppState) {
  const p = sbTotals(state).p;
  if (p >= 30) return { line: 'Clears the ~30 g post-training mark on its own.', met: true };
  if (p >= 20) {
    return {
      line: 'Solid — ' + (30 - p)
        + 'g short of the post-training mark. A second scoop or a spoon of seeds closes it.',
      met: false,
    };
  }

  const current = sbEffective(state).protein;
  const strongest = sbList(state, 'protein')
    .filter((o: any) => o.id !== current)
    .sort((a: any, b: any) => b.p - a.p)
    .slice(0, 2)
    .map((o: any) => o.name.toLowerCase());

  return {
    line: strongest.length
      ? 'Light for recovery — ' + strongest.join(' or ')
        + ' as the base would lift it toward ~30 g.'
      : 'Light for recovery — a heavier protein base would lift it toward ~30 g.',
    met: false,
  };
}

export function sbHiddenLine(state: AppState) {
  const kinds = ['protein', 'fruit', 'boost', 'liquid'];
  const hidden = kinds.reduce(
    (n, k) => n + ((sbOptions as any)[k].length - sbList(state, k).length), 0);
  const names = kinds.flatMap((k) =>
    (sbOptions as any)[k]
      .filter((o: any) => !sbList(state, k).some((a: any) => a.id === o.id))
      .map((o: any) => o.name.toLowerCase()));
  return hidden === 0
    ? 'Every ingredient here fits your profile'
    : hidden + (hidden === 1 ? ' ingredient hidden' : ' ingredients hidden')
      + ' by your profile · ' + names.join(', ');
}

export function sbParts(state: AppState) {
  const sb = sbEffective(state);
  const parts: string[] = [];
  const pr = (sbOptions as any).protein.find((x: any) => x.id === sb.protein);
  if (pr) parts.push(pr.name);
  const fr = (sbOptions as any).fruit.find((x: any) => x.id === sb.fruit);
  if (fr) parts.push(fr.name);
  (sbOptions as any).boost.forEach((o: any) => { if (sb.boost[o.id]) parts.push(o.name); });
  const lq = (sbOptions as any).liquid.find((x: any) => x.id === sb.liquid);
  if (lq) parts.push(lq.name);
  return parts;
}
