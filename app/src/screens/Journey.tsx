import { hubImage, HUB_NOTE, subImage } from '../data/media';
import { useStore } from '../state/store';
import { useJournal } from '../state/journal';
import { journal, obGoals, obRestrList, obTradList, consentList } from '../data/content';
import { DarkHeader } from '../components/Headers';
import { Screen, Gutter, Band, Chip } from '../components/ui';

function Row({ title, sub, onClick }: { title: string; sub: string; onClick: () => void }) {
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

/* ===================== journey — the hub ===================== */

export function JourneyScreen() {
  const { state, set, go } = useStore();
  const j = useJournal();
  const goal = (obGoals as any[]).find((g) => g.id === state.obGoal)?.label || '';
  const restrCount = (obRestrList as any[]).filter((x) => state.obRestr[x.id]).length;

  return (
    <Screen>
      <DarkHeader eyebrow="Journey" title="Growth Journal">
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Function over appearance. What can your body do this week?
        </p>
        <div style={{ display: 'flex', gap: 9, marginTop: 14 }}>
          {[
            { n: String(j.streakPlates), l: 'Days running with a plate logged' },
            { n: String(j.sessionCount14), l: 'Sessions moved, last 14 days' },
          ].map((s) => (
            <div key={s.l} style={{
              flex: 1, minWidth: 0, background: 'rgba(244,237,223,0.13)', borderRadius: 14, padding: '11px 12px',
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))',
                fontWeight: 600, color: 'var(--ochre-light)',
              }}>{s.n}</div>
              <div style={{ fontSize: 'calc(10.5px * var(--scale))', lineHeight: 1.3, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </DarkHeader>
      {/*
        Hub image only. The sub-screens under this tab show the user's own
        record, and a stock photograph there would compete with their data -
        on the scan flow it could even be mistaken for their own meal photo.
      */}
      <img
        src={hubImage('journey')}
        alt={'Keeping the record over time, illustration'}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <Row
            title="Progress &amp; history"
            sub={j.daysLogged + ' of 14 days logged · ' + j.plateCount14 + ' plates recorded'}
            onClick={() => go('progress')}
          />
          <Row
            title="Your profile"
            sub={(state.obGoalSet ? goal : 'No goal set') + ' · ' + restrCount + ' restrictions · what it all changes →'}
            onClick={() => go('profile')}
          />
          <Row title="Sleep" sub="Stages, trends &amp; wind-down →" onClick={() => go('sleep')} />
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => set({ noteOpen: true })}
            style={{
              flex: 1, minWidth: 0, border: '1px solid var(--border-2)', background: 'var(--card)',
              color: 'var(--ink-muted)', borderRadius: 14, padding: '12px 10px', minHeight: 44,
              fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, cursor: 'pointer',
            }}
          >+ Note</button>
          <button
            type="button"
            onClick={() => go('recipe')}
            style={{
              flex: 1, minWidth: 0, border: '1px solid var(--border-2)', background: 'var(--card)',
              color: 'var(--ink-muted)', borderRadius: 14, padding: '12px 10px', minHeight: 44,
              fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, cursor: 'pointer',
            }}
          >Log a plate</button>
          <button
            type="button"
            onClick={() => go('history')}
            style={{
              flex: 1, minWidth: 0, border: '1px solid var(--border-2)', background: 'var(--card)',
              color: 'var(--ink-muted)', borderRadius: 14, padding: '12px 10px', minHeight: 44,
              fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, cursor: 'pointer',
            }}
          >History</button>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Recent victories</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(journal as any[]).map((v) => (
            <div key={v.text} style={{
              display: 'flex', gap: 11, alignItems: 'flex-start',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '12px 13px',
            }}>
              <span aria-hidden="true" style={{
                width: 10, height: 10, borderRadius: '50%', flex: 'none',
                background: v.c, marginTop: 5,
              }} />
              <span style={{ flex: 1 }}>
                <span className="rs-prose" style={{
                  display: 'block', fontSize: 'calc(13px * var(--scale))',
                  color: 'var(--ink)', lineHeight: 1.45,
                }}>{v.text}</span>
                <span style={{
                  display: 'block', fontSize: 'calc(11px * var(--scale))',
                  color: 'var(--ink-meta)', marginTop: 3, fontWeight: 700,
                }}>{v.meta}</span>
                {/*
                  `icon` was a semantic key on every entry - carry, hike, back,
                  meal, sleep - and nothing read it. No icon set ships with this
                  app, so it is surfaced as the word it already is rather than
                  by inventing glyphs the design does not have.
                */}
                {v.icon && (
                  <span style={{
                    display: 'inline-block', marginTop: 5,
                    fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
                    letterSpacing: 0.8, textTransform: 'uppercase',
                    color: v.c, background: 'var(--surface-2)',
                    padding: '2px 8px', borderRadius: 10,
                  }}>{v.icon}</span>
                )}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 16 }}>
          <Row
            title="Medical &amp; Health Vault"
            sub="Encrypted · you control AI access · nothing sold"
            onClick={() => go('vault')}
          />
          <Row
            title="Food sovereignty &amp; health"
            sub="What the food system did, and what the pot can answer"
            onClick={() => go('sovereignty')}
          />
          <Row
            title="Privacy &amp; data"
            sub="Permissions, residency and the transfer ledger"
            onClick={() => go('privacy')}
          />
          <Row
            title="Accessibility"
            sub="Eleven settings, all independent"
            onClick={() => go('a11y')}
          />
          <Row
            title="Sources &amp; evidence"
            sub="Every claim traced to what carries it"
            onClick={() => { set({ sourceFocus: '' }); go('sources'); }}
          />
          <Row
            title="Membership"
            sub="What is free forever, and what is not"
            onClick={() => go('membership')}
          />
          <Row
            title="Carrying &amp; rebuilding"
            sub="Pregnancy and postpartum — your care team leads"
            onClick={() => go('pregnancy')}
          />
          <Row
            title="Sexual vitality &amp; hormones"
            sub="Private by default · nothing shared unless you say so"
            onClick={() => go('intimacy')}
          />
          <Row
            title="Editorial review queue"
            sub="What is waiting on a human before it publishes"
            onClick={() => go('admin')}
          />
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== progress ===================== */

export function ProgressScreen() {
  const { set, go, goBack } = useStore();
  const j = useJournal();

  return (
    <Screen>
      <DarkHeader eyebrow="Journey · what you actually did" title="Progress" back={goBack}>
        <div style={{ display: 'flex', gap: 9 }}>
          {[
            { n: String(j.daysLogged), l: 'days logged of 14' },
            { n: String(j.plateCount14), l: 'plates recorded' },
            { n: String(j.sessionCount14), l: 'sessions moved' },
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
      <img
        src={subImage('progress')}
        alt={'Lacing up to train, illustration'}
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

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', gap: 9 }}>
          {[
            { n: j.streakPlates, l: j.streakPlatesLabel },
            { n: j.streakMove, l: j.streakMoveLabel },
            { n: j.streakWater, l: j.streakWaterLabel },
          ].map((s) => (
            <div key={s.l} style={{
              flex: 1, minWidth: 0, background: 'var(--surface-1)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '11px 12px',
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))',
                fontWeight: 600, color: 'var(--ink)',
              }}>{s.n}</div>
              <div style={{
                fontSize: 'calc(10px * var(--scale))', color: 'var(--ink-meta)',
                marginTop: 2, lineHeight: 1.3,
              }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Seven-day strip: bar = protein, dots = moved / water */}
        <div style={{
          marginTop: 14, background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-card)', padding: 15,
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10,
          }}>
            <span style={{
              fontFamily: 'var(--font-serif)', fontSize: 'calc(17px * var(--scale))',
              fontWeight: 600, color: 'var(--ink)',
            }}>This week</span>
            <span style={{
              fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)', fontWeight: 700,
            }}>bar = protein · dots = moved / water</span>
          </div>

          <div style={{
            display: 'flex', gap: 6, marginTop: 12, alignItems: 'flex-end', justifyContent: 'space-between',
          }}>
            {j.week.map((w) => (
              <div key={w.d} style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
                <div style={{ height: 62, display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{
                    width: '100%', height: w.barH, background: w.barBg, borderRadius: 5,
                  }} />
                </div>
                <div style={{ display: 'flex', gap: 3, justifyContent: 'center', marginTop: 5 }}>
                  <span aria-hidden="true" style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: w.moveOn ? '#2E6B7A' : 'var(--surface-3)',
                  }} />
                  <span aria-hidden="true" style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: w.waterOn ? '#8FCBD8' : 'var(--surface-3)',
                  }} />
                </div>
                <div style={{
                  fontSize: 'calc(11px * var(--scale))', marginTop: 4,
                  fontWeight: w.isToday ? 800 : 600,
                  color: w.isToday ? 'var(--ink)' : 'var(--ink-meta)',
                }}>{w.letter}</div>
                <div style={{
                  fontSize: 'calc(9.5px * var(--scale))', color: 'var(--ink-meta)', marginTop: 1,
                }}>{w.plateCount}</div>
              </div>
            ))}
          </div>

          {j.weekQuiet && (
            <p className="rs-prose" style={{
              fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
              lineHeight: 1.5, margin: '12px 0 0',
            }}>{j.weekQuietLine}</p>
          )}
        </div>

        {/* 14-day protein trend */}
        <div style={{
          marginTop: 12, background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-card)', padding: 15,
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10,
          }}>
            <span style={{
              fontFamily: 'var(--font-serif)', fontSize: 'calc(17px * var(--scale))',
              fontWeight: 600, color: 'var(--ink)',
            }}>Protein, 14 days</span>
            <span style={{
              fontSize: 'calc(12px * var(--scale))', color: 'var(--leaf)', fontWeight: 800,
            }}>{j.proteinAvg} avg</span>
          </div>
          <div style={{
            fontSize: 'calc(11px * var(--scale))', color: 'var(--ink-meta)', marginTop: 3,
          }}>{j.proteinTargetLabel}</div>

          <div style={{
            display: 'flex', gap: 3, marginTop: 12, alignItems: 'flex-end', height: 80,
          }}>
            {j.trend.map((b) => (
              <div key={b.d} style={{
                flex: 1, minWidth: 0, height: b.h, background: b.c, borderRadius: 3,
                boxShadow: b.isToday ? '0 0 0 2px var(--ink)' : 'none',
              }} />
            ))}
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', marginTop: 6,
            fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)', fontWeight: 600,
          }}>
            <span>two weeks ago</span><span>{j.onTargetLabel}</span><span>today</span>
          </div>
          <p className="rs-prose" style={{
            fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)',
            lineHeight: 1.5, margin: '9px 0 0',
          }}>{j.proteinReadLine}</p>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 10px',
        }}>Plates you keep coming back to</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {j.topPlates.map((p: any) => (
            <button
              key={p.name}
              type="button"
              onClick={() => {
                if (p.plateId) set({ plateId: p.plateId, plateRelaxed: false, route: 'recipeDetail', councilOpen: false });
                else go('recipe');
              }}
              style={{
                width: '100%', textAlign: 'left', background: 'var(--card)',
                border: '1px solid var(--border)', borderRadius: 'var(--r-tile)',
                padding: '12px 13px', cursor: 'pointer', minHeight: 44,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <span style={{
                  flex: 1, minWidth: 0, fontSize: 'calc(13px * var(--scale))',
                  fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3,
                }}>{p.name}</span>
                <span style={{
                  fontSize: 'calc(12.5px * var(--scale))',
                  fontWeight: 800, color: p.c,
                }}>{p.n}</span>
              </div>
              <div aria-hidden="true" style={{
                height: 6, borderRadius: 4, background: 'var(--surface-2)',
                overflow: 'hidden', marginTop: 8,
              }}>
                <div style={{ height: '100%', width: p.barW, background: p.c, borderRadius: 4 }} />
              </div>
              <div style={{
                fontSize: 'calc(11px * var(--scale))', color: 'var(--ink-meta)', marginTop: 5,
              }}>{p.lastLabel}</div>
            </button>
          ))}
        </div>

        <Band tone="cream" title="This is a record, not a rating" style={{ marginTop: 16 }}>
          Nothing on this screen is a score, a streak you can lose, or a judgement about the week.
          It is what you logged — useful only because it is true.
        </Band>
      </Gutter>
    </Screen>
  );
}

