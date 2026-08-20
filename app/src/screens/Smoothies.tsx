import type { ReactNode } from 'react';
import { useStore } from '../state/store';
import {
  sbList, sbEffective, sbTotals, sbName, sbVerdict, sbHiddenLine, sbParts, blockedAllergens,
} from '../state/kitchen';
import { smoothies, kidSmoothies, proteinLeaders, allergenWord } from '../data/content';
import { DarkHeader } from '../components/Headers';
import { Screen, Gutter, Band, PrimaryButton, SecondaryButton } from '../components/ui';

/*
  A recipe card. Flagged recipes stay in the list, sorted last, and carry the
  reason plus the swap that would fix them.
*/
function SmoothieCard({ s }: { s: any }) {
  return (
    <div style={{
      background: s.flagged ? 'var(--safety-bg)' : 'var(--card)',
      border: '1px solid ' + (s.flagged ? 'var(--border-rose)' : 'var(--border)'),
      borderRadius: 'var(--r-tile)', padding: 0, display: 'flex', overflow: 'hidden',
    }}>
      <div aria-hidden="true" style={{ width: 11, flex: 'none', background: s.c }} />
      <div style={{ flex: 1, minWidth: 0, padding: '13px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
          <div style={{
            fontFamily: 'var(--font-serif)', fontSize: 'calc(16.5px * var(--scale))',
            fontWeight: 600, color: s.flagged ? 'var(--ink-muted)' : 'var(--ink)', lineHeight: 1.2,
          }}>{s.name}</div>
          <span style={{
            fontSize: 'calc(10px * var(--scale))', fontWeight: 800,
            padding: '3px 8px', borderRadius: 12, whiteSpace: 'nowrap',
            background: 'var(--surface-2)', color: 'var(--ink-meta)',
          }}>{s.tag}</span>
        </div>
        <div style={{
          fontSize: 'calc(11.5px * var(--scale))', fontWeight: 800,
          color: 'var(--leaf)', marginTop: 4,
        }}>{s.p} protein · {s.kcal} kcal</div>
        <div className="rs-prose" style={{
          fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
          lineHeight: 1.5, marginTop: 5,
        }}>{s.base}</div>
        {s.flagged && (
          <div style={{
            fontSize: 'calc(11.5px * var(--scale))', color: 'var(--clay)',
            fontWeight: 700, marginTop: 6, lineHeight: 1.4,
          }}>{s.flagLabel}</div>
        )}
      </div>
    </div>
  );
}

/* ===================== smoothies ===================== */

export function SmoothiesScreen() {
  const { state, go, goBack } = useStore();
  const blocked = blockedAllergens(state);

  /*
    Flag rather than filter: a recipe that clashes is marked, pushed to the end
    of the list, and told what to swap. It is never removed from view.
  */
  const mark = (arr: any[]) => {
    let n = 0;
    const out = arr.map((x) => {
      const bad = !!(x.has && blocked.includes(x.has));
      if (bad) n++;
      return {
        ...x, flagged: bad,
        flagLabel: bad
          ? 'contains ' + ((allergenWord as any)[x.has] || x.has) + (x.swapTo ? ' · ' + x.swapTo : '')
          : '',
      };
    });
    out.sort((a, b) => (a.flagged ? 1 : 0) - (b.flagged ? 1 : 0));
    return { list: out, flagged: n };
  };

  const saved = state.savedSmoothies as any[];
  const main = mark(saved.concat(smoothies as any[]));
  const kids = mark(kidSmoothies as any[]);

  const flagLine = main.flagged === 0
    ? 'All ' + main.list.length + ' recipes fit your profile'
    : main.flagged + ' of ' + main.list.length + ' recipes flagged for your profile · shown last';

  return (
    <Screen>
      <DarkHeader eyebrow="Nourish · smoothies" title="Smoothie science" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Blends built to carry real protein, not just fruit. Aim for about 30 g after training.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <PrimaryButton onClick={() => go('smoothieBuilder')}>Build your own →</PrimaryButton>

        <div role="status" style={{
          fontSize: 'calc(12px * var(--scale))', fontWeight: 700,
          color: 'var(--ink-meta)', margin: '14px 0 10px',
        }}>{flagLine}</div>

        {saved.length > 0 && (
          <div style={{
            fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 1,
            textTransform: 'uppercase', color: 'var(--earth)', marginBottom: 8,
          }}>{saved.length} saved by you</div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {main.list.map((s) => <SmoothieCard key={s.name} s={s} />)}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 9px',
        }}>For the little ones</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {kids.list.map((s) => <SmoothieCard key={s.name} s={s} />)}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
          fontWeight: 600, color: 'var(--ink)', margin: '22px 0 9px',
        }}>Protein leaders</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(proteinLeaders as any[]).map((p) => (
            <div key={p.name} style={{
              display: 'flex', gap: 10, alignItems: 'baseline',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '11px 13px',
            }}>
              <span style={{
                flex: 1, minWidth: 0, fontSize: 'calc(13.5px * var(--scale))',
                fontWeight: 600, color: 'var(--ink)',
              }}>{p.name}</span>
              <span style={{
                fontSize: 'calc(12.5px * var(--scale))', fontWeight: 800, color: 'var(--leaf)',
              }}>{p.g}</span>
            </div>
          ))}
        </div>
        <div style={{
          fontSize: 'calc(11.5px * var(--scale))', color: 'var(--ink-meta)',
          marginTop: 8, lineHeight: 1.5,
        }}>
          {(proteinLeaders as any[]).map((p) => p.name + ' — ' + p.note).join(' · ')}
        </div>
      </Gutter>
    </Screen>
  );
}

