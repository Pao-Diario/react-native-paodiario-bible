import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const SCREEN_PADDED = SCREEN_WIDTH - 60;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const RowButtons = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;
export const Card = styled.View`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  border-color: ${({ theme }) => theme.colors.primary};
  border-width: 1px;
  padding: 10px;
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
  font-size: 14px;

  text-transform: uppercase;
`;
export const VerseImage = styled.Image`
  width: ${SCREEN_PADDED}px;
  height: ${SCREEN_PADDED}px;
  border-radius: 8px;
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
  border-radius: 8px;
  padding: 10px;
  margin-right: 10px;
  margin-left: 10px;
`;
export const ButtonReadText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
