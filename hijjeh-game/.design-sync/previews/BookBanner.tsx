import { BookBanner, BOOKS } from "hijjeh";

const theme = (b) => ({ "--accent": b.accent, "--done": b.done, "--paper-tint": b.paper, minHeight: 0, padding: 0 }) as React.CSSProperties;
const noop = () => {};

// One banner per installed book: cover, Urdu and transliterated titles, author, progress, all in the book's own colours.
export function BudhiyaAurChidiya() {
  return (
    <div className="app" data-mode="book" style={theme(BOOKS[0])}>
      <BookBanner book={BOOKS[0]} books={BOOKS} seenCount={12} onChange={noop} />
    </div>
  );
}

export function KaaghazKiPhirki() {
  return (
    <div className="app" data-mode="book" style={theme(BOOKS[1])}>
      <BookBanner book={BOOKS[1]} books={BOOKS} seenCount={0} onChange={noop} />
    </div>
  );
}

export function SabKaPyaara() {
  return (
    <div className="app" data-mode="book" style={theme(BOOKS[2])}>
      <BookBanner book={BOOKS[2]} books={BOOKS} seenCount={41} onChange={noop} />
    </div>
  );
}

// With a single book installed the banner says "Book loaded" and is not a picker.
export function SingleBook() {
  return (
    <div className="app" data-mode="book" style={theme(BOOKS[1])}>
      <BookBanner book={BOOKS[1]} books={[BOOKS[1]]} seenCount={7} onChange={noop} />
    </div>
  );
}
