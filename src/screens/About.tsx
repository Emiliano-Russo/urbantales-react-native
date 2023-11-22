import {
  View,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button, Text} from '../tool-components/index';
import {useTranslation} from 'react-i18next';
import packageJson from '../../package.json';

export const About = () => {
  const {t} = useTranslation();
  const {version} = packageJson;

  const sendEmail = () => {
    const email = 'support@urbantales.club';
    const subject = 'Inquiry from Urban Tales App';
    const body = 'Type your message here';

    // Encode the subject and body of the email in the mailto URL
    const url = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const visitWebsite = () => {
    const url = 'https://urbantales.club';
    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text fontType="boldFont" style={{fontSize: 24, marginBottom: 10}}>
        {t('About')} Urban Tales
      </Text>
      <Text>
        Urban Tales es una aplicación única diseñada para los narradores urbanos
        y exploradores curiosos del mundo moderno. Al combinar la narrativa
        interactiva con la tecnología de geolocalización, esta aplicación
        permite a los usuarios crear y compartir historias ambientadas en
        ubicaciones específicas en un mapa. Cada relato se convierte en una
        aventura, esperando ser descubierta por otros usuarios que, al visitar
        esos lugares, pueden desbloquear los cuentos y sumergirse en las
        leyendas que cada esquina de la ciudad tiene para contar.
      </Text>
      <Text fontType="boldFont" style={{marginTop: 40, fontSize: 20}}>
        {t('Version')}
      </Text>
      <Text style={{marginTop: 10}}>{version}</Text>
      <Text fontType="boldFont" style={{marginTop: 40, fontSize: 20}}>
        {t('Contact')}
      </Text>
      <Text style={{marginTop: 10}}>{t('ContactText')}</Text>
      <TouchableOpacity onPress={sendEmail}>
        <Text style={styles.linkText}>{t('Send Email')}</Text>
      </TouchableOpacity>
      <Button
        onPress={visitWebsite}
        fontSize={13}
        style={{width: 200, margin: 0, marginTop: 40}}
        title={t('Visit our website')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  linkText: {
    marginTop: 10,
    color: 'blue',
  },
});
