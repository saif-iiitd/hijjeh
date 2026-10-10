import { useEffect } from "react";

/** The id passed to `onPick` when the Free play row is chosen. */
export const FREE_PLAY = "free";

/**
 * A bottom sheet for choosing what to play: a dimmed backdrop (tap it to close), a heading with a close button,
 * one row per book with its cover and English title, and a "Free play" row last. The current choice is highlighted.
 * Esc also closes it.
 *
 * @param {Object} props
 * @param {import("../data/types.js").Book[]} props.books   The installed books.
 * @param {string | null} props.currentId                  Id of the loaded book, or null in free play.
 * @param {number} props.seenCount                         Words of the loaded book already played.
 * @param {(bookId: string) => void} props.onPick          Called with the chosen book's id, or `FREE_PLAY`.
 * @param {() => void} props.onClose                       Called to close the sheet without choosing.
 */
export function BookPicker({ books, currentId, seenCount, onPick, onClose }) {
  useEffect(() => {
    const onKey = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div className="pickerScrim" onClick={onClose} />
      <div className="picker" role="dialog" aria-modal="true" aria-label="Choose a book">
        <div className="pickerHead">
          <div className="pickerTitle">Choose a book or Free play</div>
          <button className="pickerClose" onClick={onClose} aria-label="Close">×</button>
        </div>
        {books.map(b => (
          <button
            key={b.id}
            className={"pickerRow" + (b.id === currentId ? " current" : "")}
            style={{ "--accent": b.accent }}
            onClick={() => onPick(b.id)}
          >
            {b.cover && <img src={b.cover} alt="" width="48" height="68" />}
            <span className="pickerText">
              <span className="pickerEn">{b.titleEn || b.title}</span>
            </span>
            <span className="pickerCount">{b.id === currentId ? seenCount + "/" : ""}{b.words.length}</span>
          </button>
        ))}
        <button
          className={"pickerRow pickerFree" + (currentId === null ? " current" : "")}
          style={{ "--accent": "#1f6fe0" }}
          onClick={() => onPick(FREE_PLAY)}
        >
          <span className="pickerText">
            <span className="pickerEn">Free play</span>
            <span className="pickerSub">Words from all books</span>
          </span>
        </button>
      </div>
    </>
  );
}
