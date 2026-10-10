# Handoff: Hijjeh — Child mode game screen (Origami palette)

## Overview
Hijjeh (ہجے, "spelling") is a mobile game for practising Urdu spelling. The player sees a word and taps its letters in order. It goes with the *Learning While Living* readers from BAFTER (Barkat Ali Firaq Trust for Education and Research). The game has two modes:

- **Book:** play the words from one book's poem.
- **Free play:** a graded list of words from all the books.

This package covers the redesigned game screen:

- **7a (primary):** the child-friendly game screen. It includes a Grown-up/Child look toggle and an animated reward sequence that changes with the score.
- **6a:** the flat Origami game screen. It is the reference for the Grown-up look.
- **6b:** the About page.

## About the design files
The HTML files in this bundle are **design references**. They are prototypes that show the intended look and behaviour; they are not production code. Recreate them in the existing Hijjeh codebase using its framework and patterns. If you are starting from scratch, a mobile-first web framework such as React is a good choice.

`Hijjeh Game.dc.html` uses a small custom runtime (`support.js`):

- Templates use `{{ }}` holes, `<sc-for>` for repeated elements and `<sc-if>` for conditional ones.
- The logic class at the bottom of the file is like a React class component.

Take the layout, values and behaviour from it; don't port the runtime. Open the file in a browser to see it running.

## Fidelity
**High fidelity.** Colors, type, radii, spacing and animations are final. Recreate them exactly.

---

## Screen 7a — Game (Child look)
The frame is 390px wide and at least 844px tall. Background `#f1e9d6`, text `#280209`, padding `12px 14px 0`, laid out as a column with 12px gaps. The frame has `position:relative; overflow:hidden` so the reward overlay is clipped to the screen.

Fonts:
- **Latin text:** Andika (400 and 700).
- **Urdu text:** Noto Nastaliq Urdu. Mark Urdu text with `lang="ur"`. Set `dir="rtl"` on Urdu rows and grids.

There are no borders and no drop shadows anywhere. It's a flat look.

Elements, top to bottom:

1. **Header** (row, space-between)
   - Wordmark: ہجے in Nastaliq, 28px, `#d81f00`, `translateY(-6px)`, followed by "HIJJEH" in Andika 700, 15px, letter-spacing .24em, uppercase. 12px gap between them.
   - Right cluster (`flex:none`, gap 6px):
     - **Look toggle pill:** min-height 32px, padding `0 10px`, radius 999px, background `rgba(40,2,9,.08)`, 12px/700, `white-space:nowrap`. The label reads "Grown-up" in the Child look and "Child" in the Grown-up look.
     - **Score pill:** padding `4px 12px`, radius 999px, background `#1f6fe0`, white, 15px/700.
     - **Three stars:** 20×20, `#f5a000`, cut with a star-shaped `clip-path` polygon (see the source). Hidden in the Grown-up look.
2. **Mode switch:** 2-column grid, gap 6px, padding 5px, radius 20px, background `rgba(40,2,9,.07)`. Each button is min-height 44px, radius 15px, 15px/700.
   - Active **Book**: background `#f5a000`, text `#280209`.
   - Active **Free play**: background `#1f6fe0`, text white.
   - Inactive: transparent.
   - Tapping Book while it's already active opens the book picker.
3. **Book card** (Book mode): row with 12px gap, padding `10px 14px 10px 10px`, radius 20px, background `rgba(245,160,0,.2)`.
   - Cover: 42×59, radius 8px.
   - English title: 15px/700.
   - Urdu title: Nastaliq 18px, line-height 1.9, `#7a4f00`, right-aligned, RTL.
   - Progress badge: padding `6px 12px`, radius 14px, background `#f5a000`. The count (e.g. "12/57") is 20px bold, with "Change ▾" below it at 11px/700.
   - Tapping the card opens the picker.
   - **Free play card** (replaces the book card): background `rgba(31,111,224,.14)`.
     - Title "Free play", 15px/700.
     - Subtitle "Words from all books, getting harder as you go", 13px.
     - Badge `#1f6fe0` with white text: "1" over "Level".
