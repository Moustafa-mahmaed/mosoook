import {LOADING_SLIDER, SET_SLIDER} from './types';
import {API_ENDPOINT} from '../configs';
import axios from 'axios';

export const getSlider = () => async dispatch => {
  dispatch({type: LOADING_SLIDER, payload: true, error: false});
  axios
    .get(`${API_ENDPOINT}/images?type=HOME_SLIDER`)
    .then(res => {
      dispatch({type: SET_SLIDER, payload: res.data.data});
    })
    .catch(() => {
      dispatch({type: LOADING_SLIDER, payload: false, error: true});
    });
};
