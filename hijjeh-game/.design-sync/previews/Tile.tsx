import { Tile, BOOKS } from "hijjeh";

const bookTheme = { "--accent": BOOKS[2].accent, "--done": BOOKS[2].done, "--paper-tint": BOOKS[2].paper, minHeight: 0, padding: 0 } as React.CSSProperties;
const noop = () => {};

// A tile is only visible inside an open .tilesArea, and is laid out by .tiles.
function Row({ children, mode = "free", style }: { children: React.ReactNode; mode?: string; style?: React.CSSProperties }) {
  return (
    <div className="app" data-mode={mode} style={style || { minHeight: 0, padding: 0 }}>
      <div className="tilesArea show" style={{ borderTop: 0, paddingTop: 0 }}>
        <div className="tiles" lang="ur" style={{ gridTemplateColumns: "repeat(3, 72px)", justifyContent: "start" }}>{children}</div>
      </div>
    </div>
  );
}

// Joining letter, non-joining letter, and a used-up tile side by side.
export function States() {
  return (
    <Row>
      <Tile letter="ب" onTap={noop} fontReady />
      <Tile letter="ر" onTap={noop} fontReady />
      <Tile letter="ک" used onTap={noop} fontReady />
    </Row>
  );
}

// Small and tall letters keep their ink centred.
export function LetterShapes() {
  return (
    <Row>
      <Tile letter="ھ" onTap={noop} fontReady />
      <Tile letter="ا" onTap={noop} fontReady />
      <Tile letter="ے" onTap={noop} fontReady />
    </Row>
  );
}

// In book mode the hard shadow takes the book's accent.
export function InBook() {
  return (
    <Row mode="book" style={bookTheme}>
      <Tile letter="پ" onTap={noop} fontReady />
      <Tile letter="ی" onTap={noop} fontReady />
      <Tile letter="ن" used onTap={noop} fontReady />
    </Row>
  );
}
