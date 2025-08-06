import { bibleApi } from "../services/api";
import bookNamesPtBR from "./assets/pt-br.json";
import bookNamesEnUS from "./assets/en-us.json";
import RNFS, { DocumentDirectoryPath } from "react-native-fs";

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

export async function getLinkBook(
  config: {
    currentBookSlug: string;
    currentBookName: string;
    currentBookChapter: number;
  },
  type: "next" | "prev" = "next"
): Promise<{ chapter: number; slug: string; title: string }> {
  let bookSlug = config.currentBookSlug;
  let bookTitle = config.currentBookName;
  const bookChapter = config.currentBookChapter;
  const bookChapters = getBibleBookChapters({ slug: config.currentBookSlug });

  const arrBooks = getBibleBooks();
  const bookIndex = arrBooks.findIndex((obj) => obj.slug === bookSlug);

  let nextChapter = bookChapter;
  if (type === "prev") {
    if (bookIndex > 0) {
      if (bookChapter > 1) {
        nextChapter = bookChapter - 1;
      } else {
        bookSlug = arrBooks[bookIndex - 1].slug;
        bookTitle = arrBooks[bookIndex - 1].title;
        nextChapter = getBibleBookChapters({ slug: bookSlug });
      }
    } else {
      if (bookChapter > 1) {
        nextChapter = bookChapter - 1;
      } else {
        nextChapter = 1;
      }
    }
  } else {
    nextChapter = bookChapter + 1;
    if (nextChapter > bookChapters) {
      if (arrBooks[bookIndex + 1]) {
        bookSlug = arrBooks[bookIndex + 1].slug;
        bookTitle = arrBooks[bookIndex + 1].title;
        nextChapter = 1;
      } else {
        nextChapter = bookChapter;
      }
    }
  }
  return {
    chapter: nextChapter,
    slug: bookSlug,
    title: bookTitle,
  };
}

export async function removeVersion({
  config,
  version,
}: {
  config: any;
  version: any;
}) {
  const VersionDir = `${DocumentDirectoryPath}/PD/Bible/${config.language}/${version.slug}`;
  await RNFS.unlink(VersionDir);
  return [
    ...config.versionsOffline.filter((obj: any) => obj.slug !== version.slug),
  ];
}

export async function openFile({
  fileName,
  pathDir,
}: {
  fileName: string;
  pathDir: string;
}) {
  const BibleDir = `${DocumentDirectoryPath}/PD/Bible/${pathDir}/`;
  const fullName = `${BibleDir}${fileName}`;
  if (await RNFS.exists(fullName)) {
    return await RNFS.readFile(fullName);
  }
  return [];
}

export async function saveToFile({
  content,
  fileName,
  pathDir,
}: {
  content: string;
  fileName: string;
  pathDir: string;
}) {
  const BibleDir = `${DocumentDirectoryPath}/PD/Bible/${pathDir}/`;
  const requestDir = await RNFS.exists(BibleDir);
  if (!requestDir) {
    await RNFS.mkdir(BibleDir);
  }
  const fullName = `${BibleDir}${fileName}`;
  if (!(await RNFS.exists(fullName))) {
    await RNFS.writeFile(fullName, content);
  }
}

export async function downloadVersion({
  config,
  version,
}: {
  config: any;
  version: any;
}) {
  console.log("Start download version", version.slug);
  const books = await getBibleBooks(config.language);
  try {
    for (const book of books) {
      console.log("Download", version.slug, book.slug);
      const response = await bibleApi.get(
        `${config.language}/${version.slug}/${book.downloadSlug}/?contentType=raw`
      );
      if (response.data && typeof response.data !== "string") {
        const bookArray = response.data;
        let chapterContent: any[] = [];
        let currentChapter;
        let counter = -1;
        for (const item of bookArray) {
          const [chapter, verse] = item.chapter_verse.toString().split(".");
          if (currentChapter !== parseInt(chapter)) {
            if (counter >= 0) {
              await saveToFile({
                content: JSON.stringify(chapterContent),
                fileName: `${currentChapter}.json`,
                pathDir: `${config.language}/${version.slug}/${book.slug}`,
              });
            }
            chapterContent = [];
            currentChapter = parseInt(chapter);
          }
          chapterContent.push({
            chapterNumber: parseInt(chapter),
            verseNumber: parseInt(verse.padEnd(3, "0")),
            verseText: item.text,
          });
          counter++;
        }
        await saveToFile({
          content: JSON.stringify(chapterContent),
          fileName: `${currentChapter}.json`,
          pathDir: `${config.language}/${version.slug}/${book.slug}`,
        });
      }
    }
    return [
      ...config.versionsOffline,
      {
        slug: version.slug,
        language: config.language,
      },
    ];
  } catch (error) {
    console.log("####error", error);
  }
  return false;
}

export async function loadBibleContent({
  config,
  bookSlug,
  bookChapter,
  bookTitle,
  reference,
}: any) {
  try {
    if (config.versionsOffline.length > 0 && !reference) {
      const checkAvailability = config.versionsOffline.findIndex(
        (obj: any) => obj.slug === config?.currentVersion
      );
      if (checkAvailability > -1) {
        console.log("Tem OFFLINE");
        console.log("Tem OFFLINE - bookChapter", bookChapter);
        return await getBibleContentFromLocal({
          language: config?.language,
          version: config?.currentVersion,
          bookSlug,
          bookChapter,
          bookTitle,
          reference,
        });
      }
    }
  } catch (error) {
    console.log("####error", error);
  }
  return await getBibleContentFromWeb({
    language: config?.language,
    version: config?.currentVersion,
    bookSlug,
    bookChapter,
    bookTitle,
    reference,
  });
}

async function getBibleContentFromLocal({
  language,
  version,
  bookSlug,
  bookTitle,
  bookChapter,
  reference,
}: any) {
  const retFile = await openFile({
    fileName: `${bookChapter}.json`,
    pathDir: `${language}/${version}/${bookSlug}`,
  });
  const chapterContent = JSON.parse(retFile as string);
  return chapterContent.length > 0
    ? chapterContent
    : [{ verseNumber: "", verseText: "Ops... Ocorreu algum erro" }];
}

async function getBibleContentFromWeb({
  language,
  version,
  bookSlug,
  bookTitle,
  bookChapter,
  reference,
}: any) {
  let search = "";
  if (reference) {
    search = encodeURI(`search?verseRef=${reference}&contentType=raw`);
  } else {
    search = encodeURI(`search?verseRef=${bookSlug}&contentType=raw`);
    if (bookChapter) {
      search = encodeURI(
        `search?verseRef=${bookTitle} ${bookChapter}&contentType=raw`
      );
    }
  }
  try {
    console.log("asdasd");
    const response = await bibleApi.get(`${language}/${version}/${search}`);
    if (
      response.data &&
      typeof response.data !== "string" &&
      response.data.length > 1
    ) {
      const arrData = response.data;
      const arrVerses = arrData.map((item: any, index: number) => {
        const [chapter, verse] = item.chapter_verse.toString().split(".");
        return {
          language_translation_book: item.language_translation_book,
          chapterNumber: parseInt(chapter),
          verseNumber: parseInt(verse.padEnd(3, "0")),
          verseText: item.text,
        };
      });
      return arrVerses;
    }
  } catch (error) {
    console.log("Capítulo não carregado", error);
    return [
      {
        verseNumber: "",
        verseText: "Ops... Ocorreu algum erro de busca",
      },
    ];
  }
}
