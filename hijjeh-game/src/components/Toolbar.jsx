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
