import { Glyph } from "./Glyph.jsx";

/**
 * One underlined slot per letter of the word. Slots fill in the accent "done" colour as the child
 * picks correctly; with `showHints` off, unfilled slots stay blank.
 *
 * @param {Object} props
 * @param {string[]} props.letters       The word's letters in order.
 * @param {number} props.pickedCount     How many letters have been picked correctly so far.
 * @param {boolean} props.showHints      Show the not-yet-picked letters faintly.
 * @param {boolean} [props.fontReady]    True once the Urdu font has loaded (see `useUrduFont`).
 */
export function LetterProgress({ letters, pickedCount, showHints, fontReady }) {
  return (
    <div className={"letterProgress " + (showHints ? "showLetters" : "hideLetters")} aria-label="Spelling progress" lang="ur">
      {letters.map((letter, idx) => (
        <span key={idx} className={"progressLetter " + (idx < pickedCount ? "done" : "")}>
          <Glyph ch={letter} ready={fontReady} />
        </span>
      ))}
    </div>
  );
}
