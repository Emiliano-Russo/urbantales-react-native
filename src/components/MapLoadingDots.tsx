import { View } from "react-native";
import { LoadingDots } from "../tool-components/LoadingDots";

export const MapLoadingDots = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: "19%",
        left: "10%",
        right: "10%",
        alignItems: "center",
        flexDirection: "row", // para alinear el ícono y el texto horizontalmente
        justifyContent: "center", // para centrar ambos elementos dentro del View
      }}
    >
      <View style={{ backgroundColor: "rgba(255,255,255,0.7)", width: "20%", alignItems: "center", borderRadius: 15 }}>
        <LoadingDots />
      </View>
    </View>
  );
};
