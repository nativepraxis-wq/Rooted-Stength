import {
  placeImage, cropImage, CROP_NOTE, forageImage, ATLAS_PREP_NOTE, freqImage,
} from '../data/media';
import { forageDepth } from '../data/forageDepth';
import { freqDepth } from '../data/bandDepth';
import { useStore } from '../state/store';
import {
  crops, cropProfiles, minerals, forageItems, events, courses,
  bioregions, bioNotes, places, freqBandDefs, goalFreqMap, fusionQs, obGoals,
  plateDefs, plateRecipes,
} from '../data/content';
import { mineralDepth, mineralPairs } from '../data/mineralDepth';
import { DarkHeader, stripes, PhotoHeader } from '../components/Headers';
import { TierBadge } from '../components/TierBadge';
import { Screen, Gutter, Band, Chip, BackButton } from '../components/ui';

/* ===================== explore — the atlas hub ===================== */

const SURFACES = [
  { to: 'forage', title: 'Foraged foods', sub: 'Weeds & sea veg' },
  { to: 'community', title: 'Community & events', sub: 'Learn & gather' },
  { to: 'seasonal', title: 'Seasonal calendar', sub: "What's in season" },
  { to: 'minerals', title: 'Mineral & body atlas', sub: 'Soil to bloodstream' },
  { to: 'apothecary', title: 'Rooted Apothecary', sub: 'Herbal teas & tonics' },
  { to: 'teaIntel', title: 'Tea Intelligence', sub: 'Which cup, when & why' },
  { to: 'coconut', title: 'Coconut Foodways', sub: 'One palm, whole pantry' },
  { to: 'honey', title: 'Honey Incorporated', sub: 'Fuel · medicine · the vegan question' },
  { to: 'mushrooms', title: 'Mushroom mastery', sub: 'Functional fungi' },
  { to: 'frequencies', title: 'Nutrient Frequencies', sub: 'Eat for the state you are in' },
  { to: 'swaps', title: 'Supplement swaps', sub: 'Tub vs. bulk bin' },
  { to: 'ceremony', title: 'Food as ceremony', sub: 'Before, during, after' },
  { to: 'diabetes', title: 'Living with diabetes', sub: 'The plate, and your clinician' },
];

function BigLink({ title, sub, onClick }: { title: string; sub: string; onClick: () => void }) {
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
          display: 'block', fontFamily: 'var(--font-serif)',
          fontSize: 'calc(17px * var(--scale))', fontWeight: 600, color: 'var(--ink)',
        }}>{title}</span>
        <span className="rs-prose" style={{
          display: 'block', fontSize: 'calc(12px * var(--scale))',
          color: 'var(--ink-soft)', marginTop: 3, lineHeight: 1.45,
        }}>{sub}</span>
      </span>
      <span aria-hidden="true" style={{ fontSize: 17, color: 'var(--ink-meta)' }}>&#8250;</span>
    </button>
  );
}

export function ExploreScreen() {
  const { set, go } = useStore();

  return (
    <Screen>
      <DarkHeader eyebrow="Explore" title="Food Roots Atlas">
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Nutrients as one circuit — from soil, through crop and cook-pot, to blood.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <BigLink
            title="Find Rooted Food Near Me"
            sub="Farms · markets · co-ops · restaurants"
            onClick={() => go('map')}
          />
          <BigLink
            title="Foodways Codex"
            sub="Ten regional volumes — every dish labelled by what it always was, not what a diet wants it to be."
            onClick={() => go('codex')}
          />
          <BigLink
            title="Pantry Codex"
            sub="Grains, legumes, mushrooms, infusions, liquid nutrition and microgreens — every entry graded by what the evidence actually carries."
            onClick={() => go('pantryCodex')}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 9, marginTop: 12 }}>
          {SURFACES.map((s) => (
            <button
              key={s.to}
              type="button"
              onClick={() => go(s.to as any)}
              style={{
                textAlign: 'left', background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-tile)', padding: '13px 14px', cursor: 'pointer', minHeight: 44,
              }}
            >
              <div style={{
                fontWeight: 700, fontSize: 'calc(13.5px * var(--scale))', color: 'var(--ink)',
              }}>{s.title}</div>
              <div style={{
                fontSize: 'calc(11px * var(--scale))', color: 'var(--ink-meta)',
                marginTop: 3, lineHeight: 1.4,
              }}>{s.sub}</div>
            </button>
          ))}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Staple crops &amp; their histories</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 9 }}>
          {(crops as any[]).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => { set({ cropId: c.id }); go('crop'); }}
              style={{
                textAlign: 'left', background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-tile)', padding: 0, overflow: 'hidden',
                cursor: 'pointer', minHeight: 44,
              }}
            >
              {/* Pattern, not photography — keeps the offline bundle self-contained. */}
              <div aria-hidden="true" style={{ height: 44, background: stripes(c.c1, c.c2, 7) }} />
              <div style={{ padding: '11px 12px' }}>
                <div style={{
                  fontSize: 'calc(13.5px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
                }}>{c.name}</div>
                <div style={{
                  fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)',
                  marginTop: 2, fontStyle: 'italic',
                }}>{c.botanical}</div>
                <div style={{
                  fontSize: 'calc(10.5px * var(--scale))', color: 'var(--earth)',
                  fontWeight: 700, marginTop: 3,
                }}>{c.region}</div>
              </div>
            </button>
          ))}
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== crop ===================== */

