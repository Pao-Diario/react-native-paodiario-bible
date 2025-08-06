import bookNamesPtBR from "../Bible/assets/pt-br.json";
import bookNamesEnUS from "../Bible/assets/en-us.json";

export function getBibleVersions(): IBibleVersion[] {
  return [
    {
      slug: "nvt",
      title: "NVT",
      fullName: "Nova Versão Transformadora (NVT)",
      language: "pt-br",
    },
    {
      slug: "nvi",
      title: "NVI",
      fullName: "Nova Versão Internacional (NVI)",
      language: "pt-br",
    },
    {
      slug: "aa",
      title: "AA",
      fullName: "Almeida Revisada Imprensa Bíblica (AA)",
      language: "pt-br",
    },
    {
      slug: "acf",
      title: "ACF",
      fullName: "Almeida Corrigida e Fiel (ACF)",
      language: "pt-br",
    },
  ];
}

export function getBibleBySlug(slug: string) {
  return getBibleVersions().find((item) => item.slug === slug);
}
export function getBibleBooks(language?: string): any[] {
  language = language || "pt-br";
  if (language === "en-us") {
    return bookNamesEnUS;
  }
  return bookNamesPtBR;
}
export function getBibleBookChapters(book: { slug: string }): number {
  const bookChapters = [
    { key: "1ch", qty: 29 },
    { key: "1co", qty: 16 },
    { key: "1jn", qty: 5 },
    { key: "1ki", qty: 22 },
    { key: "1pe", qty: 5 },
    { key: "1sa", qty: 31 },
    { key: "1th", qty: 5 },
    { key: "1ti", qty: 6 },
    { key: "2ch", qty: 36 },
    { key: "2co", qty: 13 },
    { key: "2jn", qty: 1 },
    { key: "2ki", qty: 25 },
    { key: "2pe", qty: 3 },
    { key: "2sa", qty: 24 },
    { key: "2th", qty: 3 },
    { key: "2ti", qty: 4 },
    { key: "3jn", qty: 1 },
    { key: "act", qty: 28 },
    { key: "amo", qty: 9 },
    { key: "col", qty: 4 },
    { key: "dan", qty: 12 },
    { key: "deu", qty: 34 },
    { key: "ecc", qty: 12 },
    { key: "eph", qty: 6 },
    { key: "est", qty: 10 },
    { key: "exo", qty: 40 },
    { key: "ezk", qty: 48 },
    { key: "ezr", qty: 10 },
    { key: "gal", qty: 6 },
    { key: "gen", qty: 50 },
    { key: "hab", qty: 3 },
    { key: "hag", qty: 2 },
    { key: "heb", qty: 13 },
    { key: "hos", qty: 14 },
    { key: "isa", qty: 66 },
    { key: "jas", qty: 5 },
    { key: "jer", qty: 52 },
    { key: "job", qty: 42 },
    { key: "jol", qty: 3 },
    { key: "jhn", qty: 21 },
    { key: "jon", qty: 4 },
    { key: "jos", qty: 24 },
    { key: "jud", qty: 1 },
    { key: "jdg", qty: 21 },
    { key: "lam", qty: 5 },
    { key: "lev", qty: 27 },
    { key: "luk", qty: 24 },
    { key: "mal", qty: 4 },
    { key: "mrk", qty: 16 },
    { key: "mat", qty: 28 },
    { key: "mic", qty: 7 },
    { key: "nam", qty: 3 },
    { key: "neh", qty: 13 },
    { key: "num", qty: 36 },
    { key: "oba", qty: 1 },
    { key: "php", qty: 4 },
    { key: "phm", qty: 1 },
    { key: "pro", qty: 31 },
    { key: "psa", qty: 150 },
    { key: "rev", qty: 22 },
    { key: "rom", qty: 16 },
    { key: "rut", qty: 4 },
    { key: "sng", qty: 8 },
    { key: "tit", qty: 3 },
    { key: "zec", qty: 14 },
    { key: "zep", qty: 3 },
  ];
  return bookChapters.find((obj) => obj.key === book.slug)?.qty ?? 0;
}
