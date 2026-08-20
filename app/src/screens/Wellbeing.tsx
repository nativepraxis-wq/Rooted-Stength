import { useStore } from '../state/store';
import { sleepWeek, sleepStages, sleepHabits, sleepByDay, sleepTargets } from '../data/content';
import { DarkHeader } from '../components/Headers';
import { Screen, Gutter, Band, Chip, ToggleRow } from '../components/ui';

/* "7h 20m" from a decimal hour count. */
const hm = (h: number) => {
  const t = Math.round(h * 60);
  return Math.floor(t / 60) + 'h ' + String(t % 60).padStart(2, '0') + 'm';
};

/* ===================== sleep ===================== */

export function SleepScreen() {
  const { state, set, go, goBack } = useStore();
  const logs = state.logs as any[];
  const byDay = sleepByDay as Record<string, number>;
  const target = (sleepTargets as any)[state.obGoal] || 7.5;

  const hrsOf = (d: number) => byDay[String(d)] ?? 7;
  const avg = [0, 1, 2, 3, 4, 5, 6].reduce((a, d) => a + hrsOf(d), 0) / 7;
  const debt = Math.max(0, target * 7 - [0, 1, 2, 3, 4, 5, 6].reduce((a, d) => a + hrsOf(d), 0));

  /* Which nights had a logged session — training raises the sleep you need. */
  const movedDays = [0, 1, 2, 3, 4, 5, 6].filter((d) => logs.some((l) => l.kind === 'move' && l.d === d));
  const best = [0, 1, 2, 3, 4, 5, 6].reduce((a, b) => (hrsOf(b) > hrsOf(a) ? b : a), 0);
  const bestMoved = logs.find((l) => l.kind === 'move' && l.d === best);

  const pregOn = !!state.teaSafety.pregnant;

  return (
    <Screen>
      <DarkHeader eyebrow="Journey · recovery" title="Sleep" back={goBack}>
        <div style={{ display: 'flex', gap: 9, marginTop: 2 }}>
          {[
            { n: hm(avg), l: 'nightly average' },
            { n: hm(target), l: 'target for your goal' },
          ].map((s) => (
            <div key={s.l} style={{
              flex: 1, minWidth: 0, background: 'rgba(244,237,223,0.13)', borderRadius: 14, padding: '11px 12px',
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
                fontWeight: 600, color: 'var(--ochre-light)',
              }}>{s.n}</div>
              <div style={{ fontSize: 'calc(10.5px * var(--scale))', lineHeight: 1.3, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-card)', padding: 15,
        }}>
          <div style={{
            fontFamily: 'var(--font-serif)', fontSize: 'calc(17px * var(--scale))',
            fontWeight: 600, color: 'var(--ink)', marginBottom: 12,
          }}>Last seven nights</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 88 }}>
            {(sleepWeek as any[]).map((d, i) => (
              <div key={i} style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
                <div style={{ height: 70, display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{
                    width: '100%', height: Math.round((d.h / 9) * 70),
                    background: d.h >= target ? 'var(--leaf)' : 'var(--ochre)',
                    borderRadius: 5,
                  }} />
                </div>
                <div style={{
                  fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)',
                  fontWeight: 700, marginTop: 4,
                }}>{d.day}</div>
              </div>
            ))}
          </div>
          <p className="rs-prose" style={{
            fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
            lineHeight: 1.5, margin: '12px 0 0',
          }}>
            {debt <= 0
              ? 'You are meeting your target across the week.'
              : 'You are ' + hm(debt) + ' short of target across the week — about '
                + Math.round((debt / 7) * 60) + ' minutes a night.'}
          </p>
        </div>

        <div style={{
          marginTop: 12, background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-card)', padding: 15,
        }}>
          <div style={{
            fontFamily: 'var(--font-serif)', fontSize: 'calc(17px * var(--scale))',
            fontWeight: 600, color: 'var(--ink)', marginBottom: 10,
          }}>Stages, last night</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {(sleepStages as any[]).map((s) => (
              <div key={s.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                  <span style={{
                    fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
                  }}>{s.label}</span>
                  <span style={{
                    fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700, color: 'var(--ink-meta)',
                  }}>{s.pct} · {s.hrs}</span>
                </div>
                <div style={{ height: 8, borderRadius: 6, background: 'var(--surface-2)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: s.pct, background: s.c, borderRadius: 6 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Band tone="cream" title="What the week is telling you" style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 8 }}>
            Your longest night, {hm(hrsOf(best))}, {bestMoved
              ? 'followed ' + bestMoved.name.split(/[—:]/)[0].trim().toLowerCase() + '.'
              : 'followed a rest day — rest is doing work too.'}
          </div>
          {movedDays.length} of the last 7 days had a logged session. Training raises the sleep you
          need, not just the sleep you get.
        </Band>

        {/*
          Pregnancy makes the target a direction rather than a debt. Showing a
          shortfall as something owed would be the wrong frame entirely.
        */}
        {pregOn && (
          <Band tone="safety" title="A note on your safety profile" style={{ marginTop: 12 }}>
            Your safety profile flags pregnancy or nursing. Broken nights are expected here — nap
            credit counts, and the target above is a direction, not a debt to repay.
          </Band>
        )}

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Wind-down habits</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(sleepHabits as any[]).map((h, i) => (
            <ToggleRow
              key={h.name}
              label={h.name}
              on={state.sleepHabit?.[i] ?? h.on}
              onToggle={() => set((s) => ({
                sleepHabit: { ...s.sleepHabit, [i]: !(s.sleepHabit?.[i] ?? h.on) },
              }))}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go('breath')}
          style={{
            border: 'none', background: 'none', cursor: 'pointer', padding: '14px 0 0',
            fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
            textAlign: 'left',
          }}
        >Pair with a long-exhale reset →</button>
      </Gutter>
    </Screen>
  );
}

/* ===================== pregnancy ===================== */

const PREG_STAGES = [
  { id: 'trying', label: 'Trying to conceive' },
  { id: 'pregnant', label: 'Pregnant' },
  { id: 'postpartum', label: 'Postpartum' },
];

export function PregnancyScreen() {
  const { state, set, go, goBack } = useStore();
  const step = state.pregStep ?? 0;
  const cleared = !!state.pregClinician;

  const back = () => (step === 0 ? goBack() : set({ pregStep: step - 1 }));
  const next = () => set({ pregStep: step + 1 });

  return (
    <Screen>
      <div style={{
        animation: 'rs-fade var(--dur-route) ease', minHeight: '100%',
        display: 'flex', flexDirection: 'column', padding: '64px 22px 36px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <button
            type="button"
            aria-label="Go back"
            onClick={back}
            className="rs-hit"
            style={{
              border: 'none', background: 'var(--surface-3)', color: 'var(--ink-body)',
              width: 34, height: 34, borderRadius: '50%', fontSize: 17, cursor: 'pointer', flex: 'none',
            }}
          ><span aria-hidden="true">&#8249;</span></button>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', gap: 5 }} aria-hidden="true">
            {[1, 2, 3].map((n) => (
              <div key={n} style={{
                flex: 1, minWidth: 0, height: 4, borderRadius: 3,
                background: step >= n ? 'var(--forest)' : 'var(--border)',
              }} />
            ))}
          </div>
        </div>

        {step === 0 && (
          <>
            <h1 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'calc(25px * var(--scale))',
              fontWeight: 600, margin: '0 0 6px', color: 'var(--ink)',
            }}>Carrying &amp; rebuilding, safely</h1>
            <p className="rs-prose" style={{
              fontSize: 'calc(13.5px * var(--scale))', color: 'var(--ink-soft)',
              margin: '0 0 20px', lineHeight: 1.5,
            }}>
              This chapter moves slower and leans on your care team. Nothing here replaces your
              midwife, OB or pelvic-floor therapist.
            </p>

            {state.teaSafety.pregnant && (
              <Band tone="cream" style={{ marginBottom: 18 }}>
                Your herb-safety profile already flags pregnancy or nursing — brews and plates are
                filtered accordingly.
              </Band>
            )}

            <div style={{
              fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700,
              color: 'var(--ink-muted)', marginBottom: 9,
            }}>Where are you right now?</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
              {PREG_STAGES.map((s) => (
                <Chip
                  key={s.id}
                  selected={state.pregStage === s.id}
                  color="var(--forest)"
                  onClick={() => set({ pregStage: s.id })}
                >{s.label}</Chip>
              ))}
            </div>

            <div style={{ flex: 1 }} />
            <button type="button" onClick={next} style={{
              width: '100%', border: 'none', background: 'var(--forest)', color: 'var(--on-dark)',
              borderRadius: 16, padding: 16, fontSize: 'calc(15px * var(--scale))',
              fontWeight: 700, cursor: 'pointer', marginTop: 24, minHeight: 44,
            }}>Continue</button>
          </>
        )}

        {step === 1 && (
          <>
            <div style={{
              fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 1.4,
              textTransform: 'uppercase', color: 'var(--clay)',
            }}>Safety gate</div>
            <h1 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'calc(25px * var(--scale))',
              fontWeight: 600, margin: '4px 0 6px', color: 'var(--ink)',
            }}>Your care team leads here</h1>
            <p className="rs-prose" style={{
              fontSize: 'calc(13.5px * var(--scale))', color: 'var(--ink-soft)',
              margin: '0 0 18px', lineHeight: 1.5,
            }}>
              Before we adapt any plan, confirm you&rsquo;ve discussed exercise and nutrition with
              your provider.
            </p>

            <ToggleRow
              label="A clinician is guiding my activity"
              sub="Midwife, OB, or pelvic-floor therapist"
              on={cleared}
              onToggle={() => set((s) => ({ pregClinician: !s.pregClinician }))}
            />

            <Band tone="safety" title="Stop &amp; seek care if you notice" style={{ marginTop: 14 }}>
              Vaginal bleeding · fluid leaking · regular painful contractions · chest pain or
              breathlessness · dizziness or fainting · calf pain or swelling · reduced fetal
              movement.
            </Band>

            <div style={{ flex: 1 }} />
            {/*
              A real gate, not a nudge: the button stays disabled until the
              clinician box is ticked, and says why it is disabled.
            */}
            <button
              type="button"
              onClick={next}
              disabled={!cleared}
              aria-disabled={!cleared}
              style={{
                width: '100%', border: 'none', borderRadius: 16, padding: 16, marginTop: 24,
                minHeight: 44, fontSize: 'calc(15px * var(--scale))', fontWeight: 700,
                cursor: cleared ? 'pointer' : 'not-allowed',
                background: cleared ? 'var(--forest)' : '#CFC6B4',
                color: cleared ? 'var(--on-dark)' : '#55503F',
              }}
            >{cleared ? 'Continue' : 'Confirm clinician care to continue'}</button>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{
              fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 1.4,
              textTransform: 'uppercase', color: 'var(--earth)',
            }}>What we adapt</div>
            <h1 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'calc(25px * var(--scale))',
              fontWeight: 600, margin: '4px 0 16px', color: 'var(--ink)',
            }}>Gentle, clinician-approved shifts</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Band tone="cream" title="Movement">
                Keep strength you already have; skip new maxes. Avoid long flat-on-back work later
                in pregnancy, no breath-holding (brace on the exhale), and add pelvic-floor
                awareness to every set.
              </Band>
              <Band tone="cream" title="Nourishment">
                Extra iron, folate and B12; steady protein across the day; plenty of water. Your
                plates lead with cowpeas, callaloo, moringa and fortified plant milk — labeled
                clearly, no herbs contraindicated in pregnancy.
              </Band>
              <Band tone="cream" title="Pelvic floor &amp; breath">
                Daily connection breathing over max effort. A pelvic-floor therapist referral is
                offered rather than assumed — the app never prescribes.
              </Band>
            </div>

            <div style={{ flex: 1 }} />
            <button type="button" onClick={next} style={{
              width: '100%', border: 'none', background: 'var(--forest)', color: 'var(--on-dark)',
              borderRadius: 16, padding: 16, fontSize: 'calc(15px * var(--scale))',
              fontWeight: 700, cursor: 'pointer', marginTop: 24, minHeight: 44,
            }}>See postpartum rebuilding</button>
          </>
        )}

        {step >= 3 && (
          <>
            <div style={{
              fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 1.4,
              textTransform: 'uppercase', color: 'var(--earth)',
            }}>Postpartum rebuilding</div>
            <h1 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'calc(25px * var(--scale))',
              fontWeight: 600, margin: '4px 0 16px', color: 'var(--ink)',
            }}>Return, don&rsquo;t rush</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                "Wait for your provider's clearance (often ~6 weeks, longer after a C-section).",
                'Rebuild the core and pelvic floor first; watch for diastasis (doming) before loading.',
                'Fuel recovery and, if nursing, extra calories, fluids, iron and B12. Rest is training.',
              ].map((t, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 11, alignItems: 'flex-start',
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-tile)', padding: '13px 14px',
                }}>
                  <span aria-hidden="true" style={{
                    width: 24, height: 24, flex: 'none', borderRadius: 8, background: 'var(--forest)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--on-dark)', fontSize: 12, fontWeight: 800,
                  }}>{i + 1}</span>
                  <span className="rs-prose" style={{
                    flex: 1, minWidth: 0, fontSize: 'calc(12.5px * var(--scale))',
                    color: 'var(--ink-muted)', lineHeight: 1.5,
                  }}>{t}</span>
                </div>
              ))}
            </div>

            <Band tone="cream" style={{ marginTop: 14 }}>
              Your Growth Journal will celebrate function — &ldquo;carried the baby up the stairs
              pain-free&rdquo; — never a rush back to an old body.
            </Band>

            <div style={{ flex: 1 }} />
            <button type="button" onClick={() => go('journey')} style={{
              width: '100%', border: 'none', background: 'var(--forest)', color: 'var(--on-dark)',
              borderRadius: 16, padding: 16, fontSize: 'calc(15px * var(--scale))',
              fontWeight: 700, cursor: 'pointer', marginTop: 24, minHeight: 44,
            }}>Back to your journal</button>
          </>
        )}
      </div>
    </Screen>
  );
}

