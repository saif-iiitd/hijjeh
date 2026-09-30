import { Toolbar } from "hijjeh";

const noop = () => {};
const plain = { minHeight: 0, padding: 0, maxWidth: 420 } as React.CSSProperties;

export function HintsShown() {
  return <div className="app" data-mode="free" style={plain}><Toolbar showHints onUndo={noop} onSkip={noop} onToggleHints={noop} onReset={noop} /></div>;
}

// The third button flips its label when hints are hidden.
export function HintsHidden() {
  return <div className="app" data-mode="free" style={plain}><Toolbar showHints={false} onUndo={noop} onSkip={noop} onToggleHints={noop} onReset={noop} /></div>;
}
