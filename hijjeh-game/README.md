# Hijjeh — Urdu spelling game

A tap-the-letters spelling game for early readers, with **Free play** and **Book** modes (each book
supplies its own word list, cover and colours). Game design: Saif Ali. Affiliated organisation: BAFTER.

## Run it

Needs Node.js 20+.

```bash
npm install
npm run dev            # play at http://localhost:5173 (entry: app.html)
npm run build          # static game in dist/ (works offline, fonts included)
npm run build:single   # ONE file, dist-single/app.html — opens by double-click, fully offline
npm run publish:pages  # build:single, then write it to index.html for GitHub Pages
npm run build:lib      # UI components + book data as an ES module in dist-lib/
```

## Publishing to GitHub Pages

The site is served straight from this repository at
`https://saif-iiitd.github.io/hijjeh/hijjeh-game/index.html`, so **`index.html` here is the built game**,
not source (the source entry is `app.html`). After changing the game:

```bash
npm run publish:pages
git add index.html && git commit -m "Update published game" && git push
```

Note: don't add a `"sideEffects"` field to `package.json` — it makes the production build drop the font stylesheets.

Deep links: `?book=budhiya`, `?book=phirki`, `?book=pyaara` open a book directly (e.g. from a QR code
printed in it); `?mode=free` forces free play.

## Layout

```
src/
  main.jsx              app entry            index.js   library entry
  App.jsx               composes the UI
  components/           Masthead, BookBanner, StatsBar, TargetWord, LetterProgress,
                        HintMeter, Tiles, Toolbar, Colophon, Glyph
  game/                 rules.js (round building), useGame.js (state + actions),
                        glyph.js (centres each Nastaliq letter), initialMode.js
  data/                 letters.js, freeWords.js, makeWords.js, books/
  styles/               tokens.css (colours, fonts), app.css
  assets/               covers, BAFTER logo, paper texture, icons
legacy/                 the pre-refactor single-file version, kept for reference
```

## Adding a book

1. Copy `src/data/books/phirki.js` to a new file; change `id`, titles, `author`, colours and the
   `WORDS` list (only words that appear in the book; leave diacritics out).
2. Put the cover in `src/assets/` and import it as the other books do.
3. Add it to `src/data/books/index.js`.

The book picker, colours, cover thumbnail and `?book=<id>` link all follow from that.
