import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the built game can be dropped into any folder or static host.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: { outDir: "dist", assetsInlineLimit: 0 }
});
