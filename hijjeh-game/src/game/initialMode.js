// Which mode and book to start in.
// Priority: ?book=<id> (e.g. from a QR code printed in a book)  >  ?mode=free  >  last choice  >  free play.
import { BOOKS } from "../data/books/index.js";

const STORAGE_KEY = "hijjeh-mode";

export function getInitialMode() {
  const fallback = { mode: "free", bookId: BOOKS[0] ? BOOKS[0].id : null };

  const q = new URLSearchParams(window.location.search);
  const wanted = q.get("book");
  if (wanted && BOOKS.some(b => b.id === wanted)) return { mode: "book", bookId: wanted };
  if (q.get("mode") === "free") return { mode: "free", bookId: fallback.bookId };

  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (e) {
    /* storage may be blocked */
  }
  if (saved && (saved.mode === "free" || BOOKS.some(b => b.id === saved.bookId))) {
    return { mode: saved.mode, bookId: saved.bookId || fallback.bookId };
  }
  return fallback;
}

export function rememberMode(mode, bookId) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, bookId }));
  } catch (e) {
    /* storage may be blocked */
  }
}