4. **Book picker (bottom sheet):**
   - Scrim covering the screen, `rgba(40,2,9,.4)`. Tapping it closes the picker.
   - Sheet: background `#faf5e8`, radius `28px 28px 0 0`, padding `18px 14px 22px`, gap 10px.
   - Heading "Choose a book", 18px/700.
   - Close button: 44px circle, background `rgba(40,2,9,.08)`, "×".
   - Book rows: same as the book card, with a 48×68 cover. The current book has background `rgba(245,160,0,.35)`; the others are `#fff`.
5. **Word card:** height 150px, radius 24px, background `#faf5e8`, content centred. The word is in Nastaliq 56px, line-height 1, `#280209`. The confetti layer sits inside this card.
6. **Message line:** min-height 22px, centred, 15px/700.
   - Colour `#1f6fe0` normally, `#c4601a` after a wrong tap. Never use red.
   - Copy:
     - Start: "Tap the letters of the word, in order!"
     - Correct letter: one of "Yes!", "Great!", "You got it!" or "Super!", followed by " Now the next letter."
     - Wrong letter: "Almost! Look again and try another."
     - Word complete: "Wonderful! You spelled پھرکی — a pinwheel!"
7. **Answer slots:** RTL row, gap 8px. Each slot is 52×56, radius 16px, Nastaliq 26px.
   - Empty: `rgba(40,2,9,.08)`.
   - Next slot to fill: `rgba(245,160,0,.35)` with a pulse animation.
   - Filled: the colour of the tile it came from.
8. **Tile tray:** fills the remaining height. Radius 28px, background `rgba(250,246,236,.92)`, padding `16px 12px 14px`. The tiles sit at the bottom of the tray.
   - When the word is complete, a **Next word →** button appears above the tiles: min-height 52px, radius 18px, background `#1f6fe0`, white 17px/700, bottom border `5px solid #1553ad`.
   - Tiles: 4-column RTL grid, gap 10px. Each tile is square, radius 20px, Nastaliq 32px.
   - Tile colours cycle through the palette below. Each tile has a 7px bottom border in the darker shade of its colour, which acts as a raised edge.
   - A used tile drops to a 2px edge and opacity .3.
9. **Toolbar:** 4-column grid, gap 8px. Each button is min-height 64px, radius 18px, 12px/700, with a 26px icon above the label.
   - Undo: `rgba(31,111,224,.22)`
   - Skip: `rgba(255,138,61,.3)`
   - Hint: `rgba(245,160,0,.32)`
   - Reset: `rgba(255,122,107,.3)`
10. **Footer:** full bleed (`margin:0 -14px`), padding `12px 14px`, background `rgba(250,246,236,.92)`, 12px text. "Game design · **Saif Ali**" on the left and the BAFTER logo (18px tall) on the right.

### Tile palette (background / text / edge)
| # | Background | Text | Edge |
|---|---|---|---|
| 1 | #d81f00 | #fff | #9c1700 |
| 2 | #f5a000 | #280209 | #b87800 |
| 3 | #1f6fe0 | #fff | #1553ad |
| 4 | #ff8a3d | #280209 | #c4601a |
| 5 | #ff7a6b | #280209 | #c9544a |
| 6 | #3f8f6a | #fff | #2b6a4d |

### Grown-up look (same layout, toggled by the header pill)
- **Tiles:** background `#fff`, text `#280209`, no edge, no animation. A used tile has background `rgba(40,2,9,.06)` and opacity .45.
- **Answer slots:** filled `#1f6fe0` with white text; next slot `rgba(216,31,0,.12)`; empty `rgba(40,2,9,.06)`; no pulse.
- **Toolbar buttons:** all `rgba(40,2,9,.06)`.
- **Stars:** hidden.
- **Rewards:** no confetti, no reward overlay, and no message bounce or wobble.
- **Persistence:** the prototype doesn't remember the choice. It should be saved per device (for example in localStorage).
- 6a shows the fuller original adult layout if the team prefers it.

