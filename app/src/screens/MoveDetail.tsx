import type { ReactNode } from 'react';
import { useStore } from '../state/store';
import { useMoveStats } from '../state/move';
import {
  mobilityMoves, seatedMoves, elderDose, elderMoves, ancestralTraditions,
} from '../data/content';
import { DarkHeader } from '../components/Headers';
import { TierBadge } from '../components/TierBadge';
import { Screen, Gutter, Band } from '../components/ui';
import { SessionButton } from './Move';

function H3({ children }: { children: ReactNode }) {
  return (
    <h3 style={{
      fontFamily: 'var(--font-serif)', fontSize: 'calc(18px * var(--scale))',
      fontWeight: 600, color: 'var(--ink)', margin: '20px 0 9px',
    }}>{children}</h3>
  );
}

function Tile({ n, l }: { n: string; l: string }) {
  return (
    <div style={{
      flex: 1, minWidth: 0, background: 'var(--surface-1)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-tile)', padding: '11px 12px',
    }}>
      <div style={{
        fontFamily: 'var(--font-serif)', fontSize: 'calc(18px * var(--scale))',
        fontWeight: 600, color: 'var(--ink)', lineHeight: 1.15,
      }}>{n}</div>
      <div style={{
        fontSize: 'calc(10.5px * var(--scale))', color: 'var(--ink-meta)',
        marginTop: 2, lineHeight: 1.3,
      }}>{l}</div>
    </div>
  );
}

/*
  A move with its dose and the reason it earns a place. Used by mobility and
  seated — the two circuits where the "why" is the point.
*/
function MoveRow({ m }: { m: any }) {
  return (
    <div style={{
      display: 'flex', gap: 11, alignItems: 'flex-start',
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-tile)', padding: '13px 14px',
    }}>
      <span aria-hidden="true" style={{
        width: 10, height: 10, borderRadius: '50%', flex: 'none', background: m.c, marginTop: 5,
      }} />
      <div style={{ flex: 1 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline',
        }}>
          <span style={{
            fontSize: 'calc(14px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
          }}>{m.name}</span>
          <span style={{
            fontSize: 'calc(11px * var(--scale))', fontWeight: 800,
            color: 'var(--ink-meta)',
          }}>{m.dose}</span>
        </div>
        <p className="rs-prose" style={{
          fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
          lineHeight: 1.5, margin: '5px 0 0',
        }}>{m.why}</p>
      </div>
    </div>
  );
}

/* ===================== mobility ===================== */

export function MobilityScreen() {
  const { go, goBack } = useStore();
  return (
    <Screen>
      <DarkHeader eyebrow="Move · 12 minutes" title="Mobility &amp; joint reset" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Range, not stretching for its own sake. Every hold here buys back a joint that farm work,
          chairs or years took something from.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', gap: 9 }}>
          <Tile n="12" l="minutes, floor optional" />
          <Tile n="6" l="joints addressed" />
          <Tile n="daily" l="safe to repeat" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 14 }}>
          {(mobilityMoves as any[]).map((m) => <MoveRow key={m.name} m={m} />)}
        </div>

        <Band tone="safety" title="How to know it worked" style={{ marginTop: 16 }}>
          You should finish looser than you started and no sorer tomorrow. Sharp pain, tingling or a
          joint that clicks painfully means back off that hold — range is earned slowly and never
          forced.
        </Band>

        <div style={{ marginTop: 16 }}>
          <SessionButton name="Mobility & joint reset" meta="12 min · joint-friendly" />
        </div>

        <button
          type="button"
          onClick={() => go('trainPlan')}
          style={{
            border: 'none', background: 'none', cursor: 'pointer', padding: '14px 0 0',
            fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
            textAlign: 'left',
          }}
        >Put this on a rest day →</button>
      </Gutter>
    </Screen>
  );
}

/* ===================== seated & adaptive ===================== */

