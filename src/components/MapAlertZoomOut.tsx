import { View } from "react-native";
import { Text } from "../tool-components/index";
import { useTranslation } from "react-i18next";

export const MapAlertZoomOut = () => {
  const { t } = useTranslation();
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
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.7)",
          width: "100%",
          alignItems: "center",
          borderRadius: 15,
          padding: 10,
        }}
      >
        <Text style={{ textAlign: "center" }}>
          {t("It looks like you are far away. Zoom in to see the stories in this area.")}
        </Text>
      </View>
    </View>
  );
};
