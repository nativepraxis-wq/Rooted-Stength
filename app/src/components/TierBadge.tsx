import { resolveTier, evKeyFromLabel, type TierKind } from '../data/tiers';
import { useStore } from '../state/store';

/*
  The one badge used by every tier vocabulary in the app.

  Two accessibility rules are baked in rather than left to callers:
  - the label text is always rendered, so meaning never depends on colour;
  - a screen reader hears what kind of tier this is ("Evidence: Well
    established"), because a bare label out of context is ambiguous.

  Geometry is the handoff's: 9.5px / 800 / 3px 8px / radius 12px / nowrap.
*/
export function TierBadge({
  kind, tierKey, evLabel, style,
}: {
  kind: TierKind;
  /** A tier key, e.g. "well". */
  tierKey?: string;
  /** An evidence label as it appears in the data, e.g. "Well established". */
  evLabel?: string;
  style?: React.CSSProperties;
}) {
  const { state } = useStore();
  const { tier, noun } = resolveTier(kind, evLabel !== undefined ? evKeyFromLabel(evLabel) : tierKey);
  const pair = state.a11y.dark ? tier.dark : tier.light;

  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 'calc(9.5px * var(--scale))',
        fontWeight: 800,
        padding: '3px 8px',
        borderRadius: 12,
        whiteSpace: 'nowrap',
        background: pair.bg,
        color: pair.fg,
        ...style,
      }}
    >
      <span className="rs-sr">{noun}: </span>
      {state.a11y.colorblind && (
        <span aria-hidden="true" style={{ marginRight: 4, opacity: 0.85 }}>{tier.glyph}</span>
      )}
      {tier.label}
    </span>
  );
}
