const ARCH = "M0 40 C0 26 30 24 42 13 C46 9 48 4 50 0 C52 4 54 9 58 13 C70 24 100 26 100 40";

/** The word to spell, framed by a pointed (Mughal) arch. */
export function TargetWord({ word, tags, show }) {
  return (
    <div className="stage">
      <svg className="archCap" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
        <path className="archFill" d={ARCH + " Z"} />
        <path className="archLine" d={ARCH} vectorEffect="non-scaling-stroke" />
      </svg>
      <div className={"targetWord" + (show ? " show" : "")} lang="ur" title={tags?.join(", ")}>
        {word}
      </div>
    </div>
  );
}
