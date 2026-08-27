import { nourImage, pairImage, ILLUSTRATION_NOTE } from '../data/media';
import {
  pairingDepth, methodDepth, hydratorDepth, filterDepth,
  householdDepth, kidSmoothieDepth,
} from '../data/nourishDepth';
import { useStore } from '../state/store';
import {
  pairings, prepMethods, prepMatrix, uptakeFacts, uptakeMyths,
  budgetCats, budgetTips, hydrators, filters, filterStops,
  familyDefs, kidSmoothies, allergenWord,
} from '../data/content';
import { blockedAllergens } from '../state/kitchen';
import { DarkHeader } from '../components/Headers';
import { TierBadge } from '../components/TierBadge';
import { Screen, Gutter, Band, Chip } from '../components/ui';

/* Small uppercase run-in label for the Nourish depth blocks. */
function NLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
      letterSpacing: 1, textTransform: 'uppercase',
      color: 'var(--ink-meta)', marginBottom: 3,
    }}>{children}</div>
  );
}

/* ===================== pairings ===================== */

export function PairingsScreen() {
  const { go, goBack } = useStore();

  return (
    <Screen>
      <DarkHeader eyebrow="Nourish · uptake" title="What the plate lets you absorb" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Eating a nutrient is not the same as absorbing it. Which combinations move the needle,
          and by how much.
        </p>
      </DarkHeader>

      <img
        src={nourImage('pairings')}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={{
          display: 'block', width: '100%', height: 156,
          objectFit: 'cover', background: 'var(--surface-2)',
        }}
      />
      <div style={{
        fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)',
        fontWeight: 700, padding: '6px 18px 0',
      }}>{ILLUSTRATION_NOTE}</div>

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 9 }}>
          {(uptakeFacts as any[]).map((f) => (
            <div key={f.l} style={{
              background: 'var(--surface-1)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '11px 12px',
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: 'calc(18px * var(--scale))',
                fontWeight: 600, color: 'var(--ink)',
              }}>{f.n}</div>
              <div style={{
                fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)',
                marginTop: 2, lineHeight: 1.35,
              }}>{f.l}</div>
            </div>
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Pairings that change the number</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {(pairings as any[]).map((p) => (
            <div key={p.combo} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: 0, overflow: 'hidden',
            }}>
              <img
                src={pairImage(p.combo)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                style={{
                  display: 'block', width: '100%', height: 140,
                  objectFit: 'cover', background: 'var(--surface-2)',
                }}
              />
              <div style={{ padding: '13px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                <span style={{
                  fontSize: 'calc(14px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
                }}>{p.combo}</span>
                <span style={{
                  fontSize: 'calc(11.5px * var(--scale))',
                  fontWeight: 800, color: p.c,
                }}>{p.gain}</span>
              </div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
                lineHeight: 1.5, margin: '6px 0 0',
              }}>{p.why}</p>

              {/*
                Depth, from data/nourishDepth.ts. `limit` is where the headline
                multiplier gets held to its conditions - a fourfold rise on 2%
                absorption is still 8%.
              */}
              {pairingDepth[p.combo] && (() => {
                const pd = pairingDepth[p.combo];
                return (
                  <div style={{
                    marginTop: 10, paddingTop: 10,
                    borderTop: '1px solid var(--border)',
                  }}>
                    <NLabel>How to do it</NLabel>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink)',
                      lineHeight: 1.55, margin: 0,
                    }}>{pd.how}</p>

                    <div style={{ marginTop: 9 }}>
                      <NLabel>Why it works</NLabel>
                      <p className="rs-prose" style={{
                        fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
                        lineHeight: 1.5, margin: 0,
                      }}>{pd.mechanism}</p>
                    </div>

                    {pd.limit && (
                      <div style={{ marginTop: 9 }}>
                        <NLabel>Where the claim stops</NLabel>
                        <p className="rs-prose" style={{
                          fontSize: 'calc(12px * var(--scale))', color: 'var(--earth)',
                          lineHeight: 1.5, margin: 0, fontWeight: 600,
                        }}>{pd.limit}</p>
                      </div>
                    )}
                  </div>
                );
              })()}
              </div>
            </div>
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Preparation does the rest</h2>
        <div style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-tile)', overflow: 'hidden',
        }}>
          {(prepMatrix as any[]).map((m, i) => (
            <div key={m.m} style={{
              padding: '12px 13px',
              borderTop: i === 0 ? 'none' : '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                <span style={{
                  fontSize: 'calc(13px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
                }}>{m.m}</span>
                <span style={{
                  fontSize: 'calc(11px * var(--scale))',
                  fontWeight: 800, color: 'var(--ink-meta)',
                }}>{m.t}</span>
              </div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
                lineHeight: 1.5, margin: '5px 0 0',
              }}>{m.e}</p>
              {/* Depth, from data/nourishDepth.ts. */}
              {methodDepth[m.m] && (
                <div style={{ marginTop: 8 }}>
                  <NLabel>How it is done</NLabel>
                  <p className="rs-prose" style={{
                    fontSize: 'calc(12px * var(--scale))', color: 'var(--ink)',
                    lineHeight: 1.5, margin: 0,
                  }}>{methodDepth[m.m].how}</p>
                  <p className="rs-prose" style={{
                    fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
                    lineHeight: 1.5, margin: '6px 0 0',
                  }}>{methodDepth[m.m].effect}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/*
          Myths are stated and then answered. Repeating a claim without the
          correction attached is how a myth spreads through an app.
        */}
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>What is not true</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(uptakeMyths as any[]).map((m) => (
            <div key={m.m} style={{
              background: 'var(--safety-bg)', border: '1px solid var(--border-rose)',
              borderRadius: 'var(--r-tile)', padding: '12px 13px',
            }}>
              <div style={{
                fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700,
                color: 'var(--ink-muted)', textDecoration: 'line-through',
              }}>{m.m}</div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink)',
                lineHeight: 1.5, margin: '5px 0 0', fontWeight: 600,
              }}>{m.v}</p>
            </div>
          ))}
        </div>

        <Band tone="cream" title="Techniques worth learning once" style={{ marginTop: 16 }}>
          {(prepMethods as any[]).map((p) => p.m + ' — ' + p.e).join(' · ')}
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== budget ===================== */

