import type { ReactNode } from 'react';
import { useStore } from '../state/store';
import {
  obGoals, obRestrList, obTradList, consentList, goalFreqMap, freqBandDefs, teaGoalDefs,
} from '../data/content';

/*
  Seven onboarding steps. Two rules from the handoff shape every screen here:

  1. Every question is skippable and revisitable. The recap links back into each
     step, and profile edits re-enter the same screens with `profileReturn` set
     so "Continue" becomes "Done — back to your plan".
  2. Nothing is silently filtered. Herb safety flags brews *with the reason
     shown*; they are never quietly dropped from a list.
*/

const PAD = '64px 22px 36px';

function Progress({ step }: { step: number }) {
  return (
    <div style={{ flex: 1, display: 'flex', gap: 5 }} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{
          flex: 1, height: 4, borderRadius: 3,
          background: i <= step ? 'var(--forest)' : 'var(--border)',
        }} />
      ))}
    </div>
  );
}

function StepHeader({ step, onBack, editing }: { step: number; onBack: () => void; editing?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
      <button
        type="button"
        aria-label="Go back"
        onClick={onBack}
        className="rs-hit"
        style={{
          border: 'none', background: 'var(--surface-3)', color: 'var(--ink-body)',
          width: 34, height: 34, borderRadius: '50%', fontSize: 17, cursor: 'pointer', flex: 'none',
        }}
      ><span aria-hidden="true">&#8249;</span></button>
      {editing
        ? <div style={{
            flex: 1, fontSize: 'calc(12px * var(--scale))', fontWeight: 800,
            letterSpacing: 1, textTransform: 'uppercase', color: 'var(--earth)',
          }}>{editing}</div>
        : <Progress step={step} />}
    </div>
  );
}

function ObScreen({ children }: { children: ReactNode }) {
  return (
    <div style={{
      animation: 'rs-fade var(--dur-route) ease', minHeight: '100%',
      display: 'flex', flexDirection: 'column', padding: PAD,
    }}>{children}</div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <h1 style={{
      fontFamily: 'var(--font-serif)', fontSize: 'calc(25px * var(--scale))',
      fontWeight: 600, margin: '0 0 6px', color: 'var(--ink)',
    }}>{children}</h1>
  );
}

function Sub({ children }: { children: ReactNode }) {
  return (
    <p className="rs-prose" style={{
      fontSize: 'calc(13.5px * var(--scale))', color: 'var(--ink-soft)',
      margin: '0 0 22px', lineHeight: 1.5,
    }}>{children}</p>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700,
      color: 'var(--ink-muted)', marginBottom: 8,
    }}>{children}</div>
  );
}

function Why({ children }: { children: ReactNode }) {
  return (
    <p className="rs-prose" style={{
      fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-soft)',
      lineHeight: 1.5, margin: 0,
    }}>{children}</p>
  );
}

/* Onboarding pill. Uses clay rather than the section colour, as the prototype does. */
function ObChip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      style={{
        border: on ? '1px solid var(--forest)' : '1px solid var(--border-2)',
        background: on ? 'var(--forest)' : 'var(--card)',
        color: on ? 'var(--on-dark)' : 'var(--ink-muted)',
        borderRadius: 20, padding: '9px 15px', minHeight: 44,
        fontSize: 'calc(13px * var(--scale))', fontWeight: 700, cursor: 'pointer',
      }}
    >{children}</button>
  );
}

function NextButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} style={{
      width: '100%', border: 'none', background: 'var(--forest)', color: 'var(--on-dark)',
      borderRadius: 16, padding: 16, fontSize: 'calc(15px * var(--scale))',
      fontWeight: 700, cursor: 'pointer', marginTop: 24, minHeight: 44,
    }}>{children}</button>
  );
}

