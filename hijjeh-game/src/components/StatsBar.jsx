/**
 * Row of score tiles: level, score, streak, mistakes, and a countdown on timed rounds.
 *
 * @param {Object} props
 * @param {number} props.level
 * @param {number} props.score
 * @param {number} props.streak       Correct words in a row; a mistake resets it.
 * @param {number} props.mistakes
 * @param {number | null} [props.timeLeft]   Seconds left on a timed round; null or omitted hides the Time tile.
 */
export function StatsBar({ level, score, streak, mistakes, timeLeft }) {
  return (
    <div className="stats">
      <div className="pill">Level <strong>{level}</strong></div>
      <div className="pill">Score <strong>{score}</strong></div>
      <div className="pill">Streak <strong>{streak}</strong></div>
      <div className="pill">Mistakes <strong>{mistakes}</strong></div>
      {timeLeft != null && <div className="pill">Time <strong>{timeLeft}s</strong></div>}
    </div>
  );
}
