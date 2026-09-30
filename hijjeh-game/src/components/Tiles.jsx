import { Glyph } from "./Glyph.jsx";
import { NON_JOINERS } from "../data/letters.js";

export function Tile({ letter, used, onTap, delayMs = 0, fontReady }) {
  return (
    <div
      className={"tile " + (used ? "used" : "")}
      onClick={() => onTap(letter)}
      role="listitem"
      aria-label={"Letter " + letter}
      title={NON_JOINERS.has(letter) ? "Non-joining letter" : "Letter"}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <Glyph ch={letter} ready={fontReady} />
    </div>
  );
}

/** The board of letter tiles. A letter is greyed out once every copy of it has been used. */
export function Tiles({ tiles, usedTileCounts, show, onTap, fontReady }) {
  return (
    <div className={"tilesArea" + (show ? " show" : "")}>
      <div className="tiles" role="list" lang="ur">
        {tiles.map((l, idx) => {
          const available = tiles.filter(t => t === l).length;
          const used = (usedTileCounts[l] || 0) >= available;
          return (
            <Tile key={idx + "-" + l} letter={l} used={used} onTap={onTap} delayMs={show ? idx * 30 : 0} fontReady={fontReady} />
          );
        })}
      </div>
    </div>
  );
}
