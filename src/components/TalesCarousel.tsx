import React from 'react';
import {
  View,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Text} from '../tool-components/index';
import {TaleBox} from './TaleBox';
import {useTranslation} from 'react-i18next';
const backgroundImage = require('../../assets/backgroundRegister.png');

interface Tales {
  id: string;
  title: string;
  image: string;
}

interface Props {
  title: string;
  tales: Tales[];
  emptyColor?: string;
  onPress: (id: string) => void;
}

export const TalesCarousel = (props: Props) => {
  const {t} = useTranslation();

  return (
    <View
      style={{
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
      }}>
      {props.tales === undefined ||
        (props.tales.length === 0 && (
          <View
            style={{
              backgroundColor: props.emptyColor ? props.emptyColor : '#efffff',
              height: 100,
              width: '90%',
              borderRadius: 10,
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'black'}}>{t('Empty')}</Text>
          </View>
        ))}
      <FlatList
        numColumns={2}
        data={props.tales}
        contentContainerStyle={{alignItems: 'center', paddingHorizontal: 20}}
        renderItem={({item}) => (
          <TaleBox
            image={item.image}
            title={item.title}
            onPress={() => {
              props.onPress(item.id);
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
