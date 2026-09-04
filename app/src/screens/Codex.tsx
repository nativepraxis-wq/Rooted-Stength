import { textColour } from '../data/paletteTokens';
import { codexRegions, codexFamilies, pantryVols } from '../data/content';
import { CLS_TIER, CLAIM_TIER } from '../data/tiers';
import { regionImage, volumeImage, LANDSCAPE_NOTE, VOLUME_NOTE } from '../data/media';
import { dishImage } from '../data/dishImages';
import {
  codexExtraDishes, dishDepth, zoneDepth, type CodexDish,
} from '../data/codexDepth';
import { pantryImage } from '../data/pantryImages';
import { useStore } from '../state/store';
import { TierBadge } from '../components/TierBadge';
import { stripes, PhotoHeader } from '../components/Headers';
import { Screen, Gutter, Band, StatTiles, BackButton } from '../components/ui';

type Region = any;

const regionById = (id: string) => (codexRegions as Region[]).find((r) => r.id === id)!;

/* Dark stat tile used inside the codex headers. */
function HeaderStat({ n, l }: { n: string; l: string }) {
  return (
    <div style={{
      flex: 1, minWidth: 0,
      background: 'rgba(244,237,223,0.13)', borderRadius: 14, padding: '11px 12px',
    }}>
      <div style={{
        fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))',
        fontWeight: 600, color: 'var(--ochre-light)',
      }}>{n}</div>
      <div style={{ fontSize: 'calc(10.5px * var(--scale))', lineHeight: 1.3, marginTop: 2 }}>{l}</div>
    </div>
  );
}

/*
  A codex volume card: an 11px diagonal-stripe spine keyed to the volume, then
  title, evidence tier, a subtitle in the volume's own ink, the hook, and a
  counts line.
*/
function VolumeCard({ swatch, name, ev, sub, ink, hook, counts, onClick }: {
  swatch: string; name: string; ev: string; sub: string;
  ink: string; hook: string; counts: string; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer',
        background: 'var(--card)', borderRadius: 'var(--r-card)', padding: 0,
        overflow: 'hidden', boxShadow: 'var(--shadow-card)', display: 'flex',
      }}
    >
      <div aria-hidden="true" style={{ width: 11, flex: 'none', background: swatch }} />
      <div style={{ flex: 1, minWidth: 0, padding: '15px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
          <div style={{
            fontFamily: 'var(--font-serif)', fontSize: 'calc(18px * var(--scale))',
            fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2,
          }}>{name}</div>
          <TierBadge kind="ev" tierKey={ev} />
        </div>
        <div style={{
          fontSize: 'calc(11.5px * var(--scale))', color: ink, fontWeight: 700, marginTop: 3,
        }}>{sub}</div>
        <div className="rs-prose" style={{
          fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
          lineHeight: 1.5, marginTop: 7,
        }}>{hook}</div>
        <div style={{
          fontSize: 'calc(11px * var(--scale))', color: 'var(--ink-meta)',
          fontWeight: 600, marginTop: 9,
        }}>{counts}</div>
      </div>
    </button>
  );
}

/* ===================== Foodways Codex (by region) ===================== */

