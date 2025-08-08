import React from "react";
import { ThemeProvider } from "styled-components/native";
import { BibleProvider } from "../hooks/BibleProvider";
import lightTheme from "../../themes";
import darkTheme from "../../themes/dark";
import useBible from "../hooks/useBible";

const BibleContextWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Tenta pegar o tema do contexto BibleProvider
  let theme = lightTheme;
  try {
    const bibleContext = useBible();
    if (bibleContext && bibleContext.currentTheme === "dark") {
      theme = darkTheme;
    }
  } catch {
    // useBible pode falhar se usado fora do provider, então fallback
  }
  return (
    <BibleProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </BibleProvider>
  );
};

export default BibleContextWrapper;

// const [devotionalApiBaseUrl, setDevotionalApiBaseUrl] = useState(
//   "https://api.experience.odb.org"
// );
// const [fontSizeOffset, setFontSizeOffset] = useState(0);
// const [language, setlanguage] = useState("pt-br");
// const [currentBookName, setCurrentBookName] = useState("Gênesis");
// const [currentBookSlug, setCurrentBookSlug] = useState("gen");
// const [currentBookChapter, setCurrentBookChapter] = useState(1);
// const [currentVersion, setCurrentVersion] = useState("nvt");
// const [currentTheme, setCurrentTheme] = useState("dark");
// const [currentTrack, setCurrentTrack] = useState("");
// const [versionsOffline, setVersionsOffline] = useState<any[]>([]);
// const [currentVersionTitle, setCurrentVersionTitle] = useState(
//   "Nova Versão Transformadora"
// );

// function updateContext(config: any) {
//   Storage.persist("BibleConfig", config);
//   setDevotionalApiBaseUrl(
//     config.devotionalApiBaseUrl ?? "https://api.experience.odb.org"
//   );
//   setFontSizeOffset(config.fontSizeOffset ?? 0);
//   setlanguage(config.language);
//   setCurrentBookName(config.currentBookName);
//   setCurrentBookSlug(config.currentBookSlug);
//   setCurrentBookChapter(config.currentBookChapter);
//   setCurrentVersion(config.currentVersion);
//   setCurrentTheme(config.currentTheme);
//   setCurrentTrack(config.currentTrack);
//   setCurrentVersionTitle(config.currentVersionTitle);
//   setVersionsOffline(config.versionsOffline);
// }

// useEffect(() => {
//   async function loadStoredConfig() {
//     const bibleConfig = await Storage.get("BibleConfig");
//     if (bibleConfig) {
//       updateContext(bibleConfig);
//     }
//   }
//   loadStoredConfig();
// }, []);

//   const contextValue: BibleContextType = useMemo(
//     () => ({
//       devotionalApiBaseUrl,
//       fontSizeOffset,
//       language,
//       currentTrack,
//       currentBookName,
//       currentBookSlug,
//       currentBookChapter,
//       currentVersion,
//       currentTheme,
//       currentVersionTitle,
//       versionsOffline,
//       updateContext,
//       audioPlayer: {
//         isPlayerReady: false,
//         isPlaying: false,
//         playbackState: undefined,
//         currentVerse: null,
//         playChapter: async () => {},
//         pause: async () => {},
//         play: async () => {},
//         stop: async () => {},
//         queue: [],
//       },
//     }),
//     [
//       devotionalApiBaseUrl,
//       fontSizeOffset,
//       language,
//       currentTrack,
//       currentBookName,
//       currentBookSlug,
//       currentBookChapter,
//       currentVersion,
//       currentTheme,
//       currentVersionTitle,
//       versionsOffline,
//     ]
//   );

//   return (
//     <BibleContext.Provider value={contextValue}>
//       <ThemeProvider theme={currentTheme === "dark" ? darkTheme : defaultTheme}>
//         {children}
//       </ThemeProvider>
//     </BibleContext.Provider>
//   );
// }
