import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The development/build entry is app.html. The published game lives at index.html (see scripts/publish.mjs),
// which GitHub Pages serves, so the source entry must not be called index.html.
const serveAppAtRoot = {
  name: "serve-app-at-root",
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === "/" || req.url.startsWith("/?")) req.url = "/app.html" + req.url.slice(1);
      next();
    });
  }
};

// Relative base so the built game can be dropped into any folder or static host.
export default defineConfig({
  base: "./",
  plugins: [react(), serveAppAtRoot],
  build: { outDir: "dist", assetsInlineLimit: 0, rollupOptions: { input: "app.html" } }
});
