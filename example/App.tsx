/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import {
  CardBIY,
  BibleContextWrapper,
  CardSelectBible,
  HomeBible,
  VerseOfTheDay,
} from 'react-native-paodiario-bible';

function App() {
  const background = '#ffffff';
  const primary = '#000000';
  const meuTemaInicial = {
    name: 'custom',
    colors: {
      primary,
      background,
      activeTintColor: '#0f2136',
      backgroundTabBar: '#000000',
      progress: {
        borderColor: '#000000',
      },
      contentArea: {
        background: '#eeeeee',
      },
      lazyLoadImage: {
        background: '#1a1a1a',
      },
      chip: {
        background: {
          primary,
          secondary: primary,
        },
        text: {
          primary: '#fff',
          secondary: '#fff',
        },
      },
      icons: '#e5e5e5',
      zero: '#fff',
      text: '#000000',
      light: '#ccc',
      lightGray: '#606060',
      darkText: '#666666',
      dark: '#000000',
      link: '#1a0dab',
      divider: '#000000',
    },
    fonts: {
      body: 'Helvetica',
    },
  };

  // const meuTemaAtualizado = {
  //   primary: '#00FF00',
  //   secondary: '#FF0000',
  //   background: '#0000FF',
  //   text: '#FFFFFF',
  // };

  return (
    <BibleContextWrapper
      initialTheme="dark"
      customTheme={meuTemaInicial}
      currentTheme="custom"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: '#000',
              padding: 20,
              width: '100%',
              height: '100%',
            }}
          >
            <CardSelectBible
              title="Ler a Bíblia Título"
              bordered
              showReadButton
            />
            <CardBIY />
            <VerseOfTheDay />
            <HomeBible />
          </View>
        </ScrollView>
      </SafeAreaView>
    </BibleContextWrapper>
  );
}

export default App;
