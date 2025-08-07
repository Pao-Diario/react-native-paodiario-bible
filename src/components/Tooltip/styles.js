import styled from "styled-components/native";

export const Modal = styled.Modal.attrs(() => ({
  animationType: "none",
  transparent: true,
}))``;

export const Outside = styled.TouchableOpacity`
  flex: 1;
`;

export const Container = styled.View`
  position: absolute;

  background-color: rgba(64, 64, 64, 0.8);
  border-radius: 5px;

  padding: 10px 15px;
`;
