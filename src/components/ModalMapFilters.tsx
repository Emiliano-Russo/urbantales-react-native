import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Modal, TouchableOpacity, StyleSheet, Switch, Text, Platform } from "react-native";
import { Button } from "../tool-components/index";
import { categories } from "../interfaces/Categories";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

interface Props {
  setModalVisible: (value: boolean) => void;
  isModalVisible: boolean;
  applyFilters: (category: string, hideRead: boolean) => void;
}

export const ModalMapFilters = ({ setModalVisible, isModalVisible, applyFilters }: Props) => {
  const { t } = useTranslation();
  const filters = useSelector((state: RootState) => state.user.mapFilters);
  const user = useSelector((state: RootState) => state.user.user);
  const [hideRead, setHideRead] = useState(filters.hideRead);
  const [category, setCategory] = useState(filters.category);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1}>
        <View style={styles.modalContent}>
          <Button
            style={{ position: "absolute", right: 0, backgroundColor: "red" }}
            title="X"
            onPress={() => setModalVisible(false)}
          />
          <Text style={styles.modalText}>{t("Filters")}</Text>

          <Picker
            selectedValue={category}
            style={{ height: Platform.OS == "ios" ? 200 : 50, width: "80%" }}
            onValueChange={(itemValue) => {
              setCategory(itemValue);
            }}
          >
            <Picker.Item key={100} label={t("Any")} value={"Any"} />
            {categories.map((category, index) => (
              <Picker.Item key={index} label={t(category)} value={category} />
            ))}
          </Picker>

          {/* Switch para Ocultar Leídos */}
          {user && (
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>{t("Hide Read")}</Text>
              <Switch
                value={hideRead}
                onValueChange={(val) => {
                  setHideRead(val);
                }}
              />
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginTop: 30,
            }}
          >
            <Button
              title={t("Reset")}
              onPress={() => {
                setCategory("Any");
                setHideRead(false);
                applyFilters("Any", false);
                setModalVisible(false);
              }}
              style={{ width: 100 }}
            />
            <Button
              title={t("Apply")}
              style={{ width: 100, backgroundColor: "green" }}
              onPress={() => {
                applyFilters(category, hideRead);
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo negro semitransparente
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    // Estilos para el texto dentro del modal
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10, // Espaciado vertical
    width: "80%",
  },
  switchText: {
    fontSize: 16,
    // Estilos adicionales para el texto del switch
  },
});
