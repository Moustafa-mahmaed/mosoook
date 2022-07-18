import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values => {
  return yup.object().shape({
    FirstName: yup
    .string()
    .required(`${I18n.t('firstname')} ${I18n.t('required')}`),
    UserEmail: yup
      .string()
      .required(`${I18n.t('email')} ${I18n.t('required')}`).email(I18n.t('email-invalid')),
    UserPassword: yup
      .string()
      .required(`${I18n.t('password')} ${I18n.t('required1')}`)
      .min(
        6,
        `${I18n.t('password')} ${I18n.t('password_length')} 6 ${I18n.t(
          'chars_and_numbers',
        )}`,
      ),
    confirmpassword: yup
      .string()
      .required(`${I18n.t('password')} ${I18n.t('required1')}`)
      .test('passwords-match', 'Passwords must be identical', function (value) {
        return values.UserPassword === value;
      }),
  });
};
