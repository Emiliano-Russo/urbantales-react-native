import {ScrollView, View, Image, TouchableOpacity} from 'react-native';
import {Button, Text} from '../../tool-components';
import {useTranslation} from 'react-i18next';
import {Tabs} from '../../components/Tabs';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NewTaleStackParamList} from '../../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {updateStringPropertyAsync} from '../../redux/newTaleSlice';
import {markStandar, premiumMarks} from '../../../marks';
import {ModalPremium} from '../../components/ModalPremium';

export const NewTaleMark = () => {
  const {t, i18n} = useTranslation();
  const navigation =
    useNavigation<StackNavigationProp<NewTaleStackParamList, 'Mark'>>();
  const dispatch: AppDispatch = useDispatch();
  const selectedMark = useSelector((state: RootState) => state.newTale.mark);
  const user = useSelector((state: RootState) => state.user.user);

  const StandarMarks = () => {
    return (
      <View>
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {markStandar.map(mark => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      updateStringPropertyAsync({
                        property: 'mark',
                        value: mark.name,
                      }),
                    );
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 60,
                    borderColor: selectedMark === mark.name ? 'black' : 'white',
                    backgroundColor:
                      selectedMark === mark.name
                        ? 'rgba(0, 0, 0, 0.2)'
                        : 'trasparent',
                  }}>
                  <Image
                    style={{margin: 20, width: 40, height: 40}}
                    source={mark.image}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const PremiumMarks = () => {
    const [showModalPremium, setShowModalPremium] = useState(false);

    return (
      <View>
        <ModalPremium
          isModalVisible={showModalPremium}
          setModalVisible={setShowModalPremium}
        />
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {premiumMarks.map(mark => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    if (user!.subscription === undefined)
                      setShowModalPremium(true);
                    else
                      dispatch(
                        updateStringPropertyAsync({
                          property: 'mark',
                          value: mark.name,
                        }),
                      );
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 60,
                    borderColor: selectedMark === mark.name ? 'black' : 'white',
                    backgroundColor:
                      selectedMark === mark.name
                        ? 'rgba(0, 0, 0, 0.2)'
                        : 'trasparent',
                  }}>
                  <Image
                    style={{margin: 20, width: 40, height: 40}}
                    source={mark.image}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <Tabs
        screens={[
          {title: t('Standar'), component: StandarMarks},
          {title: 'Premium', component: PremiumMarks},
        ]}
      />
      <Button
        title={t('Next')}
        onPress={() => navigation.navigate('Category')}
        style={{width: 100, marginTop: 20, marginBottom: 20}}
      />
    </View>
  );
};
