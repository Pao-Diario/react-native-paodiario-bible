import React, { useState } from "react";

import { format } from "date-fns";

import * as Styled from "./styles";
import BibleVersesModal from "../BibleVersesModal";
import { trim } from "../../services/utils";

export default function CardBIY({ verses, ...props }) {
  const [bibleVersesModalVisible, setBibleVersesVisible] = useState(false);

  const [currentVerses, setCurrentVerses] = useState("");
  const today = new Date();

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
        {verses.map((verse) => {
          return (
            <Styled.ButtonRead
              key={trim(verse)}
              onPress={() => {
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
