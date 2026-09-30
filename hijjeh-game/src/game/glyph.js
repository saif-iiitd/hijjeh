// Centred Urdu glyphs.
// Nastaliq letters sit at very different heights and widths inside their line box, so a plain
// centred <span> looks off-centre (ر و د hang low, ھ ہ float). We measure each letter's actual
// ink box once with canvas and nudge it so its ink is centred in the tile.
import { useEffect, useState } from "react";

const URDU_FONT = '"Noto Nastaliq Urdu"';
const EM = 200;
const cache = new Map();
let ctx = null;

/** Offset, in em, that centres the ink of `ch` in a `line-height: 1` box. */
export function glyphOffset(ch) {
  if (cache.has(ch)) return cache.get(ch);
  let off = { dx: 0, dy: 0 };
  try {
    ctx = ctx || document.createElement("canvas").getContext("2d");
    ctx.font = `${EM}px ${URDU_FONT}, serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    const m = ctx.measureText(ch);
    if (m.fontBoundingBoxAscent != null && m.actualBoundingBoxAscent != null) {
      const inkCx = (m.actualBoundingBoxRight - m.actualBoundingBoxLeft) / 2;
      const inkUp = (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2;
      off = {
        dx: (m.width / 2 - inkCx) / EM,
        dy: (inkUp - (m.fontBoundingBoxAscent - m.fontBoundingBoxDescent) / 2) / EM
      };
    }
  } catch (e) {
    /* measuring is a nicety; fall back to uncentred */
  }
  cache.set(ch, off);
  return off;
}

/** True once the Urdu font has loaded (measurements before that would be for a fallback font). */
export function useUrduFont() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    const done = () => {
      if (alive) {
        cache.clear();
        setReady(true);
      }
    };
    if (document.fonts && document.fonts.load) {
      document.fonts.load(`40px ${URDU_FONT}`, "ابپ").then(done, done);
    } else {
      done();
    }
    return () => {
      alive = false;
    };
  }, []);
  return ready;
}
