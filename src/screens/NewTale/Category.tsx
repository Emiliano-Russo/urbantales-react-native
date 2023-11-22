import {Platform, View} from 'react-native';
import {Button, Text, TextInput} from '../../tool-components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NewTaleStackParamList} from '../../../App';
import {Picker} from '@react-native-picker/picker';
import {use} from 'i18next';
import {useState} from 'react';
import {AppDispatch, RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {updateStringPropertyAsync} from '../../redux/newTaleSlice';
import {useTranslation} from 'react-i18next';
import {categories} from '../../interfaces/Categories';

export const NewTaleCategory = () => {
  const {t, i18n} = useTranslation();

  const dispatch: AppDispatch = useDispatch();
  const tale = useSelector((state: RootState) => state.newTale);
  const saveCategory = (category: string) => {
    dispatch(
      updateStringPropertyAsync({property: 'category', value: category}),
    );
  };

  const navigation =
    useNavigation<StackNavigationProp<NewTaleStackParamList, 'Category'>>();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text fontType="boldFont" style={{fontSize: 18, marginBottom: 20}}>
        {t('In which category do you place your tale?')}
      </Text>
      <Picker
        selectedValue={tale.category}
        style={{height: Platform.OS == 'ios' ? 200 : 50, width: '80%'}}
        onValueChange={itemValue => saveCategory(itemValue)}>
        {categories.map((category, index) => (
          <Picker.Item key={index} label={t(category)} value={category} />
        ))}
      </Picker>
      <Button
        style={{width: 100, marginTop: 20}}
        title={t('Finish')}
        onPress={() =>
          navigation.navigate('TaleDisplay', {
            tale: tale,
            isCreation: true,
          })
        }
      />
    </View>
  );
};
