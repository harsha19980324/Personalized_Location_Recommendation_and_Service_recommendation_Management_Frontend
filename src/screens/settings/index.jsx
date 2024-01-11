import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

const SettingsScreen = () => {
  const signout = () => {
    auth()
      .signOut()
      .catch(err => {
        console.log('error while signout!', err);
      });
  };

  return (
    <View style={styles.content}>
      <Pressable
        onPress={() => {
          signout();
        }}
        style={styles.row}>
        <Icon name="logout" color="#000" size={40} />
        <Text style={styles.text}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 30,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  text: {
    fontSize: 22,
  },
});
