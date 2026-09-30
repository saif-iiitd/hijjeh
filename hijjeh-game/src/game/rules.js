// Pure game rules: how a round is built. No React in here.
import { LETTER_POOL, CONFUSABLE_FAMILIES } from "../data/letters.js";

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Build one round from a word bank.
 * @param {number} level        current level (1–6)
 * @param {Set<string>} seen    words already played, so new ones are preferred
 * @param {Array} bank          word-bank entries: { word, letters, level }
 */
export function buildRound(level, seen, bank) {
  const eligible = bank.filter(w => w.level <= level);
  const unseen = eligible.filter(w => !seen.has(w.word));
  const chosen = unseen.length > 0 ? pickRandom(unseen) : pickRandom(eligible);

  const distractorCount = clamp(1 + level * 2, 2, 14);
  const allowDuplicatesInTiles = level >= 5;
  const includeHardDistractors = level >= 5;

  const answerLetters = chosen.letters;

  const distractors = [];
  while (distractors.length < distractorCount) {
    const l = pickRandom(LETTER_POOL);
    if (!answerLetters.includes(l) || allowDuplicatesInTiles) distractors.push(l);
  }

  if (includeHardDistractors) distractors.push(...pickRandom(CONFUSABLE_FAMILIES));

  const tiles = shuffle([...answerLetters, ...distractors].slice(0, 6 + level * 2));

  // Every letter the word needs must be on the board.
  for (const req of answerLetters) {
    if (!tiles.includes(req)) tiles.push(req);
  }

  return {
    ...chosen,
    tiles: shuffle(tiles),
    meta: {
      distractorCount,
      partialResetOnMistake: level <= 3,
      timeLimitSec: level >= 6 ? 20 : null,
      hintsEnabled: level >= 4
    }
  };
}
