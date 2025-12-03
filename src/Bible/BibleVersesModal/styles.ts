import styled from "styled-components/native";
import { Dimensions } from "react-native";
interface FontSizeOffsetProps {
  fontSizeOffset: number;
}
const { width: SCREEN_WIDTH } = Dimensions.get("screen");
export const Container = styled.View`
  min-width: 100%;
  padding: 13px 20px;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.background};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.divider};
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
  margin-bottom: 0px;
`;
export const SubTitle = styled.Text<VerseProps>`
  margin-top: 20px;
  font-weight: bold;
  font-size: ${(props) => (props.fontSizeOffset || 0) + 16}px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 3px;
  text-align: center;
  justify-content: center;
  align-items: center;

  width: 44px;
  height: 44px;
  border-radius: 80px;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.chip.background.primary};
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

interface VerseProps {
  fontSizeOffset?: number;
}

export const VerseTitle = styled.Text<VerseProps>`
  font-size: ${(props) => (props.fontSizeOffset || 0) + 16}px;
  line-height: ${(props) => (props.fontSizeOffset || 0) + 24}px;
  color: ${({ theme }) => theme.colors.text};
  max-width: ${SCREEN_WIDTH - 40}px;
  text-align: justify;
  font-weight: bold;
  padding-bottom: 16px;
`;
export const VerseArea = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })`
  padding-bottom: 6px;
  padding-top: 6px;
  position: relative;
`;
export const VerseNumber = styled.Text<FontSizeOffsetProps>`
  font-weight: bold;
  color: ${({ theme }: { theme: any }) => theme.colors.text};
  margin-right: 6px;
`;
export const VerseText = styled.Text<FontSizeOffsetProps>`
  text-align: justify;
  color: ${({ theme }: { theme: any }) => theme.colors.text};
  line-height: ${(props) => (props.fontSizeOffset || 0) + 22}px;
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => (props.fontSizeOffset || 0) + 16}px;
  padding-bottom: 6px;
  padding-top: 6px;
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
