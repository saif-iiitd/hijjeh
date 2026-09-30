/**
 * Top bar: the Hijjeh mark on the left and the Free play / Book switch on the right.
 * On the About page neither side is selected (pass `inBookMode={null}`).
 *
 * @param {Object} props
 * @param {boolean | null} props.inBookMode   True = Book selected, false = Free play selected, null = neither.
 * @param {boolean} props.hasBooks            False disables the Book side (no books installed).
 * @param {() => void} props.onFree           Called when the player picks Free play.
 * @param {() => void} props.onBook           Called when the player picks Book.
 */
export function Masthead({ inBookMode, hasBooks, onFree, onBook }) {
  return (
    <header className="masthead">
      <div className="brand">
        <span className="brandUr" lang="ur">ہجے</span>
        <span className="brandEn">Hijjeh</span>
      </div>

      <div className="modeSwitch" role="tablist" aria-label="Game mode">
        <button role="tab" aria-selected={inBookMode === false} onClick={() => inBookMode !== false && onFree()}>
          Free play
        </button>
        <button role="tab" aria-selected={inBookMode === true} disabled={!hasBooks} onClick={() => inBookMode !== true && onBook()}>
          Book
        </button>
      </div>
    </header>
  );
}
