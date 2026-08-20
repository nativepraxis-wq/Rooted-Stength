import { useEffect, type ReactNode } from 'react';
import { useStore } from '../state/store';
import { activeTab, showChrome, TABS, type TabId } from '../nav/routes';
import { IconToday, IconNourish, IconMove, IconExplore, IconJourney, IconCouncil } from './Icons';
import { Toast } from './ui';
import { CouncilSheet } from './CouncilSheet';

const TAB_ICON: Record<TabId, typeof IconToday> = {
  today: IconToday, nourish: IconNourish, move: IconMove,
  explore: IconExplore, journey: IconJourney,
};

/*
  The prototype tinted the active tab forest and left the rest at #6E6757.
  (The README describes per-section tinting instead; the prototype is the
  primary reference, so its behaviour is what ships. See docs/DISCREPANCIES.md.)
*/
const ACTIVE = 'var(--forest-tab-active)';
const INACTIVE = 'var(--tab-inactive)';

function TabBar() {
  const { state, go } = useStore();
  const current = activeTab(state.route);

  return (
    <nav
      aria-label="Primary"
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 44,
        background: 'var(--tabbar-bg)', backdropFilter: 'blur(14px)',
        borderTop: '1px solid var(--border)', padding: '9px 8px 24px',
        display: 'flex', justifyContent: 'space-around',
      }}
    >
      {TABS.map((t) => {
        const Icon = TAB_ICON[t.id];
        const on = current === t.id;
        const color = on ? ACTIVE : INACTIVE;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => go(t.route)}
            aria-current={on ? 'page' : undefined}
            style={{
              /* minWidth: 0 - without it a flex item will not shrink below its
                 label, so five tabs overflow the bar at large text scale. */
              border: 'none', background: 'none', cursor: 'pointer', flex: 1, minWidth: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: 2, minHeight: 44,
            }}
          >
            <Icon color={color} />
            <span style={{
              fontSize: 'calc(10px * var(--scale))', fontWeight: 700, color,
              /* The label may wrap or ellipsise; the icon and the accessible
                 name still identify the tab. */
              maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis',
              lineHeight: 1.2, textAlign: 'center',
            }}>{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function CouncilFab() {
  const { set } = useStore();
  return (
    <button
      type="button"
      aria-label="Open the AI Council"
      onClick={() => set({ councilOpen: true })}
      style={{
        position: 'absolute', right: 18, bottom: 96, zIndex: 45,
        width: 58, height: 58, borderRadius: '50%', border: 'none', cursor: 'pointer',
        background: 'radial-gradient(circle at 35% 30%, #C79A45, #A8783A)',
        boxShadow: 'var(--shadow-fab)',
        animation: 'rs-float 4s ease-in-out infinite',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <IconCouncil />
    </button>
  );
}

/*
  App shell. The device bezel is a presentation nicety for the desktop preview;
  the app surface itself is the 393x852 viewport the design was drawn at.

  Accessibility flags are pushed onto <html> as data attributes so the token
  layer can respond to them in CSS. Dark mode is a real palette swap here, not
  the prototype's filter inversion.
*/
export function Shell({ children }: { children: ReactNode }) {
  const { state, registerScroller } = useStore();
  const a11y = state.a11y as Record<string, boolean>;
  const chrome = showChrome(state.route);

  useEffect(() => {
    const el = document.documentElement;
    el.dataset.theme = a11y.dark ? 'dark' : 'light';
    el.dataset.contrast = a11y.contrast ? 'on' : 'off';
    el.dataset.dyslexia = a11y.dyslexia ? 'on' : 'off';
    el.dataset.elder = a11y.elder ? 'on' : 'off';
    el.dataset.reduce = a11y.reduce ? 'on' : 'off';
    el.lang = 'en';
  }, [a11y.dark, a11y.contrast, a11y.dyslexia, a11y.elder, a11y.reduce]);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#17140F', padding: 20,
    }}>
      <div style={{
        width: 393, height: 852, borderRadius: 52, padding: 5,
        background: '#0B0906', boxShadow: '0 30px 70px -20px rgba(0,0,0,0.8)',
      }}>
        <div style={{
          position: 'relative', width: '100%', height: '100%',
          background: 'var(--sand)', borderRadius: 'var(--r-app)', overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
        }}>
          <div ref={registerScroller} className="rs-scroll" style={{ flex: 1 }}>
            {children}
          </div>

          {chrome && <CouncilFab />}
          {chrome && <TabBar />}
          <Toast />
          <CouncilSheet />
        </div>
      </div>
    </div>
  );
}