export function CodexScreen() {
  const { go, goBack, set } = useStore();
  const regions = codexRegions as Region[];
  /* Counts the added dishes as well, or the hub would understate the codex. */
  const dishTotal = regions.reduce(
    (a, g) => a + g.dishes.length + (codexExtraDishes[g.id]?.length ?? 0), 0);

  const openRegion = (id: string) => { set({ codexId: id }); go('codexRegion'); };

  return (
    <Screen>
      <header style={{
        background: 'linear-gradient(162deg, var(--forest), var(--forest-2))',
        padding: '58px 18px 24px', color: 'var(--on-dark)',
        borderRadius: '0 0 var(--r-header) var(--r-header)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', top: -70, right: -54, width: 220, height: 220,
          borderRadius: '50%', border: '1px solid rgba(199,154,69,0.18)',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
          <BackButton onDark onClick={goBack} />
          <div>
            <div style={{
              fontSize: 'calc(11px * var(--scale))', letterSpacing: 1.5, textTransform: 'uppercase',
              color: 'var(--ochre)', fontWeight: 700,
            }}>Explore · codex</div>
            {/*
              An <h1>, not a div: this screen builds its own header rather than
              using DarkHeader, and was the one route in the app with no h1 at
              all. `margin: 0` is what keeps it looking identical - it is the
              only property an h1 would otherwise change.
            */}
            <h1 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'calc(23px * var(--scale))', fontWeight: 600,
              margin: 0,
            }}>Foodways Codex</h1>
          </div>
        </div>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55, marginTop: 12, position: 'relative',
        }}>
          Ten regional volumes in three families of exchange. Each separates what was always
          plant-based from what has been adapted — and names the evidence carrying the claim.
        </p>
        <div style={{ display: 'flex', gap: 9, marginTop: 16, position: 'relative' }}>
          <HeaderStat n={String(regions.length)} l="regional volumes" />
          <HeaderStat n={String(dishTotal)} l="dishes profiled" />
          <HeaderStat n="6" l="dish classifications" />
        </div>
      </header>

      <Gutter style={{ paddingTop: 18 }}>
        <div style={{
          fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700,
          color: 'var(--ink-muted)', marginBottom: 9,
        }}>How every dish is labelled</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 9 }}>
          {Object.keys(CLS_TIER).map((k) => (
            <TierBadge key={k} kind="cls" tierKey={k}
              style={{ fontSize: 'calc(11px * var(--scale))', fontWeight: 700, padding: '5px 11px', borderRadius: 16 }} />
          ))}
        </div>
        <p className="rs-prose" style={{
          fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-meta)',
          lineHeight: 1.5, marginBottom: 18, marginTop: 0,
        }}>
          A dish that was always plant-based is never called “veganised.” A dish that was not is
          never rewritten to look like it was.
        </p>

        <button
          type="button"
          onClick={() => go('fusion')}
          style={{
            width: '100%', textAlign: 'left', border: '1px solid var(--border)',
            background: 'var(--surface-cream)', cursor: 'pointer', borderRadius: 'var(--r-band)',
            padding: '15px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 13,
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{
              fontWeight: 700, fontSize: 'calc(14px * var(--scale))', color: 'var(--ink)',
            }}>The eight-question fusion check</div>
            <div style={{
              fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
              marginTop: 2, lineHeight: 1.4,
            }}>Every fusion recipe answers these before it publishes.</div>
          </div>
          <span aria-hidden="true" style={{ fontSize: 17, color: 'var(--earth)' }}>&#8250;</span>
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          {(codexFamilies as any[]).map((fam) => (
            <div key={fam.t} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 9,
                borderTop: '2px solid var(--ink)', paddingTop: 9,
              }}>
                <h2 style={{
                  flex: 1, minWidth: 0, fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
                  fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2, margin: 0,
                }}>{fam.t}</h2>
                <div style={{
                  fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800,
                  letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--ink-meta)',
                }}>{fam.ids.length} volumes</div>
              </div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
                lineHeight: 1.5, margin: '-6px 0 0',
              }}>{fam.s}</p>
              {fam.ids.map((id: string) => {
                const g = regionById(id);
                return (
                  <VolumeCard
                    key={id}
                    swatch={stripes(g.c1, g.c2)}
                    name={g.name}
                    ev={g.ev}
                    sub={g.sub}
                    ink={g.ink}
                    hook={g.hook}
                    counts={`${g.dishes.length} dishes · ${g.zones.length} zones · ${g.adapt.length} adaptation standards`}
                    onClick={() => openRegion(id)}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go('pantryCodex')}
          style={{
            width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer',
            borderRadius: 'var(--r-card)', padding: 0, marginTop: 24, background: 'var(--card)',
            boxShadow: 'var(--shadow-card)', display: 'flex', overflow: 'hidden',
          }}
        >
          <div aria-hidden="true" style={{ width: 11, flex: 'none', background: stripes('#8A6A22', '#6B5015') }} />
          <div style={{ flex: 1, minWidth: 0, padding: '15px 16px' }}>
            <div style={{
              fontSize: 'calc(10.5px * var(--scale))', letterSpacing: 1.2, textTransform: 'uppercase',
              fontWeight: 800, color: 'var(--earth)',
            }}>Companion volume set</div>
            <div style={{
              fontFamily: 'var(--font-serif)', fontSize: 'calc(18px * var(--scale))', fontWeight: 600,
              color: 'var(--ink)', lineHeight: 1.2, marginTop: 3,
            }}>Pantry Codex →</div>
            <div className="rs-prose" style={{
              fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
              lineHeight: 1.5, marginTop: 6,
            }}>
              These ten volumes trace dishes through regions. Six more trace the ingredients
              themselves — grains, legumes, mushrooms, infusions, liquid nutrition and microgreens —
              and grade every health claim attached to them.
            </div>
          </div>
        </button>

        <div style={{
          border: '1px dashed #C9BB9E', borderRadius: 16, padding: 14,
          background: 'var(--surface-cream)', marginTop: 16,
        }}>
          <div className="rs-prose" style={{
            fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-soft)', lineHeight: 1.55,
          }}>
            These volumes synthesise published culinary history, archaeobotany, nutrition science
            and community documentation — they are not fieldwork we conducted. Where sources
            disagree, the Codex shows the disagreement instead of picking a winner.
          </div>
          <button
            type="button"
            onClick={() => { set({ sourceFocus: '' }); go('sources'); }}
            style={{
              border: 'none', background: 'none', cursor: 'pointer', padding: '7px 0 0',
              fontSize: 'calc(12px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
            }}
          >See the source library →</button>
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== A region volume ===================== */

/* Small uppercase run-in label for the depth blocks. */
function CxLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
      letterSpacing: 1, textTransform: 'uppercase',
      color: 'var(--ink-meta)', marginBottom: 3,
    }}>{children}</div>
  );
}