/* Shared: when a profile edit sent us here, finishing returns to the caller. */
function useObFlow() {
  const { state, set, go } = useStore();
  const editing = !!state.profileReturn;
  const nextLabel = editing ? 'Done — back to your plan' : 'Continue';
  const leave = (fallback: string) => {
    const back = state.profileReturn;
    if (back) { set({ profileReturn: null }); go(back); } else { go(fallback as any); }
  };
  return { editing, nextLabel, leave };
}

/* ===================== welcome ===================== */

export function WelcomeScreen() {
  const { go } = useStore();
  return (
    <div style={{
      animation: 'rs-fade 0.4s ease', minHeight: '100%',
      background: 'linear-gradient(170deg,#1E3A2B 0%,#16281D 70%,#12211A 100%)',
      display: 'flex', flexDirection: 'column', padding: '80px 28px 44px',
      color: '#F4EDDF', position: 'relative', overflow: 'hidden',
    }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', border: '1px solid rgba(199,154,69,0.16)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 20, right: 20, width: 160, height: 160, borderRadius: '50%', border: '1px solid rgba(199,154,69,0.12)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: -80, left: -40, width: 240, height: 240, borderRadius: '50%', border: '1px solid rgba(143,179,122,0.14)' }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div aria-hidden="true" style={{
          width: 64, height: 64, borderRadius: '50%', background: 'rgba(199,154,69,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 26,
        }}>
          <div style={{
            width: 14, height: 26,
            borderRadius: '50% 50% 50% 50% / 62% 62% 38% 38%',
            background: '#C79A45', transformOrigin: 'bottom',
            animation: 'rs-grow 1.2s ease both',
          }} />
        </div>
        <div style={{ fontSize: 'calc(11px * var(--scale))', letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>
          Root Life · Native Praxis
        </div>
        <div style={{ fontSize: 'calc(12px * var(--scale))', letterSpacing: 3, textTransform: 'uppercase', color: '#D4AA5C', fontWeight: 700, marginBottom: 12 }}>
          Rooted Strength
        </div>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(34px * var(--scale))',
          fontWeight: 600, margin: 0, lineHeight: 1.18,
        }}>
          Plant-based muscle.<br />Ancestral food.<br />Land-based fitness.
        </h1>
        <p className="rs-prose" style={{
          fontSize: 'calc(15px * var(--scale))', lineHeight: 1.6, margin: '18px 0 0', maxWidth: 290,
        }}>
          Build a body capable of feeding, protecting, carrying, creating, loving and serving the village.
        </p>
        <div className="rs-prose" style={{
          fontSize: 'calc(11.5px * var(--scale))', lineHeight: 1.5, marginTop: 16, maxWidth: 300,
        }}>
          From coastal Connecticut and NYC to Florida, the Carolinas, Zanzibar, Jamaica, Costa Rica,
          Cuba and Trinidad.
        </div>
      </div>

      <button type="button" onClick={() => go('ob1')} style={{
        width: '100%', border: 'none', background: '#C79A45', color: '#1E3A2B',
        borderRadius: 18, padding: 17, fontSize: 'calc(16px * var(--scale))',
        fontWeight: 800, cursor: 'pointer', minHeight: 44,
      }}>Begin</button>
      <button type="button" onClick={() => go('today')} style={{
        width: '100%', border: 'none', background: 'none', color: '#F4EDDF',
        padding: '15px 0 0', fontSize: 'calc(13.5px * var(--scale))',
        fontWeight: 600, cursor: 'pointer', minHeight: 44,
      }}>Skip for now — explore first</button>
    </div>
  );
}

/* ===================== ob1 — about you ===================== */

const PRONOUNS = ['she/her', 'he/him', 'they/them', 'prefer not to say'];

