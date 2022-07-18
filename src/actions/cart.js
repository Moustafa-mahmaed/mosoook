import {MODIFY_CART} from './types';

export const modifyCart = (products, price) => async (dispatch, store) => {
  dispatch({type: MODIFY_CART, payload: products, price});
};
