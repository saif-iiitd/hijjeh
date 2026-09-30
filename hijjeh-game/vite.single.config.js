import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// One self-contained HTML file (JS, CSS, fonts and images inlined) that opens by double-click, with no
// web server and no internet. `npm run publish:pages` writes it to index.html for GitHub Pages.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { outDir: "dist-single", emptyOutDir: true, assetsInlineLimit: 100000000, rollupOptions: { input: "app.html" } }
});
