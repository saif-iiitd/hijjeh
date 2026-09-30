import { HintMeter } from "hijjeh";

const wrap = { minHeight: 0, padding: 16, display: "grid", justifyItems: "center" } as React.CSSProperties;
const noop = () => {};

export function Empty() {
  return <div className="app" data-mode="free" style={wrap}><HintMeter value={0} onHint={noop} /></div>;
}

// Charging with mistakes; the Hint button is still locked below 70%.
export function Charging() {
  return <div className="app" data-mode="free" style={wrap}><HintMeter value={45} onHint={noop} /></div>;
}

export function ReadyToUse() {
  return <div className="app" data-mode="free" style={wrap}><HintMeter value={85} onHint={noop} /></div>;
}
