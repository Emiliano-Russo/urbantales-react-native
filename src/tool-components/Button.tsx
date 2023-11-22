import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { Text } from "./Text";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>; // Agrega esta línea
  fontSize?: number;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ title, fontSize, style, textStyle, isLoading, ...rest }) => {
  const buttonStyle = StyleSheet.flatten([styles.button, style]);
  const textStyles = StyleSheet.flatten([styles.text, textStyle, { fontSize: fontSize, fontFamily: "boldFont" }]);

  return (
    <TouchableOpacity style={buttonStyle} disabled={isLoading} {...rest}>
      {isLoading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={textStyles}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // Tus estilos predeterminados para el botón
    padding: 10,
    margin: 10,
    backgroundColor: "blue",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    // Tus estilos predeterminados para el texto
    color: "white",
    fontWeight: "bold",
    fontFamily: "boldFont",
    textAlign: "center",
  },
});
