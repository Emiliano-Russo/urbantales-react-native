import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../tool-components/index";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
  handleOpenFilters: () => void;
}

export const HomeHeader = (props: Props) => {
  return (
    <View style={styles.header}>
      <Text fontType="boldFont" style={styles.headerTitle}>
        Urban Tales
      </Text>
      <TouchableOpacity onPress={props.handleOpenFilters} style={styles.filterButton}>
        <Ionicons name="filter" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "white",
    marginTop: 25,
  },
  headerTitle: {
    fontSize: 20,
  },
  filterButton: {
    backgroundColor: "rgba(0, 0, 0, 0.05)", // Fondo sutil
    padding: 10, // Espaciado interno
    borderRadius: 50, // Bordes redondeados
    alignItems: "center",
  },
  filterButtonText: {
    fontSize: 18, // Tamaño de letra para el botón
    // Añade otros estilos para el texto del botón aquí
  },
  // ... (resto de tus estilos)
});
