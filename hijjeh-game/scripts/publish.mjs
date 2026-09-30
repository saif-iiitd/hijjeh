// Copies the one-file build (dist-single/app.html) to ./index.html, the file GitHub Pages serves at
// https://saif-iiitd.github.io/hijjeh/hijjeh-game/index.html. Run via `npm run publish:pages`.
import { copyFileSync, existsSync, statSync } from "node:fs";

const from = "dist-single/app.html";
if (!existsSync(from)) {
  console.error("Missing " + from + " — the single-file build did not run.");
  process.exit(1);
}
copyFileSync(from, "index.html");
console.log("Wrote index.html (" + (statSync("index.html").size / 1024 / 1024).toFixed(2) + " MB). Commit and push it to update the site.");
