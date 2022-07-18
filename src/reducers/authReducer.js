import {
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_ATTEMPT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  UPDATE_INFO,
  UPDATE_Failed,
  LOGIN_SOCIAL,
  Set_Country,
} from '../actions/types';

const INITIAL_STATE = {
  user: {},
  ordersCounts: {},
  success: false,
  token: '',
  processing: false,
  error: '',
  facebook: false,
  gmail: false,
  country: {},
  city: {},
  region: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SOCIAL:
      return {...state, facebook: action.facebook, gmail: action.gmail};
    case LOGIN_ATTEMPT:
      return {...state, processing: true, success: false, error: ''};
    case LOGIN_FAILURE:
      return {
        ...state,
        processing: false,
        success: false,
        error: action.error,
        facebook: false,
        gmail: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        processing: false,
        success: true,
        user: action.payload,
        error: '',
        token: action.token,
        facebook: false,
        gmail: false,
      };
    case UPDATE_INFO:
      return {
        ...state,
        processing: false,
        user: action.payload,
      };
    case LOGIN_ATTEMPT:
      return {...state, processing: true, success: false, error: ''};
    case UPDATE_Failed:
      return {...state, processing: false, success: false};
    case REGISTER_ATTEMPT:
      return {...state, processing: true, success: false, error: ''};
    case REGISTER_FAILURE:
      return {...state, processing: false, success: false, error: action.error};
    case REGISTER_SUCCESS:
      return {
        ...state,
        processing: false,
        success: true,
        user: action.payload,
        error: '',
        token: action.token,
      };
    case LOGOUT:
      return {...INITIAL_STATE, country: state.country};
    case Set_Country:
      return {
        ...state,
        country: action.country,
        city: action.city,
        region: action.region,
      };
    default:
      return state;
  }
};
