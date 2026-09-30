// Free-play word bank: not tied to any book. Levels are hand-set to introduce
// non-joiners, dotted letters and look-alike shapes gradually.

export const FREE_WORDS = [
  { word: "ب", letters: ["ب"], level: 1, tags: ["single"] },
  { word: "ا", letters: ["ا"], level: 1, tags: ["single", "non-joiner"] },
  { word: "با", letters: ["ب", "ا"], level: 2, tags: ["simple"] },
  { word: "اب", letters: ["ا", "ب"], level: 2, tags: ["simple"] },
  { word: "بابا", letters: ["ب","ا","ب","ا"], level: 2, tags: ["simple"] },

  { word: "بیت", letters: ["ب","ی","ت"], level: 3, tags: ["3-letter"] },
  { word: "کتاب", letters: ["ک","ت","ا","ب"], level: 3, tags: ["4-letter"] },
  { word: "پاکستان", letters: ["پ","ا","ک","س","ت","ا","ن"], level: 3, tags: ["longer"] },

  { word: "دور", letters: ["د","و","ر"], level: 4, tags: ["non-joiners"] },
  { word: "اور", letters: ["ا","و","ر"], level: 4, tags: ["non-joiners"] },
  { word: "راز", letters: ["ر","ا","ز"], level: 4, tags: ["non-joiners"] },

  { word: "شیر", letters: ["ش","ی","ر"], level: 5, tags: ["dots", "similar-shapes"] },
  { word: "سبق", letters: ["س","ب","ق"], level: 5, tags: ["dots"] },
  { word: "ثابت", letters: ["ث","ا","ب","ت"], level: 5, tags: ["b/p/t/th family"] },

  { word: "زندگی", letters: ["ز","ن","د","گ","ی"], level: 6, tags: ["mixed"] },
  { word: "محبت", letters: ["م","ح","ب","ت"], level: 6, tags: ["mixed"] }
];
