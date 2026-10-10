import { Glyph } from "./Glyph.jsx";
import { CONFETTI_COLORS } from "../game/palette.js";

// 18 confetti pieces for the child look's word card, spread across it (six bright colours, squares and circles).
const CONFETTI = Array.from({ length: 18 }, (_, i) => ({
  x: 8 + (i * 5.1) % 84,
  bg: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
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
 * @param {string[]} [props.letters]    The word's letters in order; with `pickedCount`, the picked ones are coloured.
 * @param {number} [props.pickedCount]  How many letters have been picked correctly so far.
 * @param {boolean} props.show          Fades the word in when true (start false, set true after mount).
 * @param {boolean} [props.centred]     Centre the word's ink in the frame (needs the Urdu font; child look).
 * @param {boolean} [props.fontReady]   True once the Urdu font has loaded.
 * @param {boolean} [props.confetti]    Shows confetti over the card (the word is complete, child look).
 */
export function TargetWord({ word, tags, letters, pickedCount = 0, show, centred = false, fontReady, confetti = false }) {
  // Colour the letters picked so far. Each letter is its own span (colour only, so the letters still join up);
  // only done when the letters add up to the word, otherwise the word is shown plain.
  const split = letters && letters.join("") === word;
  const content = split
    ? letters.map((l, i) => <span key={i} className={"wl" + (i < pickedCount ? " got" : "")}>{l}</span>)
    : word;
  return (
    <div className="gable">
      <div className="gableInner">
        <div className={"targetWord" + (show ? " show" : "")} lang="ur" title={tags?.join(", ")}>
          {centred ? <Glyph ch={word} ready={fontReady}>{content}</Glyph> : content}
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
