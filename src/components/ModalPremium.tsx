import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {Text, Button} from '../tool-components/index';
import LinearGradient from 'react-native-linear-gradient';
import {premiumBenefits} from '../mocked-data/premium-benefits';
import {useTranslation} from 'react-i18next';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const backgroundImage = require('../../assets/backgroundPremium.png');

interface Props {
  setModalVisible: (value: boolean) => void;
  isModalVisible: boolean;
}

export const ModalPremium = (props: Props) => {
  const {t, i18n} = useTranslation();
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.isModalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}>
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
        <Text style={styles.primaryText}>{t('Subscribe to')}</Text>

        <Text style={styles.secondaryText}>Premium</Text>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => props.setModalVisible(false)}>
          <Text>X</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {premiumBenefits.map((benefit, index) => {
            return (
              <View
                key={index}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 150,
                  height: 150,
                }}>
                <Image style={styles.icon} source={{uri: benefit.image}} />
                <Text style={styles.languageText}>
                  {i18n.language == 'es'
                    ? benefit.titleEs
                    : i18n.language == 'pt'
                    ? benefit.titlePt
                    : benefit.titleEn}
                </Text>
              </View>
            );
          })}
        </View>

        <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
          <LinearGradient
            colors={['#970F25', '#ff107A']} // Colores del gradiente
            style={[styles.gradientButton]}>
            <FontAwesome5 name="crown" style={{color: 'white'}} />
            <Text style={[styles.buttonText]}>{t("Let's Go")}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </Modal>
  );
};

// Puedes modificar los estilos como prefieras
const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 50,
  },
  primaryText: {
    fontFamily: 'boldFont',
    fontSize: 40,
    color: 'white',
    marginTop: 50,
  },
  secondaryText: {
    fontFamily: 'boldFont',
    fontSize: 25,
    color: 'white',
    marginBottom: 30,
  },
  icon: {
    width: 50,
    height: 50,
    margin: 5,
  },
  languageText: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'lightFont',
    color: 'white',
    maxWidth: 120,
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
