// The six tile colours of the child look (background, text, darker bottom edge), from the design handoff.
// A tile uses colour (index % 6); a filled answer slot takes the colour of the tile it came from.
export const TILE_PALETTE = [
  { bg: "#d81f00", fg: "#ffffff", edge: "#9c1700" },
  { bg: "#f5a000", fg: "#280209", edge: "#b87800" },
  { bg: "#1f6fe0", fg: "#ffffff", edge: "#1553ad" },
  { bg: "#ff8a3d", fg: "#280209", edge: "#c4601a" },
  { bg: "#ff7a6b", fg: "#280209", edge: "#c9544a" },
  { bg: "#3f8f6a", fg: "#ffffff", edge: "#2b6a4d" }
];

/** CSS custom properties for a tile (or the slot it fills) at position `index` in the tray. */
export function tileVars(index) {
  const c = TILE_PALETTE[Math.max(0, index) % TILE_PALETTE.length];
  return { "--tbg": c.bg, "--tfg": c.fg, "--tdk": c.edge };
}
