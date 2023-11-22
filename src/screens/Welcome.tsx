import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import {Button, Text} from '../tool-components';
import {useTranslation} from 'react-i18next';
import {StackActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {setHasSeenWelcomeModalAsync} from '../redux/userSlice';
import Geolocation from 'react-native-geolocation-service';

export const WelcomeScreen = () => {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const {t} = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Welcome'>>();

  // const handlePress = () => {
  //   dispatch(setHasSeenWelcomeModalAsync(true));
  //   navigation.dispatch(StackActions.replace("App"));
  // };

  const handleLocationAccess = async () => {
    try {
      // Solicita permisos de ubicación
      const permission = await Geolocation.requestAuthorization('whenInUse');
      setStatus(permission);
      if (permission === 'granted') {
        // Obtiene la posición actual si se concede el permiso
        Geolocation.getCurrentPosition(
          position => {
            console.log(position); // Maneja la posición aquí
            dispatch(setHasSeenWelcomeModalAsync(true));
            navigation.dispatch(StackActions.replace('App'));
          },
          error => {
            // Maneja el error aquí
            console.error(error);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.error('No se ha dado permiso para acceder a la ubicación');
      }
    } catch (error) {
      console.error('Error al solicitar permisos de ubicación:', error);
    }
  };

  return (
    <Swiper showsButtons={false}>
      <View style={[styles.slide, styles.slide1]}>
        <Animatable.Text
          animation="fadeInDown"
          duration={1000}
          style={styles.text}>
          ¡{t('Welcome To')}
        </Animatable.Text>
        <Animatable.Text
          animation="fadeInDown"
          duration={1000}
          style={styles.text}>
          Urban Tales!
        </Animatable.Text>
        <Animatable.Text
          animation="fadeInDown"
          duration={1200}
          style={styles.description}>
          {t('WelcomeText1')}
        </Animatable.Text>
      </View>
      <View style={[styles.slide, styles.slide2]}>
        <Animatable.Text
          animation="fadeInDown"
          duration={1000}
          style={styles.text}>
          {t('Explore')}
        </Animatable.Text>
        <Animatable.Text
          animation="fadeInDown"
          duration={1200}
          style={styles.description}>
          {t('WelcomeText2')}
        </Animatable.Text>
      </View>
      <View style={[styles.slide, styles.slide3]}>
        <Animatable.Text
          animation="fadeInDown"
          duration={1000}
          style={styles.text}>
          {t('Share')}
        </Animatable.Text>
        <Animatable.Text
          animation="fadeInDown"
          duration={1200}
          style={styles.description}>
          {t('WelcomeText3')}
        </Animatable.Text>
        {/* <Button title={t("Let's Go")} onPress={handlePress} /> */}
      </View>
      {/* Nueva diapositiva para compartir ubicación */}
      <View style={[styles.slide, styles.slideLocation]}>
        {status == 'denied' ? (
          <View>
            <Text
              style={{
                backgroundColor: 'white',
                padding: 20,
                fontSize: 20,
                borderRadius: 20,
              }}>
              {t(
                "If you don't allow us to access the map, we won't be able to start.",
              )}
            </Text>
            <Text></Text>
          </View>
        ) : (
          <View>
            <Animatable.Text
              animation="fadeInDown"
              duration={1000}
              style={styles.text}>
              {t('Immerse')}
            </Animatable.Text>
            <Animatable.Text
              animation="fadeInDown"
              duration={1200}
              style={styles.description}>
              {t('WelcomeTextLocation')}
            </Animatable.Text>
            <Button
              title={t('Allow Location Access')}
              onPress={handleLocationAccess}
            />
          </View>
        )}
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 20,
  },
  slide1: {
    backgroundColor: '#7D3C98', // Un tono de violeta oscuro
  },
  slide2: {
    backgroundColor: '#8E44AD', // Un tono de violeta medio
  },
  slide3: {
    backgroundColor: '#9B59B6', // Un tono de violeta claro
  },
  slideLocation: {
    backgroundColor: '#af7ac4', // Un tono de violeta que prefieras
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  container: {
    flex: 1,
  },
});
