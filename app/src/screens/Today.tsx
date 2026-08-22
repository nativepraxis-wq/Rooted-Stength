import { hubImage, HUB_NOTE } from '../data/media';
import { useStore } from '../state/store';
import { warriorDefs, saladDefs, teaGoalDefs, goalTeaMap, goalTeaLabel } from '../data/content';
import { Screen, Gutter } from '../components/ui';

/*
  Today. Every number on this screen is derived from the log set — plates,
  protein against the goal-derived target, water, streak — so logging anything
  anywhere in the app moves this screen too.
*/

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/* A rhythm card with the 12px section-coloured left stripe. */
function StripeCard({ stripe, eyebrow, title, sub, onClick, tag }: {
  stripe: string; eyebrow: string; title: string; sub: string;
  onClick: () => void; tag?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: '100%', textAlign: 'left', border: '1px solid var(--border)', cursor: 'pointer',
        background: 'var(--card)', borderRadius: 'var(--r-card)', padding: 0,
        overflow: 'hidden', boxShadow: 'var(--shadow-today)', display: 'flex',
      }}
    >
      <div aria-hidden="true" style={{ width: 12, flex: 'none', background: stripe }} />
      <div style={{ flex: 1, minWidth: 0, padding: '14px 15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
          <div style={{
            fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 1.2,
            textTransform: 'uppercase', color: stripe,
          }}>{eyebrow}</div>
          {tag && (
            <div style={{
              fontSize: 'calc(10px * var(--scale))', fontWeight: 800, color: 'var(--ink-meta)',
            }}>{tag}</div>
          )}
        </div>
        <div style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(17px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2, marginTop: 3,
        }}>{title}</div>
        <div className="rs-prose" style={{
          fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
          lineHeight: 1.45, marginTop: 4,
        }}>{sub}</div>
      </div>
    </button>
  );
}

