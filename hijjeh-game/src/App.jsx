import { useUrduFont } from "./game/glyph.js";
import { useGame } from "./game/useGame.js";
import {
  BookBanner, Colophon, HintMeter, Lattice, LetterProgress, Masthead,
  StatsBar, TargetWord, Tiles, Toolbar
} from "./components/index.js";

export default function App() {
  const g = useGame();
  const fontReady = useUrduFont();
  const { book, round } = g;

  return (
    <div className="app" data-mode={book ? "book" : "free"}>
      <Masthead
        inBookMode={!!book}
        hasBooks={g.books.length > 0}
        onFree={() => g.switchMode("free")}
        onBook={() => g.switchMode("book", g.bookId)}
      />
      <Lattice />

      {book && (
        <BookBanner book={book} books={g.books} seenCount={g.seenCount} onChange={id => g.switchMode("book", id)} />
      )}

      <main className="page">
        <StatsBar level={g.level} score={g.score} streak={g.streak} mistakes={g.mistakes} timeLeft={g.timeLeft} />

        <div className="targetWrap">
          <div className="label">Look at the word, then tap its letters in order.</div>

          <TargetWord word={round.word} tags={round.tags} show={g.showWord} />

          <LetterProgress
            letters={round.letters}
            pickedCount={g.picked.length}
            showHints={g.showHints}
            fontReady={fontReady}
          />

          <div className={"feedback " + (g.feedback.tone || "")} aria-live="polite">
            {g.feedback.text}
          </div>

          {g.showHints && round.meta.hintsEnabled && <HintMeter value={g.hintMeter} onHint={g.revealHint} />}
        </div>

        <Tiles
          tiles={round.tiles}
          usedTileCounts={g.usedTileCounts}
          show={g.showTiles}
          onTap={g.tapTile}
          fontReady={fontReady}
        />
      </main>

      <Toolbar
        showHints={g.showHints}
        onUndo={g.undo}
        onSkip={g.skip}
        onToggleHints={g.toggleHints}
        onReset={() => g.resetProgress()}
      />

      <Colophon />
    </div>
  );
}