/* ===================== smoothieBuilder ===================== */

function BuilderGroup({ label, note, children }: {
  label: string; note?: string; children: ReactNode;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{
        fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700,
        color: 'var(--ink-muted)', marginBottom: 8,
      }}>
        {label}
        {note && <span style={{ fontWeight: 600, color: 'var(--ink-meta)' }}> · {note}</span>}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{children}</div>
    </div>
  );
}

/* Builder pill — clay when selected, matching the prototype's builder chips. */
function SbChip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      style={{
        border: '1px solid ' + (on ? 'var(--clay)' : 'var(--border-2)'),
        background: on ? 'var(--clay)' : 'var(--card)',
        color: on ? 'var(--on-dark)' : 'var(--ink-muted)',
        borderRadius: 20, padding: '9px 14px', minHeight: 44,
        fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, cursor: 'pointer',
      }}
    >{children}</button>
  );
}

export function SmoothieBuilderScreen() {
  const { state, set, go, goBack, pushLog } = useStore();
  const eff = sbEffective(state);
  const totals = sbTotals(state);
  const name = sbName(state);
  const verdict = sbVerdict(state);

  const save = () => {
    const entry = {
      name, p: totals.p + 'g', kcal: String(totals.k),
      base: sbParts(state).join(', '), tag: 'Yours', c: '#2F4A31',
    };
    set((s) => ({ savedSmoothies: [entry, ...s.savedSmoothies], sbToast: true }));
    window.setTimeout(() => set({ sbToast: false }), 1800);
  };

  /*
    Blending logs the smoothie as a real plate, with its computed protein and
    calories — the toast reports the actual number, not a generic confirmation.
  */
  const blend = () => {
    pushLog({
      kind: 'plate', name: name + ' smoothie', p: totals.p, kcal: totals.k,
      meta: totals.p + 'g protein · ' + totals.k + ' kcal · blended',
      toast: name + ' logged — ' + totals.p + 'g protein',
    });
    go('today');
  };

  return (
    /*
      230px bottom padding, not the standard 120px: the summary footer is the
      tallest state in the app and has to clear the chips behind it.
    */
    <Screen pad="230px">
      <DarkHeader eyebrow="Smoothie science" title="Build your own" back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Tap to blend. Aim for ~30 g protein post-training.
        </p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        {/* Which ingredients the profile removed, named rather than just missing */}
        <button
          type="button"
          onClick={() => { set({ profileReturn: 'smoothieBuilder' }); go('ob3'); }}
          style={{
            display: 'flex', width: '100%', gap: 10, alignItems: 'center', textAlign: 'left',
            background: 'var(--surface-1)', border: '1px solid var(--border)',
            borderRadius: 14, padding: '11px 13px', cursor: 'pointer',
            marginBottom: 16, minHeight: 44,
          }}
        >
          <span style={{
            flex: 1, minWidth: 0, fontSize: 'calc(11.5px * var(--scale))',
            color: 'var(--ink-muted)', lineHeight: 1.45,
          }}>{sbHiddenLine(state)}</span>
          <span style={{
            fontSize: 'calc(11.5px * var(--scale))',
            fontWeight: 800, color: 'var(--earth)',
          }}>Edit</span>
        </button>

        <BuilderGroup label="Protein base">
          {sbList(state, 'protein').map((o: any) => (
            <SbChip key={o.id} on={eff.protein === o.id}
              onClick={() => set((s) => ({ sb: { ...s.sb, protein: o.id } }))}>{o.name}</SbChip>
          ))}
        </BuilderGroup>

        <BuilderGroup label="Fruit">
          {sbList(state, 'fruit').map((o: any) => (
            <SbChip key={o.id} on={eff.fruit === o.id}
              onClick={() => set((s) => ({ sb: { ...s.sb, fruit: o.id } }))}>{o.name}</SbChip>
          ))}
        </BuilderGroup>

        <BuilderGroup label="Boosts" note="add any">
          {sbList(state, 'boost').map((o: any) => (
            <SbChip key={o.id} on={!!eff.boost[o.id]}
              onClick={() => set((s) => ({
                sb: { ...s.sb, boost: { ...s.sb.boost, [o.id]: !s.sb.boost[o.id] } },
              }))}>{o.name}</SbChip>
          ))}
        </BuilderGroup>

        <BuilderGroup label="Liquid">
          {sbList(state, 'liquid').map((o: any) => (
            <SbChip key={o.id} on={eff.liquid === o.id}
              onClick={() => set((s) => ({ sb: { ...s.sb, liquid: o.id } }))}>{o.name}</SbChip>
          ))}
        </BuilderGroup>

        <Band tone="cream" title="Blending is not juicing">
          Blending keeps the whole fruit, fibre included, which is what keeps the glucose response
          gentler than juice. Nothing here is a cleanse or a detox — it is food in a cup.
        </Band>
      </Gutter>

      {/* Sticky summary footer — the state the 230px padding exists to clear. */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 78, zIndex: 43,
        background: 'var(--card-warm)', borderTop: '1px solid var(--border)',
        padding: '12px 18px 14px',
      }}>
        <div aria-hidden="true" style={{
          height: 8, borderRadius: 6, background: 'var(--surface-2)',
          overflow: 'hidden', marginBottom: 10,
        }}>
          <div style={{
            height: '100%', borderRadius: 6,
            width: Math.min(Math.round((totals.p / 40) * 100), 100) + '%',
            background: verdict.met ? 'var(--leaf)' : 'var(--earth)',
          }} />
        </div>

        {state.sbToast && (
          <div role="status" style={{
            fontSize: 'calc(11.5px * var(--scale))', fontWeight: 800,
            color: 'var(--leaf)', marginBottom: 6,
          }}>Saved to your recipes ✓</div>
        )}

        <div style={{
          fontSize: 'calc(13.5px * var(--scale))', fontWeight: 800,
          color: 'var(--ink)', lineHeight: 1.25,
        }}>{name}</div>
        <div role="status" className="rs-prose" style={{
          fontSize: 'calc(11.5px * var(--scale))', lineHeight: 1.45, marginTop: 3,
          color: verdict.met ? 'var(--leaf)' : 'var(--earth)', fontWeight: 700,
        }}>{verdict.line}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
          <div>
            <span style={{
              fontSize: 'calc(22px * var(--scale))', fontWeight: 800, color: 'var(--ink)',
            }}>{totals.p}g</span>
            <span style={{
              fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-meta)', fontWeight: 700,
            }}> protein</span>
            <div style={{
              fontSize: 'calc(12px * var(--scale))', color: 'var(--ink-meta)', fontWeight: 700,
            }}>{totals.k} kcal</div>
          </div>
          <div style={{ flex: 1 }} />
          <SecondaryButton onClick={save} style={{ width: 'auto', padding: '12px 16px' }}>Save</SecondaryButton>
          <PrimaryButton onClick={blend} style={{ width: 'auto', padding: '12px 16px' }}>Blend &amp; log</PrimaryButton>
        </div>
      </div>
    </Screen>
  );
}
