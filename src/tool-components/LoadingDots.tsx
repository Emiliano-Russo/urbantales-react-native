import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";

export const LoadingDots = () => {
  const [dots, setDots] = useState("");
  const dotIntervalRef: any = useRef(null);

  useEffect(() => {
    dotIntervalRef.current = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 200); // Cambia el intervalo si deseas que los puntos parpadeen más rápido o más lento

    return () => clearInterval(dotIntervalRef.current); // Limpieza en el unmount
  }, []);

  return <Text style={styles.dots}>{dots}</Text>;
};

const styles = StyleSheet.create({
  dots: {
    fontSize: 30, // Cambia el tamaño de la fuente si es necesario
    color: "black", // Cambia el color si es necesario
  },
});
