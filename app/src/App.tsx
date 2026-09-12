import { Component, Suspense, type ReactNode } from 'react';
import { StoreProvider, useStore } from './state/store';
import { Shell } from './components/Shell';
import { activeTab, ROUTES } from './nav/routes';
import { lazyScreens } from './nav/screens';
import { Screen, Gutter, Band } from './components/ui';
import { DarkHeader } from './components/Headers';

/*
  Screens are loaded per module, on first use - see nav/screens.ts for why, and
  for how the SSR gates still render every one of them synchronously.

  Built once at module load, not per render: React.lazy must be called outside
  render or every navigation would create a new component type and remount.
*/
const SCREENS = lazyScreens();

const TAB_LABEL: Record<string, string> = {
  today: 'Today', nourish: 'Nourish', move: 'Move', explore: 'Explore', journey: 'Journey',
};

function NotBuiltYet() {
  const { state, goBack, go } = useStore();
  const tab = activeTab(state.route);

  return (
    <Screen>
      <DarkHeader
        eyebrow={tab ? TAB_LABEL[tab] : 'Rooted Strength'}
        title={state.route}
        back={goBack}
      />
      <Gutter style={{ paddingTop: 18 }}>
        <Band tone="safety" title="This screen is not built yet">
          <p style={{ margin: 0, lineHeight: 1.55 }}>
            <code>{state.route}</code> is not one of the routes this app knows how to draw.
          </p>
        </Band>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
          {(['today', 'nourish', 'move', 'explore', 'codex', 'a11y'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => go(r)}
              style={{
                border: '1px solid var(--border-2)', background: 'var(--card)',
                color: 'var(--ink-muted)', borderRadius: 999, padding: '9px 14px',
                minHeight: 44, fontSize: 'calc(12.5px * var(--scale))',
                fontWeight: 700, cursor: 'pointer',
              }}
            >{r}</button>
          ))}
        </div>
      </Gutter>
    </Screen>
  );
}

/*
  A screen's chunk that will not load.

  With the service worker installed every chunk is precached, so this should be
  rare. It is not impossible: a first visit that went offline before the worker
  finished installing, or a browser that evicted the cache. Without a boundary
  the whole app would unmount to a white screen over one missing file. With it,
  the tab bar stays and the reader is told what happened.
*/
class ChunkBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <Screen>
        <Gutter style={{ paddingTop: 64 }}>
          <Band tone="safety" title="This screen didn't load">
            <p style={{ margin: 0, lineHeight: 1.55 }}>
              Part of the app hasn&rsquo;t downloaded to this phone yet, and there&rsquo;s no
              connection to fetch it. Everything you have logged is safe. Try again once you are
              back online.
            </p>
          </Band>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              width: '100%', minHeight: 44, cursor: 'pointer', marginTop: 12,
              border: '1px solid var(--border-2)', background: 'var(--card)',
              color: 'var(--ink)', borderRadius: 14, padding: 14,
              fontSize: 'calc(13.5px * var(--scale))', fontWeight: 800,
            }}
          >Try again</button>
        </Gutter>
      </Screen>
    );
  }
}

function Router() {
  const { state } = useStore();
  const known = (ROUTES as readonly string[]).includes(state.route);
  const Screen_ = (known && SCREENS[state.route]) || NotBuiltYet;
  /*
    Keying on the route restarts the rs-fade enter animation on every change,
    and resets the chunk boundary so one failed screen does not stick.

    height: 100% matters. The onboarding screens and the pregnancy flow use
    `min-height: 100%` to push their footer button to the bottom of the frame.
    A percentage resolves against the parent's HEIGHT, and min-height does not
    count — so without a definite height here that rule silently did nothing and
    those screens stopped 200px short. Content taller than the frame still
    overflows normally and .rs-scroll scrolls it.

    The Suspense fallback is deliberately empty: a chunk from the cache arrives
    in milliseconds, and a spinner that flashes for one frame is worse than
    nothing.
  */
  return (
    <Shell>
      <div key={state.route} style={{ height: '100%' }}>
        <ChunkBoundary>
          <Suspense fallback={null}>
            <Screen_ />
          </Suspense>
        </ChunkBoundary>
      </div>
    </Shell>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Router />
    </StoreProvider>
  );
}
