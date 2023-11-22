import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Button, Text} from '../../tool-components/index';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NewTaleStackParamList} from '../../../App';
import {AppDispatch, RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {ModalPremium} from '../../components/ModalPremium';
import {updateStringPropertyAsync} from '../../redux/newTaleSlice';

export const NewTaleIsAnonymous = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<StackNavigationProp<NewTaleStackParamList, 'Anonymous'>>();
  const [showModalPremium, setShowModalPremium] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const newTale = useSelector((state: RootState) => state.newTale);

  const handleToggle = () => {
    if (user!.subscription === undefined) setShowModalPremium(true);
    else
      dispatch(
        updateStringPropertyAsync({
          property: 'isAnonymous',
          value: !newTale.isAnonymous,
        }),
      );
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
      }}>
      <ModalPremium
        isModalVisible={showModalPremium}
        setModalVisible={setShowModalPremium}
      />
      <View style={styles.container}>
        <Text fontType="boldFont" style={styles.label}>
          {t('Publish as anonymous')}
        </Text>
        <TouchableOpacity onPress={handleToggle}>
          <Animatable.View
            transition="backgroundColor"
            style={[
              styles.switch,
              {backgroundColor: newTale.isAnonymous ? '#ff225f' : '#7b7b7b'},
            ]}>
            <Animatable.View
              transition="translateX"
              style={[
                styles.circle,
                newTale.isAnonymous ? styles.circleRight : styles.circleLeft,
              ]}
            />
          </Animatable.View>
        </TouchableOpacity>
      </View>
      <Button
        onPress={() => navigation.navigate('Mark')}
        title={t('Next')}
        style={{marginTop: 50, width: 100, alignSelf: 'center'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white', // O el color de fondo que desees
  },
  label: {
    fontSize: 18,
  },
  switch: {
    width: 50,
    height: 25,
    borderRadius: 25,
    padding: 2,
    justifyContent: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white', // O el color del círculo que desees
  },
  circleLeft: {
    alignSelf: 'flex-start',
  },
  circleRight: {
    alignSelf: 'flex-end',
  },
});

export default NewTaleIsAnonymous;
