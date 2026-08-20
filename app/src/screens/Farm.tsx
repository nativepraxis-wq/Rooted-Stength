import { useStore } from '../state/store';
import {
  greenDefs, cropMeta, trays, saladDefs, gardenBase, tendDefs,
  gardenMilestones, sowAdvice, bioregions,
} from '../data/content';
import { blockedAllergens } from '../state/kitchen';
import { DarkHeader } from '../components/Headers';
import { TierBadge } from '../components/TierBadge';
import { Screen, Gutter, Band, Chip } from '../components/ui';


/* Calendar months a period covers, e.g. "Mar – May" -> [2,3,4]. */
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

function periodMonths(p: any): number[] {
  const m = (String(p.months).match(/[A-Z][a-z]{2}/g) || [])
    .map((x: string) => MONTHS.indexOf(x.toLowerCase()))
    .filter((i: number) => i >= 0);
  if (m.length < 2) return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const a = m[0];
  const b = m[m.length - 1];
  const out: number[] = [];
  for (let i = a; ; i = (i + 1) % 12) {
    out.push(i);
    if (i === b || out.length > 12) break;
  }
  return out;
}

/*
  sowAdvice has five keys but the bioregions between them name ten seasons, so
  the mapping is explicit rather than a substring match — "Summer" and
  "Harmattan" both sow like a dry season, "Long rains" like a spring.
  Ported from the prototype; guessing here would tell an August farmer to sow
  for spring.
*/
function sowKey(label: string) {
  const l = label.toLowerCase();
  if (l.includes('spring') || l.includes('long rain')) return 'spring';
  if (l.includes('dry') || l.includes('summer') || l.includes('verano') || l.includes('harmattan')) return 'dry';
  if (l.includes('fall')) return 'fall';
  if (l.includes('winter')) return 'winter';
  return 'wet';
}

/* The bioregion's current period, resolved against the real month. */
function currentPeriod(region: any) {
  const now = new Date().getMonth();
  return region.periods.find((p: any) => periodMonths(p).includes(now)) || region.periods[0];
}

/* Crop rows are greenDefs joined with their cropMeta record. */
function crops() {
  return (greenDefs as any[]).map((g) => ({ ...g, ...((cropMeta as any)[g.id] || {}) }));
}

const dayCount = (days: string) => parseInt(days, 10) || 99;

/* ===================== microgreens ===================== */

