import { useUrduFont } from "./game/glyph.js";
import { useGame } from "./game/useGame.js";
import { goToGame, useAboutRoute } from "./game/useHashRoute.js";
import {
  AboutPage, BookBanner, Colophon, HintMeter, LetterProgress, Masthead,
  StatsBar, TargetWord, Tiles, Toolbar
} from "./components/index.js";

export default function App() {
  const g = useGame();
  const fontReady = useUrduFont();
  const showAbout = useAboutRoute();
  const { book, round } = g;

  // Picking a mode from the About page returns to the game in that mode.
  const pickFree = () => { g.switchMode("free"); goToGame(); };
  const pickBook = () => { g.switchMode("book", g.bookId); goToGame(); };

  return (
    <div className="app" data-mode={book ? "book" : "free"}>
      <Masthead
        inBookMode={showAbout ? null : !!book}
        hasBooks={g.books.length > 0}
        onFree={showAbout ? pickFree : () => g.switchMode("free")}
        onBook={showAbout ? pickBook : () => g.switchMode("book", g.bookId)}
      />

      {showAbout ? (
        <AboutPage books={g.books} onBack={goToGame} />
      ) : (
        <>
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
              hit={g.hit}
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
              hit={g.hit}
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
        </>
      )}

      <Colophon onAboutPage={showAbout} />
    </div>
  );
}
