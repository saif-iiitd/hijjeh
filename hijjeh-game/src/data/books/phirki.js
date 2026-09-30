// "کاغذ کی پھرکی" — a poem by Barkat Ali Firaq. Every word appears in the poem (ghazal 1 and 2).
import { makeWords } from "../makeWords.js";
import cover from "../../assets/phirki-cover.jpg";

const WORDS = [
  "آؤ", "پھرکی", "بنائیں", "اور", "ہوا", "میں", "خوب", "نچائیں",
  "چلیں", "کاغذ", "لائیں", "نیلا", "پیلا", "لالو", "کالو", "لائے",
  "جا", "کر", "قینچی", "لئی", "نے", "پھر", "کاٹے", "آڑے", "ترچھے",
  "آدھے", "بانکے", "ان", "سب", "ٹکڑوں", "کو", "موڑا", "سے", "جوڑا",
  "لو", "اب", "وہ", "تیار", "ہے", "پیلی", "نیلی", "ایسی", "بنائی",
  "پھلواری", "پھول", "ہوں", "جیسے", "لی", "اک", "بچی", "تھی", "آ",
  "راجو", "لے", "بھی", "خوش", "ننھے", "منے"
];

export default {
  id: "phirki",
  title: "کاغذ کی پھرکی",
  titleEn: "Kaaghaz Ki Phirki",
  subtitleEn: "The Paper Pinwheel",
  author: "Barkat Ali Firaq",
  cover,
  accent: "#a85a18",   // deep orange, legible version of the pinwheel orange
  done: "#4e7a3f",     // green of the cover's lower triangle
  paper: "#f3eece",    // cover background
  words: makeWords(WORDS)
};
