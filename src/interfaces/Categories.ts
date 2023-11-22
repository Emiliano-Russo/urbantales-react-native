// Define tus categorías como un array de strings
export const categories: Category[] = [
  "Humor",
  "Sadness",
  "Terror",
  "Love",
  "Anger",
  "Surprise",
  "Nostalgia",
  "Euphoria",
  "Mystery",
  "Adventure",
  "Reflection",
];

// Asegúrate de que tu tipo Category esté sincronizado con este array
export type Category =
  | "Humor"
  | "Sadness"
  | "Terror"
  | "Love"
  | "Anger"
  | "Surprise"
  | "Nostalgia"
  | "Euphoria"
  | "Mystery"
  | "Adventure"
  | "Reflection";
// Define tus categorías como un array de objetos con nombre, color de fondo y color de borde
export const categoryColors = [
  { name: "Humor", bgColor: "#FDEBD0", borderColor: "#F5B041", textColor: "#000000" },
  { name: "Sadness", bgColor: "#D6EAF8", borderColor: "#3498DB", textColor: "#000000" },
  { name: "Terror", bgColor: "#D5D8DC", borderColor: "#7F8C8D", textColor: "#000000" },
  { name: "Love", bgColor: "#FADBD8", borderColor: "#E74C3C", textColor: "#000000" },
  { name: "Anger", bgColor: "#F5CBA7", borderColor: "#E67E22", textColor: "#000000" },
  { name: "Surprise", bgColor: "#FEF9E7", borderColor: "#F7DC6F", textColor: "#000000" },
  { name: "Nostalgia", bgColor: "#EBDEF0", borderColor: "#AF7AC5", textColor: "#000000" },
  { name: "Euphoria", bgColor: "#D5F5E3", borderColor: "#2ECC71", textColor: "#000000" },
  { name: "Mystery", bgColor: "#A9CCE3", borderColor: "#2980B9", textColor: "#000000" },
  { name: "Adventure", bgColor: "#A3E4D7", borderColor: "#16A085", textColor: "#001000" },
  { name: "Reflection", bgColor: "#F2D7D5", borderColor: "#D98880", textColor: "#000000" },
];
