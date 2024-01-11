import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import MapView, { Marker, Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../core/theme';

const MapScreen = ({ route, navigation }) => {
  const { place } = route?.params ?? '';
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (place != undefined || place == '') {
      searchPlace(place);
      return;
    }
    // searchPlace('sri lanka');
    searchPlace('sigiriya');
  }, [place]);

  const searchPlace = place => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=AIzaSyBw9TcPX3n2_40Ck8EqTxACzKtExEMV98g`,
    )
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK' && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setLocation({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        } else {
          console.log('error >>> ', data);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>
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
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.primary,
            padding: 10,
            borderRadius: 50,
          }}
          onPress={() => navigation.navigate('DetectTouristPlaces')}>
          <Icon name={'magnify-scan'} color={'#FFF'} size={30} />
        </Pressable>
      </View>
    </View>
  );
};

export default MapScreen;
