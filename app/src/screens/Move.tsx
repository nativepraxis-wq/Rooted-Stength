import type { ReactNode } from 'react';
import { traditionImage, farmMoveImage, FARM_MOVE_NOTE, warriorImage, WARRIOR_NOTE } from '../data/media';
import { farmMoveDepth, exerciseDetail } from '../data/moveDepth';
import { useStore } from '../state/store';
import { useSession, useMoveStats } from '../state/move';
import {
  movements, trainWeek, warriorDefs,
} from '../data/content';
import { DarkHeader } from '../components/Headers';
import { TierBadge } from '../components/TierBadge';
import { Screen, Gutter, Band, Chip, BackButton } from '../components/ui';

/*
  The session control shared by every Move screen. Green once logged, and it
  says how to undo — logging is reversible everywhere in this app.
*/
/* Small uppercase run-in label for the Move depth blocks. */
function MvLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
      letterSpacing: 1, textTransform: 'uppercase',
      color: 'var(--ink-meta)', marginBottom: 3,
    }}>{children}</div>
  );
}

export function SessionButton({ name, meta }: { name: string; meta: string }) {
  const s = useSession(name, meta);
  return (
    <button
      type="button"
      onClick={s.onClick}
      aria-pressed={s.logged}
      style={{
        width: '100%', border: '1px solid ' + (s.logged ? 'var(--leaf-mid)' : 'var(--border-2)'),
        background: s.logged ? '#E4EDDD' : 'var(--card-warm)',
        color: s.logged ? 'var(--leaf)' : 'var(--teal)',
        borderRadius: 14, padding: 14, minHeight: 44, cursor: 'pointer',
        fontSize: 'calc(13.5px * var(--scale))', fontWeight: 800,
      }}
    >{s.label}</button>
  );
}

function H3({ children }: { children: ReactNode }) {
  return (
    <h3 style={{
      fontFamily: 'var(--font-serif)', fontSize: 'calc(18px * var(--scale))',
      fontWeight: 600, color: 'var(--ink)', margin: '20px 0 9px',
    }}>{children}</h3>
  );
}

/* Small dark stat tile used in the Move headers. */
function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div style={{ flex: 1, minWidth: 0, background: 'rgba(244,237,223,0.13)', borderRadius: 14, padding: '11px 12px' }}>
      <div style={{
        fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
        fontWeight: 600, color: 'var(--ochre-light)',
      }}>{n}</div>
      <div style={{ fontSize: 'calc(10.5px * var(--scale))', lineHeight: 1.3, marginTop: 2 }}>{l}</div>
    </div>
  );
}

/* ===================== move — the hub ===================== */

