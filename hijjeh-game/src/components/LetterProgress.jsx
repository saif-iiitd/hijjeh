import { Glyph } from "./Glyph.jsx";

/** One slot per letter of the word; slots fill in as the child picks correctly. */
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
