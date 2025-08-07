import styled from "styled-components/native";

export const Container = styled.View`
  margin-top: 15px;
  margin-bottom: 70px;
`;

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 22px;
  margin-top: 15px;
  margin-bottom: 10px;
`;
export const Paragraph = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  line-height: 20px;
  /* text-align: justify; */

  margin-bottom: 10px;
`;
export const ButtonLink = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 10px;
  border-radius: 32px;
  justify-content: center;
  align-items: center;
`;
export const ButtonLinkText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
