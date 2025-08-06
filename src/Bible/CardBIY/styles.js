import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

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

  margin-bottom: 10px;
`;

export const DateLabel = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  padding-top: 4px;
`;
export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  padding-bottom: 15px;
`;
export const ButtonRead = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 10px;
  margin-right: 10px;
`;
export const ButtonReadText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
