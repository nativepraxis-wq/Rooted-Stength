import { useStore, useA11y } from '../state/store';
import { DarkHeader } from '../components/Headers';
import { Screen, Gutter, Band, ToggleRow } from '../components/ui';

/*
  The accessibility control centre.

  This is a first-class product surface, not a settings afterthought — it is the
  screen the handoff treats as load-bearing. Eleven independent switches, each
  one actually wired: five drive document-level data attributes consumed by the
  token layer (dark, contrast, dyslexia, elder, reduce), and the rest gate real
  behaviour elsewhere in the app.

  Two of these ship ON by default and should stay that way: colour-blind-safe
  encoding, and offline access.
*/

/* Grouped so the list reads as sections rather than eleven undifferentiated rows. */
const GROUPS: { title: string; keys: string[] }[] = [
  { title: 'Seeing', keys: ['dark', 'contrast', 'colorblind', 'dyslexia'] },
  { title: 'Reading & motion', keys: ['plain', 'reduce', 'captions'] },
  { title: 'Input & reach', keys: ['voice', 'elder'] },
  { title: 'Connection', keys: ['lowbw', 'offline'] },
];

export function A11yScreen() {
  const { goBack } = useStore();
  const { a11y, toggle, meta } = useA11y();
  const onCount = Object.values(a11y).filter(Boolean).length;

  return (
    <Screen>
      <DarkHeader
        eyebrow="Journey · access"
        title="Accessibility"
        back={goBack}
      >
        <p className="rs-prose" style={{
          fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55,
          color: 'var(--on-dark-muted)', margin: 0,
        }}>
          Eleven settings, all independent, all revocable. Colour-blind-safe encoding and offline
          access are on when you arrive.
        </p>
        <div style={{
          marginTop: 12, fontSize: 'calc(11px * var(--scale))', fontWeight: 800,
          letterSpacing: 1, textTransform: 'uppercase', color: 'var(--ochre-light)',
        }}>{onCount} of 11 on</div>
      </DarkHeader>

      <Gutter style={{ paddingTop: 18 }}>
        {GROUPS.map((grp) => (
          <section key={grp.title} style={{ marginBottom: 20 }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'calc(18px * var(--scale))',
              fontWeight: 600, color: 'var(--ink)', margin: '0 0 9px',
            }}>{grp.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {grp.keys.map((k) => (
                <ToggleRow
                  key={k}
                  label={meta[k].label}
                  sub={meta[k].sub}
                  on={!!a11y[k]}
                  onToggle={() => toggle(k)}
                />
              ))}
            </div>
          </section>
        ))}

        <Band tone="cream" title="Reduced motion follows your device too">
          If your operating system is set to reduce motion, this app honours it whether or not the
          switch above is on. The switch exists so you can turn animation off here without changing
          a system-wide setting.
        </Band>

        <Band tone="cream" title="Reflow at 200%" style={{ marginTop: 12 }}>
          Text scales without content being cut off. Every screen has been checked at 200% and at a
          320px width: nothing scrolls sideways and no label is clipped. Long labels wrap onto a
          second line rather than being truncated, because a shortened evidence label would change
          what it claims.
        </Band>
      </Gutter>
    </Screen>
  );
}