export function CropScreen() {
  const { state, goBack } = useStore();
  const profiles = cropProfiles as any;
  const c = profiles[state.cropId] || profiles.cowpea;

  return (
    <Screen>
      {/*
        The striped gradient stays as PhotoHeader's fallback, so a missing or
        still-loading file leaves this looking as it did before.
      */}
      <PhotoHeader
        src={cropImage(state.cropId || 'cowpea')}
        alt={c.name + ', illustration'}
        note={CROP_NOTE}
        c1={c.c1}
        c2={c.c2}
        back={goBack}
      />

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{
          fontSize: 'calc(10.5px * var(--scale))', letterSpacing: 1.5, textTransform: 'uppercase',
          color: 'var(--earth)', fontWeight: 800,
        }}>Food Roots Atlas</div>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(24px * var(--scale))', fontWeight: 600,
          lineHeight: 1.15, color: 'var(--ink)', margin: '4px 0 0',
        }}>{c.name}</h1>
        <div style={{
          fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-meta)',
          fontStyle: 'italic', marginTop: 4,
        }}>{c.botanical}</div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 9 }}>
          <TierBadge kind="ev" tierKey="well" />
          <TierBadge kind="ev" tierKey="trad" />
        </div>

        <Band tone="cream" title="Origin &amp; migration" style={{ marginTop: 16 }}>{c.origin}</Band>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 12 }}>
          <div style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-tile)', padding: '13px 14px',
          }}>
            <div style={{
              fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 0.8,
              textTransform: 'uppercase', color: 'var(--ink-meta)',
            }}>Bodybuilding use</div>
            <p className="rs-prose" style={{
              fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
              lineHeight: 1.5, margin: '5px 0 0',
            }}>{c.body}</p>
          </div>
          <div style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-tile)', padding: '13px 14px',
          }}>
            <div style={{
              fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 0.8,
              textTransform: 'uppercase', color: 'var(--ink-meta)',
            }}>Grow it</div>
            <p className="rs-prose" style={{
              fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
              lineHeight: 1.5, margin: '5px 0 0',
            }}>{c.grow}</p>
          </div>
        </div>

        <Band tone="cream" title="Traditional dishes &amp; vegan adaptation" style={{ marginTop: 12 }}>
          {c.dishes}
        </Band>

        {/* Where sources disagree, the Atlas shows the disagreement. */}
        <Band tone="labour" title="Contested history note" style={{ marginTop: 12 }}>
          {c.contested}
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== map ===================== */

export function MapScreen() {
  const { set, go, goBack } = useStore();

  return (
    <Screen>
      <DarkHeader eyebrow="Explore · near you" title="Find rooted food" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Farms, markets, co-ops and kitchens. Approximate location only, and only while you allow it.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        {/*
          A schematic, not a real map. Saying so is better than implying live
          geodata the offline bundle does not carry.
        */}
        <div style={{
          position: 'relative', height: 210, borderRadius: 'var(--r-card)',
          background: 'linear-gradient(160deg, #E7E0CE, #DDD4BE)',
          border: '1px solid var(--border)', overflow: 'hidden',
        }}>
          {(places as any[]).map((p) => (
            <span
              key={p.name}
              aria-hidden="true"
              style={{
                position: 'absolute', top: p.top, left: p.left,
                width: 14, height: 14, borderRadius: '50%', background: p.c,
                border: '2px solid #FFFDF7',
              }}
            />
          ))}
        </div>
        <div style={{
          fontSize: 'calc(11px * var(--scale))', color: 'var(--ink-meta)',
          textAlign: 'center', marginTop: 8,
        }}>Schematic view — distances below are the real figures.</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 14 }}>
          {(places as any[]).map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => { if (p.rest) { set({ restId: p.rest }); go('order'); } else if (p.dest) go(p.dest); }}
              style={{
                display: 'flex', width: '100%', gap: 11, alignItems: 'flex-start', textAlign: 'left',
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-tile)', padding: '13px 14px', cursor: 'pointer', minHeight: 44,
              }}
            >
              {/*
                Replaces a purely decorative colour dot. These illustrate the
                KIND of place - crates of produce, a pot on a stove, raised
                beds - and deliberately carry no signage, no shopfront and no
                building exterior. The app lists these as findable businesses
                with a distance and a map pin, so a synthetic storefront would
                assert that a particular building exists. See data/media.ts.
              */}
              <img
                src={placeImage(p.name)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                style={{
                  width: 46, height: 46, flex: 'none', borderRadius: 10,
                  objectFit: 'cover', background: p.c, marginTop: 2,
                }}
              />
              <span style={{ flex: 1 }}>
                <span style={{
                  display: 'block', fontSize: 'calc(13.5px * var(--scale))',
                  fontWeight: 700, color: 'var(--ink)',
                }}>{p.name}</span>
                <span style={{
                  display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                  color: 'var(--ink-meta)', marginTop: 2,
                }}>{p.type} · {p.dist}</span>
                <span style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                  {(p.tags || []).map((t: string) => (
                    <span key={t} style={{
                      fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
                      padding: '3px 8px', borderRadius: 12,
                      background: 'var(--surface-2)', color: 'var(--ink-meta)',
                    }}>{t}</span>
                  ))}
                </span>
              </span>
            </button>
          ))}
        </div>

        <Band tone="cream" title="Ownership is self-identified" style={{ marginTop: 14 }}>
          &ldquo;Black-owned&rdquo; and similar tags come from the business, not from a
          verification we performed. Where we do not know, the listing stays silent rather than
          guessing.
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== forage ===================== */

