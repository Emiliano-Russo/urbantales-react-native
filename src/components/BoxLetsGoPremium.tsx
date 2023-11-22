import { useTranslation } from "react-i18next";
import { Text } from "../tool-components/index";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native";

export const BoxLetsGoPremium = () => {
  const { t, i18n } = useTranslation();
  const goldGradient = ["#b8860b", "#ffd700"];
  const redGradient = ["#970F25", "#ff107A"];
  return (
    <TouchableOpacity style={{ marginTop: 20, width: "80%" }}>
      <LinearGradient
        colors={goldGradient}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          padding: 20,
          width: "100%",
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <FontAwesome5 name="crown" style={{ color: "white" }} />
        <Text style={{ color: "white", marginLeft: 20 }}>{t("Let's Go")}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
