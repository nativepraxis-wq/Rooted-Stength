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
        /*
          The handoff specifies `white-space: nowrap` here. That is kept in
          spirit but not literally: with nowrap, a badge at 200% text overflows
          its row and is clipped by the fixed-width frame, losing the label
          outright. The label IS the meaning — tier is announced as text, never
          colour alone — so truncation is not an option either.

          Trade-off, stated honestly: at normal type sizes every short label
          still sits on one line, but the longest one ("Adapted from a
          meat/dairy original") now wraps to two lines in a dish row. There is
          not room for both it and the dish title on one line at 393px; before
          this change the title wrapped instead. Something wraps either way.
        */
        whiteSpace: 'normal',
        maxWidth: '100%',
        /* As a flex item, `min-width: auto` would pin this to its longest
           word and overflow the row at large text. */
        minWidth: 0,
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