export function CodexRegionScreen() {
  const { state, goBack } = useStore();
  const g: Region = regionById(state.codexId) ?? (codexRegions as Region[])[0];

  /*
    content.ts is verbatim, so dishes added to a volume live in
    data/codexDepth.ts and are appended here rather than edited into the array.
    Additive only - nothing already in the codex is changed or reordered.
  */
  const allDishes: CodexDish[] = [
    ...(g.dishes as CodexDish[]),
    ...(codexExtraDishes[g.id] ?? []),
  ];

  return (
    <Screen>
      {/*
        The striped gradient stays as PhotoHeader's fallback, so a missing
        or still-loading file leaves this looking as it did before.
      */}
      <PhotoHeader
        src={regionImage(g.id)}
        alt={g.name + ', illustration'}
        note={LANDSCAPE_NOTE}
        c1={g.c1}
        c2={g.c2}
        back={goBack}
      />

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{
          fontSize: 'calc(10.5px * var(--scale))', letterSpacing: 1.5, textTransform: 'uppercase',
          color: 'var(--earth)', fontWeight: 800,
        }}>Foodways Codex</div>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(24px * var(--scale))', fontWeight: 600,
          lineHeight: 1.15, color: 'var(--ink)', margin: '4px 0 0',
        }}>{g.name}</h1>
        <div style={{
          fontSize: 'calc(12px * var(--scale))', color: textColour(g.ink), fontWeight: 700, marginTop: 4,
        }}>{g.sub}</div>
        <div style={{ marginTop: 9 }}><TierBadge kind="ev" tierKey={g.ev} /></div>

        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.6,
          color: 'var(--ink-muted)', marginTop: 12,
        }}>{g.lede}</p>

        <div style={{ marginTop: 16 }}><StatTiles stats={g.stats} /></div>

        {/* Zones */}
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))', fontWeight: 600,
          color: 'var(--ink)', margin: '24px 0 0',
        }}>{g.zoneTitle}</h2>
        <div style={{
          fontSize: 'calc(11px * var(--scale))', fontWeight: 800, letterSpacing: 1,
          textTransform: 'uppercase', color: 'var(--ink-meta)', marginTop: 6,
        }}>{g.zones.length} zones</div>
        <p className="rs-prose" style={{
          fontSize: 'calc(12.5px * var(--scale))', lineHeight: 1.55,
          color: 'var(--ink-muted)', marginTop: 6,
        }}>{g.zoneSub}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
          {g.zones.map((z: any) => {
            const zd = zoneDepth[g.id + '|' + z.z];
            return (
            <div key={z.z} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: 'calc(16.5px * var(--scale))',
                fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2,
              }}>{z.z}</div>
              <div style={{
                fontSize: 'calc(11.5px * var(--scale))', color: textColour(g.ink), fontWeight: 700, marginTop: 3,
              }}>{z.crops}</div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12.5px * var(--scale))', lineHeight: 1.5,
                color: 'var(--ink-muted)', margin: '6px 0 0',
              }}>{z.note}</p>

              {/* Depth, from data/codexDepth.ts. */}
              {zd && (
                <div style={{
                  marginTop: 10, paddingTop: 10,
                  borderTop: '1px solid var(--border)',
                }}>
                  <CxLabel>How it grows</CxLabel>
                  <p className="rs-prose" style={{
                    fontSize: 'calc(12.5px * var(--scale))', lineHeight: 1.55,
                    color: 'var(--ink)', margin: 0,
                  }}>{zd.system}</p>

                  <div style={{ marginTop: 9 }}>
                    <CxLabel>Whose knowledge</CxLabel>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12px * var(--scale))', lineHeight: 1.5,
                      color: 'var(--ink-muted)', margin: 0,
                    }}>{zd.hands}</p>
                  </div>

                  <div style={{ marginTop: 9 }}>
                    <CxLabel>What is pressing on it</CxLabel>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12px * var(--scale))', lineHeight: 1.5,
                      color: 'var(--earth)', margin: 0, fontWeight: 600,
                    }}>{zd.pressure}</p>
                  </div>
                </div>
              )}
            </div>
            );
          })}
        </div>

        {/* Dishes, each carrying its classification */}
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))', fontWeight: 600,
          color: 'var(--ink)', margin: '24px 0 12px',
        }}>{allDishes.length} dishes profiled</h2>
        {/*
          Said once for the section rather than stamped on all 78 cards. These
          are generated illustrations and the app does not pass them off as
          photographs of the dish - see data/media.ts.
        */}
        <div style={{
          fontSize: 'calc(11px * var(--scale))', color: 'var(--ink-meta)',
          fontWeight: 700, margin: '-6px 0 10px',
        }}>Dish images are illustrations, not photographs</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {allDishes.map((d: any) => {
            const img = dishImage(g.id, d.n);
            const dd = dishDepth[g.id + '|' + d.n];
            return (
            <div key={d.n} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}>
              {img && (
                <img
                  src={img}
                  alt={d.n + ', illustration'}
                  loading="lazy"
                  decoding="async"
                  style={{
                    display: 'block', width: '100%', height: 92,
                    objectFit: 'cover', borderRadius: 'var(--r-tile)',
                    marginBottom: 10, background: 'var(--surface-2)',
                  }}
                />
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                <div style={{
                  fontFamily: 'var(--font-serif)', fontSize: 'calc(17px * var(--scale))',
                  fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2,
                }}>{d.n}</div>
                <TierBadge kind="cls" tierKey={d.cls} />
              </div>
              <div style={{
                fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
                fontWeight: 600, marginTop: 3,
              }}>{d.p}</div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12.5px * var(--scale))', lineHeight: 1.5,
                color: 'var(--ink-muted)', margin: '6px 0 0',
              }}>{d.d}</p>

              {/* Depth, from data/codexDepth.ts. */}
              {dd && (
                <div style={{
                  marginTop: 10, paddingTop: 10,
                  borderTop: '1px solid var(--border)',
                }}>
                  <CxLabel>What it is</CxLabel>
                  <p className="rs-prose" style={{
                    fontSize: 'calc(12.5px * var(--scale))', lineHeight: 1.55,
                    color: 'var(--ink)', margin: 0,
                  }}>{dd.build}</p>

                  {/*
                    Why the badge says what it says. The codex never relabels a
                    dish to suit a diet, so the classification is argued here
                    rather than left to be assumed from the badge alone.
                  */}
                  <div style={{ marginTop: 9 }}>
                    <CxLabel>Why it is classed this way</CxLabel>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12px * var(--scale))', lineHeight: 1.5,
                      color: 'var(--ink-muted)', margin: 0,
                    }}>{dd.stands}</p>
                  </div>

                  {dd.watch && (
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12px * var(--scale))', lineHeight: 1.45,
                      color: 'var(--clay)', margin: '9px 0 0', fontWeight: 700,
                    }}>{dd.watch}</p>
                  )}
                </div>
              )}
            </div>
            );
          })}
        </div>

        <Band tone="cream" title={g.craftT} style={{ marginTop: 20 }}>{g.craftB}</Band>

        <Band tone="labour" title="Adaptation standards" style={{ marginTop: 12 }}>
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {g.adapt.map((a: string) => (
              <li key={a} style={{ marginBottom: 6, lineHeight: 1.55 }}>{a}</li>
            ))}
          </ul>
        </Band>

        {/*
          labourT / labourB were in content.ts on two volumes and rendered
          nowhere - a whole band each, on who did the work. In a codex about
          food and liberation that was the wrong thing to leave in the file:
          the indenture volume explains that bunny chow's shape came from
          apartheid law, and the Italy volume names the caporalato system.
          Only two volumes carry it, so it is conditional.
        */}
        {g.labourT && (
          <Band tone="labour" title={g.labourT} style={{ marginTop: 12 }}>{g.labourB}</Band>
        )}

        <Band tone="forest" title="Sovereignty" style={{ marginTop: 12 }}>{g.sov}</Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== Pantry Codex (by ingredient) ===================== */

