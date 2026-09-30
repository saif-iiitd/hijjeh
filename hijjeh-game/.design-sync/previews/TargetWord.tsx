import { TargetWord, BOOKS } from "hijjeh";

const theme = (b) => ({ "--accent": b.accent, "--done": b.done, "--paper-tint": b.paper, minHeight: 0, padding: 0 }) as React.CSSProperties;
const wrap = { minHeight: 0, padding: 0, display: "grid", justifyItems: "center", textAlign: "center" } as React.CSSProperties;

// Free play: the arch takes the BAFTER red.
export function FreePlay() {
  return <div className="app" data-mode="free" style={wrap}><TargetWord word="کتاب" show /></div>;
}

// Book mode: the arch and word frame follow the book's accent.
export function PinwheelBook() {
  return <div className="app" data-mode="book" style={{ ...theme(BOOKS[1]), ...wrap }}><TargetWord word="پھرکی" show /></div>;
}

export function TerracottaBook() {
  return <div className="app" data-mode="book" style={{ ...theme(BOOKS[0]), ...wrap }}><TargetWord word="بڑھیا" show /></div>;
}

// A long word: the size steps down with the screen width and the word can wrap.
export function LongWord() {
  return <div className="app" data-mode="free" style={wrap}><TargetWord word="پاکستان" show /></div>;
}
