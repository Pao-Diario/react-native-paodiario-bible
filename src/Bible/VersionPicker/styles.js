import styled from "styled-components/native";
import { FontAwesome5 as Icon } from "@react-native-vector-icons/fontawesome5";

export const Header = styled.View`
  min-width: 100%;
  padding: 12px;
  justify-content: center;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.background};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.divider};
`;
export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 3px;
  width: 44px;
  height: 44px;
  border-radius: 80px;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.chip.background.primary};

  justify-content: center;
  align-items: center;
`;

export const ScrollContainer = styled.View`
  min-width: 100%;
  padding: 0px 0px 100px 0px;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.background};
`;
export const ThemedScrollView = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.background};
`;
export const ThemedSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  margin-top: 0px;

  font-size: 22px;
  color: ${({ theme }) => theme.colors.text};
`;
