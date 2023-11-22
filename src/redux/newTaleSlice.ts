import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ITaleCreate} from '../interfaces/Tale';

const initialState: ITaleCreate = {
  title: '',
  image: '',
  narrative: '',
  category: '',
  latitude: '',
  longitude: '',
  isAnonymous: false,
  mark: '',
};

export const addTaleAsync = createAsyncThunk(
  'tale/addTale',
  async (tale: ITaleCreate) => {
    try {
      await AsyncStorage.setItem('tale', JSON.stringify(tale));
      return tale;
    } catch (error) {
      console.error('Error saving tale to AsyncStorage:', error);
      throw error;
    }
  },
);

export const removeTaleAsync = createAsyncThunk('tale/removeTale', async () => {
  try {
    await AsyncStorage.removeItem('tale');
    return null;
  } catch (error) {
    console.error('Error removing tale from AsyncStorage:', error);
    throw error;
  }
});

export const updateStringPropertyAsync = createAsyncThunk(
  'tale/updateStringProperty',
  async ({property, value}: {property: any; value: any}) => {
    // Intenta obtener el tale actual de AsyncStorage
    const currentTaleString = await AsyncStorage.getItem('tale');

    let currentTale: ITaleCreate;
    if (currentTaleString) {
      currentTale = JSON.parse(currentTaleString) as ITaleCreate;
    } else {
      console.error(
        '#1 No tale found in AsyncStorage. Using default empty tale.',
      );
      currentTale = initialState; // Usando el initialState cuando no hay un tale en AsyncStorage
    }
    // Actualiza la propiedad del tale y guárdalo en AsyncStorage
    currentTale[property] = value;
    await AsyncStorage.setItem('tale', JSON.stringify(currentTale));

    return currentTale;
  },
);

export const updateCoordinatesAsync = createAsyncThunk(
  'tale/updateCoordinates',
  async ({latitude, longitude}: {latitude: string; longitude: string}) => {
    const currentTaleString = await AsyncStorage.getItem('tale');

    let currentTale: ITaleCreate = currentTaleString
      ? (JSON.parse(currentTaleString) as ITaleCreate)
      : {...initialState}; // Crea una copia del initialState

    // Actualiza la copia, no el initialState.
    currentTale.latitude = latitude;
    currentTale.longitude = longitude;

    await AsyncStorage.setItem('tale', JSON.stringify(currentTale));

    return currentTale;
  },
);

const taleSlice = createSlice({
  name: 'tale',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      addTaleAsync.fulfilled,
      (state, action: PayloadAction<ITaleCreate>) => {
        return action.payload;
      },
    );
    builder.addCase(
      removeTaleAsync.fulfilled,
      (state, action: PayloadAction<null>) => {
        return initialState;
      },
    );
    builder.addCase(
      updateStringPropertyAsync.fulfilled,
      (state, action: PayloadAction<ITaleCreate>) => {
        return action.payload;
      },
    );
    builder.addCase(
      updateCoordinatesAsync.fulfilled,
      (state, action: PayloadAction<ITaleCreate>) => {
        return action.payload;
      },
    );
  },
});

export default taleSlice.reducer;
