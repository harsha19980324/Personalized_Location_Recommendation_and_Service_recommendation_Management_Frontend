import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { theme } from '../../core/theme';
import { ActivityIndicator } from 'react-native-paper';
import Button from '../../components/Button';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const TouristPlacesResultScreen = ({ route, navigation }) => {
  const { place, type, district } = route?.params;
  const [isLoading, setIsLoading] = useState(true);
  const [placeName, setPlaceName] = useState('pettah bus stand');
  const [placeType, setPlaceType] = useState('restaurant');
  const [placeDistrict, setPlaceDistrict] = useState('colombo');
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setPlaceName(place)
    setPlaceType(type)
    setPlaceDistrict(district)
  }, [place, type, district]);

  const searchPlace = () => {
    navigation.navigate('LocationScreen', { place: placeName });
  };

  return (
    <>
      {isLoading ? (
        <View style={{ ...styles.content, justifyContent: 'center' }}>
          <ActivityIndicator
            animating={true}
            color={theme.colors.primary}
            size={'large'}
          />
          <Text
            style={{
              fontSize: 18,
              color: theme.colors.black,
            }}>
            Finding the Best Destination
          </Text>
        </View>
      ) : (
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
                uri: 'https://i.ibb.co/vk5mJbB/pngtree-simple-fluid-pastel-blue-color-mobile-wallpaper-image-724254.jpg',
              }}
              width={width}
              height={height}
              style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              width: width,
              height: height,
              backgroundColor: theme.colors.white,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              zIndex: -1,
              opacity: 0.7,
            }}
          />

          {/* screen body content */}

          <Image
            source={{
              uri: 'https://i.ibb.co/vk5mJbB/pngtree-simple-fluid-pastel-blue-color-mobile-wallpaper-image-724254.jpg',
            }}
            width={width - 50}
            height={width - 50}
            style={{ borderRadius: 20 }}
          />
          <View style={{ width: '95%', gap: 20 }}>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'left',
                color: theme.colors.black,
                fontWeight: '500',
              }}>
              Name: {placeName}
            </Text>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'left',
                color: theme.colors.black,
                paddingLeft: 20,
              }}>
              🔵 {placeType}
            </Text>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'left',
                color: theme.colors.black,
                paddingLeft: 20,
              }}>
              🔵 {placeDistrict}
            </Text>
          </View>

          <Button
            mode="contained"
            onPress={searchPlace}
            style={{ marginTop: 40 }}>
            <Text style={{ ...styles.textBtn, color: '#FFF' }}>
              View Location
            </Text>
          </Button>
        </View>
      )}
    </>
  );
};

export default TouristPlacesResultScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    gap: 20,
    position: 'relative',
    alignItems: 'center',
  },
  textBtn: {
    fontWeight: '400',
    fontSize: 20,
  },
});
