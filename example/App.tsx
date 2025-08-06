/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, View } from 'react-native';
import {
  BibleContextWrapper,
  CardSelectBible,
} from 'react-native-paodiario-bible';

function App() {
  return (
    <BibleContextWrapper>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'red',
            padding: 20,
            width: '100%',
            height: '100%',
          }}
        >
          <CardSelectBible
            style={{
              borderWidth: 1,
              maxHeight: 100,
              paddingHorizontal: 20,
            }}
            title="Ler a Bíblia Título"
            bordered
            showReadButton
          />
        </View>
      </SafeAreaView>
    </BibleContextWrapper>
  );
}

export default App;
