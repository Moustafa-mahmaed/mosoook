import { Navigation } from '../ui';
import I18n from 'react-native-i18n';
// import 'moment/locale/ar';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

import { SET_LANG } from './types';
import store from '../store';
import { API_ENDPOINT } from '../configs';
import axios from 'axios';
import { UserData } from './authActions';

export const setLang = (lang, rtl, start = false) => async dispatch => {
  moment.locale('en');
  I18n.locale = lang;
  dispatch({ type: SET_LANG, lang, rtl });
  await AsyncStorage.setItem('lang', JSON.stringify({ lang, rtl }));
};

export const initLang = (lang, rtl) => async (dispatch, store) => {
  const l = await AsyncStorage.getItem('lang');
  if (l) {
    const d = JSON.parse(l);
    await setLang(d.lang, d.rtl, true)(dispatch, store);
  } else {
    await setLang(lang, rtl, true, false)(dispatch, store);
  }
};

export const existLang = () => async (dispatch, store) => {
  const l = await AsyncStorage.getItem('lang');
  if (l) {
    return true;
  } else {
    moment.locale('en');
    I18n.locale = 'ar';
    return false;
  }
};
