import { Masthead, BOOKS } from "hijjeh";

// Book pages carry their theme as CSS variables; .app[data-mode] switches the book styling on.
const theme = (b) => ({ "--accent": b.accent, "--done": b.done, "--paper-tint": b.paper, minHeight: 0, padding: 0 }) as React.CSSProperties;

export function FreePlay() {
  return (
    <div className="app" data-mode="free" style={{ minHeight: 0, padding: 0 }}>
      <Masthead inBookMode={false} hasBooks onFree={() => {}} onBook={() => {}} />
    </div>
  );
}

export function BookMode() {
  return (
    <div className="app" data-mode="book" style={theme(BOOKS[0])}>
      <Masthead inBookMode hasBooks onFree={() => {}} onBook={() => {}} />
    </div>
  );
}

export function PinwheelBook() {
  return (
    <div className="app" data-mode="book" style={theme(BOOKS[1])}>
      <Masthead inBookMode hasBooks onFree={() => {}} onBook={() => {}} />
    </div>
  );
}
