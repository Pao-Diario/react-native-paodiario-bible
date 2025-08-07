import React from "react";

import { Modal, Outside, Container } from "./styles";

interface Iposition {
  left?: number;
  right?: number;
  bottom?: number;
  top?: number;
}
interface ITooltip {
  position: Iposition;
  visible: boolean;
  closeTooltip: () => void;
  children: React.ReactNode;
}
export default function Tooltip({
  position = { left: 100 },
  visible,
  closeTooltip,
  children,
}: ITooltip) {
  return (
    <Modal visible={visible}>
      <Outside onPress={closeTooltip}>
        <Container style={[position]}>{children}</Container>
      </Outside>
    </Modal>
  );
}
