import React from "react";

import { Modal, Outside, Container } from "./styles";

export default function Tooltip({
  position = { left: 100 },
  visible,
  closeTooltip,
  children,
}) {
  return (
    <Modal visible={visible}>
      <Outside onPress={closeTooltip}>
        <Container style={[position]}>{children}</Container>
      </Outside>
    </Modal>
  );
}
