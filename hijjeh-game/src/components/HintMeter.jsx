/** The hint meter charges with mistakes; at 70% the child can spend it on a hint. */
export function HintMeter({ value, onHint }) {
  return (
    <div className="hintWrap">
      <div className="hintBar" aria-label="Hint meter">
        <div className="hintFill" style={{ width: `${value}%` }} />
      </div>
      <div className="hintRow">
        <button onClick={onHint} disabled={value < 70}>Hint</button>
        <div className="tiny">Hint meter charges with mistakes.</div>
      </div>
    </div>
  );
}
