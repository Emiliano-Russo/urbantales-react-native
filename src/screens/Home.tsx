import { useEffect, useState } from "react";
import { LatLng, Region } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { SafeAreaView, View } from "react-native";
import { ITale } from "../interfaces/Tale";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateMapFilters } from "../redux/userSlice";
import { API_URL, MAX_ZOOM_LEVEL_FOR_STORIES } from "@env";
import { MapButtonPlus } from "../components/MapButtonPlus";
import { ReponseTaleRead, TaleService } from "../services/tale.service";
import { HomeHeader } from "../components/HomeHeader";
import { HomeMap } from "../components/HomeMap";
import { calculateDistance } from "../utils/math";
import { HomeModalManager } from "../components/HomeModalManager";

const taleService = new TaleService(API_URL);

export const Home = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [tales, setTales] = useState<ITale[]>([]);
  const [selectingLocation, setSelectingLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<null | LatLng>(null);
  const [modalSignInNow, setModalSignInNow] = useState(false);
  const [modalFilters, setModalFilters] = useState(false);
  const [showAlertZoom, setShowAlertZoom] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [lastCheckpoint, setLastCheckpoint] = useState<LatLng>({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [talesRead, setTalesRead] = useState<ReponseTaleRead[]>([]);

  const { user, mapFilters, hasSeenPremiumOffer } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    (async () => {
      // Solicitar permisos y obtener la posición actual
      Geolocation.getCurrentPosition(
        (position) => {
          setRegion({
            ...region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          // Manejar posibles errores
          console.error(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    })();
  }, []);

  const onRegionChangeComplete = (region: Region) => {
    const distance = calculateDistance(
      lastCheckpoint.latitude,
      lastCheckpoint.longitude,
      region.latitude,
      region.longitude
    );
    if (region.latitudeDelta > MAX_ZOOM_LEVEL_FOR_STORIES) {
      setShowAlertZoom(true);
      return;
    } else {
      setShowAlertZoom(false);
    }
    if (distance > 10) {
      setLastCheckpoint({ latitude: region.latitude, longitude: region.longitude });
      // Actualizar coordenadas en el backend
      setShowLoading(true);
      taleService
        .getAllInArea(
          region.latitude,
          region.longitude,
          10,
          1,
          20,
          mapFilters.category,
          user && mapFilters.hideRead == true ? { hideRead: mapFilters.hideRead, userId: user.id } : undefined
        )
        .then((newTalesResponse) => {
          const existingTalesSet = new Set(tales.map((tale) => tale.id));
          const newTales = newTalesResponse.items.filter((tale) => !existingTalesSet.has(tale.id));
          setTales([...tales, ...newTales]);
        })
        .catch((error) => {
          console.error("error fetching tales");
        })
        .finally(() => {
          setShowLoading(false);
        });
    }
  };

  const handleMapPress = (event) => {
    if (selectingLocation) {
      const location = event.nativeEvent.coordinate;
      setSelectedLocation(location); // Almacena la ubicación en el estado
      setSelectingLocation(false); // Termina el proceso de selección
    } else {
      setSelectedLocation(null);
    }
  };

  const handleNarrarPress = () => {
    if (user) {
      setSelectingLocation(true);
      setSelectedLocation(null);
    } else {
      setModalSignInNow(true);
    }
  };

  const handleOpenFilters = () => {
    setModalFilters(true);
  };

  const fetchMyReads = async () => {
    try {
      const res = await taleService.getMyReads();
      setTalesRead(res);
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  const applyFilters = async (category: string, hideRead: boolean) => {
    dispatch(updateMapFilters({ category: category, hideRead: hideRead }));
    const talesReadResponse = await fetchMyReads();
    setTalesRead(talesReadResponse || []);
    setTales((prev) => {
      let filters = prev;
      if (category != "Any") filters = prev.filter((tale) => tale.category === category);
      if (hideRead && talesReadResponse)
        filters = filters.filter((tale) => talesReadResponse.findIndex((taleRead) => taleRead.id == tale.id) == -1);
      return filters;
    });
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <HomeModalManager
        applyFilters={applyFilters}
        hasSeenPremiumOffer={hasSeenPremiumOffer}
        modalFilters={modalFilters}
        modalSignInNow={modalSignInNow}
        setModalFilters={setModalFilters}
        setModalSignInNow={setModalSignInNow}
      />
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          marginTop: 10,
        }}
      >
        <HomeHeader handleOpenFilters={handleOpenFilters} />
        <HomeMap
          handleMapPress={handleMapPress}
          onRegionChangeComplete={onRegionChangeComplete}
          region={region}
          selectedLocation={selectedLocation}
          selectingLocation={selectingLocation}
          setSelectedLocation={setSelectedLocation}
          showAlertZoom={showAlertZoom}
          showLoading={showLoading}
          tales={tales}
        />
      </View>
      <MapButtonPlus handleNarrarPress={handleNarrarPress} />
    </View>
  );
};
