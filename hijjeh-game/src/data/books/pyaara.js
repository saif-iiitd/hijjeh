// "سب کا پیارا" — a poem by Barkat Ali Firaq. Every word appears in the poem.
import { makeWords } from "../makeWords.js";
import cover from "../../assets/pyaara-cover.jpg";

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

export default {
  id: "pyaara",
  title: "سب کا پیارا",
  titleEn: "Sab Ka Pyaara",
  subtitleEn: "Everyone's Darling",
  author: "Barkat Ali Firaq",
  cover,
  buyUrl: "",         // Amazon link for this book; empty until it is added (no button shows while empty)
  accent: "#b0405a",   // deep rose, legible version of the cover's pink ribbons
  done: "#5d7a4f",     // sage of the cover's foliage
  paper: "#f7f1e6",    // cover background
  words: makeWords(WORDS)
};
