// Shared shapes (JSDoc typedefs). They exist so `tsc` can emit .d.ts files with real prop types.

/**
 * One playable word.
 * @typedef {Object} WordEntry
 * @property {string} word            The word as shown, e.g. "پھرکی".
 * @property {string[]} letters       The word split into base letters, in spelling order.
 * @property {number} level           Difficulty 1–6; a word is offered once the player's level reaches it.
 * @property {string[]} [tags]        Free-play teaching tags such as "non-joiners".
 */

/**
 * A book whose poem supplies the word list, and whose cover supplies the theme.
 * @typedef {Object} Book
 * @property {string} id              Stable id used in `?book=<id>` links.
 * @property {string} title           Urdu title.
 * @property {string} [titleEn]       Transliterated title.
 * @property {string} [subtitleEn]    English subtitle.
 * @property {string} [author]        Author, shown as "A poem by …".
 * @property {string} [cover]         URL of the cover thumbnail.
 * @property {string} [buyUrl]        Where to buy the book; shows a "Buy on Amazon" link when set.
 * @property {string} accent          Theme colour (banner, frame, ribbon, tile shadow); a CSS colour.
 * @property {string} [done]          Colour for correctly picked letters; defaults to `accent`.
 * @property {string} [paper]         Page tint taken from the cover background.
 * @property {WordEntry[]} words      Every word of the poem.
 */

export {};
