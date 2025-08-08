import { createContext, useContext } from "react";

export type BibleContextType = {
  devotionalApiBaseUrl: string;
  setDevotionalApiBaseUrl: (url: string) => void;
  fontSizeOffset: number;
  setFontSizeOffset: (n: number) => void;
  language: string;
  setLanguage: (lang: string) => void;
  currentBookName: string;
  setCurrentBookName: (name: string) => void;
  currentBookSlug: string;
  setCurrentBookSlug: (slug: string) => void;
  currentBookChapter: number;
  setCurrentBookChapter: (chapter: number) => void;
  currentVersion: string;
  setCurrentVersion: (version: string) => void;
  currentVersionTitle: string;
  setCurrentVersionTitle: (title: string) => void;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
  currentTrack: string;
  setCurrentTrack: (track: string) => void;
  versionsOffline: any[];
  setVersionsOffline: (versions: any[]) => void;
  updateContext: (config: any) => void;
  audioPlayer: {
    isPlayerReady: boolean;
    isPlaying: boolean;
    playbackState: any;
    currentVerse: string | null;
    playChapter: (tracks: any[]) => Promise<void>;
    pause: () => Promise<void>;
    play: () => Promise<void>;
    stop: () => Promise<void>;
    queue: any[];
  };
};

export const BibleContext = createContext<BibleContextType | null>(null);

export default function useBible() {
  return useContext(BibleContext);
}
