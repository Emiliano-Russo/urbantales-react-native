import {useTranslation} from 'react-i18next';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {Text} from '../tool-components/index';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
const backgroundImage = require('../../assets/backgroundRegister.png');

export const BoxSignInNowProfile = () => {
  const {t, i18n} = useTranslation();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'App'>>();

  return (
    <TouchableOpacity
      style={{
        marginTop: 20,
        marginBottom: 10,
        width: '80%',
      }}
      onPress={() => navigation.navigate('Auth')}>
      <LinearGradient
        colors={['#8B00FF', '#191970']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={{
          width: '100%',
          borderRadius: 10,
        }}>
        <ImageBackground
          source={backgroundImage}
          style={{
            position: 'absolute', // Posiciona la imagen de fondo absolutamente
            width: '100%', // Asegura que la imagen de fondo llene el contenedor
            height: '100%', // Asegura que la imagen de fondo llene el contenedor
            opacity: 0.2,
          }}
        />
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            marginTop: 20,
            marginHorizontal: 20,
          }}>
          {t('RegisterIntro')}
        </Text>
        <Text
          fontType="boldFont"
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 20,
            marginTop: 20,
          }}>
          {t('RegisterNow')}
        </Text>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 20,
          }}>
          {t('RegisterOutro')}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
