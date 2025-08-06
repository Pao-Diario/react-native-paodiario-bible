import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const SCREEN_PADDED = SCREEN_WIDTH - 40 - 32 - 4;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const RowButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const Card = styled.View`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border-color: ${({ theme }) => theme.colors.primary};
  border-width: 2px;
  padding: 16px;
  overflow: hidden;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 22px;
`;

export const DateLabel = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  padding-top: 4px;
`;
export const Verse = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  line-height: 24px;
  text-transform: uppercase;
  margin-top: 10px;
`;
export const VerseImage = styled.Image`
  width: ${SCREEN_PADDED}px;
  height: ${SCREEN_PADDED}px;
  max-width: 100%;
  max-height: 100%;
  border-radius: 16px;
`;
export const TextContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;

  margin-top: 15px;
  margin-bottom: 15px;
`;
export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  text-shadow-offset: 1px;
  text-shadow-color: ${({ theme }) => theme.colors.primary};
  text-shadow-radius: 10px;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  font-style: italic;
`;
export const ButtonRead = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 32px;
  padding: 10px 12px;
`;
export const ButtonReadText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
