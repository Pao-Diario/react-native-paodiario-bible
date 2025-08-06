import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const btnSize = ((SCREEN_WIDTH - 20) * 13) / 100;
const btnMargin = ((SCREEN_WIDTH - 20) * 1.2) / 100;
console.log(btnSize);
export const Area = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })`
  min-width: 100%;
  padding: 14px 10px;

  flex-direction: column;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.divider};

  ${props => {
    let style = '';
    if (props.selected) {
      style += ` background-color:${props.theme.colors.backgroundSelected};`;
    } else {
      style += ` background-color:${props.theme.colors.background};`;
    }

    return style;
  }}
`;

export const RowBtn = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: bold;
`;

export const IconArrow = styled(Icon)`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: 14px;
  font-weight: bold;
`;
export const RowChapters = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;
`;
export const ChapterButton = styled.TouchableOpacity`
  margin-right: ${btnMargin}px;
  margin-bottom: ${btnMargin}px;

  border-radius: 8px;

  width: ${btnSize}px;
  height: ${btnSize}px;
  align-items: center;
  justify-content: center;

  ${props => {
    let style = '';
    if (props.selected) {
      style += ` background-color:${props.theme.colors.darkText};`;
      style += ` border-color:${props.theme.colors.primary};`;
      style += ` border-width:1px;`;
    } else {
      style += ` background-color:${props.theme.colors.primary};`;
    }

    return style;
  }}
`;
export const ChapterButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
