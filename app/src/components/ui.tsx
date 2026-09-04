import { onColour } from '../data/paletteTokens';
import type { CSSProperties, ReactNode } from 'react';
import { useStore } from '../state/store';

/* ---------- text primitives ---------- */

export function Eyebrow({ children, color = 'var(--ink-meta)', style }: {
  children: ReactNode; color?: string; style?: CSSProperties;
}) {
  return (
    <div style={{
      fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 1.8,
      textTransform: 'uppercase', color, ...style,
    }}>{children}</div>
  );
}

export function H1({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <h1 style={{
      fontFamily: 'var(--font-serif)', fontSize: 'calc(29px * var(--scale))', fontWeight: 600,
      lineHeight: 1.1, color: 'var(--ink)', margin: 0, ...style,
    }}>{children}</h1>
  );
}

export function H2({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-serif)', fontSize: 'calc(20px * var(--scale))', fontWeight: 600,
      color: 'var(--ink)', margin: 0, ...style,
    }}>{children}</h2>
  );
}

export function Body({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <p className="rs-prose" style={{
      fontSize: 'calc(13px * var(--scale))', lineHeight: 1.55, color: 'var(--ink-muted)',
      margin: 0, ...style,
    }}>{children}</p>
  );
}

export function Meta({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{
      fontSize: 'calc(11.5px * var(--scale))', fontWeight: 600, lineHeight: 1.4,
      color: 'var(--ink-meta)', ...style,
    }}>{children}</div>
  );
}

/* ---------- containers ---------- */

export function Screen({ children, pad = 'var(--scroll-pad)' }: { children: ReactNode; pad?: string }) {
  return (
    <div style={{ animation: 'rs-fade var(--dur-route) ease', paddingBottom: pad }}>
      {children}
    </div>
  );
}

export function Gutter({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div style={{ padding: '0 var(--gutter)', ...style }}>{children}</div>;
}

export function Card({ children, style, onClick }: {
  children: ReactNode; style?: CSSProperties; onClick?: () => void;
}) {
  const s: CSSProperties = {
    background: 'var(--card)', borderRadius: 'var(--r-card)', padding: 16,
    boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)',
    textAlign: 'left', width: '100%', ...style,
  };
  if (onClick) {
    return (
      <button type="button" onClick={onClick} style={{ ...s, cursor: 'pointer', font: 'inherit', color: 'inherit' }}>
        {children}
      </button>
    );
  }
  return <div style={s}>{children}</div>;
}

/*
  A titled band. `tone` picks the band's ground: cream for craft/technique,
  rose for safety, forest for sovereignty notes, labour for the
  "who grew it, who was paid" band with its 5px clay left border.
*/
export function Band({ tone = 'cream', title, children, style }: {
  tone?: 'cream' | 'safety' | 'forest' | 'labour';
  title?: ReactNode; children: ReactNode; style?: CSSProperties;
}) {
  const tones: Record<string, CSSProperties> = {
    cream: { background: 'var(--surface-cream)', border: '1px solid var(--border-cream)' },
    safety: { background: 'var(--safety-bg)', border: '1px solid var(--border-rose)' },
    labour: {
      background: 'var(--safety-bg)', border: '1px solid var(--border-rose)',
      borderLeft: '5px solid var(--clay)',
    },
    forest: { background: 'var(--forest)', border: '1px solid var(--forest-2)' },
  };
  const onForest = tone === 'forest';
  return (
    <section style={{ borderRadius: 'var(--r-band)', padding: '15px 16px', ...tones[tone], ...style }}>
      {title && (
        <div style={{
          fontFamily: 'var(--font-serif)', fontSize: 'calc(17px * var(--scale))', fontWeight: 600,
          color: onForest ? 'var(--on-dark)' : 'var(--ink)', marginBottom: 6,
        }}>{title}</div>
      )}
      <div className="rs-prose" style={{
        fontSize: 'calc(12.5px * var(--scale))', lineHeight: 1.55,
        color: onForest ? 'var(--on-dark-muted)' : 'var(--ink-muted)',
      }}>{children}</div>
    </section>
  );
}

/* ---------- stats ---------- */

