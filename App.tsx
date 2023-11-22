import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity, StatusBar} from 'react-native';
import {useTranslation} from 'react-i18next';
import './i18next';
import {Text} from './src/tool-components/Text';
import {TaleDisplay} from './src/screens/TaleDisplay';
import {Highlights} from './src/screens/HighlightedStories';
import {Profile} from './src/screens/Profile';
import {Home} from './src/screens/Home';
import {SignIn} from './src/screens/auth/SignIn';
import {SignUp} from './src/screens/auth/SignUp';
import {WelcomeScreen} from './src/screens/Welcome';
import {LanguageSelectionScreen} from './src/screens/LanguageSelectionScreen ';
import {NewTaleTitle} from './src/screens/NewTale/Title';
import {NewTaleImage} from './src/screens/NewTale/Image';
import {NewTaleNarrative} from './src/screens/NewTale/Narrative';
import {NewTaleCategory} from './src/screens/NewTale/Category';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {ITaleCreate} from './src/interfaces/Tale';
import {AuthWrapper} from './src/wrappers/AuthWrapper';
import {AppInitializer} from './AppInitializer';
import {NewTaleMark} from './src/screens/NewTale/Mark';
import {NewTaleIsAnonymous} from './src/screens/NewTale/IsAnonymous';
import Settings from './src/screens/Settings';
import {EditUser} from './src/screens/EditUser';
import {Support} from './src/screens/Support';
import {Language} from './src/screens/Language';
import {About} from './src/screens/About';
import {DeleteAccount} from './src/screens/DeleteAccount';

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
  Welcome: undefined;
  LanguageSelection: undefined;
};

export type AppTabParamList = {
  Highlights: undefined;
  Home: undefined;
  Profile: undefined;
};

export type TaleStackParamList = {
  Home: undefined;
  TaleDisplay: {tale?: ITaleCreate; isCreation?: boolean; taleId?: string};
  NewTale: undefined;
};

export type NewTaleStackParamList = {
  Title: undefined;
  Image: undefined;
  Narration: undefined;
  Category: undefined;
  Mark: undefined;
  Anonymous: undefined;
  TaleDisplay: {tale: ITaleCreate; isCreation?: boolean};
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
  EditUser: undefined;
  Support: undefined;
  Language: undefined;
  About: undefined;
  DeleteAccount: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const AppTab = createBottomTabNavigator<AppTabParamList>();
const TaleStack = createStackNavigator<TaleStackParamList>();
const NewTaleStack = createStackNavigator<NewTaleStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName="SignIn">
    <AuthStack.Screen name="SignIn" component={SignIn} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
  </AuthStack.Navigator>
);

const NewTaleNavigator = () => {
  const {t} = useTranslation();
  const title = t('Title');
  const image = t('Image');
  const narration = t('Narration');
  const category = t('Category');
  const mark = t('Mark');
  const anonymous = t('Anonymous');

  return (
    <AuthWrapper>
      <NewTaleStack.Navigator>
        <NewTaleStack.Screen
          name="Title"
          component={NewTaleTitle}
          options={{headerTitle: title}}
        />
        <NewTaleStack.Screen
          name="Image"
          component={NewTaleImage}
          options={{headerTitle: image}}
        />
        <NewTaleStack.Screen
          name="Narration"
          component={NewTaleNarrative}
          options={{headerTitle: narration}}
        />
        <NewTaleStack.Screen
          name="Category"
          component={NewTaleCategory}
          options={{headerTitle: category}}
        />
        <NewTaleStack.Screen
          name="Mark"
          component={NewTaleMark}
          options={{headerTitle: mark}}
        />
        <NewTaleStack.Screen
          name="Anonymous"
          component={NewTaleIsAnonymous}
          options={{headerTitle: anonymous}}
        />
      </NewTaleStack.Navigator>
    </AuthWrapper>
  );
};

const TaleNavigator = () => {
  const {t} = useTranslation();
  return (
    <TaleStack.Navigator>
      <TaleStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Urban Tales',
          headerShown: false,
        }}
      />
      <TaleStack.Screen
        name="TaleDisplay"
        component={TaleDisplay}
        options={{title: ''}}
      />
      <TaleStack.Screen
        name="NewTale"
        component={NewTaleNavigator}
        options={{headerShown: false}}
      />
    </TaleStack.Navigator>
  );
};

const ProfileNavigator = () => {
  const {t} = useTranslation();
  const settings = t('Settings');
  const editUser = t('Edit User');
  const support = t('Support');
  const language = t('Language');
  const about = t('About');
  const deleteAccount = t('Delete Account');

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name={'Settings'}
        component={Settings}
        options={{title: settings}}
      />
      <ProfileStack.Screen
        name={'EditUser'}
        component={EditUser}
        options={{title: editUser}}
      />
      <ProfileStack.Screen
        name={'Support'}
        component={Support}
        options={{title: support}}
      />
      <ProfileStack.Screen
        name={'Language'}
        component={Language}
        options={{title: language}}
      />
      <ProfileStack.Screen
        name={'About'}
        component={About}
        options={{title: about}}
      />
      <ProfileStack.Screen
        name={'DeleteAccount'}
        component={DeleteAccount}
        options={{title: deleteAccount}}
      />
    </ProfileStack.Navigator>
  );
};

const AppNavigator = () => {
  const {t} = useTranslation();
  return (
    <AppTab.Navigator initialRouteName="Home">
      <AppTab.Screen
        name="Highlights"
        component={Highlights}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="star" color={color} size={size} />
          ),
          tabBarLabel: ({color, focused}) => (
            <Text style={{color}}>{t('Highlights')}</Text>
          ),
          headerTitle: t('Highlights'),
          headerTitleStyle: {
            fontFamily: 'boldFont', // Estilo del texto del encabezado
          },
        }}
      />
      <AppTab.Screen
        name="Home"
        component={TaleNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="home" color={color} size={size} />
          ),
          tabBarLabel: ({color, focused}) => (
            <Text style={{color}}>{t('Home')}</Text>
          ),
          headerShown: false,
        }}
      />
      <AppTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="user" color={color} size={size} />
          ),
          tabBarLabel: ({color, focused}) => (
            <Text style={{color}}>{t('Profile')}</Text>
          ),
          headerShown: false,
        }}
      />
    </AppTab.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <Provider store={store}>
      <AppInitializer>
        <NavigationContainer>
          <StatusBar backgroundColor="#7D3C98" />
          <RootStack.Navigator
            initialRouteName="LanguageSelection"
            screenOptions={{headerShown: false}}>
            <RootStack.Screen
              name="LanguageSelection"
              component={LanguageSelectionScreen}
            />
            <RootStack.Screen name="Auth" component={AuthNavigator} />
            <RootStack.Screen name="Welcome" component={WelcomeScreen} />
            <RootStack.Screen name="App" component={AppNavigator} />
          </RootStack.Navigator>
        </NavigationContainer>
      </AppInitializer>
    </Provider>
  );
};

export default RootNavigator;
