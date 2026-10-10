/**
 * Top of the screen: the Hijjeh mark, the Child / Grown-up look toggle, the score and three stars, and the
 * "i" button for the About page. (Choosing a book or Free play is the dropdown card below, not part of this.)
 *
 * @param {Object} props
 * @param {"child" | "adult"} [props.look]    Which look is on; the toggle offers the other one.
 * @param {() => void} [props.onToggleLook]   Called when the look toggle is tapped.
 * @param {number} [props.score]              Shown in the child look.
 * @param {number} [props.levelProgress]      Completed words towards the next level; this many stars are lit.
 * @param {number} [props.wordsPerLevel]      How many stars there are (words per level).
 * @param {boolean} [props.aboutOpen]         The About page is showing; the "i" button then returns to the game.
 */
export function Masthead({
  look = "child", onToggleLook, score = 0, levelProgress = 0, wordsPerLevel = 3, aboutOpen = false
}) {
  return (
    <>
      <header className="masthead">
        <div className="brand">
          <span className="brandMark" aria-hidden="true"><span className="brandUr" lang="ur">ہجے</span></span>
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
          <a
            className="infoBtn"
            href={aboutOpen ? "#/" : "#/about"}
            aria-label={aboutOpen ? "Back to the game" : "About Hijjeh"}
            title={aboutOpen ? "Back to the game" : "About Hijjeh"}
          >i</a>
        </div>
      </header>
    </>
  );
}
