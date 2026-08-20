import { useStore } from '../state/store';
import {
  teas, teaGoalDefs, teaRules, teaFlagWord, goalTeaMap, goalTeaLabel,
  nervineDefs, waterMedDefs, fermDefs, swapDefs, dbDefs, cerDefs,
  coconutDefs, honeyDefs, shroomRecipeDefs, mushrooms,
} from '../data/content';
import { DarkHeader } from '../components/Headers';
import { TierBadge } from '../components/TierBadge';
import { TabbedGuide, HerbCaution, type GuideGroup } from '../components/TabbedGuide';
import { Screen, Gutter, Band, Chip } from '../components/ui';

/* A row linking to a sub-surface. */
function LinkRow({ title, sub, onClick }: { title: string; sub: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex', width: '100%', gap: 12, alignItems: 'center', textAlign: 'left',
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-card)', padding: '14px 15px', cursor: 'pointer', minHeight: 44,
      }}
    >
      <span style={{ flex: 1 }}>
        <span style={{
          display: 'block', fontSize: 'calc(14px * var(--scale))',
          fontWeight: 700, color: 'var(--ink)',
        }}>{title}</span>
        <span style={{
          display: 'block', fontSize: 'calc(11.5px * var(--scale))',
          color: 'var(--ink-meta)', marginTop: 2, lineHeight: 1.4,
        }}>{sub}</span>
      </span>
      <span aria-hidden="true" style={{ fontSize: 17, color: 'var(--ink-meta)' }}>&#8250;</span>
    </button>
  );
}

function SourceLink({ label }: { label: string }) {
  const { go } = useStore();
  return (
    <button
      type="button"
      onClick={() => go('sources')}
      style={{
        border: 'none', background: 'none', cursor: 'pointer', padding: 0,
        fontSize: 'calc(12px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
      }}
    >{label}</button>
  );
}

/* ===================== apothecary ===================== */

export function ApothecaryScreen() {
  const { go, goBack } = useStore();

  return (
    <Screen>
      <DarkHeader eyebrow="Explore · liberation herbalism" title="Rooted Apothecary" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Every cup is a ceremony. These nervines and tonics — carried by maroon and diaspora
          healers — calm the stress response and speed recovery. Match the herb to how you feel.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <LinkRow
            title="Tea Intelligence"
            sub="Brew by goal — energy, calm, recovery, minerals"
            onClick={() => go('teaIntel')}
          />
          <LinkRow
            title="Nervines &amp; Adaptogens"
            sub="Calm, build, release — emotional regulation"
            onClick={() => go('nervines')}
          />
          <LinkRow
            title="Water as Medicine"
            sub="Daily rhythm, mineral waters and sacred water"
            onClick={() => go('waterMed')}
          />
          <LinkRow
            title="Fermentation"
            sub="Live cultures, greens, mushroom ferments and drinks"
            onClick={() => go('ferment')}
          />
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>The core teas</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {(teas as any[]).map((t) => (
            <div key={t.name} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start',
              }}>
                <span style={{ flex: 1 }}>
                  <span style={{
                    display: 'block', fontSize: 'calc(14px * var(--scale))',
                    fontWeight: 700, color: 'var(--ink)', lineHeight: 1.25,
                  }}>{t.name}</span>
                  <span style={{
                    display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                    fontWeight: 700, color: t.c, marginTop: 2,
                  }}>{t.supports}</span>
                </span>
                <TierBadge kind="ev" evLabel={t.ev} />
              </div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
                lineHeight: 1.5, margin: '6px 0 0',
              }}>{t.notes}</p>
              <div style={{
                fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
                fontWeight: 700, marginTop: 7,
              }}>Brew: {t.brew}</div>
              {/*
                The caution travels with the herb. Traditional use is knowledge,
                not a safety clearance — both go on the card.
              */}
              {t.caution && (
                <div style={{
                  fontSize: 'calc(11.5px * var(--scale))', color: 'var(--clay)',
                  fontWeight: 700, marginTop: 4, lineHeight: 1.4,
                }}>⚠ {t.caution}</div>
              )}
            </div>
          ))}
        </div>

        <HerbCaution />

        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 14,
        }}>
          <TierBadge kind="ev" tierKey="trad" />
          <SourceLink label="Sources: Herbal Tea &amp; Nervines →" />
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== teaIntel ===================== */