export function Ob1Screen() {
  const { state, set, go } = useStore();
  return (
    <ObScreen>
      <StepHeader step={1} onBack={() => go('welcome')} />
      <Title>First — who are we growing with?</Title>
      <Sub>Every question can be skipped and revisited later.</Sub>

      <FieldLabel>Your name</FieldLabel>
      <div style={{
        background: 'var(--card)', border: '1px solid var(--border-2)', borderRadius: 14,
        padding: '14px 16px', fontSize: 'calc(15px * var(--scale))', fontWeight: 600,
        color: 'var(--ink)', marginBottom: 16,
      }}>Amara</div>

      <FieldLabel>Pronouns</FieldLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 6 }}>
        {PRONOUNS.map((p) => (
          <ObChip key={p} on={state.obPronoun === p} onClick={() => set({ obPronoun: p })}>{p}</ObChip>
        ))}
      </div>
      <div style={{ marginBottom: 18 }}>
        <Why>
          Gender identity is separate from any physiology questions — those come later, are
          optional, and only shape nutrition if you want them to.
        </Why>
      </div>

      <FieldLabel>Your days involve</FieldLabel>
      <div style={{
        background: 'var(--card)', border: '1px solid var(--border-2)', borderRadius: 14,
        padding: '14px 16px', fontSize: 'calc(14px * var(--scale))', color: 'var(--ink)',
        marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontWeight: 600 }}>Farm &amp; garden work, 3 days/week</span>
        <span aria-hidden="true" style={{ color: 'var(--ink-meta)' }}>▾</span>
      </div>
      <Why>
        Why we ask: physical labor counts as training — plans adjust so you&rsquo;re not overworked
        on farm days.
      </Why>

      <div style={{ flex: 1 }} />
      <NextButton onClick={() => go('ob2')}>Continue</NextButton>
    </ObScreen>
  );
}

/* ===================== ob2 — goals ===================== */

export function Ob2Screen() {
  const { state, set, go } = useStore();
  const { editing, nextLabel, leave } = useObFlow();
  const bands = freqBandDefs as any[];
  const band = bands.find((b) => b.id === (goalFreqMap as any)[state.obGoal]) ?? bands[0];

  const pickPrimary = (id: string) => set((s) => ({
    obGoal: id,
    obGoal2: s.obGoal2 === id ? null : s.obGoal2,
    freqBand: (goalFreqMap as any)[id] || 'grounding',
  }));

  return (
    <ObScreen>
      <StepHeader step={2} onBack={() => leave('ob1')} editing={editing ? 'Editing your goals' : undefined} />
      <Title>What are you building toward?</Title>
      <Sub>Pick a primary goal, and optionally a secondary focus to weave in.</Sub>

      <FieldLabel>Primary goal</FieldLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
        {(obGoals as any[]).map((g) => (
          <ObChip key={g.id} on={state.obGoal === g.id} onClick={() => pickPrimary(g.id)}>{g.label}</ObChip>
        ))}
      </div>

      <div style={{
        display: 'flex', gap: 10, alignItems: 'center', marginTop: 14,
        background: 'var(--surface-1)', border: '1px solid var(--border)',
        borderRadius: 14, padding: '12px 13px',
      }}>
        <div aria-hidden="true" style={{
          width: 10, height: 10, borderRadius: '50%', flex: 'none', background: band.c || 'var(--ochre)',
        }} />
        <div style={{ fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)', lineHeight: 1.45 }}>
          Tunes your Nutrient Frequency to <b style={{ color: 'var(--ink)' }}>{band.name}</b> · {band.state}
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <FieldLabel>
          Secondary focus{' '}
          <span style={{ fontWeight: 600, color: 'var(--ink-meta)' }}>· optional, tap again to clear</span>
        </FieldLabel>
      </div>
      <div style={{ marginBottom: 10 }}>
        <Why>
          Woven into your week without competing with the main goal — e.g. muscle growth with
          farm-stamina days.
        </Why>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
        {(obGoals as any[]).filter((g) => g.id !== state.obGoal).map((g) => (
          <ObChip
            key={g.id}
            on={state.obGoal2 === g.id}
            onClick={() => set((s) => ({ obGoal2: s.obGoal2 === g.id ? null : g.id }))}
          >{g.label}</ObChip>
        ))}
      </div>

      <div style={{
        marginTop: 18, background: 'var(--surface-cream)', border: '1px solid var(--border-cream)',
        borderRadius: 16, padding: 14,
      }}>
        <div className="rs-prose" style={{
          fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)', lineHeight: 1.55,
        }}>
          No goal here is about shrinking yourself. Muscle, function and vitality — at every age and
          every body.
        </div>
      </div>

      <div style={{ flex: 1 }} />
      <NextButton onClick={() => leave('ob3')}>{nextLabel}</NextButton>
    </ObScreen>
  );
}

