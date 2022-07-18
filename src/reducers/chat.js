import { CLEAR_CHAT, GETTING_CHAT, CHAT_RESPONSE, MESSAGE, SET_TYPING } from '../actions/types';

const INITIAL_STATE = {
  messages: [],
  typing: false,
  loadingChat: false,
  chatPageCount: null,
  chatId: null,
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_CHAT:
      return { ...state, messages: [], typing: false, loadingChat: false, chatPageCount: null, chatId: null, };
    case GETTING_CHAT:
      return { ...state, typing: false, loadingChat: true, chatPageCount: null, };
    case CHAT_RESPONSE:
      return {
        ...state, messages: [...state.messages, ...action.payload],
        loadingChat: false, typing: false, chatPageCount: action.chatPageCount
      };
    case MESSAGE:
      return {
        ...state, messages: [...action.payload, ...state.messages], typing: false,
      };
    case SET_TYPING:
      return { ...state, typing: action.payload };
    default:
      return state;
  }
}

export default reducer;