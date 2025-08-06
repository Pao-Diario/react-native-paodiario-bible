import React, { useEffect, useState } from "react";
import { Modal, StatusBar } from "react-native";

import { MaterialIcons as Icon } from "@react-native-vector-icons/material-icons";

import * as Styled from "./styles";
import * as BibleFunctions from "../functions";
import ListItem from "./ListItem";
import { replaceSpecialChars } from "../../services/utils";

import useBible from "../hooks/useBible";
export default function BookPicker({
  visible,
  verses,
  onDismiss,
  onBackButtonPress,
  onSelect,
  currentBook,
  ...props
}) {
  const [books, setBooks] = useState([]);
  const [filterText, setFilterText] = useState("");
  const bibleContext = useBible();

  const isDarkMode = true;

  useEffect(() => {
    async function getData() {
      setBooks(await BibleFunctions.getBibleBooks());
    }
    getData();
  }, []);

  useEffect(() => {}, [filterText]);

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      onRequestClose={onBackButtonPress}
      {...props}
      onBackButtonPress={onBackButtonPress}
      animationType="slide"
      presentationStyle="formSheet"
      key={991}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <Styled.ThemedSafeAreaView>
        <Styled.Header>
          <Styled.VersionButton
            onPress={() => onDismiss({ openVersion: true })}
          >
            <Styled.VersionButtonLabel>Versão:</Styled.VersionButtonLabel>
            <Styled.VersionButtonContainer>
              <Styled.VersionButtonValue>
                {bibleContext.currentVersion}
              </Styled.VersionButtonValue>
            </Styled.VersionButtonContainer>
          </Styled.VersionButton>
          <Styled.Title>Selecione o livro</Styled.Title>
          <Styled.CloseButton onPress={() => onDismiss({ openVersion: false })}>
            <Icon name="close" size={28} color={isDarkMode ? "#fff" : "#000"} />
          </Styled.CloseButton>
        </Styled.Header>
        <Styled.ThemedScrollView
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
        >
          <Styled.ScrollContainer>
            <Styled.SearchRow>
              <Styled.SearchField>
                <Styled.SearchInput
                  placeholder="Pesquisar"
                  value={filterText}
                  onChangeText={setFilterText}
                />
                <Styled.SearchIcon name="search" />
              </Styled.SearchField>
            </Styled.SearchRow>
            {books
              .filter((book) => {
                // console.log(book.title, filterText);
                if (!filterText) return true;
                let strFilter = replaceSpecialChars(filterText.toUpperCase());
                let strTitle = replaceSpecialChars(book.title.toUpperCase());

                const searchRegex = new RegExp(`(${strFilter})`, "gi");

                if (strTitle.search(searchRegex) > -1) return true;

                return false;
              })
              .map((book, index) => (
                <ListItem
                  book={book}
                  onSelect={(book) => {
                    if (book.chapter) {
                      onSelect(book);
                      onDismiss({ openVersion: false });
                    }
                  }}
                  selected={currentBook?.slug === book.slug}
                  selectedChapter={currentBook?.chapter}
                  key={`picker_${book.title}`}
                />
              ))}
          </Styled.ScrollContainer>
        </Styled.ThemedScrollView>
      </Styled.ThemedSafeAreaView>
    </Modal>
  );
}
