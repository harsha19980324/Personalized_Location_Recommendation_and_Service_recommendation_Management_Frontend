import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home';
import Chat from '../../screens/chat/chat';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;