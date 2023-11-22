import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import {Text, Button} from '../../tool-components/index';
import {useTranslation} from 'react-i18next';
import {UserService} from '../../services/user.service';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {addUserAndTokenAsync} from '../../redux/userSlice';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import {API_URL} from '@env';
const backgroundImage = require('../../../assets/loginbackground2.jpg');

const userService = new UserService(API_URL);

export const SignUp = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');
  const {t} = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Auth'>>();

  const handleSignUp = () => {
    // Aquí podrías agregar la lógica para registrar al usuario
    console.log('logeando pa', name, email, password, confirmPass);
    if (password !== confirmPass) {
      Alert.alert("Passwords don't match.");
      return;
    }
    userService
      .registerUser({
        name: name,
        email: email,
        password: password,
        provider: 'local',
      })
      .then(res => {
        console.log(res);
        dispatch(addUserAndTokenAsync({token: res.token, user: res.user}));
        navigation.navigate('App');
      })
      .catch(err => {
        Alert.alert('Error creating user');
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={{
          position: 'absolute',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          opacity: 0.8,
        }}
      />
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        style={styles.input}
        placeholder={t('Name')}
        value={name}
        onChangeText={setName}
        keyboardType="default"
        autoCapitalize="none"
        maxLength={15}
      />
      <TextInput
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        style={styles.input}
        placeholder={t('Password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TextInput
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        style={styles.input}
        placeholder={t('Confirm Password')}
        value={confirmPass}
        onChangeText={setConfirmPass}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button
        title={t('Sign Up')}
        style={{width: '50%'}}
        onPress={handleSignUp}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    marginBottom: 20,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    color: 'white',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#0066ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