---

## Interactions & behaviour

### Spelling
- The target is an ordered list of letters, e.g. پھرکی = پ ھ ر ک ی. The tray shows those letters plus distractors; the prototype has 8 tiles.
- Tapping the correct next letter:
  - fills the next slot and marks the tile as used;
  - adds +10 points, or +20 for the letter that completes the word;
  - plays `pop` on the tile and on the newly filled slot;
  - plays `hop` on the message line.
- Tapping a wrong letter plays `wobble` on the tile and on the message line, and shows the "Almost!" message. There is no penalty.
- Taps on used tiles, and any taps after the word is complete, are ignored.
- Completing the word shows 18 confetti pieces in the word card (the six palette colours, mixed squares and circles, 1.1–1.55s each, staggered by .05s) and the **Next word** button. Tapping it resets the round.
- **Re-triggering animations:** each animation has two identical keyframe copies (e.g. `pop7a` and `pop7b`), and the code alternates between them on every tap so the same animation can play again on the next tap. A real implementation can instead re-key the element or use the Web Animations API.

### Rewards that grow with the score
A reward fires each time the score crosses another multiple of 50. The tier is `floor(score / 50)`.

The overlay covers the whole screen (`position:absolute; inset:0; pointer-events:none; z-index:5`) and clears after 5.4s (6.6s from tier 4 up). It always shows a "N points!" badge: background `#d81f00`, white 22px/700, radius 999px, near the top. The badge pops in, holds and fades out over 4.2s (`rise7`).

| Tier | Score | What plays |
|---|---|---|
| 1 | 50 | Leaves blow across |
| 2 | 100 | Leaves, and the bird flies across, bobbing up and down |
| 3 | 150 | Leaves and flowers. The bird swoops in, loops, hops along the word card and flies off |
| 4 | 200 | Leaves. The woman walks across, bobbing |
| 5 | 250 | Leaves and flowers. The bird hops ahead and the woman chases it |
| 6+ | 300+ | Leaves and flowers. The woman walks in and stops. The bird lands at her hand and sings while coloured ♪ ♫ notes drift up into the wind |

Details:
- **Characters:** both face left, so they move from right to left.
- **Leaves and flowers:**
  - Count: `min(10 + tier × 2, 24)`.
  - Movement: they travel left to right with rotation. Each lasts 3.4–5.4s, with delays from 0 to 1.8s.
  - Leaves: 20×11, colours `#7a8a4a`, `#8a9a5a` and `#55705e`, shape `border-radius:100% 0 100% 0`.
  - Flowers (every third piece, on tiers 3 and 5+): 18×18, a star-flower `clip-path` with a cream centre `#fff3c4`, petals in `#ff7a6b`, `#f5a000`, `#ff8a3d` or `#d81f00`.
- **Singing scene (tier 6+), over 6.4s:**
  - The woman (120px wide) walks in from the right and stops 150px from the left edge. She bobs 3 times.
  - The bird (52px wide) arrives along a curve and lands at her hand.
  - From 1.8s the bird tilts its head (`chirp7`, .6s, looping).
  - Three notes rise and fade (`note7`, 1.6s, starting at 1.9s, 2.4s and 2.9s). Colours: `#1f6fe0`, `#d81f00`, `#f5a000`.
  - Everything fades out at 90–100% of the timeline.
  - The landing position was set by calculation and needs checking on a device.