/* ===================== intimacy ===================== */

const VITALITY = [
  {
    name: 'Minerals & circulation',
    why: 'Zinc, magnesium and nitrate-rich greens support blood flow and hormone production. Pumpkin seed, cacao, callaloo and beets do real work here.',
    ev: 'Well established',
  },
  {
    name: 'Sleep',
    why: 'Testosterone and oestrogen both track sleep. Short nights blunt desire faster than almost anything else on this list.',
    ev: 'Well established',
  },
  {
    name: 'Safety & nervous system',
    why: 'Arousal needs a body that feels safe. Long-exhale breath, unhurried time and an absence of threat are physiological inputs, not mood lighting.',
    ev: 'Emerging evidence',
  },
  {
    name: 'Traditional tonics',
    why: 'Damiana, moringa and cacao carry long use across the diaspora. Traditional use is knowledge — it is not a clearance, and none of these are a treatment for a medical cause.',
    ev: 'Traditional use',
  },
];

export function IntimacyScreen() {
  const { state, set, go, goBack } = useStore();

  return (
    <Screen>
      <DarkHeader eyebrow="Journey · private" title="Sexual vitality &amp; hormones" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Desire is a vital sign — built from minerals, sleep, circulation and safety. Sacred in
          many of our traditions, never shameful here.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        {/* This screen is private by default; sharing is an explicit, reversible act. */}
        <ToggleRow
          label="Include this in shared summaries"
          sub="Off by default. Nothing from this screen appears in exports or Council answers unless you turn this on."
          on={!!state.intimacyShare}
          onToggle={() => set((s) => ({ intimacyShare: !s.intimacyShare }))}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 14 }}>
          {VITALITY.map((v) => (
            <div key={v.name} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start',
              }}>
                <span style={{
                  fontSize: 'calc(14px * var(--scale))', fontWeight: 700,
                  color: 'var(--ink)', lineHeight: 1.25,
                }}>{v.name}</span>
              </div>
              <p className="rs-prose" style={{
                fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
                lineHeight: 1.5, margin: '6px 0 0',
              }}>{v.why}</p>
            </div>
          ))}
        </div>

        <Band tone="safety" title="When it is worth a clinician" style={{ marginTop: 16 }}>
          A sustained change in desire or function can point at thyroid, blood pressure,
          medication side effects, depression or diabetes. That is a conversation with a clinician,
          not a tonic — and asking for it is not a failure of will.
        </Band>

        <button
          type="button"
          onClick={() => go('sleep')}
          style={{
            border: 'none', background: 'none', cursor: 'pointer', padding: '14px 0 0',
            fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
            textAlign: 'left',
          }}
        >Start with sleep →</button>
      </Gutter>
    </Screen>
  );
}
