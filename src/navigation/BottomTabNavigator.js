import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStackNavigator from './stackNavigators/HomeStackNavigator';
import SettingsStackNavigator from './stackNavigators/SettingsStackNavigator';
import LocationStackNavigator from './stackNavigators/LocationStackNavigator';
import PlacesStackNavigator from './stackNavigators/PlacesStackNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../core/theme';
import FaceEmotionStackNavigator from './stackNavigators/FaceEmotionStackNavigator';

const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Map':
      iconName = 'google-maps';
      break;
    case 'Places':
      iconName = 'magnify-expand';
      break;
    case 'FaceEmotion':
      iconName = 'face-recognition';
      break;
    case 'Settings':
      iconName = 'menu';
      break;
    default:
      break;
  }

  return <Icon name={iconName} color={color} size={30} />;
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => screenOptions(route, color),
        headerShown: false,
        tabBarStyle: {
          // backgroundColor: '#213B71',
          backgroundColor: theme.colors.tabBarBackground,
          // backgroundColor: '#7b6bc3',
          borderTopColor: theme.colors.inactive,
          height: 70,
        },
        tabBarActiveTintColor: theme.colors.active,
        tabBarInactiveTintColor: theme.colors.inactive,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      })}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Map" component={LocationStackNavigator} />
      <Tab.Screen name="Places" component={PlacesStackNavigator} />
      <Tab.Screen name="FaceEmotion" component={FaceEmotionStackNavigator} />
      <Tab.Screen name="Settings" component={SettingsStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