- **Prototype-only:** the "Preview reward 1–6" buttons above the phone frame trigger any tier on demand, for review. Don't ship them.
- All keyframes are in the `<style>` block of `Hijjeh Game.dc.html`:
  - Reward scenes: `fly7`, `walk7`, `bob7`, `hopb7`, `loop7`, `flyy7`, `arrive7`, `perch7`, `chirp7`, `note7`, `blow7`, `rise7`.
  - Taps and confetti: `pop7*`, `wob7*`, `hop7*`, `cf7a/b/c`.
  - Answer slot: `pulse`.
- In the prototype the reward overlay is decorative and doesn't block taps.

### Centring Urdu letters
Nastaliq letters don't sit centred in their boxes. The prototype measures each letter once on a canvas (48px, pixel bounding box), works out a horizontal and vertical offset in em, and applies it with `translate(dx em, dy em)` to tiles, slots and the word. It runs after the font loads and caches the result per letter. See `off(ch)` in the logic class. Do the same thing natively, or precompute an offset table for the alphabet.

## State
| Variable | Meaning |
|---|---|
| `pk` | Next letter index |
| `used[]` | Letters already used |
| `win` | Word complete |
| `score` | Starts at 0 |
| `kind` | `ok` or `no` (last tap), for the feedback colour and animation |
| `msg` | Message line text |
| `rw` | Reward showing |
| `tier` | Current reward tier |
| `mode` | `book` or `free` |
| `book` | Selected book index |
| `pick` | Picker open |
| `adult` | Look toggle |

## Design tokens
**Colours:**
- Ink `#280209`
- Paper `#f1e9d6`
- Card `#faf5e8`
- Tray `rgba(250,246,236,.92)`
- Red (brand) `#d81f00`
- Amber `#f5a000`, amber text `#7a4f00`
- Blue `#1f6fe0`, blue edge `#1553ad`
- Orange `#ff8a3d`
- Coral `#ff7a6b`
- Green `#3f8f6a`
- Leaf greens `#7a8a4a`, `#8a9a5a`, `#55705e`
- Neutral fills: `rgba(40,2,9,.06–.08)`

**Radii:** 8 (covers), 14–16 (badges, slots), 18–20 (buttons, tiles, cards), 24 (word card), 28 (tray, sheet), 999 (pills).

**Type:**
- Andika: 11, 12, 13, 15, 17, 18, 20, 22px.
- Nastaliq: word 56px, tiles 32px, wordmark 28px, slots 26px, titles 18px.
- Nastaliq needs line-height around 1.9 in running text, or 1 when the letter is offset-centred.

**Spacing:** frame padding 14px; gaps of 6, 8, 10 and 12px.

**Touch targets:** at least 44px.

**Shadows:** none.

## Assets
All in `hijjeh/`.
- **Characters:**
  - `woman-glyph-final.png` (634×1122, transparent): the old woman, cut from the user's illustration. Her fingertips are slightly clipped where they overlapped the cage bars. For production, get the original artwork and replace it.
  - `bird-glyph.png` (288×242, transparent): the bird, cut from the Budhiya cover. It's low resolution and should be replaced with the original artwork.
- **Book covers:** `budhiya-cover.jpg`, `phirki-cover.jpg`, `pyaara-cover.jpg`. The illustrations are by Nida Ali.
- **Logo:** `bafter-logo.png`.
- **Toolbar icons:** `icons/undo.svg`, `icons/skip.svg`, `icons/hint.svg`, `icons/reset.svg`.
- **Fonts:** `fonts/andika-400.woff2`, `fonts/andika-700.woff2`, `fonts/nastaliq.woff2` (Noto Nastaliq Urdu). The Nastaliq file is large, so subset it if you can.

## Files
- **`Hijjeh Game.dc.html`:** contains 7a (primary), 6a and 6b. 7a's markup comes first in the file, and its logic is in `tap7`, `fire7`, `next7` and `r7()`. Open it alongside `support.js`.
- **`support.js`:** the runtime the prototype needs to open in a browser. It's not part of the design.
- The `_ds/` stylesheet and the `Hijjeh Game archive.dc.html` file of earlier options (1a–5b) are left out on purpose.
