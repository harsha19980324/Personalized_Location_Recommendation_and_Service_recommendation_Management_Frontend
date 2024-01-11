import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  CameraRoll,
  Platform,
  Text,
  Dimensions,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Button from '../../components/Button';
import {theme} from '../../core/theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import {ActivityIndicator} from 'react-native-paper';
import axios from 'axios';
import {Snackbar} from 'react-native-paper';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const CapturePlacesScreen = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScaning, setIsScaning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('The result will display here...');
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedImage(null);
      setIsLoading(false);
      setIsScaning(false);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const handleCameraPress = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      saveToPhotos: true,
    };

    launchCamera(options, response => {
      if (response.assets) {
        setSelectedImage(null);
        setSelectedImage(response.assets[0].uri);
        console.log('selected image url from camera', response.assets[0].uri);
      }
    });
  };

  const handleGalleryPress = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.assets) {
        setSelectedImage(null);
        setSelectedImage(response.assets[0].uri);
        console.log('selected image url from gallery', response.assets[0].uri);
      }
    });
  };

  const onScanPress = () => {
    setIsScaning(true);
    setIsLoading(true);

    // call the API
    // handleUpload();

    navigation.navigate('PredictionDetails', {
      place: 'sri dalada maligawa',
    });
    setIsScaning(false);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setMessage('No image selected...');
      onToggleSnackBar();
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      // formData.append('file', {
      formData.append('image', {
        uri: selectedImage,
        type: selectedImage.type || 'image/jpeg', // Change to the appropriate MIME type
        name: 'image.jpg',
      });

      const response = await axios.post(
        // 'http://10.0.2.2:5012/predict/detectlocation/post',
        'http://10.0.2.2:5012/predict/detectlocation',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      // Handle the response as needed
      console.log('Upload Response:', response.data);
      if (response?.data?.class) {
        navigation.navigate('PredictionDetails', {
          place: response?.data?.class?.toString()?.toLowerCase(),
        });
        return;
      } else {
        setMessage('No result found...');
        onToggleSnackBar();
        return;
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage ? (
        <Image style={styles.image} source={{uri: selectedImage}} />
      ) : (
        <Image
          style={styles.image}
          source={{uri: 'https://i.ibb.co/xs5Q8F5/cam-Vector.jpg'}}
        />
      )}
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          padding: 20,
          position: 'absolute',
          bottom: 0,
          height: height / 4,
          justifyContent: 'center',
          borderTopColor: theme.colors.primary,
        }}>
        {/* background image */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: width,
            height: height / 3,
            backgroundColor: theme.colors.primary,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            zIndex: -1,
          }}>
          <Image
            source={{
              uri: 'https://i.ibb.co/vk5mJbB/pngtree-simple-fluid-pastel-blue-color-mobile-wallpaper-image-724254.jpg',
            }}
            width={width}
            height={height / 3}
            resizeMode="cover"
            style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: width,
            height: height / 4,
            backgroundColor: theme.colors.white,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            zIndex: -1,
            opacity: 0.5,
          }}
        />

        {!selectedImage ? (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              gap: 20,
            }}>
            <Button
              mode="contained"
              onPress={handleCameraPress}
              style={{backgroundColor: '#248ab3'}}>
              <Text style={{...styles.textBtn, color: '#FFF'}}>
                Take a photo
              </Text>
            </Button>
            <Button
              mode="contained"
              onPress={handleGalleryPress}
              style={{backgroundColor: '#248ab3'}}>
              <Text style={{...styles.textBtn, color: '#FFF'}}>
                Choose from library
              </Text>
            </Button>
          </View>
        ) : !isLoading ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Button
              mode="contained"
              onPress={onScanPress}
              style={{width: '70%'}}
              disabled={isScaning}>
              <Text style={{...styles.textBtn, color: '#FFF'}}>Scan</Text>
            </Button>

            <Button
              mode="contained"
              onPress={() => {
                setSelectedImage(null);
              }}
              disabled={isScaning}
              style={{width: '25%', backgroundColor: theme.colors.error}}>
              <IonIcon name="trash-bin-outline" color={'#fff'} size={20} />
            </Button>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
            <ActivityIndicator
              animating={true}
              color={theme.colors.primary}
              size={'large'}
            />
            <Text
              style={{
                fontSize: 18,
                color: theme.colors.black,
                marginTop: 20,
              }}>
              Scaning the Image...
            </Text>
          </View>
        )}
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
        {message}
      </Snackbar>
    </View>
  );
};

export default CapturePlacesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: width,
    height: (height / 3) * 2,
    resizeMode: 'cover',
    marginBottom: 20,
    zIndex: -1,
  },
  textBtn: {
    fontWeight: '400',
    fontSize: 20,
  },
});
