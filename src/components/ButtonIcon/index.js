import React from "react";

import { TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";

export default function ButtonIcon({
  onPress,
  name,
  color,
  size,
  buttonStyle,
  ...rest
}) {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Icon {...rest} name={name} color={color} size={size} />
    </TouchableOpacity>
  );
}
