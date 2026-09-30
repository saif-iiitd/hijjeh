// Words from "بڑھیا اور چڑیا کی کہانی" (Budhiya aur Chidiya ki Kahaani) — a poem by Barkat Ali Firaq.
// Every word below appears in the poem, in order of first appearance. Diacritics (shadda etc.)
// are left out so that each tile is one base letter. Level follows word length.

(function () {
  const WORDS = [
    // page 1
    "آؤ", "بچوں", "گیت", "سنائیں", "خوب", "ہنسائیں",
    "ایک", "بڑھیا", "نے", "چڑیا", "پالی", "ننھی", "منی", "بھولی", "بھالی",
    "بیٹھی", "کھیر", "پکاتی", "سناتی",
    "دن", "بھوکی", "آئی", "جلدی", "پکائی",
    // page 2
    "منہ", "دھو", "کر", "وہ", "کھانے", "سنانے",
    "سب", "کچھ", "کھا", "ڈالا", "کو", "بھوکا", "ہی", "ٹالا",
    "جب", "پنجرے", "میں", "بھوک", "سے", "اس", "نیند", "نہ",
    "چوں", "کے", "روئی", "ساری", "رات", "اسی", "کھوئی",
    "صبح", "ہوئی", "اور", "مرغا", "بولا", "تب", "پنجرا", "کھولا",
    // page 3
    "پیار", "چمکارا", "چونچوں", "مارا",
    "بھاگی", "گھر", "مٹھی", "بھر", "دانا", "لائی",
    "کھلایا", "سنایا"
  ];

  const levelFor = n => (n <= 3 ? 1 : n === 4 ? 2 : 3);

  window.BOOKS = window.BOOKS || [];
  window.BOOKS.push({
    id: "budhiya",
    title: "بڑھیا اور چڑیا کی کہانی",
    titleEn: "Budhiya aur Chidiya ki Kahaani",
    subtitleEn: "The Story of the Old Woman and the Bird",
    author: "Barkat Ali Firaq",
    cover: "assets/budhiya-cover.jpg",
    accent: "#9a4326",   // terracotta of the cover title
    done: "#5b6a3a",     // olive of the cover foliage
    paper: "#f4e7d7",    // cover background
    words: WORDS.map(w => {
      const letters = [...w];
      return { word: w, letters, level: levelFor(letters.length) };
    })
  });
})();
