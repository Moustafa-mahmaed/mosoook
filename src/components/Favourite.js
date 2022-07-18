import {API_ENDPOINT} from '../configs';
import {showError, showSuccess} from '../ui/utils/localNotifications';
import axios from 'axios';
import I18n from 'react-native-i18n';

export const Favourite = (id, onDone, favorite, onError) => {
  console.log('favoritefavoritefavorite ', id,favorite)
  if (favorite) {
    try {
      axios
        .post(`${API_ENDPOINT}/favorites`, {product: id})
        .then(res => {
          onDone();
          showSuccess(I18n.t('Done add to favorite successfully'));
        })
        .catch(error => {
          console.log(error.response);
          onError(true);
          if (!error.response) {
            showError(I18n.t('ui-networkConnectionError'));
            return;
          } else {
            showError(error.response.data.errors);
          }
        });
    } catch (error) {
      showError(I18n.t('error'));
    }
  } else {
    try {
      axios
        .delete(`${API_ENDPOINT}/favorites`, {
          data: {product: id},
        })
        .then(res => {
          onDone();
          showSuccess(I18n.t('Done remove to favorite successfully'));
        })
        .catch(error => {
          onError(true);
          if (!error.response) {
            showError(I18n.t('ui-networkConnectionError'));
            return;
          } else {
            showError(error.response.data.errors);
          }
        });
    } catch (error) {
      showError(I18n.t('error'));
    }
  }
};