export function ForageScreen() {
  const { state, set, goBack } = useStore();
  /*
    Every one of the fifteen items carries a `regions` array and nothing read
    it - the plants were tagged by bioregion and the tags did nothing. A plant
    list that shows chipilin to someone in Connecticut and dandelion to someone
    in Kingston is less useful than the data already allowed for.

    `all` is the default so nothing is hidden by surprise, and the counts are
    shown so an empty-looking region reads as a fact rather than a bug.
  */
  const REGIONS = [
    { id: 'all', name: 'All regions' },
    { id: 'northeast', name: 'Northeast U.S.' },
    { id: 'caribbean', name: 'Caribbean' },
    { id: 'westafrica', name: 'West Africa' },
    { id: 'eastafrica', name: 'East Africa' },
    { id: 'centralam', name: 'Central America' },
  ];
  const region = state.forageRegion || 'all';
  const all = forageItems as any[];
  const shown = region === 'all'
    ? all
    : all.filter((f) => (f.regions || []).includes(region));

  return (
    <Screen>
      <DarkHeader eyebrow="Explore · wild food" title="Foraged foods" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          The weeds and sea vegetables that fed communities before anyone sold them back. Fifteen
          plants, each with the season it is actually good in.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        {/* Non-negotiable, and first on the page rather than buried at the bottom. */}
        <Band tone="safety" title="Identify with a person, not a picture">
          Never eat a wild plant identified from an app, a photo or a single book. Learn from
          someone who knows the plant in your area, check for lookalikes, and never forage roadsides,
          sprayed ground or land you do not have permission to harvest.
        </Band>

        {/*
          Said once, near the images, rather than under each of fifteen cards.
        */}
        <div style={{
          fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)',
          fontWeight: 700, marginTop: 10,
        }}>{ATLAS_PREP_NOTE}</div>

        <div className="rs-scroll" style={{
          display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginTop: 14,
        }}>
          {REGIONS.map((r) => {
            const n = r.id === 'all'
              ? all.length
              : all.filter((f) => (f.regions || []).includes(r.id)).length;
            return (
              <Chip
                key={r.id}
                selected={r.id === region}
                color="var(--leaf)"
                onClick={() => set({ forageRegion: r.id })}
              >{r.name} · {n}</Chip>
            );
          })}
        </div>

        <div role="status" style={{
          fontSize: 'calc(12px * var(--scale))', fontWeight: 700,
          color: 'var(--ink-meta)', marginTop: 10,
        }}>
          {shown.length} of {all.length} plants
          {region === 'all' ? '' : ' recorded for this region'}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 14 }}>
          {shown.map((f: any) => (
            <div key={f.name} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: 0, overflow: 'hidden',
            }}>
              {/*
                The PREPARATION, never the plant in the ground - see the note in
                data/media.ts. Nothing here can be used to key a species, which is
                the whole reason the band above this list exists.
              */}
              <img
                src={forageImage(f.name)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                style={{
                  display: 'block', width: '100%', height: 150,
                  objectFit: 'cover', background: 'var(--surface-2)',
                }}
              />
              <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start', padding: '13px 14px' }}>
              <span aria-hidden="true" style={{
                width: 10, height: 10, borderRadius: '50%', flex: 'none',
                background: f.c, marginTop: 5,
              }} />
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline',
                }}>
                  <span style={{
                    fontSize: 'calc(14px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
                  }}>{f.name}</span>
                  <span style={{
                    fontSize: 'calc(11px * var(--scale))',
                    fontWeight: 800, color: 'var(--ink-meta)',
                  }}>{f.season}</span>
                </div>
                <div style={{
                  fontSize: 'calc(11px * var(--scale))', color: 'var(--ink-meta)',
                  fontStyle: 'italic', marginTop: 2,
                }}>{f.botanical}</div>
                <p className="rs-prose" style={{
                  fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
                  lineHeight: 1.5, margin: '6px 0 0',
                }}>{f.use}</p>

                {/*
                  `warn` was already in content.ts on nettle, cerasee and chaya and
                  was never rendered - three safety lines sitting in the data and
                  invisible on the screen. Chaya's in particular is not advice, it
                  is the condition under which the plant is food at all.
                */}
                {f.warn && (
                  <p className="rs-prose" style={{
                    fontSize: 'calc(12px * var(--scale))', color: 'var(--clay)',
                    fontWeight: 700, lineHeight: 1.45, margin: '7px 0 0',
                  }}>{f.warn}</p>
                )}

                {/* Depth, from data/forageDepth.ts. Preparation - never an ID key. */}
                {forageDepth[f.name] && (() => {
                  const d = forageDepth[f.name];
                  return (
                    <div style={{
                      marginTop: 10, paddingTop: 10,
                      borderTop: '1px solid var(--border)',
                    }}>
                      <DLabel>How it is prepared</DLabel>
                      <p className="rs-prose" style={{
                        fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink)',
                        lineHeight: 1.55, margin: 0,
                      }}>{d.prep}</p>

                      <div style={{ marginTop: 9 }}>
                        <DLabel>Cutting so it comes back</DLabel>
                        <p className="rs-prose" style={{
                          fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
                          lineHeight: 1.5, margin: 0,
                        }}>{d.harvest}</p>
                      </div>

                      <div style={{ marginTop: 9 }}>
                        <DLabel>What it gets confused with</DLabel>
                        <p className="rs-prose" style={{
                          fontSize: 'calc(12px * var(--scale))', color: 'var(--earth)',
                          lineHeight: 1.5, margin: 0, fontWeight: 600,
                        }}>{d.confuse}</p>
                      </div>

                      <div style={{ marginTop: 9 }}>
                        <DLabel>Keeping it</DLabel>
                        <p className="rs-prose" style={{
                          fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
                          lineHeight: 1.5, margin: 0,
                        }}>{d.keeps}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
              </div>
            </div>
          ))}
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== community ===================== */

