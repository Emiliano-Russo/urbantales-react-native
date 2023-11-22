import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {Text} from '../tool-components/index';
import {useTranslation} from 'react-i18next';
import {availableLanguages} from '../../i18next';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setSelectedLanguageAsync} from '../redux/userSlice';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

const backgroundImage = require('../../assets/background1.png');

export const LanguageSelectionScreen = () => {
  const {i18n} = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, 'LanguageSelection'>
    >();

  if (user.selectedLanguage) {
    if (!user.hasSeenWelcomeModal) {
      navigation.navigate('Welcome');
    } else {
      navigation.navigate('App');
    }
  }

  const handleLanguageChange = async language => {
    i18n.changeLanguage(language);
    dispatch(setSelectedLanguageAsync(language));
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#7D3C98', '#191970']} style={styles.modalView}>
        <ImageBackground
          source={backgroundImage}
          style={{
            position: 'absolute', // Posiciona la imagen de fondo absolutamente
            width: '100%', // Asegura que la imagen de fondo llene el contenedor
            height: '100%', // Asegura que la imagen de fondo llene el contenedor
            opacity: 0.2,
          }}
        />
        <Animatable.View animation="slideInDown" duration={3000}>
          <Image
            style={{width: 200, height: 200}}
            source={require('../../assets/official-logo-white.png')}
          />
        </Animatable.View>

        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {availableLanguages.map((language, index) => (
            <Animatable.View
              key={index}
              animation="fadeInLeft"
              duration={1800}
              delay={index * 200} // Esto creará un efecto escalonado
            >
              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => handleLanguageChange(language.code)}>
                <Image style={styles.flag} source={{uri: language.flagUri}} />
                <Text style={styles.languageText}>{language.name}</Text>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 20,
    margin: 10,
    fontFamily: 'lightFont',
    color: 'white',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