export function MoveScreen() {
  const { state, set, go } = useStore();
  const stats = useMoveStats();

  const tiles = [
    { to: 'hike', title: 'Hiking plan', sub: 'Zone-2 · 5 mi ridge', ev: 'well' },
    { to: 'mobility', title: 'Mobility', sub: '12 min · joint-friendly', ev: 'well' },
    { to: 'breath', title: 'Breathwork', sub: 'Long-exhale reset', ev: 'emerging' },
    { to: 'seated', title: 'Seated & adaptive', sub: 'Chair-supported', ev: 'well' },
    { to: 'elder', title: 'Elder strength', sub: 'Functional · fall-safe', ev: 'well' },
    { to: 'ancestral', title: 'Ancestral movement', sub: 'Dance · rhythm · ritual', ev: 'trad' },
  ];

  return (
    <Screen>
      <DarkHeader eyebrow="Move" title="Land-based strength">
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Present-day sovereignty and skill — never romanticized labor.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <button
          type="button"
          onClick={() => go('sources')}
          style={{
            border: 'none', background: 'none', cursor: 'pointer', padding: 0, textAlign: 'left',
            fontSize: 'calc(12px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
          }}
        >Every session carries an evidence label. What they mean →</button>

        {/* What the profile is actually driving */}
        <div style={{
          marginTop: 12, background: 'var(--surface-1)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-card)', padding: 15,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              flex: 1, minWidth: 0, fontSize: 'calc(12.5px * var(--scale))',
              fontWeight: 700, color: 'var(--ink)',
            }}>{stats.goalSet ? 'Built for ' + stats.goalLabel : 'No goal set — showing the default session'}</span>
            <button
              type="button"
              onClick={() => { set({ profileReturn: 'move' }); go('ob2'); }}
              style={{
                border: 'none', background: 'none', cursor: 'pointer', minHeight: 44,
                fontSize: 'calc(11.5px * var(--scale))', fontWeight: 800, color: 'var(--earth)',
              }}
            >Adjust</button>
          </div>
          {stats.goalSet && stats.goal2Label && (
            <div style={{
              fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-muted)',
              marginTop: 2, lineHeight: 1.45,
            }}>
              Woven in as a secondary focus: <b style={{ color: 'var(--ink)' }}>{stats.goal2Label}</b>
            </div>
          )}
          <button
            type="button"
            onClick={() => go(stats.goalRoute as any)}
            style={{
              width: '100%', textAlign: 'left', marginTop: 10, cursor: 'pointer',
              border: '1px solid var(--border-2)', background: 'var(--card)',
              borderRadius: 12, padding: '11px 12px', minHeight: 44,
              fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, color: 'var(--teal)',
            }}
          >{stats.goalSet ? 'Start the matching session' : 'Start a session'} — {stats.goalSessionLabel} →</button>
          {/*
            Shown only once ob1's "Your days involve" has a real answer. When
            heavy work has stepped the offer down to mobility, this is what says
            so - the adjustment is stated, not made silently behind the user.
          */}
          {stats.daysSet && stats.loadNote && (
            <div style={{
              marginTop: 9, background: 'var(--surface-1)',
              border: '1px solid var(--border)', borderRadius: 12,
              padding: '10px 12px',
              fontSize: 'calc(11.5px * var(--scale))', lineHeight: 1.45,
              color: 'var(--ink-muted)',
            }}>
              <b style={{ color: 'var(--ink)' }}>{stats.workLabel}</b> — {stats.loadNote}
            </div>
          )}

          <div role="status" style={{
            fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
            fontWeight: 700, marginTop: 9,
          }}>{stats.movedWeekLabel}</div>
        </div>

        {/* Today's session */}
        <button
          type="button"
          onClick={() => go(stats.goalRoute as any)}
          style={{
            width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', marginTop: 12,
            background: 'linear-gradient(150deg, var(--forest), var(--forest-2))',
            color: 'var(--on-dark)', borderRadius: 'var(--r-card)', padding: '18px 16px',
          }}
        >
          <div style={{
            fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 1.6,
            textTransform: 'uppercase', color: 'var(--ochre-light)',
          }}>Today&rsquo;s session{stats.goalSessionMeta
            ? ' · ' + stats.goalSessionMeta.split(' · ')[0]
            : ''}</div>
          <div style={{
            fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))',
            fontWeight: 600, marginTop: 4,
          }}>{stats.goalSessionLabel}</div>
          {/*
            Rendered only where that screen has a session behind it. trainPlan
            and pregnancy have none, so this disappears rather than inventing a
            duration for them.
          */}
          {stats.goalSessionMeta && (
            <div style={{
              fontSize: 'calc(12.5px * var(--scale))', color: 'var(--on-dark-muted)',
              marginTop: 5,
            }}>{stats.goalSessionMeta}</div>
          )}
        </button>

        <div style={{ marginTop: 9 }}>
          <SessionButton
            name={stats.goalSessionLabel}
            meta={stats.goalSessionMeta || stats.goalSessionLabel}
          />
        </div>

        <button
          type="button"
          onClick={() => go('trainPlan')}
          style={{
            display: 'flex', width: '100%', gap: 12, alignItems: 'center', textAlign: 'left',
            marginTop: 12, background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-card)', padding: '14px 15px', cursor: 'pointer', minHeight: 44,
          }}
        >
          <span style={{ flex: 1 }}>
            <span style={{
              display: 'block', fontSize: 'calc(14px * var(--scale))',
              fontWeight: 700, color: 'var(--ink)',
            }}>Weekly training plan</span>
            <span style={{
              display: 'block', fontSize: 'calc(11.5px * var(--scale))',
              color: 'var(--ink-meta)', marginTop: 2,
            }}>Tue · Push &amp; carry — periodized week</span>
          </span>
          <span aria-hidden="true" style={{ fontSize: 17, color: 'var(--ink-meta)' }}>&#8250;</span>
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 9, marginTop: 12 }}>
          {tiles.map((t) => (
            <button
              key={t.to}
              type="button"
              onClick={() => go(t.to as any)}
              style={{
                textAlign: 'left', background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-card)', padding: 15, cursor: 'pointer',
                boxShadow: 'var(--shadow-card-light)', minHeight: 44,
              }}
            >
              <div style={{
                fontWeight: 700, fontSize: 'calc(14.5px * var(--scale))', color: 'var(--ink)',
              }}>{t.title}</div>
              <div style={{
                fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-soft)',
                marginTop: 2, lineHeight: 1.4,
              }}>{t.sub}</div>
              <div style={{ marginTop: 8 }}><TierBadge kind="ev" tierKey={t.ev} /></div>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go('warrior')}
          style={{
            display: 'flex', width: '100%', gap: 12, alignItems: 'center', textAlign: 'left',
            marginTop: 12, background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-card)', padding: '14px 15px', cursor: 'pointer', minHeight: 44,
          }}
        >
          <span style={{ flex: 1 }}>
            <span style={{
              display: 'block', fontSize: 'calc(14px * var(--scale))',
              fontWeight: 700, color: 'var(--ink)',
            }}>Ancestral Warrior Training</span>
            <span style={{
              display: 'block', fontSize: 'calc(11.5px * var(--scale))',
              color: 'var(--ink-meta)', marginTop: 2,
            }}>Zulu · Agojie · Capoeira · Maasai · Kalenda</span>
            <span style={{ display: 'inline-block', marginTop: 7 }}>
              <TierBadge kind="ev" tierKey="trad" />
            </span>
          </span>
          <span aria-hidden="true" style={{ fontSize: 17, color: 'var(--ink-meta)' }}>&#8250;</span>
        </button>

        <Band tone="cream" title="Training as ritual" style={{ marginTop: 14 }}>
          <div style={{ marginBottom: 10 }}>
            Lifting doesn&rsquo;t have to be a mirror sport. Open with breath, name what the session
            is for, move with rhythm, close with stillness — the same sets become practice instead
            of punishment.
          </div>
          <button
            type="button"
            onClick={() => go('garden')}
            style={{
              border: 'none', background: 'none', cursor: 'pointer', padding: 0,
              fontSize: 'calc(12px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
            }}
          >Tend the Strength Garden →</button>
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== farm ===================== */

