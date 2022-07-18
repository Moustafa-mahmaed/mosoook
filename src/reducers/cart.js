import {MODIFY_CART} from '../actions/types';

const INITIAL_STATE = {
  products: [],
  price: 0,
  productsCount: 0,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFY_CART:
      return {
        ...state,
        products: action.payload,
        productsCount: action.payload.length,
        price: action.price,
      };

    default:
      return state;
  }
};

export default reducer;