export function MicrogreensScreen() {
  const { state, set, go, goBack } = useStore();
  const blocked = blockedAllergens(state);
  const list = crops();
  const sel = list.find((g) => g.id === state.libId) ?? list[0];
  const watered = state.watered || {};

  /*
    Salads are flagged, not filtered — same rule as everywhere else. A mix that
    clashes stays on the page with the reason attached.
  */
  const salads = (saladDefs as any[]).map((s) => {
    const bad = !!(s.has && blocked.includes(s.has));
    return { ...s, flagged: bad };
  }).sort((a, b) => (a.flagged ? 1 : 0) - (b.flagged ? 1 : 0));
  const flaggedSalads = salads.filter((s) => s.flagged).length;

  return (
    <Screen>
      <DarkHeader eyebrow="Nourish · living supplements" title="Microgreen Farm" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Microgreens concentrate 4–40× the nutrients of the mature plant — grown on a sill in
          7–14 days for about $1 an ounce.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10,
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
            fontWeight: 600, color: 'var(--ink)', margin: 0,
          }}>Your trays</h2>
          <span style={{
            fontSize: 'calc(11px * var(--scale))', color: 'var(--ink-meta)', fontWeight: 700,
          }}>a one-minute morning ritual</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {(trays as any[]).map((t) => {
            const ready = t.day >= t.days;
            const done = !!watered[t.id];
            return (
              <div key={t.id} style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-tile)', padding: '13px 14px',
              }}>
                <div style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
                  <span aria-hidden="true" style={{
                    width: 10, height: 10, borderRadius: '50%', flex: 'none', background: t.c,
                  }} />
                  <span style={{ flex: 1 }}>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      fontSize: 'calc(13.5px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
                    }}>
                      {t.name}
                      {ready && (
                        <span style={{
                          fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
                          padding: '2px 7px', borderRadius: 11,
                          background: '#E4EDDD', color: 'var(--leaf)',
                        }}>Harvest ✓</span>
                      )}
                    </span>
                    <span style={{
                      display: 'block', fontSize: 'calc(11px * var(--scale))',
                      color: 'var(--ink-meta)', marginTop: 2,
                    }}>Day {t.day} of {t.days}</span>
                  </span>
                  <button
                    type="button"
                    aria-pressed={done}
                    onClick={() => set((s) => ({ watered: { ...s.watered, [t.id]: !done } }))}
                    style={{
                      flex: 'none', minHeight: 44, cursor: 'pointer', borderRadius: 999,
                      border: '1px solid ' + (done ? 'var(--leaf-mid)' : 'var(--border-2)'),
                      background: done ? '#E4EDDD' : 'var(--card)',
                      color: done ? 'var(--leaf)' : 'var(--ink-muted)',
                      padding: '9px 14px',
                      fontSize: 'calc(12px * var(--scale))', fontWeight: 800,
                    }}
                  >{done ? 'Watered ✓' : 'Water'}</button>
                </div>
                <div aria-hidden="true" style={{
                  height: 6, borderRadius: 4, background: 'var(--surface-2)',
                  overflow: 'hidden', marginTop: 10,
                }}>
                  <div style={{
                    height: '100%', width: Math.round((t.day / t.days) * 100) + '%',
                    background: t.c, borderRadius: 4,
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        <Band tone="cream" title="Why living supplements" style={{ marginTop: 16 }}>
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            <li style={{ marginBottom: 5, lineHeight: 1.55 }}>
              Radish shoots run ~30% protein by dry weight — outmuscling many commercial powders
            </li>
            <li style={{ marginBottom: 5, lineHeight: 1.55 }}>
              Cut alive at the counter — enzymes and vitamin C intact, nothing lost to shipping
            </li>
            <li style={{ lineHeight: 1.55 }}>
              Roughly half the cost per serving of green powders — and it&rsquo;s food, not dust
            </li>
          </ul>
        </Band>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          margin: '22px 0 10px',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
            fontWeight: 600, color: 'var(--ink)', margin: 0,
          }}>Variety library</h2>
          <button
            type="button"
            onClick={() => go('croplib')}
            style={{
              border: 'none', background: 'none', cursor: 'pointer', padding: 0,
              fontSize: 'calc(12px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
            }}
          >Browse all {list.length} →</button>
        </div>

        <div className="rs-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {list.slice(0, 8).map((g) => (
            <Chip
              key={g.id}
              selected={g.id === sel.id}
              color={g.c}
              onClick={() => set({ libId: g.id })}
            >{g.name}</Chip>
          ))}
        </div>

        <div style={{
          marginTop: 14, background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-card)', padding: 15,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
            <span style={{
              fontFamily: 'var(--font-serif)', fontSize: 'calc(18px * var(--scale))',
              fontWeight: 600, color: 'var(--ink)',
            }}>{sel.name} microgreens</span>
            <span style={{
              flex: 'none', fontSize: 'calc(11px * var(--scale))',
              fontWeight: 800, color: 'var(--ink-meta)',
            }}>{sel.days} to harvest</span>
          </div>
          <p className="rs-prose" style={{
            fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
            lineHeight: 1.5, margin: '6px 0 0',
          }}>{sel.flavor}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            {(sel.nutrients || []).map((n: any) => (
              <div key={n.name} style={{
                background: 'var(--surface-1)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '11px 12px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{
                    fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
                  }}>{n.name}</span>
                  <TierBadge kind="ev" evLabel={n.ev} style={{ flex: 'none' }} />
                </div>
                <p className="rs-prose" style={{
                  fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
                  lineHeight: 1.5, margin: '5px 0 0',
                }}>{n.why}</p>
              </div>
            ))}
          </div>

          {sel.grow && (
            <div style={{
              fontSize: 'calc(12px * var(--scale))', color: 'var(--leaf)',
              fontWeight: 700, marginTop: 10, lineHeight: 1.45,
            }}>🌱 {sel.grow}</div>
          )}
        </div>

        {/*
          The honest ceiling on the density claim. "4–40×" is true by weight and
          misleading without the serving size beside it.
        */}
        <Band tone="labour" title="Density, honestly" style={{ marginTop: 12 }}>
          Microgreens run 4–40× mature-crop nutrient density by weight — but servings are small.
          They supplement plates; they don&rsquo;t replace them.
        </Band>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 4px',
        }}>Salads by need</h2>
        <div role="status" style={{
          fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700,
          color: flaggedSalads ? 'var(--clay)' : 'var(--ink-meta)', marginBottom: 10,
        }}>
          {flaggedSalads === 0
            ? 'All ' + salads.length + ' mixes fit your profile'
            : flaggedSalads + ' of ' + salads.length + ' mixes flagged for your profile · shown last'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {salads.map((s) => (
            <div key={s.name} style={{
              background: s.flagged ? 'var(--safety-bg)' : 'var(--card)',
              border: '1px solid ' + (s.flagged ? 'var(--border-rose)' : 'var(--border)'),
              borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                <span style={{
                  fontSize: 'calc(14px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
                }}>{s.name}</span>
                <span style={{
                  flex: 'none', fontSize: 'calc(10.5px * var(--scale))',
                  fontWeight: 800, color: s.c,
                }}>{s.need}</span>
              </div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
                lineHeight: 1.5, margin: '6px 0 0',
              }}>{s.mix}</p>
            </div>
          ))}
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== croplib ===================== */

const LIB_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'fast', label: 'Fast · ≤8 days' },
  { id: 'protein', label: 'Protein' },
  { id: 'iron', label: 'Iron' },
  { id: 'kid', label: 'Kid-friendly' },
  { id: 'spicy', label: 'Spicy' },
];

