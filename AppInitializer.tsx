// AppInitializer.js
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
//import FontLoader from 'react-native-font-loader';
import {AppDispatch} from './src/redux/store';
import {loadInitialStateAsync} from './src/redux/userSlice';

export const AppInitializer = ({children}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInitialStateAsync());
  }, [dispatch]);

  useEffect(() => {
    async function prepare() {
      try {
        // Carga de fuentes
        //await FontLoader.loadAsync({
        //  regularFont: require('./assets/fonts/Merriweather-Regular.ttf'),
        //  lightFont: require('./assets/fonts/Merriweather-Light.ttf'),
        //  boldFont: require('./assets/fonts/Merriweather-Bold.ttf'),
        //});

        setFontsLoaded(true);
      } catch (e) {
        console.warn(e);
      } finally {
        // Ocultar la pantalla de inicio
        SplashScreen.hide();
      }
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return children;
};
