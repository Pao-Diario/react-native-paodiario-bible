import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');
export const Container = styled.View`
  min-width: 100%;
  padding: 10px 20px;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.background};
`;
export const ScrollContainer = styled.View`
  min-width: 100%;
  padding: 10px 20px 100px 20px;
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
  font-weight: bold;
  font-size: 22px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
`;
export const SubTitle = styled.Text`
  margin-top: 0px;
  font-weight: bold;
  font-size: ${props => (props.fontSizeOffset || 0) + 16}px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
`;

export const FormRowContainer = styled.View`
  padding: 0px 0px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-top-width: 1px;
  border-top-color: #ccc;
  background-color: ${({ theme }) => theme.colors.background};
`;
export const Row = styled.View`
  flex-direction: column;
  justify-content: center;

  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;
export const Line = styled.View`
  flex-direction: column;
  justify-content: center;

  margin-bottom: 14px;
  margin-top: 14px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export const Verse = styled.Text`
  font-size: ${props => (props.fontSizeOffset || 0) + 14}px;
  color: ${({ theme }) => theme.colors.text};
  max-width: ${SCREEN_WIDTH - 40}px;
  text-align: justify;
`;
export const FormButton = styled.TouchableOpacity`
  margin-top: 20px;
  height: 50px;

  width: ${SCREEN_WIDTH - 40}px;

  padding: 3px 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 10px;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.divider};
`;
export const FormLabel = styled.Text`
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
  text-align: center;
`;
