import type { CSSProperties, ReactNode } from 'react';
import { BackButton } from './ui';

/*
  The dark screen header: forest gradient, 28px bottom corners, 20px gutter.
  Used by today, the codex hubs and most section landings.
*/
export function DarkHeader({ eyebrow, title, right, children, back, style }: {
  eyebrow?: ReactNode;
  title: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
  back?: () => void;
  style?: CSSProperties;
}) {
  return (
    <header style={{
      background: 'linear-gradient(160deg, var(--forest), var(--forest-2))',
      borderRadius: '0 0 var(--r-header) var(--r-header)',
      padding: '54px 20px 24px',
      color: 'var(--on-dark)',
      ...style,
    }}>
      {back && <div style={{ marginBottom: 14 }}><BackButton onDark onClick={back} /></div>}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1 }}>
          {eyebrow && (
            <div style={{
              fontSize: 'calc(10.5px * var(--scale))', fontWeight: 800, letterSpacing: 2,
              textTransform: 'uppercase', color: 'var(--ochre-light)', marginBottom: 8,
            }}>{eyebrow}</div>
          )}
          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'calc(29px * var(--scale))',
            fontWeight: 600, lineHeight: 1.1, margin: 0, color: 'var(--on-dark)',
          }}>{title}</h1>
        </div>
        {right}
      </div>
      {children && <div style={{ marginTop: 14 }}>{children}</div>}
    </header>
  );
}

/*
  Darkens a hex colour by `amt` (0-1). Ported from the prototype, which used it
  to derive a stripe partner for data that carries only one colour — a plate has
  `c`, where a codex volume has `c1`/`c2`.
*/
export function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const p = (x: number) => Math.round(x * (1 - amt)).toString(16).padStart(2, '0');
  return '#' + p((n >> 16) & 255) + p((n >> 8) & 255) + p(n & 255);
}

/*
  Builds the 135-degree stripe texture used for codex volume spines and region
  headers. All texture in this app is CSS — there is no imagery to fall back on,
  which is what keeps the offline bundle self-contained.
*/
export function stripes(c1: string, c2: string, w = 9) {
  return (
    'repeating-linear-gradient(135deg,' +
    c1 + ',' + c1 + ' ' + w + 'px,' +
    c2 + ' ' + w + 'px,' + c2 + ' ' + w * 2 + 'px)'
  );
}

/*
  The 132px striped header on a codex region / pantry volume. A scrim keeps the
  back button and title legible over whatever stripe colours the volume carries.
*/
export function StripedHeader({ c1, c2, back, children }: {
  c1: string; c2: string; back: () => void; children?: ReactNode;
}) {
  return (
    <header style={{ position: 'relative', height: 132, background: stripes(c1, c2, 12) }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(15,13,10,0.55), rgba(15,13,10,0.30))',
      }} />
      <div style={{ position: 'absolute', top: 58, left: 18, right: 18 }}>
        <BackButton onDark onClick={back} />
      </div>
      {children}
    </header>
  );
}
