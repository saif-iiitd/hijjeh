/**
 * Top of the screen: the Hijjeh mark, the Child / Grown-up look toggle, and (in the child look) the score
 * and three stars, then the Free play / Choose Book switch on its own row below.
 * On the About page neither side of the switch is selected (pass `inBookMode={null}`).
 *
 * @param {Object} props
 * @param {boolean | null} props.inBookMode   True = book side selected, false = Free play selected, null = neither.
 * @param {boolean} props.hasBooks            False disables the book side (no books installed).
 * @param {() => void} props.onFree           Called when the player picks Free play.
 * @param {() => void} props.onBook           Called when the player taps the book side (switches to book mode, or opens the picker if already there).
 * @param {"child" | "adult"} [props.look]    Which look is on; the toggle offers the other one.
 * @param {() => void} [props.onToggleLook]   Called when the look toggle is tapped.
 * @param {number} [props.score]              Shown in the child look.
 * @param {number} [props.levelProgress]      Completed words towards the next level; this many stars are lit.
 * @param {number} [props.wordsPerLevel]      How many stars there are (words per level).
 */
export function Masthead({
  inBookMode, hasBooks, onFree, onBook,
  look = "child", onToggleLook, score = 0, levelProgress = 0, wordsPerLevel = 3
}) {
  return (
    <>
      <header className="masthead">
        <div className="brand">
          <span className="brandUr" lang="ur">ہجے</span>
          <span className="brandEn">Hijjeh</span>
        </div>

        <div className="headRight">
          {onToggleLook && (
            <button className="lookToggle" onClick={onToggleLook} aria-label={look === "child" ? "Switch to the grown-up look" : "Switch to the child look"}>
              {look === "child" ? "Grown-up" : "Child"}
            </button>
          )}
          <span className="scorePill" aria-label={"Score " + score}>{score}</span>
          <span className="stars" aria-label={levelProgress + " of " + wordsPerLevel + " words to the next level"}>
            {Array.from({ length: wordsPerLevel }, (_, i) => (
              <span key={i} className={"star" + (i < levelProgress ? " lit" : "")} />
            ))}
          </span>
        </div>
      </header>

      <div className="modeSwitch" role="tablist" aria-label="Game mode">
        <button role="tab" className="modeBook" aria-selected={inBookMode === true} disabled={!hasBooks} onClick={onBook}>
          Choose Book
        </button>
        <button role="tab" className="modeFree" aria-selected={inBookMode === false} onClick={() => inBookMode !== false && onFree()}>
          Free play
        </button>
      </div>
    </>
  );
}
