import React, { Component, useState } from 'react';
import { View, Text, Wrapper, TextArea, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, Picker, DatePicker } from '../../ui';
import { Formik } from 'formik';
import { Image as RNImage } from 'react-native'
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import { validationSchema } from './validation';
import { API_ENDPOINT } from '../../configs';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import DocumentPicker from 'react-native-document-picker';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import moment from 'moment';
import { UserData } from '../../actions/authActions';
import Profile from '../../components/Profile';
import RadioButtonRN from 'radio-buttons-react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const TrainingProvider = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.auth.user);
  // console.log("uuuuuuuuuuuuuuuuuuuuuu ", user)
  const rtl = useSelector(state => state.lang.rtl);
  const [InstructorResume, setInstructorResume] = useState(null);
  const [TrainingDetails, setTrainingDetails] = useState(null);
  const [preWork, setPreWork] = useState(null);
  const [countryName, setCountryName] = useState('Egypt');
  const [imgfile, setimgfile] = useState(null);

  const dispatch = useDispatch();

  const choiceFiles = (type, setFieldValue) => {
    let permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MEDIA_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    request(permission).then(async result => {
      switch (result) {
        case RESULTS.GRANTED:
          try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
            });
            if (
              res.name.includes('.pdf') ||
              res.name.includes('.docx') ||
              res.name.includes('.doc') ||
              res.name.includes('.xlsx') ||
              res.name.includes('.xlsm') ||
              res.name.includes('.xlsb')
            ) {
              console.log("rrrr ", res)
              let data = {
                uri: res.uri,
                type: res.type,
                name: res.name,
              };
              if (type === 'InstructorResume') {
                setInstructorResume(data);
                setFieldValue('InstructorResume', data)
              }
              else if (type === 'TrainingDetails') {
                setTrainingDetails(data)
                setFieldValue('TrainingDetails', data)
              }
              else if (type === 'imgfile') {
                setimgfile(data)
                setFieldValue('imgfile', data)
              }
              else if (type === 'PreWork') {
                setPreWork(data)
                setFieldValue('PreWork', data)
              }
            } else if (
              res.name.includes('.png') ||
              res.name.includes('.jpg') ||
              res.name.includes('.jpeg')
            ) {
              let data = {
                uri: res.uri,
                type: res.type ? res.type : 'image/png',
                name: res.name ? res.name : 'fileName',
              };
              if (type === 'InstructorResume') {
                setInstructorResume(data);
                setFieldValue('InstructorResume', data)
              }
              else if (type === 'TrainingDetails') {
                setTrainingDetails(data)
                setFieldValue('TrainingDetails', data)
              }
              else if (type === 'imgfile') {
                setimgfile(data)
                setFieldValue('imgfile', data)
              }
              else if (type === 'PreWork') {
                setPreWork(data)
                setFieldValue('PreWork', data)
              }
            } else {
              setTimeout(() => {
                showError(I18n.t('This file is not supported'));
              }, 1000);
            }
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
          break;
      }
    });
  };
  const choiceImage = (type, setFieldValue) => {
    let permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MEDIA_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    request(permission).then(async result => {
      switch (result) {
        case RESULTS.GRANTED:
          try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.images],
            });
            if (
              res.name.includes('.png') ||
              res.name.includes('.jpg') ||
              res.name.includes('.jpeg')
            ) {
              let data = {
                uri: res.uri,
                type: res.type ? res.type : 'image/png',
                name: res.name ? res.name : 'fileName',
              };
              if (type === 'InstructorResume') {
                setInstructorResume(data);
                setFieldValue('InstructorResume', data)
              }
              else if (type === 'TrainingDetails') {
                setTrainingDetails(data)
                setFieldValue('TrainingDetails', data)
              }
              else if (type === 'imgfile') {
                setimgfile(data)
                setFieldValue('imgfile', data)
              }
              else if (type === 'UploadPhoto2') {
                setUploadPhoto2(data)
                setFieldValue('UploadPhoto2', data)
              }
            } else {
              setTimeout(() => {
                showError(I18n.t('This file is not supported'));
              }, 1000);
            }
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
          break;
      }
    });
  };
  const onSubmit = values => {
    let formData = new FormData();
    Object.keys(values).forEach((value, index) => {
      console.log('value ', value, ' values ', values[value]);
      if (values[value] !== undefined) {
        formData.append(value, values[value]);
      }

    });
    setLoading(true);
    console.log("Add new course data : ", formData)

    Axios
      .post(`${API_ENDPOINT}Courses`, formData)
      .then(async res => {
        console.log("*******************", res.data)
        setLoading(false)
        Navigation.push({ name: 'Success', passProps: { type: 'T', message: `${I18n.t('addNewCourse')}` } })
      })
      .catch(error => {
        setLoading(false)
        console.log("error ", error)
        console.log("error ", error.response)
        if (!error.response) {
          showError(I18n.t('ui-networkConnectionError'));
          return;
        } else {
          showError(error.response.data.errors);
        }
      });
  };

  const renderForm = ({ injectFormProps, handleSubmit, setFieldValue, errors }) => (
    <View stretch ph={1} mt={10} mh={5} >
      <Text>{I18n.t('CourseTitle')}</Text>
      <Input
        {...injectFormProps('Course_Name')}
        placeholder={I18n.t('CourseTitle')}
      />
      <Text>{I18n.t('speciality')}</Text>

      <Picker
        {...injectFormProps('SpecialityID')}
        placeholder={I18n.t('speciality')}
        showSearchFilter
        onChange={(value, label, item) => { console.log(label, item), setFieldValue('SpecialityID', item.value) }}
        apiRequest={{
          url: `${API_ENDPOINT}Specialities`,
          params: {},
          responseResolver: response => {
            return {
              data: response.data,
            };
          },
          transformData: item => ({
            label: rtl ? item.SpecialityNameAr : item.SpecialityNameEn,
            value: item.SpecialityID,
          }),
        }}
      />

      <View flex stretch row spaceBetween >
        <Text>{I18n.t('CourseStartDate')}</Text>
        <Text>{I18n.t('CourseEndDate')}</Text>
      </View>
      <View flex stretch row spaceBetween >
        <View stretch>
          <DatePicker
            size={6}
            date
            width={45}
            onSelect={date => {
              setFieldValue('CourseStartDate', moment(date).format('DD/MM/YYYY'))
            }}
            placeholder={I18n.t('CourseStartDate')}
            momentFormat="YYYY / MM / DD"
            // maxDate={new Date()}
            mb={errors.CourseStartDate ? 2 : 5}
            rightItems={<Icon name='calendar' type={'AntDesign'} size={10} color={colors.blue} pr={5} />}
          />
          {errors.CourseStartDate && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('CourseStartDate')} ${I18n.t('required')}`}</Text>}
        </View>
        <View stretch>
          <DatePicker
            size={6}
            date
            width={45}
            onSelect={date => {
              setFieldValue('CourseEndDate', moment(date).format('DD/MM/YYYY'))
            }}
            placeholder={I18n.t('CourseEndDate')}
            momentFormat="YYYY / MM / DD"
            // maxDate={new Date()}
            mb={errors.CourseEndDate ? 2 : 5}
            rightItems={<Icon name='calendar' type={'AntDesign'} size={10} color={colors.blue} pr={5} />}
          />
          {errors.CourseEndDate && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('CourseEndDate')} ${I18n.t('required')}`}</Text>}
        </View>
      </View>
      <View flex stretch row spaceBetween >
        <Text>{I18n.t('FromTime')}</Text>
        <Text>{I18n.t('ToTime')}</Text>
      </View>
      <View flex stretch row spaceBetween >
        <View stretch>
          <DatePicker
            size={6}
            time
            width={45}
            onSelect={time => {
              setFieldValue('FromTime', moment(time).format('hh:mm:ss'))
            }}
            placeholder={I18n.t('FromTime')}
            momentFormat="hh : mm a"
            maxDate={new Date()}
            mb={errors.FromTime ? 2 : 5}
            rightItems={<Icon name='access-time' type={'MaterialIcons'} size={10} color={colors.blue} pr={5} />}
          />
          {errors.FromTime && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('FromTime')} ${I18n.t('required')}`}</Text>}
        </View>
        <View stretch>

          <DatePicker
            size={6}
            time
            width={45}
            onSelect={time => {
              setFieldValue('ToTime', moment(time).format('hh:mm:ss'))
            }}
            placeholder={I18n.t('ToTime')}
            momentFormat="hh : mm a"
            maxDate={new Date()}
            mb={errors.ToTime ? 2 : 5}
            rightItems={<Icon name='access-time' type={'MaterialIcons'} size={10} color={colors.blue} pr={5} />}
          />
          {errors.ToTime && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('ToTime')} ${I18n.t('required')}`}</Text>}
        </View>
      </View>
      <Text>{I18n.t('country')}</Text>
      <Picker
        {...injectFormProps('CountryID')}
        placeholder={I18n.t('country')}
        showSearchFilter
        onChange={(value, label, item) => { console.log(label, item), setCountryName(item.label), setFieldValue('CountryID', item.value) }}

        apiRequest={{
          url: `${API_ENDPOINT}Countries`,
          params: {},
          responseResolver: response => {
            //  console.log("country name :::>", response.data)
            return {
              data: response.data,
            };
          },
          transformData: item => ({
            label: rtl ? item.CountryNameAr : item.CountryNameEn,
            value: item.CountryID,
          }),
        }}
      />
      <Text>{I18n.t('city')}</Text>
      <Picker
        {...injectFormProps('CityID')}
        placeholder={I18n.t('city')}
        showSearchFilter
        onChange={(value, label, item) => { setFieldValue('CityID', item.value) }}

        apiRequest={{
          url: `${API_ENDPOINT}Cities/GetCityByCountry?countryName=${countryName}`,
          params: {},
          responseResolver: response => {
            console.log("redddd::>> ", response)
            return {
              data: response.data,
            };
          },
          transformData: item => ({
            label: rtl ? item.CityNameAr : item.CityName,
            value: item.Id,
          }),
        }}
      />
      <Text>{I18n.t('InstructorName')}</Text>
      <Input
        {...injectFormProps('InstructorName')}
        placeholder={I18n.t('InstructorName')}
      />
      <Text>{I18n.t('hours')}</Text>
      <Input
        {...injectFormProps('PeriodWithHours')}
        placeholder={I18n.t('hours')}
        phone
      />
      <Text>{I18n.t('price')}</Text>
      <Input
        {...injectFormProps('Course_Price')}
        placeholder={I18n.t('price')}
        phone
        rightItems={<Text color={colors.graytextC} pr={5} >{'US'}</Text>}

      />
      <Text>{I18n.t('Objectives')}</Text>
      <TextArea
        {...injectFormProps('Objectives')}
        placeholder={I18n.t('Objectives')}
        backgroundColor={colors.white}
        bc={colors.blue}
        bw={1}
        size={7}
      />
      <Text>{I18n.t('advantage')}</Text>
      <TextArea
        {...injectFormProps('Advantages')}
        placeholder={I18n.t('advantage')}
        backgroundColor={colors.white}
        bc={colors.blue}
        bw={1}
        size={7}
      />
      <Text>{I18n.t('ForHow')}</Text>
      <TextArea
        {...injectFormProps('ForHow')}
        placeholder={I18n.t('ForHow')}
        backgroundColor={colors.white}
        bc={colors.blue}
        bw={1}
        size={7}
      />
      <Text>{I18n.t('type')}</Text>
      <RadioButtonRN
        box={false}
        activeColor={colors.orange}
        data={[
          {
            label: 'Virtual'
          },
          {
            label: 'On Place'
          },

        ]}

        boxStyle={{ width: 200, backgroundColor: "transparent", borderWidth: 0 }}
        deactiveColor={colors.blue}
        selectedBtn={(e) => {
          setFieldValue('Type', e['label'])
        }
        }
      />

      {/* <View row width={90} style={{ justifyContent: 'space-between' }}>
<View>

      <Text>{I18n.t('place')}</Text>
      <Input
      width={40} 
        {...injectFormProps('place')}
        placeholder={I18n.t('place')}
        
      />
</View>
<View>
      <Text>{I18n.t('onlinelink')}</Text>
      <Input
      width={40} 
        {...injectFormProps('onlinelink')}
        placeholder={I18n.t('onlinelink')}
        
      />
</View>
</View> */}
      <View flex stretch row spaceBetween>
        <View stretch flex={0.48} >
          <Text>{I18n.t('instructorresume')}</Text>
          <View stretch row spaceBetween bw={1} borderRadius={10} p={3}
            backgroundColor='white' bc={colors.blue}
            onPress={() => {
              choiceFiles('InstructorResume', setFieldValue)
            }}
          >
            <Text numberOfLines={1} size={InstructorResume ? 5 : 7}>{InstructorResume ? InstructorResume.name : I18n.t('uploadfile')}</Text>
            <Icon name='file-upload' type='FontAwesome5' size={10} color={colors.blue} />
          </View>
          {errors.InstructorResume && <Text size={5.5} color={colors.error}>{`${I18n.t('instructorresume')} ${I18n.t('required')}`}</Text>}
        </View>
        <View stretch flex={0.48}>
          <Text>{I18n.t('Trainerdetails')}</Text>
          <View stretch row spaceBetween bw={1} borderRadius={10} p={3}
            backgroundColor='white' bc={colors.blue}
            onPress={() => {
              choiceFiles('TrainingDetails', setFieldValue)
            }}
          >
            <Text numberOfLines={1} size={TrainingDetails ? 5 : 7}>{TrainingDetails ? TrainingDetails.name : I18n.t('uploadfile')}</Text>
            <Icon name='file-upload' type='FontAwesome5' size={10} color={colors.blue} />
          </View>
          {errors.TrainingDetails && <Text size={5.5} color={colors.error}>{`${I18n.t('Trainerdetails')} ${I18n.t('required')}`}</Text>}
        </View>
      </View>
      <Text>{I18n.t('coverPhoto')}</Text>
      <View stretch row spaceBetween bw={1} borderRadius={10} p={3}
        backgroundColor='white' bc={colors.blue}
        onPress={() => {
          choiceImage('imgfile', setFieldValue)
        }}
      >
        <Text numberOfLines={1} size={imgfile ? 5 : 7}>{imgfile ? imgfile.name : I18n.t('coverPhoto')}</Text>
        <Icon name='file-upload' type='FontAwesome5' size={10} color={colors.blue} />
      </View>
      {errors.imgfile && <Text size={5.5} color={colors.error}>{`${I18n.t('uploadphoto')} ${I18n.t('required')}`}</Text>}
      {/* <Text>{I18n.t('TotalMemebers')}</Text>
      <Input
        {...injectFormProps('AvailableSeats')}
        placeholder={I18n.t('TotalMemebers')}
        phone
      /> */}

      <Button
        title={I18n.t('add')}
        stretch
        onPress={loading ? null : handleSubmit}
        processing={loading}
        m={10}
        mh={45}
      />


    </View >
  );

  return (
    <Wrapper >
      <Header Back />
      <View center pv={5} >
        <Profile
          screenName={'VenuProvider'}
          ProfileName="Taha abd el Rahman"
          ProfileType="Trainer Provider" />
      </View>
      <ScrollView flex stretch center >
        <TitleHeader Title={I18n.t('addNewCourse')} />
        <Form
          schema={{
            CourseOwnerUserID: user.UserID,
            // CourseOwnerType: user.UserType,
            SpecialityID: '',
            Course_Name: '',
            Course_Price: '',
            FromTime: '',
            ToTime: '',
            CourseStartDate: '',
            CourseEndDate: '',
            CountryID: '',
            InstructorName: '',
            Objectives: '',
            Course_Desc: ' ',
            ForHow: '',
            TotalMemebers: '50',
            CityID: '',
            InstructorResume: '',
            TrainingDetails: '',
            Course_Period: '0',
            Advantages: '',
            // place:'',
            PeriodWithHours: '',
            // onlinelink:'',
            imgfile: '',
            Type: '',

          }}
          onSubmit={onSubmit}
          render={renderForm}
          validationSchema={validationSchema}
        />
      </ScrollView>

    </Wrapper>
  );
};

export default TrainingProvider;
