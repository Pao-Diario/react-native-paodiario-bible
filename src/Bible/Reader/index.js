import React, { useEffect, useState, useRef } from "react";

import { View } from "react-native";

import * as Styled from "./styles";
import CardSelectBible from "../CardSelectBible";
import Tooltip from "../../components/Tooltip";

// import { Actions as PodcastActions } from "../../../store/modules/podcasts";

import useBible from "../hooks/useBible";

import { loadBibleContent, getLinkBook } from "../functions";

// import * as Styled from './styles';

export default function Reader({ route }) {
  const refContent = useRef("RefContent");

  const bibleContext = useBible();

  const { book, title, reference } = route?.params;
  const fontSizeOffset = bibleContext.fontSizeOffset;
  const currentTrack = bibleContext.currentTrack;
  const isPlayerOpened = currentTrack ? true : false;

  const [currentBook, setCurrentBook] = useState(book);
  const [loading, setLoading] = useState(true);
  const [fontChangeVisible, setFontChangeVisible] = useState(false);
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    async function loadTextContent() {
      const data = await loadBibleContent({
        config: bibleContext,
        bookSlug: bibleContext.currentBookSlug,
        bookChapter: bibleContext.currentBookChapter,
        bookTitle: bibleContext.currentBookName,
      });
      setContentList(data);

      setLoading(false);
    }
    setLoading(true);
    loadTextContent();
  }, [bibleContext]);

  async function bibleNavigate(direction) {
    const config = bibleContext;
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
    setCurrentBook(nextBook);
    refContent.current.scrollToOffset({ offset: 0 });
  }

  function listenChapter() {
    // speechContent()

    const chapterTracks = [];
    for (const contentItem of contentList) {
      // console.log(contentItem.verseNumber, contentItem.verseText);
      chapterTracks.push({
        url: `https://general.app.paodiario.org.br/speech/stream/text/${encodeURI(
          contentItem.verseText
        )}`,
        title: `${bibleContext.currentBookName}: ${bibleContext.currentBookChapter}:${contentItem.verseNumber}`,
        artist: "Ministérios Pão diário",
        isLiveStream: true,
        image: "icon_bible_audio.png",
        artwork:
          "https://paodiario.org/wp-content/themes/paodiario/bible/assets/img/icon_bible_audio.png",
        // type: 'smoothstreaming',
      });
    }
    // console.log('chapterTracks', chapterTracks.length);
    // dispatch(PodcastActions.setCurrentTrack(chapterTracks));
    // await TrackPlayer.add(STREAMING_TRACK);
    // await TrackPlayer.play();
  }
  function renderItem({ item }) {
    const { verseNumber, verseText } = item;
    // console.log('verseNumber', verseNumber);
    // console.log(verseText);

    return (
      <Styled.VerseArea onPress={() => {}}>
        <Styled.VerseText fontSizeOffset={fontSizeOffset}>
          <Styled.VerseNumber fontSizeOffset={fontSizeOffset}>
            {`${verseNumber} `}
          </Styled.VerseNumber>
          {verseText}
        </Styled.VerseText>
      </Styled.VerseArea>
    );
  }

  function handleFontSizeOffset(diff = 1) {
    const offset = fontSizeOffset + diff;
    if (offset > 5 || offset < 0) {
      return;
    }

    bibleContext.updateContext({
      ...bibleContext,
      fontSizeOffset: offset,
    });
  }

  return (
    <View>
      <Tooltip
        visible={fontChangeVisible}
        position={{ right: 20, top: 100 }}
        closeTooltip={() => setFontChangeVisible(false)}
      >
        <Styled.FontScaleContainer>
          <Styled.FontDecreaseIcon onPress={() => handleFontSizeOffset(-1)} />
          <Styled.FontIncreaseIcon onPress={() => handleFontSizeOffset()} />
        </Styled.FontScaleContainer>
      </Tooltip>
      <Styled.Container>
        <Styled.Header>
          <CardSelectBible
            showReadButton={false}
            boookSelected={(book) => {
              setCurrentBook(book);
              refContent.current.scrollToOffset({ offset: 0 });
            }}
          />
          <Styled.HeaderGroup>
            <Styled.HeaderButton onPress={() => listenChapter()}>
              <Styled.HeaderIcon name="volume-up" />
            </Styled.HeaderButton>
            <Styled.HeaderButton onPress={() => setFontChangeVisible(true)}>
              <Styled.HeaderIcon name="text-height" />
            </Styled.HeaderButton>
          </Styled.HeaderGroup>
        </Styled.Header>
      </Styled.Container>
      {loading && (
        <Styled.LoadingArea>
          <Styled.Loading />
        </Styled.LoadingArea>
      )}

      <Styled.ContentList
        isPlayerOpened={isPlayerOpened}
        data={contentList}
        ref={refContent}
        ListEmptyComponent={() => <Styled.VerseText>.</Styled.VerseText>}
        numColumns={1}
        keyExtractor={(item) =>
          `${bibleContext.currentBookChapter}_${item.verseNumber}`
        }
        renderItem={({ item }) => renderItem({ item })}
      />
      <Styled.NavigationButton
        isPlayerOpened={isPlayerOpened}
        side="left"
        onPress={async () => {
          bibleNavigate("prev");
        }}
      >
        <Styled.NavigationIcon name="chevron-left" />
      </Styled.NavigationButton>
      <Styled.NavigationButton
        isPlayerOpened={isPlayerOpened}
        side="right"
        onPress={async () => {
          bibleNavigate("next");
        }}
      >
        <Styled.NavigationIcon name="chevron-right" />
      </Styled.NavigationButton>
    </View>
  );
}
