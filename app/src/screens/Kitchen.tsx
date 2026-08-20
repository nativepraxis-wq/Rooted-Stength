import { useStore } from '../state/store';
import {
  pantryView, groceryView, planGroceryView, blockedAllergens, servings, restockMessage,
} from '../state/kitchen';
import { mealWeek, allergenWord, pantryUnits } from '../data/content';
import { DarkHeader } from '../components/Headers';
import {
  Screen, Gutter, Band, PrimaryButton, SecondaryButton,
} from '../components/ui';

/* A checkbox drawn as a square, with the tick carried in aria rather than colour. */
function CheckBox({ on, dim }: { on: boolean; dim?: boolean }) {
  return (
    <span aria-hidden="true" style={{
      width: 22, height: 22, flex: 'none', borderRadius: 7,
      background: dim ? 'var(--ink-meta)' : (on ? 'var(--leaf)' : 'var(--card)'),
      border: '1px solid ' + (dim ? 'var(--ink-soft)' : (on ? 'var(--leaf)' : 'var(--border-2)')),
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#FFFFFF', fontSize: 13, fontWeight: 800,
    }}>{(on || dim) ? '✓' : ''}</span>
  );
}

function SectionTitle({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      gap: 10, margin: '20px 0 9px',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
        fontWeight: 600, color: 'var(--ink)', margin: 0,
      }}>{children}</h2>
      {note && (
        <span style={{
          fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 0.6,
          textTransform: 'uppercase', color: 'var(--ink-meta)',
        }}>{note}</span>
      )}
    </div>
  );
}

/* ===================== mealPlan ===================== */

