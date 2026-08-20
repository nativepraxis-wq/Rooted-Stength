/*
  Icons are inline SVG with paths extracted from the prototype verbatim. There
  is no icon dependency by design — the handoff ships no raster assets and the
  offline bundle has to stay self-contained.
*/

type IconProps = { color?: string; size?: number };

const base = (size: number) => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none' as const,
  strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
});

/* Today — a stylised plant with a filled seed at its centre. */
export function IconToday({ color = 'currentColor', size = 23 }: IconProps) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={2} aria-hidden="true">
      <g transform="translate(0.8525,1.808) scale(0.91)">
        <path d="M12.1 4.8c2.5.1 4.2 2.1 4.2 4.9 0 3-1.9 5.1-4.3 5.1S7.6 12.7 7.6 9.7c0-2.8 1.8-4.9 4.5-4.9Z" strokeWidth="1.98" />
        <path d="M12 8.6c1 0 1.7.7 1.7 1.7s-.7 1.7-1.7 1.7-1.7-.7-1.7-1.7.7-1.7 1.7-1.7Z" fill={color} stroke="none" />
        <path d="M12.2 4.6c.2-1.3 1-2.3 2.4-2.9" strokeWidth="1.76" />
        <path d="M10.3 14.4c-.8 2.1-2.1 3.6-3.9 4.5" strokeWidth="1.54" />
        <path d="M12.1 14.9c.1 2.3.4 4.2 1.1 5.8" strokeWidth="1.54" />
        <path d="M13.9 14.3c1 1.9 2.4 3.2 4.2 4" strokeWidth="1.43" />
      </g>
    </svg>
  );
}

export function IconNourish({ color = 'currentColor', size = 23 }: IconProps) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={2} aria-hidden="true">
      <g transform="translate(-1.1,-0.55)">
        <path d="M7.5 13c-.6 4 1.8 7.7 4.7 7.7s5.3-3.7 4.7-7.7c-.4-2.3-2-3.6-4.7-3.6S7.9 10.7 7.5 13Z" strokeWidth="1.7" />
        <path d="M12.1 9.3c-.1-1.9.5-3.5 1.7-4.9" strokeWidth="1.6" />
        <path d="M13.5 5.9c1.9-1.1 3.7-1.1 5.3-.3-1.2 2.1-3.2 3-5.6 2.7" strokeWidth="1.5" />
        <path d="M10.2 15.4c1.2 1 2.5 1.4 3.9 1.2" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

export function IconMove({ color = 'currentColor', size = 23 }: IconProps) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={2} aria-hidden="true">
      <g transform="translate(-0.7,-0.55)">
        <path d="M4.4 20.6C6.3 13.5 10 8.4 15.6 5.1" strokeWidth="2.3" />
        <path d="M15.9 4.9c2.6-.9 5-.4 6.7 1.1-2 2.1-4.6 2.7-7.3 1.7" strokeWidth="1.7" />
        <path d="M8.2 13c-1.9-1.2-3.8-1.4-5.4-.6 1.2 2.1 3.2 2.9 5.5 2.6" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

export function IconExplore({ color = 'currentColor', size = 23 }: IconProps) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={2} aria-hidden="true">
      <g transform="translate(-0.5625,-5.625) scale(1.25)">
        <path d="M4.2 20.6C4.6 15 7 10.7 10.8 8.5c3.1-1.8 6.1-.6 6.8 1.8.7 2.3-.8 4.4-2.9 4.6-1.8.2-3.1-1-2.9-2.6.1-1.1 1-1.8 2-1.6" strokeWidth="1.44" />
        <path d="M6.4 15.1c-1.5-.7-2.9-.7-4.1-.2" strokeWidth="1.12" />
        <path d="M8.6 11.3c-1.2-.9-2.5-1.2-3.8-1" strokeWidth="1.04" />
      </g>
    </svg>
  );
}

export function IconJourney({ color = 'currentColor', size = 23 }: IconProps) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={2} aria-hidden="true">
      <path d="M12 3.4c-.2 5.7-.2 11.4 0 17.1" strokeWidth="1.8" />
      <path d="M12.1 8.6c1.8-2.6 4-3.6 6.3-3.3-.7 2.8-2.8 4.4-6.3 4.6" strokeWidth="1.5" />
      <path d="M11.9 11.8c-2-2-4.3-2.8-6.4-2.4 1 2.5 3.1 3.7 6.4 3.8" strokeWidth="1.5" />
      <path d="M12.1 15.9c1.7 1.5 2.5 3 2.5 4.7" strokeWidth="1.3" />
      <path d="M11.9 17.1c-1.5 1.3-2.2 2.5-2.2 3.6" strokeWidth="1.2" />
    </svg>
  );
}

/* The AI Council mark: seven nodes wired to a heavier centre. */
export function IconCouncil({ color = '#1E3A2B', size = 30 }: IconProps) {
  const nodes: [number, number][] = [
    [15, 6], [15, 24], [6.6, 10.2], [23.4, 10.2], [6.6, 19.8], [23.4, 19.8],
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <circle cx="15" cy="15" r="4.4" fill={color} />
      {nodes.map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" fill={color} />)}
      <g stroke={color} strokeWidth="1">
        {nodes.map(([x2, y2]) => <line key={`l-${x2}-${y2}`} x1="15" y1="15" x2={x2} y2={y2} />)}
      </g>
    </svg>
  );
}