export function SeatedScreen() {
  const { go, goBack } = useStore();
  return (
    <Screen>
      <DarkHeader eyebrow="Move · chair-supported" title="Seated &amp; adaptive" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          A full circuit that never asks you onto the floor. For flare-up days, recovery weeks,
          chair users, and anyone training beside an elder.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        {/*
          Stated up front, because the framing is the accessibility feature:
          seated work is a real version of the training, not a reduced one.
        */}
        <Band tone="cream" title="This is not the easy version">
          Seated work builds real strength when you slow the tempo and hold the last inch — the
          chair removes balance risk, not effort.
        </Band>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 14 }}>
          {(seatedMoves as any[]).map((m) => <MoveRow key={m.name} m={m} />)}
        </div>

        <Band tone="cream" title="Two rounds, then stop" style={{ marginTop: 16 }}>
          Run the six in order, rest two minutes, run them once more. If a chair with arms is what
          you have, use them — pushing through the arms is a legitimate progression, not cheating.
        </Band>

        <div style={{ marginTop: 16 }}>
          <SessionButton name="Seated & adaptive circuit" meta="18 min · chair-supported" />
        </div>

        <button
          type="button"
          onClick={() => go('elder')}
          style={{
            border: 'none', background: 'none', cursor: 'pointer', padding: '14px 0 0',
            fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
            textAlign: 'left',
          }}
        >See elder strength guidance →</button>
      </Gutter>
    </Screen>
  );
}

/* ===================== elder strength ===================== */

export function ElderScreen() {
  const { go, goBack } = useStore();
  const stats = useMoveStats();

  return (
    <Screen>
      <DarkHeader eyebrow="Move · elder strength" title="Reclaiming power at every age" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Muscle isn&rsquo;t vanity here — it&rsquo;s independence, balance and the strength to
          serve the village.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <Band tone="cream">
          After 30 we lose <b style={{ color: 'var(--ink)' }}>3–8% of muscle per decade</b>, faster
          after 60. Resistance training is the only proven way to halt and reverse it.
        </Band>

        {/* Measured against the stated 2-a-week minimum, from real logs */}
        <div style={{
          marginTop: 12, background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-card)', padding: 15,
        }}>
          <div role="status" style={{
            fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700,
            color: 'var(--ink)', lineHeight: 1.45,
          }}>{stats.elderSessionLine}</div>
          <div aria-hidden="true" style={{
            height: 8, borderRadius: 6, background: 'var(--surface-2)',
            overflow: 'hidden', marginTop: 10,
          }}>
            <div style={{
              height: '100%', width: stats.elderBarW, borderRadius: 6,
              background: stats.elderBarMet ? 'var(--leaf)' : 'var(--ochre)',
            }} />
          </div>
        </div>

        <H3>Minimum effective dose</H3>
        <div style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-tile)', overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', gap: 8, padding: '10px 13px',
            background: 'var(--surface-2)',
            fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800,
            textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--ink-meta)',
          }}>
            <span style={{ flex: 1 }}>Variable</span>
            <span style={{ width: 84 }}>Minimum</span>
            <span style={{ width: 84 }}>Optimal</span>
          </div>
          {(elderDose as any[]).map((d) => (
            <div key={d.v} style={{
              display: 'flex', gap: 8, padding: '11px 13px',
              borderTop: '1px solid var(--border)',
              fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
            }}>
              <span style={{ flex: 1, minWidth: 0, fontWeight: 700, color: 'var(--ink)' }}>{d.v}</span>
              <span style={{ width: 84 }}>{d.min}</span>
              <span style={{ width: 84, fontWeight: 700, color: 'var(--leaf)' }}>{d.opt}</span>
            </div>
          ))}
        </div>

        <Band tone="cream" title="Plant protein for muscle preservation" style={{ marginTop: 16 }}>
          <div>
            Elders need more, not less: <b style={{ color: 'var(--ink)' }}>1.2–1.5 g/kg</b> daily to
            overcome anabolic resistance — about 25–35g per meal, with{' '}
            <b style={{ color: 'var(--ink)' }}>2.5–2.8g leucine</b> to trigger repair. Lentils, hemp,
            tempeh-free options and evening protein all count.
          </div>
          <div style={{ marginTop: 8, fontWeight: 700, color: 'var(--ink)' }}>
            {stats.elderProteinLine}
          </div>
        </Band>

        <H3>Strength for daily life</H3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(elderMoves as any[]).map((m) => (
            <div key={m.move} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '12px 13px',
            }}>
              <div style={{
                fontSize: 'calc(13.5px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
              }}>{m.move}</div>
              <div style={{
                fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-muted)', marginTop: 3,
              }}>→ {m.adl}</div>
            </div>
          ))}
        </div>

        <Band tone="cream" title="Farm work counts" style={{ marginTop: 16 }}>
          Digging, water-carries and compost-turning are resistance training when structured with
          rest and progressive load.
        </Band>

        <Band tone="safety" title="Balance is the fall-prevention drill" style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 10 }}>
            Two sessions a week of single-leg stands, heel-to-toe walking and slow sit-to-stands cut
            fall risk more than strength work alone. Hold a counter, count to twenty, breathe out on
            the effort — and never train balance alone if you feel unsteady.
          </div>
          <button
            type="button"
            onClick={() => go('breath')}
            style={{
              border: 'none', background: 'none', cursor: 'pointer', padding: 0,
              fontSize: 'calc(12px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
            }}
          >Pair with a long-exhale reset →</button>
        </Band>

        <div style={{ marginTop: 16 }}>
          <SessionButton name="Elder strength circuit" meta="24 min · fall-safe" />
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 14,
        }}>
          <TierBadge kind="ev" tierKey="well" />
          <button
            type="button"
            onClick={() => go('sources')}
            style={{
              border: 'none', background: 'none', cursor: 'pointer', padding: 0,
              fontSize: 'calc(12px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
            }}
          >Source: Elder Plant-Based Fitness →</button>
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== ancestral movement ===================== */

