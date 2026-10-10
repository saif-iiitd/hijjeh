import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Glyph } from "./Glyph.jsx";
import { NON_JOINERS } from "../data/letters.js";
import { tileVars } from "../game/palette.js";

const GAP = 8;   // roughly the tile gap used in the styles; only needed to compare layouts

/** The columns/rows (4–7 columns) that give the largest square tiles for `n` tiles in a tray `size` ({ w, h }). */
function bestGrid(n, size) {
  const fallback = { cols: n <= 8 ? 4 : n <= 15 ? 5 : 6, rows: 0 };
  let best = null;
  for (let cols = 4; cols <= 7; cols++) {
    const rows = Math.ceil(n / cols);
    const tile = size && size.w > 0 && size.h > 0
      ? Math.min((size.w - (cols - 1) * GAP) / cols, (size.h - (rows - 1) * GAP) / rows)
      : -cols;                       // no measurement yet: prefer fewer columns
    if (!best || tile > best.tile + 0.5) best = { cols, rows, tile };
  }
  return best ? { cols: best.cols, rows: best.rows } : { cols: fallback.cols, rows: Math.ceil(n / fallback.cols) };
}

/**
 * One tappable letter tile. In the child look it takes one of six colours from its position in the tray and
 * has a darker raised bottom edge; in the grown-up look it is a plain white square with a hard shadow.
 *
 * @param {Object} props
 * @param {string} props.letter            The letter on the tile.
 * @param {number} props.index             The tile's position in the tray (picks its colour).
 * @param {boolean} [props.used]           Greys the tile out (every copy of this letter has been used).
 * @param {(letter: string, index: number) => void} props.onTap   Called with the letter and position when tapped.
 * @param {number} [props.delayMs]         Entrance delay, to stagger a row of tiles.
 * @param {boolean} [props.fontReady]      True once the Urdu font has loaded.
 * @param {"a" | "b"} [props.hit]          Glows the tile once as the reward for a correct pick (alternate to replay).
 * @param {string} [props.bump]            "ok-a" / "ok-b" pops the tile, "no-a" / "no-b" wobbles it (alternate to replay).
 * @param {boolean} [props.hint]           Pulses the tile: it is the next letter.
 */
export function Tile({ letter, index, used, onTap, delayMs = 0, fontReady, hit, bump, hint }) {
  return (
    <div
      className={"tile " + (used ? "used" : "")}
      data-hit={hit}
      data-bump={bump}
      data-hint={hint ? "" : undefined}
      onClick={() => onTap(letter, index)}
      role="listitem"
      aria-label={"Letter " + letter}
      title={NON_JOINERS.has(letter) ? "Non-joining letter" : "Letter"}
      style={{ transitionDelay: `${delayMs}ms`, ...tileVars(index) }}
    >
      <Glyph ch={letter} ready={fontReady} />
    </div>
  );
}

/**
 * The board of letter tiles the child taps to spell the word. A letter greys out once every copy of it on the
 * board has been used. Read right-to-left. Anything passed as children (the "Next word" button) sits above the tiles.
 *
 * @param {Object} props
 * @param {string[]} props.tiles                          The letters on the board (may repeat).
 * @param {Record<string, number>} props.usedTileCounts   How many copies of each letter are used so far.
 * @param {boolean} props.show                            Fades the board in when true.
 * @param {(letter: string, index: number) => void} props.onTap   Called with the tapped letter and its position.
 * @param {boolean} [props.fontReady]                     True once the Urdu font has loaded.
 * @param {{ letter: string, n: number } | null} [props.hit]      The last correct pick; that tile glows.
 * @param {{ idx: number, kind: "ok" | "no", n: number } | null} [props.bump]   The last tap; that tile pops or wobbles.
 * @param {{ letter: string } | null} [props.hintPulse]   A hint: the first unused copy of this letter pulses.
 * @param {import("react").ReactNode} [props.children]    Content shown above the tiles.
 */
export function Tiles({ tiles, usedTileCounts, show, onTap, fontReady, hit, bump, hintPulse, children }) {
  // The tray is a fixed-size area and the tiles shrink to fit it, so more letters never make the page taller.
  // Measure the tray and use the number of columns (4–7) that makes the tiles biggest.
  const gridRef = useRef(null);
  const [size, setSize] = useState(null);
  useLayoutEffect(() => {
    const el = gridRef.current;
    if (!el || typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const { cols, rows } = useMemo(() => bestGrid(tiles.length, size), [tiles.length, size]);
  return (
    <div className={"tilesArea" + (show ? " show" : "")}>
      {children}
      <div className="tiles" ref={gridRef} role="list" lang="ur" style={{ "--cols": cols, "--rows": rows }}>
        {tiles.map((l, idx) => {
          const available = tiles.filter(t => t === l).length;
          const usedCount = usedTileCounts[l] || 0;
          const used = usedCount >= available;
          const copy = tiles.slice(0, idx).filter(t => t === l).length;   // which copy of this letter this tile is
          const isHit = !!hit && hit.letter === l && copy === usedCount - 1;
          const isHint = !!hintPulse && hintPulse.letter === l && copy === usedCount;
          const isBump = !!bump && bump.idx === idx;
          return (
            <Tile
              key={idx + "-" + l}
              letter={l}
              index={idx}
              used={used}
              onTap={onTap}
              delayMs={show ? idx * 30 : 0}
              fontReady={fontReady}
              hit={isHit ? (hit.n % 2 ? "a" : "b") : undefined}
              bump={isBump ? `${bump.kind}-${bump.n % 2 ? "a" : "b"}` : undefined}
              hint={isHint}
            />
          );
        })}
      </div>
    </div>
  );
}
