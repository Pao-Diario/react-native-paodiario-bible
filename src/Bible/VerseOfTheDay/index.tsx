import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import Share from "react-native-share";

import { format } from "date-fns";

import * as Styled from "./styles";

import BibleVersesModal from "../BibleVersesModal";
import { trim } from "../../services/utils";
import RNFS, { DocumentDirectoryPath } from "react-native-fs";

type VerseOfTheDayProps = {
  verse: string;
  [key: string]: any;
};

export default function VerseOfTheDay({ verse, ...props }: VerseOfTheDayProps) {
  const today = new Date();

  const [bibleVersesModalVisible, setBibleVersesVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentVerses, setCurrentVerses] = useState("");

  const date = new Date();
  const year = date.getFullYear();
  const month = format(date, "MM");
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const [imageUrl] = useState(
    `https://d19heljkw0ui8c.cloudfront.net/files/${year}/${month}/verse_paodiario${year}${month}${day}.png`
  );

  async function handleShare() {
    if (!loading) {
      setLoading(true);
      const path = `${DocumentDirectoryPath}/verso_do_dia_${year}${month}${day}.png`;
      const options = {
        fromUrl: imageUrl,
        toFile: path,
        cacheable: true,
        begin: (res: any) => {},
        progress: (data: any) => {},
        background: true,
        progressDivider: 1,
      };
      await RNFS.downloadFile(options).promise;
      const base64Data = await RNFS.readFile(path, "base64");
      var imageUrlBase64 = "data:image/png;base64," + base64Data;
      let shareImage = {
        title: "Pão Diário - Versículo do dia",
        url: imageUrlBase64,
      };
      setLoading(false);
      Share.open(shareImage)
        .then((res: any) => {
          RNFS.unlink(path);
          setLoading(false);
        })
        .catch((err: any) => {
          err && console.log(err);
        });
    }
  }

  return (
    <Styled.Card {...props}>
      <Styled.Row>
        <Styled.Title>Versículo do dia</Styled.Title>
      </Styled.Row>
      <Styled.Verse>{verse}</Styled.Verse>
      <Styled.TextContainer>
        <Styled.VerseImage source={{ uri: imageUrl }} />
      </Styled.TextContainer>
      <Styled.RowButtons>
        <Styled.ButtonRead
          onPress={() => {
            setCurrentVerses(trim(verse));
            setBibleVersesVisible(!bibleVersesModalVisible);
          }}
        >
          <Styled.ButtonReadText>Ler texto completo</Styled.ButtonReadText>
        </Styled.ButtonRead>
        <Styled.ButtonRead onPress={handleShare}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Styled.ButtonReadText>Compartilhar</Styled.ButtonReadText>
          )}
        </Styled.ButtonRead>
      </Styled.RowButtons>
      <BibleVersesModal
        key={883}
        visible={bibleVersesModalVisible}
        verses={currentVerses}
        onDismiss={() => {
          setBibleVersesVisible(false);
        }}
      />
    </Styled.Card>
  );
}
