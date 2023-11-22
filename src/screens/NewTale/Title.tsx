import {View} from 'react-native';
import {Button, Text, TextInput} from '../../tool-components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NewTaleStackParamList} from '../../../App';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {updateStringPropertyAsync} from '../../redux/newTaleSlice';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {removeUserAndTokenAsync} from '../../redux/userSlice';

export const NewTaleTitle = () => {
  const navigation =
    useNavigation<StackNavigationProp<NewTaleStackParamList, 'Title'>>();
  const tale = useSelector((state: RootState) => state.newTale);
  const dispatch: AppDispatch = useDispatch();
  const [localTitle, setLocalTitle] = useState(tale?.title || '');
  const {t, i18n} = useTranslation();

  useEffect(() => {
    setLocalTitle(tale?.title || '');
  }, [tale?.title]);

  const handleNext = () => {
    dispatch(updateStringPropertyAsync({property: 'title', value: localTitle}));
    navigation.navigate('Image');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text fontType="boldFont" style={{fontSize: 18, marginBottom: 20}}>
        {t('What name do you give to your tale?')}
      </Text>
      <TextInput
        value={localTitle}
        maxLength={30}
        style={{width: '80%'}}
        onChangeText={setLocalTitle}
      />
      <Button
        style={{width: 100, marginTop: 20}}
        title={t('Next')}
        onPress={handleNext}
      />
    </View>
  );
};
