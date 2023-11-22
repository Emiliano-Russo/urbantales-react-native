import {View, StyleSheet} from 'react-native';
import {Text, TextInput, Button} from '../tool-components/index';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import {UserService} from '../services/user.service';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileStackParamList} from '../../App';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {removeUserAndTokenAsync} from '../redux/userSlice';

const userService = new UserService(API_URL);

export const DeleteAccount = () => {
  const {t} = useTranslation();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation =
    useNavigation<
      StackNavigationProp<ProfileStackParamList, 'DeleteAccount'>
    >();
  const dispatch: AppDispatch = useDispatch();

  const deleteAccount = () => {
    if (text.toLowerCase() === 'delete') {
      // delete account
      setLoading(true);
      userService
        .deleteAccount()
        .then(() => {
          setLoading(true);
          dispatch(removeUserAndTokenAsync());
          navigation.navigate('Profile');
        })
        .catch(err => {
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{marginTop: 10, padding: 40}}>
        {t(
          "Are you sure you want to delete your account? Type 'Delete' to confirm",
        )}
      </Text>

      <TextInput
        style={{width: 200, textAlign: 'center'}}
        value={text}
        onChangeText={val => setText(val)}
      />
      <Button
        isLoading={loading}
        style={{
          marginTop: 20,
          backgroundColor: text.toLowerCase() === 'delete' ? 'red' : 'gray',
        }}
        title={t('Yes, Delete my account')}
        onPress={deleteAccount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});
