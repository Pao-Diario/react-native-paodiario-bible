import { Modal, StatusBar, TouchableOpacity } from "react-native";
import * as Styled from "./styles";
import { MaterialIcons } from "@react-native-vector-icons/material-icons";
import { FontAwesome5 } from "@react-native-vector-icons/fontawesome5";
import useBible from "../hooks/useBible";
import { useRef, useState, useEffect, useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { FlatList } from "react-native";

import { getLinkBook, loadBibleContent } from "../functions";
import CardSelectBible from "../CardSelectBible";
import Tooltip from "../../components/Tooltip";

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
  // Estados do player vindos do contexto
  const isPlaying = bibleContext.audioPlayer.isPlaying;
  const currentVerse = bibleContext.audioPlayer.currentVerse;
  const isDarkMode = bibleContext.currentTheme === "dark";

  useEffect(() => {
    async function loadTextContent() {
      const data = await loadBibleContent({
        config: bibleContext,
        bookSlug: bibleContext?.currentBookSlug,
        bookChapter: bibleContext?.currentBookChapter,
        bookTitle: bibleContext?.currentBookName,
      });
      console.log("data", data);
      setContentList(data as IBibleVerse[]);

      setLoading(false);
    }
    setLoading(true);
    loadTextContent();
  }, [bibleContext?.currentBookChapter]);

  async function bibleNavigate(direction: "next" | "prev") {
    if (!bibleContext) return;
    const config = bibleContext;
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
    refContent?.current?.scrollToOffset({ offset: 0 });
  }
  function renderItem({ item }: { item: IBibleVerse }) {
    const { verseNumber, verseText } = item;
    const verseId = `${bibleContext?.currentBookChapter}_${item.verseNumber}`;
    const isCurrent =
      bibleContext?.audioPlayer?.currentVerse &&
      bibleContext?.audioPlayer?.currentVerse === verseId;
    return (
      <Styled.VerseArea onPress={() => {}}>
        <Styled.VerseText
          fontSizeOffset={fontSizeOffset}
          style={
            isCurrent && bibleContext?.audioPlayer?.isPlaying
              ? {
                  backgroundColor:
                    theme?.colors?.contentArea?.background || "#e0f7fa",
                  marginHorizontal: -16,
                  paddingHorizontal: 16,
                }
              : {}
          }
        >
          <Styled.VerseNumber fontSizeOffset={fontSizeOffset}>
            {`${verseNumber} `}
          </Styled.VerseNumber>
          {verseText}
        </Styled.VerseText>
      </Styled.VerseArea>
    );
  }
  async function listenChapter() {
    console.log("listenChapter", isPlaying);
    if (bibleContext?.audioPlayer?.isPlaying) {
      console.log("listenChapter pause");
      await bibleContext.audioPlayer.pause();
      return;
    }
    console.log("listenChapter play");
    const chapterTracks = contentList.map((contentItem) => ({
      id: `${bibleContext?.currentBookChapter}_${contentItem.verseNumber}`,
      url: `https://general.app.paodiario.org.br/speech/stream/text/${encodeURI(
        contentItem.verseText
      )}`,
      title: `${bibleContext?.currentBookName}: ${bibleContext?.currentBookChapter}:${contentItem.verseNumber}`,
      artist: "Ministérios Pão diário",
      artwork:
        "https://paodiario.org/wp-content/themes/paodiario/bible/assets/img/icon_bible_audio.png",
      verseNumber: contentItem.verseNumber,
    }));
    console.log("listenChapter play chapterTracks", chapterTracks);
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
      onDismiss={onDismiss}
      {...props}
      animationType="slide"
      presentationStyle="fullScreen"
      key={991}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <Styled.ThemedSafeAreaView>
        <Styled.Container>
          <Styled.Header>
            <CardSelectBible
              style={{
                flex: 1,
              }}
              showReadButton={false}
              boookSelected={(book) => {
                refContent?.current?.scrollToOffset({ offset: 0 });
              }}
            />
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
                  color={isDarkMode ? "#fff" : "#000"}
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
