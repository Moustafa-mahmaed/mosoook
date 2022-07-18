import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values => {
  return yup.object().shape({
    VenueProviderType: yup
      .string()
      .required(`${I18n.t('type')} ${I18n.t('required')}`),
    LegalEntity: yup
      .string()
      .required(`${I18n.t('legalentity')} ${I18n.t('required')}`),
    LegalName: yup
      .string()
      .required(`${I18n.t('legalname')} ${I18n.t('required')}`),
    Website: yup
      .string()
      .required(`${I18n.t('website')} ${I18n.t('required')}`),
    Email: yup
      .string()
      .required(`${I18n.t('email')} ${I18n.t('required')}`).email(I18n.t('email-invalid')),
    Phone: yup
      .string()
      .required(`${I18n.t('phone')} ${I18n.t('required1')}`),
    NationalityID: yup
      .string()
      .required(`${I18n.t('nationality')} ${I18n.t('required1')}`),
    CountryID: yup
      .string()
      .required(`${I18n.t('country')} ${I18n.t('required1')}`),
    CityID: yup
      .string()
      .required(`${I18n.t('city')} ${I18n.t('required')}`),
    AreaID: yup
      .string()
      .required(`${I18n.t('area')} ${I18n.t('required')}`),
    // ChairsNo: yup
    //   .string()
    //   .required(`${I18n.t('chairsNo')} ${I18n.t('required')}`),
    // Manual: yup
    //   .string()
    //   .required(`${I18n.t('manual')} ${I18n.t('required')}`),
    // Price: yup
    //   .string()
    //   .required(`${I18n.t('price')} ${I18n.t('required')}`),
    Resume: yup
      .string()
      .required(`${I18n.t('resume')} ${I18n.t('required')}`),
    CR: yup
      .string()
      .required(`${I18n.t('CR')} ${I18n.t('required')}`),
    // img1file: yup
    //   .string()
    //   .required(`${I18n.t('uploadPhoto')} ${I18n.t('required')}`),
    // img2files: yup
    //   .string()
    //   .required(`${I18n.t('uploadPhoto')} ${I18n.t('required')}`),
  });
};