export function CommunityScreen() {
  const { state, set, goBack } = useStore();
  const rsvp = state.rsvp || {};

  return (
    <Screen>
      <DarkHeader eyebrow="Explore · gather" title="Community &amp; events" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Cook-alongs, work days and classes. Knowledge moves person to person before it moves
          through an app.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {(events as any[]).map((e) => {
            const going = !!rsvp[e.id];
            return (
              <div key={e.id} style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-card)', padding: 0, display: 'flex', overflow: 'hidden',
              }}>
                <div aria-hidden="true" style={{ width: 11, flex: 'none', background: e.c }} />
                <div style={{ flex: 1, minWidth: 0, padding: '13px 14px' }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-serif)', fontSize: 'calc(16.5px * var(--scale))',
                      fontWeight: 600, color: 'var(--ink)', lineHeight: 1.25,
                    }}>{e.title}</span>
                    <span style={{
                      fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
                      padding: '3px 8px', borderRadius: 12,
                      background: 'var(--surface-2)', color: 'var(--ink-meta)',
                    }}>{e.kind}</span>
                  </div>
                  <div style={{
                    fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
                    fontWeight: 700, marginTop: 4,
                  }}>{e.when}</div>
                  <div style={{
                    fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-muted)', marginTop: 2,
                  }}>{e.host} · {e.where}</div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, flexWrap: 'wrap',
                  }}>
                    <button
                      type="button"
                      aria-pressed={going}
                      onClick={() => set((s) => ({ rsvp: { ...s.rsvp, [e.id]: !going } }))}
                      style={{
                        border: '1px solid ' + (going ? 'var(--leaf-mid)' : 'var(--border-2)'),
                        background: going ? '#E4EDDD' : 'var(--card)',
                        color: going ? 'var(--leaf)' : 'var(--ink-muted)',
                        borderRadius: 999, padding: '9px 16px', minHeight: 44, cursor: 'pointer',
                        fontSize: 'calc(12.5px * var(--scale))', fontWeight: 800,
                      }}
                    >{going ? "You're going ✓" : 'RSVP'}</button>
                    <span style={{
                      fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)', fontWeight: 700,
                    }}>{e.spots}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Short courses</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(courses as any[]).map((c) => (
            <div key={c.title} style={{
              display: 'flex', gap: 11, alignItems: 'center',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '12px 13px',
            }}>
              <span aria-hidden="true" style={{
                width: 10, height: 10, borderRadius: '50%', flex: 'none', background: c.c,
              }} />
              <span style={{
                flex: 1, minWidth: 0, fontSize: 'calc(13.5px * var(--scale))',
                fontWeight: 700, color: 'var(--ink)',
              }}>{c.title}</span>
              <span style={{
                fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)', fontWeight: 700,
              }}>{c.mins}</span>
            </div>
          ))}
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== seasonal ===================== */

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/* Which calendar months a period covers, e.g. "Mar – May" → [2,3,4]. */
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