export function TeaIntelScreen() {
  const { state, set, go, goBack } = useStore();
  const groups = teaGoalDefs as any[];
  const sel = groups.find((g) => g.id === state.teaGoal) ?? groups[0];
  const onFlags = Object.keys(state.teaSafety).filter((k) => state.teaSafety[k]);

  /*
    Brews the safety profile touches are sorted last and labelled with the
    reason. Onboarding promises they are "flagged with the reason shown, never
    silently removed" — this is where that promise is kept.
  */
  const rows = sel.teas
    .map((t: any) => {
      const hits = (t.avoid || []).filter((a: string) => onFlags.includes(a));
      return {
        ...t,
        flagged: hits.length > 0,
        flagLabel: hits.length
          ? 'hold — ' + hits.map((a: string) => (teaFlagWord as any)[a]).join(' & ')
          : '',
      };
    })
    .sort((a: any, b: any) => (a.flagged ? 1 : 0) - (b.flagged ? 1 : 0));

  const flaggedCount = rows.filter((r: any) => r.flagged).length;
  const suggested = (goalTeaLabel as any)[state.obGoal] || 'Training recovery';

  return (
    <Screen>
      <DarkHeader eyebrow="Explore · tea intelligence" title="Which cup, when &amp; why" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Brewed by what the day asked of you — not by what looks good in a jar.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <button
          type="button"
          onClick={() => set({ teaGoal: (goalTeaMap as any)[state.obGoal] || 'recovery' })}
          style={{
            width: '100%', textAlign: 'left', cursor: 'pointer',
            background: 'var(--surface-1)', border: '1px solid var(--border)',
            borderRadius: 14, padding: '11px 13px', minHeight: 44,
            fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, color: 'var(--teal)',
          }}
        >For your goal, start with {suggested} →</button>

        <div className="rs-scroll" style={{
          display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginTop: 12,
        }}>
          {groups.map((g) => (
            <Chip
              key={g.id}
              selected={g.id === sel.id}
              color={g.c}
              onClick={() => set({ teaGoal: g.id })}
            >{g.name}</Chip>
          ))}
        </div>

        <div style={{
          marginTop: 14, background: sel.tintBg, borderRadius: 'var(--r-band)', padding: '15px 16px',
        }}>
          <div style={{
            fontSize: 'calc(11px * var(--scale))', letterSpacing: 1, textTransform: 'uppercase',
            fontWeight: 800, color: sel.c, marginBottom: 6,
          }}>The ritual</div>
          <p className="rs-prose" style={{
            fontSize: 'calc(12.5px * var(--scale))', color: '#4C463A',
            fontWeight: 600, lineHeight: 1.5, margin: 0,
          }}>{sel.ritual}</p>
        </div>

        <div role="status" style={{
          fontSize: 'calc(12px * var(--scale))', fontWeight: 700,
          color: flaggedCount ? 'var(--clay)' : 'var(--ink-meta)', marginTop: 12,
        }}>
          {onFlags.length === 0
            ? 'No safety filters on — every brew is shown'
            : flaggedCount + (flaggedCount === 1 ? ' brew flagged' : ' brews flagged')
              + ' in this group · shown last, never hidden'}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 12 }}>
          {rows.map((t: any) => (
            <div key={t.name} style={{
              background: t.flagged ? 'var(--safety-bg)' : 'var(--card)',
              border: '1px solid ' + (t.flagged ? 'var(--border-rose)' : 'var(--border)'),
              borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start',
              }}>
                <span style={{
                  fontSize: 'calc(14px * var(--scale))', fontWeight: 700,
                  color: t.flagged ? 'var(--ink-muted)' : 'var(--ink)', lineHeight: 1.25,
                }}>{t.name}</span>
                <TierBadge kind="ev" evLabel={t.ev} />
              </div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
                lineHeight: 1.5, margin: '6px 0 0',
              }}>{t.why}</p>
              <div style={{
                fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
                fontWeight: 700, marginTop: 6,
              }}>Brew: {t.brew}</div>
              {t.caution && (
                <div style={{
                  fontSize: 'calc(11.5px * var(--scale))', color: 'var(--clay)',
                  fontWeight: 700, marginTop: 4, lineHeight: 1.4,
                }}>⚠ {t.caution}</div>
              )}
              {t.flagged && (
                <div style={{
                  fontSize: 'calc(11.5px * var(--scale))', color: 'var(--clay)',
                  fontWeight: 800, marginTop: 5, lineHeight: 1.4,
                }}>{t.flagLabel}</div>
              )}
            </div>
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Rules that change the cup</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(teaRules as any[]).map((r) => (
            <div key={r.t} style={{
              background: 'var(--surface-cream)', border: '1px solid var(--border-cream)',
              borderRadius: 'var(--r-tile)', padding: '12px 13px',
            }}>
              <div style={{
                fontSize: 'calc(13px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
              }}>{r.t}</div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
                lineHeight: 1.5, margin: '4px 0 0',
              }}>{r.s}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => { set({ profileReturn: 'teaIntel' }); go('obHerb'); }}
          style={{
            border: 'none', background: 'none', cursor: 'pointer', padding: '14px 0 0',
            fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
            textAlign: 'left',
          }}
        >Update what the herbs should know →</button>

        <HerbCaution />
      </Gutter>
    </Screen>
  );
}

