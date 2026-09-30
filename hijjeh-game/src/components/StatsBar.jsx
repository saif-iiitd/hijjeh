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
