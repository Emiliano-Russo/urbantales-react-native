import React from 'react';
import MapView, {Marker, Callout, LatLng, Region} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TaleStackParamList} from '../../App';
import {View} from 'react-native';
import {Text} from '../tool-components/index';
import customMapStyle from '../../assets/map-aubergine.json';
import {useTranslation} from 'react-i18next';
import {ITale} from '../interfaces/Tale';
import {updateCoordinatesAsync} from '../redux/newTaleSlice';
import {AppDispatch} from '../redux/store';
import {useDispatch} from 'react-redux';
import {MapLoadingDots} from './MapLoadingDots';
import {MapSelection} from './MapSelection';
import {MapAlertZoomOut} from './MapAlertZoomOut';
import {findMark} from '../../marks';

interface Props {
  onRegionChangeComplete: (region: Region) => void;
  region: Region;
  handleMapPress: (event: any) => void;
  selectedLocation: LatLng | null;
  tales: ITale[];
  showLoading: boolean;
  showAlertZoom: boolean;
  selectingLocation: boolean;
  setSelectedLocation: React.Dispatch<React.SetStateAction<LatLng | null>>;
}

export const HomeMap = (props: Props) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<StackNavigationProp<TaleStackParamList, 'Home'>>();
  const dispatch = useDispatch<AppDispatch>();
  const shareYourTale: string = t('Share your tale!');
  const selectLocationOnTheMap: string = t('Select a location on the map');

  const saveCoordinates = (latitude: string, longitude: string) => {
    dispatch(updateCoordinatesAsync({latitude, longitude}));
  };

  return (
    <View>
      <MapView
        onRegionChangeComplete={props.onRegionChangeComplete}
        showsMyLocationButton={true}
        showsUserLocation={true}
        style={{width: '100%', height: '100%'}}
        region={props.region}
        customMapStyle={customMapStyle}
        onPress={props.handleMapPress} // Nuevo evento onPress
      >
        {props.selectedLocation && (
          <Marker
            coordinate={props.selectedLocation}
            title={t('Ubicación seleccionada')}
          />
        )}
        {props.tales.map((tale, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(tale.latitude),
              longitude: parseFloat(tale.longitude),
            }}
            title={tale.title}
            icon={findMark(tale.mark)?.image}>
            <Callout
              style={{
                alignItems: 'center',
              }}
              onPress={() =>
                navigation.navigate('TaleDisplay', {
                  tale: tale,
                  isCreation: false,
                  taleId: tale.id,
                })
              }>
              <View style={{maxHeight: 50}}>
                <Text style={{fontWeight: 'bold'}}>{tale.title}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {props.showLoading && <MapLoadingDots />}
      {props.showAlertZoom && <MapAlertZoomOut />}

      {(props.selectingLocation || props.selectedLocation) && (
        <MapSelection
          navigation={navigation}
          saveCoordinates={saveCoordinates}
          selectLocationOnTheMap={selectLocationOnTheMap}
          selectedLocation={props.selectedLocation}
          setSelectedLocation={props.setSelectedLocation}
          shareYourTale={shareYourTale}
        />
      )}
    </View>
  );
};
