/**
 * The card shown in free play instead of a book: what free play is, and the current level.
 * Like the book card it is a dropdown: tapping it (the ▾ box on the right) opens the picker of books and Free play.
 *
 * @param {Object} props
 * @param {number} props.level      Current level.
 * @param {() => void} props.onOpen Called to open the picker.
 */
export function FreeCard({ level, onOpen }) {
  return (
    <section
      className="freeCard"
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label="Free play. Tap to choose a book instead."
      onClick={onOpen}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onOpen())}
    >
      <div className="freeText">
        <div className="freeTitle">Free play</div>
        <div className="freeSub">Words from all books, getting harder as you go</div>
      </div>
      <div className="freeBadge"><strong>{level}</strong>Level</div>
      <span className="dropBtn" aria-hidden="true">▾</span>
    </section>
  );
}
