import { StatsBar } from "hijjeh";

const wrap = { minHeight: 0, padding: 0 } as React.CSSProperties;

export function NewGame() {
  return <div className="app" data-mode="free" style={wrap}><StatsBar level={1} score={0} streak={0} mistakes={0} /></div>;
}

export function MidGame() {
  return <div className="app" data-mode="free" style={wrap}><StatsBar level={3} score={146} streak={2} mistakes={4} /></div>;
}

// Level 6 rounds are timed, which adds a Time tile.
export function TimedRound() {
  return <div className="app" data-mode="free" style={wrap}><StatsBar level={6} score={482} streak={5} mistakes={1} timeLeft={14} /></div>;
}
