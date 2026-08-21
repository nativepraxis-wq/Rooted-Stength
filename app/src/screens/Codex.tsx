import { codexRegions, codexFamilies, pantryVols } from '../data/content';
import { CLS_TIER, CLAIM_TIER } from '../data/tiers';
import { useStore } from '../state/store';
import { TierBadge } from '../components/TierBadge';
import { stripes } from '../components/Headers';
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
  const dishTotal = regions.reduce((a, g) => a + g.dishes.length, 0);

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
            onClick={() => go('sources')}
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

export function CodexRegionScreen() {
  const { state, goBack } = useStore();
  const g: Region = regionById(state.codexId) ?? (codexRegions as Region[])[0];

  return (
    <Screen>
      <header style={{ position: 'relative', height: 132, background: stripes(g.c1, g.c2, 12) }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(15,13,10,0.58), rgba(15,13,10,0.34))',
        }} />
        <div style={{ position: 'absolute', top: 58, left: 18 }}>
          <BackButton onDark onClick={goBack} />
        </div>
      </header>

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
          fontSize: 'calc(12px * var(--scale))', color: g.ink, fontWeight: 700, marginTop: 4,
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
          {g.zones.map((z: any) => (
            <div key={z.z} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: 'calc(16.5px * var(--scale))',
                fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2,
              }}>{z.z}</div>
              <div style={{
                fontSize: 'calc(11.5px * var(--scale))', color: g.ink, fontWeight: 700, marginTop: 3,
              }}>{z.crops}</div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12.5px * var(--scale))', lineHeight: 1.5,
                color: 'var(--ink-muted)', margin: '6px 0 0',
              }}>{z.note}</p>
            </div>
          ))}
        </div>

        {/* Dishes, each carrying its classification */}
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))', fontWeight: 600,
          color: 'var(--ink)', margin: '24px 0 12px',
        }}>{g.dishes.length} dishes profiled</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {g.dishes.map((d: any) => (
            <div key={d.n} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}>
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
            </div>
          ))}
        </div>

        <Band tone="cream" title={g.craftT} style={{ marginTop: 20 }}>{g.craftB}</Band>

        <Band tone="labour" title="Adaptation standards" style={{ marginTop: 12 }}>
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {g.adapt.map((a: string) => (
              <li key={a} style={{ marginBottom: 6, lineHeight: 1.55 }}>{a}</li>
            ))}
          </ul>
        </Band>

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
      <header style={{ position: 'relative', height: 132, background: stripes(v.c1, v.c2, 12) }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(15,13,10,0.58), rgba(15,13,10,0.34))',
        }} />
        <div style={{ position: 'absolute', top: 58, left: 18 }}>
          <BackButton onDark onClick={goBack} />
        </div>
      </header>

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
          fontSize: 'calc(12px * var(--scale))', color: v.ink, fontWeight: 700, marginTop: 4,
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
                fontSize: 'calc(11.5px * var(--scale))', color: v.ink, fontWeight: 700, marginTop: 3,
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
          {v.entries.map((e: any) => (
            <div key={e.n} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}>
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
          ))}
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
