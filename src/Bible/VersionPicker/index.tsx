import React, { useEffect, useState } from "react";
import { Modal, StatusBar } from "react-native";

import { MaterialIcons as Icon } from "@react-native-vector-icons/material-icons";

import * as Styled from "./styles";

import ListItem from "./ListItem";
import useBible from "../hooks/useBible";

import Hello from "../Hello";
import { getBibleVersions } from "../../services/bibleFunctions";
type VersionPickerProps = {
  visible: boolean;
  onDismiss: () => void;
  onBackButtonPress?: () => void;
  onSelect?: (version: any) => void;
  [key: string]: any;
};

export default function VersionPicker({
  visible,
  onDismiss,
  onBackButtonPress,
  onSelect,
  ...props
}: VersionPickerProps) {
  const [versions, setVersions] = useState<IBibleVersion[]>([]);
  const [filterText, setFilterText] = useState("");

  const bibleContext = useBible();
  if (!bibleContext) {
    return null;
  }
  const isDarkMode = true;

  useEffect(() => {
    function getData() {
      const versions = getBibleVersions();
      setVersions(versions);
    }
    getData();
  }, []);

  async function updateCurrentVersion(version: any) {
    const config = bibleContext;
    if (config) {
      config.updateContext({
        ...config,
        currentVersion: version.slug,
        currentVersionTitle: version.fullName,
      });
    }
  }

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      onRequestClose={onBackButtonPress}
      {...props}
      animationType="slide"
      presentationStyle="formSheet"
      key={991}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <Styled.ThemedSafeAreaView>
        <Styled.Header>
          <Styled.Title>Selecione a versão</Styled.Title>
          <Styled.CloseButton onPress={() => onDismiss()}>
            <Icon name="close" size={28} color={isDarkMode ? "#fff" : "#000"} />
          </Styled.CloseButton>
        </Styled.Header>
        <Styled.ThemedScrollView
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
        >
          <Styled.ScrollContainer>
            {versions.map((version, index) => (
              <ListItem
                key={`picker_version_${version.slug}`}
                version={version}
                onSelect={(version: any) => {
                  updateCurrentVersion(version);
                  onDismiss();
                }}
                active={version.slug === bibleContext?.currentVersion}
                offline={
                  (bibleContext?.versionsOffline ?? []).findIndex(
                    (versionOffline: { slug: string }) =>
                      version && version.slug === versionOffline.slug
                  ) > -1
                }
                selectedChapter={
                  version.slug === bibleContext?.currentBookChapter?.toString()
                }
              ></ListItem>
            ))}
          </Styled.ScrollContainer>
        </Styled.ThemedScrollView>
      </Styled.ThemedSafeAreaView>
    </Modal>
  );
}
