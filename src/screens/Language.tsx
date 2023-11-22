import {
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {Text} from '../tool-components/index';
import * as Animatable from 'react-native-animatable';
import {availableLanguages} from '../../i18next';
import {useTranslation} from 'react-i18next';
import {setSelectedLanguageAsync} from '../redux/userSlice';
import {AppDispatch} from '../redux/store';
import {useDispatch} from 'react-redux';

export const Language = () => {
  const {t, i18n} = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const handleLanguageChange = async language => {
    i18n.changeLanguage(language);
    dispatch(setSelectedLanguageAsync(language));
    Alert.alert(t('Updated Successfully'));
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
    color: 'black',
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