export function SeasonalScreen() {
  const { state, set, goBack } = useStore();
  const regions = bioregions as any;
  const region = regions[state.bioregion] || regions.northeast;

  /* Default to the period the current month actually falls in. */
  const nowIdx = (() => {
    const now = new Date().getMonth();
    const i = region.periods.findIndex((p: any) => periodMonths(p).includes(now));
    return i < 0 ? 0 : i;
  })();
  const idx = state.seasonIdx == null ? nowIdx : state.seasonIdx;
  const period = region.periods[idx] ?? region.periods[0];

  return (
    <Screen>
      <DarkHeader eyebrow="Explore · the year" title="Seasonal calendar" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Not four seasons everywhere. Pick the bioregion you actually live in — the year is shaped
          differently in each.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div className="rs-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {Object.keys(regions).map((id) => (
            <Chip
              key={id}
              selected={id === state.bioregion}
              color="var(--earth)"
              onClick={() => set({ bioregion: id, seasonIdx: null })}
            >{regions[id].name}</Chip>
          ))}
        </div>

        <div style={{
          fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
          fontWeight: 700, marginTop: 10,
        }}>{region.climate}</div>

        <Band tone="cream" style={{ marginTop: 10 }}>{(bioNotes as any)[state.bioregion]}</Band>

        <div className="rs-scroll" style={{
          display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginTop: 14,
        }}>
          {region.periods.map((p: any, i: number) => (
            <Chip
              key={p.label}
              selected={i === idx}
              color={p.accent}
              onClick={() => set({ seasonIdx: i })}
            >{p.label}{i === nowIdx ? ' · now' : ''}</Chip>
          ))}
        </div>

        <div style={{
          marginTop: 14, background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-card)', padding: 16,
        }}>
          <div style={{
            fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 1.2,
            textTransform: 'uppercase', color: period.accent,
          }}>{period.months}</div>
          <div style={{
            fontFamily: 'var(--font-serif)', fontSize: 'calc(21px * var(--scale))',
            fontWeight: 600, color: 'var(--ink)', marginTop: 3,
          }}>{period.label}</div>

          <div style={{
            fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 0.8,
            textTransform: 'uppercase', color: 'var(--ink-meta)', marginTop: 14,
          }}>Train</div>
          <p className="rs-prose" style={{
            fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
            lineHeight: 1.5, margin: '4px 0 0',
          }}>{period.train}</p>

          <div style={{
            fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 0.8,
            textTransform: 'uppercase', color: 'var(--ink-meta)', marginTop: 12,
          }}>Nourish</div>
          <p className="rs-prose" style={{
            fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
            lineHeight: 1.5, margin: '4px 0 0',
          }}>{period.nourish}</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 14 }}>
            {period.foods.map((f: string) => (
              <span key={f} style={{
                fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700,
                background: 'var(--surface-2)', color: 'var(--ink-meta)',
                padding: '6px 12px', borderRadius: 16,
              }}>{f}</span>
            ))}
          </div>
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== minerals ===================== */

