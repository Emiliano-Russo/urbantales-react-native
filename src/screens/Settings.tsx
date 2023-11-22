import React from 'react';
import {View, Switch, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '../tool-components/index';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileStackParamList, RootStackParamList} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {removeUserAndTokenAsync} from '../redux/userSlice';
import {useTranslation} from 'react-i18next';

const Settings = () => {
  const navigation =
    useNavigation<StackNavigationProp<ProfileStackParamList, 'Settings'>>();
  const dispatch: AppDispatch = useDispatch();
  const {t} = useTranslation();

  const options = [
    {
      name: t('Edit User'),
      action: () => {
        console.log('Edit User');
        navigation.navigate('EditUser');
      },
    },
    {
      name: t('Language'),
      action: () => {
        console.log('Language');
        navigation.navigate('Language');
      },
    },
    {
      name: t('Support'),
      action: () => {
        navigation.navigate('Support');
      },
    },
    {
      name: t('About'),
      action: () => {
        console.log('Edit User');
        navigation.navigate('About');
      },
    },
    {
      name: t('Log Out'),
      action: () => {
        dispatch(removeUserAndTokenAsync());
        navigation.navigate('Profile');
      },
      color: 'red',
    },
    {
      name: t('Delete Account'),
      action: () => {
        console.log('Delete Account');
        navigation.navigate('DeleteAccount');
      },
      color: '#8B0000',
    },
  ];
  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity
          key={option.name}
          style={styles.opt}
          onPress={option.action}>
          <Text style={{color: option.color ? option.color : 'black'}}>
            {option.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  opt: {
    margin: 10,
  },
});

export default Settings;
