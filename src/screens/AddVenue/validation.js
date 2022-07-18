import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values => {
  return yup.object().shape({
    // PlaceTypeID: yup
    //   .string()
    //   .required(`${I18n.t('type')} ${I18n.t('required')}`),
    // LegalEntityID: yup
    //   .string()
    //   .required(`${I18n.t('type')} ${I18n.t('required')}`),
    // LegalNameID: yup
    //   .string()
    //   .required(`${I18n.t('legalname')} ${I18n.t('required')}`),
    AreaID: yup
      .string()
      .required(`${I18n.t('area')} ${I18n.t('required')}`),
    // VenuePlace_Name: yup
    //   .string()
    //   .required(`${I18n.t('legalname')} ${I18n.t('required')}`),
    VenuePlace_Desc: yup
      .string()
      .required(`${I18n.t('VenuePlace_Desc')} ${I18n.t('required')}`),

    ChairsNo: yup
      .string()
      .required(`${I18n.t('chairsNo')} ${I18n.t('required1')}`),
    Price: yup
      .string()
      .required(`${I18n.t('price')} ${I18n.t('required1')}`),

    img1files: yup
      .string()
      .required(`${I18n.t('uploadphoto')} ${I18n.t('required1')}`),

    img2files: yup
      .string()
      .required(`${I18n.t('uploadphoto')} ${I18n.t('required1')}`),

    img3files: yup
      .string()
      .required(`${I18n.t('uploadphoto')} ${I18n.t('required1')}`),

    img4files: yup
      .string()
      .required(`${I18n.t('uploadphoto')} ${I18n.t('required1')}`),
    CountryID: yup
      .string()
      .required(`${I18n.t('country')} ${I18n.t('required1')}`),
    CityID: yup
      .string()
      .required(`${I18n.t('city')} ${I18n.t('required')}`),
      Resumefiles: yup
      .string()
      .required(`${I18n.t('resume')} ${I18n.t('required')}`),
      CResumfiles: yup
      .string()
      .required(`${I18n.t('CR')} ${I18n.t('required')}`),

  });
};
