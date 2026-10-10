// All game state and actions. The UI components only receive what they need from here.
//
// Rules in brief
// - Scoring: +10 for each correct letter, +20 for the letter that finishes the word.
// - Levels run underneath: every 3 completed words raise the level (harder words, more look-alike letters).
//   The three stars in the header show progress towards the next level.
// - Child look: no penalty for a wrong tap (the tile just bounces back), no timer, and a "Next word" button
//   instead of moving on by itself. A reward scene plays each time the score passes another multiple of 50.
// - Adult look: the quieter look keeps level / streak / mistakes, the hint meter and the timed rounds.
import { useEffect, useMemo, useRef, useState } from "react";
import { BOOKS } from "../data/books/index.js";
import { FREE_WORDS } from "../data/freeWords.js";
import { buildRound, clamp } from "./rules.js";
import { getInitialMode, rememberMode } from "./initialMode.js";
import { getInitialLook, rememberLook } from "./look.js";

const MAX_LEVEL = 6;
const WORDS_PER_LEVEL = 3;
const REWARD_EVERY = 50;
const PRAISE = ["Yes!", "Great!", "You got it!", "Super!"];

export function useGame() {
  const initial = useMemo(getInitialMode, []);
  const [mode, setMode] = useState(initial.mode);
  const [bookId, setBookId] = useState(initial.bookId);
  const [look, setLook] = useState(getInitialLook);
  const book = mode === "book" ? BOOKS.find(b => b.id === bookId) || null : null;
  const bank = book ? book.words : FREE_WORDS;
  const child = look === "child";

  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [levelProgress, setLevelProgress] = useState(0);   // completed words towards the next level (0–2)
  const [showHints, setShowHints] = useState(true);

  const seenWordsRef = useRef(new Set());
  const nextRoundTimerRef = useRef(null);
  const rewardTimerRef = useRef(null);
  const hintTimerRef = useRef(null);
  const [round, setRound] = useState(() => buildRound(1, seenWordsRef.current, bank));

  const [picked, setPicked] = useState([]);
  const [usedTileCounts, setUsedTileCounts] = useState({});
  const [won, setWon] = useState(false);
  const [feedback, setFeedback] = useState({ text: "Tap the letters of the word, in order!", tone: "" });

  const [hintMeter, setHintMeter] = useState(0);
  // The last correct pick { letter, slot, n }: glows that tile and slot (n counts up so the effect replays).
  const [hit, setHit] = useState(null);
  // The last tap { idx, kind: "ok" | "no", n }: pops or wobbles that tile and bounces the message.
  const [bump, setBump] = useState(null);
  // A hint { letter, n }: pulses the tile that is next.
  const [hintPulse, setHintPulse] = useState(null);
  // A reward scene { tier, points, key } while one is playing.
  const [reward, setReward] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  const [showWord, setShowWord] = useState(false);
  const [showTiles, setShowTiles] = useState(false);

  // Fade the word in, then the tiles, each time a new word appears.
  useEffect(() => {
    setShowWord(false);
    setShowTiles(false);
    const id1 = requestAnimationFrame(() => setShowWord(true));
    const id2 = setTimeout(() => setShowTiles(true), 250);
    return () => {
      cancelAnimationFrame(id1);
      clearTimeout(id2);
    };
  }, [round.word]);

  // Timed rounds (level 6+) exist only in the adult look.
  useEffect(() => {
    setTimeLeft(!child && round.meta.timeLimitSec ? round.meta.timeLimitSec : null);
  }, [round.word, child]);

  useEffect(() => {
    if (timeLeft == null) return;
    if (timeLeft <= 0) {
      setFeedback({ text: "Time is up — try again.", tone: "bad" });
      setTimeLeft(null);
      registerMistake(true);
      return;
    }
    const id = setInterval(() => setTimeLeft(t => (t == null ? null : t - 1)), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  // The theme lives on <html>: the loaded book's colours, and which look is on.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.mode = book ? "book" : "free";
    root.dataset.look = look;
    const vars = [
      ["--accent", book && book.accent],
      ["--done", book && (book.done || book.accent)]
    ];
    for (const [prop, val] of vars) {
      if (val) root.style.setProperty(prop, val);
      else root.style.removeProperty(prop);
    }
  }, [book, look]);

  useEffect(() => () => {
    clearTimeout(nextRoundTimerRef.current);
    clearTimeout(rewardTimerRef.current);
    clearTimeout(hintTimerRef.current);
  }, []);

  function clearTransient() {
    clearTimeout(nextRoundTimerRef.current);
    clearTimeout(rewardTimerRef.current);
    clearTimeout(hintTimerRef.current);
    setReward(null);
    setHintPulse(null);
    setBump(null);
    setHit(null);
  }

  function startNewRound(nextLevel = level, nextBank = bank) {
    clearTimeout(nextRoundTimerRef.current);
    clearTimeout(hintTimerRef.current);
    seenWordsRef.current.add(round.word);
    setRound(buildRound(nextLevel, seenWordsRef.current, nextBank));
    setPicked([]);
    setUsedTileCounts({});
    setWon(false);
    setHit(null);
    setBump(null);
    setHintPulse(null);
    setFeedback({ text: "Tap the letters of the word, in order!", tone: "" });
    setHintMeter(0);
  }

  function resetProgress(nextBank = bank) {
    clearTransient(); // a pending "next word" or reward must not leak into the new game
    seenWordsRef.current = new Set();
    setLevel(1);
    setScore(0);
    setStreak(0);
    setMistakes(0);
    setLevelProgress(0);
    setRound(buildRound(1, seenWordsRef.current, nextBank));
    setPicked([]);
    setUsedTileCounts({});
    setWon(false);
    setFeedback({ text: "Tap the letters of the word, in order!", tone: "" });
    setHintMeter(0);
  }

  function switchMode(nextMode, nextBookId = bookId) {
    const nextBook = nextMode === "book" ? BOOKS.find(b => b.id === nextBookId) : null;
    if (nextMode === "book" && !nextBook) return;
    setMode(nextMode);
    setBookId(nextBookId);
    resetProgress(nextBook ? nextBook.words : FREE_WORDS);
    rememberMode(nextMode, nextBookId);
  }

  function toggleLook() {
    const next = child ? "adult" : "child";
    setLook(next);
    rememberLook(next);
    clearTimeout(rewardTimerRef.current);
    setReward(null);
  }

  function canUseTile(letter) {
    const available = round.tiles.filter(t => t === letter).length;
    return (usedTileCounts[letter] || 0) < available;
  }

  function registerMistake(hardReset) {
    setMistakes(m => m + 1);
    setStreak(0);
    setHintMeter(h => clamp(h + (hardReset ? 35 : 20), 0, 100));
  }

  function fireReward(tier) {
    clearTimeout(rewardTimerRef.current);
    setReward(null);
    requestAnimationFrame(() => {
      setReward({ tier, points: tier * REWARD_EVERY, key: Date.now() });
      rewardTimerRef.current = setTimeout(() => setReward(null), tier >= 4 ? 6600 : 5400);
    });
  }

  function tapTile(letter, idx) {
    if (won || !canUseTile(letter)) return;

    const expected = round.letters[picked.length];

    setUsedTileCounts(prev => ({ ...prev, [letter]: (prev[letter] || 0) + 1 }));
    const newPicked = [...picked, letter];
    setPicked(newPicked);

    if (letter !== expected) {
      setHit(null);
      setBump(b => ({ idx, kind: "no", n: (b ? b.n : 0) + 1 }));
      setFeedback(child
        ? { text: "Almost! Look again and try another.", tone: "bad" }
        : { text: "Not quite — try again.", tone: "bad" });
      registerMistake(false);

      if (child || round.meta.partialResetOnMistake) {
        // Take the wrong tile back; in the child look this never costs anything.
        setPicked(picked);
        setUsedTileCounts(prev => ({ ...prev, [letter]: Math.max(0, (prev[letter] || 1) - 1) }));
      } else {
        setTimeout(() => {
          setPicked([]);
          setUsedTileCounts({});
        }, 250);
      }
      return;
    }

    setHit(h => ({ letter, slot: picked.length, n: (h ? h.n : 0) + 1 }));
    setBump(b => ({ idx, kind: "ok", n: (b ? b.n : 0) + 1 }));
    setHintPulse(null);

    const isLast = newPicked.length === round.letters.length;
    const gained = isLast ? 20 : 10;
    const newScore = score + gained;
    setScore(newScore);
    if (child && Math.floor(newScore / REWARD_EVERY) > Math.floor(score / REWARD_EVERY)) {
      fireReward(Math.floor(newScore / REWARD_EVERY));
    }

    if (!isLast) {
      setFeedback(child
        ? { text: `${PRAISE[picked.length % PRAISE.length]} Now the next letter.`, tone: "good" }
        : { text: `Right — ${letter}. Next letter.`, tone: "good" });
      return;
    }

    // The word is complete.
    setWon(true);
    setStreak(s => s + 1);
    const nextProgress = levelProgress + 1;
    const levelUp = nextProgress >= WORDS_PER_LEVEL;
    setLevelProgress(levelUp ? 0 : nextProgress);
    const newLevel = levelUp ? clamp(level + 1, 1, MAX_LEVEL) : level;
    if (levelUp) setLevel(newLevel);

    const meaning = round.meaning ? ` — ${round.meaning}` : "";
    setFeedback({
      text: child
        ? `Wonderful! You spelled ${round.word}${meaning}!${levelUp ? " Level up!" : ""}`
        : `Word decoded! +${gained} points${levelUp ? " — Level up!" : ""}`,
      tone: "good"
    });

    // Child look waits for the "Next word" button; the adult look moves on by itself.
    if (!child) nextRoundTimerRef.current = setTimeout(() => startNewRound(newLevel), 650);
  }

  function nextWord() {
    startNewRound(level);
  }

  // A free hint (child look): pulse the tile that is next.
  function giveHint() {
    if (won) return;
    const expected = round.letters[picked.length];
    clearTimeout(hintTimerRef.current);
    setHintPulse(h => ({ letter: expected, n: (h ? h.n : 0) + 1 }));
    setFeedback({ text: "Look for the glowing letter!", tone: "" });
    hintTimerRef.current = setTimeout(() => setHintPulse(null), 3000);
  }

  // The hint meter (adult look): charges with mistakes, then reveals the next letter.
  function revealHint() {
    if (!round.meta.hintsEnabled || hintMeter < 70) return;
    const expected = round.letters[picked.length];
    setFeedback({ text: `Hint: next letter is “${expected}”`, tone: "" });
    setHintMeter(h => clamp(h - 70, 0, 100));
  }

  function undo() {
    if (picked.length === 0 || won) return;
    const last = picked[picked.length - 1];
    setPicked(picked.slice(0, -1));
    setHit(null);
    setBump(null);
    setUsedTileCounts(prev => ({ ...prev, [last]: Math.max(0, (prev[last] || 1) - 1) }));
    setFeedback({ text: "Undid last pick.", tone: "" });
  }

  function skip() {
    setFeedback({ text: "Skipped. New word!", tone: "" });
    setStreak(0);
    startNewRound(level);
  }

  const seenCount = book ? book.words.filter(w => seenWordsRef.current.has(w.word)).length : 0;

  return {
    // what is loaded and how it looks
    books: BOOKS, book, bookId, mode, look,
    // progress
    level, score, streak, mistakes, timeLeft, seenCount, levelProgress, wordsPerLevel: WORDS_PER_LEVEL,
    // the current round
    round, picked, usedTileCounts, won, hit, bump, hintPulse, reward, feedback, hintMeter, showHints, showWord, showTiles,
    // actions
    switchMode, toggleLook, tapTile, nextWord, giveHint, revealHint, undo, skip, resetProgress,
    toggleHints: () => setShowHints(h => !h)
  };
}
