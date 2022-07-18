import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values => {
  return yup.object().shape({
    FirstName: yup
      .string()
      .required(`${I18n.t('firstname')} ${I18n.t('required')}`),
    LastName: yup
      .string()
      .required(`${I18n.t('lastname')} ${I18n.t('required1')}`),
    Gender: yup
      .string()
      .required(`${I18n.t('gender')} ${I18n.t('required1')}`),
    Birthday: yup
      .string()
      .required(`${I18n.t('birthday')} ${I18n.t('required1')}`),
    PhoneNumber: yup
      .string()
      .required(`${I18n.t('phonenumber')} ${I18n.t('required1')}`),

  });
};
