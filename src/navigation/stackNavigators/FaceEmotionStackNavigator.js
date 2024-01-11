import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FaceEmotionDetectionHomeScreen from '../../screens/face';
import PredictionOutputScreen from '../../screens/face/PredictionOutputScreen';

const Stack = createNativeStackNavigator();

const WaterQualityStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={FaceEmotionDetectionHomeScreen} />
      <Stack.Screen
        name="PredictionOutputScreen"
        component={PredictionOutputScreen}
      />
    </Stack.Navigator>
  );
};

export default WaterQualityStackNavigator;
