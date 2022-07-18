// import { NetInfo } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import {SET_INTERNET_CONNECTION, NAVIGATION_STOP} from './types';

export async function initInternetConnection(dispatch) {
  NetInfo.addEventListener(state => {
    dispatch({type: SET_INTERNET_CONNECTION, payload: state.isConnected});
  });
}

export const NavigationStop = flag => async dispatch => {
  dispatch({type: NAVIGATION_STOP, payload: flag});
};
