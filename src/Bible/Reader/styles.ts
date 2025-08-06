import styled from "styled-components/native";
import { Dimensions } from "react-native";
import ButtonIcon from "../../components/ButtonIcon";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
import color from "color";

import { FontAwesome5 as Icon } from "@react-native-vector-icons/fontawesome5";

interface FontSizeOffsetProps {
  fontSizeOffset: number;
}
interface PlayerOpenedProps {
  isPlayerOpened: boolean;
}
export const Container = styled.View`
  margin-top: 0px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;

  padding: 0 10px 10px 10px;
  border-color: ${({ theme }: { theme: any }) => theme.colors.divider};
  border-bottom-width: 1px;
`;

export const ContentList = styled.FlatList.attrs((props: any) => ({
  contentContainerStyle: { paddingBottom: props.isPlayerOpened ? 250 : 180 },
}))`
  padding: 10px 20px;
`;
export const HeaderGroup = styled.View`
  flex-direction: row;
  margin-left: 10px;
`;
export const HeaderButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;

  width: 50px;
  justify-content: center;
`;

export const HeaderIcon = styled(Icon)`
  font-size: 20px;
  color: ${({ theme }: { theme: any }) => theme.colors.text};
`;

export const VerseArea = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })`
  padding-bottom: 16px;
`;
export const VerseNumber = styled.Text<FontSizeOffsetProps>`
  font-weight: bold;
  color: ${({ theme }: { theme: any }) => theme.colors.text};
`;
export const VerseText = styled.Text<FontSizeOffsetProps>`
  text-align: justify;
  color: ${({ theme }: { theme: any }) => theme.colors.text};
  line-height: ${(props) => (props.fontSizeOffset || 0) + 22}px;
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => (props.fontSizeOffset || 0) + 16}px;
`;
export const LoadingArea = styled.View`
  position: absolute;
  background-color: ${({ theme }: { theme: any }) =>
    color(theme.colors.background).alpha(0.8).rgb().string()};

  z-index: 1;
  /* opacity: 0.8; */
  width: ${SCREEN_WIDTH}px;

  height: ${SCREEN_HEIGHT}px;
  justify-content: center;
  align-items: center;
`;
export const Loading = styled.ActivityIndicator``;
interface NavigationButtonProps {
  isPlayerOpened: boolean;
  side?: string;
}
export const NavigationButton = styled.TouchableOpacity<NavigationButtonProps>`
  position: absolute;
  background-color: ${({ theme }: { theme: any }) => theme.colors.background};
  opacity: 0.8;
  width: 50px;
  height: 50px;
  border-color: ${({ theme }: { theme: any }) => theme.colors.text};
  border-width: 1px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;

  ${({ isPlayerOpened }: NavigationButtonProps) =>
    isPlayerOpened ? `bottom: 200px;` : `bottom: 120px;`};
  ${({ side }: NavigationButtonProps) =>
    side && side === "right" ? `right: 20px;` : `left: 20px;`};
`;
export const NavigationIcon = styled(Icon)`
  font-size: 20px;
  color: ${({ theme }: { theme: any }) => theme.colors.text};
`;

export const FontScaleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FontDecreaseIcon = styled(ButtonIcon).attrs({
  name: "font",
  color: "#fff",
  size: 14,
  buttonStyle: { paddingRight: 15 },
})``;

export const FontIncreaseIcon = styled(ButtonIcon).attrs({
  name: "font",
  color: "#fff",
  size: 20,
  buttonStyle: { paddingLeft: 15, borderColor: "#fff", borderLeftWidth: 1 },
})``;
