import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values => {
  return yup.object().shape({

    newpassword: yup
      .string()
      .required(`${I18n.t('password')} ${I18n.t('required1')}`),
    reenterpassword: yup
      .string()
      .required(`${I18n.t('password')} ${I18n.t('required1')}`)
      .test('passwords-match', 'Passwords must be identical', function (value) {
        return this.parent.newpassword === value;
      }),
  });
};
