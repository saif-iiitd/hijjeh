import { useEffect } from "react";

/**
 * A bottom sheet for choosing a book: a dimmed backdrop (tap it to close), a heading with a close button,
 * and one row per book with its cover and titles. The current book is highlighted. Esc also closes it.
 *
 * @param {Object} props
 * @param {import("../data/types.js").Book[]} props.books   The installed books.
 * @param {string | null} props.currentId                  Id of the loaded book, or null in free play.
 * @param {number} props.seenCount                         Words of the loaded book already played.
 * @param {(bookId: string) => void} props.onPick          Called with the chosen book's id.
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
          <div className="pickerTitle">Choose a book</div>
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
              <span className="pickerUr" lang="ur">{b.title}</span>
            </span>
            <span className="pickerCount">{b.id === currentId ? seenCount + "/" : ""}{b.words.length}</span>
          </button>
        ))}
      </div>
    </>
  );
}
