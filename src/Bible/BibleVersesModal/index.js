import React, { useState, useEffect } from "react";
import { Modal, StatusBar, TouchableOpacity } from "react-native";

import api from "../../services/api";

import Icon from "react-native-vector-icons/MaterialIcons";

import * as Styled from "./styles";
import useBible from "../hooks/useBible";

export default function BibleVersesModal({ visible, verses, onDismiss }) {
  const { fontSizeOffset } = useBible();

  const [listVerses, setListVerses] = useState([]);
  const [listVersesContent, setListVersesContent] = useState([]);
  const isDarkMode = true;
  // const theme = useSelector(store => store.config.theme);
  async function handleDone() {
    // console.log('handleDone');
    // onDismiss(postData, true);
    onDismiss();
  }
  async function getBibleText(title) {
    const response = await api.get(`bible/search/ref/${title}`);
    // console.log(response.data);
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
    async function getAllListVersesContent() {
      const contents = await Promise.all(
        listVerses.map(async (item) => {
          const content = await getBibleText(item.title);

          return content;
        })
      );
      const arrContents = [];

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
        item?.forEach((insideItem) => {
          arrContents.push(insideItem);
        });
      });

      setListVersesContent(arrContents);
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
          <TouchableOpacity onPress={() => onDismiss()}>
            <Icon name="close" size={28} color={isDarkMode ? "#fff" : "#000"} />
          </TouchableOpacity>
        </Styled.Container>
        <Styled.ThemedScrollView
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
        >
          <Styled.ScrollContainer>
            <Styled.Title>Leitura</Styled.Title>

            {listVersesContent.length === 0 &&
              listVerses.map((item, index) => {
                return (
                  <Styled.Row key={item?.title}>
                    <Styled.SubTitle>{item?.title}</Styled.SubTitle>
                    <Styled.Verse>{item?.content}</Styled.Verse>
                  </Styled.Row>
                );
              })}
            {listVersesContent.length > 0 &&
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
        <Styled.FormRowContainer>
          <Styled.FormButton onPress={() => handleDone()}>
            <Styled.FormLabel>Marcar como lido</Styled.FormLabel>
          </Styled.FormButton>
        </Styled.FormRowContainer>
      </Styled.ThemedSafeAreaView>
    </Modal>
  );
}