export function FarmScreen() {
  const { set, go, goBack } = useStore();

  return (
    <Screen>
      <DarkHeader eyebrow="Farm-Fitness Library" title="Push &amp; Carry" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: '0 0 14px',
        }}>
          Real farm actions, trained with intention. Progress by adding distance or load — not by
          grinding yourself down.
        </p>
        <div style={{ display: 'flex', gap: 9 }}>
          <Stat n="350–700" l="cal / hr farm work" />
          <Stat n="420" l="farmer's walk cal/hr" />
          <Stat n="6.0" l="MET · vigorous" />
        </div>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {/*
            Said once for the list. These images show people under load, so the
            note points at the written cues rather than letting a generated
            picture be the authority on form. See data/media.ts.
          */}
          <div style={{
            fontSize: 'calc(11px * var(--scale))', color: 'var(--ink-meta)',
            fontWeight: 700, marginBottom: 10,
          }}>{FARM_MOVE_NOTE}</div>
          {(movements as any[]).map((m) => {
            const img = farmMoveImage(m.farm);
            return (
            <button
              key={m.farm}
              type="button"
              onClick={() => { set({ exMove: m.farm }); go('exercise'); }}
              style={{
                width: '100%', textAlign: 'left', background: 'var(--card)',
                border: '1px solid var(--border)', borderRadius: 'var(--r-tile)',
                padding: '13px 14px', cursor: 'pointer', minHeight: 44,
              }}
            >
              {img && (
                <img
                  src={img}
                  alt={m.farm + ' \u2014 ' + m.pattern + ', illustration'}
                  loading="lazy"
                  decoding="async"
                  style={{
                    display: 'block', width: '100%', height: 168,
                    objectFit: 'cover', borderRadius: 'var(--r-tile)',
                    marginBottom: 10, background: 'var(--surface-2)',
                  }}
                />
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 'calc(14.5px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
                }}>{m.farm}</span>
                <span aria-hidden="true" style={{ color: 'var(--ink-meta)' }}>→</span>
                <span style={{
                  fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, color: 'var(--teal)',
                }}>{m.pattern}</span>
                <span style={{ flex: 1 }} />
                <span aria-hidden="true" style={{ fontSize: 17, color: 'var(--ink-meta)' }}>&#8250;</span>
              </div>
              <div style={{
                fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-muted)', marginTop: 4,
              }}>{m.muscles}</div>
              <div style={{
                fontSize: 'calc(11px * var(--scale))', color: 'var(--ink-meta)',
                fontWeight: 600, marginTop: 6,
              }}>Beginner · Advanced · Seated option</div>
            </button>
            );
          })}
        </div>

        {/*
          Cueing for each of the six, from data/moveDepth.ts.

          It sits here as its own list rather than inside the grid buttons
          above, for two reasons: a paragraph of cueing inside a tap target is
          a bad control, and every one of those buttons currently navigates to
          the SAME generic hinge screen without recording which movement was
          tapped - so the detail screen cannot host per-movement text either.
          That navigation gap is noted rather than papered over.
        */}
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>How each one is performed</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {(movements as any[]).map((m) => {
            const d = farmMoveDepth[m.farm];
            if (!d) return null;
            return (
              <div key={m.farm} style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-tile)', padding: '13px 14px',
              }}>
                <div style={{
                  fontSize: 'calc(14px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
                }}>{m.farm}</div>
                <div style={{
                  fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700,
                  color: 'var(--ink-meta)', marginTop: 2,
                }}>{m.pattern}</div>

                <div style={{ marginTop: 9 }}>
                  <MvLabel>How to do it</MvLabel>
                  <p className="rs-prose" style={{
                    fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink)',
                    lineHeight: 1.55, margin: 0,
                  }}>{d.cue}</p>
                </div>
                <div style={{ marginTop: 9 }}>
                  <MvLabel>What it protects</MvLabel>
                  <p className="rs-prose" style={{
                    fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
                    lineHeight: 1.5, margin: 0,
                  }}>{d.purpose}</p>
                </div>
                {d.watch && (
                  <div style={{ marginTop: 9 }}>
                    <MvLabel>Common failure</MvLabel>
                    <p className="rs-prose" style={{
                      fontSize: 'calc(12px * var(--scale))', color: 'var(--clay)',
                      lineHeight: 1.5, margin: 0, fontWeight: 600,
                    }}>{d.watch}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Band tone="cream" title="The rotational core of farm work" style={{ marginTop: 16 }}>
          <div style={{ marginBottom: 10 }}>
            Real labor is rotation: hoeing, scything, tossing compost, twisting under load. Train it
            deliberately — chops, rotational throws and anti-rotation holds — so the spine turns
            through the hips instead of the low back. Two sets each, slow and controlled, before
            the carries.
          </div>
          <button
            type="button"
            onClick={() => go('trainPlan')}
            style={{
              border: 'none', background: 'none', cursor: 'pointer', padding: 0,
              fontSize: 'calc(12px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
            }}
          >Add rotational work to the week →</button>
        </Band>

        <Band tone="safety" title="Breathing" style={{ marginTop: 12 }}>
          Exhale on the lift; brace without breath-holding. Stop if you feel dizzy — noted for your
          profile.
        </Band>

        <div style={{ marginTop: 16 }}>
          <SessionButton name="Farm-Strength: Push & Carry" meta="42 min · loaded carry" />
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== exercise ===================== */

export function ExerciseScreen() {
  const { state, set, go, goBack } = useStore();

  const variants = [
    { id: 'beginner', label: 'Beginner' },
    { id: 'standard', label: 'Standard' },
    { id: 'seated', label: 'Seated' },
  ];

  /*
    This screen used to be hardcoded for the shovel lift - breadcrumb,
    heading, setup, cues, mistakes and variant text all hinge-specific -
    while all six farm cards navigated here. Tapping "Compost turning"
    showed shovel-lift instructions. It now reads whichever movement was
    tapped, from data/moveDepth.ts.

    The fallback is the shovel lift, which is what this screen always
    showed, so arriving without a selection behaves exactly as before.
  */
  const ex = exerciseDetail[state.exMove] ?? exerciseDetail['Shovel lift'];
  const cues = ex.cues;
  const mistakes = ex.mistakes;

  return (
    <Screen>
      {/* The demonstration slot. No video ships with the handoff, so this says so. */}
      <header style={{
        position: 'relative', height: 190, background: 'var(--forest-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ position: 'absolute', top: 58, left: 18 }}>
          <BackButton onDark onClick={goBack} />
        </div>
        <div style={{ textAlign: 'center', color: 'var(--on-dark-soft)' }}>
          <div style={{
            fontSize: 'calc(11px * var(--scale))', fontWeight: 800,
            letterSpacing: 1.6, textTransform: 'uppercase',
          }}>Demonstration video</div>
          <div style={{ fontSize: 'calc(11.5px * var(--scale))', marginTop: 4 }}>0:48 · captions</div>
        </div>
      </header>

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{
          display: 'flex', gap: 8, alignItems: 'center',
          fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700, color: 'var(--ink-meta)',
        }}>
          <span>{state.exMove}</span><span aria-hidden="true">&#8594;</span><span>{ex.pattern}</span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(24px * var(--scale))', fontWeight: 600,
          lineHeight: 1.15, color: 'var(--ink)', margin: '4px 0 0',
        }}>{ex.title}</h1>
        <div style={{
          display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 6,
          fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700, color: 'var(--ink-meta)',
        }}>
          {ex.meta.map((x) => <span key={x}>{x}</span>)}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 10,
        }}>
          <TierBadge kind="ev" tierKey="well" />
          <button
            type="button"
            onClick={() => go('sources')}
            style={{
              border: 'none', background: 'none', cursor: 'pointer', padding: 0,
              fontSize: 'calc(12px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
            }}
          >Hip-hinge mechanics &amp; load progression →</button>
        </div>

        {/*
          Three real variants, including a seated one. The seated option is a
          first-class version of the movement, not a consolation.
        */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
          {variants.map((v) => (
            <Chip
              key={v.id}
              selected={state.exVariant === v.id}
              color="var(--teal)"
              onClick={() => set({ exVariant: v.id })}
            >{v.label}</Chip>
          ))}
        </div>

        <Band tone="cream" title="This version" style={{ marginTop: 12 }}>
          {/*
            Per-movement now. The shovel lift's three strings are the
            originals from content.ts, moved verbatim into moveDepth.ts so
            nothing that shipped was reworded - see the header there.
          */}
          {(ex.variants as any)[state.exVariant]}
        </Band>

        <H3>Setup</H3>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.6,
          color: 'var(--ink-muted)', margin: 0,
        }}>
          {ex.setup}
        </p>

        <H3>Movement cues</H3>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {cues.map((c) => (
            <li key={c} className="rs-prose" style={{
              fontSize: 'calc(13px * var(--scale))', lineHeight: 1.6,
              color: 'var(--ink-muted)', marginBottom: 6,
            }}>{c}</li>
          ))}
        </ul>

        <div style={{ display: 'flex', gap: 9, marginTop: 16 }}>
          <div style={{
            flex: 1, minWidth: 0, background: 'var(--surface-1)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-tile)', padding: '11px 12px',
          }}>
            <div style={{
              fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--ink-meta)',
            }}>Muscles</div>
            <div style={{
              fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
              marginTop: 3, lineHeight: 1.45,
            }}>Glutes, hamstrings, spinal erectors; grip &amp; core brace.</div>
          </div>
          <div style={{
            flex: 1, minWidth: 0, background: 'var(--surface-1)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-tile)', padding: '11px 12px',
          }}>
            <div style={{
              fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--ink-meta)',
            }}>Breathing</div>
            <div style={{
              fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
              marginTop: 3, lineHeight: 1.45,
            }}>{ex.breath}</div>
          </div>
        </div>

        <H3>Common mistakes</H3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {mistakes.map((m) => (
            <div key={m} style={{ display: 'flex', gap: 9 }}>
              <span aria-hidden="true" style={{ color: 'var(--clay)', fontWeight: 800 }}>✕</span>
              <span style={{
                fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)', lineHeight: 1.5,
              }}>{m}</span>
            </div>
          ))}
        </div>

        <Band tone="cream" title="Equipment alternatives" style={{ marginTop: 16 }}>
          Shovel · sandbag · water bucket · kettlebell · resistance band anchored underfoot.
        </Band>

        <Band tone="safety" title="Injury cautions" style={{ marginTop: 12 }}>
          With low-back pain, start at the seated variation and load lightly. Sharp pain means
          stop — this builds strength, it shouldn&rsquo;t hurt.
        </Band>

        <Band tone="forest" title="Practical context" style={{ marginTop: 12 }}>
          This is the same hinge that saves your back digging beds or lifting a full harvest
          crate — training it is training for the land, not just the mirror.
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== trainPlan ===================== */

