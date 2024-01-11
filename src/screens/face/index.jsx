import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text, Dimensions} from 'react-native';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Button from '../../components/Button';
import {theme} from '../../core/theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {ActivityIndicator} from 'react-native-paper';
import {Snackbar} from 'react-native-paper';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const FaceEmotionDetectionHomeScreen = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScaning, setIsScaning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Oops... Something went wrong');
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

  const handleUpload = async () => {
    if (!selectedImage) {
      setMessage('No image selected...');
      onToggleSnackBar();
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('image', {
        uri: selectedImage,
        type: selectedImage.type || 'image/jpeg', // Change to the appropriate MIME type
        name: 'image.jpg',
      });

      const response = await axios.post(
        'http://10.0.2.2:5014/predict/detectemotion/post',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      // Handle the response as needed
      if (response?.data?.emotion) {
        navigation.navigate('PredictionOutputScreen', {
          emotion: response?.data?.emotion?.toString()?.toLowerCase(),
          uri: selectedImage,
        });
        return;
      } else {
        onToggleSnackBar();
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsLoading(false);
    }
  };

  //handle scan button press
  const onScanPress = () => {
    setIsScaning(true);
    setIsLoading(true);

    //call the API
    handleUpload();

    setIsScaning(false);
  };

  return (
    <View style={styles.container}>
      {selectedImage ? (
        <Image style={styles.image} source={{uri: selectedImage}} />
      ) : (
        <Image
          style={styles.image}
          source={{uri: 'https://i.ibb.co/zN4wBD9/16406566-rm373batch3-02.jpg'}}
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
                Capture From Camera
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
              Scaning the Expressions...
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

export default FaceEmotionDetectionHomeScreen;

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