export function CropLibScreen() {
  const { state, set, go, goBack } = useStore();
  const list = crops().map((c) => ({ ...c, fast: dayCount(c.days) <= 8 }));
  const q = (state.libQuery || '').trim().toLowerCase();
  const filter = state.libFilter || 'all';
  const sown = state.sownTrays || [];
  const cart = state.seedCart || {};

  const matches = list.filter((c) => {
    const tagOk = filter === 'all' || (filter === 'fast' ? c.fast : (c.tags || []).includes(filter));
    if (!tagOk) return false;
    if (!q) return true;
    return [c.name, c.flavor, c.carries, c.fam, c.bot]
      .filter(Boolean)
      .some((f: string) => f.toLowerCase().includes(q));
  });

  /*
    Which trays this bioregion's CURRENT season suits — resolved against the
    real month, the same way the seasonal calendar does it. Reading the first
    period instead would tell a farmer in August to sow for spring.
  */
  const region = (bioregions as any)[state.bioregion] || (bioregions as any).northeast;
  const period = currentPeriod(region);
  const advice = (sowAdvice as any)[sowKey(period.label)];

  const seedCount = Object.keys(cart).filter((k) => cart[k]).length;

  return (
    <Screen>
      <DarkHeader eyebrow="Microgreen farm · library" title="Crop Library" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: '0 0 12px',
        }}>
          Seventeen crops that grow on a sill. What each one carries, how long it takes, and what to
          do with it at the counter.
        </p>
        <label className="rs-sr" htmlFor="rs-lib-search">Search a crop, flavor or nutrient</label>
        <input
          id="rs-lib-search"
          value={state.libQuery || ''}
          onChange={(e) => set({ libQuery: e.target.value })}
          placeholder="Search a crop, flavor or nutrient"
          style={{
            width: '100%', minHeight: 44, border: '1px solid rgba(244,237,223,0.3)',
            background: 'rgba(244,237,223,0.12)', color: 'var(--on-dark)',
            borderRadius: 14, padding: '12px 13px', fontSize: 'calc(13px * var(--scale))',
          }}
        />
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div className="rs-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {LIB_FILTERS.map((f) => (
            <Chip
              key={f.id}
              selected={filter === f.id}
              color="var(--leaf-mid)"
              onClick={() => set({ libFilter: f.id })}
            >{f.label}</Chip>
          ))}
        </div>

        <Band tone="cream" title={'Sow now · ' + period.label + ' in ' + region.name} style={{ marginTop: 14 }}>
          <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 5 }}>{advice.crops}</div>
          {advice.line}
        </Band>

        <div role="status" style={{
          fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700,
          color: 'var(--ink-meta)', margin: '14px 0 10px',
        }}>
          {matches.length === list.length
            ? list.length + ' crops'
            : matches.length + ' of ' + list.length + ' crops'}
        </div>

        {matches.length === 0 ? (
          <Band tone="cream" title="Nothing on the sill by that name">
            <div style={{ marginBottom: 10 }}>
              Try &ldquo;protein&rdquo;, &ldquo;iron&rdquo; or a flavor like &ldquo;peppery&rdquo;.
            </div>
            <button
              type="button"
              onClick={() => set({ libQuery: '', libFilter: 'all' })}
              style={{
                border: 'none', background: 'none', cursor: 'pointer', padding: 0,
                fontSize: 'calc(12px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
              }}
            >Clear filters</button>
          </Band>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {matches.map((c) => {
              const growing = sown.includes(c.id) || (trays as any[]).some((t) => t.id === c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => { set({ libId: c.id }); go('variety'); }}
                  style={{
                    display: 'flex', width: '100%', gap: 11, alignItems: 'flex-start', textAlign: 'left',
                    background: 'var(--card)', border: '1px solid var(--border)',
                    borderRadius: 'var(--r-tile)', padding: '13px 14px', cursor: 'pointer', minHeight: 44,
                  }}
                >
                  <span aria-hidden="true" style={{
                    flex: 'none', minWidth: 52, textAlign: 'center', borderRadius: 10,
                    background: c.c, color: '#F4EDDF', padding: '6px 7px',
                    fontSize: 'calc(10px * var(--scale))', fontWeight: 800, lineHeight: 1.25,
                  }}>{c.days}</span>
                  <span style={{ flex: 1 }}>
                    <span style={{
                      display: 'block', fontSize: 'calc(14px * var(--scale))',
                      fontWeight: 700, color: 'var(--ink)',
                    }}>{c.name}</span>
                    <span style={{
                      display: 'block', fontSize: 'calc(11px * var(--scale))',
                      color: 'var(--ink-meta)', fontStyle: 'italic', marginTop: 2,
                    }}>{c.fam} · {c.bot}</span>
                    <span style={{
                      display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                      color: 'var(--earth)', fontWeight: 700, marginTop: 3,
                    }}>{c.carries}</span>
                    {growing && (
                      <span style={{
                        display: 'inline-block', marginTop: 6,
                        fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
                        padding: '3px 8px', borderRadius: 12,
                        background: '#E4EDDD', color: 'var(--leaf)',
                      }}>on the sill now</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {seedCount > 0 && (
          <button
            type="button"
            onClick={() => go('grocery')}
            style={{
              display: 'flex', width: '100%', gap: 11, alignItems: 'center', textAlign: 'left',
              marginTop: 16, background: 'var(--surface-cream)',
              border: '1px solid var(--border-cream)', borderRadius: 'var(--r-band)',
              padding: '13px 14px', cursor: 'pointer', minHeight: 44,
            }}
          >
            <span aria-hidden="true" style={{
              width: 28, height: 28, flex: 'none', borderRadius: 9, background: 'var(--leaf)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#F4EDDF', fontSize: 12, fontWeight: 800,
            }}>{seedCount}</span>
            <span style={{ flex: 1 }}>
              <span style={{
                display: 'block', fontSize: 'calc(13px * var(--scale))',
                fontWeight: 700, color: 'var(--ink)',
              }}>Seed packets on the list</span>
              <span style={{
                display: 'block', fontSize: 'calc(11px * var(--scale))',
                color: 'var(--ink-meta)', marginTop: 2,
              }}>At the co-op · sows a season of trays</span>
            </span>
            <span aria-hidden="true" style={{ fontSize: 17, color: 'var(--earth)' }}>&#8250;</span>
          </button>
        )}

        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 14,
        }}>
          <TierBadge kind="ev" tierKey="emerging" />
          <button
            type="button"
            onClick={() => go('sources')}
            style={{
              border: 'none', background: 'none', cursor: 'pointer', padding: 0,
              fontSize: 'calc(12px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
            }}
          >Sources: crop-level reviews →</button>
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== variety ===================== */

export function VarietyScreen() {
  const { state, set, go, goBack, toast } = useStore();
  const list = crops();
  const v = list.find((c) => c.id === state.libId) ?? list[0];
  const sown = state.sownTrays || [];
  const cart = state.seedCart || {};
  const isSown = sown.includes(v.id) || (trays as any[]).some((t) => t.id === v.id);
  const inCart = !!cart[v.id];

  return (
    <Screen>
      <DarkHeader eyebrow={v.fam + ' · ' + v.bot} title={v.name + ' microgreens'} back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: '0 0 12px',
        }}>{v.flavor}</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { n: v.days, l: 'to harvest' },
            { n: v.yield, l: 'yield' },
            { n: v.price, l: 'seed packet' },
          ].map((s) => (
            <div key={s.l} style={{
              flex: 1, background: 'rgba(244,237,223,0.13)', borderRadius: 14, padding: '10px 10px',
            }}>
              <div style={{
                fontSize: 'calc(12.5px * var(--scale))', fontWeight: 800, color: 'var(--ochre-light)',
              }}>{s.n}</div>
              <div style={{
                fontSize: 'calc(9.5px * var(--scale))', textTransform: 'uppercase',
                letterSpacing: 0.6, marginTop: 3,
              }}>{s.l}</div>
            </div>
          ))}
        </div>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '0 0 10px',
        }}>What it carries</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(v.nutrients || []).map((n: any) => (
            <div key={n.name} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '12px 13px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                <span style={{
                  fontSize: 'calc(13px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
                }}>{n.name}</span>
                <TierBadge kind="ev" evLabel={n.ev} style={{ flex: 'none' }} />
              </div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
                lineHeight: 1.5, margin: '5px 0 0',
              }}>{n.why}</p>
            </div>
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Grow protocol</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            ['Soak', v.soak],
            ['Sow', v.rate + ' on an inch of soil, misted'],
            ['Blackout', v.dark],
            ['Harvest', v.cut],
          ].map(([step, detail], i) => (
            <div key={step as string} style={{
              display: 'flex', gap: 11, alignItems: 'flex-start',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '12px 13px',
            }}>
              <span aria-hidden="true" style={{
                width: 24, height: 24, flex: 'none', borderRadius: 8, background: v.c,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#F4EDDF', fontSize: 12, fontWeight: 800,
              }}>{i + 1}</span>
              <span className="rs-prose" style={{
                flex: 1, fontSize: 'calc(12.5px * var(--scale))',
                color: 'var(--ink-muted)', lineHeight: 1.5,
              }}>
                <b style={{ color: 'var(--ink)' }}>{step}</b> — {detail as string}
              </span>
            </div>
          ))}
        </div>

        {v.grow && (
          <Band tone="cream" style={{ marginTop: 12 }}>🌱 {v.grow}</Band>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 16 }}>
          <button
            type="button"
            aria-pressed={isSown}
            onClick={() => {
              set((s) => ({
                sownTrays: isSown
                  ? (s.sownTrays || []).filter((x: string) => x !== v.id)
                  : (s.sownTrays || []).concat([v.id]),
              }));
              if (!isSown) toast(v.name + ' sown — day 0 of ' + v.days, 'Farm', 'microgreens');
            }}
            style={{
              width: '100%', minHeight: 44, cursor: 'pointer', borderRadius: 14, padding: 14,
              border: '1px solid ' + (isSown ? 'var(--leaf-mid)' : 'var(--forest)'),
              background: isSown ? '#E4EDDD' : 'var(--forest)',
              color: isSown ? 'var(--leaf)' : 'var(--on-dark)',
              fontSize: 'calc(14px * var(--scale))', fontWeight: 800,
            }}
          >{isSown ? 'On the sill ✓ — tap to remove' : 'Sow a tray'}</button>

          <button
            type="button"
            aria-pressed={inCart}
            onClick={() => set((s) => ({ seedCart: { ...s.seedCart, [v.id]: !inCart } }))}
            style={{
              width: '100%', minHeight: 44, cursor: 'pointer', borderRadius: 14, padding: 13,
              border: '1px solid var(--border-2)', background: 'var(--card)',
              color: inCart ? 'var(--leaf)' : 'var(--ink-muted)',
              fontSize: 'calc(13.5px * var(--scale))', fontWeight: 700,
            }}
          >{inCart ? 'Seed packet on the list ✓' : 'Add seed packet to the list'}</button>
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== garden ===================== */

