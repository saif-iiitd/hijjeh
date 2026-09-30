// Letters used to build distractor tiles, and letters that never join to the next one.

export const LETTER_POOL = [
  "ا","ب","پ","ت","ث","ج","چ","ح","خ","د","ذ","ر","ز","ژ","س","ش","ص","ض","ط","ظ","ع","غ",
  "ف","ق","ک","گ","ل","م","ن","و","ہ","ی","ٹ","ڑ","ھ","ں","ے"
];

export const NON_JOINERS = new Set(["ا","د","ذ","ر","ز","ژ","و"]);

// Look-alike letters, added as extra distractors from level 5.
export const CONFUSABLE_FAMILIES = [
  ["ب", "پ", "ت", "ث"],
  ["ج", "چ", "ح", "خ"],
  ["س", "ش"],
  ["ص", "ض"],
  ["ز", "ذ"],
  ["د", "ر"]
];
