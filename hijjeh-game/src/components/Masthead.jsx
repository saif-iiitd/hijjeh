/** Brand mark on the left, Free play / Book switch on the right. */
export function Masthead({ inBookMode, hasBooks, onFree, onBook }) {
  return (
    <header className="masthead">
      <div className="brand">
        <span className="brandUr" lang="ur">ہجے</span>
        <span className="brandEn">Hijjeh</span>
      </div>

      <div className="modeSwitch" role="tablist" aria-label="Game mode">
        <button role="tab" aria-selected={!inBookMode} onClick={() => inBookMode && onFree()}>
          Free play
        </button>
        <button role="tab" aria-selected={inBookMode} disabled={!hasBooks} onClick={() => !inBookMode && onBook()}>
          Book
        </button>
      </div>
    </header>
  );
}

/** Decorative lattice (jali) strip. */
export function Lattice() {
  return <div className="orn" aria-hidden="true" />;
}
