import styled from "styled-components/native";

// TypeScript interfaces for custom props
export interface DownloadedProps {
  downloaded: boolean;
}
export interface ActiveProps {
  active: boolean;
}

import Icon from "react-native-vector-icons/FontAwesome5";
import { Dimensions } from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export const VersionButton = styled.TouchableOpacity`
  height: 50px;

  justify-content: center;
  margin-left: 10px;
`;
export const ActivityIndicatorDownloadingArea = styled.View`
  border-color: ${({ theme }: { theme: any }) => theme.colors.primary};
  background-color: #fff;
  border-width: 1px;
  margin-right: 5px;
  border-radius: 50px;
  padding: 5px;
`;
export const ActivityIndicatorDownloading = styled.ActivityIndicator``;
export const VersionButtonContainer = styled.View<DownloadedProps>`
  flex-direction: row;
  border-color: ${({ theme }: { theme: any }) => theme.colors.primary};
  background-color: ${({
    theme,
    downloaded,
  }: {
    theme: any;
    downloaded: boolean;
  }) => (downloaded ? theme.colors.background : theme.colors.primary)};
  border-width: 1px;
  padding: 4px 8px;
  border-radius: 5px;
`;
export const VersionButtonIconContainer = styled.View<DownloadedProps>`
  border-color: ${({
    theme,
    downloaded,
  }: {
    theme: any;
    downloaded: boolean;
  }) => (downloaded ? theme.colors.primary : "#fff")};

  border-width: 1px;
  margin-right: 5px;
  border-radius: 2px;
  height: 12px;
  width: 9px;
  vertical-align: center;
  align-items: center;
  vertical-align: middle;
`;
export const VersionButtonIcon = styled(Icon)<DownloadedProps>`
  font-size: 6px;
  color: ${({ theme, downloaded }: { theme: any; downloaded: boolean }) =>
    downloaded ? theme.colors.primary : "#fff"};
  line-height: 10px;
  text-align: center;
`;
export const VersionButtonText = styled.Text<DownloadedProps>`
  color: ${({ theme, downloaded }: { theme: any; downloaded: boolean }) =>
    downloaded ? theme.colors.primary : "#fff"};
  font-size: 10px;
`;

export const OptionRow = styled.View<ActiveProps>`
  min-width: 100%;
  padding: 10px;
  justify-content: center;
  flex-direction: row;
  background-color: ${({ theme, active }: { theme: any; active: boolean }) =>
    active ? theme.colors.backgroundSelected : theme.colors.background};
  border-bottom-width: 1px;
  border-color: ${({ theme }: { theme: any }) => theme.colors.divider};
`;
export const OptionButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
export const OptionTitle = styled.Text`
  color: ${({ theme }: { theme: any }) => theme.colors.text};
  font-size: 16px;
  font-weight: bold;
`;
export const OptionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const OptionLabel = styled.Text`
  color: ${({ theme }: { theme: any }) => theme.colors.text};
  font-size: 12px;
  font-weight: normal;
  text-transform: capitalize;
`;

export const OptionValue = styled.Text`
  color: ${({ theme }: { theme: any }) => theme.colors.text};
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;
`;
export const OptionIcon = styled(Icon)`
  color: ${({ theme }: { theme: any }) => theme.colors.divider};
  width: 44px;

  text-align: center;
  font-size: 18px;
`;
