import { bibleApi } from "../services/api";

import RNFS, { DocumentDirectoryPath } from "react-native-fs";
import {
  getBibleBookChapters,
  getBibleBooks,
} from "../services/bibleFunctions";

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
