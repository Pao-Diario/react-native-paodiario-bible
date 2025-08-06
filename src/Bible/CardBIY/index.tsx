import React, { useEffect, useState } from "react";

import { format } from "date-fns";

import * as Styled from "./styles";
import BibleVersesModal from "../BibleVersesModal";
import { trim } from "../../services/utils";
import useBible from "../hooks/useBible";

type CardBIYProps = {
  [key: string]: any;
};

export default function CardBIY({ ...props }: CardBIYProps) {
  const bibleContext = useBible();
  const [bibleVersesModalVisible, setBibleVersesVisible] = useState(false);
  const [currentVerses, setCurrentVerses] = useState("");
  const today = new Date();
  const [versesBIAY, setVersesBIAY] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
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
            const arrVerses = data[0].bible_in_a_year
              .split("</a>")
              .reduce((agregator: string[], item: string) => {
                if (item.split(">")[1]) {
                  agregator.push(item.split(">")[1]);
                }
                return agregator;
              }, []);

            setVersesBIAY(arrVerses);
          }
          setLoading(false);
        });
    }
    getDataOfTheDay();
  }, []);
  return (
    <Styled.Card {...props}>
      <Styled.Row>
        <Styled.Title>Bíblia em um ano</Styled.Title>
        <Styled.DateLabel>{format(today, "dd/MM/yyyy")}</Styled.DateLabel>
      </Styled.Row>
      {/* <Styled.Text>
        Use os botões abaixo para ler os textos de hoje do nosso programa de
        leitura da Bíblia em um ano.
      </Styled.Text> */}
      <Styled.RowButtons>
        {versesBIAY.map((verse) => {
          return (
            <Styled.ButtonRead
              key={trim(verse)}
              onPress={() => {
                console.log("verse", trim(verse));
                setCurrentVerses(trim(verse));
                setBibleVersesVisible(!bibleVersesModalVisible);
              }}
            >
              <Styled.ButtonReadText>{trim(verse)}</Styled.ButtonReadText>
            </Styled.ButtonRead>
          );
        })}
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