/* ===================== history ===================== */

export function HistoryScreen() {
  const { state, set, goBack } = useStore();
  const j = useJournal();

  return (
    <Screen>
      <DarkHeader eyebrow="Journey · the record" title="History" back={goBack}>
        <div style={{
          fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700,
          color: 'var(--on-dark-muted)',
        }}>{j.histCountLabel}</div>
      </DarkHeader>
      <img
        src={subImage('history')}
        alt={'A record kept over time, illustration'}
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

      <Gutter style={{ paddingTop: 16 }}>
        <div className="rs-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {j.histFilters.map((f) => (
            <Chip
              key={f.id}
              selected={f.selected}
              color="var(--forest)"
              onClick={() => set({ histFilter: f.id })}
            >{f.label} · {f.count}</Chip>
          ))}
        </div>

        {j.histEmpty ? (
          <Band tone="cream" title={j.histEmptyTitle} style={{ marginTop: 14 }}>
            {j.histBlank
              ? 'Log a plate from any recipe, mark a session complete, or add a note — it lands here.'
              : 'Nothing of that kind has been logged in the last 14 days. Try another filter.'}
          </Band>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 14 }}>
            {j.histDays.map((day) => (
              <section key={day.name}>
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: 9,
                  borderLeft: '3px solid ' + (day.isToday ? 'var(--ochre)' : 'var(--border)'),
                  paddingLeft: 10,
                }}>
                  <h2 style={{
                    flex: 1, minWidth: 0, fontFamily: 'var(--font-serif)', fontSize: 'calc(17px * var(--scale))',
                    fontWeight: 600, color: 'var(--ink)', margin: 0,
                  }}>{day.name}</h2>
                </div>
                <div style={{
                  fontSize: 'calc(11px * var(--scale))', color: 'var(--ink-meta)',
                  fontWeight: 600, margin: '3px 0 9px 13px',
                }}>{day.summary}</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {day.rows.map((r: any, i: number) => (
                    <div key={r.id + '-' + i} style={{
                      display: 'flex', gap: 11, alignItems: 'flex-start',
                      background: 'var(--card)', border: '1px solid var(--border)',
                      borderRadius: 'var(--r-tile)', padding: '11px 12px',
                    }}>
                      <span aria-hidden="true" style={{
                        width: 9, height: 9, borderRadius: '50%', flex: 'none',
                        background: r.c, marginTop: 5,
                      }} />
                      <span style={{ flex: 1 }}>
                        <span style={{
                          display: 'block', fontSize: 'calc(12.5px * var(--scale))',
                          fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4,
                        }}>{r.name}</span>
                        <span style={{
                          display: 'block', fontSize: 'calc(11px * var(--scale))',
                          color: 'var(--ink-meta)', marginTop: 2,
                        }}>
                          <span className="rs-sr">{r.kindLabel}. </span>
                          {r.meta}{r.t && ' · ' + r.t}
                        </span>
                      </span>
                      {/* Only today's own entries can be removed — history is not rewritable. */}
                      {r.canRemove && (
                        <button
                          type="button"
                          aria-label={'Remove ' + r.name}
                          onClick={() => j.removeLog(r.id)}
                          className="rs-hit"
                          style={{
                            flex: 'none', border: 'none', background: 'var(--surface-2)',
                            color: 'var(--ink-meta)', width: 28, height: 28, borderRadius: '50%',
                            cursor: 'pointer', fontSize: 12,
                          }}
                        ><span aria-hidden="true">&#10005;</span></button>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </Gutter>
    </Screen>
  );
}

/* ===================== profile ===================== */

export function ProfileScreen() {
  const { state, set, go, goBack } = useStore();
  const goal = (obGoals as any[]).find((g) => g.id === state.obGoal)?.label || '';
  const goal2 = (obGoals as any[]).find((g) => g.id === state.obGoal2)?.label || '';
  const restr = (obRestrList as any[]).filter((x) => state.obRestr[x.id]).map((x) => x.label);
  const trad = (obTradList as any[]).filter((x) => state.obTrad[x.id]).map((x) => x.label);
  const grants = (consentList as any[]).filter((c) => state.consent[c.id]).map((c) => c.label);

  /*
    Each row states what the setting actually changes downstream. A profile
    screen that only echoed the answers back would hide the consequence.
  */
  const rows = [
    {
      to: 'ob1', label: 'Who you are',
      value: (state.obName || 'No name set') + ' · ' + state.obPronoun,
      effect: 'Used throughout the app. Physiology questions stay optional and separate.',
    },
    {
      to: 'ob2', label: 'Goal',
      value: state.obGoalSet ? goal + (goal2 ? ' · with ' + goal2 : '') : 'No goal set',
      effect: state.obGoalSet
        ? 'Sets your protein target, your Nutrient Frequency band, and which session Move leads with.'
        : 'Would set your protein target, your Nutrient Frequency band, and which session Move leads with.',
    },
    {
      to: 'ob3', label: 'How your table eats',
      value: (restr.length ? restr.join(' · ') : 'No restrictions set')
        + (trad.length ? ' — ' + trad.join(' · ') : ''),
      effect: restr.length
        ? 'Recipes, meal plans, grocery lists, restaurant menus and the smoothie builder all filter on this — and every exclusion is counted and listed with its reason.'
        : 'Nothing is filtered. Recipes still lead with the traditions you pick.',
    },
    {
      to: 'obHerb', label: 'Herb safety',
      value: Object.keys(state.teaSafety).filter((k) => state.teaSafety[k]).length
        ? 'Flags set'
        : 'Nothing flagged',
      effect: 'Affected brews are shown last with the reason. They are never removed from the list.',
    },
    {
      to: 'consent', label: 'Consent',
      value: grants.length ? grants.join(' · ') : 'Nothing granted',
      effect: 'Revocable at any time. Research sharing stays off unless you turn it on.',
    },
  ];

  return (
    <Screen>
      <DarkHeader eyebrow="Journey · your profile" title="What it all changes" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Every answer, and the part of the app it actually drives. Tap any row to change it.
        </p>
      </DarkHeader>
      <img
        src={subImage('profile')}
        alt={'Weighing what to change, illustration'}
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

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {rows.map((r) => (
            <button
              key={r.to}
              type="button"
              onClick={() => { set({ profileReturn: 'profile' }); go(r.to as any); }}
              style={{
                width: '100%', textAlign: 'left', cursor: 'pointer',
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-tile)', padding: '13px 14px', minHeight: 44,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <span style={{
                  fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 1,
                  textTransform: 'uppercase', color: 'var(--ink-meta)',
                }}>{r.label}</span>
                <span style={{
                  fontSize: 'calc(11.5px * var(--scale))', fontWeight: 800, color: 'var(--earth)',
                }}>Edit</span>
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
      </Gutter>
    </Screen>
  );
}
