import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = values => {
  return yup.object().shape({
    SpecialityID: yup
      .string()
      .required(`${I18n.t('speciality')} ${I18n.t('required')}`),
    Course_Name: yup
      .string()
      .required(`${I18n.t('CourseTitle')} ${I18n.t('required')}`),
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
    Objectives: yup
      .string()
      .required(`${I18n.t('Objectives')} ${I18n.t('required')}`),
    Course_Price: yup
      .string()
      .required(`${I18n.t('price')} ${I18n.t('required')}`),
    CityID: yup
      .string()
      .required(`${I18n.t('city')} ${I18n.t('required')}`),
    // AvailableSeats: yup
    // .string()
    // .required(`${I18n.t('TotalMemebers')} ${I18n.t('required1')}`),
    Course_Period: yup
      .string()
      .required(`${I18n.t('Course_Period')} ${I18n.t('required1')}`),
    CountryID: yup
      .string()
      .required(`${I18n.t('country')} ${I18n.t('required1')}`),
    InstructorName: yup
      .string()
      .required(`${I18n.t('InstructorName')} ${I18n.t('required')}`),
    Advantages: yup
      .string()
      .required(`${I18n.t('advantage')} ${I18n.t('required')}`),
    // place: yup
    //   .string()
    //   .required(`${I18n.t('place')} ${I18n.t('required')}`),
    // onlinelink: yup
    //   .string()
    //   .required(`${I18n.t('onlinelink')} ${I18n.t('required')}`),
    InstructorResume: yup
      .string()
      .required(`${I18n.t('instructorresume')} ${I18n.t('required')}`),
    TrainingDetails: yup
      .string()
      .required(`${I18n.t('Trainerdetails')} ${I18n.t('required')}`),
    PeriodWithHours: yup
      .string()
      .required(`${I18n.t('hours')} ${I18n.t('required')}`),
    ForHow: yup
      .string()
      .required(`${I18n.t('ForHow')} ${I18n.t('required')}`),
    imgfile: yup
      .string()
      .required(`${I18n.t('coverPhoto')} ${I18n.t('required')}`),
  });
};