const LINEAGES = ['Zulu', 'Maasai', 'Dahomey', 'Capoeira', 'Taíno', 'Garifuna'];

export function AncestralScreen() {
  const { go, goBack } = useStore();

  return (
    <Screen>
      <DarkHeader eyebrow="Move · land-based traditions" title="Ancestral movement &amp; dance" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Strength, power and endurance are ancestral — encoded in dance and ritual long before the
          barbell. Fitness as remembrance, not punishment.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{
          fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700,
          color: 'var(--ink-muted)', marginBottom: 9,
        }}>Warrior lineages drawn on</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {LINEAGES.map((l) => (
            <span key={l} style={{
              fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700,
              background: 'var(--surface-2)', color: 'var(--ink-meta)',
              padding: '6px 12px', borderRadius: 16,
            }}>{l}</span>
          ))}
        </div>

        <Band tone="cream" title="Train to the drum" style={{ marginTop: 14 }}>
          Moving to rhythm isn&rsquo;t just culture — syncing effort to a beat (BPM) improves
          endurance, with athletes sustaining work about two minutes longer. Set the tempo to the
          work: slow drum for strength, faster for conditioning.
        </Band>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 14 }}>
          {(ancestralTraditions as any[]).map((t) => (
            <div key={t.name} style={{
              display: 'flex', gap: 11, alignItems: 'flex-start',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '13px 14px',
            }}>
              <span aria-hidden="true" style={{
                width: 10, height: 10, borderRadius: '50%', flex: 'none',
                background: t.c, marginTop: 5,
              }} />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 'calc(14px * var(--scale))', fontWeight: 700, color: 'var(--ink)',
                }}>{t.name}</div>
                {/* Named attribution, always — this is Content Rule 11 in practice. */}
                <div style={{
                  fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700,
                  color: t.c, marginTop: 2,
                }}>{t.origin}</div>
                <p className="rs-prose" style={{
                  fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
                  lineHeight: 1.5, margin: '5px 0 0',
                }}>{t.builds}</p>
              </div>
            </div>
          ))}
        </div>

        {/*
          Content Rule 10: restricted ritual knowledge stays out. This band is the
          boundary the whole screen operates inside, so it is not optional chrome.
        */}
        <Band tone="labour" title="Cultural protocol" style={{ marginTop: 16 }}>
          Some movements are sacred and belong to specific lineages and ceremonies. The app teaches
          them only with named attribution and never presents ritual dance as a generic
          &ldquo;workout&rdquo; or as a substitute for its cultural context.
        </Band>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 14,
        }}>
          <TierBadge kind="ev" tierKey="trad" />
          <button
            type="button"
            onClick={() => go('sources')}
            style={{
              border: 'none', background: 'none', cursor: 'pointer', padding: 0,
              fontSize: 'calc(12px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
            }}
          >Source: Ancestral Movement &amp; Ritual →</button>
        </div>

        <div style={{ marginTop: 16 }}>
          <SessionButton name="Ancestral movement — Kalenda rhythm" meta="28 min · barefoot" />
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== breathwork ===================== */