export function TrainPlanScreen() {
  const { state, set, go, goBack } = useStore();
  const week = trainWeek as any[];
  const day = week[state.trainDay] ?? week[0];

  return (
    <Screen>
      <DarkHeader eyebrow="Weekly training plan" title="Your movement week" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Strength, land work, trail and rest — periodized so hard days earn easy ones.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div className="rs-scroll" style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 4 }}>
          {week.map((d, i) => {
            const on = i === state.trainDay;
            return (
              <button
                key={d.day}
                type="button"
                onClick={() => set({ trainDay: i })}
                aria-pressed={on}
                style={{
                  flex: 'none', minWidth: 64, minHeight: 62, cursor: 'pointer',
                  borderRadius: 14, padding: '9px 6px',
                  border: '1px solid ' + (on ? d.accent : 'var(--border)'),
                  background: on ? d.accent : 'var(--card)',
                  color: on ? 'var(--on-dark)' : (d.today ? d.accent : 'var(--ink-muted)'),
                }}
              >
                <div style={{ fontSize: 'calc(12px * var(--scale))', fontWeight: 800 }}>{d.day}</div>
                <div style={{
                  fontSize: 'calc(9px * var(--scale))', marginTop: 2, opacity: 0.9, lineHeight: 1.2,
                }}>{d.label}</div>
                <div aria-hidden="true" style={{ fontSize: 9, marginTop: 2 }}>{d.done ? '●' : '○'}</div>
              </button>
            );
          })}
        </div>

        <div style={{
          marginTop: 14, background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-card)', padding: 16, boxShadow: 'var(--shadow-card)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            <div style={{
              fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
              fontWeight: 600, color: 'var(--ink)',
            }}>{day.day} · {day.label}</div>
            <div style={{
              fontSize: 'calc(12.5px * var(--scale))', fontWeight: 800, color: 'var(--ink-meta)',
            }}>{day.dur}</div>
          </div>
          <div style={{
            fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
            fontWeight: 700, marginTop: 3,
          }}>Focus: {day.focus}</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            {day.blocks.map((b: any) => (
              <button
                key={b.name}
                type="button"
                onClick={() => go(b.route)}
                style={{
                  display: 'flex', width: '100%', gap: 11, alignItems: 'center', textAlign: 'left',
                  background: 'var(--surface-1)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-tile)', padding: '12px 13px', cursor: 'pointer', minHeight: 44,
                }}
              >
                <span style={{ flex: 1 }}>
                  <span style={{
                    display: 'block', fontSize: 'calc(13.5px * var(--scale))',
                    fontWeight: 700, color: 'var(--ink)',
                  }}>{b.name}</span>
                  <span style={{
                    display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                    color: 'var(--ink-meta)', marginTop: 2,
                  }}>{b.meta}</span>
                  <span style={{ display: 'inline-block', marginTop: 7 }}>
                    <TierBadge kind="ev" tierKey={b.ev} />
                  </span>
                </span>
                <span aria-hidden="true" style={{ fontSize: 17, color: 'var(--ink-meta)' }}>&#8250;</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => go('warrior')}
          style={{
            display: 'flex', width: '100%', gap: 10, alignItems: 'center', textAlign: 'left',
            marginTop: 12, background: 'var(--surface-cream)', border: '1px solid var(--border-cream)',
            borderRadius: 'var(--r-band)', padding: '13px 14px', cursor: 'pointer', minHeight: 44,
          }}
        >
          <span style={{
            flex: 1, minWidth: 0, fontSize: 'calc(12.5px * var(--scale))',
            color: 'var(--ink-muted)', lineHeight: 1.45,
          }}>
            <b style={{ color: 'var(--ink)' }}>Warrior conditioning</b> — Zulu · Agojie · Capoeira
            drills to swap in
          </span>
          <span aria-hidden="true" style={{ fontSize: 17, color: 'var(--earth)' }}>&#8250;</span>
        </button>

        <Band tone="cream" title="Progressive overload" style={{ marginTop: 12 }}>
          Add load, distance or slower tempo before adding volume. This week&rsquo;s carries went
          from 150 to 200 ft — the Council nudges the next step when you&rsquo;re ready.
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== warrior ===================== */

export function WarriorScreen() {
  const { state, set, go, goBack } = useStore();
  const defs = warriorDefs as any[];
  const sel = defs.find((w) => w.id === state.warriorId) ?? defs[0];

  return (
    <Screen>
      <DarkHeader eyebrow="Move · warrior traditions" title="Ancestral Warrior Training" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Five fighting traditions of the diaspora, adapted for modern training — endurance,
          toughness, flow, spring and speed.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div className="rs-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {defs.map((w) => (
            <Chip
              key={w.id}
              selected={w.id === sel.id}
              color={w.c}
              onClick={() => set({ warriorId: w.id })}
            >{w.name}</Chip>
          ))}
        </div>

        {/*
          A contemporary practitioner performing the drill this screen prescribes -
          not a historical reenactment. The note under it says so plainly, because
          the difference between a modern person training and a staged depiction of
          a real people's ceremony is the whole point. See data/media.ts.
        */}
        <img
          src={warriorImage(sel.id)}
          alt={sel.name + ', trained today \u2014 illustration'}
          loading="lazy"
          decoding="async"
          style={{
            display: 'block', width: '100%', height: 176, objectFit: 'cover',
            borderRadius: 'var(--r-band)', marginTop: 14,
            background: 'var(--surface-2)',
          }}
        />
        <div style={{
          fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)',
          fontWeight: 700, marginTop: 6,
        }}>{WARRIOR_NOTE}</div>

        <div style={{
          marginTop: 14, background: sel.tint, borderRadius: 'var(--r-band)', padding: '15px 16px',
        }}>
          <div style={{
            fontSize: 'calc(11px * var(--scale))', letterSpacing: 1, textTransform: 'uppercase',
            fontWeight: 800, color: sel.c, marginBottom: 6,
          }}>{sel.origin}</div>
          <div className="rs-prose" style={{
            fontSize: 'calc(12.5px * var(--scale))', color: '#4C463A',
            fontWeight: 600, lineHeight: 1.5,
          }}>{sel.practice}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
          {sel.moves.map((mv: any) => (
            <div key={mv.name} style={{
              display: 'flex', gap: 10, alignItems: 'baseline',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '12px 13px',
            }}>
              <span style={{
                flex: 1, minWidth: 0, fontSize: 'calc(13.5px * var(--scale))',
                fontWeight: 700, color: 'var(--ink)',
              }}>{mv.name}</span>
              <span style={{
                fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700, color: 'var(--ink-meta)',
              }}>{mv.sets}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go('trainPlan')}
          style={{
            display: 'flex', width: '100%', gap: 10, alignItems: 'center', textAlign: 'left',
            marginTop: 12, background: 'var(--surface-cream)', border: '1px solid var(--border-cream)',
            borderRadius: 'var(--r-band)', padding: '13px 14px', cursor: 'pointer', minHeight: 44,
          }}
        >
          <span style={{
            flex: 1, minWidth: 0, fontSize: 'calc(12.5px * var(--scale))',
            color: 'var(--ink-muted)', lineHeight: 1.45,
          }}>
            <b style={{ color: 'var(--ink)' }}>Add to this week</b> — slot these drills into your
            training plan
          </span>
          <span aria-hidden="true" style={{ fontSize: 17, color: 'var(--earth)' }}>&#8250;</span>
        </button>

        <div style={{ marginTop: 12 }}>
          <SessionButton name={sel.name + ' drills'} meta={sel.origin + ' · warrior conditioning'} />
        </div>

        <Band tone="cream" title="Warrior fuel" style={{ marginTop: 14 }}>
          {/*
            The image lives here, in the fuel band, because the fuel is what it
            actually shows. These traditions belong to living peoples, so nothing
            figurative is generated for them - no faces, no costume, no weapons.
            Placing a foodways still under "Warrior fuel" is true; using one as a
            hero image for the tradition itself would not be.
          */}
          <img
            src={traditionImage(sel.id)}
            alt={'Foods of this tradition: ' + sel.fuel}
            loading="lazy"
            decoding="async"
            style={{
              display: 'block', width: '100%', height: 104,
              objectFit: 'cover', borderRadius: 'var(--r-tile)', marginBottom: 8,
            }}
          />
          <div style={{
            fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)',
            fontWeight: 700, marginBottom: 10,
          }}>Illustration of the foods, not a depiction of people</div>
          <div style={{ marginBottom: 10 }}>{sel.fuel}</div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => go('recipe')}
              style={{
                border: 'none', background: 'none', cursor: 'pointer', padding: 0,
                fontSize: 'calc(12px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
              }}
            >Build the plate →</button>
            <button
              type="button"
              onClick={() => go('mealPlan')}
              style={{
                border: 'none', background: 'none', cursor: 'pointer', padding: 0,
                fontSize: 'calc(12px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
              }}
            >Add to weekly meal plan →</button>
          </div>
        </Band>

        {/*
          Attribution is content, not a footnote — Content Rule 11. These are
          living traditions, and the app says where the drills came from.
        */}
        <Band tone="labour" title="Honor the source" style={{ marginTop: 12 }}>
          These are living traditions simplified into training drills, not costume — learn the full
          arts from their communities and teachers.
        </Band>
      </Gutter>
    </Screen>
  );
}
