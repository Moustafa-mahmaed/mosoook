import {Trip} from '../actions/types';

const initialState = {
  trip: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Trip:
      return {...state, trip: action.payload};

    default:
      return state;
  }
};

export default reducer;
