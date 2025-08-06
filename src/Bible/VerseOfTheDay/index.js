import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import Share from "react-native-share";

import { format } from "date-fns";

import * as Styled from "./styles";

import BibleVersesModal from "../BibleVersesModal";
import { trim } from "../../services/utils";
import RNFS, { DocumentDirectoryPath } from "react-native-fs";

export default function VerseOfTheDay({ verse, ...props }) {
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
    // const { rawDate } = devotional;

    // const month = format(rawDate, 'MM');
    // const day = format(rawDate, 'dd');
    if (!loading) {
      setLoading(true);

      const path = `${DocumentDirectoryPath}/verso_do_dia_${year}${month}${day}.png`;

      const options = {
        fromUrl: imageUrl,
        toFile: path,
        cacheable: true,
        begin: (res) => {
          // console.log(res);
        },
        progress: (data) => {
          // console.log(data);
        },
        background: true,
        progressDivider: 1,
      };
      await RNFS.downloadFile(options).promise;
      // console.log('[PD] request', request);
      const base64Data = await RNFS.readFile(path, "base64");

      var imageUrlBase64 = "data:image/png;base64," + base64Data;

      let shareImage = {
        title: "Pão Diário - Versículo do dia",
        // message: `${trim(devotional?.verse)} - ${trim(devotional?.scripture)}`,

        url: imageUrlBase64,
        // urls: [imageUrl, imageUrl], // eg.'http://img.gemejo.com/product/8c/099/cf53b3a6008136ef0882197d5f5.jpg',
      };

      setLoading(false);
      Share.open(shareImage)
        .then((res) => {
          // console.log(res);
          RNFS.unlink(path);
          setLoading(false);
        })
        .catch((err) => {
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
        {/* <Styled.Text>{imageUrl}</Styled.Text> */}
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
        <Styled.ButtonRead
          onPress={() => {
            // devotional/get-image/date/28-07-2023

            handleShare();
          }}
        >
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
        onBackButtonPress={() => {
          setBibleVersesVisible(false);
        }}
        onDismiss={() => {
          setBibleVersesVisible(false);
        }}
      />
    </Styled.Card>
  );
}
