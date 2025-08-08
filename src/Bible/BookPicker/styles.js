import styled from "styled-components/native";
import { FontAwesome5 as Icon } from "@react-native-vector-icons/fontawesome5";

export const Header = styled.View`
  min-width: 100%;
  padding: 10px;
  justify-content: center;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.background};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.divider};
  gap: 10px;
`;
export const VersionButton = styled.TouchableOpacity`
  width: 100px;
  height: 44px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const VersionButtonContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.contentArea.background};
  border-radius: 16px;
  padding: 4px 8px;

  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  border-color: ${({ theme }) => theme.colors.text};
  border-width: 1px;
`;

export const VersionButtonLabel = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: bold;
`;
export const VersionButtonValue = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
`;
export const CloseButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 80px;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.chip.background.primary};
`;

export const SearchRow = styled.View`
  min-width: 100%;
  padding: 10px;
  justify-content: center;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.background};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.divider};
`;

export const SearchField = styled.View`
  width: 100%;
  border-color: ${({ theme }) => theme.colors.divider};
  border-width: 1px;
  border-radius: 32px;
  height: 40px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
export const SearchIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.divider};
  width: 44px;

  text-align: center;
  font-size: 18px;
`;

export const SearchInput = styled.TextInput.attrs({
  placeholderTextColor: "#c7c7c7",
})`
  border-radius: 32px;
  flex: 1;
  height: 40px;
  padding: 0px 15px;
  font-size: 16px;

  color: ${({ theme }) => theme.colors.text};
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
  flex: 1;
  font-size: 22px;
  line-height: 44px;
  color: ${({ theme }) => theme.colors.text};
`;
