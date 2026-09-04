import { textColour } from '../data/paletteTokens';
import { plateImage, ILLUSTRATION_NOTE, hubImage, HUB_NOTE, subImage, SCAN_NOTE } from '../data/media';
import { recipeDepth } from '../data/recipeDepth';
import { useStore } from '../state/store';
import { platePools, detectedRows, scanReport } from '../state/selectors';
import {
  recipeModes, hiddenList, plateRecipes, plateDefs,
} from '../data/content';
import { DarkHeader, stripes, shade, PhotoHeader } from '../components/Headers';
import {
  Screen, Gutter, Band, Chip, BackButton, PrimaryButton, SecondaryButton,
} from '../components/ui';

/* ===================== nourish — the hub ===================== */

export function NourishScreen() {
  const { state, go } = useStore();
  const pools = platePools(state);

  return (
    <Screen>
      <DarkHeader eyebrow="Nourish" title="The Complete Rooted Plate">
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Feed a body that can carry, create and serve — not a number to shrink.
        </p>
      </DarkHeader>
      {/*
        Hub image only. The sub-screens under this tab show the user's own
        record, and a stock photograph there would compete with their data -
        on the scan flow it could even be mistaken for their own meal photo.
      */}
      <img
        src={hubImage('nourish')}
        alt={'A shared plate at the table, illustration'}
        loading="lazy"
        decoding="async"
        style={{
          display: 'block', width: '100%', height: 172,
          objectFit: 'cover', background: 'var(--surface-2)',
        }}
      />
      <div style={{
        fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)',
        fontWeight: 700, padding: '6px 18px 0',
      }}>{HUB_NOTE}</div>

      <Gutter style={{ paddingTop: 18 }}>
        {/* Scan my plate CTA */}
        <button
          type="button"
          onClick={() => go('scan')}
          style={{
            width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer',
            background: 'linear-gradient(150deg, var(--forest), var(--forest-2))',
            color: 'var(--on-dark)', borderRadius: 'var(--r-card)', padding: '18px 16px',
          }}
        >
          <div style={{
            fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 1.6,
            textTransform: 'uppercase', color: 'var(--ochre-light)',
          }}>Scan my plate</div>
          <div style={{
            fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))',
            fontWeight: 600, marginTop: 4,
          }}>Photograph a meal →</div>
          <p className="rs-prose" style={{
            fontSize: 'calc(12.5px * var(--scale))', lineHeight: 1.5,
            color: 'var(--on-dark-muted)', margin: '6px 0 0',
          }}>
            The report adds up what is actually on the plate — drop a food or swap it and the
            numbers move with you.
          </p>
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 9, marginTop: 12 }}>
          {[
            { to: 'recipe', title: 'Recipe generator', sub: pools.fitCountLabel },
            { to: 'mealPlan', title: 'Meal plan', sub: '7 days' },
            { to: 'pantry', title: 'Pantry', sub: 'Logged plates draw stock down' },
            { to: 'grocery', title: 'Grocery list', sub: 'Checked against your pantry' },
            { to: 'smoothies', title: 'Smoothies', sub: 'Build & log a blend' },
            { to: 'restaurant', title: 'Eating out', sub: 'Order against the Rooted Plate' },
            { to: 'pairings', title: 'Uptake & pairings', sub: 'What the plate lets you absorb' },
            { to: 'budget', title: 'Grocery budget', sub: 'This week, by category' },
            { to: 'family', title: 'The whole table', sub: 'One pot, different needs' },
          ].map((c) => (
            <button
              key={c.to}
              type="button"
              onClick={() => go(c.to as any)}
              style={{
                textAlign: 'left', background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-tile)', padding: '14px 14px', cursor: 'pointer',
                boxShadow: 'var(--shadow-card-light)', minHeight: 44,
              }}
            >
              <div style={{
                fontWeight: 700, fontSize: 'calc(14px * var(--scale))', color: 'var(--ink)',
              }}>{c.title}</div>
              <div style={{
                fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
                marginTop: 3, lineHeight: 1.4,
              }}>{c.sub}</div>
            </button>
          ))}
        </div>

        {/* Honest allergen accounting, on the hub as well as in the generator */}
        {pools.out.length > 0 && (
          <Band tone="safety" title={pools.outCountLabel} style={{ marginTop: 14 }}>
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              {pools.outReasons.map((p) => (
                <li key={p.name} style={{ marginBottom: 4, lineHeight: 1.5 }}>
                  {p.name} — {p.reason}
                </li>
              ))}
            </ul>
          </Band>
        )}
      </Gutter>
    </Screen>
  );
}

