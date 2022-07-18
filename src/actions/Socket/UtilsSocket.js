import io from 'socket.io-client';
import {API_SOKET} from '../../configs';
import {
  Company,
  NotificationsCount,
  UPDATE_INFO,
  CLEAR_SOCKET,
  ORDER_CHANGE,
} from '../types';
import {logout} from '../authActions';
import AsyncStorage from '@react-native-community/async-storage';

let socketUtils = null;
export function openUtilsSocket() {
  return (dispatch, getState) => {
    socketUtils = io(`${API_SOKET}/utils`, {
      query: getState().auth.token
        ? {
            id: getState().auth.user.id,
          }
        : {},
    });

    socketUtils.on('connect', () => {});

    socketUtils.on('NewUser', data => {
      dispatch({type: UPDATE_INFO, payload: data.user});
    });

    socketUtils.on('Company', data => {
      dispatch({type: Company, payload: data.company});
      AsyncStorage.setItem('company', JSON.stringify(data.company));
    });

    socketUtils.on('NotificationsCount', data => {
      dispatch({type: NotificationsCount, payload: data.count});
    });

    socketUtils.on('ChangeOrderStatus', data => {
      console.log('ChangeOrderStatus ChangeOrderStatus ', data);
      dispatch({type: ORDER_CHANGE, payload: data.order});
    });

    socketUtils.on('LogOut', data => {
      dispatch({type: CLEAR_SOCKET});
      dispatch(logout());
    });
  };
}

export function closeUtilsSocket() {
  return (dispatch, getState) => {
    if (socketUtils) {
      socketUtils.disconnect();
    }
  };
}