const BREATH_PRACTICES = [
  { name: 'Nasal breathing warm-up', meta: '3 min · before training', c: '#2F4A31' },
  { name: 'Between-set recovery', meta: '30 sec · lowers heart rate', c: '#2E6B7A' },
  { name: 'Safe bracing for lifts', meta: '2 min · learn · no breath-holds', c: '#7E5F1C' },
  { name: 'Morning energy practice', meta: '5 min · sunrise rhythm', c: '#8F4230' },
];

export function BreathScreen() {
  const { state, go, goBack } = useStore();
  const reduced = !!state.a11y.reduce;

  return (
    <Screen>
      <DarkHeader eyebrow="Recovery · 4 min" title="Long-exhale reset" back={goBack}>
        {/*
          The breathing circle. With reduced motion on it stops moving, so the
          instruction changes from "follow the circle" to the explicit count —
          the practice has to remain usable without the animation.
        */}
        <div style={{
          position: 'relative', height: 190,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span aria-hidden="true" style={{
            position: 'absolute', width: 150, height: 150, borderRadius: '50%',
            background: 'rgba(199,154,69,0.22)',
            animation: reduced ? 'none' : 'rs-breathe-halo 12s ease-in-out infinite',
          }} />
          <span aria-hidden="true" style={{
            position: 'absolute', width: 110, height: 110, borderRadius: '50%',
            background: 'var(--ochre)', opacity: 0.85,
            animation: reduced ? 'none' : 'rs-breathe 12s ease-in-out infinite',
          }} />
          <div style={{ position: 'relative', textAlign: 'center', color: 'var(--forest)' }}>
            <div style={{
              fontFamily: 'var(--font-serif)', fontSize: 'calc(21px * var(--scale))', fontWeight: 600,
            }}>Breathe</div>
            <div style={{ fontSize: 'calc(11px * var(--scale))', fontWeight: 700, marginTop: 2 }}>
              {reduced ? 'in for 4 · out for 8' : 'follow the circle'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 9 }}>
          {[
            { n: '4s', l: 'inhale · nose' },
            { n: '8s', l: 'slow exhale' },
            { n: '20', l: 'rounds' },
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
        <SessionButton name="Breathwork & mobility reset" meta="14 min · long exhale" />

        <Band tone="cream" title="Why this, tonight" style={{ marginTop: 14 }}>
          A long exhale shifts you toward rest-and-digest — where muscle repair and
          tomorrow&rsquo;s farm-day recovery actually happen.
        </Band>

        <Band tone="cream" title="Nature immersion · anabolic medicine" style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 10 }}>
            Recovering outdoors isn&rsquo;t passive rest. Green space lowers cortisol, morning sun
            supports anabolic hormones, and grounding shifts you parasympathetic — measurably
            faster muscle repair than the same rest indoors.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <TierBadge kind="ev" tierKey="emerging" />
            <button
              type="button"
              onClick={() => go('sources')}
              style={{
                border: 'none', background: 'none', cursor: 'pointer', padding: 0,
                fontSize: 'calc(12px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
              }}
            >Source: Nature Immersion →</button>
          </div>
        </Band>

        <Band tone="cream" title="Food for a calm nervous system" style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 10 }}>
            The vagus nerve runs through the gut — omega-3s (flax, chia), magnesium (pumpkin seeds,
            cacao) and fermented foods raise heart-rate variability and signal safety to the body.
            Recovery is fueled, not just rested.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <TierBadge kind="ev" tierKey="emerging" />
            <button
              type="button"
              onClick={() => go('sources')}
              style={{
                border: 'none', background: 'none', cursor: 'pointer', padding: 0,
                fontSize: 'calc(12px * var(--scale))', fontWeight: 700, color: 'var(--earth)',
              }}
            >Source: Nervous-System Frequencies →</button>
          </div>
        </Band>

        <H3>More practices</H3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {BREATH_PRACTICES.map((b) => (
            <div key={b.name} style={{
              display: 'flex', gap: 11, alignItems: 'center',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '12px 13px',
            }}>
              <span aria-hidden="true" style={{
                width: 10, height: 10, borderRadius: '50%', flex: 'none', background: b.c,
              }} />
              <span style={{ flex: 1 }}>
                <span style={{
                  display: 'block', fontSize: 'calc(13.5px * var(--scale))',
                  fontWeight: 700, color: 'var(--ink)',
                }}>{b.name}</span>
                <span style={{
                  display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                  color: 'var(--ink-meta)', marginTop: 2,
                }}>{b.meta}</span>
              </span>
            </div>
          ))}
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== hike ===================== */

const HIKE_CONDITIONS = [
  { label: 'Weather', value: '74° · clear', c: '#2F4A31' },
  { label: 'Daylight', value: 'sunset 8:12p', c: '#7E5F1C' },
  { label: 'Air quality', value: 'AQI 34 · good', c: '#2E6B7A' },
  { label: 'Terrain', value: 'rocky ridge', c: '#665C4A' },
];

const HIKE_NEXT = [
  { name: 'Hill intervals · Quarry Loop', meta: 'Next week · 3.2 mi · Zone 3 bursts', c: '#8F4230' },
  { name: 'Loaded-pack hike · 20 lb', meta: 'Week 3 · builds farm carry capacity', c: '#2E6B7A' },
  { name: 'Foraging walk · lambsquarters & nettles', meta: 'Week 4 · with local guide', c: '#2F4A31' },
];

const HIKE_SAFETY = [
  { item: 'Water: 2L + electrolytes', done: true },
  { item: 'Trail fuel: millet-date bars, chickpea wraps', done: true },
  { item: 'Tell someone your route + return time', done: false },
  { item: 'Poison ivy & wild parsnip along mile 3 — know the leaves', done: false },
];

export function HikeScreen() {
  const { state, set, goBack } = useStore();
  const checked = state.hikeChecked || {};
  const done = HIKE_SAFETY.filter((s, i) => (checked[i] === undefined ? s.done : checked[i])).length;

  return (
    <Screen>
      <DarkHeader eyebrow="Friday · Zone 2" title="Ridge Trail — 5 miles" back={goBack}>
        {/* Elevation profile, as CSS-free inline SVG like the rest of the app */}
        <svg viewBox="0 0 340 90" width="100%" height="90" role="img"
          aria-label="Elevation profile: a steady climb to the summit at mile 3, then rolling ground to the finish.">
          <polyline points="0,78 40,66 80,70 120,44 160,50 200,26 240,34 280,18 310,28 340,22"
            fill="none" stroke="#C79A45" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          <polyline points="0,78 40,66 80,70 120,44 160,50 200,26 240,34 280,18 310,28 340,22 340,90 0,90"
            fill="rgba(199,154,69,0.16)" stroke="none" />
          <circle cx="200" cy="26" r="4" fill="#F4EDDF" />
          <text x="200" y="14" textAnchor="middle" fill="#F4EDDF" fontSize="10" fontWeight="700">
            summit · mi 3
          </text>
        </svg>

        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {[
            { n: '5.0', l: 'miles' }, { n: '860', l: 'ft gain' },
            { n: '2:10', l: 'est. time' }, { n: 'Z2', l: 'conversational' },
          ].map((s) => (
            <div key={s.l} style={{
              flex: 1, minWidth: 0, background: 'rgba(244,237,223,0.13)', borderRadius: 14, padding: '10px 8px',
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: 'calc(17px * var(--scale))',
                fontWeight: 600, color: 'var(--ochre-light)',
              }}>{s.n}</div>
              <div style={{ fontSize: 'calc(9.5px * var(--scale))', lineHeight: 1.3, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 9 }}>
          {HIKE_CONDITIONS.map((c) => (
            <div key={c.label} style={{
              display: 'flex', gap: 9, alignItems: 'center',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '11px 12px',
            }}>
              <span aria-hidden="true" style={{
                width: 9, height: 9, borderRadius: '50%', flex: 'none', background: c.c,
              }} />
              <span>
                <span style={{
                  display: 'block', fontSize: 'calc(10.5px * var(--scale))',
                  fontWeight: 800, textTransform: 'uppercase',
                  letterSpacing: 0.6, color: 'var(--ink-meta)',
                }}>{c.label}</span>
                <span style={{
                  display: 'block', fontSize: 'calc(12.5px * var(--scale))',
                  fontWeight: 700, color: 'var(--ink)', marginTop: 2,
                }}>{c.value}</span>
              </span>
            </div>
          ))}
        </div>

        <Band tone="safety" title="Heat &amp; hydration note" style={{ marginTop: 14 }}>
          Warm afternoon — start before 4pm, sip every 20 min. Your sorrel-electrolyte mix from
          Thursday&rsquo;s plan fits here.
        </Band>

        <H3>Trail-safety checklist</H3>
        <div role="status" style={{
          fontSize: 'calc(11.5px * var(--scale))', fontWeight: 700,
          color: 'var(--ink-meta)', margin: '-4px 0 9px',
        }}>{done} of {HIKE_SAFETY.length} ready</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {HIKE_SAFETY.map((s, i) => {
            const on = checked[i] === undefined ? s.done : checked[i];
            return (
              <button
                key={s.item}
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => set((st) => ({ hikeChecked: { ...st.hikeChecked, [i]: !on } }))}
                style={{
                  display: 'flex', width: '100%', gap: 11, alignItems: 'center', textAlign: 'left',
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-tile)', padding: '12px 13px', cursor: 'pointer', minHeight: 44,
                }}
              >
                <span aria-hidden="true" style={{
                  width: 22, height: 22, flex: 'none', borderRadius: 7,
                  background: on ? 'var(--leaf)' : 'var(--card)',
                  border: '1px solid ' + (on ? 'var(--leaf)' : 'var(--border-2)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#FFFFFF', fontSize: 13, fontWeight: 800,
                }}>{on ? '✓' : ''}</span>
                <span style={{
                  flex: 1, minWidth: 0, fontSize: 'calc(12.5px * var(--scale))',
                  color: on ? 'var(--ink-meta)' : 'var(--ink)', lineHeight: 1.45,
                }}>{s.item}</span>
              </button>
            );
          })}
        </div>

        <H3>Progression</H3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {HIKE_NEXT.map((h) => (
            <div key={h.name} style={{
              display: 'flex', gap: 11, alignItems: 'center',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-tile)', padding: '12px 13px',
            }}>
              <span aria-hidden="true" style={{
                width: 10, height: 10, borderRadius: '50%', flex: 'none', background: h.c,
              }} />
              <span style={{ flex: 1 }}>
                <span style={{
                  display: 'block', fontSize: 'calc(13.5px * var(--scale))',
                  fontWeight: 700, color: 'var(--ink)',
                }}>{h.name}</span>
                <span style={{
                  display: 'block', fontSize: 'calc(11.5px * var(--scale))',
                  color: 'var(--ink-meta)', marginTop: 2,
                }}>{h.meta}</span>
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <SessionButton name="Ridge hike — zone 2" meta="5.2 mi · 1,180 ft climb" />
        </div>

        <div style={{
          fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
          textAlign: 'center', marginTop: 10, lineHeight: 1.5,
        }}>
          Works offline on the trail. Route shared only if you choose.
        </div>
      </Gutter>
    </Screen>
  );
}
