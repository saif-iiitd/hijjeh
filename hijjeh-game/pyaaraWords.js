// Words from "سب کا پیارا" (Sab Ka Pyaara) — a poem by Barkat Ali Firaq.
// Every word below appears in the poem. Level follows word length.

(function () {
  const WORDS = [
    "اک", "دن", "لالو", "روتے", "آئے", "آنسو", "سے", "منہ", "دھوتے",
    "ابا", "نے", "آ", "کر", "چمکارا", "کیوں", "ہو", "کس", "مارا",
    "بھائی", "جان", "پوچھا", "مار", "کہاں", "کھا", "دادی", "گرتی",
    "پڑتی", "آئیں", "لاٹھی", "کھٹ", "کرتی", "کو", "جو", "دیکھا",
    "بیٹا", "جا", "میری", "گود", "میں", "میرا", "ابنا", "راجا",
    "اماں", "آپا", "روٹی", "اور", "مٹھائی", "لائیں", "گودی", "اٹھایا",
    "پیار", "کیا", "چھاتی", "لگایا", "بولیں", "چپ", "جاؤ", "کھاؤ",
    "پھر", "بھابھی", "ان", "بلایا", "گیت", "سنا", "دل", "بہلایا",
    "نہلا", "کپڑے", "پہنائے", "اچھے", "کھانے", "کھلائے", "ہیں",
    "سب", "کے", "پیارے", "وہ", "کی", "آنکھوں", "تارے"
  ];

  const levelFor = n => (n <= 3 ? 1 : n === 4 ? 2 : 3);

  window.BOOKS = window.BOOKS || [];
  window.BOOKS.push({
    id: "pyaara",
    title: "سب کا پیارا",
    titleEn: "Sab Ka Pyaara",
    subtitleEn: "Everyone's Darling",
    author: "Barkat Ali Firaq",
    cover: "assets/pyaara-cover.jpg",
    accent: "#b0405a",   // deep rose, legible version of the cover's pink ribbons
    done: "#5d7a4f",     // sage of the cover's foliage
    paper: "#f7f1e6",    // cover background
    words: WORDS.map(w => {
      const letters = [...w];
      return { word: w, letters, level: levelFor(letters.length) };
    })
  });
})();
