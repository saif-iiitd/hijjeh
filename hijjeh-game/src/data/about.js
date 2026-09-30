// Text for the About page. Edit here; the page lays it out (numbered sections, then the books and credits).
// The list of books, their covers and Buy links are filled in automatically from src/data/books/.
//
// Sources (paraphrased, not copied): the "Learning While Living" front matter and the BAFTER website,
// https://bafter.wordpress.com. Wording follows the About page in the Origami design.

export const ABOUT = {
  title: "About Hijjeh",
  urduTitle: "ہجے",

  sections: [
    {
      heading: "The game",
      paragraphs: [
        "Hijjeh (ہجے) means spelling. It is a small game for practising the spelling of Urdu words, one letter at a time: a word appears, and you tap its letters in the right order.",
        "It is made as a companion to the Learning While Living readers. Each book has its own word list, taken from its poem, so what children play with is what they have just read aloud."
      ],
      list: [
        "Free play: words from a graded list, from single letters up to longer words.",
        "Book mode: choose a book and play only the words of its poem, in that book’s own colours.",
        "Three correct words in a row raise the level, and harder levels add look-alike letters to tell apart."
      ]
    },
    {
      heading: "Learning While Living",
      paragraphs: [
        "Learning does not begin and end in the classroom. Much of it happens in ordinary life: in talk at home, in stories before sleep, in the shared curiosity between a child and a parent.",
        "The series was conceived by BAFTER to bring learning and life back together, through books meant to be read aloud, revisited, memorised and enjoyed as a family."
      ]
    },
    {
      heading: "Barkat Ali Firaq",
      paragraphs: [
        "The poems in these books are by Barkat Ali Firaq, who took part in the Indian struggle for independence and worked for adult and continuing education. He gave twenty years to building Jamia Millia Islamia under Dr Zakir Husain.",
        "His poems for children hold the idea of learning woven into life."
      ]
    },
    {
      heading: "BAFTER",
      paragraphs: [
        "The Barkat Ali Firaq Trust for Education and Research is a registered society, established in 2005 in New Delhi, working in publishing, courses and talks, and archiving material from the independence era."
      ],
      site: true
    }
  ]
};