/* ===================== ob3 — food ===================== */

export function Ob3Screen() {
  const { state, set, go } = useStore();
  const { editing, nextLabel, leave } = useObFlow();

  return (
    <ObScreen>
      <StepHeader step={3} onBack={() => leave('ob2')} editing={editing ? 'Editing your food profile' : undefined} />
      <Title>How does your table eat?</Title>
      <Sub>Restrictions are respected in every recipe, plan and restaurant suggestion.</Sub>

      <FieldLabel>Restrictions &amp; needs</FieldLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 20 }}>
        {(obRestrList as any[]).map((x) => (
          <ObChip
            key={x.id}
            on={!!state.obRestr[x.id]}
            onClick={() => set((s) => ({ obRestr: { ...s.obRestr, [x.id]: !s.obRestr[x.id] } }))}
          >{x.label}</ObChip>
        ))}
      </div>

      <FieldLabel>Food traditions that feel like home</FieldLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 10 }}>
        {(obTradList as any[]).map((x) => (
          <ObChip
            key={x.id}
            on={!!state.obTrad[x.id]}
            onClick={() => set((s) => ({ obTrad: { ...s.obTrad, [x.id]: !s.obTrad[x.id] } }))}
          >{x.label}</ObChip>
        ))}
      </div>
      <Why>
        Why we ask: recipes lead with the foodways you love — never a beige &ldquo;default&rdquo; diet.
      </Why>

      <div style={{ flex: 1 }} />
      <NextButton onClick={() => leave('obHerb')}>{nextLabel}</NextButton>
    </ObScreen>
  );
}

/* ===================== obHerb — herb safety ===================== */

const SAFETY_ROWS = [
  { k: 'pregnant', label: 'Pregnant or nursing', sub: 'Flags herbs traditionally avoided in pregnancy' },
  { k: 'bp', label: 'Blood-pressure medication', sub: 'Flags herbs that can lower pressure further' },
  { k: 'thinners', label: 'Blood thinners', sub: 'Flags herbs that affect clotting' },
];

