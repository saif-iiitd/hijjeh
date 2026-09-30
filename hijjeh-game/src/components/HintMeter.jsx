/**
 * The hint meter: a bar that charges with mistakes, with a Hint button beside it that unlocks at 70%.
 *
 * @param {Object} props
 * @param {number} props.value          Charge, 0–100.
 * @param {() => void} props.onHint     Called when the child spends the meter on a hint.
 */
export function HintMeter({ value, onHint }) {
  return (
    <div className="hintWrap">
      <div className="hintBar" role="meter" aria-label="Hint meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
        <div className="hintFill" style={{ width: `${value}%` }} />
      </div>
      <button onClick={onHint} disabled={value < 70}>Hint</button>
    </div>
  );
}
