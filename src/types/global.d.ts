interface IBibleVersion {
  slug: string;
  title: string;
  fullName: string;
  language: string;
}
interface IBibleVerse {
  verseNumber: number;
  chapterNumber: number;
  verseText?: string;
  language_translation_book?: string;
  bookSlug?: string;
}
