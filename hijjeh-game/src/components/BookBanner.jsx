/**
 * Shows which book is loaded: cover thumbnail, English title and how many of its words
 * have been played; a "Get the Book" button appears when the book has a `buyUrl`.
 * The whole card is a dropdown: tapping it (the ▾ box on the right says so) opens the picker of books and Free play.
 * The book's colours come from CSS variables set on <html> (`--accent`, `--done`).
 *
 * @param {Object} props
 * @param {import("../data/types.js").Book} props.book   The loaded book.
 * @param {number} props.seenCount                       Words of this book already played.
 * @param {() => void} props.onOpen                      Called to open the book picker.
 */
export function BookBanner({ book, seenCount, onOpen }) {
  return (
    <section
      className="bookBanner"
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={"Loaded book: " + (book.titleEn || book.title) + ". Tap to choose another book or Free play."}
      onClick={onOpen}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && e.target === e.currentTarget && (e.preventDefault(), onOpen())}
    >
      {book.cover && <img className="bookCover" src={book.cover} alt="" width="42" height="59" />}

      <div className="bookText">
        <div className="bookKicker">Book · tap to change</div>
        <div className="bookTitleEn">{book.titleEn || book.title}</div>
        {book.buyUrl && (
          <a
            className="buyLink"
            href={book.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
          >
            Get the Book ↗
          </a>
        )}
      </div>

      <span className="bookBadge"><strong>{seenCount}/{book.words.length}</strong></span>
      <span className="dropBtn" aria-hidden="true">▾</span>
    </section>
  );
}
