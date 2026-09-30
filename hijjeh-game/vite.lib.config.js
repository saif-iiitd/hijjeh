import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Component-library build: the game's UI pieces and book data as one ES module + one stylesheet.
// React stays external so consumers bring their own.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist-lib",
    emptyOutDir: true,
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    lib: { entry: "src/index.js", formats: ["es"], fileName: () => "hijjeh.js", cssFileName: "hijjeh" },
    rollupOptions: { external: ["react", "react-dom", "react/jsx-runtime"] }
  }
});
