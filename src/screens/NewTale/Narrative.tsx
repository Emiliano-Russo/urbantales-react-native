import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Button, Text} from '../../tool-components/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {NewTaleStackParamList} from '../../../App';
import {AppDispatch, RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {updateStringPropertyAsync} from '../../redux/newTaleSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

const backgroundImage = require('../../../assets/paper.png');

const {height} = Dimensions.get('window');

export const NewTaleNarrative = () => {
  const tale = useSelector((state: RootState) => state.newTale);
  const {t, i18n} = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [narrative, setNarrative] = useState(tale.narrative);
  const navigation =
    useNavigation<StackNavigationProp<NewTaleStackParamList, 'Narration'>>();

  const saveNarrative = () => {
    dispatch(
      updateStringPropertyAsync({property: 'narrative', value: narrative}),
    );
    setHasUnsavedChanges(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title} fontType="boldFont">
        {tale.title}
      </Text>
      {hasUnsavedChanges && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 20,
            top: 20,
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
          onPress={() => saveNarrative()}>
          <Ionicons name="save" size={30} color="#9400D3" />
        </TouchableOpacity>
      )}
      <TextInput
        value={narrative}
        onChangeText={text => {
          setNarrative(text);
          setHasUnsavedChanges(true);
        }}
        multiline
        style={styles.textInput}
        placeholder="Start writing your tale here..."
      />
      <Text style={{textAlign: 'right'}}>{tale.narrative.length}/8000</Text>

      <Button
        onPress={() => navigation.navigate('Anonymous')}
        title={t('Next')}
        style={{marginTop: 50, width: 100, alignSelf: 'center'}}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
    paddingBottom: 10,
  },
  textInput: {
    height: height / 2, // Establece una altura fija para el TextInput
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 10,
    fontFamily: 'regularFont',
    backgroundColor: 'rgba(255,255,255,0.6)', // Ligeramente transparente para mejor legibilidad
    textAlignVertical: 'top', // Asegura que el texto comience desde la parte superior
  },
});
