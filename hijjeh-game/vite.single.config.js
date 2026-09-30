import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// One self-contained index.html (JS, CSS, fonts and images inlined) that opens by double-click,
// with no web server and no internet.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { outDir: "dist-single", emptyOutDir: true, assetsInlineLimit: 100000000 }
});
