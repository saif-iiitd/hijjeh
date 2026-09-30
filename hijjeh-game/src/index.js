// Library entry (npm run build:lib): the game's UI pieces, its rules and the book registry.
// Fonts are not bundled into the library: load Andika, Cormorant Garamond and Noto Nastaliq Urdu
// yourself (the app does this in src/fonts.js).
import "./styles/tokens.css";
import "./styles/app.css";

export * from "./components/index.js";
export { default as App } from "./App.jsx";
export { useGame } from "./game/useGame.js";
export { useUrduFont } from "./game/glyph.js";
export { buildRound } from "./game/rules.js";
export { BOOKS } from "./data/books/index.js";
export { FREE_WORDS } from "./data/freeWords.js";
export { LETTER_POOL, NON_JOINERS } from "./data/letters.js";
