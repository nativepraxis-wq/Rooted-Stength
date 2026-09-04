import { restaurantImage, mealImage, PLACE_NOTE, ILLUSTRATION_NOTE } from '../data/media';
import { useStore } from '../state/store';
import { orderView } from '../state/kitchen';
import { restaurants, places } from '../data/content';
import { DarkHeader, stripes, PhotoHeader } from '../components/Headers';
import { TierBadge } from '../components/TierBadge';
import {
  Screen, Gutter, Band, BackButton, PrimaryButton,
} from '../components/ui';

/* ===================== restaurant ===================== */

export function RestaurantScreen() {
  const { state, set, go, goBack } = useStore();
  const list = Object.keys(restaurants as any).map((id) => ({ id, ...(restaurants as any)[id] }));

  return (
    <Screen>
      <DarkHeader eyebrow="Explore · eating out" title="Places to eat" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Ownership is self-identified, not verified by us. Where we do not know, we say so rather
          than guess.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {list.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => { set({ restId: r.id }); go('order'); }}
              style={{
                width: '100%', textAlign: 'left', border: '1px solid var(--border)',
                background: 'var(--card)', borderRadius: 'var(--r-card)', padding: 0,
                overflow: 'hidden', cursor: 'pointer', boxShadow: 'var(--shadow-card-light)',
              }}
            >
              <div aria-hidden="true" style={{ height: 56, background: stripes(r.c1, r.c2, 14) }} />
              <div style={{ padding: '13px 15px' }}>
                <div style={{
                  fontFamily: 'var(--font-serif)', fontSize: 'calc(18px * var(--scale))',
                  fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2,
                }}>{r.name}</div>
                <div style={{
                  fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
                  fontWeight: 600, marginTop: 3,
                }}>{r.sub}</div>
                <div style={{
                  fontSize: 'calc(11.5px * var(--scale))', color: 'var(--earth)',
                  fontWeight: 800, marginTop: 5,
                }}>★ {r.rating} · {r.reviews} reviews</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                  {r.chips.map((c: any) => (
                    <span key={c.t} style={{
                      fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
                      padding: '3px 8px', borderRadius: 12, background: c.bg, color: c.fg,
                    }}>{c.t}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 9px',
        }}>Also nearby</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(places as any[]).map((p) => (
            <div key={p.name} style={{
              display: 'flex', gap: 11, alignItems: 'flex-start',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '11px 13px',
            }}>
              <span aria-hidden="true" style={{
                width: 10, height: 10, borderRadius: '50%', flex: 'none',
                background: p.c, marginTop: 5,
              }} />
              <span style={{ flex: 1 }}>
                <span style={{
                  display: 'block', fontSize: 'calc(13.5px * var(--scale))',
                  fontWeight: 600, color: 'var(--ink)',
                }}>{p.name}</span>
                <span style={{
                  display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                  color: 'var(--ink-meta)', marginTop: 2,
                }}>{p.type} · {p.dist}</span>
              </span>
            </div>
          ))}
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== order ===================== */

export function OrderScreen() {
  const { state, set, goBack, pushLog } = useStore();
  const ov = orderView(state);

  return (
    <Screen>
      {/*
        The striped gradient stays as PhotoHeader's fallback, so a missing or
        still-loading file leaves this looking as it did before.
      */}
      <PhotoHeader
        src={restaurantImage(state.restId)}
        alt={""}
        note={PLACE_NOTE}
        c1={ov.rst.c1}
        c2={ov.rst.c2}
        back={goBack}
      />

      <Gutter style={{ paddingTop: 16 }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(24px * var(--scale))', fontWeight: 600,
          lineHeight: 1.15, color: 'var(--ink)', margin: 0,
        }}>{ov.rst.name}</h1>
        <div style={{
          fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-meta)',
          fontWeight: 600, marginTop: 4,
        }}>{ov.rst.sub}</div>

        <div role="status" style={{
          fontSize: 'calc(12px * var(--scale))', fontWeight: 700,
          color: 'var(--ink-meta)', marginTop: 12,
        }}>{ov.fitLine}</div>

        {/* What to ask the kitchen — profile-aware, and never a guarantee */}
        <Band tone="safety" title="Ask before you order" style={{ marginTop: 12 }}>
          {ov.rst.ask}
        </Band>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '20px 0 10px',
        }}>Menu</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {ov.items.map((m: any) => (
            <div key={m.id} style={{
              display: 'flex', gap: 11, alignItems: 'flex-start',
              background: m.clash ? 'var(--safety-bg)' : (m.sel ? '#EAF0E3' : 'var(--card)'),
              border: '1px solid ' + (m.clash ? 'var(--border-rose)' : (m.sel ? '#B9CFA9' : 'var(--border)')),
              borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                  <div style={{
                    fontSize: 'calc(14px * var(--scale))', fontWeight: 700,
                    color: m.clash ? 'var(--ink-muted)' : 'var(--ink)',
                  }}>{m.name}</div>
                  <div style={{
                    fontSize: 'calc(13px * var(--scale))', fontWeight: 800, color: 'var(--ink-meta)',
                  }}>{m.priceLabel}</div>
                </div>
                <div style={{
                  fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-muted)', marginTop: 3,
                }}>{m.desc}</div>
                <div style={{
                  fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
                  fontWeight: 700, marginTop: 4,
                }}>{m.statLabel}</div>
                {/*
                  Both of these were sitting in content.ts unrendered. The
                  tag wording is the source's own - see state/kitchen.ts.
                */}
                {m.tagLabel && (
                  <div style={{
                    fontSize: 'calc(11px * var(--scale))', color: 'var(--ink-meta)',
                    fontWeight: 700, marginTop: 4,
                  }}>{m.tagLabel}</div>
                )}
                {m.cautionLabel && (
                  <div style={{
                    fontSize: 'calc(11.5px * var(--scale))', color: 'var(--clay)',
                    fontWeight: 800, marginTop: 4, lineHeight: 1.4,
                  }}>{m.cautionLabel}</div>
                )}
                {m.clashLabel && (
                  <div style={{
                    fontSize: 'calc(11.5px * var(--scale))', color: 'var(--clay)',
                    fontWeight: 700, marginTop: 5, lineHeight: 1.4,
                  }}>{m.clashLabel}</div>
                )}
              </div>
              <button
                type="button"
                aria-label={(m.sel ? 'Remove ' : 'Add ') + m.name}
                aria-pressed={m.sel}
                onClick={() => set((s) => ({ order: { ...s.order, [m.id]: !m.sel } }))}
                className="rs-hit"
                style={{
                  flex: 'none', width: 34, height: 34, borderRadius: '50%', cursor: 'pointer',
                  border: '1px solid ' + (m.sel ? 'var(--leaf)' : 'var(--border-2)'),
                  background: m.sel ? 'var(--leaf)' : 'var(--card)',
                  color: m.sel ? '#FFFFFF' : 'var(--ink-meta)',
                  fontSize: 15, fontWeight: 800,
                }}
              >{m.sel ? '✓' : '+'}</button>
            </div>
          ))}
        </div>

        {/* The order, checked against the Complete Rooted Plate */}
        <div style={{
          marginTop: 18, background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-card)', padding: 15, boxShadow: 'var(--shadow-card)',
        }}>
          <div style={{
            fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 1.2,
            textTransform: 'uppercase', color: 'var(--ink-meta)',
          }}>Your order</div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 6 }}>
            <span style={{
              fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))',
              fontWeight: 600, color: 'var(--ink)',
            }}>{ov.cost}</span>
            <span style={{
              fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700,
              color: 'var(--ink-meta)', alignSelf: 'center',
            }}>{ov.kcal} kcal · {ov.prot}g protein</span>
          </div>
          <div style={{
            marginTop: 10, borderRadius: 12, padding: '10px 12px',
            background: ov.gapDone ? '#E4EDDD' : 'var(--surface-3)',
            color: ov.gapDone ? 'var(--leaf)' : 'var(--earth)',
            fontSize: 'calc(12px * var(--scale))', fontWeight: 700, lineHeight: 1.45,
          }}>{ov.gapText}</div>
        </div>

        {ov.warnText && (
          <Band tone="labour" title="Check this before you send it" style={{ marginTop: 12 }}>
            {ov.warnText}
          </Band>
        )}

        <div style={{ marginTop: 16 }}>
          <PrimaryButton
            onClick={() => pushLog({
              kind: 'plate',
              name: ov.rst.name + ' — takeout',
              p: ov.prot,
              kcal: ov.kcal,
              meta: ov.prot + 'g protein · ' + ov.kcal + ' kcal · eaten out',
              toast: 'Order logged — ' + ov.prot + 'g protein',
            })}
          >Log this order</PrimaryButton>
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== sugarMeal ===================== */

