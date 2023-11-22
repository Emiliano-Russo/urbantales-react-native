import { TouchableOpacity, View, Image } from "react-native";
import { Text } from "../tool-components/index";

interface Props {
  title: string;
  image: string;
  onPress: () => void;
}

export const TaleBox = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: props.image }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
            margin: 10,
          }}
        />
        <Text style={{ textAlign: "center", maxWidth: 100 }}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
