import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values => {
  return yup.object().shape({
    email: yup
      .string()
      .required(`${I18n.t('email')} ${I18n.t('required')}`).email(I18n.t('email-invalid')),
    password: yup
      .string()
      .required(`${I18n.t('password')} ${I18n.t('required1')}`),
  });
};
