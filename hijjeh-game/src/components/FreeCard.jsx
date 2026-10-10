/**
 * The card shown in free play instead of a book: what free play is, and the current level.
 * Hidden in the grown-up look, which has the level in its stats row.
 *
 * @param {Object} props
 * @param {number} props.level   Current level.
 */
export function FreeCard({ level }) {
  return (
    <section className="freeCard" aria-label="Free play">
      <div className="freeText">
        <div className="freeTitle">Free play</div>
        <div className="freeSub">Words from all books, getting harder as you go</div>
      </div>
      <div className="freeBadge"><strong>{level}</strong>Level</div>
    </section>
  );
}
