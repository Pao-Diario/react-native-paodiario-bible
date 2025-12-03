import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Modal,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";

import api from "../../services/api";

import { MaterialIcons as Icon } from "@react-native-vector-icons/material-icons";
import { ThemeProvider } from "styled-components/native";

import * as Styled from "./styles";
import useBible from "../hooks/useBible";
import lightTheme from "../../themes";
import darkTheme from "../../themes/dark";

type BibleVersesModalProps = {
  visible: boolean;
  verses: string;
  onDismiss: () => void;
};

export default function BibleVersesModal({
  visible,
  verses,
  onDismiss,
}: BibleVersesModalProps) {
  const bibleContext = useBible();

  if (!bibleContext) return null;
  const { fontSizeOffset, currentTheme } = bibleContext;

  const [loading, setLoading] = useState(false);
  const [listVerses, setListVerses] = useState<any[]>([]);
  const [listVersesContent, setListVersesContent] = useState<any[]>([]);
  const isDarkMode = currentTheme === "dark";
  const theme = currentTheme === "dark" ? darkTheme : lightTheme;
  // const theme = useSelector(store => store.config.theme);
  async function handleDone() {
    // console.log('handleDone');
    // onDismiss(postData, true);
    onDismiss();
  }
  type ParsedChapter = {
    title: string;
    verses: { number: string; text: string }[];
  };

  function stripHtml(input: string) {
    return input
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#x27;/gi, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  function toHtmlString(content: any): string | null {
    if (typeof content === "string") return content;
    if (Array.isArray(content)) return content.join("");
    if (content && typeof content === "object") {
      if (typeof content.content === "string") return content.content;
    }
    return null;
  }

  function parseBibleHtml(rawContent: any): ParsedChapter[] {
    const content = toHtmlString(rawContent);
    if (!content) return [];

    // Captura sequencial de títulos de capítulo e versos.
    // Captura a tag de abertura com a classe alvo, guarda o nome da tag e lê até o fechamento correspondente.
    const chunkRegex =
      /<([A-Za-z0-9]+)[^>]*class=["'][^"']*(book-chapter-number|versecontent)[^"']*["'][^>]*>([\s\S]*?)<\/\1>/gi;

    const chapters: ParsedChapter[] = [];
    let current: ParsedChapter | null = null;

    let match: RegExpExecArray | null;
    while ((match = chunkRegex.exec(content))) {
      const kind = match[2];
      const inner = match[3];

      if (kind === "book-chapter-number") {
        current = {
          title: stripHtml(inner),
          verses: [],
        };
        chapters.push(current);
        continue;
      }

      if (kind === "versecontent") {
        const numberMatch = inner.match(
          /<span[^>]*class=["'][^"']*verse-number[^"']*["'][^>]*>([\s\S]*?)<\/span>/i
        );
        const verseNumber = stripHtml(numberMatch ? numberMatch[1] : "");
        const verseBody = inner.replace(
          /<span[^>]*class=["'][^"']*verse-number[^"']*["'][^>]*>[\s\S]*?<\/span>/i,
          ""
        );
        const verseText = stripHtml(verseBody);

        if (!current) {
          current = { title: "", verses: [] };
          chapters.push(current);
        }

        current.verses.push({
          number: verseNumber,
          text: verseText,
        });
      }
    }

    return chapters;
  }

  async function getBibleText(title: string) {
    if (!title || title.trim() === "") return [];
    try {
      const response = await api.get(
        `bible/search/ref/${title}/contentType/html`
      );
      if (response.data) {
        return parseBibleHtml(response.data.content ?? response.data);
      }
    } catch (error) {
      console.log("error getBibleText", error);
    }
    return [];
  }
  function parseVerses() {
    console.log("verses", verses);
    if (verses && verses.indexOf(";") > -1) {
      const arrItems = verses.split(";");
      setListVerses(
        arrItems.map((item) => {
          return { title: item?.trim(), content: "" };
        })
      );
    } else {
      const arrItems = [verses];
      setListVerses(
        arrItems.map((item) => {
          return { title: item?.trim(), content: "" };
        })
      );
    }
  }
  useEffect(() => {
    setLoading(true);
    async function getAllListVersesContent() {
      const contents = await Promise.all(
        listVerses.map(async (item) => {
          const content = await getBibleText(item.title);

          return content;
        })
      );
      setListVersesContent(contents);
      setLoading(false);
    }
    getAllListVersesContent();
  }, [listVerses]);

  useEffect(() => {
    parseVerses();
  }, [verses]);

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      presentationStyle="formSheet"
      animationType="slide"
      key={991}
    >
      <ThemeProvider theme={theme}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <Styled.ThemedSafeAreaView>
          <Styled.Container>
            <Styled.Title>Leitura</Styled.Title>
            <Styled.CloseButton onPress={() => onDismiss()}>
              <Icon
                name="close"
                size={28}
                color={isDarkMode ? "#fff" : "#fff"}
              />
            </Styled.CloseButton>
          </Styled.Container>
          <Styled.ThemedScrollView
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
          >
            <Styled.ScrollContainer>
              {loading && (
                <ActivityIndicator color={isDarkMode ? "#fff" : "#000"} />
              )}

              {!loading &&
                listVersesContent.length > 0 &&
                listVersesContent.map((chapterList, idx) => (
                  <View key={`chapter-list-${idx}`}>
                    {chapterList.map(
                      (chapter: ParsedChapter, chapterIndex: number) => (
                        <View
                          key={`${chapter.title}-${chapterIndex}`}
                          style={{ marginBottom: 12 }}
                        >
                          {!!chapter.title && (
                            <Styled.VerseTitle fontSizeOffset={fontSizeOffset}>
                              {chapter.title}
                              <Styled.Line />
                            </Styled.VerseTitle>
                          )}
                          {chapter.verses.map((verse, verseIndex) => (
                            <Styled.VerseText
                              key={`${chapter.title}-${verse.number}-${verseIndex}`}
                              fontSizeOffset={fontSizeOffset}
                            >
                              <Styled.VerseNumber
                                fontSizeOffset={fontSizeOffset}
                              >
                                {`${verse.number}. `}
                              </Styled.VerseNumber>
                              {verse.text}
                            </Styled.VerseText>
                          ))}
                        </View>
                      )
                    )}
                  </View>
                ))}
            </Styled.ScrollContainer>
          </Styled.ThemedScrollView>
        </Styled.ThemedSafeAreaView>
      </ThemeProvider>
    </Modal>
  );
}