/* ===================== mushrooms ===================== */

export function MushroomsScreen() {
  const { go, goBack } = useStore();

  return (
    <Screen>
      <DarkHeader eyebrow="Explore · functional fungi" title="Mushroom mastery" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Meals, medicine and soil work from one kingdom — graded by what the evidence carries, not
          by what the label promises.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        {/*
          Content Rule 5: wild mushrooms carry an absolute warning. No photo ID,
          ever, under any circumstances — this band is not optional on this screen.
        */}
        <Band tone="safety" title="Never identify a wild mushroom from a photo">
          Not from this app, not from any app, not from a book alone. Misidentification is
          routinely fatal and there is no home test that makes it safe. Learn from a person, in
          person, with a local expert — everything below assumes cultivated or bought fungi.
        </Band>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 14 }}>
          {(mushrooms as any[]).map((m) => (
            <div key={m.name} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start',
              }}>
                <span style={{ flex: 1 }}>
                  <span style={{
                    display: 'block', fontSize: 'calc(14px * var(--scale))',
                    fontWeight: 700, color: 'var(--ink)',
                  }}>{m.name}</span>
                  <span style={{
                    display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                    fontWeight: 700, color: m.c, marginTop: 2,
                  }}>{m.role}</span>
                </span>
                <TierBadge kind="ev" evLabel={m.ev} />
              </div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
                lineHeight: 1.5, margin: '6px 0 0',
              }}>{m.use}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <LinkRow
            title="Cook with mushrooms"
            sub="Stews, grills, broths and everyday protein"
            onClick={() => go('shroomRecipes')}
          />
        </div>

        <Band tone="labour" title="What the extract trials do and do not show" style={{ marginTop: 14 }}>
          Most functional-mushroom research uses concentrated extracts at doses a culinary serving
          never reaches. A bowl of oyster mushrooms is good food; it is not the intervention that
          was studied. The badges above grade the preparation actually tested.
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== the nine tabbed guides ===================== */

export function NervinesScreen() {
  return (
    <TabbedGuide
      eyebrow="Apothecary · nervines"
      title="Nervines &amp; adaptogens"
      lede="Calm, build, release. Herbs that work on the stress response — and the honest limits of what each one is known to do."
      groups={nervineDefs as GuideGroup[]}
      stateKey="nervineUse"
      footer={<HerbCaution />}
    />
  );
}

export function WaterMedScreen() {
  return (
    <TabbedGuide
      eyebrow="Apothecary · water"
      title="Water as medicine"
      lede="The cheapest intervention there is, and the one most often skipped. Rhythm, minerals and the water that carries meaning."
      groups={waterMedDefs as GuideGroup[]}
      stateKey="waterUse"
      footer={
        <Band tone="safety" title="Oral rehydration solution is a clinical formulation" style={{ marginTop: 16 }}>
          A homemade electrolyte drink is not a substitute for ORS. If someone is seriously
          dehydrated — especially a child or an elder — use a proper ORS sachet and seek care.
        </Band>
      }
    />
  );
}

