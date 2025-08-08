import React, { useEffect, useState } from "react";
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
  State,
  Event,
  Track,
} from "react-native-track-player";
import { BibleContext, BibleContextType } from "./useBible";
import * as Storage from "../../services/storage";

export const BibleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [currentVerse, setCurrentVerse] = useState<string | null>(null);
  const playbackState = usePlaybackState();
  const [queue, setQueue] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    async function loadStoredConfig() {
      const bibleConfig = await Storage.get("BibleConfig");
      if (bibleConfig) {
        updateContext(bibleConfig);
      }
    }
    loadStoredConfig();
    async function setup() {
      await TrackPlayer.setupPlayer();
      setIsPlayerReady(true);
    }
    setup();
    return () => {
      TrackPlayer.reset();
    };
  }, []);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    console.log("track", event.track);
    if (
      event.type === Event.PlaybackActiveTrackChanged &&
      event.track != null
    ) {
      setCurrentVerse(event.track?.id ?? null);
    }
  });

  const playChapter = async (chapterTracks: any[]) => {
    console.log("playChapter chapterTracks", chapterTracks);
    await TrackPlayer.reset();
    await TrackPlayer.add(chapterTracks);
    setQueue(chapterTracks);
    await TrackPlayer.play().then(() => {
      setIsPlaying(true);
    });
  };
  const pause = async () => {
    console.log("pause");
    TrackPlayer.pause();
    setIsPlaying(false);
  };
  const play = async () => {
    console.log("play");
    TrackPlayer.play();
    setIsPlaying(true);
  };
  const stop = async () => {
    console.log("stop");
    TrackPlayer.stop();
    setIsPlaying(false);
  };

  // Exemplo de outros métodos: next, previous, seekTo, etc.

  // Dummy context base (ajuste conforme o contexto real)
  const [devotionalApiBaseUrl, setDevotionalApiBaseUrl] = useState(
    "https://api.experience.odb.org"
  );
  const [fontSizeOffset, setFontSizeOffset] = useState(0);
  const [language, setLanguage] = useState("pt-br");
  const [currentBookName, setCurrentBookName] = useState("Gênesis");
  const [currentBookSlug, setCurrentBookSlug] = useState("gen");
  const [currentBookChapter, setCurrentBookChapter] = useState(1);
  const [currentVersion, setCurrentVersion] = useState("nvt");
  const [currentVersionTitle, setCurrentVersionTitle] = useState(
    "Nova Versão Transformadora"
  );
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [currentTrack, setCurrentTrack] = useState("");
  const [versionsOffline, setVersionsOffline] = useState<any[]>([]);

  function updateContext(config: any) {
    Storage.persist("BibleConfig", config);
    if (config.devotionalApiBaseUrl !== undefined)
      setDevotionalApiBaseUrl(config.devotionalApiBaseUrl);
    if (config.fontSizeOffset !== undefined)
      setFontSizeOffset(config.fontSizeOffset);
    if (config.language !== undefined) setLanguage(config.language);
    if (config.currentBookName !== undefined)
      setCurrentBookName(config.currentBookName);
    if (config.currentBookSlug !== undefined)
      setCurrentBookSlug(config.currentBookSlug);
    if (config.currentBookChapter !== undefined)
      setCurrentBookChapter(config.currentBookChapter);
    if (config.currentVersion !== undefined)
      setCurrentVersion(config.currentVersion);
    if (config.currentVersionTitle !== undefined)
      setCurrentVersionTitle(config.currentVersionTitle);
    if (config.currentTheme !== undefined) setCurrentTheme(config.currentTheme);
    if (config.currentTrack !== undefined) setCurrentTrack(config.currentTrack);
    if (config.versionsOffline !== undefined)
      setVersionsOffline(config.versionsOffline);
  }

  const contextValue = {
    devotionalApiBaseUrl,
    setDevotionalApiBaseUrl,
    fontSizeOffset,
    setFontSizeOffset,
    language,
    setLanguage,
    currentBookName,
    setCurrentBookName,
    currentBookSlug,
    setCurrentBookSlug,
    currentBookChapter,
    setCurrentBookChapter,
    currentVersion,
    setCurrentVersion,
    currentVersionTitle,
    setCurrentVersionTitle,
    currentTheme,
    setCurrentTheme,
    currentTrack,
    setCurrentTrack,
    versionsOffline,
    setVersionsOffline,
    updateContext,
    audioPlayer: {
      isPlayerReady,
      isPlaying,
      playbackState,
      currentVerse,
      playChapter,
      pause,
      play,
      stop,
      queue,
    },
  } as BibleContextType;

  return (
    <BibleContext.Provider value={contextValue}>
      {children}
    </BibleContext.Provider>
  );
};
