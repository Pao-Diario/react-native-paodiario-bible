import React, { useEffect, useState, useContext } from "react";

import * as BibleFunctions from "../functions";

import * as Styled from "./styles"; // agora em TS
import BookPicker from "../BookPicker";
import VersionPicker from "../VersionPicker";
import useBible from "../hooks/useBible";
// import { useNavigation } from "@react-navigation/native";

type CardSelectBibleProps = {
  title?: string;
  bordered?: boolean;
  showReadButton?: boolean;
  boookSelected?: (book: any) => void;
  [key: string]: any;
};

export default function CardSelectBible({
  title,
  bordered,
  showReadButton,
  boookSelected,
  ...props
}: CardSelectBibleProps) {
  // const navigation = useNavigation();
  const bibleContext = useBible();
  const [biblePickerModalVisible, setBiblePickerVisible] = useState(false);
  const [versionPickerModalVisible, setVersionPickerVisible] = useState(false);
  const [currentBook, setCurrentBook] = useState<any>();
  const [currentVersion, setCurrentVersion] = useState("nvt");

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
      if (typeof boookSelected === "function") {
        boookSelected(book);
      }
      if (book.chapter && book.slug && config.currentVersion) {
        console.log("BibleReader", {
          title: `${currentBook?.title} ${currentBook?.chapter || ""}`,
          book: currentBook,
          reference: `${currentBook?.title} ${currentBook?.chapter || ""}`,
        });
        //   navigation.navigate("Bíblia", {
        //     screen: "BibleReader",
        //     params: {
        //       title: `${currentBook?.title} ${currentBook?.chapter || ""}`,
        //       book: currentBook,
        //       reference: `${currentBook?.title} ${currentBook?.chapter || ""}`,
        //     },
        //   });
      }
    }
  }

  useEffect(() => {
    async function getData() {
      const config = bibleContext;
      if (config) {
        setCurrentVersion(config.currentVersion);
        setCurrentBook({
          slug: config.currentBookSlug,
          title: config.currentBookName,
          chapter: config.currentBookChapter,
        });
      }
    }
    getData();
  }, [bibleContext]);

  return (
    <Styled.Card bordered={bordered} {...props}>
      {title && <Styled.Title>{title}</Styled.Title>}
      <Styled.RowButtons>
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
        <Styled.ButtonSelect
          onPress={() => {
            setBiblePickerVisible(!biblePickerModalVisible);
          }}
        >
          <Styled.ButtonSelectText>Selecionar livro</Styled.ButtonSelectText>
        </Styled.ButtonSelect>
        {showReadButton && (
          <Styled.ButtonRead
            onPress={() => {
              setBiblePickerVisible(true);
            }}
          >
            <Styled.ButtonReadText>Ler</Styled.ButtonReadText>
          </Styled.ButtonRead>
        )}
      </Styled.RowButtons>
    </Styled.Card>
  );
}
