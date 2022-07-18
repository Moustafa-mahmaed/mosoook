import {
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_INFO,
  CLEAR_SOCKET,
  Set_Country,
  Company,
} from './types';
import { API_ENDPOINT } from '../configs';
import axios from 'axios';
import { Platform } from 'react-native';
// import firebase from 'react-native-firebase';
import store from '../store';
import { utils, closeSocket } from './Socket/socket';
import AsyncStorage from '@react-native-community/async-storage';
import { Navigation } from '../ui';

const getLang = () => {
  return store.getState().lang.lang;
};

export const autoLogin = () => async dispatch => {
  const user = await AsyncStorage.getItem('User');
  console.log("-------- user ", user)
  const token = await AsyncStorage.getItem('Token');
  if (user) {
    // initFirebase(token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: JSON.parse(user),
      token: JSON.parse(token),
    });
    dispatch(utils());
    axios
      .get(`${API_ENDPOINT}/store/vendor/get-info`)
      .then(response => {
        dispatch({ type: UPDATE_INFO, payload: response.data.data });
        AsyncStorage.setItem('User', JSON.stringify(response.data.data));
      })
      .catch(error => { });
    return user;
  }
  dispatch(utils());
  return false;
};

export const UserData = (data, remeber, update) => async dispatch => {
  if (update) {
    dispatch({ type: UPDATE_INFO, payload: data });
    await AsyncStorage.setItem('User', JSON.stringify(data));
    return;
  }
  dispatch({ type: LOGIN_SUCCESS, payload: data, token: data.token });
  dispatch(utils());
  if (remeber) {
    await AsyncStorage.setItem('User', JSON.stringify(data));
    // await AsyncStorage.setItem('Token', JSON.stringify(data.token));
  }
  // initFirebase(data.token);
};

export const logout = () => async (dispatch, getState) => {
  try {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    await AsyncStorage.removeItem('deviceToken');
    await AsyncStorage.removeItem('User');
    await AsyncStorage.removeItem('Token');
    dispatch(closeSocket());
    dispatch({ type: CLEAR_SOCKET });
    Navigation.init('MAIN_STACK', {
      name: 'Login',
    });
    axios.post(
      `${API_ENDPOINT}/logout`,
      { token: deviceToken },
      {
        headers: {
          Authorization: 'Bearer ' + getState().auth.token,
          'Content-Type': 'application/json',
          'Accept-Language': getLang(),
        },
      },
    );
  } catch (error) { }
  dispatch({ type: LOGOUT });
};

const initFirebase = async token => {
  const fcmToken = await firebase.messaging().getToken();
  if (fcmToken) {
    try {
      AsyncStorage.setItem('deviceToken', fcmToken);
      await axios.post(
        `${API_ENDPOINT}/addToken`,
        {
          token: fcmToken,
          type: Platform.OS === 'ios' ? 'ios' : 'android',
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) { }
  }
};

export const SetCountry = (country, city, region) => async dispatch => {
  dispatch({ type: Set_Country, country: country, city: city, region: region });
  await AsyncStorage.setItem('Country', JSON.stringify(country));
  await AsyncStorage.setItem('City', JSON.stringify(city));
  await AsyncStorage.setItem('Region', JSON.stringify(region));
  return;
};

export const GetCountry = () => async dispatch => {
  const Country = await AsyncStorage.getItem('Country');
  let country = {};
  if (Country) {
    country = JSON.parse(Country);
  }
  const City = await AsyncStorage.getItem('City');
  let city = {};
  if (City) {
    city = JSON.parse(City);
  }
  const Region = await AsyncStorage.getItem('Region');
  let region = {};
  if (Region) {
    region = JSON.parse(Region);
  }
  dispatch({ type: Set_Country, country: country, city: city, region: region });
  return;
};