/* ===================== scan ===================== */

export function ScanScreen() {
  const { goBack, set } = useStore();
  const start = (fromUpload: boolean) =>
    set({ scanFromUpload: fromUpload, route: 'detected', councilOpen: false });

  return (
    <Screen>
      <DarkHeader eyebrow="Nourish · scan" title="Photograph a meal" back={goBack} />
      {/*
        Deliberately not a plated dish. This flow photographs the user's own
        meal and reports on it, so a finished plate here could be read as their
        scan result. The note says "not your photo" for the same reason.
      */}
      <img
        src={subImage('scan')}
        alt={'Photographing a meal, illustration'}
        loading="lazy"
        decoding="async"
        style={{
          display: 'block', width: '100%', height: 152,
          objectFit: 'cover', background: 'var(--surface-2)',
        }}
      />
      <div style={{
        fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)',
        fontWeight: 700, padding: '6px 18px 0',
      }}>{SCAN_NOTE}</div>
      <Gutter style={{ paddingTop: 18 }}>
        {/* No imagery in this app by design — the viewfinder is CSS texture. */}
        <div aria-hidden="true" style={{
          height: 220, borderRadius: 'var(--r-card)', background: stripes('#2B2A22', '#232219', 14),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid var(--border-2)',
        }}>
          <div style={{
            width: 120, height: 120, borderRadius: '50%',
            border: '2px dashed rgba(244,237,223,0.4)',
          }} />
        </div>

        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 9 }}>
          <PrimaryButton onClick={() => start(false)}>Capture</PrimaryButton>
          <SecondaryButton onClick={() => start(true)}>Upload a photo instead</SecondaryButton>
        </div>

        <Band tone="cream" title="What happens to this photo" style={{ marginTop: 16 }}>
          Photo analysis is a separate, optional grant — private, and with no beauty scores, ever.
          You can revoke it at any time from your consent settings.
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== detected ===================== */

