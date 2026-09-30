// Asset imports resolve to a URL string (Vite). This lets `tsc` emit declarations for modules that import them.
declare module "*.jpg" { const url: string; export default url; }
declare module "*.png" { const url: string; export default url; }
declare module "*.svg" { const url: string; export default url; }
