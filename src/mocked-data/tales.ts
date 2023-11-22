import { ITale } from "../interfaces/Tale";

export const tales_mock: ITale[] = [
  {
    id: "1",
    authorID: "User1",
    createdAt: new Date(),
    updatedAt: new Date(),
    latitude: "-34.85887263",
    longitude: "-56.2351389",
    title: "Historia de Amor",
    narrative:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "love",
    imgLink:
      "https://i.pinimg.com/originals/0f/6e/0f/0f6e0f5b6b0b6b0b6b0b6b0b6b0b6b0b.jpg",
  },
  {
    latitude: "-34.81889263",
    longitude: "-56.2251389",
    title: "Noche de Terror",
    narrative:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "fear",
    authorID: "",
    createdAt: new Date(),
    id: "",
    updatedAt: new Date(),
    imgLink:
      "https://i.pinimg.com/originals/0f/6e/0f/0f6e0f5b6b0b6b0b6b0b6b0b6b0b6b0b.jpg",
  },
];