export function PantryCodexScreen() {
  const { go, goBack, set } = useStore();
  const vols = pantryVols as any[];
  const entryTotal = vols.reduce((a, v) => a + v.entries.length, 0);

  const openVol = (id: string) => { set({ pantryId: id }); go('pantryVol'); };

  return (
    <Screen>
      <header style={{
        background: 'linear-gradient(162deg, #3A2E17, #241C0E)',
        padding: '58px 18px 24px', color: 'var(--on-dark)',
        position: 'relative', overflow: 'hidden',
        borderRadius: '0 0 var(--r-header) var(--r-header)',
      }}>
        {/* the ochre diagonal stripe overlay the pantry ground carries */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, opacity: 0.16,
          background: stripes('#C79A45', 'transparent', 9),
        }} />
        <div style={{ position: 'relative' }}>
          <BackButton onDark onClick={goBack} />
        </div>
        <div style={{
          fontSize: 'calc(10.5px * var(--scale))', letterSpacing: 1.5, textTransform: 'uppercase',
          color: '#E3C88B', fontWeight: 800, marginTop: 14, position: 'relative',
        }}>Companion to the Foodways Codex</div>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(29px * var(--scale))', fontWeight: 600,
          margin: '5px 0 0', lineHeight: 1.1, position: 'relative',
        }}>Pantry Codex</h1>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55, marginTop: 12, position: 'relative',
        }}>
          The Foodways Codex asks what a dish always was. The Pantry Codex asks the same of the
          ingredient — where it was domesticated, who was paid for it, and which claims on the
          label the evidence actually carries.
        </p>
        <div style={{ display: 'flex', gap: 9, marginTop: 16, position: 'relative' }}>
          <HeaderStat n={String(vols.length)} l="ingredient volumes" />
          <HeaderStat n={String(entryTotal)} l="entries graded" />
          <HeaderStat n="6" l="claim tiers" />
        </div>
      </header>

      <Gutter style={{ paddingTop: 18 }}>
        <div style={{
          fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700,
          color: 'var(--ink-muted)', marginBottom: 9,
        }}>How every claim is graded</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 9 }}>
          {Object.keys(CLAIM_TIER).map((k) => (
            <TierBadge key={k} kind="claim" tierKey={k}
              style={{ fontSize: 'calc(11px * var(--scale))', fontWeight: 700, padding: '5px 11px', borderRadius: 16 }} />
          ))}
        </div>
        <p className="rs-prose" style={{
          fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-meta)',
          lineHeight: 1.5, marginBottom: 18, marginTop: 0,
        }}>
          Traditional use is knowledge, not a safety clearance — both go on the card. Where the
          research does not exist, the entry says “documentation gap” rather than generalising a
          tradition into place.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {vols.map((v) => (
            <VolumeCard
              key={v.id}
              swatch={stripes(v.c1, v.c2)}
              name={v.name}
              ev={v.ev}
              sub={v.sub}
              ink={v.ink}
              hook={v.hook}
              counts={`${v.entries.length} entries · ${v.fams.length} families · ${v.standards.length} claim standards`}
              onClick={() => openVol(v.id)}
            />
          ))}
        </div>

        <Band tone="forest" title="Safety-critical ingredients" style={{ marginTop: 20 }}>
          Cassava, ackee, kidney beans, wild mushrooms, sprouts, sea moss and soursop leaf each
          carry a warning tier that travels with them onto every recipe surface. No recipe screen
          in this app may show one of them without its fix.
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== A pantry volume ===================== */

