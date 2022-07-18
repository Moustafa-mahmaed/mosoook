import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values => {
  return yup.object().shape({
    userName: yup
      .string()
      .required(`${I18n.t('userName')} ${I18n.t('required')}`),
    password: yup
      .string()
      .required(`${I18n.t('password')} ${I18n.t('required1')}`),
      confirmpassword: yup
      .string()
      .required(`${I18n.t('password')} ${I18n.t('required1')}`)
      .test('passwords-match', 'Passwords must be identical', function(value) {
      return this.parent.password === value;
    }),
  });
};
