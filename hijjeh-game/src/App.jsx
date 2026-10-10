import { useState } from "react";
import { useUrduFont } from "./game/glyph.js";
import { useGame } from "./game/useGame.js";
import { goToGame, useAboutRoute } from "./game/useHashRoute.js";
import {
  AboutPage, BookBanner, BookPicker, Colophon, FreeCard, HintMeter, LetterProgress, Masthead,
  RewardOverlay, StatsBar, TargetWord, Tiles, Toolbar
} from "./components/index.js";

export default function App() {
  const g = useGame();
  const fontReady = useUrduFont();
  const showAbout = useAboutRoute();
  const [picking, setPicking] = useState(false);
  const { book, round } = g;
  const child = g.look === "child";

  // Picking a mode from the About page returns to the game in that mode.
  const pickFree = () => { g.switchMode("free"); goToGame(); };
  const pickBook = () => { g.switchMode("book", g.bookId); goToGame(); };
  // On the book side of the switch: switch to book mode, or open the picker if already there.
  const bookTap = showAbout ? pickBook : () => (book ? setPicking(true) : g.switchMode("book", g.bookId));

  const bumpKey = g.bump ? `${g.bump.kind}-${g.bump.n % 2 ? "a" : "b"}` : undefined;

  return (
    <div className="app" data-mode={book ? "book" : "free"} data-look={g.look}>
      <Masthead
        inBookMode={showAbout ? null : !!book}
        hasBooks={g.books.length > 0}
        onFree={showAbout ? pickFree : () => g.switchMode("free")}
        onBook={bookTap}
        look={g.look}
        onToggleLook={g.toggleLook}
        score={g.score}
        levelProgress={g.levelProgress}
        wordsPerLevel={g.wordsPerLevel}
      />

      {showAbout ? (
        <AboutPage books={g.books} onBack={goToGame} />
      ) : (
        <>
          {book
            ? <BookBanner book={book} seenCount={g.seenCount} onOpen={() => setPicking(true)} />
            : <FreeCard level={g.level} />}

          <main className="page">
            <StatsBar level={g.level} score={g.score} streak={g.streak} mistakes={g.mistakes} timeLeft={g.timeLeft} />

            <div className="targetWrap">
              <div className="label">Look at the word, then tap its letters in order.</div>

              <TargetWord
                word={round.word}
                tags={round.tags}
                show={g.showWord}
                centred={child}
                fontReady={fontReady}
                confetti={child && g.won}
              />

              <LetterProgress
                letters={round.letters}
                tiles={round.tiles}
                pickedCount={g.picked.length}
                won={g.won}
                hit={g.hit}
                showHints={g.showHints}
                fontReady={fontReady}
              />

              <div className={"feedback " + (g.feedback.tone || "")} data-bump={bumpKey} aria-live="polite">
                {g.feedback.text}
              </div>

              {!child && g.showHints && round.meta.hintsEnabled && <HintMeter value={g.hintMeter} onHint={g.revealHint} />}
            </div>

            <Tiles
              tiles={round.tiles}
              usedTileCounts={g.usedTileCounts}
              show={g.showTiles}
              onTap={g.tapTile}
              hit={g.hit}
              bump={g.bump}
              hintPulse={g.hintPulse}
              fontReady={fontReady}
            >
              {child && g.won && <button className="nextBtn" onClick={g.nextWord}>Next word →</button>}
            </Tiles>
          </main>

          <Toolbar
            look={g.look}
            showHints={g.showHints}
            onUndo={g.undo}
            onSkip={g.skip}
            onToggleHints={g.toggleHints}
            onHint={g.giveHint}
            onReset={() => g.resetProgress()}
          />
        </>
      )}

      <Colophon onAboutPage={showAbout} />

      {child && !showAbout && <RewardOverlay reward={g.reward} characters={book?.id === "budhiya"} />}

      {picking && !showAbout && (
        <BookPicker
          books={g.books}
          currentId={book ? book.id : null}
          seenCount={g.seenCount}
          onPick={id => { g.switchMode("book", id); setPicking(false); }}
          onClose={() => setPicking(false)}
        />
      )}
    </div>
  );
}
