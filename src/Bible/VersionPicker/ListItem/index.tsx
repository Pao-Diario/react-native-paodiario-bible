import React, { useState } from "react";
import { View, Text } from "react-native";
import * as Styled from "./styles";
import type { ActiveProps, DownloadedProps } from "./styles";
import { downloadVersion, removeVersion } from "../../functions";
import useBible from "../../hooks/useBible";

type BibleVersion = {
  slug: string;
  title: string;
  fullName: string;
  language: string;
};

interface ListItemProps {
  version: BibleVersion;
  active?: boolean;
  offline?: boolean;
  onSelect: (version: any) => void;
  selectedChapter?: boolean;
  [key: string]: any;
}

export default function ListItem({
  version,
  active = false,
  offline = false,
  onSelect,
  selectedChapter = false,
  ...props
}: ListItemProps): React.ReactElement {
  const bibleContext = useBible();

  const [downloaded, setDownloaded] = useState<boolean>(
    (bibleContext?.versionsOffline ?? []).findIndex(
      (versionOffline: { slug: string }) => version.slug === versionOffline.slug
    ) > -1
  );
  const [downloading, setDownloading] = useState<boolean>(false);
  const iconName = downloaded ? "check" : "chevron-down";
  async function downloadStart() {
    if (!downloading) {
      setDownloading(true);
      if (downloaded) {
        bibleContext?.updateContext({
          ...bibleContext,
          versionsOffline: await removeVersion({
            config: bibleContext,
            version,
          }),
        });
      }
      const retDownload = await downloadVersion({
        config: bibleContext,
        version,
      });

      if (retDownload) {
        if (retDownload.length > 0) {
          bibleContext?.updateContext({
            ...bibleContext,
            versionsOffline: retDownload,
          });
        }
        setDownloaded(true);
      }
      setDownloading(false);
    }
  }
  const optionRowProps: ActiveProps = { active };

  return (
    <Styled.OptionRow
      key={`picker_version_${version.slug}`}
      {...optionRowProps}
    >
      <Styled.OptionButton
        onPress={() => {
          onSelect(version);
        }}
      >
        <Styled.OptionContainer>
          <Styled.OptionValue>
            {version.title}
            <Styled.OptionLabel>{`\r\n${version.fullName}`}</Styled.OptionLabel>
          </Styled.OptionValue>
          <Styled.VersionButton
            onPress={() => {
              downloadStart();
            }}
          >
            {downloading ? (
              <Styled.ActivityIndicatorDownloadingArea>
                <Styled.ActivityIndicatorDownloading />
              </Styled.ActivityIndicatorDownloadingArea>
            ) : (
              <Styled.VersionButtonContainer downloaded={downloaded}>
                <Styled.VersionButtonIconContainer downloaded={downloaded}>
                  <Styled.VersionButtonIcon
                    downloaded={downloaded}
                    name={iconName}
                  />
                </Styled.VersionButtonIconContainer>
                <Styled.VersionButtonText downloaded={downloaded}>
                  {`${downloaded ? "baixado" : "baixar"}`}
                </Styled.VersionButtonText>
              </Styled.VersionButtonContainer>
            )}
          </Styled.VersionButton>
        </Styled.OptionContainer>
      </Styled.OptionButton>
    </Styled.OptionRow>
  );
}