export function MealPlanScreen() {
  const { state, set, go, goBack } = useStore();
  const blocked = blockedAllergens(state);
  const week = mealWeek as any[];
  const day = week[(state.mealDay ?? 1) % week.length] ?? week[0];

  /* Meals that clash are shown with their swap named — never dropped from the day. */
  const swapCount = week.reduce(
    (t, d) => t + d.meals.filter((m: any) => m.has && blocked.includes(m.has)).length, 0);

  return (
    <Screen>
      <DarkHeader eyebrow="Nourish · this week" title="Meal plan" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Seven days built around your goal. Days carry their own focus — fuel on farm days,
          building on training days.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        {/* Day selector */}
        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 4 }}>
          {week.map((d, i) => {
            const on = i === (state.mealDay ?? 1) % week.length;
            return (
              <button
                key={d.day}
                type="button"
                onClick={() => set({ mealDay: i })}
                aria-pressed={on}
                style={{
                  flex: 'none', minWidth: 54, minHeight: 56, cursor: 'pointer',
                  borderRadius: 14, padding: '9px 6px',
                  border: '1px solid ' + (on ? d.accent : 'var(--border)'),
                  background: on ? d.accent : 'var(--card)',
                  color: on ? 'var(--on-dark)' : 'var(--ink-muted)',
                }}
              >
                <div style={{ fontSize: 'calc(12px * var(--scale))', fontWeight: 800 }}>{d.day}</div>
                <div style={{ fontSize: 'calc(9.5px * var(--scale))', marginTop: 3, opacity: 0.85 }}>
                  {d.done ? 'done' : d.today ? 'today' : ''}
                </div>
              </button>
            );
          })}
        </div>

        <div style={{
          marginTop: 14, background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-card)', padding: 16, boxShadow: 'var(--shadow-card)',
        }}>
          <div style={{
            fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 1.4,
            textTransform: 'uppercase', color: day.accent,
          }}>{day.label}</div>
          <div style={{
            fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))',
            fontWeight: 600, color: 'var(--ink)', marginTop: 3,
          }}>{day.focus}</div>
          <div style={{
            fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
            fontWeight: 700, marginTop: 3,
          }}>{day.kcal} kcal target</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            {day.meals.map((m: any) => {
              const clash = !!(m.has && blocked.includes(m.has));
              return (
                <div key={m.slot} style={{
                  background: clash ? 'var(--safety-bg)' : 'var(--surface-1)',
                  border: '1px solid ' + (clash ? 'var(--border-rose)' : 'var(--border)'),
                  borderRadius: 'var(--r-tile)', padding: '11px 12px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{
                      fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800,
                      letterSpacing: 0.8, textTransform: 'uppercase', color: 'var(--ink-meta)',
                    }}>{m.slot}</span>
                    <span style={{
                      fontSize: 'calc(11.5px * var(--scale))', fontWeight: 800, color: 'var(--leaf)',
                    }}>{m.p}</span>
                  </div>
                  <div style={{
                    fontSize: 'calc(13.5px * var(--scale))', color: 'var(--ink)',
                    fontWeight: 600, marginTop: 3, lineHeight: 1.3,
                  }}>{clash && m.swap ? m.swap : m.name}</div>
                  {clash && (
                    <div style={{
                      fontSize: 'calc(11.5px * var(--scale))', color: 'var(--clay)',
                      fontWeight: 700, marginTop: 4, lineHeight: 1.4,
                    }}>
                      swapped — the original contains {(allergenWord as any)[m.has] || m.has}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {swapCount > 0 && (
          <Band tone="safety" title={swapCount + (swapCount === 1 ? ' meal swapped' : ' meals swapped') + ' this week'} style={{ marginTop: 14 }}>
            Your restrictions changed these meals rather than removing them. The original dish is
            named on each card so you can see what was altered and why.
          </Band>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 14 }}>
          <PrimaryButton onClick={() => go('planGrocery')}>Build the grocery list</PrimaryButton>
          <SecondaryButton onClick={() => go('pantry')}>Check the pantry first</SecondaryButton>
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== pantry (inventory) ===================== */

export function PantryScreen() {
  const { state, set, go, goBack, restockPantry, toast } = useStore();
  const pv = pantryView(state);

  const freshTone: Record<string, { bg: string; fg: string }> = {
    urgent: { bg: 'var(--safety-bg)', fg: 'var(--clay)' },
    soon: { bg: 'var(--surface-3)', fg: 'var(--earth)' },
    ok: { bg: '#E4EDDD', fg: 'var(--leaf)' },
    neutral: { bg: 'var(--surface-2)', fg: 'var(--ink-meta)' },
  };

  return (
    <Screen>
      <DarkHeader eyebrow="Nourish · inventory" title="Pantry" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Stock falls as you cook. Every plate you log draws down the items it uses.
        </p>
        <div style={{
          marginTop: 12, fontSize: 'calc(11px * var(--scale))', fontWeight: 800,
          letterSpacing: 1, textTransform: 'uppercase', color: 'var(--ochre-light)',
        }}>
          {pv.count} in stock · {pv.low} running low
        </div>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        {/* What cooking actually consumed */}
        {pv.cookedDown.length > 0 && (
          <div style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-card)', padding: 15,
          }}>
            <div style={{
              fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700,
              color: 'var(--ink)', lineHeight: 1.45,
            }}>{pv.cookedHeadline}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
              {pv.cookedDown.map((c) => (
                <div key={c.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                    <span style={{
                      fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
                    }}>{c.name}</span>
                    <span style={{
                      fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700,
                      color: c.restocked ? 'var(--leaf)' : (c.left === 0 ? 'var(--clay)' : 'var(--ink-meta)'),
                    }}>{c.usedLabel} · {c.leftLabel}</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 6, background: 'var(--surface-2)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: c.barW, borderRadius: 6,
                      background: c.restocked ? 'var(--leaf)' : (c.left === 0 ? 'var(--clay)' : c.left <= 1 ? 'var(--earth)' : 'var(--leaf)'),
                    }} />
                  </div>
                  <div style={{
                    fontSize: 'calc(11px * var(--scale))', color: 'var(--ink-meta)', marginTop: 3,
                  }}>{c.lastLabel}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cooked to empty → one-tap restock */}
        {pv.emptied.length > 0 && (
          <Band tone="safety" title={pv.emptied.length + (pv.emptied.length === 1 ? ' item' : ' items') + ' cooked to empty'} style={{ marginTop: 12 }}>
            <div style={{ marginBottom: 10 }}>{pv.emptiedLine}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {pv.emptied.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => {
                    restockPantry(e.id, true);
                    toast(restockMessage(e.name, e.units), 'Pantry', 'pantry');
                  }}
                  style={{
                    display: 'flex', width: '100%', gap: 10, alignItems: 'center', textAlign: 'left',
                    background: 'var(--card)', border: '1px solid var(--border)',
                    borderRadius: 12, padding: '10px 12px', cursor: 'pointer', minHeight: 44,
                  }}
                >
                  <span style={{ flex: 1 }}>
                    <span style={{
                      display: 'block', fontSize: 'calc(12.5px * var(--scale))',
                      fontWeight: 700, color: 'var(--ink)',
                    }}>{e.name}</span>
                    <span style={{
                      display: 'block', fontSize: 'calc(11px * var(--scale))',
                      color: 'var(--ink-meta)', marginTop: 2,
                    }}>{e.why}</span>
                  </span>
                  <span style={{
                    flex: 'none', fontSize: 'calc(11.5px * var(--scale))',
                    fontWeight: 800, color: 'var(--leaf)',
                  }}>Restock</span>
                </button>
              ))}
            </div>
          </Band>
        )}

        {pv.useSoonText && (
          <Band tone="cream" title="Use these first" style={{ marginTop: 12 }}>
            {pv.useSoonText} — closest to turning. Build this week&rsquo;s plates around them.
          </Band>
        )}

        {/* The inventory itself */}
        {pv.cats.map((g: any) => (
          <div key={g.cat}>
            <SectionTitle note={g.items.filter((i: any) => i.have).length + ' / ' + g.items.length}>
              {g.cat}
            </SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {g.items.map((it: any) => (
                <button
                  key={it.id}
                  type="button"
                  role="switch"
                  aria-checked={it.have}
                  onClick={() => set((s) => ({ pantryOff: { ...s.pantryOff, [it.id]: !it.have } }))}
                  style={{
                    display: 'flex', width: '100%', gap: 11, alignItems: 'flex-start', textAlign: 'left',
                    background: it.clashes ? 'var(--safety-bg)' : 'var(--card)',
                    border: '1px solid ' + (it.clashes ? 'var(--border-rose)' : 'var(--border)'),
                    borderRadius: 'var(--r-tile)', padding: '12px 13px', cursor: 'pointer', minHeight: 44,
                  }}
                >
                  <span style={{ paddingTop: 1 }}><CheckBox on={it.have} /></span>
                  <span style={{ flex: 1 }}>
                    <span style={{
                      display: 'block', fontSize: 'calc(13.5px * var(--scale))', fontWeight: 600,
                      color: it.have ? 'var(--ink)' : 'var(--ink-meta)',
                    }}>{it.name}</span>
                    <span style={{
                      display: 'block', fontSize: 'calc(11.5px * var(--scale))', marginTop: 3,
                      fontWeight: 700,
                      color: it.lowNow ? 'var(--clay)' : it.have ? 'var(--ink-meta)' : it.emptied ? 'var(--clay)' : 'var(--earth)',
                    }}>
                      {it.qtyLabel}{it.drawLabel && ' · ' + it.drawLabel}
                    </span>
                    {it.clashLabel && (
                      <span style={{
                        display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                        color: 'var(--clay)', fontWeight: 700, marginTop: 4, lineHeight: 1.4,
                      }}>{it.clashLabel}</span>
                    )}
                  </span>
                  {it.freshLabel && (
                    <span style={{
                      flex: 'none', fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
                      padding: '3px 8px', borderRadius: 12, whiteSpace: 'nowrap',
                      background: freshTone[it.freshTone].bg, color: freshTone[it.freshTone].fg,
                    }}>{it.freshLabel}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {pv.clash > 0 && (
          <Band tone="labour" title={pv.clash + (pv.clash === 1 ? ' item conflicts' : ' items conflict') + ' with your profile'} style={{ marginTop: 16 }}>
            These are still in your pantry and still listed — the app does not decide what leaves
            your shelf. Each one names the swap it would use in a recipe.
          </Band>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 16 }}>
          <PrimaryButton onClick={() => go('grocery')}>Go to the grocery list</PrimaryButton>
          <div style={{ display: 'flex', gap: 9 }}>
            <SecondaryButton onClick={() => set({ route: 'barcode', bcFound: false })}>Scan barcode</SecondaryButton>
            <SecondaryButton onClick={() => set({ route: 'voice', voiceHeard: false })}>Add by voice</SecondaryButton>
          </div>
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== grocery (by store) ===================== */

export function GroceryScreen() {
  const { state, set, goBack, restockPantry, toast } = useStore();
  const gv = groceryView(state);

  const toggle = (it: any) => {
    set((s) => ({ got: { ...s.got, [it.id]: !it.g } }));
    if (it.pantryId) {
      restockPantry(it.pantryId, !it.g);
      if (!it.g) {
        toast(restockMessage(it.name, (pantryUnits as any)[it.pantryId] || 0), 'Pantry', 'pantry');
      }
    }
  };

  return (
    <Screen>
      <DarkHeader eyebrow="Nourish · shopping" title="Grocery list" back={goBack}>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 2 }}>
          <span style={{ fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700 }}>
            {gv.remaining} of {gv.total} left
          </span>
          <span style={{
            fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, color: 'var(--ochre-light)',
          }}>{gv.est} estimated</span>
        </div>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div role="status" style={{
          fontSize: 'calc(12px * var(--scale))', fontWeight: 700,
          color: 'var(--ink-meta)', marginBottom: 12,
        }}>{gv.swapLine}</div>

        {gv.done && (
          <Band tone="cream" title="List cleared" style={{ marginBottom: 12 }}>{gv.doneLine}</Band>
        )}

        {gv.stops.map((st: any) => (
          <div key={st.store}>
            <SectionTitle note={st.est}>{st.store}</SectionTitle>
            <div style={{
              fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
              fontWeight: 600, margin: '-4px 0 9px',
            }}>{st.meta}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {st.items.map((it: any) => (
                <button
                  key={it.id}
                  type="button"
                  role="checkbox"
                  aria-checked={it.g}
                  onClick={() => toggle(it)}
                  style={{
                    display: 'flex', width: '100%', gap: 11, alignItems: 'flex-start', textAlign: 'left',
                    background: 'var(--card)', border: '1px solid var(--border)',
                    borderRadius: 'var(--r-tile)', padding: '12px 13px', cursor: 'pointer', minHeight: 44,
                  }}
                >
                  <span style={{ paddingTop: 1 }}><CheckBox on={it.g} /></span>
                  <span style={{ flex: 1 }}>
                    <span style={{
                      display: 'block', fontSize: 'calc(13.5px * var(--scale))', fontWeight: 600,
                      color: it.g ? 'var(--ink-meta)' : 'var(--ink)',
                      textDecoration: it.g ? 'line-through' : 'none',
                    }}>{it.name} <span style={{ fontWeight: 500 }}>· {it.qty}</span></span>
                    <span style={{
                      display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                      color: 'var(--ink-meta)', marginTop: 3,
                    }}>{it.why}</span>
                    <span style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                      {it.swapBadge && (
                        <span style={{
                          fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
                          padding: '3px 8px', borderRadius: 12,
                          background: 'var(--safety-bg)', color: 'var(--clay)',
                        }}>{it.swapBadge}</span>
                      )}
                      {it.pantryId && (
                        <span style={{
                          fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
                          padding: '3px 8px', borderRadius: 12,
                          background: it.g ? '#E4EDDD' : 'var(--surface-2)',
                          color: it.g ? 'var(--leaf)' : 'var(--earth)',
                        }}>{it.pantryTag}</span>
                      )}
                    </span>
                  </span>
                  <span style={{
                    flex: 'none', fontSize: 'calc(12.5px * var(--scale))',
                    fontWeight: 800, color: 'var(--ink-meta)',
                  }}>{it.price}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </Gutter>
    </Screen>
  );
}

/* ===================== planGrocery (aisle-grouped, checked against pantry) ===================== */

export function PlanGroceryScreen() {
  const { state, set, goBack } = useStore();
  const pg = planGroceryView(state);

  return (
    <Screen>
      <DarkHeader eyebrow="Nourish · from the plan" title="Plan grocery list" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Everything this week&rsquo;s plan needs, grouped by aisle and checked against what is
          already in your pantry.
        </p>
        <div style={{
          marginTop: 12, fontSize: 'calc(11px * var(--scale))', fontWeight: 800,
          letterSpacing: 1, textTransform: 'uppercase', color: 'var(--ochre-light)',
        }}>{pg.need} to buy · {pg.have} already in the pantry</div>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        {pg.swappedCount > 0 && (
          <Band tone="safety" title="Swapped for your profile" style={{ marginBottom: 14 }}>
            {pg.swappedCount === 1 ? 'One staple was' : pg.swappedCount + ' staples were'} replaced
            because of your restrictions. They are listed in their own aisle below so you can see
            exactly what changed.
          </Band>
        )}

        {pg.aisles.map((a: any) => (
          <div key={a.aisle}>
            <SectionTitle note={a.items.length + ' items'}>{a.aisle}</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {a.items.map((it: any) => (
                <button
                  key={it.id}
                  type="button"
                  role="checkbox"
                  aria-checked={it.done}
                  aria-disabled={!!it.have}
                  onClick={() => {
                    if (!it.have) set((s) => ({ planGot: { ...s.planGot, [it.id]: !it.checked } }));
                  }}
                  style={{
                    display: 'flex', width: '100%', gap: 11, alignItems: 'flex-start', textAlign: 'left',
                    background: 'var(--card)', border: '1px solid var(--border)',
                    borderRadius: 'var(--r-tile)', padding: '12px 13px',
                    cursor: it.have ? 'default' : 'pointer', minHeight: 44,
                  }}
                >
                  <span style={{ paddingTop: 1 }}><CheckBox on={it.checked} dim={it.have} /></span>
                  <span style={{ flex: 1 }}>
                    <span style={{
                      display: 'block', fontSize: 'calc(13.5px * var(--scale))', fontWeight: 600,
                      color: it.done ? 'var(--ink-meta)' : 'var(--ink)',
                      textDecoration: it.done ? 'line-through' : 'none',
                    }}>{it.name} <span style={{ fontWeight: 500 }}>· {it.qty}</span></span>
                    <span style={{
                      display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                      color: 'var(--ink-meta)', marginTop: 3,
                    }}>{it.meals}</span>
                  </span>
                  {it.tag && (
                    <span style={{
                      flex: 'none', fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
                      padding: '3px 8px', borderRadius: 12, whiteSpace: 'nowrap',
                      background: 'var(--surface-2)', color: 'var(--ink-meta)',
                    }}>{it.tag}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </Gutter>
    </Screen>
  );
}

/* ===================== barcode ===================== */

export function BarcodeScreen() {
  const { state, set, goBack, restockPantry, toast } = useStore();

  const add = () => {
    restockPantry('sunbutter', true);
    set({ route: 'pantry', bcFound: false, councilOpen: false });
    toast(restockMessage('Sunflower-seed butter', (pantryUnits as any).sunbutter || 0), 'Pantry', 'pantry');
  };

  return (
    <Screen>
      <DarkHeader eyebrow="Nourish · pantry" title="Scan a barcode" back={goBack} />
      <Gutter style={{ paddingTop: 18 }}>
        <div aria-hidden="true" style={{
          height: 200, borderRadius: 'var(--r-card)', background: 'var(--forest-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid var(--border-2)',
        }}>
          <svg width="140" height="70" viewBox="0 0 24 24" fill="none" stroke="#F4EDDF" strokeWidth="2">
            <path d="M4 7v10M8 7v10M12 7v10M16 7v10M20 7v10" />
          </svg>
        </div>

        {!state.bcFound ? (
          <div style={{ marginTop: 14 }}>
            <PrimaryButton onClick={() => set({ bcFound: true })}>Scan</PrimaryButton>
          </div>
        ) : (
          <>
            <div style={{
              marginTop: 14, background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-card)', padding: 16,
            }}>
              <div style={{
                fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 1.2,
                textTransform: 'uppercase', color: 'var(--leaf)',
              }}>Match found</div>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
                fontWeight: 600, color: 'var(--ink)', marginTop: 3,
              }}>Sunflower-seed butter</div>
              <div style={{
                fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-meta)',
                fontWeight: 600, marginTop: 3,
              }}>1 jar · nut-free fat</div>
            </div>
            <div style={{ marginTop: 12 }}>
              <PrimaryButton onClick={add}>Add to pantry</PrimaryButton>
            </div>
          </>
        )}

        <Band tone="cream" title="What a barcode can and cannot tell you" style={{ marginTop: 16 }}>
          A barcode identifies a product, not what is in your bowl. Portion, preparation and
          anything added in the pan still come from you.
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== voice ===================== */

const VOICE_ITEMS = [
  { name: 'Black-eyed peas', qty: '2 lb', cat: 'Proteins & legumes', id: 'bep' },
  { name: 'Okra', qty: '1 lb', cat: 'Greens & fresh', id: 'okra' },
  { name: 'Sea moss gel', qty: '1 jar', cat: 'Minerals', id: 'seamoss' },
];

export function VoiceScreen() {
  const { state, set, goBack, restockPantry, toast } = useStore();

  const commit = () => {
    VOICE_ITEMS.forEach((i) => restockPantry(i.id, true));
    set({ route: 'pantry', voiceHeard: false, councilOpen: false });
    toast('3 items added by voice — black-eyed peas, okra and sea moss gel', 'Pantry', 'pantry');
  };

  return (
    <Screen>
      <DarkHeader eyebrow="Nourish · pantry" title="Add by voice" back={goBack} />
      <Gutter style={{ paddingTop: 18 }}>
        <div style={{
          position: 'relative', height: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* The listening pulse. Reduced motion stops it; the label still says the state. */}
          {!state.voiceHeard && (
            <span aria-hidden="true" style={{
              position: 'absolute', width: 88, height: 88, borderRadius: '50%',
              background: 'var(--ochre)', animation: 'rs-ripple 1.8s ease-out infinite',
            }} />
          )}
          <button
            type="button"
            onClick={() => set({ voiceHeard: true })}
            aria-label={state.voiceHeard ? 'Heard — review the items below' : 'Listening. Tap to capture.'}
            style={{
              position: 'relative', width: 88, height: 88, borderRadius: '50%', border: 'none',
              cursor: 'pointer', background: 'var(--ochre)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 10px 30px -8px rgba(199,154,69,0.6)',
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1E3A2B" strokeWidth="2">
              <rect x="9" y="3" width="6" height="12" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
            </svg>
          </button>
        </div>

        <div role="status" style={{
          textAlign: 'center', fontSize: 'calc(12.5px * var(--scale))',
          fontWeight: 700, color: 'var(--ink-meta)',
        }}>
          {state.voiceHeard ? 'Heard — check this before it is added' : 'Listening…'}
        </div>

        {state.voiceHeard && (
          <>
            <Band tone="cream" title="What we heard" style={{ marginTop: 16 }}>
              &ldquo;Add two pounds of black-eyed peas, a pound of okra and a jar of sea moss gel.&rdquo;
            </Band>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              {VOICE_ITEMS.map((i) => (
                <div key={i.name} style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-tile)', padding: '12px 13px',
                }}>
                  <div style={{
                    fontSize: 'calc(13.5px * var(--scale))', fontWeight: 600, color: 'var(--ink)',
                  }}>{i.name} <span style={{ fontWeight: 500 }}>· {i.qty}</span></div>
                  <div style={{
                    fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)', marginTop: 3,
                  }}>{i.cat}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 14 }}>
              <PrimaryButton onClick={commit}>Add all three to the pantry</PrimaryButton>
            </div>
          </>
        )}
      </Gutter>
    </Screen>
  );
}
