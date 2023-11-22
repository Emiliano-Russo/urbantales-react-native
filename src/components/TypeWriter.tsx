import { useEffect, useState } from "react";
import { Text } from "../tool-components/Text";

export const TypewriterText = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer); // Limpieza en caso de que el componente se desmonte
  }, [text, speed]);

  return (
    <Text
      style={{
        marginTop: 20,
        fontSize: 16,
        marginBottom: 20,
        textAlign: "justify",
      }}
    >
      {displayedText}
    </Text>
  );
};
