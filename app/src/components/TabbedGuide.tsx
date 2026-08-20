import type { ReactNode } from 'react';
import { useStore } from '../state/store';
import { DarkHeader } from './Headers';
import { TierBadge } from './TierBadge';
import { Screen, Gutter, Band, Chip } from './ui';
import { allergenWord } from '../data/content';
import { blockedAllergens } from '../state/kitchen';

/*
  Nine Explore surfaces share one shape: a row of tab pills, a short story for
  the selected tab, and a list of named items each carrying an evidence grade.
  (nervines · waterMed · ferment · swaps · diabetes · ceremony · coconut ·
  honey · shroomRecipes)

  Building it once means the evidence badge, the allergen flagging and the
  screen-reader wiring are identical everywhere, which is what the handoff asks
  for — the tier system is meant to render the same on every surface.
*/

export type GuideGroup = {
  id: string;
  name: string;
  c: string;
  tint: string;
  story: string;
  items: { name: string; why: string; ev: string; has?: string; swapTo?: string }[];
};

export function TabbedGuide({
  eyebrow, title, lede, groups, stateKey, footer,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  groups: GuideGroup[];
  /** The state field holding the selected tab id. */
  stateKey: string;
  footer?: ReactNode;
}) {
  const { state, set, goBack } = useStore();
  const blocked = blockedAllergens(state);
  const sel = groups.find((g) => g.id === state[stateKey]) ?? groups[0];

  /*
    Items that clash with the profile are flagged in place with the reason and
    the swap — not removed. Same rule as every other list in the app.
  */
  const flagged = sel.items.filter((i) => i.has && blocked.includes(i.has)).length;

  return (
    <Screen>
      <DarkHeader eyebrow={eyebrow} title={title} back={goBack}>
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>{lede}</p>
      </DarkHeader>

      <Gutter style={{ paddingTop: 16 }}>
        <div className="rs-scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {groups.map((g) => (
            <Chip
              key={g.id}
              selected={g.id === sel.id}
              color={g.c}
              onClick={() => set({ [stateKey]: g.id })}
            >{g.name}</Chip>
          ))}
        </div>

        <div style={{
          marginTop: 14, background: sel.tint, borderRadius: 'var(--r-band)', padding: '15px 16px',
        }}>
          <div style={{
            fontSize: 'calc(11px * var(--scale))', letterSpacing: 1, textTransform: 'uppercase',
            fontWeight: 800, color: sel.c, marginBottom: 6,
          }}>{sel.name}</div>
          <p className="rs-prose" style={{
            fontSize: 'calc(12.5px * var(--scale))', color: '#4C463A',
            fontWeight: 600, lineHeight: 1.5, margin: 0,
          }}>{sel.story}</p>
        </div>

        {flagged > 0 && (
          <div role="status" style={{
            fontSize: 'calc(12px * var(--scale))', fontWeight: 700,
            color: 'var(--clay)', marginTop: 12,
          }}>
            {flagged === 1 ? '1 entry is flagged' : flagged + ' entries are flagged'} for your
            profile · shown with the reason, never hidden
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 12 }}>
          {sel.items.map((it) => {
            const clash = !!(it.has && blocked.includes(it.has));
            return (
              <div key={it.name} style={{
                background: clash ? 'var(--safety-bg)' : 'var(--card)',
                border: '1px solid ' + (clash ? 'var(--border-rose)' : 'var(--border)'),
                borderRadius: 'var(--r-tile)', padding: '13px 14px',
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start',
                }}>
                  <span style={{
                    fontSize: 'calc(14px * var(--scale))', fontWeight: 700,
                    color: clash ? 'var(--ink-muted)' : 'var(--ink)', lineHeight: 1.25,
                  }}>{it.name}</span>
                  <TierBadge kind="ev" evLabel={it.ev} style={{ flex: 'none' }} />
                </div>
                <p className="rs-prose" style={{
                  fontSize: 'calc(12.5px * var(--scale))', color: 'var(--ink-muted)',
                  lineHeight: 1.5, margin: '6px 0 0',
                }}>{it.why}</p>
                {clash && (
                  <div style={{
                    fontSize: 'calc(11.5px * var(--scale))', color: 'var(--clay)',
                    fontWeight: 700, marginTop: 6, lineHeight: 1.4,
                  }}>
                    contains {(allergenWord as any)[it.has!] || it.has}
                    {it.swapTo && ' · ' + it.swapTo}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {footer}
      </Gutter>
    </Screen>
  );
}

/* The standing herbal caution. Shown wherever a herb is named as a remedy. */
export function HerbCaution() {
  return (
    <Band tone="safety" title="Herbs are medicine" style={{ marginTop: 16 }}>
      They can interact with medications and aren&rsquo;t all safe in pregnancy or with health
      conditions. Treat this as traditional knowledge, not a prescription — check with a clinician
      or herbalist you trust.
    </Band>
  );
}
