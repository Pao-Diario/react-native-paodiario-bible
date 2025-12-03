import { Modal, StatusBar, TouchableOpacity, View } from "react-native";
import * as Styled from "./styles";
import { MaterialIcons } from "@react-native-vector-icons/material-icons";
import { FontAwesome5 } from "@react-native-vector-icons/fontawesome5";
import useBible from "../hooks/useBible";
import React, { useRef, useState, useEffect, useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { FlatList } from "react-native";

import { getLinkBook, loadBibleContent } from "../functions";
import Tooltip from "../../components/Tooltip";
import BookPicker from "../BookPicker";
import VersionPicker from "../VersionPicker";
import * as CardSelectStyles from "../CardSelectBible/styles";

export const colors = [
  {
    name: "yellow",
    color: "#fcfd0a",
    textColor: "#000000",
    highlightColor: "#ffffff",
  },
  {
    name: "gray",
    color: "#e9e9e9",
    textColor: "#000000",
    highlightColor: "#ffff99",
  },
  {
    name: "green",
    color: "#99ff99",
    textColor: "#000000",
    highlightColor: "#ffff99",
  },
  {
    name: "orange",
    color: "#ff9900",
    textColor: "#000000",
    highlightColor: "#ffff99",
  },
  {
    name: "purple",
    color: "#cc99ff",
    textColor: "#000000",
    highlightColor: "#ffff99",
  },
  {
    name: "bege",
    color: "#cc9966",
    textColor: "#000000",
    highlightColor: "#ffff99",
  },
  {
    name: "chumbo",
    color: "#afceeb",
    textColor: "#000000",
    highlightColor: "#ffff99",
  },
];

export default function ReaderModal({
  visible,
  onDismiss,
  ...props
}: {
  visible: boolean;
  onDismiss: () => void;
}) {
  const theme = useContext(ThemeContext);
  const bibleContext = useBible();
  if (!bibleContext) return null;

  const refContent = useRef<FlatList<IBibleVerse>>(null);
  const fontSizeOffset = bibleContext.fontSizeOffset;
  const currentTrack = bibleContext.currentTrack;
  const isPlayerOpened = currentTrack ? true : false;

  const [loading, setLoading] = useState(true);
  const [fontChangeVisible, setFontChangeVisible] = useState(false);
  const [contentList, setContentList] = useState<IBibleVerse[]>([]);
  // const [bookmarkedVerses, setBookmarkedVerses] = useState<IBibleVerse[]>([]);
  const [selectedVerse, setSelectedVerse] = useState<IBibleVerse | null>(null);
  // Estados do player vindos do contexto
  const isPlaying = bibleContext.audioPlayer.isPlaying;
  const bookmarkedVerses = bibleContext.bookmarks;
  const [biblePickerModalVisible, setBiblePickerVisible] = useState(false);
  const [versionPickerModalVisible, setVersionPickerVisible] = useState(false);
  const [currentBook, setCurrentBook] = useState<any>();
  const [currentVersion, setCurrentVersion] = useState("nvt");

  const isDarkMode = bibleContext.currentTheme === "dark";

  useEffect(() => {
    async function loadTextContent() {
      const data = await loadBibleContent({
        config: bibleContext,
        bookSlug: bibleContext?.currentBookSlug,
        bookChapter: bibleContext?.currentBookChapter,
        bookTitle: bibleContext?.currentBookName,
      });
      // console.log("data", data);
      setContentList(data as IBibleVerse[]);

      refContent?.current?.scrollToOffset({ offset: 0, animated: false });
      setLoading(false);
    }
    setLoading(true);
    loadTextContent();
  }, [bibleContext?.currentBookChapter]);

  // useEffect(() => {
  //   console.log("bookmarks", bibleContext?.bookmarks);
  //   // setBookmarkedVerses(bibleContext?.bookmarks);
  // }, [bibleContext?.bookmarks]);

  async function bibleNavigate(direction: "next" | "prev") {
    if (!bibleContext) return;
    const config = bibleContext;
    setLoading(true);
    bibleContext.audioPlayer.pause();
    const nextBook = await getLinkBook(config, direction);

    bibleContext.updateContext({
      ...config,
      currentBookName: nextBook.title,
      currentBookSlug: nextBook.slug,
      currentBookChapter: nextBook?.chapter || null,
    });

    // if (typeof boookSelected === 'function') {
    //   boookSelected(book);
    // }
    // setCurrentBook(nextBook);
  }
  async function updateCurrentBook(book: any) {
    const config = bibleContext;
    if (config) {
      config.updateContext({
        ...config,
        currentBookName: book.title,
        currentBookSlug: book.slug,
        currentBookChapter: book?.chapter || null,
      });
      setCurrentBook(book);
      refContent?.current?.scrollToOffset({ offset: 0, animated: false });
    }
  }

  useEffect(() => {
    if (!bibleContext) return;
    setCurrentVersion(bibleContext.currentVersion);
    setCurrentBook({
      slug: bibleContext.currentBookSlug,
      title: bibleContext.currentBookName,
      chapter: bibleContext.currentBookChapter,
    });
  }, [
    bibleContext?.currentBookSlug,
    bibleContext?.currentBookName,
    bibleContext?.currentBookChapter,
    bibleContext?.currentVersion,
  ]);
  function renderItem({ item }: { item: IBibleVerse }) {
    const { verseNumber, verseText } = item;
    const verseId = `${bibleContext?.currentBookChapter}_${item.verseNumber}`;
    const isAudioPlaying =
      bibleContext?.audioPlayer?.currentVerse &&
      bibleContext?.audioPlayer?.currentVerse === verseId;
    const isSelected = selectedVerse?.verseNumber === verseNumber;
    const bookmarkData = bookmarkedVerses.find(
      (bookmark) =>
        bookmark.bookSlug === bibleContext?.currentBookSlug &&
        bookmark.chapterNumber === item?.chapterNumber &&
        bookmark.verseNumber === item?.verseNumber
    );
    const bookmarkColor = bookmarkData
      ? colors.find((color) => color.name === bookmarkData.color)
      : undefined;
    const bookmarkTextColor = bookmarkColor?.textColor;
    // console.log("bookmarkData", bookmarkData);
    return (
      <Styled.VerseArea
        onPress={() => {
          if (isSelected) {
            setSelectedVerse(null);
          } else {
            setSelectedVerse(item);
          }
        }}
        style={[
          isAudioPlaying && bibleContext?.audioPlayer?.isPlaying
            ? {
                backgroundColor:
                  theme?.colors?.contentArea?.background || "#e0f7fa",
                marginHorizontal: -16,
                paddingHorizontal: 16,
              }
            : {},
          bookmarkData
            ? {
                backgroundColor: bookmarkColor?.color || "#00e1ff",
                marginHorizontal: -20,
                paddingHorizontal: 20,
              }
            : {},
        ]}
      >
        <Styled.VerseText fontSizeOffset={fontSizeOffset}>
          <Styled.VerseWord
            key={`verse-${verseNumber}`}
            fontSizeOffset={fontSizeOffset}
            isSelected={isSelected}
            textColor={bookmarkTextColor}
          >
            <Styled.VerseNumber
              style={[
                bookmarkData
                  ? {
                      color: bookmarkTextColor || "#000000",
                    }
                  : {},
              ]}
              fontSizeOffset={fontSizeOffset}
            >
              {`${verseNumber} `}
            </Styled.VerseNumber>
          </Styled.VerseWord>
          {verseText?.split(/(\s+)/).map((word, idx) => {
            // Se for espaço, renderiza diretamente
            if (/^\s+$/.test(word)) {
              return word;
            }
            return (
              <Styled.VerseWord
                key={`${verseNumber}-${idx}`}
                fontSizeOffset={fontSizeOffset}
                isSelected={isSelected}
                textColor={bookmarkTextColor}
              >
                {word}
              </Styled.VerseWord>
            );
          })}
        </Styled.VerseText>
      </Styled.VerseArea>
    );
  }
  async function listenChapter() {
    if (bibleContext?.audioPlayer?.isPlaying) {
      await bibleContext.audioPlayer.pause();
      return;
    }

    const chapterTracks = contentList.map((contentItem) => ({
      id: `${bibleContext?.currentBookChapter}_${contentItem.verseNumber}`,
      url: `https://general.app.paodiario.org.br/speech/stream/text/${encodeURI(
        contentItem?.verseText ?? ""
      )}`,
      title: `${bibleContext?.currentBookName}: ${bibleContext?.currentBookChapter}:${contentItem.verseNumber}`,
      artist: "Ministérios Pão diário",
      artwork:
        "https://paodiario.org/wp-content/themes/paodiario/bible/assets/img/icon_bible_audio.png",
      verseNumber: contentItem.verseNumber,
    }));

    bibleContext?.audioPlayer.playChapter(chapterTracks);
    // currentVerse será atualizado pelo contexto
  }
  function handleFontSizeOffset(diff = 1) {
    const offset = fontSizeOffset + diff;
    if (offset > 5 || offset < 0) {
      return;
    }

    bibleContext?.updateContext({
      ...bibleContext,
      fontSizeOffset: offset,
    });
  }
  return (
    <Modal
      visible={visible}
      {...props}
      animationType="slide"
      presentationStyle="fullScreen"
      key={991}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <Styled.ThemedSafeAreaView>
        <Styled.Container>
          <Styled.Header>
            <View
              style={{
                flex: 1,
              }}
            >
              {biblePickerModalVisible && (
                <BookPicker
                  onDismiss={({ openVersion }) => {
                    if (openVersion) {
                      setVersionPickerVisible(true);
                    }
                    setBiblePickerVisible(false);
                  }}
                  currentBook={currentBook}
                  onSelect={(book: any) => {
                    updateCurrentBook(book);
                  }}
                  visible={biblePickerModalVisible}
                />
              )}
              {versionPickerModalVisible && (
                <VersionPicker
                  onDismiss={() => {
                    setVersionPickerVisible(false);
                  }}
                  visible={versionPickerModalVisible}
                />
              )}
              <CardSelectStyles.ButtonSelect
                onPress={() => {
                  setBiblePickerVisible(!biblePickerModalVisible);
                }}
              >
                <CardSelectStyles.ButtonSelectText>{`${
                  currentBook?.title || "Selecionar livro"
                } ${
                  currentBook?.chapter || ""
                }`}</CardSelectStyles.ButtonSelectText>
                <CardSelectStyles.ButtonVersionContainer
                  onPress={() => {
                    setVersionPickerVisible(!versionPickerModalVisible);
                  }}
                >
                  <CardSelectStyles.ButtonVersionText>
                    {currentVersion}
                  </CardSelectStyles.ButtonVersionText>
                </CardSelectStyles.ButtonVersionContainer>
              </CardSelectStyles.ButtonSelect>
            </View>
            <Styled.HeaderGroup>
              <Tooltip
                visible={fontChangeVisible}
                position={{ right: 20, top: 120 }}
                closeTooltip={() => setFontChangeVisible(false)}
              >
                <Styled.FontScaleContainer>
                  <TouchableOpacity
                    style={{ paddingRight: 15 }}
                    onPress={() => handleFontSizeOffset(-1)}
                  >
                    <FontAwesome5
                      iconStyle="solid"
                      name="font"
                      size={14}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      paddingLeft: 15,
                      borderColor: "#fff",
                      borderLeftWidth: 1,
                    }}
                    onPress={() => handleFontSizeOffset()}
                  >
                    <FontAwesome5
                      iconStyle="solid"
                      name="font"
                      size={20}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </Styled.FontScaleContainer>
              </Tooltip>
              <Styled.HeaderButton onPress={() => listenChapter()}>
                {isPlaying ? (
                  <Styled.HeaderIcon iconStyle="solid" name="pause" />
                ) : (
                  <Styled.HeaderIcon iconStyle="solid" name="volume-up" />
                )}
              </Styled.HeaderButton>
              <Styled.HeaderButton onPress={() => setFontChangeVisible(true)}>
                <Styled.HeaderIcon iconStyle="solid" name="text-height" />
              </Styled.HeaderButton>
              <Styled.CloseButton
                onPress={() => {
                  bibleContext?.audioPlayer?.pause();

                  onDismiss();
                }}
              >
                <MaterialIcons
                  name="close"
                  size={28}
                  color={isDarkMode ? "#fff" : "#fff"}
                />
              </Styled.CloseButton>
            </Styled.HeaderGroup>
          </Styled.Header>
        </Styled.Container>
        {loading && (
          <Styled.LoadingArea>
            <Styled.Loading />
          </Styled.LoadingArea>
        )}
        <FlatList
          data={contentList}
          ref={refContent}
          ListEmptyComponent={() => <Styled.VerseText>.</Styled.VerseText>}
          numColumns={1}
          contentContainerStyle={{ paddingBottom: isPlayerOpened ? 250 : 180 }}
          style={{ padding: 10, paddingHorizontal: 20 }}
          keyExtractor={(item: IBibleVerse, index: number) =>
            `${bibleContext.currentBookChapter}_${item.verseNumber}`
          }
          renderItem={renderItem}
        />
        {selectedVerse && (
          <Styled.VerseOptionsContainer>
            <Styled.VerseOptionsHeader>
              <View style={{ flex: 1 }}>
                {/* <Text>Adicionar nota</Text> TO-DO */}
              </View>
              <TouchableOpacity
                onPress={() => {
                  setSelectedVerse(null);
                }}
              >
                <MaterialIcons name="close" size={28} color={"#fff"} />
              </TouchableOpacity>
            </Styled.VerseOptionsHeader>
            <Styled.VerseOptionsRow>
              {colors.map((color) => {
                const active = bookmarkedVerses.some(
                  (verse) =>
                    verse.bookSlug === bibleContext?.currentBookSlug &&
                    verse.chapterNumber === selectedVerse?.chapterNumber &&
                    verse.verseNumber === selectedVerse?.verseNumber &&
                    verse.color === color.name
                );
                return (
                  <Styled.VerseColorButton
                    key={color.name}
                    onPress={() => {
                      const index = bookmarkedVerses.findIndex(
                        (verse) =>
                          verse.bookSlug === bibleContext?.currentBookSlug &&
                          verse.chapterNumber ===
                            selectedVerse?.chapterNumber &&
                          verse.verseNumber === selectedVerse?.verseNumber
                      );

                      console.log(
                        "change color",
                        color.color,
                        bibleContext?.currentBookSlug,
                        selectedVerse,
                        index
                      );
                      if (index > -1) {
                        if (active) {
                          //remove color
                          bibleContext?.setBookmarks((prev: IBibleVerse[]) => {
                            return prev.filter((_, _index) => _index !== index);
                          });
                        } else {
                          //change color
                          bibleContext?.setBookmarks((prev: IBibleVerse[]) => {
                            return prev.map((verse, _index) => {
                              if (_index === index) {
                                return {
                                  ...verse,
                                  color: color.name,
                                };
                              }
                              return verse;
                            });
                          });
                        }
                      } else {
                        bibleContext?.setBookmarks([
                          ...bibleContext?.bookmarks,
                          {
                            bookSlug: bibleContext?.currentBookSlug,
                            chapterNumber: selectedVerse?.chapterNumber,
                            verseNumber: selectedVerse?.verseNumber,
                            language_translation_book:
                              selectedVerse?.language_translation_book,
                            color: color.name,
                          },
                        ]);
                      }
                      setSelectedVerse(null);
                    }}
                    color={color.color}
                    active={active}
                  />
                );
              })}
            </Styled.VerseOptionsRow>
          </Styled.VerseOptionsContainer>
        )}
        <Styled.NavigationButton
          isPlayerOpened={isPlayerOpened}
          side="left"
          onPress={async () => {
            bibleNavigate("prev");
          }}
        >
          <Styled.NavigationIcon iconStyle="solid" name="chevron-left" />
        </Styled.NavigationButton>
        <Styled.NavigationButton
          isPlayerOpened={isPlayerOpened}
          side="right"
          onPress={async () => {
            bibleNavigate("next");
          }}
        >
          <Styled.NavigationIcon iconStyle="solid" name="chevron-right" />
        </Styled.NavigationButton>
      </Styled.ThemedSafeAreaView>
    </Modal>
  );
}
