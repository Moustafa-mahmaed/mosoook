/* eslint-disable radix */
import io from 'socket.io-client';
import { API_SOKET, API_ENDPOINT } from '../../configs';
import {
  IS_TYPING,
  RECIEVE_MESSAGE,
  SET_CHAT,
  LOAD_MORE_CHAT,
  SET_LOAD_EARLIER,
  GETTING_CHAT,
  CLEAR_CHAT,
  REFRESH_LIST,
  MESSAGE,
  CHAT_RESPONSE,
  MEESAGE_COUNT,
} from '../types';
import axios from 'axios';
import { showError } from '../../ui';
import I18n from 'react-native-i18n';

let ChatSocket = null;
export function openChatSocket() {
  return (dispatch, getState) => {
    ChatSocket = io(`${API_SOKET}/chat`, {
      query: getState().auth.token
        ? {
          id: getState().auth.user.id,
        }
        : {},
    });

    ChatSocket.on('connect', () => { });

    ChatSocket.on('MessageCount', data => {
      dispatch({ type: MEESAGE_COUNT, payload: data.count });
    });

    ChatSocket.on('NewMessage', data => {
      dispatch({ type: REFRESH_LIST, list: 'chatList' });
      let message = {
        text: data.message.message.text ? data.message.message.text : undefined,
        image: data.message.message.image ? `${API_ENDPOINT}${data.message.message.image}` : undefined,
        sender: data.message.sender,
        receiver: data.message.receiver,
        id: data.message.id,
        createdAt: data.message.createdAt,
      };
      dispatch({ type: MESSAGE, payload: [message] });
    });

    ChatSocket.on('Typing', data => {
      if (parseInt(data.trip.id) === getState().chat.tripId) {
        dispatch({ type: IS_TYPING, payload: true });
      }
    });

    ChatSocket.on('StopTyping', data => {
      if (parseInt(data.trip.id) === getState().chat.tripId) {
        dispatch({ type: IS_TYPING, payload: false });
      }
    });
  };
}

export const getChatforContact = (user, page) => async (dispatch, getState) => {
  if (page === 1) {
    dispatch({ type: CLEAR_CHAT });
  }
  dispatch({ type: REFRESH_LIST, list: 'chatList' });
  dispatch({ type: GETTING_CHAT });
  axios.get(`${API_ENDPOINT}/chat?page=${page}`, {
    headers: {
      'Authorization': `Bearer ${getState().auth.token}`,
      'Accept-Language': `${getState().lang.lang}`
    }
  }).then((res) => {
    let messages = [];
    res.data.data.map((message, index) => {
      messages.push({
        text: message.message.text ? message.message.text : undefined,
        image: message.message.image ? `${API_ENDPOINT}${message.message.image}` : undefined,
        sender: message.sender,
        receiver: message.receiver,
        id: message.id,
        createdAt: message.createdAt,
      });
    })
    dispatch({ type: CHAT_RESPONSE, payload: messages, chatPageCount: res.data.pageCount });
  }).catch(error => {
    dispatch({ type: CHAT_RESPONSE, payload: [], chatPageCount: null });
  });
}

export const sendMessageToContact = (data, message, clear, onError) => async (dispatch, getState) => {
  dispatch({ type: REFRESH_LIST, list: 'chatList' });
  axios.post(`${API_ENDPOINT}/chat`, data, {
    headers: {
      'Authorization': `Bearer ${getState().auth.token}`,
      'Accept-Language': `${getState().lang.lang}`
    }
  }).then((res) => {
    dispatch({ type: MESSAGE, payload: [message] });
    if (clear) {
      clear();
    }
  }).catch(error => {
    if (onError) {
      onError();
    }
    if (!error.response) {
      showError(I18n.t('error'));
      return;
    }
    else if (error.response.data.error) {
      showError(error.response.data.error);
    }
    else {
      showError(error.response.data.errors);
    }
  });
}

export const setTyping = (data, flag) => async (dispatch, getState) => {
  if (flag) {
    ChatSocket.emit('Typing', data);
  }
  else {
    ChatSocket.emit('StopTyping', data);
  }
}

export const updateSeen = (data) => async (dispatch, getState) => {
  dispatch({ type: REFRESH_LIST, list: 'chatList' });
  ChatSocket.emit('UpdateSeen', data);
}

export const clearChat = () => async (dispatch, getState) => {
  dispatch({ type: CLEAR_CHAT });
}

export function closeChatSocket() {
  return (dispatch, getState) => {
    if (ChatSocket) {
      ChatSocket.disconnect();
    }
  };
}