export function GardenScreen() {
  const { state, set, go, goBack } = useStore();
  const tended = state.tended || {};
  const doneCount = (tendDefs as any[]).filter((t) => tended[t.key]).length;

  return (
    <Screen>
      <DarkHeader eyebrow="Season 3 · late summer" title="Your Strength Garden" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Every practice you keep is planted here. Missed days slow the garden — they never burn it
          down.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        {/* The plot grid. Purely CSS, like every other texture in this app. */}
        <div style={{
          background: 'var(--surface-1)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-card)', padding: 15,
        }}>
          <div
            role="img"
            aria-label={'A garden of ' + (gardenBase as any[]).length + ' plots, grown from the practices you have kept this season.'}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9 }}
          >
            {(gardenBase as any[]).map((p, i) => (
              <div key={i} style={{
                aspectRatio: '1', borderRadius: 14, background: 'var(--surface-3)',
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 8,
              }}>
                <div aria-hidden="true" style={{
                  width: 6 + p.s * 3, height: 10 + p.s * 9,
                  borderRadius: '50% 50% 40% 40%', background: p.c,
                }} />
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 12,
            fontSize: 'calc(10.5px * var(--scale))', fontWeight: 700, color: 'var(--ink-meta)',
          }}>
            {[
              { l: 'Move', c: '#7FA8B5' }, { l: 'Nourish', c: '#8FB37A' },
              { l: 'Rest', c: '#B79BC0' }, { l: 'Community', c: '#D4AA5C' },
            ].map((k) => (
              <span key={k.l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span aria-hidden="true" style={{
                  width: 9, height: 9, borderRadius: '50%', background: k.c,
                }} />{k.l}
              </span>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          margin: '22px 0 10px',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
            fontWeight: 600, color: 'var(--ink)', margin: 0,
          }}>Tend today</h2>
          <span style={{
            fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700, color: 'var(--ink-meta)',
          }}>{doneCount} of {(tendDefs as any[]).length} tended</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(tendDefs as any[]).map((t) => {
            const on = !!tended[t.key];
            return (
              <button
                key={t.key}
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => set((s) => ({ tended: { ...s.tended, [t.key]: !on } }))}
                style={{
                  display: 'flex', width: '100%', gap: 11, alignItems: 'center', textAlign: 'left',
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-tile)', padding: '13px 14px', cursor: 'pointer', minHeight: 44,
                }}
              >
                <span aria-hidden="true" style={{
                  width: 22, height: 22, flex: 'none', borderRadius: 7,
                  background: on ? t.c : 'var(--card)',
                  border: '1px solid ' + (on ? t.c : 'var(--border-2)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#FFFFFF', fontSize: 13, fontWeight: 800,
                }}>{on ? '✓' : ''}</span>
                <span style={{ flex: 1 }}>
                  <span style={{
                    display: 'block', fontSize: 'calc(13px * var(--scale))',
                    fontWeight: 700, color: 'var(--ink)',
                  }}>{t.label}</span>
                  <span style={{
                    display: 'block', fontSize: 'calc(11px * var(--scale))',
                    color: 'var(--ink-meta)', marginTop: 2,
                  }}>{t.sub}</span>
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => go('community')}
          style={{
            display: 'flex', width: '100%', gap: 10, alignItems: 'center', textAlign: 'left',
            marginTop: 14, background: 'var(--surface-cream)', border: '1px solid var(--border-cream)',
            borderRadius: 'var(--r-band)', padding: '13px 14px', cursor: 'pointer', minHeight: 44,
          }}
        >
          <span style={{
            flex: 1, fontSize: 'calc(12.5px * var(--scale))',
            color: 'var(--ink-muted)', lineHeight: 1.45,
          }}>
            <b style={{ color: 'var(--ink)' }}>The Village Grove</b> — shared trees grow when you
            gather. Saturday Farm Day adds one.
          </span>
          <span aria-hidden="true" style={{ fontSize: 17, color: 'var(--earth)' }}>&#8250;</span>
        </button>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Milestones</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(gardenMilestones as any[]).map((m) => (
            <div key={m.t} style={{
              display: 'flex', gap: 11, alignItems: 'flex-start',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '12px 13px',
            }}>
              <span aria-hidden="true" style={{
                width: 10, height: 10, borderRadius: '50%', flex: 'none',
                background: m.c, marginTop: 5,
              }} />
              <span style={{ flex: 1 }}>
                <span style={{
                  display: 'block', fontSize: 'calc(13px * var(--scale))',
                  fontWeight: 700, color: 'var(--ink)',
                }}>{m.t}</span>
                <span style={{
                  display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                  color: 'var(--ink-meta)', marginTop: 2,
                }}>{m.s}</span>
              </span>
            </div>
          ))}
        </div>

        {/*
          The garden is a metaphor for practice, not a performance metric —
          which is the difference between it and a streak you can break.
        */}
        <Band tone="cream" title="Nothing here dies" style={{ marginTop: 16 }}>
          A missed week slows growth; it does not reset the season or take anything away. This is a
          picture of what you have tended, not a score you are defending.
        </Band>
      </Gutter>
    </Screen>
  );
}
