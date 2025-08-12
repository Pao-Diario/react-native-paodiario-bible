# react-native-paodiario-bible

Componente bíblia reutilizável para React Native

## Customização de Tema

Agora é possível alterar o tema da bíblia diretamente pelo app consumidor, incluindo a possibilidade de passar um tema customizado.

### Como usar tema customizado

Basta passar as props `initialTheme` e `customTheme` para o `BibleContextWrapper`:

```tsx
import BibleContextWrapper from 'react-native-paodiario-bible/dist/Bible/Context';

const meuTema = {
  name: 'custom',
  colors: {
    primary: '#123456',
    background: '#f0f0f0',
    // ...demais propriedades de tema
  }
};

<BibleContextWrapper initialTheme="custom" customTheme={meuTema}>
  {/* Seu app aqui */}
</BibleContextWrapper>
```

### Como usar tema padrão (light/dark)

```tsx
<BibleContextWrapper initialTheme="dark">
  {/* Seu app aqui */}
</BibleContextWrapper>
```

- O tema pode ser alterado dinamicamente via contexto (`setCurrentTheme`).
- O objeto customTheme estará disponível no contexto caso precise acessar.

### Como trocar o tema dinamicamente via contexto

Você pode trocar o tema (inclusive customizado) a qualquer momento no seu app, usando o hook `useBible`:

```tsx
import useBible from 'react-native-paodiario-bible/dist/Bible/hooks/useBible';

const MeuComponente = () => {
  const { setCurrentTheme, setCustomTheme } = useBible();

  // Para trocar para dark
  setCurrentTheme && setCurrentTheme('dark');

  // Para trocar para custom
  setCurrentTheme && setCurrentTheme('custom');
  setCustomTheme && setCustomTheme({
    name: 'custom',
    colors: {
      primary: '#abcdef',
      background: '#222222',
      // ...outras propriedades
    }
  });
};
```

- `setCurrentTheme('light' | 'dark' | 'custom')` altera o tema instantaneamente.
- `setCustomTheme(obj)` define um novo tema customizado em tempo real.

npm i react-native-share
npm i date-fns

to make vector icons work on ios:
npx rnvi-update-plist package.json ios/example/Info.plist

npm i react-native-fs

npm i react-native-track-player
