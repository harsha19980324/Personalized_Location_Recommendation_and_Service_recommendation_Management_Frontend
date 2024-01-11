import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Snackbar} from 'react-native-paper';

import Button from '../../components/Button';
import {theme} from '../../core/theme';
import axios from 'axios';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const DetectTouristPlacesScreen = ({navigation}) => {
  const [type, setType] = useState('');
  const [district, setDistrict] = useState('');
  const [weatherType, setWeatherType] = useState('');
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');

  const Types = ['Tourist Place', 'Religious Places', 'Historical landmark'];
  const Districts = [
    'Colombo',
    'Gampaha',
    'Mannar',
    'Kilinochchi',
    'Mulative',
    'Jaffna',
    'Vavuniya',
    'Batticaloa',
    'Trincomalee',
    'Monaragala',
    'Badulla',
    'Hambanthota',
    'Matara',
    'Galle',
    'Matale',
    'Nuwara Eliya',
    'Kandy',
    'Polonnaruwa',
    'Anuradhapura',
    'Kegalle',
    'Ratnapura',
    'Puttalam',
    'Kurunagala',
    'Kalutara',
    'Ampara',
  ];
  const WeatherTypes = ['Mild', 'Dry', 'Tropical'];
  const Categories = [
    'Temple',
    'Garden',
    'Fort',
    'Forest',
    'Wildlife Tourism Zones',
    'Mountain areas',
    'Beach',
    'Water Fall',
    'Lake',
    'Rock',
    'Museum',
    'Park',
    'Lighthouse',
    'Outdoor',
    'Island',
    'Hindu Temple',
  ];
  const BudgetTypes = ['Low', 'High', 'Free', 'Medium'];

  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('Oops... Something went wrong');

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const onPredict = async () => {
    const payload = {
      District: district,
      Budget: budget,
      Type: type,
      Category: category,
      'Weather Type ': weatherType,
    };

    try {
      const response = await axios.post(
        'http://10.0.2.2:5013/predict/personalizedlocation',
        payload,
      );
      setMsg("Please wait... We're finding the best destination for you");
      onToggleSnackBar();

      navigation.navigate('TouristPlacesResult', {
        place: response?.data?.Random_Forest_Predicted_Name,
        type: type,
        district: district,
      });
    } catch (error) {
      setMsg('Oops... Something went wrong');
      onToggleSnackBar();
      console.log('error in personalizedlocation >>> ', error);
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

      <Text
        style={{
          fontSize: 24,
          alignSelf: 'center',
          textAlign: 'center',
          paddingTop: 20,
          color: theme.colors.title,
          fontWeight: '500',
        }}>
        Let's find the best Destination to Travel
      </Text>

      <View style={{padding: 20, gap: 10}}>
        <View style={{gap: 10, width: '100%'}}>
          <Text style={styles.inputLabel}>Type :</Text>
          <SelectDropdown
            data={Types}
            onSelect={(selectedItem, index) => {
              setType(selectedItem);
            }}
            defaultButtonText={'Select type'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#444'}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
          />
        </View>

        <View style={{gap: 10, width: '100%'}}>
          <Text style={styles.inputLabel}>District :</Text>
          <SelectDropdown
            data={Districts}
            onSelect={(selectedItem, index) => {
              setDistrict(selectedItem);
            }}
            defaultButtonText={'Select District'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#444'}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
          />
        </View>

        <View style={{gap: 10, width: '100%'}}>
          <Text style={styles.inputLabel}>Weather Type :</Text>
          <SelectDropdown
            data={WeatherTypes}
            onSelect={(selectedItem, index) => {
              setWeatherType(selectedItem);
            }}
            defaultButtonText={'Select Weather Type'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#444'}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
          />
        </View>

        <View style={{gap: 10, width: '100%'}}>
          <Text style={styles.inputLabel}>Category :</Text>
          <SelectDropdown
            data={Categories}
            onSelect={(selectedItem, index) => {
              setCategory(selectedItem);
            }}
            defaultButtonText={'Select Category'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#444'}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
          />
        </View>

        <View style={{gap: 10, width: '100%'}}>
          <Text style={styles.inputLabel}>Budget :</Text>
          <SelectDropdown
            data={BudgetTypes}
            onSelect={(selectedItem, index) => {
              setBudget(selectedItem);
            }}
            defaultButtonText={'Select Budget'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#444'}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
          />
        </View>

        <Button mode="contained" onPress={onPredict} style={{marginTop: 40}}>
          <Text style={{...styles.textBtn, color: '#FFF'}}>
            Give me the best destination
          </Text>
        </Button>
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

export default DetectTouristPlacesScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    gap: 20,
    position: 'relative',
  },
  textBtn: {
    fontWeight: '400',
    fontSize: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '400',
    color: theme.colors.black,
  },
  dropdownBtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdownBtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdownDropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdownRowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdownRowTxtStyle: {color: '#444', textAlign: 'left'},
});
