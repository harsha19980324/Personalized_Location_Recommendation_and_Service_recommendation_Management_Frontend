import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapScreen from '../../screens/map';
import DetectTouristPlacesScreen from '../../screens/map/DetectTouristPlacesScreen';
import TouristPlacesResultScreen from '../../screens/map/TouristPlacesResultScreen';

const Stack = createNativeStackNavigator();

const LocationStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LocationScreen" component={MapScreen} />
      <Stack.Screen
        name="DetectTouristPlaces"
        component={DetectTouristPlacesScreen}
      />
      <Stack.Screen
        name="TouristPlacesResult"
        component={TouristPlacesResultScreen}
      />
    </Stack.Navigator>
  );
};

export default LocationStackNavigator;