/*
  The blood-sugar-steady plate the recipe generator routes to. Copy is ported
  verbatim, including the clinician boundary — the app never implies it can
  adjust anyone's medication.
*/
export function SugarMealScreen() {
  const { set, go, goBack } = useStore();

  return (
    <Screen>
      {/*
        The striped gradient stays as PhotoHeader's fallback, so a missing or
        still-loading file leaves this looking as it did before.
      */}
      <PhotoHeader
        src={mealImage()}
        alt={'Butter-bean, collard and sorghum bowl, illustration'}
        note={ILLUSTRATION_NOTE}
        c1={'#3C5A42'}
        c2={'#2F4A31'}
        back={goBack}
      />

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{
          fontSize: 'calc(10.5px * var(--scale))', letterSpacing: 1.5, textTransform: 'uppercase',
          color: 'var(--leaf)', fontWeight: 800,
        }}>Blood-sugar steady · one pot</div>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(24px * var(--scale))', fontWeight: 600,
          lineHeight: 1.15, color: 'var(--ink)', margin: '4px 0 0',
        }}>Butter-Bean, Collard &amp; Sorghum Bowl</h1>
        <div style={{
          display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8,
          fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700, color: 'var(--ink-meta)',
        }}>
          <span>⏱ 30 min</span><span>· 4 servings</span><span>· low glycemic load</span>
        </div>

        {/* Response curve — this meal against refined carbs */}
        <div style={{
          marginTop: 16, background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-card)', padding: 15,
        }}>
          <div style={{
            fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
            marginBottom: 8,
          }}>How your blood sugar responds</div>
          <svg viewBox="0 0 320 90" width="100%" height="90" role="img"
            aria-label="This meal produces a low, steady glucose curve; refined carbs produce a higher, sharper spike.">
            <line x1="0" y1="70" x2="320" y2="70" stroke="var(--border-2)" strokeWidth="1" />
            <path d="M0,64 C60,64 70,20 110,20 C150,20 180,58 210,62 C250,66 280,64 320,64"
              fill="none" stroke="#C9A0A0" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M0,64 C70,64 90,50 130,50 C180,50 210,60 260,62 C290,63 300,63 320,63"
              fill="none" stroke="var(--leaf-mid)" strokeWidth="2.5" />
            <circle cx="130" cy="50" r="3.5" fill="var(--leaf-mid)" />
          </svg>
          <div style={{
            display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 4,
            fontSize: 'calc(11px * var(--scale))', fontWeight: 700,
          }}>
            <span style={{ color: 'var(--leaf)' }}>— This meal (steady)</span>
            <span style={{ color: 'var(--clay)' }}>-- Refined carbs (spike)</span>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 8, marginTop: 12,
        }}>
          {[
            { n: '17g', l: 'fiber' }, { n: '31g', l: 'protein' },
            { n: 'Low', l: 'glycemic load' }, { n: '520', l: 'kcal' },
          ].map((s) => (
            <div key={s.l} style={{
              background: 'var(--surface-1)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '10px 8px', textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: 'calc(16px * var(--scale))',
                fontWeight: 600, color: 'var(--ink)',
              }}>{s.n}</div>
              <div style={{
                fontSize: 'calc(10px * var(--scale))', color: 'var(--ink-meta)', marginTop: 2,
              }}>{s.l}</div>
            </div>
          ))}
        </div>

        <Band tone="cream" title="Why it stays steady" style={{ marginTop: 16 }}>
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            <li style={{ marginBottom: 6, lineHeight: 1.55 }}>
              Intact sorghum + bean fiber slows glucose release — no refined flour.
            </li>
            <li style={{ marginBottom: 6, lineHeight: 1.55 }}>
              Eat greens &amp; beans first, grain last — food order can cut the post-meal spike ~29–37%.
            </li>
            <li style={{ lineHeight: 1.55 }}>
              Magnesium, chromium &amp; potassium support insulin sensitivity.
            </li>
          </ul>
        </Band>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '20px 0 8px',
        }}>Ingredients</h2>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.6,
          color: 'var(--ink-muted)', margin: 0,
        }}>
          1 cup sorghum · 1½ cups butter beans · 3 cups collards · 1 onion · 2 tomatoes ·
          1 tbsp olive oil · garlic, ginger, cumin · squeeze of lime
        </p>
        <p className="rs-prose" style={{
          fontSize: 'calc(12.5px * var(--scale))', lineHeight: 1.55,
          color: 'var(--ink-muted)', marginTop: 10,
        }}>
          <b style={{ color: 'var(--ink)' }}>Swaps:</b> sorghum → fonio or barley · butter beans →
          black-eyed peas · add avocado for extra healthy fat.
        </p>

        <Band tone="safety" title="Managing diabetes?" style={{ marginTop: 16 }}>
          Whole-food eating can meaningfully improve glycemic control, but if you take insulin or
          glucose-lowering medication, changes can affect your dose. Coordinate with your
          clinician — the Council supports, it doesn&rsquo;t prescribe or adjust medication.
        </Band>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 14,
        }}>
          <TierBadge kind="ev" tierKey="emerging" />
          <button
            type="button"
            onClick={() => { set({ sourceFocus: 'Plant-Based Strategies for Type 2 Diabetes' }); go('sources'); }}
            style={{
              border: 'none', background: 'none', cursor: 'pointer', padding: 0,
              fontSize: 'calc(12px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
            }}
          >Source: Plant-Based Strategies for T2 Diabetes →</button>
        </div>
      </Gutter>
    </Screen>
  );
}
