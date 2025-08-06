import { createContext, useContext } from "react";

export type BibleContextType = {
  devotionalApiBaseUrl: string;
  fontSizeOffset: number;
  language: string;
  currentBookName: string;
  currentBookSlug: string;
  currentBookChapter: number;
  currentVersion: string;
  currentVersionTitle: string;
  currentTheme: string;
  currentTrack: string;
  versionsOffline: any[];
  updateContext: (config: any) => void;
};

export const BibleContext = createContext<BibleContextType | null>(null);

export default function useBible() {
  return useContext(BibleContext);
}
