// Words from "کاغذ کی پھرکی" (Kaaghaz Ki Phirki) — a poem by Barkat Ali Firaq.
// Every word below appears in the poem (ghazal 1 and ghazal 2). Level follows word length.

(function () {
  const WORDS = [
    "آؤ", "پھرکی", "بنائیں", "اور", "ہوا", "میں", "خوب", "نچائیں",
    "چلیں", "کاغذ", "لائیں", "نیلا", "پیلا", "لالو", "کالو", "لائے",
    "جا", "کر", "قینچی", "لئی", "نے", "پھر", "کاٹے", "آڑے", "ترچھے",
    "آدھے", "بانکے", "ان", "سب", "ٹکڑوں", "کو", "موڑا", "سے", "جوڑا",
    "لو", "اب", "وہ", "تیار", "ہے", "پیلی", "نیلی", "ایسی", "بنائی",
    "پھلواری", "پھول", "ہوں", "جیسے", "لی", "اک", "بچی", "تھی", "آ",
    "راجو", "لے", "بھی", "خوش", "ننھے", "منے"
  ];

  const levelFor = n => (n <= 3 ? 1 : n === 4 ? 2 : 3);

  window.BOOKS = window.BOOKS || [];
  window.BOOKS.push({
    id: "phirki",
    title: "کاغذ کی پھرکی",
    titleEn: "Kaaghaz Ki Phirki",
    subtitleEn: "The Paper Pinwheel",
    author: "Barkat Ali Firaq",
    cover: "assets/phirki-cover.jpg",
    accent: "#a85a18",   // deep orange, legible version of the pinwheel orange
    done: "#4e7a3f",     // green of the cover's lower triangle
    paper: "#f3eece",    // cover background
    words: WORDS.map(w => {
      const letters = [...w];
      return { word: w, letters, level: levelFor(letters.length) };
    })
  });
})();
