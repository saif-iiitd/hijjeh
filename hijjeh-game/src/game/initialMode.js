// Which mode and book to start in. The game opens in Choose Book mode.
// Mode: ?mode=free opens Free play; anything else opens Choose Book.
// Book: ?book=<id> (e.g. from a QR code printed in a book)  >  the last book chosen  >  the first book.
import { BOOKS } from "../data/books/index.js";

const STORAGE_KEY = "hijjeh-mode";

export function getInitialMode() {
  const firstBookId = BOOKS[0] ? BOOKS[0].id : null;

  const q = new URLSearchParams(window.location.search);
  const wanted = q.get("book");
  if (wanted && BOOKS.some(b => b.id === wanted)) return { mode: "book", bookId: wanted };
  if (q.get("mode") === "free" || !firstBookId) return { mode: "free", bookId: firstBookId };

  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (e) {
    /* storage may be blocked */
  }
  const lastBookId = saved && BOOKS.some(b => b.id === saved.bookId) ? saved.bookId : firstBookId;
  return { mode: "book", bookId: lastBookId };
}

export function rememberMode(mode, bookId) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, bookId }));
  } catch (e) {
    /* storage may be blocked */
  }
}
