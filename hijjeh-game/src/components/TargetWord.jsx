/**
 * The Urdu word to spell, large, under a gable (a peaked frame in the accent colour: amber in free
 * play, the loaded book's colour in book mode). The word fades in when `show` turns true.
 *
 * @param {Object} props
 * @param {string} props.word          The word to display.
 * @param {string[]} [props.tags]      Optional teaching tags, shown as a tooltip.
 * @param {boolean} props.show         Fades the word in when true (start false, set true after mount).
 */
export function TargetWord({ word, tags, show }) {
  return (
    <div className="gable">
      <div className="gableInner">
        <div className={"targetWord" + (show ? " show" : "")} lang="ur" title={tags?.join(", ")}>
          {word}
        </div>
      </div>
    </div>
  );
}
