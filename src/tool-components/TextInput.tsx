import React from "react";
import { TextInput as RNTextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {}

export const TextInput: React.FC<Props> = (props) => {
  const combinedStyles = [
    {
      backgroundColor: "#F5F5F5",
      borderRadius: 10,
      padding: 10,
      fontSize: 16,
      color: "#000",
      fontFamily: "regularFont",
    },
    props.style,
  ];

  return <RNTextInput {...props} style={combinedStyles} />;
};
