import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../hooks/useAuth';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

export const AuthWrapper = ({children}) => {
  const {user} = useAuth();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'App'>>();

  useEffect(() => {
    if (!user) {
      navigation.navigate('Auth');
    }
  }, [user, navigation]);

  if (!user) {
    // Optionally, you can show a loading spinner or a blank view
    // until the navigation kicks in or the user state is verified.
    return <View />;
  }

  return <>{children}</>;
};