export function DetectedScreen() {
  const { state, set, go, goBack } = useStore();
  const rows = detectedRows(state);
  const keptCount = rows.filter((r) => r.kept).length;

  return (
    <Screen>
      <DarkHeader
        eyebrow={state.scanFromUpload ? 'From your uploaded photo' : 'From the camera'}
        title="What we think we see"
        back={goBack}
      >
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Correct anything that is wrong. Nothing is counted until you say it belongs on the plate.
        </p>
      </DarkHeader>
      {/*
        Deliberately not a plated dish. This flow photographs the user's own
        meal and reports on it, so a finished plate here could be read as their
        scan result. The note says "not your photo" for the same reason.
      */}
      <img
        src={subImage('detected')}
        alt={'Sorting components to identify them, illustration'}
        loading="lazy"
        decoding="async"
        style={{
          display: 'block', width: '100%', height: 152,
          objectFit: 'cover', background: 'var(--surface-2)',
        }}
      />
      <div style={{
        fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)',
        fontWeight: 700, padding: '6px 18px 0',
      }}>{SCAN_NOTE}</div>

      <Gutter style={{ paddingTop: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {rows.map((f) => (
            <div key={f.key} style={{
              background: f.kept ? 'var(--card)' : 'var(--surface-2)',
              opacity: f.kept ? 1 : 0.62,
              border: '1px solid var(--border)', borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-serif)', fontSize: 'calc(17px * var(--scale))',
                    fontWeight: 600, color: 'var(--ink)',
                  }}>{f.name}</div>
                  <div style={{
                    fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
                    fontWeight: 600, marginTop: 2,
                  }}>{f.portion} · {f.pct}% confident</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                <Chip
                  selected={f.kept}
                  color="var(--leaf-mid)"
                  onClick={() => set((s) => ({ scanDrop: { ...s.scanDrop, [f.key]: !s.scanDrop[f.key] } }))}
                >{f.keepLabel}</Chip>
                <Chip
                  selected={f.swapped}
                  onClick={() => set((s) => ({ scanAlt: { ...s.scanAlt, [f.key]: !s.scanAlt[f.key] } }))}
                >{f.swapLabel}</Chip>
              </div>
            </div>
          ))}
        </div>

        <div role="status" style={{
          marginTop: 12, fontSize: 'calc(12px * var(--scale))',
          fontWeight: 700, color: 'var(--ink-meta)',
        }}>
          {keptCount} of {rows.length} kept on the plate
        </div>

        <div style={{ marginTop: 14 }}>
          <PrimaryButton onClick={() => go('hidden')}>Continue</PrimaryButton>
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== hidden ingredients ===================== */

export function HiddenScreen() {
  const { state, set, go, goBack } = useStore();
  const on = (k: string) => !!state.hidden?.[k];

  return (
    <Screen>
      <DarkHeader eyebrow="Nourish · scan" title="What else went in?" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          A photo cannot see oil, broth or salt. Whatever you add here is added to the totals too.
        </p>
      </DarkHeader>
      {/*
        Deliberately not a plated dish. This flow photographs the user's own
        meal and reports on it, so a finished plate here could be read as their
        scan result. The note says "not your photo" for the same reason.
      */}
      <img
        src={subImage('hidden')}
        alt={'Oil and seasoning going into the pan, illustration'}
        loading="lazy"
        decoding="async"
        style={{
          display: 'block', width: '100%', height: 152,
          objectFit: 'cover', background: 'var(--surface-2)',
        }}
      />
      <div style={{
        fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)',
        fontWeight: 700, padding: '6px 18px 0',
      }}>{SCAN_NOTE}</div>

      <Gutter style={{ paddingTop: 18 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
          {(hiddenList as any[]).map((h) => (
            <Chip
              key={h.key}
              selected={on(h.key)}
              onClick={() => set((s) => ({ hidden: { ...s.hidden, [h.key]: !s.hidden?.[h.key] } }))}
            >{h.name} · {h.amt}</Chip>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <PrimaryButton onClick={() => go('report')}>Calculate the plate</PrimaryButton>
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== report ===================== */

export function ReportScreen() {
  const { state, goBack, pushLog, proteinTarget } = useStore();
  const rep = scanReport(state);
  const target = proteinTarget();

  return (
    <Screen>
      <DarkHeader eyebrow="Nourish · scan" title="What this plate carries" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Totalled from the {rep.parts.length} component{rep.parts.length === 1 ? '' : 's'} you kept.
        </p>
      </DarkHeader>
      {/*
        Deliberately not a plated dish. This flow photographs the user's own
        meal and reports on it, so a finished plate here could be read as their
        scan result. The note says "not your photo" for the same reason.
      */}
      <img
        src={subImage('report')}
        alt={'A kitchen mid-cook, illustration'}
        loading="lazy"
        decoding="async"
        style={{
          display: 'block', width: '100%', height: 152,
          objectFit: 'cover', background: 'var(--surface-2)',
        }}
      />
      <div style={{
        fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)',
        fontWeight: 700, padding: '6px 18px 0',
      }}>{SCAN_NOTE}</div>

      <Gutter style={{ paddingTop: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 9 }}>
          {rep.macros.map((m) => (
            <div key={m.label} style={{
              background: 'var(--surface-1)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '11px 12px',
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: 'calc(18px * var(--scale))',
                fontWeight: 600, color: 'var(--ink)', lineHeight: 1.15,
              }}>{m.value}<span style={{ fontSize: 'calc(11px * var(--scale))', marginLeft: 2 }}>{m.unit}</span></div>
              <div style={{
                fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)', marginTop: 2,
              }}>{m.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '20px 0 10px',
        }}>Micronutrients</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {rep.micros.map((n) => (
            <div key={n.key}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                <span style={{
                  fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
                }}>{n.label}</span>
                {/* the note carries the meaning; the bar colour only reinforces it */}
                <span style={{
                  fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700, color: textColour(n.col),
                }}>{n.pct}% · {n.note}</span>
              </div>
              <div style={{
                height: 8, borderRadius: 6, background: 'var(--surface-2)', overflow: 'hidden',
              }}>
                <div style={{ height: '100%', width: n.barW, background: n.col, borderRadius: 6 }} />
              </div>
            </div>
          ))}
        </div>

        <Band tone="cream" title="What this plate supports" style={{ marginTop: 18 }}>{rep.supports}</Band>
        <Band tone="safety" title="Where it falls short" style={{ marginTop: 10 }}>{rep.gaps}</Band>
        <Band tone="forest" title="What would close the gap" style={{ marginTop: 10 }}>{rep.fixes}</Band>

        <div style={{ marginTop: 16 }}>
          <PrimaryButton
            onClick={() => pushLog({
              kind: 'plate',
              name: 'Scanned plate · ' + rep.parts.length + ' components',
              p: rep.protein,
              kcal: Number(rep.macros[0].value),
              meta: rep.macros[1].value + 'g protein · ' + rep.macros[0].value + ' kcal',
              toast: 'Plate logged — ' + rep.macros[1].value + 'g protein of your ' + target + 'g target',
            })}
          >Log this plate</PrimaryButton>
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== recipe generator ===================== */

export function RecipeScreen() {
  const { state, set, go, goBack } = useStore();
  const pools = platePools(state);

  /*
    The generator cycles genIdx through every match so a result is never
    repeated until the whole set has been shown.
  */
  const generate = () => {
    if (state.recipeMode === 'bloodsugar') { go('sugarMeal'); return; }
    const i = state.genIdx % Math.max(pools.fit.length, 1);
    const pick = pools.fit[i] || pools.fit[0];
    set((s) => ({
      genIdx: s.genIdx + 1,
      plateId: pick?.id || 'jollof',
      plateRelaxed: false,
      route: 'recipeDetail',
      councilOpen: false,
    }));
  };

  return (
    <Screen>
      <DarkHeader eyebrow="Nourish · generator" title="What are you cooking for?" back={goBack} />
      <img
        src={subImage('generator')}
        alt={'Deciding what to cook, illustration'}
        loading="lazy"
        decoding="async"
        style={{
          display: 'block', width: '100%', height: 152,
          objectFit: 'cover', background: 'var(--surface-2)',
        }}
      />
      <div style={{
        fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)',
        fontWeight: 700, padding: '6px 18px 0',
      }}>{HUB_NOTE}</div>

      <Gutter style={{ paddingTop: 18 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(recipeModes as any[]).map((m) => (
            <Chip
              key={m.id}
              selected={state.recipeMode === m.id}
              onClick={() => set({ recipeMode: m.id, genIdx: 0 })}
            >{m.label}</Chip>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{
            fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))',
            fontWeight: 600, color: 'var(--ink)',
          }}>{pools.fitCountLabel}</div>
          <div style={{
            fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-meta)', marginTop: 3,
          }}>{pools.fitSubLabel}</div>
        </div>

        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 9 }}>
          {pools.fit.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => set({ plateId: p.id, plateRelaxed: false, route: 'recipeDetail', councilOpen: false })}
              style={{
                width: '100%', textAlign: 'left', border: '1px solid var(--border)',
                background: 'var(--card)', borderRadius: 'var(--r-tile)', padding: 0,
                cursor: 'pointer', display: 'flex', overflow: 'hidden',
              }}
            >
              <div aria-hidden="true" style={{ width: 11, flex: 'none', background: p.c }} />
              <div style={{ flex: 1, minWidth: 0, padding: '13px 14px' }}>
                <div style={{
                  fontFamily: 'var(--font-serif)', fontSize: 'calc(16.5px * var(--scale))',
                  fontWeight: 600, color: 'var(--ink)', lineHeight: 1.25,
                }}>{p.name}</div>
                <div style={{
                  fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
                  fontWeight: 600, marginTop: 4,
                }}>
                  {p.p} protein · {p.time} · {p.cost}
                  {pools.tradIds.length > 0 && ' · ' + (p.tradFit ? p.tradLabel : 'Beyond your traditions')}
                </div>
              </div>
            </button>
          ))}
        </div>

        {pools.fit.length === 0 && (
          <Band tone="safety" title="Nothing fits both filters right now" style={{ marginTop: 12 }}>
            No plate matches this purpose without clashing with your restrictions. Change the
            purpose above, or revisit your food profile — nothing has been hidden from you.
          </Band>
        )}

        {pools.out.length > 0 && (
          <Band tone="safety" title={pools.outCountLabel} style={{ marginTop: 12 }}>
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              {pools.outReasons.map((p) => (
                <li key={p.name} style={{ marginBottom: 4, lineHeight: 1.5 }}>
                  {p.name} — {p.reason}
                </li>
              ))}
            </ul>
          </Band>
        )}

        <div style={{ marginTop: 16 }}>
          <PrimaryButton onClick={generate}>Generate a plate</PrimaryButton>
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== recipeDetail ===================== */

export function RecipeDetailScreen() {
  const { state, goBack, pushLog } = useStore();
  const def = (plateDefs as any[]).find((p) => p.id === state.plateId) ?? (plateDefs as any[])[0];
  const r = (plateRecipes as any)[state.plateId] ?? (plateRecipes as any)[def.id];
  const depth = recipeDepth[state.plateId] ?? recipeDepth[def.id];

  if (!r) {
    return (
      <Screen>
        <DarkHeader eyebrow="Nourish" title={def.name} back={goBack} />
        <Gutter style={{ paddingTop: 18 }}>
          <Band tone="safety" title="This recipe has not been written yet">
            The plate exists in the plan data but its full method is not in the ported content set.
            Rather than invent one, this screen says so.
          </Band>
        </Gutter>
      </Screen>
    );
  }

  return (
    <Screen>
      {/*
        The striped gradient is kept as PhotoHeader's fallback, so a missing or
        still-loading file leaves the header looking exactly as it did before
        these images existed.
      */}
      <PhotoHeader
        src={plateImage(def.id)}
        alt={def.name}
        note={ILLUSTRATION_NOTE}
        c1={def.c}
        c2={shade(def.c, 0.14)}
        back={goBack}
      />

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{
          fontSize: 'calc(10.5px * var(--scale))', letterSpacing: 1.5, textTransform: 'uppercase',
          color: 'var(--clay)', fontWeight: 800,
        }}>{r.eyebrow}</div>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(24px * var(--scale))', fontWeight: 600,
          lineHeight: 1.15, color: 'var(--ink)', margin: '4px 0 0',
        }}>{def.name}</h1>

        <div style={{
          display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 10,
          fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700, color: 'var(--ink-meta)',
        }}>
          <span>{r.kcal} kcal</span><span>{def.p} protein</span>
          <span>{r.iron} iron</span><span>{r.fiber} fiber</span><span>{r.serves}</span>
        </div>

        {/* The plate's five components */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 16 }}>
          {Object.entries(r.grid).map(([k, v]) => (
            <div key={k} style={{
              display: 'flex', gap: 10, background: 'var(--surface-1)',
              border: '1px solid var(--border)', borderRadius: 12, padding: '9px 12px',
            }}>
              <span style={{
                width: 66, flex: 'none', fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800,
                letterSpacing: 0.6, textTransform: 'uppercase', color: 'var(--ink-meta)',
                alignSelf: 'center',
              }}>{k}</span>
              <span style={{
                fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-body)', alignSelf: 'center',
              }}>{v as string}</span>
            </div>
          ))}
        </div>

        <Band tone="cream" title="Ingredients" style={{ marginTop: 16 }}>{r.ing}</Band>

        {/*
          Added depth, from data/recipeDepth.ts. Nothing in content.ts was
          edited to make room for it - README rule 3 keeps that copy verbatim,
          so this is new data in a new file rendered alongside.
        */}
        {depth && (
          <Band tone="cream" title="Before you start" style={{ marginTop: 16 }}>
            {depth.ahead}
          </Band>
        )}

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '20px 0 10px',
        }}>Method</h2>
        <ol style={{ margin: 0, paddingLeft: 18 }}>
          {r.steps.map((s: string, i: number) => (
            <li key={i} className="rs-prose" style={{
              fontSize: 'calc(13px * var(--scale))', lineHeight: 1.6,
              color: 'var(--ink-muted)', marginBottom: 8,
            }}>{s}</li>
          ))}
        </ol>

        {depth && (
          <>
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))',
              fontWeight: 600, color: 'var(--ink)', margin: '20px 0 10px',
            }}>How you know it is right</h2>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {depth.cues.map((c: string) => (
                <li key={c} className="rs-prose" style={{
                  fontSize: 'calc(13px * var(--scale))', lineHeight: 1.6,
                  color: 'var(--ink-muted)', marginBottom: 8,
                }}>{c}</li>
              ))}
            </ul>

            <Band tone="cream" title="Keeping it" style={{ marginTop: 16 }}>
              {depth.keeps}
            </Band>
          </>
        )}

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '20px 0 10px',
        }}>Swaps</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {r.swaps.map((s: any) => (
            <div key={s.t} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '11px 12px',
            }}>
              <div style={{
                fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
              }}>{s.t}</div>
              <div style={{
                fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-muted)', marginTop: 2,
              }}>{s.why}</div>
            </div>
          ))}
        </div>

        {/*
          Attribution is content, not a footnote. This line is what keeps the app
          from relabelling a dish to suit the diet it is being served into.
        */}
        <Band tone="labour" title="What this dish actually is" style={{ marginTop: 18 }}>
          {r.attrib}
        </Band>

        <div style={{ marginTop: 16 }}>
          <PrimaryButton
            onClick={() => pushLog({
              kind: 'plate', name: def.name, plateId: def.id,
              p: parseFloat(def.p), kcal: Number(r.kcal),
              meta: def.p + ' protein · ' + r.kcal + ' kcal',
              toast: def.name.split(/[—:,]/)[0].trim() + ' logged',
            })}
          >Log this plate</PrimaryButton>
        </div>
      </Gutter>
    </Screen>
  );
}
