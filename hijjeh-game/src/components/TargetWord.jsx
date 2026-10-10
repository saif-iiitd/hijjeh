import { Glyph } from "./Glyph.jsx";
import { TILE_PALETTE } from "../game/palette.js";

// 18 confetti pieces for the child look's word card, spread across it (the six tile colours, squares and circles).
const CONFETTI = Array.from({ length: 18 }, (_, i) => ({
  x: 8 + (i * 5.1) % 84,
  bg: TILE_PALETTE[i % 6].bg,
  radius: i % 3 ? "2px" : "50%",
  anim: `cf7${"abc"[i % 3]} ${(1.1 + (i % 4) * 0.15).toFixed(2)}s ease-out ${((i % 5) * 0.05).toFixed(2)}s both`
}));

/**
 * The Urdu word to spell, large, in a frame: a peaked gable in the grown-up look, a rounded card in the
 * child look (where finishing the word showers it with confetti). The word fades in when `show` turns true.
 *
 * @param {Object} props
 * @param {string} props.word           The word to display.
 * @param {string[]} [props.tags]       Optional teaching tags, shown as a tooltip.
 * @param {boolean} props.show          Fades the word in when true (start false, set true after mount).
 * @param {boolean} [props.centred]     Centre the word's ink in the frame (needs the Urdu font; child look).
 * @param {boolean} [props.fontReady]   True once the Urdu font has loaded.
 * @param {boolean} [props.confetti]    Shows confetti over the card (the word is complete, child look).
 */
export function TargetWord({ word, tags, show, centred = false, fontReady, confetti = false }) {
  return (
    <div className="gable">
      <div className="gableInner">
        <div className={"targetWord" + (show ? " show" : "")} lang="ur" title={tags?.join(", ")}>
          {centred ? <Glyph ch={word} ready={fontReady} /> : word}
        </div>
      </div>
      {confetti && (
        <div className="confetti" aria-hidden="true">
          {CONFETTI.map((c, i) => (
            <span key={i} style={{ left: c.x + "%", background: c.bg, borderRadius: c.radius, animation: c.anim }} />
          ))}
        </div>
      )}
    </div>
  );
}
