/**
 * Shows which book is loaded. With more than one book the whole banner is the picker
 * (an invisible <select> stretched over it), so a child taps the banner to change book.
 */
export function BookBanner({ book, books, seenCount, onChange }) {
  const canChange = books.length > 1;
  return (
    <section className="bookBanner" aria-label="Loaded book">
      {book.cover && <img className="bookCover" src={book.cover} alt="" width="46" height="65" />}

      <div className="bookText">
        <div className="bookKicker">{canChange ? "Book · tap to change" : "Book loaded"}</div>
        <div className="bookTitle" lang="ur">{book.title}</div>
        {book.titleEn && <div className="bookTitleEn">{book.titleEn}</div>}
        {book.author && <div className="bookAuthor">A poem by {book.author}</div>}
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
