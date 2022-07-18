import {API_ENDPOINT} from '../configs';
import {showError, showSuccess} from '../ui/utils/localNotifications';
import axios from 'axios';
import I18n from 'react-native-i18n';
import {UserData} from '../actions/authActions';
import store from '../store';

export const Cart = (id, onDone, favorite, onError, user) => {
  if (favorite) {
    try {
      axios
        .post(`${API_ENDPOINT}/store/buyer/add-cart`, {
          product_id: id,
          quantity: 1,
        })
        .then(res => {
          UserData({...user, count_cart: user.count_cart + 1}, false, true)(
            store.dispatch,
          );
          onDone();
          showSuccess(res.data.message);
        })
        .catch(error => {
          onError(true);
          if (!error.response) {
            showError(I18n.t('ui-networkConnectionError'));
            return;
          } else {
            showError(error.response.data.message);
          }
        });
    } catch (error) {
      showError(I18n.t('error'));
    }
  } else {
    try {
      axios
        .post(`${API_ENDPOINT}/store/buyer/delete-cart`, {product_id: id})
        .then(res => {
          onDone();
          showSuccess(res.data.message);
          UserData(
            {
              ...user,
              count_cart: user.count_cart === 0 ? 0 : user.count_cart - 1,
            },
            false,
            true,
          )(store.dispatch);
        })
        .catch(error => {
          onError(true);
          if (!error.response) {
            showError(I18n.t('ui-networkConnectionError'));
            return;
          } else {
            showError(error.response.data.message);
          }
        });
    } catch (error) {
      showError(I18n.t('error'));
    }
  }
};

export const UpdateCart = (id, quantity, onDone, onError) => {
  try {
    axios
      .post(`${API_ENDPOINT}/store/buyer/update-cart`, {
        product_id: id,
        quantity: quantity,
      })
      .then(res => {
        onDone();
        showSuccess(res.data.message);
      })
      .catch(error => {
        onError(true);
        if (!error.response) {
          showError(I18n.t('ui-networkConnectionError'));
          return;
        } else {
          showError(error.response.data.message);
        }
      });
  } catch (error) {
    showError(I18n.t('error'));
  }
};
