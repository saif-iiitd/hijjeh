// Tile colours of the child look (background, text, darker bottom edge). Every tile is the same yellow with black
// text, so the board is calm; add entries to bring back colour (a tile uses colour (index % length), and a filled
// answer slot takes the colour of the tile it came from).
export const TILE_PALETTE = [
  { bg: "#f5a000", fg: "#000000", edge: "#b87800" }
];

/** The bright colours of the word-complete confetti (separate from the calm tiles). */
export const CONFETTI_COLORS = ["#d81f00", "#f5a000", "#1f6fe0", "#ff8a3d", "#ff7a6b", "#3f8f6a"];

/** CSS custom properties for a tile (or the slot it fills) at position `index` in the tray. */
export function tileVars(index) {
  const c = TILE_PALETTE[Math.max(0, index) % TILE_PALETTE.length];
  return { "--tbg": c.bg, "--tfg": c.fg, "--tdk": c.edge };
}
