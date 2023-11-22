import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../interfaces/User";

// This type reflects that either the user and token are set, or both are null
type UserState = {
  user: IUser | null;
  token: string | null;
  selectedLanguage: string | null;
  hasSeenWelcomeModal: boolean;
  hasSeenPremiumOffer: boolean;
  mapFilters: { category: string; hideRead: boolean };
};

// Updated initial state
const initialState: UserState = {
  user: null,
  token: null,
  selectedLanguage: null,
  hasSeenWelcomeModal: false,
  hasSeenPremiumOffer: false,
  mapFilters: { category: "Any", hideRead: false },
};

export const clearAsyncStorageAsync = createAsyncThunk("development/clearAsyncStorage", async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
    throw error;
  }
});

export const loadInitialStateAsync = createAsyncThunk("user/loadInitialState", async (_, { dispatch }) => {
  try {
    const [userString, token, selectedLanguage, hasSeenWelcomeModalString, hasSeenPremiumOfferString] =
      await Promise.all([
        AsyncStorage.getItem("user"),
        AsyncStorage.getItem("token"),
        AsyncStorage.getItem("selectedLanguage"),
        AsyncStorage.getItem("hasSeenWelcomeModal"),
        AsyncStorage.getItem("hasSeenPremiumOffer"),
      ]);

    if (userString && token) {
      const objUserNToken = { token: token, user: JSON.parse(userString) };
      dispatch(addUserAndTokenAsync(objUserNToken));
    }
    if (selectedLanguage) dispatch(setSelectedLanguageAsync(selectedLanguage));
    if (hasSeenWelcomeModalString) dispatch(setHasSeenWelcomeModalAsync(JSON.parse(hasSeenWelcomeModalString)));
    if (hasSeenPremiumOfferString) dispatch(setHasSeenPremiumOfferAsync(JSON.parse(hasSeenPremiumOfferString))); // Agrega esta línea

    // Retornar el estado completo o parcial si es necesario
    return {
      user: userString ? JSON.parse(userString) : null,
      token: token || null,
      selectedLanguage: selectedLanguage || null,
      hasSeenWelcomeModal: hasSeenWelcomeModalString ? JSON.parse(hasSeenWelcomeModalString) : false,
      hasSeenPremiumOffer: hasSeenPremiumOfferString ? JSON.parse(hasSeenPremiumOfferString) : false,
    };
  } catch (error) {
    console.error("Error loading initial state from AsyncStorage:", error);
    throw error;
  }
});

export const updateMapFilters = createAsyncThunk(
  "user/updateMapFilters",
  async (filters: { category: string; hideRead: boolean }) => {
    // Si necesitas realizar alguna operación asíncrona, como guardar en AsyncStorage
    await AsyncStorage.setItem("mapFilters", JSON.stringify(filters));
    return filters;
  }
);

export const setHasSeenPremiumOfferAsync = createAsyncThunk("user/setHasSeenPremiumOffer", async (hasSeen: boolean) => {
  try {
    await AsyncStorage.setItem("hasSeenPremiumOffer", JSON.stringify(hasSeen));
    return hasSeen;
  } catch (error) {
    console.error("Error saving hasSeenPremiumOffer to AsyncStorage:", error);
    throw error;
  }
});

export const getHasSeenPremiumOfferAsync = createAsyncThunk("user/getHasSeenPremiumOffer", async () => {
  try {
    const hasSeenPremiumOfferString = await AsyncStorage.getItem("hasSeenPremiumOffer");
    return hasSeenPremiumOfferString !== null ? JSON.parse(hasSeenPremiumOfferString) : false;
  } catch (error) {
    console.error("Error retrieving hasSeenPremiumOffer from AsyncStorage:", error);
    throw error;
  }
});

export const setHasSeenWelcomeModalAsync = createAsyncThunk("user/setHasSeenWelcomeModal", async (hasSeen: boolean) => {
  try {
    await AsyncStorage.setItem("hasSeenWelcomeModal", JSON.stringify(hasSeen));
    return hasSeen;
  } catch (error) {
    console.error("Error saving hasSeenWelcomeModal to AsyncStorage:", error);
    throw error;
  }
});

