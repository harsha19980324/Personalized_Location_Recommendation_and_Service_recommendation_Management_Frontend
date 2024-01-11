import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../core/theme';
import Button from '../../components/Button';
import {ActivityIndicator} from 'react-native-paper';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const PredictionDetailsScreen = ({route, navigation}) => {
  const {place} = route?.params ?? 'Dalada Maligawa';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log('matching place >>> ', place);
  }, [place]);

  const [disease, setDisease] = useState({
    Name: 'Dalada Maligawa',
    builtBy: 'King Vira Narendra Sinha',
    time: '17th century(1595)',
    religion: 'Buddhist',
    img: 'https://www.attractionsinsrilanka.com/wp-content/uploads/2019/07/Sri-Dalada-Maligawa-Temple-of-the-Tooth-Relic.jpg',
    description:
      "The Dalada Maligawa, a UNESCO World Heritage Site, stands as a powerful symbol of both national and religious significance in Sri Lanka. Its unique Kandyan architecture, interconnected buildings, and rich artistic details draw visitors from around the world. At the heart of this revered temple is the sacred relic of Buddha's tooth.The temple's grand festivals, such as the annual Esala Perahera, further add to its allure, featuring spectacular processions that include traditional dancers, drummers, and the cherished tooth relic paraded through Kandy's streets.",
  });

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
              height: height / 4,
              backgroundColor: theme.colors.primary,
              zIndex: -1,
            }}>
            <Image
              source={{
                uri: disease.img,
              }}
              width={width}
              height={height / 3}
            />
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: 20,
              width: width,
              height: (height / 3) * 2,
              backgroundColor: theme.colors.primary,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                width: width,
                height: height,
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
                height={height}
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
                height: height,
                backgroundColor: theme.colors.white,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                zIndex: -1,
                opacity: 0.7,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                paddingBottom: 20,
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '500',
                  color: theme.colors.title,
                }}>
                {disease?.Name}
              </Text>
            </View>

            <ScrollView>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 0.9,
                  width: '100%',
                }}>
                <View style={{gap: 15}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                      gap: 15,
                    }}>
                    <Text style={styles.label}>Built by :</Text>
                    <Text style={{fontSize: 18}}>{disease?.builtBy}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                      gap: 15,
                    }}>
                    <Text style={styles.label}>Time Period :</Text>
                    <Text style={{fontSize: 18}}>{disease?.time}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                      gap: 15,
                    }}>
                    <Text style={styles.label}>Religion :</Text>
                    <Text style={{fontSize: 18}}>{disease?.religion}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 10,
                    }}>
                    <Text style={styles.label}>More Info :</Text>
                    <View
                      style={{
                        borderRadius: 10,
                        minHeight: 20,
                        padding: 10,
                        marginBottom: 10,
                        backgroundColor: '#FFF',
                        minHeight: 'full',
                        width: '100%',
                      }}>
                      <Text style={{fontSize: 16}}>{disease?.description}</Text>
                    </View>
                  </View>
                </View>

                <Button
                  mode="contained"
                  style={{marginTop: 30}}
                  onPress={() => {
                    navigation.navigate('capturePlace');
                  }}>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 20,
                      borderRadius: 100,
                      color: '#FFFFFF',
                    }}>
                    Go Back
                  </Text>
                </Button>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
};

export default PredictionDetailsScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: width,
    backgroundColor: '#FFFFFF',
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  label: {
    fontSize: 20,
    fontWeight: '400',
    color: theme.colors.black,
  },
});