export function StatTiles({ stats }: { stats: { n: string; l: string }[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 9 }}>
      {stats.map((s) => (
        <div key={s.n + s.l} style={{
          background: 'var(--surface-1)', border: '1px solid var(--border)',
          borderRadius: 'var(--r-tile)', padding: '11px 12px',
        }}>
          <div style={{
            fontFamily: 'var(--font-serif)', fontSize: 'calc(19px * var(--scale))',
            fontWeight: 600, lineHeight: 1.15, color: 'var(--ink)',
          }}>{s.n}</div>
          <div style={{
            fontSize: 'calc(11px * var(--scale))', lineHeight: 1.35,
            color: 'var(--ink-meta)', marginTop: 2,
          }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- controls ---------- */

export function BackButton({ onDark = false, onClick, label = 'Go back' }: {
  onDark?: boolean; onClick: () => void; label?: string;
}) {
  return (
    <button
      type="button"
      className="rs-hit"
      aria-label={label}
      onClick={onClick}
      style={{
        width: 34, height: 34, flex: 'none', borderRadius: '50%', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 17, lineHeight: 1, paddingBottom: 2,
        background: onDark ? 'var(--scrim)' : 'var(--surface-3)',
        color: onDark ? 'var(--on-dark)' : 'var(--ink-body)',
        border: 'none',
        boxShadow: onDark ? 'inset 0 0 0 1px rgba(244,237,223,0.28)' : 'none',
      }}
    >
      <span aria-hidden="true">&#8249;</span>
    </button>
  );
}

/*
  The tab-selector pill used across the Explore surfaces. Selected fills with the
  section colour; unselected is a bordered card. aria-pressed carries the state
  for screen readers, since the fill alone would not.
*/
export function Chip({ selected, onClick, color = 'var(--clay)', children }: {
  selected: boolean; onClick: () => void; color?: string; children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      style={{
        border: selected ? '1px solid ' + color : '1px solid var(--border)',
        background: selected ? color : 'var(--card)',
        color: selected ? onColour(color) : 'var(--ink-muted)',
        borderRadius: 999, padding: '9px 14px', minHeight: 44,
        fontSize: 'calc(12.5px * var(--scale))', fontWeight: 700, cursor: 'pointer',
        /*
          `whiteSpace: normal` (was `nowrap`) so that in a WRAPPING row at large
          text a long chip wraps its label instead of outgrowing the frame and
          being clipped — losing the label, which is the whole control.

          But normal wrapping alone breaks the SCROLLING rows: flex items shrink
          by default, so instead of the row scrolling, every chip squeezed until
          its label wrapped — "Evening cool-down" came out as a circle with the
          word hyphen-broken across three lines. A row only scrolls if its items
          refuse to shrink, hence flexShrink: 0.

          maxWidth then keeps the wrapping-row guarantee intact: a chip wider
          than its container is capped and wraps inside itself rather than
          overflowing, which flexShrink: 0 would otherwise allow.
        */
        whiteSpace: 'normal',
        flexShrink: 0,
        maxWidth: '100%',
      }}
    >{children}</button>
  );
}

export function PrimaryButton({ onClick, children, style }: {
  onClick: () => void; children: ReactNode; style?: CSSProperties;
}) {
  return (
    <button type="button" onClick={onClick} style={{
      width: '100%', border: 'none', cursor: 'pointer', minHeight: 44,
      background: 'var(--forest)', color: 'var(--on-dark)', borderRadius: 14,
      padding: 14, fontSize: 'calc(14px * var(--scale))', fontWeight: 800, ...style,
    }}>{children}</button>
  );
}

export function SecondaryButton({ onClick, children, style }: {
  onClick: () => void; children: ReactNode; style?: CSSProperties;
}) {
  return (
    <button type="button" onClick={onClick} style={{
      width: '100%', border: '1px solid var(--border-2)', cursor: 'pointer', minHeight: 44,
      background: 'var(--card)', color: 'var(--ink-muted)', borderRadius: 14,
      padding: 13, fontSize: 'calc(13.5px * var(--scale))', fontWeight: 700, ...style,
    }}>{children}</button>
  );
}

/* A switch row for the accessibility centre and the consent grants. */
export function ToggleRow({ label, sub, on, onToggle }: {
  label: string; sub?: string; on: boolean; onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      style={{
        display: 'flex', width: '100%', gap: 12, alignItems: 'center', textAlign: 'left',
        background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r-tile)',
        padding: '13px 14px', cursor: 'pointer', minHeight: 44,
      }}
    >
      <span style={{ flex: 1 }}>
        <span style={{
          display: 'block', fontSize: 'calc(13.5px * var(--scale))',
          fontWeight: 700, color: 'var(--ink)',
        }}>{label}</span>
        {sub && (
          <span className="rs-prose" style={{
            display: 'block', fontSize: 'calc(11.5px * var(--scale))', lineHeight: 1.45,
            color: 'var(--ink-meta)', marginTop: 3, fontWeight: 500,
          }}>{sub}</span>
        )}
      </span>
      <span aria-hidden="true" style={{
        flex: 'none', width: 44, height: 26, borderRadius: 999, position: 'relative',
        background: on ? 'var(--leaf-mid)' : 'var(--border-2)',
        transition: 'background 0.18s ease',
      }}>
        <span style={{
          position: 'absolute', top: 3, left: on ? 21 : 3, width: 20, height: 20,
          borderRadius: '50%', background: '#FFFDF7', transition: 'left 0.18s ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }} />
      </span>
    </button>
  );
}

/* ---------- feedback ---------- */

export function Toast() {
  const { state, go } = useStore();
  if (!state.logToast) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'absolute', left: 14, right: 14, bottom: 92, zIndex: 50,
        background: 'var(--forest)', color: 'var(--on-dark)', borderRadius: 15,
        padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: '0 10px 30px -12px rgba(0,0,0,0.6)',
        animation: 'rs-fade 0.2s ease',
      }}
    >
      <span style={{ flex: 1, minWidth: 0, fontSize: 'calc(12.5px * var(--scale))', fontWeight: 600 }}>
        {state.logToast}
      </span>
      <button
        type="button"
        onClick={() => go(state.toastTo)}
        style={{
          border: 'none', background: 'none', cursor: 'pointer', minHeight: 44,
          color: 'var(--ochre-light)', fontSize: 'calc(12.5px * var(--scale))', fontWeight: 800,
        }}
      >{state.toastLabel}</button>
    </div>
  );
}
