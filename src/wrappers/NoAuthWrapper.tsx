// NoAuthWrapper.js
import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

export const NoAuthWrapper = ({children}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'App'>>();

  useEffect(() => {
    if (user) {
      navigation.navigate('App');
    }
  }, [user, navigation]);

  if (user) {
    // Mostrar un indicador de actividad mientras se redirige
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Si no hay un usuario, muestra los children (componentes hijos) que estaba destinado a ser renderizado
  return <>{children}</>;
};