export function FermentScreen() {
  return (
    <TabbedGuide
      eyebrow="Apothecary · fermentation"
      title="Live cultures"
      lede="Preservation, flavour and a daily dose of something alive — the technique the diaspora already owns."
      groups={fermDefs as GuideGroup[]}
      stateKey="fermUse"
      footer={
        <Band tone="safety" title="Keep it under the brine" style={{ marginTop: 16 }}>
          Vegetables must stay submerged, at 2% salt by weight, in clean jars. Fuzzy or coloured
          mould, a slimy texture or an off smell means discard the jar — not skim and continue.
        </Band>
      }
    />
  );
}

export function SwapsScreen() {
  return (
    <TabbedGuide
      eyebrow="Explore · supplements"
      title="Supplement swaps"
      lede="What the tub is selling, and what a bulk-bin staple does instead. Where a supplement genuinely earns its place, it says so."
      groups={swapDefs as GuideGroup[]}
      stateKey="swapUse"
      footer={
        <Band tone="cream" title="B12 is the exception" style={{ marginTop: 16 }}>
          Most of this page argues for food over powder. B12 is where that argument stops: on an
          all-plant diet it needs a fortified food or a supplement, reliably, for life.
        </Band>
      }
    />
  );
}

export function DiabetesScreen() {
  return (
    <TabbedGuide
      eyebrow="Explore · blood sugar"
      title="Living with diabetes"
      lede="Whole-food eating changes glycemic control measurably. It also changes what your medication is doing — which is why this screen keeps pointing at your clinician."
      groups={dbDefs as GuideGroup[]}
      stateKey="dbUse"
      footer={
        <Band tone="safety" title="Coordinate before you change anything" style={{ marginTop: 16 }}>
          If you take insulin or glucose-lowering medication, a sudden shift in how you eat can
          drop you too low. The Council supports, it doesn&rsquo;t prescribe or adjust medication.
        </Band>
      }
    />
  );
}

export function CeremonyScreen() {
  return (
    <TabbedGuide
      eyebrow="Explore · the table"
      title="Food as ceremony"
      lede="Before, during and after the meal — the practices that turn eating from fuel into relationship."
      groups={cerDefs as GuideGroup[]}
      stateKey="cerUse"
      footer={
        <Band tone="labour" title="Publicly documented custom only" style={{ marginTop: 16 }}>
          Restricted ritual knowledge stays out of this app. What is here is culinary custom that
          its own communities have published — never closed practice repackaged as a wellness tip.
        </Band>
      }
    />
  );
}

export function CoconutScreen() {
  return (
    <TabbedGuide
      eyebrow="Explore · cultural foodways"
      title="Coconut foodways"
      lede="One palm, whole pantry — milk, water, oil, flesh and story across the diaspora."
      groups={coconutDefs as GuideGroup[]}
      stateKey="coconutUse"
      footer={
        <Band tone="labour" title="Whole picture" style={{ marginTop: 16 }}>
          Coconut fat is ~90% saturated — traditional diets pair it with greens, beans and daily
          labor. Favor whole-food forms and moderation; mainstream heart guidance differs from
          island practice, so know both.
        </Band>
      }
    />
  );
}

export function HoneyScreen() {
  return (
    <TabbedGuide
      eyebrow="Explore · honey"
      title="Honey, incorporated"
      lede="Fuel, traditional medicine, beekeeping economies — and the vegan question the app does not pretend to settle for you."
      groups={honeyDefs as GuideGroup[]}
      stateKey="honeyUse"
    />
  );
}

export function ShroomRecipesScreen() {
  return (
    <TabbedGuide
      eyebrow="Explore · cooking fungi"
      title="Cook with mushrooms"
      lede="Stews, grills, broths and everyday protein — cultivated fungi doing the work a pot used to ask of meat."
      groups={shroomRecipeDefs as GuideGroup[]}
      stateKey="shroomRecipeId"
      footer={
        <Band tone="safety" title="Cultivated or bought only" style={{ marginTop: 16 }}>
          Nothing on this page assumes foraged fungi. Wild mushrooms are never identified from a
          photo in this app.
        </Band>
      }
    />
  );
}