export function ObHerbScreen() {
  const { state, set } = useStore();
  const { editing, nextLabel, leave } = useObFlow();

  /*
    Count how many brews the current safety profile flags. The count is shown
    because the handoff forbids silently hiding anything: flagged brews are
    sorted last and labelled with the reason, never removed from the list.
  */
  const on = Object.keys(state.teaSafety).filter((k) => state.teaSafety[k]);
  const flaggedCount = (teaGoalDefs as any[]).reduce(
    (t, g) => t + g.teas.filter((x: any) => (x.avoid || []).some((a: string) => on.includes(a))).length,
    0,
  );
  const flagLine = on.length === 0
    ? 'No safety filters on — every brew is shown'
    : flaggedCount + (flaggedCount === 1 ? ' brew flagged' : ' brews flagged')
      + ' for your safety profile · shown last, never hidden';

  return (
    <ObScreen>
      <StepHeader step={4} onBack={() => leave('ob3')} editing={editing ? 'Editing herb safety' : undefined} />
      <Title>Anything the herbs should know?</Title>
      <Sub>
        Teas and tonics interact with bodies and medications. Tell us what applies and brews get
        flagged with the reason — never silently removed.
      </Sub>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {SAFETY_ROWS.map((r) => {
          const isOn = !!state.teaSafety[r.k];
          return (
            <button
              key={r.k}
              type="button"
              role="switch"
              aria-checked={isOn}
              onClick={() => set((s) => ({ teaSafety: { ...s.teaSafety, [r.k]: !isOn } }))}
              style={{
                display: 'flex', width: '100%', gap: 12, alignItems: 'center', textAlign: 'left',
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-tile)', padding: '13px 14px', cursor: 'pointer', minHeight: 44,
              }}
            >
              <span style={{ flex: 1 }}>
                <span style={{ display: 'block', fontSize: 'calc(13.5px * var(--scale))', fontWeight: 700, color: 'var(--ink)' }}>{r.label}</span>
                <span style={{ display: 'block', fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)', marginTop: 3, lineHeight: 1.45 }}>{r.sub}</span>
              </span>
              <span aria-hidden="true" style={{
                flex: 'none', width: 44, height: 26, borderRadius: 999, position: 'relative',
                background: isOn ? 'var(--clay)' : 'var(--border-2)',
              }}>
                <span style={{
                  position: 'absolute', top: 3, left: isOn ? 21 : 3, width: 20, height: 20,
                  borderRadius: '50%', background: '#FFFDF7', transition: 'left 0.18s ease',
                }} />
              </span>
            </button>
          );
        })}
      </div>

      <div role="status" style={{
        marginTop: 12, fontSize: 'calc(12px * var(--scale))',
        fontWeight: 700, color: 'var(--clay)',
      }}>{flagLine}</div>

      <div style={{
        marginTop: 16, background: 'var(--safety-bg)', border: '1px solid var(--border-rose)',
        borderRadius: 16, padding: 14,
      }}>
        <div className="rs-prose" style={{
          fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)', lineHeight: 1.55,
        }}>
          None of this is medical advice, and skipping it is fine — you can set it any time from
          your first cup of tea. When in doubt, ask the person who prescribes for you.
        </div>
      </div>

      <div style={{ flex: 1 }} />
      <NextButton onClick={() => leave('consent')}>{nextLabel}</NextButton>
    </ObScreen>
  );
}

/* ===================== consent ===================== */