export const getHasSeenWelcomeModalAsync = createAsyncThunk("user/getHasSeenWelcomeModal", async () => {
  try {
    const hasSeenWelcomeModalString = await AsyncStorage.getItem("hasSeenWelcomeModal");
    return hasSeenWelcomeModalString !== null ? JSON.parse(hasSeenWelcomeModalString) : false;
  } catch (error) {
    console.error("Error retrieving hasSeenWelcomeModal from AsyncStorage:", error);
    throw error;
  }
});

export const setSelectedLanguageAsync = createAsyncThunk("language/setSelectedLanguage", async (language: string) => {
  try {
    await AsyncStorage.setItem("selectedLanguage", language);
    return language;
  } catch (error) {
    console.error("Error saving selected language to AsyncStorage:", error);
    throw error;
  }
});

export const getSelectedLanguageAsync = createAsyncThunk("language/getSelectedLanguage", async () => {
  try {
    const language = await AsyncStorage.getItem("selectedLanguage");
    return language;
  } catch (error) {
    console.error("Error retrieving selected language from AsyncStorage:", error);
    throw error;
  }
});

export const addUserAndTokenAsync = createAsyncThunk(
  "user/addUserAndToken",
  async (data: { user: IUser; token: string }) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.error("Error saving user and token to AsyncStorage:", error);
      throw error;
    }
  }
);

export const removeUserAndTokenAsync = createAsyncThunk("user/removeUserAndToken", async () => {
  try {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    return { user: null, token: null };
  } catch (error) {
    console.error("Error removing user and token from AsyncStorage:", error);
    throw error;
  }
});

export const updateStringPropertyAsync = createAsyncThunk(
  "user/updateStringProperty",
  async ({ property, value }: { property: keyof IUser; value: any }) => {
    const currentUserString = await AsyncStorage.getItem("user");
    if (currentUserString) {
      const currentUser: any = JSON.parse(currentUserString) as IUser;
      currentUser[property] = value;
      await AsyncStorage.setItem("user", JSON.stringify(currentUser));
      return currentUser;
    } else {
      throw new Error("User not found in AsyncStorage");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addUserAndTokenAsync.fulfilled, (state, action: PayloadAction<{ user: IUser; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(removeUserAndTokenAsync.fulfilled, (state, action: PayloadAction<{ user: null; token: null }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(updateStringPropertyAsync.fulfilled, (state, action: PayloadAction<IUser>) => {
      if (state.user) {
        // Update only if user is not null
        state.user = { ...state.user, ...action.payload };
      }
    });
    builder.addCase(setSelectedLanguageAsync.fulfilled, (state, action: PayloadAction<string>) => {
      state.selectedLanguage = action.payload;
    });
    builder.addCase(getSelectedLanguageAsync.fulfilled, (state, action: PayloadAction<string | null>) => {
      state.selectedLanguage = action.payload;
    });
    builder.addCase(setHasSeenWelcomeModalAsync.fulfilled, (state, action: PayloadAction<boolean>) => {
      state.hasSeenWelcomeModal = action.payload;
    });
    builder.addCase(getHasSeenWelcomeModalAsync.fulfilled, (state, action: PayloadAction<boolean>) => {
      state.hasSeenWelcomeModal = action.payload;
    });
    builder.addCase(setHasSeenPremiumOfferAsync.fulfilled, (state, action: PayloadAction<boolean>) => {
      state.hasSeenPremiumOffer = action.payload;
    });
    builder.addCase(getHasSeenPremiumOfferAsync.fulfilled, (state, action: PayloadAction<boolean>) => {
      state.hasSeenPremiumOffer = action.payload;
    });
    builder.addCase(clearAsyncStorageAsync.fulfilled, (state) => {
      return initialState;
    });
    builder.addCase(
      updateMapFilters.fulfilled,
      (state, action: PayloadAction<{ category: string; hideRead: boolean }>) => {
        state.mapFilters = action.payload;
      }
    );
  },
});

export default userSlice.reducer;
