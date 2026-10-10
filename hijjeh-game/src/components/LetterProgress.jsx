import { Glyph } from "./Glyph.jsx";
import { tileVars } from "../game/palette.js";

/**
 * One slot per letter of the word. Slots fill as the child picks correctly: in the "done" colour on a ruled
 * underline in the grown-up look, or as a box in the colour of the tile it came from in the child look,
 * with the next slot pulsing. With `showHints` off, unfilled slots stay blank.
 *
 * @param {Object} props
 * @param {string[]} props.letters       The word's letters in order.
 * @param {string[]} [props.tiles]       The letters on the board; a filled slot takes the colour of its tile.
 * @param {number} props.pickedCount     How many letters have been picked correctly so far.
 * @param {boolean} [props.won]          The word is complete (no slot is "next").
 * @param {boolean} props.showHints      Show the not-yet-picked letters faintly.
 * @param {boolean} [props.fontReady]    True once the Urdu font has loaded (see `useUrduFont`).
 * @param {{ slot: number, n: number } | null} [props.hit]   The last correct pick; that slot glows or pops once.
 */
export function LetterProgress({ letters, tiles = [], pickedCount, won = false, showHints, fontReady, hit }) {
  return (
    <div className={"letterProgress " + (showHints ? "showLetters" : "hideLetters")} aria-label="Spelling progress" lang="ur">
      {letters.map((letter, idx) => {
        const filled = idx < pickedCount;
        const next = idx === pickedCount && !won;
        return (
          <span
            key={idx}
            className={"progressLetter" + (filled ? " done" : "") + (next ? " next" : "")}
            style={filled ? tileVars(Math.max(0, tiles.indexOf(letter))) : undefined}
            data-glow={hit && hit.slot === idx && filled ? (hit.n % 2 ? "a" : "b") : undefined}
          >
            <Glyph ch={letter} ready={fontReady} />
          </span>
        );
      })}
    </div>
  );
}
