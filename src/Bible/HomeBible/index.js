import React, { useState, useEffect } from "react";

import { SafeAreaView, Linking, ActivityIndicator } from "react-native";
import { format } from "date-fns";
import CardBIY from "../CardBIY";
import CardSelectBible from "../CardSelectBible";

import VerseOfTheDay from "../VerseOfTheDay";
import * as Styled from "./styles";
import UseBible from "../hooks/useBible";

export default function HomeBible() {
  const { config } = UseBible();
  const [loading, setLoading] = useState(true);
  const [versesBIAY, setVersesBIAY] = useState([]);
  const [verseOfTheDay, setVerseOfTheDay] = useState("");

  useEffect(() => {
    async function getDataOfTheDay() {
      const today = new Date();
      const urlDevo = `${
        config.DEVOTIONAL_API_BASE_URL
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
            const arrVerses = data[0].bible_in_a_year
              .split("</a>")
              .reduce((agregator, item) => {
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
    <View title="Engajamento Bíblico" withFlatList={true} headerSimple>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
        <CardSelectBible bordered showReadButton title="Ler a Bíblia" />
        {loading && <ActivityIndicator />}
        {!loading && versesBIAY && <CardBIY verses={versesBIAY} />}
        {!loading && verseOfTheDay && <VerseOfTheDay verse={verseOfTheDay} />}
        <Styled.SubTitle>Você Sabia?</Styled.SubTitle>
        <Styled.Paragraph>
          As pessoas que, de forma significativa, envolvem-se com a Bíblia,
          quatro ou mais vezes por semana, experimentam um crescimento positivo
          mensurável, em áreas nas quais lutavam anteriormente, sentem que estão
          crescendo espiritualmente e mostram evidências crescentes do fruto do
          Espírito Santo.
        </Styled.Paragraph>
        <Styled.Paragraph>
          Engajamento Bíblico é Receber, Refletir e Responder à Palavra de Deus
          a fim de criar oportunidades para que o Espírito Santo desenvolva em
          nós o crescimento espiritual, a frutificação, a convicção, a liderança
          e o dom de abençoar vidas.
        </Styled.Paragraph>
        <Styled.Paragraph>
          Ministérios Pão Diário tem trabalhado para encorajar você a um
          profundo engajamento com a Bíblia. Por isso, temos disponibilizado uma
          ampla variedade de recursos que o auxiliam a se conectar com Deus,
          todos os dias, de todas as formas.
        </Styled.Paragraph>
        <Styled.Paragraph>
          Faça o download no botão abaixo de um formulário que te ajudará a
          Receber, Refletir e Responder à leitura da Bíblia de hoje.
        </Styled.Paragraph>
        <Styled.ButtonLink
          onPress={() => {
            Linking.openURL(
              "https://paodiario.org/wp-content/uploads/2023/05/reflexao_diaria.pdf"
            );
          }}
        >
          <Styled.ButtonLinkText>Download</Styled.ButtonLinkText>
        </Styled.ButtonLink>
      </SafeAreaView>
    </View>
  );
}
