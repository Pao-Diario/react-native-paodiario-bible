import styled from "styled-components/native";
import { Dimensions } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import type { ViewProps } from "react-native";
import type { DefaultTheme } from "styled-components";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const SCREEN_PADDED = SCREEN_WIDTH - 40;
const CATEGORY_ITEM_SPACE = 10;
const CATEGORY_ITEM_WIDTH = SCREEN_PADDED / 2 - CATEGORY_ITEM_SPACE;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const RowButtons = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

// Tipagem para a prop bordered
interface CardProps extends ViewProps {
  bordered?: boolean;
}

export const Card = styled.View<CardProps & { theme: DefaultTheme }>`
  border-radius: 16px;

  border-color: ${({ theme }) => theme.colors.primary};
  border-width: ${({ bordered }) => (bordered ? "2px" : "0px")};
  padding: ${({ bordered }) => (bordered ? "16px" : "0px")};
  margin-bottom: ${({ bordered }) => (bordered ? "10px" : "0px")};
  background-color: ${({ theme }) => theme.colors.background};
  overflow: hidden;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 22px;
  margin-bottom: 10px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  padding-bottom: 15px;
`;
export const ButtonSelect = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 32px;
  padding: 10px 12px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-color: ${({ theme }) => theme.colors.chip.background.secondary};
  border-width: 2px;
`;
export const ButtonSelectText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;
export const ButtonRead = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 32px;
  padding: 10px 20px;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
`;
export const ButtonReadText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
`;
export const ButtonVersionContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.chip.background.secondary};
  border-radius: 16px;
  padding: 5px 10px;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  /* border-color: ${({ theme }) => theme.colors.text}; */
  /* border-width: 1px; */
`;
export const ButtonVersionText = styled.Text`
  color: ${({ theme }) => theme.colors.chip.text.secondary};
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const Picker = styled(SelectDropdown).attrs(
  ({ theme, ...rest }: { theme: any; placeholder?: string }) => {
    return {
      doneButtonText: "Ok",
      // defaultButtonText: rest.placeholder || 'Selecione um Livro',
      dropdownStyle: {
        borderRadius: 10,
        marginTop: 10,
      },
      buttonStyle: {
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 10,
        backgroundColor: "transparent",
      },
      buttonTextStyle: { color: theme.colors.text, textAlign: "left" },
      selectedRowStyle: {
        backgroundColor: "#cfcfcf",
      },
      selectedRowTextStyle: {
        textAlign: "left",
        lineHeight: 35,
        fontSize: 18,
      },
      rowTextStyle: {
        textAlign: "left",
        lineHeight: 35,
        fontSize: 18,
      },
    };
  }
)`
  border: 1px solid #fff;
  border-radius: 10px;
`;
