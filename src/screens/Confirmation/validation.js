import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values => {
  return yup.object().shape({
  
    FromTime: yup
      .string()
      .required(`${I18n.t('FromTime')} ${I18n.t('required')}`),
    ToTime: yup
      .string()
      .required(`${I18n.t('ToTime')} ${I18n.t('required')}`),
      CourseStartDate: yup
      .string()
      .required(`${I18n.t('CourseStartDate')} ${I18n.t('required')}`),
      CourseEndDate: yup
      .string()
      .required(`${I18n.t('CourseEndDate')} ${I18n.t('required')}`),
   
      CourseSchedule: yup
      .string()
      .required(`${I18n.t('CourseSchedule')} ${I18n.t('required')}`),
 
    // // onlinelink: yup
    // //   .string()
    // //   .required(`${I18n.t('onlinelink')} ${I18n.t('required')}`),
     // // Course_Location: yup
    // //   .string()
    // //   .required(`${I18n.t('Course_Location')} ${I18n.t('required')}`),
  
  });
};
