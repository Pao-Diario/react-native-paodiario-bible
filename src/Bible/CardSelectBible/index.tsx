import React, { useEffect, useState, useContext } from "react";

import * as Styled from "./styles"; // agora em TS
import BookPicker from "../BookPicker";
import VersionPicker from "../VersionPicker";
import useBible from "../hooks/useBible";
import ReaderModal from "../ReaderModal";
// import { useNavigation } from "@react-navigation/native";

type CardSelectBibleProps = {
  title?: string;
  bordered?: boolean;
  showReadButton?: boolean;
  boookSelected?: (book: any) => void;
  openReader?: (params: {
    title: string;
    book: any;
    reference: string;
  }) => void;
  [key: string]: any;
};

export default function CardSelectBible({
  title,
  bordered,
  showReadButton,
  boookSelected,
  openReader,
  ...props
}: CardSelectBibleProps) {
  // const navigation = useNavigation();
  const bibleContext = useBible();
  const [biblePickerModalVisible, setBiblePickerVisible] = useState(false);
  const [versionPickerModalVisible, setVersionPickerVisible] = useState(false);
  const [currentBook, setCurrentBook] = useState<any>();
  const [currentVersion, setCurrentVersion] = useState("nvt");
  const [readerModalVisible, setReaderModalVisible] = useState(false);

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
      if (book.chapter && book.slug && config?.currentVersion) {
        handleRead(book);
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
  function handleRead(book: any) {
    if (typeof openReader === "function") {
      openReader({
        title: `${book?.title} ${book?.chapter || ""}`,
        book: book,
        reference: `${book?.title} ${book?.chapter || ""}`,
      });
    } else {
      setReaderModalVisible(true);
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
              console.log("book CardSelectBible", book);
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
          <Styled.ButtonSelectText>{`${
            currentBook?.title || "Selecionar livro"
          } ${currentBook?.chapter || ""}`}</Styled.ButtonSelectText>
          <Styled.ButtonVersionContainer
            onPress={() => {
              setVersionPickerVisible(!versionPickerModalVisible);
            }}
          >
            <Styled.ButtonVersionText>
              {currentVersion}
            </Styled.ButtonVersionText>

            {/* <Icon name="chevron-down" size={12} color={theme.colors.text} /> */}
          </Styled.ButtonVersionContainer>
        </Styled.ButtonSelect>
        {showReadButton && (
          <Styled.ButtonRead
            onPress={() => {
              handleRead(currentBook);
            }}
          >
            <Styled.ButtonReadText>Ler</Styled.ButtonReadText>
          </Styled.ButtonRead>
        )}
      </Styled.RowButtons>
      {readerModalVisible && (
        <ReaderModal
          visible={readerModalVisible}
          onDismiss={() => {
            setReaderModalVisible(false);
          }}
        />
      )}
    </Styled.Card>
  );
}
