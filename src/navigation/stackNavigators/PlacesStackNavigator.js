import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CapturePlacesScreen from '../../screens/places';
import PredictionDetailsScreen from '../../screens/places/PredictionDetailsScreen';

const Stack = createNativeStackNavigator();

const PlacesStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="capturePlace" component={CapturePlacesScreen} />
      <Stack.Screen
        name="PredictionDetails"
        component={PredictionDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default PlacesStackNavigator;