/*
  Recipe chips for the atlas.

  A chip only appears where the recipe's own ingredient list contains a food the
  mineral card names as a source - the links in data/mineralDepth.ts were derived
  by scanning those lists, not asserted. `showIron` surfaces the per-serving iron
  figure content.ts already declares on every plate; it is the app's own number,
  read at render time rather than copied.
*/
function RecipeChips({ ids, showIron }: { ids: string[]; showIron?: boolean }) {
  const { set } = useStore();
  const defs = ids
    .map((id) => (plateDefs as any[]).find((d) => d.id === id))
    .filter(Boolean);
  if (!defs.length) return null;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 7 }}>
      {defs.map((d: any) => {
        const iron = showIron ? (plateRecipes as any)[d.id]?.iron : null;
        return (
          <button
            key={d.id}
            type="button"
            onClick={() => set({
              plateId: d.id, plateRelaxed: false,
              route: 'recipeDetail', councilOpen: false,
            })}
            style={{
              font: 'inherit', cursor: 'pointer', textAlign: 'left',
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: 999, padding: '5px 10px',
              fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700,
              color: 'var(--ink)', lineHeight: 1.3,
            }}
          >
            {d.name}
            {iron && (
              <span style={{ color: 'var(--ink-meta)', fontWeight: 600 }}>
                {' \u00b7 '}{iron} iron
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* Small uppercase run-in label, used throughout the depth blocks. */
function DLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
      letterSpacing: 1, textTransform: 'uppercase',
      color: 'var(--ink-meta)', marginBottom: 3,
    }}>{children}</div>
  );
}

const PAIR_TONE: Record<string, { label: string; c: string }> = {
  helps: { label: 'Works together', c: 'var(--leaf)' },
  competes: { label: 'Competes', c: 'var(--clay)' },
  needs: { label: 'Depends on', c: 'var(--earth)' },
};

export function MineralsScreen() {
  const { goBack } = useStore();

  return (
    <Screen>
      <DarkHeader eyebrow="Explore · soil to bloodstream" title="Mineral &amp; body atlas" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          What each mineral builds, how a shortfall actually feels, and which plants carry it.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {(minerals as any[]).map((m) => (
            <div key={m.sym} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-card)', padding: '14px 15px',
            }}>
              <div style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
                <span aria-hidden="true" style={{
                  width: 38, height: 38, flex: 'none', borderRadius: 11, background: m.c,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#F4EDDF', fontSize: 'calc(13px * var(--scale))', fontWeight: 800,
                }}>{m.sym}</span>
                <span style={{ flex: 1 }}>
                  <span style={{
                    display: 'block', fontFamily: 'var(--font-serif)',
                    fontSize: 'calc(17px * var(--scale))', fontWeight: 600, color: 'var(--ink)',
                  }}>{m.name}</span>
                  <span style={{
                    display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                    fontWeight: 700, color: m.c, marginTop: 1,
                  }}>{m.builds}</span>
                </span>
                <TierBadge kind="ev" evLabel={m.ev} />
              </div>

              <div style={{
                fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
                marginTop: 10, lineHeight: 1.5,
              }}>
                <b style={{ color: 'var(--ink)' }}>Enough feels like:</b> {m.feels}
              </div>
              <div style={{
                fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
                marginTop: 5, lineHeight: 1.5,
              }}>
                <b style={{ color: 'var(--ink)' }}>Sources:</b> {m.sources}
              </div>
              <div style={{
                fontSize: 'calc(11.5px * var(--scale))', color: 'var(--earth)',
                fontWeight: 700, marginTop: 7, lineHeight: 1.45,
              }}>{m.tip}</div>

              {/*
                Depth, from data/mineralDepth.ts. Figures are ranges, never single
                numbers - the Atlas sets that rule for itself in the microgreen
                copy, and the reason holds for every mineral here.
              */}
              {mineralDepth[m.sym] && (() => {
                const d = mineralDepth[m.sym];
                return (
                  <div style={{
                    marginTop: 11, paddingTop: 11,
                    borderTop: '1px solid var(--border)',
                  }}>
                    <DLabel>Reference intake</DLabel>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink)',
                      lineHeight: 1.5, margin: 0, fontWeight: 700,
                    }}>{d.target}</p>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-muted)',
                      lineHeight: 1.5, margin: '4px 0 0',
                    }}>{d.targetNote}</p>

                    <div style={{ marginTop: 10 }}>
                      <DLabel>What carries it</DLabel>
                      <ul style={{
                        margin: 0, paddingLeft: 16,
                        fontSize: 'calc(12px * var(--scale))',
                        color: 'var(--ink-muted)', lineHeight: 1.55,
                      }}>
                        {d.carries.map((c) => (
                          <li key={c.food}>
                            <b style={{ color: 'var(--ink)' }}>{c.food}</b>
                            {' \u2014 '}{c.amount}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ marginTop: 10 }}>
                      <DLabel>Raises absorption</DLabel>
                      <p className="rs-prose" style={{
                        fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
                        lineHeight: 1.5, margin: 0,
                      }}>{d.absorb}</p>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <DLabel>Lowers it</DLabel>
                      <p className="rs-prose" style={{
                        fontSize: 'calc(12px * var(--scale))', color: 'var(--clay)',
                        lineHeight: 1.5, margin: 0, fontWeight: 600,
                      }}>{d.blocks}</p>
                    </div>

                    <p className="rs-prose" style={{
                      fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink)',
                      lineHeight: 1.55, margin: '10px 0 0',
                    }}>{d.depth}</p>

                    <div style={{ marginTop: 10 }}>
                      <DLabel>In these recipes</DLabel>
                      <RecipeChips ids={d.recipes} showIron={m.sym === 'Fe'} />
                    </div>
                  </div>
                );
              })()}
            </div>
          ))}
        </div>

        {/*
          Combinations. These decide more of the outcome than raw intake does - a
          plate can be rich in iron and hand over very little of it - so they get
          the same depth as the individual minerals.
        */}
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 3px',
        }}>How they work on each other</h2>
        <p className="rs-prose" style={{
          fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
          lineHeight: 1.55, margin: '0 0 10px',
        }}>
          Minerals are not absorbed one at a time. What else is on the plate, and
          what is in the cup beside it, changes how much of each one you keep.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {mineralPairs.map((pr) => {
            const tone = PAIR_TONE[pr.kind];
            return (
              <div key={pr.pair} style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-card)', padding: '14px 15px',
              }}>
                <div style={{
                  display: 'flex', gap: 9, alignItems: 'baseline', flexWrap: 'wrap',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-serif)', flex: 1, minWidth: 150,
                    fontSize: 'calc(16px * var(--scale))', fontWeight: 600,
                    color: 'var(--ink)',
                  }}>{pr.pair}</span>
                  <span style={{
                    fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
                    letterSpacing: 1, textTransform: 'uppercase', color: tone.c,
                  }}>{tone.label}</span>
                  <TierBadge kind="ev" evLabel={pr.ev} />
                </div>

                <p className="rs-prose" style={{
                  fontSize: 'calc(12.5px * var(--scale))', color: tone.c,
                  fontWeight: 700, lineHeight: 1.45, margin: '6px 0 0',
                }}>{pr.short}</p>
                <p className="rs-prose" style={{
                  fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink)',
                  lineHeight: 1.55, margin: '7px 0 0',
                }}>{pr.detail}</p>

                <div style={{ marginTop: 9 }}>
                  <DLabel>What to do</DLabel>
                  <p className="rs-prose" style={{
                    fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
                    lineHeight: 1.5, margin: 0,
                  }}>{pr.practice}</p>
                </div>

                {pr.recipes && pr.recipes.length > 0 && (
                  <div style={{ marginTop: 9 }}>
                    <DLabel>Already built into</DLabel>
                    <RecipeChips ids={pr.recipes} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Band tone="safety" title="Feeling is not a test" style={{ marginTop: 14 }}>
          The &ldquo;enough feels like&rdquo; lines describe patterns, not diagnoses. Fatigue has
          many causes, and only a blood test tells you which one you have. The
          intake figures here are general adult reference ranges, not personal
          targets \u2014 and iodine is the one where too much is as harmful as too little.
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== frequencies ===================== */

export function FrequenciesScreen() {
  const { state, set, go, goBack } = useStore();
  const bands = freqBandDefs as any[];
  /* With no goal chosen, the neutral opening band — not the default goal's. */
  const goalBand = state.obGoalSet ? ((goalFreqMap as any)[state.obGoal] || 'grounding') : 'grounding';
  const sel = bands.find((b) => b.id === (state.freqBand || goalBand)) ?? bands[0];
  const goalLabel = (obGoals as any[]).find((g) => g.id === state.obGoal)?.label || '';

  return (
    <Screen>
      <DarkHeader eyebrow="Explore · nutrient frequencies" title="Eat for the state you are in" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Four bands, matched to how the day actually feels rather than to a macro split.
        </p>
      </DarkHeader>

      {/* One image per band, keyed to the open one. */}
      <img
        key={sel.id}
        src={freqImage(sel.id)}
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
      }}>{ATLAS_PREP_NOTE}</div>

      <Gutter style={{ paddingTop: 16 }}>
        <div role="status" style={{
          fontSize: 'calc(12px * var(--scale))', fontWeight: 700,
          color: 'var(--ink-meta)', marginBottom: 12,
        }}>
          {state.obGoalSet ? (
            <>
              Your goal — {goalLabel} — tunes you to{' '}
              <b style={{ color: 'var(--ink)' }}>{bands.find((b) => b.id === goalBand)?.name}</b>.
            </>
          ) : (
            <>
              No goal set — starting from{' '}
              <b style={{ color: 'var(--ink)' }}>{bands.find((b) => b.id === goalBand)?.name}</b>.{' '}
              <button
                type="button"
                onClick={() => { set({ profileReturn: 'frequencies' }); go('ob2'); }}
                style={{
                  border: 'none', background: 'none', padding: 0, cursor: 'pointer',
                  font: 'inherit', color: 'var(--teal)', fontWeight: 800,
                  textDecoration: 'underline', minHeight: 44,
                }}
              >Set a goal</button>{' '}to tune it.
            </>
          )}
        </div>

        <div className="rs-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {bands.map((b) => (
            <Chip
              key={b.id}
              selected={b.id === sel.id}
              color={b.c}
              onClick={() => set({ freqBand: b.id })}
            >{b.name}</Chip>
          ))}
        </div>

        <div style={{
          marginTop: 14, background: sel.tintBg, borderRadius: 'var(--r-band)', padding: '15px 16px',
        }}>
          <div style={{
            fontSize: 'calc(11px * var(--scale))', letterSpacing: 1, textTransform: 'uppercase',
            fontWeight: 800, color: sel.c,
          }}>{sel.state}</div>
          <p className="rs-prose" style={{
            fontSize: 'calc(12.5px * var(--scale))', color: '#4C463A',
            fontWeight: 600, lineHeight: 1.5, margin: '6px 0 0',
          }}>{sel.feel}</p>
        </div>

        <Band tone="cream" title="How to eat it" style={{ marginTop: 12 }}>{sel.practice}</Band>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 12 }}>
          {sel.foods.map((f: any) => (
            <div key={f.name} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}>
              <div style={{
                fontSize: 'calc(14px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
              }}>{f.name}</div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
                lineHeight: 1.5, margin: '5px 0 0',
              }}>{f.why}</p>
              {/*
                A food only does the thing the band claims if it is prepared in a
                way that lets it - the iron needs the vitamin C, the magnesium
                needs the phytate dealt with. See data/bandDepth.ts.
              */}
              {freqDepth[f.name] && (
                <div style={{
                  marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)',
                }}>
                  <DLabel>How to prepare it</DLabel>
                  <p className="rs-prose" style={{
                    fontSize: 'calc(12px * var(--scale))', color: 'var(--ink)',
                    lineHeight: 1.5, margin: 0,
                  }}>{freqDepth[f.name].eat}</p>
                  {freqDepth[f.name].note && (
                    <p className="rs-prose" style={{
                      fontSize: 'calc(11.5px * var(--scale))', color: 'var(--clay)',
                      lineHeight: 1.45, margin: '6px 0 0', fontWeight: 600,
                    }}>{freqDepth[f.name].note}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/*
          The bands are an organising idea, not a mechanism. Saying so keeps this
          screen on the right side of the prohibited-claims rule.
        */}
        <Band tone="labour" title="What a &ldquo;frequency&rdquo; is here" style={{ marginTop: 14 }}>
          A way of grouping foods by the state they suit — not a vibration, an energy field, or
          anything measurable in the body. The nutrition under each band is real; the framing is a
          way of remembering it.
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== fusion ===================== */

export function FusionScreen() {
  const { state, set, goBack } = useStore();
  const checks = state.fusionChecks || {};
  const answered = (fusionQs as any[]).filter((q) => checks[q.id]).length;
  const total = (fusionQs as any[]).length;

  return (
    <Screen>
      <header style={{
        background: 'linear-gradient(162deg, #7E5124, #4E3113)',
        padding: '58px 18px 24px', color: 'var(--on-dark)',
        borderRadius: '0 0 var(--r-header) var(--r-header)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, opacity: 0.16,
          background: stripes('#C79A45', 'transparent', 9),
        }} />
        <div style={{ position: 'relative' }}>
          <BackButton onDark onClick={goBack} />
        </div>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(26px * var(--scale))', fontWeight: 600,
          margin: '14px 0 0', lineHeight: 1.15, position: 'relative',
        }}>The eight-question fusion check</h1>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          marginTop: 10, position: 'relative',
        }}>
          Every fusion recipe answers these before it publishes. A question you cannot answer is the
          answer.
        </p>
      </header>

      <Gutter style={{ paddingTop: 16 }}>
        <div role="status" style={{
          fontSize: 'calc(12px * var(--scale))', fontWeight: 700,
          color: answered === total ? 'var(--leaf)' : 'var(--ink-meta)', marginBottom: 12,
        }}>
          {answered} of {total} answered
          {answered === total && ' — every question accounted for'}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {(fusionQs as any[]).map((q, i) => {
            const on = !!checks[q.id];
            return (
              <button
                key={q.id}
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => set((s) => ({ fusionChecks: { ...s.fusionChecks, [q.id]: !on } }))}
                style={{
                  display: 'flex', width: '100%', gap: 11, alignItems: 'flex-start', textAlign: 'left',
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-tile)', padding: '13px 14px', cursor: 'pointer', minHeight: 44,
                }}
              >
                <span aria-hidden="true" style={{
                  width: 24, height: 24, flex: 'none', borderRadius: 8,
                  background: on ? 'var(--leaf)' : 'var(--surface-2)',
                  border: '1px solid ' + (on ? 'var(--leaf)' : 'var(--border-2)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: on ? '#FFFFFF' : 'var(--ink-meta)',
                  fontSize: 12, fontWeight: 800,
                }}>{on ? '✓' : i + 1}</span>
                <span style={{ flex: 1 }}>
                  <span style={{
                    display: 'block', fontSize: 'calc(13.5px * var(--scale))',
                    fontWeight: 700, color: 'var(--ink)', lineHeight: 1.35,
                  }}>{q.q}</span>
                  <span className="rs-prose" style={{
                    display: 'block', fontSize: 'calc(12px * var(--scale))',
                    color: 'var(--ink-muted)', marginTop: 4, lineHeight: 1.5,
                  }}>{q.s}</span>
                </span>
              </button>
            );
          })}
        </div>

        <Band tone="labour" title="This is a check, not a permission slip" style={{ marginTop: 16 }}>
          Answering all eight does not make a dish anyone&rsquo;s to publish. It makes the claims
          about it honest — which is the part this app can actually help with.
        </Band>
      </Gutter>
    </Screen>
  );
}
