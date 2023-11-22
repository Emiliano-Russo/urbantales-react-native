import React, { ReactElement, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "../tool-components/index";

const TabButton = ({ title, onPress, isActive }) => (
  <TouchableOpacity style={[styles.tabItem, isActive ? styles.activeTab : null]} onPress={onPress}>
    <Text style={isActive ? styles.activeText : null}>{title}</Text>
  </TouchableOpacity>
);

// Definimos la interface para las props de cada pestaña
interface TabScreen {
  title: string;
  component: React.ComponentType<any> | ReactElement;
}

// Definimos la interface para las props del componente Tabs
interface TabsProps {
  screens: TabScreen[];
}

export const Tabs = (props: TabsProps) => {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  // Renderiza la pantalla activa basándose en el índice activo
  const renderActiveScreen = () => {
    const ActiveScreen = props.screens[activeScreenIndex].component;
    // Si el componente es una función componente de React, lo renderizamos directamente
    // Si es un elemento de React, lo devolvemos directamente
    return typeof ActiveScreen === "function" ? <ActiveScreen /> : ActiveScreen;
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {props.screens.map((screen, index) => (
          <TabButton
            key={index}
            title={screen.title}
            onPress={() => setActiveScreenIndex(index)}
            isActive={activeScreenIndex === index}
          />
        ))}
      </View>
      <View style={{ flex: 1, width: "100%" }}>{renderActiveScreen()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    // borderWidth: 1,
    // borderColor: "black",
  },
  tabBar: {
    flexDirection: "row",
    height: 60,
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    // backgroundColor: "white",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 5,
    backgroundColor: "whitesmoke",
    borderRadius: 20,
    margin: 5,
  },
  activeTab: {
    backgroundColor: "#673de3",
  },
  activeText: {
    color: "white",
  },
});

// Uso del componente Tabs
// <Tabs screens={[
//   { title: 'Home', component: HomeScreen },
//   { title: 'Profile', component: ProfileScreen },
//   // Añade hasta 5 screens aquí
// ]} />
