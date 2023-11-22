import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Button, Text} from '../tool-components/index';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {BoxSignInNowProfile} from '../components/BoxSignInNowProfile';
import {BoxLetsGoPremium} from '../components/BoxLetsGoPremium';
import {BoxUserName} from '../components/BoxUserName';
import {Tabs} from '../components/Tabs';
import {TalesCarousel} from '../components/TalesCarousel';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileStackParamList, TaleStackParamList} from '../../App';
import {UserService} from '../services/user.service';
import {API_URL} from '@env';
import {TaleService} from '../services/tale.service';
import {use} from 'i18next';

const crown = require('../../assets/premium_crown.png');

const userService = new UserService(API_URL);
const taleService = new TaleService(API_URL);

export const Profile = () => {
  const {t, i18n} = useTranslation();
  const [talesRead, setTalesRead] = useState<any>([]);
  const [likedTales, setLikedTales] = useState<any>();
  const [myTales, setMyTales] = useState<any>([]);
  const user = useSelector((state: RootState) => state.user.user);
  const navigation =
    useNavigation<StackNavigationProp<ProfileStackParamList, 'Profile'>>();
  const navigationTalStack =
    useNavigation<StackNavigationProp<TaleStackParamList, 'Home'>>();
  const openSettings = () => {
    console.log('Open Settings');
    navigation.navigate('Settings');
  };

  useFocusEffect(
    useCallback(() => {
      console.log('Profile Screen');
      const fetchMyReads = async () => {
        try {
          const res = await taleService.getMyReads();
          console.log('My Reads', res);
          setTalesRead(res);
        } catch (err) {
          console.error(err);
        }
      };

      const fetchMyFavorites = async () => {
        try {
          const res = await taleService.getMyFavorites();
          console.log('My Favorites', res);
          setLikedTales(res);
        } catch (err) {
          console.error(err);
        }
      };

      const fetchMyTales = async () => {
        try {
          const res = await taleService.getMyTales();
          console.log('My Tales', res);
          setMyTales(res);
        } catch (err) {
          console.error(err);
        }
      };

      if (user) {
        fetchMyReads();
        fetchMyFavorites();
        fetchMyTales();
      } else {
        console.log('No user');
      }
      // Dependencias del useCallback
    }, []),
  );

  const Read = () => {
    return (
      <TalesCarousel
        title={t('Tales Read')}
        tales={talesRead}
        onPress={(id: string) => {
          console.log('Tale ID', id);
          navigationTalStack.navigate('TaleDisplay', {taleId: id});
        }}
      />
    );
  };
  const Liked = () => {
    return (
      <TalesCarousel
        title={t('Liked Tales')}
        tales={likedTales}
        onPress={(id: string) => {
          console.log('Tale ID', id);
          navigationTalStack.navigate('TaleDisplay', {taleId: id});
        }}
      />
    );
  };
  const Creations = () => {
    return (
      <TalesCarousel
        title={t('Creations')}
        tales={myTales}
        onPress={(id: string) => {
          console.log('Tale ID', id);
          navigationTalStack.navigate('TaleDisplay', {taleId: id});
        }}
      />
    );
  };

  console.log('user subscriptions: ', user?.subscription);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
          justifyContent: 'flex-start',
          flex: 1,
        }}>
        {user &&
        user.subscription &&
        user.subscription &&
        user.subscription.status == 'active' ? (
          <>
            <Image
              source={crown}
              style={{width: 60, height: 60, marginTop: 30}}
            />
            <Text style={{color: 'rgb(230, 184, 0)', marginBottom: 10}}>
              Premium
            </Text>
          </>
        ) : (
          <BoxLetsGoPremium />
        )}
        {user && user != null ? (
          <BoxUserName name={user.name} onClick={openSettings} />
        ) : (
          <BoxSignInNowProfile />
        )}
        <Tabs
          screens={[
            {title: t('Read'), component: Read},
            {title: t('Favorites'), component: Liked},
            {title: t('Creations'), component: Creations},
          ]}
        />
      </View>
    </View>
  );
};
