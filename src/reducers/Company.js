import {Company} from '../actions/types';

const initialState = {
  company: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Company:
      return {...state, company: action.payload};

    default:
      return state;
  }
};

export default reducer;
