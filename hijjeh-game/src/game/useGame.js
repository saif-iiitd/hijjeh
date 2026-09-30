// All game state and actions. The UI components only receive what they need from here.
import { useEffect, useMemo, useRef, useState } from "react";
import { BOOKS } from "../data/books/index.js";
import { FREE_WORDS } from "../data/freeWords.js";
import { buildRound, clamp } from "./rules.js";
import { getInitialMode, rememberMode } from "./initialMode.js";

const MAX_LEVEL = 6;

export function useGame() {
  const initial = useMemo(getInitialMode, []);
  const [mode, setMode] = useState(initial.mode);
  const [bookId, setBookId] = useState(initial.bookId);
  const book = mode === "book" ? BOOKS.find(b => b.id === bookId) || null : null;
  const bank = book ? book.words : FREE_WORDS;

  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [showHints, setShowHints] = useState(true);

  const seenWordsRef = useRef(new Set());
  const nextRoundTimerRef = useRef(null);
  const [round, setRound] = useState(() => buildRound(1, seenWordsRef.current, bank));

  const [picked, setPicked] = useState([]);
  const [usedTileCounts, setUsedTileCounts] = useState({});
  const [feedback, setFeedback] = useState({ text: "Tap the letters to decode the word.", tone: "" });

  const [hintMeter, setHintMeter] = useState(0);
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

  // Timed rounds (level 6+).
  useEffect(() => {
    setTimeLeft(round.meta.timeLimitSec || null);
  }, [round.word]);

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

  // The theme lives on <html> so the page background can follow the book too.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.mode = book ? "book" : "free";
    const vars = [
      ["--accent", book && book.accent],
      ["--done", book && (book.done || book.accent)],
      ["--paper-tint", book && book.paper]
    ];
    for (const [prop, val] of vars) {
      if (val) root.style.setProperty(prop, val);
      else root.style.removeProperty(prop);
    }
  }, [book]);

  function startNewRound(nextLevel = level, nextBank = bank) {
    clearTimeout(nextRoundTimerRef.current);
    seenWordsRef.current.add(round.word);
    setRound(buildRound(nextLevel, seenWordsRef.current, nextBank));
    setPicked([]);
    setUsedTileCounts({});
    setFeedback({ text: "Decode the word by tapping its letters.", tone: "" });
    setHintMeter(0);
  }

  function resetProgress(nextBank = bank) {
    clearTimeout(nextRoundTimerRef.current); // a pending "next word" must not leak into the new game
    seenWordsRef.current = new Set();
    setLevel(1);
    setScore(0);
    setStreak(0);
    setMistakes(0);
    setRound(buildRound(1, seenWordsRef.current, nextBank));
    setPicked([]);
    setUsedTileCounts({});
    setFeedback({ text: "Tap the letters to decode the word.", tone: "" });
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

  function canUseTile(letter) {
    const available = round.tiles.filter(t => t === letter).length;
    return (usedTileCounts[letter] || 0) < available;
  }

  function registerMistake(hardReset) {
    setMistakes(m => m + 1);
    setStreak(0);
    setHintMeter(h => clamp(h + (hardReset ? 35 : 20), 0, 100));
  }

  function tapTile(letter) {
    if (!canUseTile(letter)) return;

    const expected = round.letters[picked.length];

    setUsedTileCounts(prev => ({ ...prev, [letter]: (prev[letter] || 0) + 1 }));
    const newPicked = [...picked, letter];
    setPicked(newPicked);

    if (letter !== expected) {
      setFeedback({ text: "Not quite — try again.", tone: "bad" });
      registerMistake(false);

      if (round.meta.partialResetOnMistake) {
        // Early levels: just take the wrong tile back.
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

    const isLast = newPicked.length === round.letters.length;
    if (!isLast) setFeedback({ text: `Right — ${letter}. Next letter.`, tone: "good" });

    if (newPicked.length === round.letters.length) {
      const basePoints = 10 + level * 2;
      const timeBonus = timeLeft != null ? Math.max(0, timeLeft) : 0;
      const streakBonus = Math.min(20, streak * 2);
      const gained = basePoints + timeBonus + streakBonus;

      setScore(s => s + gained);
      setStreak(s => s + 1);

      const shouldLevelUp = (streak + 1) % 3 === 0;
      setFeedback({
        text: `Word decoded! +${gained} points${shouldLevelUp ? " — Level up!" : ""}`,
        tone: "good"
      });

      const newLevel = shouldLevelUp ? clamp(level + 1, 1, MAX_LEVEL) : level;
      if (shouldLevelUp) setLevel(newLevel);

      nextRoundTimerRef.current = setTimeout(() => startNewRound(newLevel), 650);
    }
  }

  function revealHint() {
    if (!round.meta.hintsEnabled || hintMeter < 70) return;
    const expected = round.letters[picked.length];
    setFeedback({ text: `Hint: next letter is “${expected}”`, tone: "" });
    setHintMeter(h => clamp(h - 70, 0, 100));
  }

  function undo() {
    if (picked.length === 0) return;
    const last = picked[picked.length - 1];
    setPicked(picked.slice(0, -1));
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
    // what is loaded
    books: BOOKS, book, bookId,
    // progress
    level, score, streak, mistakes, timeLeft, seenCount,
    // the current round
    round, picked, usedTileCounts, feedback, hintMeter, showHints, showWord, showTiles,
    // actions
    switchMode, tapTile, revealHint, undo, skip, resetProgress,
    toggleHints: () => setShowHints(h => !h)
  };
}
