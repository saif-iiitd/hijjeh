/**
 * The four game controls in one bar: Undo, Skip, Hide/Show hints, Reset. Each button shows an icon
 * above its label.
 *
 * @param {Object} props
 * @param {boolean} props.showHints            Whether hints are currently shown (flips the third label).
 * @param {() => void} props.onUndo            Take back the last picked letter.
 * @param {() => void} props.onSkip            Give up on this word and get a new one.
 * @param {() => void} props.onToggleHints     Show or hide the hint letters and meter.
 * @param {() => void} props.onReset           Restart the game (score, level, seen words).
 */
export function Toolbar({ showHints, onUndo, onSkip, onToggleHints, onReset }) {
  return (
    <nav className="toolbar" aria-label="Game controls">
      <button className="btn-undo" onClick={onUndo}>Undo</button>
      <button className="btn-skip" onClick={onSkip}>Skip</button>
      <button className="btn-hints" onClick={onToggleHints} aria-pressed={showHints}>
        {showHints ? "Hide hints" : "Show hints"}
      </button>
      <button className="btn-reset" onClick={onReset}>Reset</button>
    </nav>
  );
}
