/**
 * The four game controls in one bar. Child look: Undo, Skip, Hint (pulses the next letter, free) and Reset,
 * each in its own colour. Grown-up look: Undo, Skip, Hide/Show hints and Reset.
 *
 * @param {Object} props
 * @param {"child" | "adult"} [props.look]     Which look is on.
 * @param {boolean} props.showHints            Whether hints are currently shown (flips the third label in the grown-up look).
 * @param {() => void} props.onUndo            Take back the last picked letter.
 * @param {() => void} props.onSkip            Give up on this word and get a new one.
 * @param {() => void} props.onToggleHints     Show or hide the hint letters and meter (grown-up look).
 * @param {() => void} [props.onHint]          Pulse the next letter (child look).
 * @param {() => void} props.onReset           Restart the game (score, level, seen words).
 */
export function Toolbar({ look = "adult", showHints, onUndo, onSkip, onToggleHints, onHint, onReset }) {
  return (
    <nav className="toolbar" aria-label="Game controls">
      <button className="btn-undo" onClick={onUndo}>Undo</button>
      <button className="btn-skip" onClick={onSkip}>Skip</button>
      {look === "child" ? (
        <button className="btn-hints" onClick={onHint}>Hint</button>
      ) : (
        <button className="btn-hints" onClick={onToggleHints} aria-pressed={showHints}>
          {showHints ? "Hide hints" : "Show hints"}
        </button>
      )}
      <button className="btn-reset" onClick={onReset}>Reset</button>
    </nav>
  );
}
