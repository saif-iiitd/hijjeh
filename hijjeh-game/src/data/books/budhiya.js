// "بڑھیا اور چڑیا کی کہانی" — a poem by Barkat Ali Firaq. Every word appears in the poem.
import { makeWords } from "../makeWords.js";
import cover from "../../assets/budhiya-cover.jpg";

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

export default {
  id: "budhiya",
  title: "بڑھیا اور چڑیا کی کہانی",
  titleEn: "Budhiya aur Chidiya ki Kahaani",
  subtitleEn: "The Story of the Old Woman and the Bird",
  author: "Barkat Ali Firaq",
  cover,
  buyUrl: "https://www.amazon.in/dp/B09Q7T7XX3",
  accent: "#9a4326",   // terracotta of the cover title
  done: "#5b6a3a",     // olive of the cover foliage
  paper: "#f4e7d7",    // cover background
  words: makeWords(WORDS)
};
