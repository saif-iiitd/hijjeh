import { glyphOffset } from "../game/glyph.js";

/** One Urdu letter with its ink centred in the box around it. `ready` = the Urdu font has loaded. */
export function Glyph({ ch, ready = true }) {
  const { dx, dy } = ready ? glyphOffset(ch) : { dx: 0, dy: 0 };
  return (
    <span className="glyph" style={{ transform: `translate(${dx}em, ${dy}em)` }}>
      {ch}
    </span>
  );
}