export function BudgetScreen() {
  const { state, set, goBack } = useStore();
  const add = state.spentAdd || {};
  const cats = budgetCats as any[];
  const weekly = state.weeklyBudget ?? 100;

  const spent = cats.reduce((a, c, i) => a + c.spent + (add[i] || 0), 0);
  const left = weekly - spent;
  const pct = Math.min(100, Math.round((spent / weekly) * 100));

  return (
    <Screen>
      <DarkHeader eyebrow="Nourish · this week" title="Grocery budget" back={goBack}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'baseline', marginTop: 2 }}>
          <span style={{
            fontFamily: 'var(--font-serif)', fontSize: 'calc(30px * var(--scale))',
            fontWeight: 600, color: 'var(--ochre-light)',
          }}>${spent}</span>
          <span style={{
            fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700,
            color: 'var(--on-dark-muted)',
          }}>of ${weekly} · ${left >= 0 ? left + ' left' : Math.abs(left) + ' over'}</span>
        </div>
        <div aria-hidden="true" style={{
          height: 8, borderRadius: 6, background: 'rgba(244,237,223,0.2)',
          overflow: 'hidden', marginTop: 12,
        }}>
          <div style={{
            height: '100%', width: pct + '%', borderRadius: 6,
            background: left >= 0 ? '#8FB37A' : '#E0876B',
          }} />
        </div>
      </DarkHeader>
      <img
        src={nourImage('budget')}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={{
          display: 'block', width: '100%', height: 156,
          objectFit: 'cover', background: 'var(--surface-2)',
        }}
      />
      <div style={{
        fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)',
        fontWeight: 700, padding: '6px 18px 0',
      }}>{ILLUSTRATION_NOTE}</div>

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {cats.map((c, i) => {
            const catSpent = c.spent + (add[i] || 0);
            const over = catSpent > c.budget;
            return (
              <div key={c.cat} style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-tile)', padding: '13px 14px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                  <span style={{
                    fontSize: 'calc(13.5px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
                  }}>{c.cat}</span>
                  <span style={{
                    fontSize: 'calc(12.5px * var(--scale))', fontWeight: 800,
                    color: over ? 'var(--clay)' : 'var(--ink-meta)',
                  }}>${catSpent} / ${c.budget}</span>
                </div>
                <div aria-hidden="true" style={{
                  height: 7, borderRadius: 5, background: 'var(--surface-2)',
                  overflow: 'hidden', margin: '9px 0',
                }}>
                  <div style={{
                    height: '100%', borderRadius: 5,
                    width: Math.min(100, Math.round((catSpent / c.budget) * 100)) + '%',
                    background: over ? 'var(--clay)' : c.c,
                  }} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[5, 10].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => set((s) => ({
                        spentAdd: { ...s.spentAdd, [i]: (s.spentAdd?.[i] || 0) + amt },
                      }))}
                      style={{
                        border: '1px solid var(--border-2)', background: 'var(--card)',
                        color: 'var(--ink-muted)', borderRadius: 999, padding: '8px 14px',
                        minHeight: 44, cursor: 'pointer',
                        fontSize: 'calc(12px * var(--scale))', fontWeight: 700,
                      }}
                    >+ ${amt}</button>
                  ))}
                  {(add[i] || 0) > 0 && (
                    <button
                      type="button"
                      onClick={() => set((s) => ({ spentAdd: { ...s.spentAdd, [i]: 0 } }))}
                      style={{
                        border: 'none', background: 'none', color: 'var(--earth)',
                        minHeight: 44, cursor: 'pointer',
                        fontSize: 'calc(12px * var(--scale))', fontWeight: 700,
                      }}
                    >Undo ${add[i]}</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Where the money goes furthest</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(budgetTips as any[]).map((t) => (
            <div key={t.t} style={{
              display: 'flex', gap: 11, alignItems: 'center',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '12px 13px',
            }}>
              <span style={{
                flex: 1, minWidth: 0, fontSize: 'calc(12.5px * var(--scale))',
                color: 'var(--ink)', lineHeight: 1.45,
              }}>{t.t}</span>
              <span style={{
                fontSize: 'calc(12px * var(--scale))',
                fontWeight: 800, color: 'var(--leaf)',
              }}>{t.save}</span>
            </div>
          ))}
        </div>

        {/*
          Cost is a constraint, not a moral failing. The handoff's low-cost
          restriction exists so plans bend to a budget rather than shaming it.
        */}
        <Band tone="cream" title="A budget is a constraint, not a verdict" style={{ marginTop: 16 }}>
          Dried beans, bulk grains and a sill of microgreens carry most of this app&rsquo;s
          nutrition at the bottom of its price range. Eating well on little is a skill the
          traditions here already hold.
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== hydration ===================== */

export function HydrationScreen() {
  const { state, set, go, goBack } = useStore();
  const cups = state.hydrationCups ?? 0;
  const goal = 9;
  const pct = Math.min(100, Math.round((cups / goal) * 100));

  return (
    <Screen>
      <DarkHeader eyebrow="Today · water as first medicine" title="Hydration" back={goBack}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ position: 'relative', width: 78, height: 78, flex: 'none' }}>
            <svg width="78" height="78" viewBox="0 0 78 78" style={{ transform: 'rotate(-90deg)' }} role="img"
              aria-label={cups + ' of ' + goal + ' cups today'}>
              <circle cx="39" cy="39" r="33" fill="none" stroke="rgba(244,237,223,0.18)" strokeWidth="7" />
              <circle
                cx="39" cy="39" r="33" fill="none" stroke="#8FCBD8" strokeWidth="7" strokeLinecap="round"
                strokeDasharray="207" strokeDashoffset={207 - (207 * pct) / 100}
              />
            </svg>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-serif)', fontSize: 'calc(24px * var(--scale))',
              fontWeight: 600, color: 'var(--on-dark)',
            }}>{cups}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 'calc(13px * var(--scale))', fontWeight: 800, color: 'var(--ochre-light)',
            }}>{cups} of {goal} cups today</div>
            <p className="rs-prose" style={{
              fontSize: 'calc(12px * var(--scale))', lineHeight: 1.5,
              color: 'var(--on-dark-muted)', margin: '4px 0 0',
            }}>
              Target rises on hot farm and trail days. Sip steadily rather than gulping.
            </p>
          </div>
        </div>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', gap: 9 }}>
          <button
            type="button"
            onClick={() => set((s) => ({ hydrationCups: Math.min((s.hydrationCups ?? 0) + 1, 12) }))}
            /*
              This was a hand-rolled copy of PrimaryButton with --forest swapped
              for --teal, and that swap failed in dark mode.

              --teal is overridden in the dark theme to a light tint (#7BBACB)
              because everywhere else in the app teal is TEXT. --on-dark is not
              overridden - it stays cream. So this button, the only place teal
              is used as a fill behind text, rendered cream on pale teal at
              1.85:1 against a 4.5:1 requirement. Confirmed in the live DOM, not
              only computed.

              --forest is what every other primary button uses and measures
              10.63:1 in BOTH themes. Every other property here already matched
              PrimaryButton exactly.
            */
            style={{
              flex: 1, minWidth: 0, border: 'none', background: 'var(--forest)', color: 'var(--on-dark)',
              borderRadius: 14, padding: 14, minHeight: 44, cursor: 'pointer',
              fontSize: 'calc(14px * var(--scale))', fontWeight: 800,
            }}
          >+ Add a cup</button>
          <button
            type="button"
            onClick={() => set((s) => ({ hydrationCups: Math.max((s.hydrationCups ?? 0) - 1, 0) }))}
            style={{
              flex: 'none', border: '1px solid var(--border-2)', background: 'var(--card)',
              color: 'var(--ink-muted)', borderRadius: 14, padding: '14px 18px',
              minHeight: 44, cursor: 'pointer',
              fontSize: 'calc(13.5px * var(--scale))', fontWeight: 700,
            }}
          >Undo</button>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Beyond plain water</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(hydrators as any[]).map((h) => (
            <div key={h.name} style={{
              display: 'flex', gap: 11, alignItems: 'flex-start',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '12px 13px',
            }}>
              <span aria-hidden="true" style={{
                width: 10, height: 10, borderRadius: '50%', flex: 'none',
                background: h.c, marginTop: 5,
              }} />
              <span style={{ flex: 1 }}>
                <span style={{
                  display: 'block', fontSize: 'calc(13px * var(--scale))',
                  fontWeight: 700, color: 'var(--ink)',
                }}>{h.name}</span>
                <span style={{
                  display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                  color: 'var(--ink-meta)', marginTop: 2, lineHeight: 1.45,
                }}>{h.why}</span>

                {/* Depth, from data/nourishDepth.ts. */}
                {hydratorDepth[h.name] && (
                  <span style={{
                    display: 'block', marginTop: 8, paddingTop: 8,
                    borderTop: '1px solid var(--border)',
                  }}>
                    <NLabel>How</NLabel>
                    <span className="rs-prose" style={{
                      display: 'block', fontSize: 'calc(12px * var(--scale))',
                      color: 'var(--ink)', lineHeight: 1.5,
                    }}>{hydratorDepth[h.name].how}</span>
                    <NLabel><span style={{ display: 'inline-block', marginTop: 8 }}>When it is the right one</span></NLabel>
                    <span className="rs-prose" style={{
                      display: 'block', fontSize: 'calc(12px * var(--scale))',
                      color: 'var(--ink-muted)', lineHeight: 1.5,
                    }}>{hydratorDepth[h.name].when}</span>
                    {hydratorDepth[h.name].note && (
                      <span className="rs-prose" style={{
                        display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                        color: 'var(--clay)', lineHeight: 1.45,
                        marginTop: 7, fontWeight: 600,
                      }}>{hydratorDepth[h.name].note}</span>
                    )}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>

        {/*
          Content Rule 7, verbatim in spirit: ORS is a clinical formulation and a
          homemade electrolyte drink is never presented as a substitute.
        */}
        <Band tone="safety" title="Homemade electrolytes are not ORS" style={{ marginTop: 16 }}>
          Oral rehydration solution is a clinical formulation with a specific glucose-to-sodium
          ratio. A sorrel-and-salt drink is fine for a hot afternoon; it is not a treatment for
          serious dehydration, especially in a child or an elder. Use a proper ORS sachet and seek
          care.
        </Band>

        <button
          type="button"
          onClick={() => go('filters')}
          style={{
            display: 'flex', width: '100%', gap: 10, alignItems: 'center', textAlign: 'left',
            marginTop: 14, background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-card)', padding: '14px 15px', cursor: 'pointer', minHeight: 44,
          }}
        >
          <span style={{ flex: 1 }}>
            <span style={{
              display: 'block', fontSize: 'calc(14px * var(--scale))',
              fontWeight: 700, color: 'var(--ink)',
            }}>Find a water filter</span>
            <span style={{
              display: 'block', fontSize: 'calc(11.5px * var(--scale))',
              color: 'var(--ink-meta)', marginTop: 2,
            }}>Clean first, remineralize second</span>
          </span>
          <span aria-hidden="true" style={{ fontSize: 17, color: 'var(--ink-meta)' }}>&#8250;</span>
        </button>
      </Gutter>
    </Screen>
  );
}

/* ===================== filters ===================== */

export function FiltersScreen() {
  const { goBack } = useStore();

  return (
    <Screen>
      <DarkHeader eyebrow="Hydration · clean water" title="Find a water filter" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Filtering is the first step; remineralizing is the second. Match a filter to your home,
          budget and what&rsquo;s in your water.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {(filters as any[]).map((f) => (
            <div key={f.name} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-card)', padding: '14px 15px',
            }}>
              <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                <span aria-hidden="true" style={{
                  width: 10, height: 10, borderRadius: '50%', flex: 'none',
                  background: f.c, marginTop: 6,
                }} />
                <span style={{ flex: 1 }}>
                  <span style={{
                    display: 'block', fontSize: 'calc(14.5px * var(--scale))',
                    fontWeight: 700, color: 'var(--ink)',
                  }}>{f.name}</span>
                  <span style={{
                    display: 'block', fontSize: 'calc(11px * var(--scale))',
                    fontWeight: 800, color: f.c, marginTop: 2,
                    textTransform: 'uppercase', letterSpacing: 0.6,
                  }}>{f.tier}</span>
                </span>
                <span style={{
                  fontSize: 'calc(12px * var(--scale))',
                  fontWeight: 800, color: 'var(--ink-meta)',
                }}>{f.cost}</span>
              </div>
              {/*
                Depth, from data/nourishDepth.ts. `limit` matters most on the
                charcoal stick, which is a taste improver rather than a
                protective filter - choosing it for a lead problem would be a
                serious mistake, and the card now says so.
              */}
              {filterDepth[f.name] && (
                <div style={{
                  marginTop: 10, paddingTop: 10,
                  borderTop: '1px solid var(--border)',
                }}>
                  <NLabel>How it works</NLabel>
                  <p className="rs-prose" style={{
                    fontSize: 'calc(12px * var(--scale))', color: 'var(--ink)',
                    lineHeight: 1.5, margin: 0,
                  }}>{filterDepth[f.name].how}</p>
                  <div style={{ marginTop: 8 }}>
                    <NLabel>What it does not do</NLabel>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12px * var(--scale))', color: 'var(--clay)',
                      lineHeight: 1.5, margin: 0, fontWeight: 600,
                    }}>{filterDepth[f.name].limit}</p>
                  </div>
                </div>
              )}
              <div style={{
                fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
                marginTop: 9, lineHeight: 1.5,
              }}>
                <b style={{ color: 'var(--ink)' }}>Removes:</b> {f.removes}
              </div>
              <div style={{
                fontSize: 'calc(11.5px * var(--scale))', color: 'var(--earth)',
                fontWeight: 700, marginTop: 5, lineHeight: 1.45,
              }}>{f.fit}</div>
            </div>
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Where to get one near you</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(filterStops as any[]).map((s) => (
            <div key={s.name} style={{
              display: 'flex', gap: 11, alignItems: 'center',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '12px 13px',
            }}>
              <span aria-hidden="true" style={{
                width: 10, height: 10, borderRadius: '50%', flex: 'none', background: s.c,
              }} />
              <span style={{ flex: 1 }}>
                <span style={{
                  display: 'block', fontSize: 'calc(13px * var(--scale))',
                  fontWeight: 700, color: 'var(--ink)',
                }}>{s.name}</span>
                <span style={{
                  display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                  color: 'var(--ink-meta)', marginTop: 2,
                }}>{s.type}</span>
              </span>
              <span style={{
                fontSize: 'calc(11.5px * var(--scale))',
                fontWeight: 700, color: 'var(--ink-meta)',
              }}>{s.dist}</span>
            </div>
          ))}
        </div>

        <Band tone="labour" title="Whose water is it" style={{ marginTop: 16 }}>
          A filter is a household fix for a public failure. Lead pipes and PFAS in a water system
          are somebody&rsquo;s responsibility, and buying your way around them privately is not the
          same as that responsibility being met.
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== family ===================== */

