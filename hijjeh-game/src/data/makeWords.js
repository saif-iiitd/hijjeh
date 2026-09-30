// Turns a plain list of words into word-bank entries. Level follows word length
// (1–3 letters → 1, 4 → 2, 5+ → 3). Diacritics are left out of the lists so that
// each tile is one base letter.

const levelFor = n => (n <= 3 ? 1 : n === 4 ? 2 : 3);

export function makeWords(list) {
  return list.map(word => {
    const letters = [...word];
    return { word, letters, level: levelFor(letters.length) };
  });
}