export function TodayScreen() {
  const { state, go, proteinTarget, cupsOn } = useStore();

  const logs = state.logs as any[];
  const dayPlates = (d: number) => logs.filter((l) => l.kind === 'plate' && l.d === d);
  const platesToday = dayPlates(0);
  const proteinToday = Math.round(platesToday.reduce((t, p) => t + (p.p || 0), 0));
  const target = proteinTarget();
  const cupsToday = cupsOn(0);
  const movedToday = logs.some((l) => l.kind === 'move' && l.d === 0);

  /* Consecutive days back from today with at least one plate logged. */
  let streak = 0;
  while (streak < 14 && dayPlates(streak).length > 0) streak++;

  const tended = [
    movedToday,
    platesToday.length > 0,
    cupsToday >= 9,
    state.fermJars.some((j: any) => j.tasted),
    proteinToday >= target,
  ].filter(Boolean).length;

  const warrior = (warriorDefs as any[])[0];
  const salad = (saladDefs as any[])[0];
  const jar = (state.fermJars as any[])[0];
  const teaId = (goalTeaMap as any)[state.obGoal] || 'recovery';
  const teaGroup = (teaGoalDefs as any[]).find((g) => g.id === teaId) ?? (teaGoalDefs as any[])[0];

  const tiles = [
    { n: String(platesToday.length), label: 'plates logged', c: 'var(--leaf-mid)' },
    { n: proteinToday + 'g', label: 'protein of ' + target + 'g', c: 'var(--earth)' },
    { n: String(cupsToday), label: 'cups of water', c: 'var(--teal)' },
  ];

  const soFar = (movedToday ? 'Session logged' : 'No session logged yet')
    + ' · ' + (proteinToday >= target ? 'protein target met' : (target - proteinToday) + 'g protein to go')
    + ' · ' + streak + '-day plate streak';

  return (
    <Screen>
      {/* Dark hero */}
      <header style={{
        background: 'linear-gradient(160deg, var(--forest), var(--forest-2))',
        borderRadius: '0 0 var(--r-header) var(--r-header)',
        padding: '54px 20px 24px', color: 'var(--on-dark)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', top: -70, right: -54, width: 220, height: 220,
          borderRadius: '50%', border: '1px solid rgba(199,154,69,0.18)',
        }} />
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          gap: 12, position: 'relative',
        }}>
          <div>
            <div style={{
              fontSize: 'calc(11px * var(--scale))', letterSpacing: 1.8, textTransform: 'uppercase',
              color: 'var(--ochre-light)', fontWeight: 700,
            }}>{DAYS[new Date().getDay()]}</div>
            <h1 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'calc(29px * var(--scale))',
              fontWeight: 600, lineHeight: 1.1, margin: '6px 0 0',
            }}>Good morning{state.obName ? ',' : ''}{state.obName
              ? <><br />{state.obName}</>
              : ''}</h1>
          </div>
          <button
            type="button"
            aria-label="Your profile"
            onClick={() => go('profile')}
            style={{
              width: 44, height: 44, flex: 'none', borderRadius: '50%', border: 'none',
              background: 'var(--ochre)', color: 'var(--forest)', cursor: 'pointer',
              fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))', fontWeight: 600,
            }}
          >A</button>
        </div>
      </header>
      {/*
        Hub image only. The sub-screens under this tab show the user's own
        record, and a stock photograph there would compete with their data -
        on the scan flow it could even be mistaken for their own meal photo.
      */}
      <img
        src={hubImage('today')}
        alt={'A morning at the counter, illustration'}
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

      <Gutter style={{ paddingTop: 16 }}>
        {/* Today so far — computed, tappable through to history */}
        <button
          type="button"
          onClick={() => go('progress')}
          style={{
            width: '100%', textAlign: 'left', cursor: 'pointer', background: 'var(--card)',
            border: '1px solid var(--border)', borderRadius: 'var(--r-card)', padding: 15,
            boxShadow: 'var(--shadow-today)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
            <div style={{
              fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 1.4,
              textTransform: 'uppercase', color: 'var(--ink-meta)',
            }}>Today so far</div>
            <span style={{
              fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700, color: 'var(--clay)',
            }}>Progress &amp; history →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 9, marginTop: 10 }}>
            {tiles.map((t) => (
              <div key={t.label} style={{
                background: 'var(--surface-1)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-tile)', padding: '10px 11px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-serif)', fontSize: 'calc(18px * var(--scale))',
                  fontWeight: 600, color: t.c, lineHeight: 1.15,
                }}>{t.n}</div>
                <div style={{
                  fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)',
                  marginTop: 2, lineHeight: 1.3,
                }}>{t.label}</div>
              </div>
            ))}
          </div>
          <div style={{
            fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
            fontWeight: 600, marginTop: 9,
          }}>{soFar}</div>
        </button>

        {/* Rhythm */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          margin: '22px 0 10px',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))',
            fontWeight: 600, color: 'var(--ink)', margin: 0,
          }}>Today&rsquo;s rhythm</h2>
          <span style={{
            fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700, color: 'var(--ink-meta)',
          }}>{tended} of 5 tended</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <StripeCard
            stripe="var(--teal)"
            eyebrow="Move · 42 min"
            title="Farm-Strength: Push &amp; Carry"
            sub="Shovel lift · loaded carry · row · hinge"
            tag={movedToday ? 'logged' : undefined}
            onClick={() => go('farm')}
          />
          <StripeCard
            stripe="var(--clay)"
            eyebrow="Nourish"
            title="The Complete Rooted Plate"
            sub={proteinToday >= target
              ? 'Protein target met — ' + proteinToday + 'g of ' + target + 'g'
              : (target - proteinToday) + 'g of protein still to go today'}
            onClick={() => go('nourish')}
          />
          <StripeCard
            stripe="var(--plum)"
            eyebrow="Recovery"
            title="Breathwork &amp; mobility reset"
            sub="Long-exhale breath, evening protein, screens down for repair sleep."
            onClick={() => go('breath')}
          />
          {warrior && (
            <StripeCard
              stripe="var(--earth)"
              eyebrow="Warrior drill of the day"
              title={warrior.name}
              sub={warrior.sub || warrior.d || ''}
              onClick={() => go('warrior')}
            />
          )}
          {teaGroup && (
            <StripeCard
              stripe="var(--plum)"
              eyebrow="Tonight's cup"
              title={(state.obGoalSet && (goalTeaLabel as any)[state.obGoal]) || teaGroup.name}
              sub={teaGroup.sub || (state.obGoalSet
                ? 'Brewed by goal, with every safety flag shown rather than hidden.'
                : 'Every safety flag shown rather than hidden.')}
              onClick={() => go('teaIntel')}
            />
          )}
          {salad && (
            <StripeCard
              stripe="var(--leaf-mid)"
              eyebrow="Microgreen farm"
              title={'Salad of the day · ' + salad.name}
              sub={salad.sub || salad.d || ''}
              onClick={() => go('microgreens')}
            />
          )}
          {jar && (
            <StripeCard
              stripe={jar.c}
              eyebrow="Fermentation jar"
              title={jar.name}
              sub={'Day ' + jar.day + ' of ' + jar.target + (jar.tasted ? ' · tasted' : ' · not tasted yet')}
              onClick={() => go('ferment')}
            />
          )}
          <StripeCard
            stripe="var(--teal)"
            eyebrow="Hydration"
            title={cupsToday + ' of 9 cups'}
            sub={cupsToday >= 9
              ? 'Target met — keep sipping on a hot afternoon.'
              : (9 - cupsToday) + ' more cups today. Target rises on farm and trail days.'}
            onClick={() => go('hydration')}
          />
          <StripeCard
            stripe="var(--indigo)"
            eyebrow="Eat for today's state"
            title="Nutrient Frequencies"
            sub="Which band today asks for, and what to build the plate around."
            onClick={() => go('frequencies')}
          />
        </div>

        {/* Strength Garden */}
        <button
          type="button"
          onClick={() => go('garden')}
          style={{
            width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', marginTop: 14,
            background: 'linear-gradient(150deg, #2F4A31, #1E3A2B 60%, #14231A)',
            color: 'var(--on-dark)', borderRadius: 'var(--r-card)', padding: '18px 16px',
          }}
        >
          <div style={{
            fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 1.6,
            textTransform: 'uppercase', color: 'var(--ochre-light)',
          }}>Your Strength Garden</div>
          <div style={{
            fontFamily: 'var(--font-serif)', fontSize: 'calc(22px * var(--scale))',
            fontWeight: 600, marginTop: 4,
          }}>Season 3</div>
          <p className="rs-prose" style={{
            fontSize: 'calc(12.5px * var(--scale))', lineHeight: 1.5,
            color: 'var(--on-dark-muted)', margin: '6px 0 0',
          }}>
            The garden grows from what you tend, not from what you weigh.
          </p>
        </button>
      </Gutter>
    </Screen>
  );
}