export function ConsentScreen() {
  const { state, set, go } = useStore();
  return (
    <ObScreen>
      <StepHeader step={5} onBack={() => go('obHerb')} />
      <Title>Your data, your land</Title>
      <Sub>
        Everything below is granular and revocable. Health data is encrypted, never sold, never
        used for ads.
      </Sub>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {(consentList as any[]).map((c) => {
          const isOn = !!state.consent[c.id];
          return (
            <button
              key={c.id}
              type="button"
              role="switch"
              aria-checked={isOn}
              onClick={() => set((s) => ({ consent: { ...s.consent, [c.id]: !isOn } }))}
              style={{
                display: 'flex', width: '100%', gap: 12, alignItems: 'center', textAlign: 'left',
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-tile)', padding: '13px 14px', cursor: 'pointer', minHeight: 44,
              }}
            >
              <span style={{ flex: 1 }}>
                <span style={{ display: 'block', fontSize: 'calc(13.5px * var(--scale))', fontWeight: 700, color: 'var(--ink)' }}>{c.label}</span>
                <span style={{ display: 'block', fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)', marginTop: 3, lineHeight: 1.45 }}>{c.sub}</span>
              </span>
              <span aria-hidden="true" style={{
                flex: 'none', width: 44, height: 26, borderRadius: 999, position: 'relative',
                background: isOn ? 'var(--leaf-mid)' : 'var(--border-2)',
              }}>
                <span style={{
                  position: 'absolute', top: 3, left: isOn ? 21 : 3, width: 20, height: 20,
                  borderRadius: '50%', background: '#FFFDF7', transition: 'left 0.18s ease',
                }} />
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => go('dataSov')}
        style={{
          border: 'none', background: 'none', cursor: 'pointer', padding: '14px 0 0',
          fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
          textAlign: 'left',
        }}
      >Where your data physically lives →</button>

      <div style={{ flex: 1 }} />
      <NextButton onClick={() => go('obRecap')}>Continue</NextButton>
    </ObScreen>
  );
}

/* ===================== obRecap ===================== */

export function ObRecapScreen() {
  const { state, set, go } = useStore();
  const goalLabel = (id: string) => (obGoals as any[]).find((g) => g.id === id)?.label;
  const bands = freqBandDefs as any[];
  const band = bands.find((b) => b.id === (goalFreqMap as any)[state.obGoal]) ?? bands[0];

  const restrOn = (obRestrList as any[]).filter((x) => state.obRestr[x.id]).map((x) => x.label);
  const tradOn = (obTradList as any[]).filter((x) => state.obTrad[x.id]).map((x) => x.label);
  const safetyOn = SAFETY_ROWS.filter((r) => state.teaSafety[r.k]).map((r) => r.label);
  const grantsOn = (consentList as any[]).filter((c) => state.consent[c.id]).map((c) => c.label);

  /* Each answer is echoed back with its downstream effect, and stays editable. */
  const rows = [
    {
      to: 'ob1', label: 'Who you are',
      value: 'Amara · ' + state.obPronoun,
      effect: 'Names and pronouns are used throughout; physiology questions stay optional.',
    },
    {
      to: 'ob2', label: 'What you are building toward',
      value: goalLabel(state.obGoal) + (state.obGoal2 ? ' · with ' + goalLabel(state.obGoal2) : ''),
      effect: 'Sets your protein target and tunes your Nutrient Frequency to ' + band.name + '.',
    },
    {
      to: 'ob3', label: 'How your table eats',
      value: (restrOn.length ? restrOn.join(' · ') : 'No restrictions set')
        + (tradOn.length ? ' — ' + tradOn.join(' · ') : ''),
      effect: restrOn.length
        ? 'Plates that conflict are counted and listed with the reason, never silently dropped.'
        : 'Every plate is shown. You can add restrictions at any time.',
    },
    {
      to: 'obHerb', label: 'What the herbs should know',
      value: safetyOn.length ? safetyOn.join(' · ') : 'Nothing flagged',
      effect: safetyOn.length
        ? 'Affected brews are shown last, labelled with the reason.'
        : 'Every brew is shown without a safety flag.',
    },
    {
      to: 'consent', label: 'What you have granted',
      value: grantsOn.length ? grantsOn.join(' · ') : 'Nothing granted',
      effect: 'Every grant is revocable at any time. Research sharing stays off unless you turn it on.',
    },
  ];

  return (
    <ObScreen>
      <StepHeader step={5} onBack={() => go('consent')} />
      <Title>Here&rsquo;s what we heard.</Title>
      <Sub>Everything is editable — tap any answer to change it.</Sub>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {rows.map((r) => (
          <button
            key={r.to}
            type="button"
            onClick={() => { set({ profileReturn: 'obRecap' }); go(r.to as any); }}
            style={{
              width: '100%', textAlign: 'left', cursor: 'pointer',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
              <div style={{
                fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 1,
                textTransform: 'uppercase', color: 'var(--ink-meta)',
              }}>{r.label}</div>
              <div style={{ fontSize: 'calc(11.5px * var(--scale))', fontWeight: 800, color: 'var(--earth)' }}>Edit</div>
            </div>
            <div style={{
              fontFamily: 'var(--font-serif)', fontSize: 'calc(16.5px * var(--scale))',
              fontWeight: 600, color: 'var(--ink)', marginTop: 4, lineHeight: 1.25,
            }}>{r.value}</div>
            <p className="rs-prose" style={{
              fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
              lineHeight: 1.5, margin: '6px 0 0',
            }}>{r.effect}</p>
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }} />
      <NextButton onClick={() => go('today')}>Start where I am</NextButton>
    </ObScreen>
  );
}
