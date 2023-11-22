import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {TaleBox} from '../components/TaleBox';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {TaleService} from '../services/tale.service';
import {API_URL} from '@env';
import {ITaleMini} from '../interfaces/Tale';
import {StackNavigationProp} from '@react-navigation/stack';
import {TaleStackParamList} from '../../App';

const taleService = new TaleService(API_URL);

export const Highlights = () => {
  const navigationTalStack =
    useNavigation<StackNavigationProp<TaleStackParamList, 'Home'>>();
  const [tales, setTales] = useState<ITaleMini[]>([]);

  const fetchTopLikedTales = useCallback(() => {
    taleService.getTopLiked().then(res => {
      setTales(res);
    });
  }, []);

  useFocusEffect(fetchTopLikedTales);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        numColumns={3}
        data={tales}
        contentContainerStyle={{alignItems: 'center'}}
        renderItem={({item}) => (
          <TaleBox
            image={item.image}
            title={item.title}
            onPress={() => {
              navigationTalStack.navigate('TaleDisplay', {taleId: item.id});
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
