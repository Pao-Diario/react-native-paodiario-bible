import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Modal,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import api from "../../services/api";

import { MaterialIcons as Icon } from "@react-native-vector-icons/material-icons";

import * as Styled from "./styles";
import useBible from "../hooks/useBible";

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
  // const theme = useSelector(store => store.config.theme);
  async function handleDone() {
    // console.log('handleDone');
    // onDismiss(postData, true);
    onDismiss();
  }
  async function getBibleText(title: string) {
    if (!title || title.trim() === "") return [];
    const response = await api.get(`bible/search/ref/${title}`);

    if (response.data) {
      return response.data.content;
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
      const arrContents: any[] = [];

      contents.forEach((item, index) => {
        if (
          item &&
          item[0] &&
          item[0].indexOf("undefined") > -1 &&
          listVerses[index] &&
          listVerses[index].title
        ) {
          item[0] = listVerses[index].title;
        }
        item?.forEach((insideItem: any) => {
          arrContents.push(insideItem);
        });
      });

      setListVersesContent(arrContents);
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
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <Styled.ThemedSafeAreaView>
        <Styled.Container>
          <Styled.CloseButton onPress={() => onDismiss()}>
            <Icon name="close" size={28} color={isDarkMode ? "#fff" : "#000"} />
          </Styled.CloseButton>
        </Styled.Container>
        <Styled.ThemedScrollView
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
        >
          <Styled.ScrollContainer>
            <Styled.Title>Leitura</Styled.Title>
            {loading && (
              <ActivityIndicator color={isDarkMode ? "#fff" : "#000"} />
            )}
            {!loading &&
              listVersesContent.length === 0 &&
              listVerses.map((item, index) => {
                return (
                  <Styled.Row key={item?.title}>
                    <Styled.SubTitle>{item?.title}</Styled.SubTitle>
                    <Styled.Verse>{item?.content}</Styled.Verse>
                  </Styled.Row>
                );
              })}
            {!loading &&
              listVersesContent.length > 0 &&
              listVersesContent.map((item, index) => {
                if (index % 2) {
                  return (
                    <Styled.Verse
                      key={`verse_${item}`}
                      fontSizeOffset={fontSizeOffset}
                    >
                      {item}
                      <Styled.Line />
                    </Styled.Verse>
                  );
                }
                return (
                  <Styled.SubTitle
                    key={`subtitle_${item}`}
                    fontSizeOffset={fontSizeOffset}
                  >
                    {item}
                  </Styled.SubTitle>
                );
              })}
          </Styled.ScrollContainer>
        </Styled.ThemedScrollView>
      </Styled.ThemedSafeAreaView>
    </Modal>
  );
}
