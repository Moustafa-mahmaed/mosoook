import Snackbar from 'react-native-snackbar';
import I18n from 'react-native-i18n';

import colors from '../defaults/colors';


export const showInfo = (message, rtl) => {
  Snackbar.show({
    text: message,
    textColor: colors.secondary,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: colors.warning,
    rtl: rtl,
    action: {
      text: I18n.t('ui-close'),
      textColor: colors.black,
    },
  });
};

export const showSuccess = (message, rtl) => {
  Snackbar.show({
    text: message,
    textColor: colors.white,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: colors.primary,
    rtl: rtl,
    action: {
      text: I18n.t('ui-close'),
      textColor: colors.black,
    },
  });
};

export const showError = (message, rtl) => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: colors.error,
    rtl: rtl,
    action: {
      text: I18n.t('ui-close'),
      textColor: colors.black,
    },
  });
};
