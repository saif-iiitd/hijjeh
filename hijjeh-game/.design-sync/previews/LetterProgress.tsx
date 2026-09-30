import { LetterProgress, BOOKS } from "hijjeh";

const word = ["پ", "ھ", "ر", "ک", "ی"]; // پھرکی
const wrap = { minHeight: 0, padding: 0 } as React.CSSProperties;
const bookTheme = { "--accent": BOOKS[1].accent, "--done": BOOKS[1].done, "--paper-tint": BOOKS[1].paper, minHeight: 0, padding: 0 } as React.CSSProperties;

// Nothing picked yet, hints on: the letters show faintly on their ruled slots.
export function HintsOn() {
  return <div className="app" data-mode="free" style={wrap}><LetterProgress letters={word} pickedCount={0} showHints fontReady /></div>;
}

// Two letters picked: they turn to the "done" colour (green in free play).
export function TwoPicked() {
  return <div className="app" data-mode="free" style={wrap}><LetterProgress letters={word} pickedCount={2} showHints fontReady /></div>;
}

// Hints off: unpicked slots stay blank, only correct letters appear.
export function HintsOff() {
  return <div className="app" data-mode="free" style={wrap}><LetterProgress letters={word} pickedCount={3} showHints={false} fontReady /></div>;
}

// A finished word in a book's own "done" colour.
export function CompleteInBook() {
  return <div className="app" data-mode="book" style={bookTheme}><LetterProgress letters={word} pickedCount={5} showHints fontReady /></div>;
}
