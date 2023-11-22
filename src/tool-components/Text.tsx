import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

type TextProps = RNTextProps & {
  fontType?: fontType;
};

type fontType = "regularFont" | "lightFont" | "boldFont";

export const Text: React.FC<TextProps> = (props) => {
  const { fontType, style, ...rest } = props;

  const fontStyles = {
    fontFamily: fontType || "regularFont",
  };

  return <RNText style={[fontStyles, style]} {...rest} />;
};
