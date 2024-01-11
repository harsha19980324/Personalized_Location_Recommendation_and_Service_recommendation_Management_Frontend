import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../../core/theme';
import Button from '../../components/Button';
import { predictDisease } from '../../services/diseasePrediction.service';
import { Snackbar } from 'react-native-paper';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('user');
  const [dayInfo, setDayInfo] = useState({
    time: 'Morning',
    icon: 'partly-sunny',
  });

  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('Oops... Something went wrong');

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  //set the daytime info in initial load
  useEffect(() => {
    let currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      setDayInfo({ time: 'Morning', icon: 'partly-sunny' });
    } else if (currentTime >= 12 && currentTime < 17) {
      setDayInfo({ time: 'Afternoon', icon: 'sunny' });
    } else {
      setDayInfo({ time: 'Evening', icon: 'cloudy-night' });
    }
  }, []);

  //get the name of the logged in user in initial load
  useEffect(() => {
    getUserDataFromFirestore();
  }, []);

  // function related to get the name of the logged in user
  const getUserDataFromFirestore = async () => {
    try {
      const user = auth().currentUser;
      const { uid } = user;

      // Get a reference to the Firestore document for the given userID in the 'users' collection
      const userDocRef = firestore().collection('users').doc(uid);

      // Fetch the user document data
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        setUsername(userDoc.get('name'));
      } else {
        // console.log('User document not found.');
        onToggleSnackBar();
      }
    } catch (error) {
      onToggleSnackBar();
    }
  };

  return (
    <View style={styles.content}>
      {/* background image */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: width,
          height: height,
          backgroundColor: theme.colors.primary,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          zIndex: -1,
        }}>
        <Image
          source={{
            uri: 'https://png.pngtree.com/thumb_back/fh260/background/20210601/pngtree-simple-fluid-pastel-blue-color-mobile-wallpaper-image_724254.jpg',
          }}
          width={width}
          height={height}
          style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        />
      </View>
      {/* top tile background */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: width,
          height: height / 6.5,
          backgroundColor: theme.colors.primary,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <Image
          source={{
            uri: 'https://i.ibb.co/7yFz0Dj/travel-Buddy-BG.jpg',
          }}
          width={width}
          height={height / 6.5}
          style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 22, fontWeight: '300', color: '#fff' }}>
            Hello,
            <Text style={{ fontSize: 30, fontWeight: '400', color: '#fff' }}>
              {' '}
              {username}
            </Text>
          </Text>

          <Text style={{ fontSize: 22, fontWeight: '300', color: '#fff' }}>
            Good {dayInfo.time}
          </Text>
        </View>
        <Icon name={dayInfo.icon} color={theme.colors.secondary} size={60} />
      </View>

      <View
        style={{
          width: 'full',
          position: 'absolute',
          bottom: 25,
          right: 25,
          flexDirection: 'column',
        }}>
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.primary,
            padding: 10,
            borderRadius: 50,
          }}
          onPress={() => navigation.navigate('Chat')}>
          <MCIcon name={'robot'} color={'#FFF'} size={30} />
        </Pressable>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Dismiss',
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        {msg}
      </Snackbar>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    gap: 50,
    position: 'relative',
  },
});
