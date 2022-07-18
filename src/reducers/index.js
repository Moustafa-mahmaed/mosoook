import authReducer from './authReducer';
import langReducer from './lang';
import networkReducer from './network';
import ListReducer from './list';
import socketReducer from './socketReducer';
import ChatReducer from './chat';
import Company from './Company';
import Trip from './Trip';
import slider from './slider';
import cart from './cart';
import counts from './counts';

import { combineReducers } from 'redux';

export default combineReducers({
  auth: authReducer,
  lang: langReducer,
  network: networkReducer,
  list: ListReducer,
  socket: socketReducer,
  chat: ChatReducer,
  company: Company,
  trip: Trip,
  slider: slider,
  cart: cart,
  count: counts,
});
