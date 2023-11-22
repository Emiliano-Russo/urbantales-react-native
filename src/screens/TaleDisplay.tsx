import {RouteProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Text} from '../tool-components/index';
import {TaleStackParamList} from '../../App';
import {ITale, ITaleCreate} from '../interfaces/Tale';
import {Button} from '../tool-components';
import {useTranslation} from 'react-i18next';
import {TaleService} from '../services/tale.service';
import {API_URL} from '@env';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {removeTaleAsync} from '../redux/newTaleSlice';
import {ReactionBox} from '../components/ReactionBox';
import {categoryColors} from '../interfaces/Categories';
import * as Animatable from 'react-native-animatable';
import {TypewriterText} from '../components/TypeWriter';
import {updateStringPropertyAsync} from '../redux/userSlice';

type TaleDisplayRouteProp = RouteProp<TaleStackParamList, 'TaleDisplay'>;

interface TaleDisplayProps {
  route: TaleDisplayRouteProp;
}

const taleService = new TaleService(API_URL);

export const TaleDisplay: React.FC<TaleDisplayProps> = ({route}) => {
  const creationalTale = route.params.tale;
  const taleId = route.params.taleId;
  const isCreation = route.params.isCreation;

  const {t} = useTranslation();
  const [tale, setTale] = useState<ITale | undefined>(undefined);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showReadButton, setShowReadButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const navigation =
    useNavigation<StackNavigationProp<TaleStackParamList, 'TaleDisplay'>>();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!isCreation && taleId) {
      //we need to get the tale from the server
      console.log('getting from server!');
      taleService
        .getTale(taleId)
        .then(res => {
          console.log('res: ', res);
          setTale(res);
        })
        .catch(err => {
          console.error('error: ', err);
        });
    } else if (isCreation && creationalTale != undefined) {
      //this is for preview purposes (before creation)
      setTale({
        category: creationalTale.category,
        image: creationalTale.image,
        isAnonymous: creationalTale.isAnonymous,
        latitude: creationalTale.latitude,
        longitude: creationalTale.longitude,
        mark: creationalTale.mark,
        narrative: creationalTale.narrative,
        title: creationalTale.title,
        //the rest is invented
        createdAt: new Date(),
        dislikesCount: 0,
        id: '1',
        likesCount: 0,
        reads: [],
      });
    }
  }, []);

  useEffect(() => {
    if (isCreation == false) {
      const timer = setTimeout(() => {
        setShowReadButton(true);
      }, 3000);

      return () => clearTimeout(timer); // Limpieza del timer
    }
  }, [isCreation]);

  if (tale == undefined) {
    return (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 23, marginBottom: 20}}>{t('Loading...')}</Text>
        <ActivityIndicator />
      </View>
    );
  }

  const createTale = async () => {
    setIsLoading(true);
    taleService
      .createTale(tale)
      .then(res => {
        // Ajustar el mensaje de éxito según sea necesario
        console.log('tale created: ', res);
        dispatch(removeTaleAsync());
        setAlertMessage(t('Your story has been successfully created!'));
        setAlertVisible(true); // Mostrar la alerta
      })
      .catch(err => {
        // Ajustar el mensaje de error según sea necesario
        const errorCode = err.response?.data?.errorCode;
        const errorMessage = err.response?.data?.message;
        // Ajustar el mensaje de error según el código de error
        let userMessage = t('There was an error in creating your story.');
        if (errorCode === 'ERROR_LIMIT_REACHED') {
          userMessage = t('You have reached your weekly limit of tales.');
        } else if (errorCode === 'ERROR_NOT_PREMIUM') {
          userMessage = t('User not premimum to create anonymous tale.');
        }
        console.error(
          'error creating tale: ',
          err.response.status,
          errorMessage,
        );
        setAlertMessage(userMessage);
        setAlertVisible(true); // Mostrar la alerta
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
    setAlertVisible(false);
  };

  console.log('USER: ', user.user);

  const markAsRead = () => {
    if (taleId == undefined) return;
    taleService
      .markAsRead(taleId)
      .then(res => {
        console.log('tale marked as read: ', res);
        setAlertMessage(t('Your story has been marked as read!'));
        setAlertVisible(true); // Mostrar la alerta
        const reads = user.user?.taleReads;
        if (reads)
          dispatch(
            updateStringPropertyAsync({
              property: 'taleReads',
              value: [...reads, {tale: tale}],
            }),
          );
      })
      .catch(err => {
        console.log('error marking tale as read: ', err);
        setAlertMessage(t('There was an error in marking your story as read.'));
        setAlertVisible(true); // Mostrar la alerta
      });
  };

  const colorCategory = categoryColors.find(c => c.name === tale.category);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Animatable.View
          useNativeDriver={true}
          animation={{
            from: {translateX: -Dimensions.get('window').width}, // Comenzar fuera de la pantalla
            to: {translateX: 0}, // Terminar dentro de la pantalla
          }}
          duration={800}
          delay={100}
          style={styles.title}>
          <Text fontType="boldFont" style={styles.title}>
            {tale.title}
          </Text>
        </Animatable.View>
        <Animatable.Image
          animation={{
            from: {translateX: -Dimensions.get('window').width}, // Comenzar fuera de la pantalla
            to: {translateX: 0}, // Terminar dentro de la pantalla
          }}
          duration={800}
          delay={300}
          source={{uri: tale.image}}
          style={styles.image}
          useNativeDriver={true}
        />
        <Animatable.View
          useNativeDriver={true}
          animation={{
            from: {translateX: -Dimensions.get('window').width}, // Comenzar fuera de la pantalla
            to: {translateX: 0}, // Terminar dentro de la pantalla
          }}
          duration={800}
          delay={500}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{borderRadius: 20, backgroundColor: colorCategory?.bgColor}}>
            <Text
              style={{
                fontSize: 12,
                padding: 10,
                textAlign: 'center',
                color: colorCategory?.textColor,
                borderWidth: 1,
                borderColor: colorCategory?.borderColor,
                borderRadius: 20,
              }}>
              {t(tale.category)}
            </Text>
          </View>
          {taleId && (
            <ReactionBox
              taleId={taleId}
              dislikes={tale.dislikesCount}
              likes={tale.likesCount}
              onReacton={(like: boolean) => {
                setTale(prev => {
                  if (!prev) return undefined;
                  const taleClon = {...prev};
                  if (like) taleClon.likesCount = taleClon.likesCount + 1;
                  else taleClon.dislikesCount = taleClon.dislikesCount + 1;
                  return taleClon;
                });
              }}
            />
          )}
        </Animatable.View>
        {isCreation == false && (
          <Animatable.Text
            useNativeDriver={true}
            animation={{
              from: {translateX: -Dimensions.get('window').width}, // Comenzar fuera de la pantalla
              to: {translateX: 0}, // Terminar dentro de la pantalla
            }}
            duration={800}
            delay={500}
            style={{marginTop: 40, color: 'gray', fontSize: 12}}>
            By {tale.isAnonymous ? 'Anonymous' : tale.user?.name}
          </Animatable.Text>
        )}

        <Animatable.Text
          useNativeDriver={true}
          animation={{
            from: {translateX: -Dimensions.get('window').width}, // Comenzar fuera de la pantalla
            to: {translateX: 0}, // Terminar dentro de la pantalla
          }}
          duration={800}
          delay={900}
          style={{
            marginTop: 20,
            fontSize: 16,
            marginBottom: 20,
            textAlign: 'justify',
          }}>
          {tale.narrative}
        </Animatable.Text>
        {showReadButton && (
          <Button
            isLoading={isLoading}
            style={styles.readButton}
            title={t('Mark as Read')}
            onPress={markAsRead}
          />
        )}
      </ScrollView>

      {route.params.isCreation && (
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            alignSelf: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <Button
            isLoading={isLoading}
            title={t('Send')}
            style={{width: '50%', opacity: 0.9}}
            onPress={createTale}
          />
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={alertVisible}
        onRequestClose={() => {
          setAlertVisible(!alertVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{alertMessage}</Text>
            <TouchableOpacity style={styles.button} onPress={handleGoHome}>
              <Text style={styles.buttonText}>Volver al Inicio</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    position: 'relative',
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  category: {},
  narrative: {
    marginTop: 20,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justify',
  },
  coordinates: {
    fontSize: 14,
    color: 'gray',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Negro con opacidad
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3', // Puedes cambiar el color según tu tema
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  reportButtonContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc', // Use a light color that matches your theme
  },
  readButton: {
    backgroundColor: 'green', // Color de fondo
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
