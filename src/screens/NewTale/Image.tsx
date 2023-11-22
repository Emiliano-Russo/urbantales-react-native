import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {NewTaleStackParamList} from '../../../App';
import {Button, Text} from '../../tool-components';
import {Picker} from '@react-native-picker/picker';
import {useState} from 'react';
import {updateStringPropertyAsync} from '../../redux/newTaleSlice';
import {AppDispatch, RootState} from '../../redux/store';
import {useTranslation} from 'react-i18next';

export const NewTaleImage = () => {
  const {t, i18n} = useTranslation();
  const navigation =
    useNavigation<StackNavigationProp<NewTaleStackParamList, 'Image'>>();

  const newTale = useSelector((state: RootState) => state.newTale);

  const selectImage = (link: string) => {
    saveImage(link);
  };

  const imageLinks = [
    //love
    'https://i.pinimg.com/564x/87/c3/f6/87c3f68733f3ae451b67842d7d8c0167.jpg',
    'https://i.pinimg.com/564x/c2/66/93/c266932cc94238fe449ef1b4068754cd.jpg',
    'https://i.pinimg.com/564x/4a/c8/11/4ac8112badd8b745bc547f52c0ad4828.jpg',
    //humor
    'https://i.pinimg.com/564x/26/08/00/260800a5c7f11e26c5e7e4e039c0ec04.jpg',
    'https://i.pinimg.com/564x/d7/a6/21/d7a621bb06fd3bfbedb29abb3cb42cb1.jpg',
    //sad
    'https://i.pinimg.com/564x/c9/ef/dd/c9efddc9eebe3ffe3fe54e820009dbfa.jpg',
    'https://i.pinimg.com/564x/7d/8a/e5/7d8ae5c807eafedbdaa0e6f88ebab0be.jpg',
    //terror
    'https://i.pinimg.com/564x/e7/8f/69/e78f698dd22929ff515aafd6c7f2d4ab.jpg',
    'https://i.pinimg.com/736x/ad/ca/8b/adca8b0d34e074d517fc5ccf6017af23.jpg',
    'https://i.pinimg.com/736x/a8/b8/bd/a8b8bde23c3788bc8e58da76eccbd580.jpg',
    'https://i.pinimg.com/564x/d8/73/15/d87315d91a748873cd45e5888fb5e038.jpg',
    //anger
    'https://i.pinimg.com/564x/9d/19/78/9d19781fbee4e907739f530b448828eb.jpg',
    //surpirse
    'https://i.pinimg.com/564x/9e/f4/e1/9ef4e158b7ca9ac08fe57644eefa09f3.jpg',
    'https://i.pinimg.com/736x/38/76/66/3876661f80691aca8f73c9a7f02c8353.jpg',
    //nostalgia
    'https://i.pinimg.com/564x/d8/52/1e/d8521e544acad826aca5fbe153d8c57f.jpg',
    //euphoria
    'https://i.pinimg.com/564x/96/b3/93/96b393ce421f725908efac2a417167c3.jpg',
    'https://i.pinimg.com/564x/0a/76/df/0a76df6bf4339e26870e64dd3b4a9d5a.jpg',
    //mystery
    'https://i.pinimg.com/564x/e9/06/93/e9069364228aa53156b031125dc23392.jpg',
    //adventure
    'https://i.pinimg.com/736x/4a/05/b1/4a05b176175fe8ace75e68262057ab25.jpg',
    //reflection
    'https://i.pinimg.com/736x/1a/b7/55/1ab7559ce193685db71131a30d8acfb9.jpg',
    'https://i.pinimg.com/736x/74/a9/ce/74a9cee8d5a0e0434fa02c7522b68cfd.jpg',
  ];
  const tale = useSelector((state: RootState) => state.newTale);
  const dispatch: AppDispatch = useDispatch();

  const handleNext = () => {
    navigation.navigate('Narration');
  };

  const saveImage = (link: string) => {
    dispatch(updateStringPropertyAsync({property: 'image', value: link}));
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text fontType="boldFont" style={{fontSize: 18}}>
        {t('Select a Cover')}
      </Text>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {imageLinks.map((link, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => selectImage(link)}
            style={[
              styles.imageWrapper,
              newTale.image === link && styles.selectedImageWrapper,
            ]}>
            <Image source={{uri: link}} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Button
        title={t('Next')}
        onPress={handleNext}
        style={{width: 100, marginTop: 20, marginBottom: 20}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageWrapper: {
    margin: 10,
    borderRadius: 20,
  },
  selectedImageWrapper: {
    borderWidth: 3,
    borderColor: 'blue',
  },
  image: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    borderRadius: 20,
  },
});
