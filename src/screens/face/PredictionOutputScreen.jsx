import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import {theme} from '../../core/theme';
import Button from '../../components/Button';
import {emotionActivities} from '../../data/Data';
const blue = `${theme.colors.primary}`;
const blueVari = `#538599`;

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const PredictionOutputScreen = ({route, navigation}) => {
  const {emotion, uri} = route?.params ?? 'Sad';
  const [isLoading, setIsLoading] = useState(true);
  const [imageURI, setImageURI] = useState(null);
  const [emotionName, setEmotionName] = useState(emotion);
  const [activities, setActivities] = useState([
    'Encourage them to incorporate rest days into their itinerary, allowing time for relaxation and self - care.',
    'Advise them to slow down their pace of travel, spend more time in each location, and focus on quality experiences rather than quantity.',
    'A visit to the Pinnawala Elephant Orphanage or a safari in Udawalawe National Park can provide opportunities to connect with animals and nature, which can be emotionally uplifting.',
    'Engage with the friendly and welcoming Sri Lankan people.Sharing stories and experiences with locals can create meaningful connections and alleviate feelings of sadness.',
    'Spend time in natural surroundings, like parks, gardens, or near bodies of water, which can have a calming and mood - boosting effect.',
    'Vist the rest house and do mindfulness meditation or yoga to help them stay present, reduce stress, and improve their overall mental well - being.',
  ]);

  useEffect(() => {
    setEmotionName(emotion?.toUpperCase());
    setImageURI(uri);
    matchEmotionActivities(emotion);
  }, [emotion]);

  const matchEmotionActivities = emotion => {
    emotionActivities.filter(item => {
      if (item.name === emotion) {
        setActivities(item.activities);
      }
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={{...styles.content, justifyContent: 'center'}}>
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
            Identification in progress
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
              style={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}
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
          <View style={styles.activityRow}>
            {/* <View style={styles.resultsBox}> */}
            <ImageBackground
              source={{
                uri:
                  imageURI ??
                  'https://i.ibb.co/vk5mJbB/pngtree-simple-fluid-pastel-blue-color-mobile-wallpaper-image-724254.jpg',
              }}
              resizeMode="cover"
              imageStyle={{borderRadius: 10}}
              style={styles.resultsBox}>
              <Text style={styles.emotionText}>
                SEEMS YOU ARE {emotionName}
              </Text>
              {/* </View> */}
            </ImageBackground>
          </View>

          <Text style={styles.title}>ACTIVITIES YOU MAY LIKE...</Text>
          <ScrollView style={{width: '100%', marginTop: 10}}>
            {activities.map((activity, index) => (
              <View key={index} style={styles.activityRow}>
                <View style={styles.activityIcon}>
                  <Text style={styles.activityText}>{activity}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('HomeScreen')}
            style={{marginTop: 40}}>
            <Text style={{...styles.text, color: '#FFF'}}>Cancel</Text>
          </Button>
        </View>
      )}
    </>
  );
};

export default PredictionOutputScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'flex-start',
  },
  resultsBox: {
    width: '100%',
    height: 250,
    backgroundColor: blue,
    position: 'relative',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: theme.colors.black,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  activityIcon: {
    width: '100%',
    height: 60,
    backgroundColor: blueVari,
    marginRight: 10,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  emotionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 200,
    color: theme.colors.primary,
    backgroundColor: theme.colors.white,
  },

  activityText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    flexGrow: 1,
    padding: 5,
  },
});