export function FamilyScreen() {
  const { state, set, goBack } = useStore();
  const blocked = blockedAllergens(state);
  /*
    The household's training adult IS the user, not a separate persona: the
    seeded obName is that member's name, obPronoun matches, the age and the
    protein-and-iron guidance are the app's own user model. So renaming yourself
    in the intake form has to rename this card too - it did not, and the
    household went on calling you Amara after you had changed it everywhere else.

    Only that one member is substituted. Kofi and Nana are other people and are
    left alone. The initial follows the name so the avatar does not end up
    showing someone else's letter.

    With no name set it falls back to the ROLE rather than to the seeded 'Amara'.
    Falling back to the seed would reintroduce the same bug in miniature - the
    app calling you by a stranger's name because you had not given it one - and
    it would contradict how the rest of the app handles an absent value, which is
    to name the absence: "No name set", "No goal set".
  */
  const people = (familyDefs as any[]).map((p) => {
    if (p.id !== 'amara') return p;
    const n = (state.obName ?? '').trim();
    if (!n) return { ...p, name: p.role, initial: p.role[0].toUpperCase() };
    return { ...p, name: n, initial: n[0].toUpperCase() };
  });
  const sel = people.find((p) => p.id === state.familyId) ?? people[0];

  const kids = (kidSmoothies as any[]).map((s) => ({
    ...s, flagged: !!(s.has && blocked.includes(s.has)),
  })).sort((a, b) => (a.flagged ? 1 : 0) - (b.flagged ? 1 : 0));

  return (
    <Screen>
      <DarkHeader eyebrow="Nourish · the household" title="Feeding the whole table" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          One pot, different needs. Nobody at this table gets a separate, lesser meal.
        </p>
      </DarkHeader>
      <img
        src={nourImage('family')}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={{
          display: 'block', width: '100%', height: 156,
          objectFit: 'cover', background: 'var(--surface-2)',
        }}
      />
      <div style={{
        fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)',
        fontWeight: 700, padding: '6px 18px 0',
      }}>{ILLUSTRATION_NOTE}</div>

      <Gutter style={{ paddingTop: 16 }}>
        <div className="rs-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {people.map((p) => (
            <Chip
              key={p.id}
              selected={p.id === sel.id}
              color={p.c}
              onClick={() => set({ familyId: p.id })}
            >{p.name}</Chip>
          ))}
        </div>

        <div style={{
          marginTop: 14, background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-card)', padding: 15,
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span aria-hidden="true" style={{
              width: 44, height: 44, flex: 'none', borderRadius: '50%', background: sel.c,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#F4EDDF', fontFamily: 'var(--font-serif)',
              fontSize: 'calc(19px * var(--scale))', fontWeight: 600,
            }}>{sel.initial}</span>
            <span style={{ flex: 1 }}>
              <span style={{
                display: 'block', fontFamily: 'var(--font-serif)',
                fontSize: 'calc(19px * var(--scale))', fontWeight: 600, color: 'var(--ink)',
              }}>{sel.name}</span>
              <span style={{
                display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                color: 'var(--ink-meta)', marginTop: 1,
              }}>{sel.age} · {sel.role}</span>
            </span>
          </div>

          <ul style={{ margin: '14px 0 0', paddingLeft: 16 }}>
            {sel.points.map((pt: string) => (
              <li key={pt} className="rs-prose" style={{
                fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
                lineHeight: 1.55, marginBottom: 5,
              }}>{pt}</li>
            ))}
          </ul>

          {/* Depth, from data/nourishDepth.ts. Keyed on the member id. */}
          {householdDepth[sel.id] && (
            <div style={{
              marginTop: 12, paddingTop: 12,
              borderTop: '1px solid var(--border)',
            }}>
              <NLabel>Why their needs differ</NLabel>
              <p className="rs-prose" style={{
                fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink)',
                lineHeight: 1.55, margin: 0,
              }}>{householdDepth[sel.id].why}</p>
              <div style={{ marginTop: 9 }}>
                <NLabel>From the same pot</NLabel>
                <p className="rs-prose" style={{
                  fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
                  lineHeight: 1.5, margin: 0,
                }}>{householdDepth[sel.id].onePot}</p>
              </div>
            </div>
          )}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Blends the little ones drink</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {kids.map((s) => (
            <div key={s.name} style={{
              background: s.flagged ? 'var(--safety-bg)' : 'var(--card)',
              border: '1px solid ' + (s.flagged ? 'var(--border-rose)' : 'var(--border)'),
              borderRadius: 'var(--r-tile)', padding: 0, display: 'flex', overflow: 'hidden',
            }}>
              <div aria-hidden="true" style={{ width: 11, flex: 'none', background: s.c }} />
              <div style={{ flex: 1, minWidth: 0, padding: '13px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                  <span style={{
                    fontSize: 'calc(14px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
                  }}>{s.name}</span>
                  <span style={{
                    fontSize: 'calc(11.5px * var(--scale))',
                    fontWeight: 800, color: 'var(--leaf)',
                  }}>{s.p} · {s.kcal} kcal</span>
                </div>
                <p className="rs-prose" style={{
                  fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
                  lineHeight: 1.5, margin: '6px 0 0',
                }}>{s.base}</p>
                {/* Depth, from data/nourishDepth.ts. */}
                {kidSmoothieDepth[s.name] && (
                  <div style={{
                    marginTop: 9, paddingTop: 9,
                    borderTop: '1px solid var(--border)',
                  }}>
                    <NLabel>Building it</NLabel>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12px * var(--scale))', color: 'var(--ink)',
                      lineHeight: 1.5, margin: 0,
                    }}>{kidSmoothieDepth[s.name].build}</p>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
                      lineHeight: 1.5, margin: '6px 0 0',
                    }}>{kidSmoothieDepth[s.name].why}</p>
                  </div>
                )}
                {s.flagged && (
                  <div style={{
                    fontSize: 'calc(11.5px * var(--scale))', color: 'var(--clay)',
                    fontWeight: 700, marginTop: 6, lineHeight: 1.4,
                  }}>
                    contains {(allergenWord as any)[s.has] || s.has}
                    {s.swapTo && ' · ' + s.swapTo}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/*
          Children's growth is the one place where restriction genuinely carries
          risk, and the app says so rather than assuming a parent knows.
        */}
        <Band tone="safety" title="Children are not small adults" style={{ marginTop: 16 }}>
          Growing bodies need energy density and fat that an adult plate does not. An all-plant diet
          can absolutely feed a child well — with B12, iron, iodine, omega-3 and enough calories
          planned deliberately, ideally alongside a paediatrician or dietitian who knows the family.
        </Band>
      </Gutter>
    </Screen>
  );
}
