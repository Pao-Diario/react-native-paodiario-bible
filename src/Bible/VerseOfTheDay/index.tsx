import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import Share from "react-native-share";

import { format } from "date-fns";

import * as Styled from "./styles";

import BibleVersesModal from "../BibleVersesModal";
import { trim } from "../../services/utils";
import RNFS, { DocumentDirectoryPath, downloadFile } from "react-native-fs";
import useBible from "../hooks/useBible";

type VerseOfTheDayProps = {
  [key: string]: any;
};

export default function VerseOfTheDay({ ...props }: VerseOfTheDayProps) {
  const bibleContext = useBible();
  const [bibleVersesModalVisible, setBibleVersesVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentVerses, setCurrentVerses] = useState("");
  const [verseOfTheDay, setVerseOfTheDay] = useState("");

  const date = new Date();
  const year = date.getFullYear();
  const month = format(date, "MM");
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const imageUrl = `https://d19heljkw0ui8c.cloudfront.net/files/${year}/${month}/verse_paodiario${year}${month}${day}.png`;

  useEffect(() => {
    async function getDataOfTheDay() {
      const today = new Date();
      const urlDevo = `${
        bibleContext?.devotionalApiBaseUrl
      }/devotionals/v2?site_id=4&status=publish&country=BR&on=${format(
        today,
        "MM-dd-yyyy"
      )}`;

      fetch(urlDevo)
        .then((res) => res.json())
        .then((data) => {
          if (data[0]) {
            const arrTodayReference = data[0].passage_reference;
            setVerseOfTheDay(arrTodayReference);
          }
          setLoading(false);
        });
    }
    getDataOfTheDay();
  }, []);

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
      try {
        await downloadFile(options).promise;
        let shareImage = {
          title: "Pão Diário - Versículo do dia",
          url: `file://${path}`,
          type: "image/png",
        };
        await Share.open(shareImage);
        await RNFS.unlink(path);
      } catch (err) {
        if (err) console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Styled.Card {...props}>
      <Styled.Row>
        <Styled.Title>Versículo do dia</Styled.Title>
      </Styled.Row>
      <Styled.Verse>{verseOfTheDay}</Styled.Verse>
      <Styled.TextContainer>
        <Styled.VerseImage
          source={{
            uri: imageUrl,
          }}
        />
      </Styled.TextContainer>
      <Styled.RowButtons>
        <Styled.ButtonRead
          onPress={() => {
            setCurrentVerses(trim(verseOfTheDay));
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
