/**
 * Shows which book is loaded: cover thumbnail, transliterated and Urdu titles and how many of its words
 * have been played; a "Buy on Amazon" button appears when the book has a `buyUrl`.
 * Tapping the card (or its Change button) opens the book picker.
 * The book's colours come from CSS variables set on <html> (`--accent`, `--done`).
 *
 * @param {Object} props
 * @param {import("../data/types.js").Book} props.book   The loaded book.
 * @param {number} props.seenCount                       Words of this book already played.
 * @param {() => void} props.onOpen                      Called to open the book picker.
 */
export function BookBanner({ book, seenCount, onOpen }) {
  return (
    <section className="bookBanner" aria-label="Loaded book" onClick={onOpen}>
      {book.cover && <img className="bookCover" src={book.cover} alt="" width="42" height="59" />}

      <div className="bookText">
        <div className="bookKicker">Book · tap to change</div>
        {book.titleEn && <div className="bookTitleEn">{book.titleEn}</div>}
        <div className="bookTitle" lang="ur">{book.title}</div>
        {book.buyUrl && (
          <a
            className="buyLink"
            href={book.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
          >
            Buy on Amazon ↗
          </a>
        )}
      </div>

      <button className="bookBadge" aria-label="Change book" onClick={e => { e.stopPropagation(); onOpen(); }}>
        <strong>{seenCount}/{book.words.length}</strong>
        <span className="badgeChange">Change ▾</span>
        <span className="badgeWords">words</span>
      </button>
    </section>
  );
}
