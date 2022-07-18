import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values => {
  return yup.object().shape({
    review: yup.string().required(`${I18n.t('required')}`),
  });
};
