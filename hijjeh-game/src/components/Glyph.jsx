import { glyphOffset } from "../game/glyph.js";

/**
 * One Urdu letter with its ink optically centred in the box around it.
 * Nastaliq letters sit at different heights, so a plain centred span looks off; this measures the
 * letter once and nudges it. Use it for every single letter shown large (tiles, progress slots).
 * It fills a `line-height: 1` box; give the parent a font size and `display: grid; place-items: center`.
 *
 * @param {Object} props
 * @param {string} props.ch          The single letter to show.
 * @param {boolean} [props.ready]    True once the Urdu font has loaded (see `useUrduFont`); before that no nudge is applied.
 */
export function Glyph({ ch, ready = true }) {
  const { dx, dy } = ready ? glyphOffset(ch) : { dx: 0, dy: 0 };
  return (
    <span className="glyph" style={{ transform: `translate(${dx}em, ${dy}em)` }}>
      {ch}
    </span>
  );
}