export function PantryVolScreen() {
  const { state, goBack } = useStore();
  const vols = pantryVols as any[];
  const v = vols.find((x) => x.id === state.pantryId) ?? vols[0];

  return (
    <Screen>
      {/*
        The striped gradient stays as PhotoHeader's fallback, so a missing
        or still-loading file leaves this looking as it did before.
      */}
      <PhotoHeader
        src={volumeImage(v.id)}
        alt={v.name + ', illustration'}
        note={VOLUME_NOTE}
        c1={v.c1}
        c2={v.c2}
        back={goBack}
      />

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{
          fontSize: 'calc(10.5px * var(--scale))', letterSpacing: 1.5, textTransform: 'uppercase',
          color: 'var(--earth)', fontWeight: 800,
        }}>Pantry Codex</div>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(24px * var(--scale))', fontWeight: 600,
          lineHeight: 1.15, color: 'var(--ink)', margin: '4px 0 0',
        }}>{v.name}</h1>
        <div style={{
          fontSize: 'calc(12px * var(--scale))', color: textColour(v.ink), fontWeight: 700, marginTop: 4,
        }}>{v.sub}</div>
        <div style={{ marginTop: 9 }}><TierBadge kind="ev" tierKey={v.ev} /></div>

        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.6,
          color: 'var(--ink-muted)', marginTop: 12,
        }}>{v.lede}</p>

        <div style={{ marginTop: 16 }}><StatTiles stats={v.stats} /></div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))', fontWeight: 600,
          color: 'var(--ink)', margin: '24px 0 0',
        }}>{v.famT}</h2>
        <p className="rs-prose" style={{
          fontSize: 'calc(12.5px * var(--scale))', lineHeight: 1.55,
          color: 'var(--ink-muted)', marginTop: 6,
        }}>{v.famS}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
          {v.fams.map((f: any) => (
            <div key={f.z} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: 'calc(16.5px * var(--scale))',
                fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2,
              }}>{f.z}</div>
              <div style={{
                fontSize: 'calc(11.5px * var(--scale))', color: textColour(v.ink), fontWeight: 700, marginTop: 3,
              }}>{f.crops}</div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12.5px * var(--scale))', lineHeight: 1.5,
                color: 'var(--ink-muted)', margin: '6px 0 0',
              }}>{f.note}</p>
            </div>
          ))}
        </div>

        {/* Entries, each carrying a claim tier */}
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))', fontWeight: 600,
          color: 'var(--ink)', margin: '24px 0 12px',
        }}>{v.entries.length} entries</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {v.entries.map((e: any) => {
            /*
              Deliberately null for 13 of the 54 entries - concepts, hazard
              warnings and one declared gap. A card with no image here is the
              design, not a missing asset. See data/pantryImages.ts.
            */
            const img = pantryImage(v.id, e.n);
            return (
            <div key={e.n} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}>
              {img && (
                <img
                  src={img}
                  alt={e.n + ', illustration'}
                  loading="lazy"
                  decoding="async"
                  style={{
                    display: 'block', width: '100%', height: 92,
                    objectFit: 'cover', borderRadius: 'var(--r-tile)',
                    marginBottom: 10, background: 'var(--surface-2)',
                  }}
                />
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                <div style={{
                  fontFamily: 'var(--font-serif)', fontSize: 'calc(17px * var(--scale))',
                  fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2,
                }}>{e.n}</div>
                <TierBadge kind="claim" tierKey={e.cls} />
              </div>
              <div style={{
                fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
                fontWeight: 600, marginTop: 3, fontStyle: 'italic',
              }}>{e.p}</div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12.5px * var(--scale))', lineHeight: 1.5,
                color: 'var(--ink-muted)', margin: '6px 0 0',
              }}>{e.d}</p>
            </div>
            );
          })}
        </div>

        <Band tone="cream" title={v.craftT} style={{ marginTop: 20 }}>{v.craftB}</Band>

        <Band tone="safety" title={v.safeT} style={{ marginTop: 12 }}>{v.safeB}</Band>

        <Band tone="labour" title="Claim standards" style={{ marginTop: 12 }}>
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {v.standards.map((s: string) => (
              <li key={s} style={{ marginBottom: 6, lineHeight: 1.55 }}>{s}</li>
            ))}
          </ul>
        </Band>

        <Band tone="forest" title="Growing it here" style={{ marginTop: 12 }}>{v.grow}</Band>
      </Gutter>
    </Screen>
  );
}
