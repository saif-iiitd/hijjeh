/**
 * Shows which book is loaded: cover thumbnail, transliterated and Urdu titles and how many of its
 * words have been played; a "Buy on Amazon" button appears when the book has a `buyUrl`.
 * With more than one book the whole banner is the picker (an invisible select stretched over it),
 * so a child taps the banner to change book.
 * The book's colours come from CSS variables set on <html> (`--accent`, `--done`, `--paper-tint`).
 *
 * @param {Object} props
 * @param {import("../data/types.js").Book} props.book          The loaded book.
 * @param {import("../data/types.js").Book[]} props.books       All installed books (the picker's options).
 * @param {number} props.seenCount                              Words of this book already played.
 * @param {(bookId: string) => void} props.onChange             Called with the id of the newly chosen book.
 */
export function BookBanner({ book, books, seenCount, onChange }) {
  const canChange = books.length > 1;
  return (
    <section className="bookBanner" aria-label="Loaded book">
      {book.cover && <img className="bookCover" src={book.cover} alt="" width="42" height="59" />}

      <div className="bookText">
        <div className="bookKicker">{canChange ? "Book · tap to change" : "Book loaded"}</div>
        {book.titleEn && <div className="bookTitleEn">{book.titleEn}</div>}
        <div className="bookTitle" lang="ur">{book.title}</div>
        {book.buyUrl && (
          <a className="buyLink" href={book.buyUrl} target="_blank" rel="noopener noreferrer">
            Buy on Amazon ↗
          </a>
        )}
      </div>

      {canChange && (
        <select className="bookSelect" value={book.id} onChange={e => onChange(e.target.value)} aria-label="Choose book">
          {books.map(b => (
            <option key={b.id} value={b.id}>{b.titleEn || b.title}</option>
          ))}
        </select>
      )}

      <div className="bookProgress">
        <strong>{seenCount}/{book.words.length}</strong>
        words
      </div>
    </section>
  );
}
