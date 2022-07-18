import {LOADING_SLIDER, SET_SLIDER} from '../actions/types';

const initialState = {
  loading: false,
  error: false,
  sliderData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_SLIDER:
      return {
        ...state,
        loading: action.payload,
        error: action.error,
        sliderData: [],
      };

    case SET_SLIDER:
      return {
        ...state,
        loading: false,
        error: false,
        sliderData: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
