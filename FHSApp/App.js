/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {createStackNavigator} from "react-navigation-stack";
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {PersistGate} from 'redux-persist/integration/react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IoIcon from 'react-native-vector-icons/Ionicons';
import UserIcon from 'react-native-vector-icons/AntDesign';
import SettingsIcon from 'react-native-vector-icons/SimpleLineIcons';
import configureStore from './src/store';

import HomeScreen from "./src/screens/HomeScreen";
import IoTScreen from "./src/screens/IoTScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import RecommendationsScreen from "./src/screens/RecommendationsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import RegisterScreen1 from "./src/screens/RegisterScreen1";
import RegisterScreen2 from "./src/screens/RegisterScreen2";
import RegisterScreen3 from "./src/screens/RegisterScreen3";
import RegisterHomeScreen2 from "./src/screens/RegisterHomeScreen2";
import RegisterHomeScreen1 from "./src/screens/RegisterHomeScreen1";

class App extends Component {


  render() {
    const HomeStack = createStackNavigator({
      Home: HomeScreen,
      RegisterHome1: RegisterHomeScreen1,
      RegisterHome2: RegisterHomeScreen2
  });
     HomeStack.navigationOptions = ({navigation}) => {
      return {
        title: 'Home',
        tabBarIcon: ({tintColor}) => <UserIcon name='home' size={30} color={tintColor}/>,
      };
    };
    const IoTStack = createStackNavigator({
      IoT: IoTScreen
  });
    IoTStack.navigationOptions = ({navigation}) => {
      return {
        title: 'IoT',
        tabBarIcon: ({tintColor}) => <Icon name='devices-other' size={30} color={tintColor}/>,
      };
    };
    const NotificationsStack = createStackNavigator({
      Notifications: NotificationsScreen,
      Recommendations: RecommendationsScreen
    });
    NotificationsStack.navigationOptions = ({navigation}) => {
      return {
        title: 'Notifications',
        tabBarIcon: ({tintColor}) => <IoIcon name='ios-notifications-outline' size={30} color={tintColor}/>,
      };
    };
    const SettingsStack = createStackNavigator({
      Settings: SettingsScreen
    });
    SettingsStack.navigationOptions = ({navigation}) => {
      return {
        title: 'Settings',
        tabBarIcon: ({tintColor}) => <SettingsIcon name='settings' size={30} color={tintColor}/>,
      };
    };

    const MainNavigator = createSwitchNavigator({
       Auth: createStackNavigator({
        Login: LoginScreen,
         Register1: RegisterScreen1,
         Register2: RegisterScreen2,
         Register3: RegisterScreen3
      }),

      App: createBottomTabNavigator({
        HomeStack,
        IoTStack,
        NotificationsStack,
        SettingsStack,
      }, {
        tabBarOptions: {
          activeTintColor: '#19E57F',
          inActiveTintColor: 'grey',
        }
      })
    });

      const AppContainer = createAppContainer(MainNavigator);
      const {persistor, store} = configureStore();
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
