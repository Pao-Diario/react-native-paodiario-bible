/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import {
  BibleContextWrapper,
  CardBIY,
  CardSelectBible,
  HomeBible,
  VerseOfTheDay,
} from 'react-native-paodiario-bible';

function App() {
  return (
    <BibleContextWrapper>
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
