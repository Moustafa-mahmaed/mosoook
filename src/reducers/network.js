import {SET_INTERNET_CONNECTION, NAVIGATION_STOP} from '../actions/types';

const initialState = {
  isConnected: true,
  NavigationStop: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INTERNET_CONNECTION:
      return {...state, isConnected: action.payload};
    case NAVIGATION_STOP:
      return {...state, NavigationStop: action.payload};
    default:
      return state;
  }
};

export default reducer;
