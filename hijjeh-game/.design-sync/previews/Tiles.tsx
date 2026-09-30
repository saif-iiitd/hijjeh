import { Tiles, BOOKS } from "hijjeh";

const noop = () => {};
const bookTheme = { "--accent": BOOKS[1].accent, "--done": BOOKS[1].done, "--paper-tint": BOOKS[1].paper, minHeight: 0, padding: 0, maxWidth: 420 } as React.CSSProperties;
const plain = { minHeight: 0, padding: 0, maxWidth: 420 } as React.CSSProperties;

// Board for the word پھرکی: correct letters plus look-alike distractors.
const board = ["ک", "ی", "ر", "ھ", "پ", "ز", "ش", "ت"];

export function FreshBoard() {
  return <div className="app" data-mode="free" style={plain}><Tiles tiles={board} usedTileCounts={{}} show onTap={noop} fontReady /></div>;
}

// Two letters already tapped are greyed out.
export function PartlySpelled() {
  return <div className="app" data-mode="free" style={plain}><Tiles tiles={board} usedTileCounts={{ "پ": 1, "ھ": 1 }} show onTap={noop} fontReady /></div>;
}

// Duplicate letters (level 5+): a letter only greys out once every copy is used.
export function DuplicateLetters() {
  return (
    <div className="app" data-mode="free" style={plain}>
      <Tiles tiles={["ب", "ب", "ا", "ت", "پ", "ث", "ا", "ن"]} usedTileCounts={{ "ب": 1, "ا": 2 }} show onTap={noop} fontReady />
    </div>
  );
}

export function InBook() {
  return <div className="app" data-mode="book" style={bookTheme}><Tiles tiles={board} usedTileCounts={{ "پ": 1 }} show onTap={noop} fontReady /></div>;
}
