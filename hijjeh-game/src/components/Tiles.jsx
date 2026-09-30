import { Glyph } from "./Glyph.jsx";
import { NON_JOINERS } from "../data/letters.js";

/**
 * One tappable letter tile: a square card with a hard offset shadow.
 *
 * @param {Object} props
 * @param {string} props.letter            The letter on the tile.
 * @param {boolean} [props.used]           Greys the tile out (every copy of this letter has been used).
 * @param {(letter: string) => void} props.onTap   Called with the letter when tapped.
 * @param {number} [props.delayMs]         Entrance delay, to stagger a row of tiles.
 * @param {boolean} [props.fontReady]      True once the Urdu font has loaded.
 */
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

/**
 * The board of letter tiles the child taps to spell the word. A letter greys out once every copy of
 * it on the board has been used. Read right-to-left.
 *
 * @param {Object} props
 * @param {string[]} props.tiles                          The letters on the board (may repeat).
 * @param {Record<string, number>} props.usedTileCounts   How many copies of each letter are used so far.
 * @param {boolean} props.show                            Fades the board in when true.
 * @param {(letter: string) => void} props.onTap          Called with the tapped letter.
 * @param {boolean} [props.fontReady]                     True once the Urdu font has loaded.
 */
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
