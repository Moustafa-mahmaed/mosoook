import React, { Component, useState } from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, Picker, DatePicker, responsiveWidth, moderateScale } from '../../ui';
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
import CountryPicker, { getAllCountries, getCallingCode, DARK_THEME } from 'react-native-country-picker-modal';
const TrainingProvider = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.auth.user);
  // console.log("uuuuuuuuuuuuuuuuuuuuuu ", user)
  const rtl = useSelector(state => state.lang.rtl);
  const [resume, setResume] = useState(null);
  const [cr, setCR] = useState(null);
  const [preWork, setPreWork] = useState(null);
  const [countryName, setCountryName] = useState('Egypt');
  const [callingCode, setCallingCode] = useState('966');
  const [countryCode, setCountryCode] = useState('SA')
  const [dark, setDark] = useState(false)
  const [visible, setVisible] = useState(false)

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
              if (type === 'resume') {
                setResume(data);
                setFieldValue('Resume', data)
              }
              else if (type === 'CR') {
                setCR(data)
                setFieldValue('CR', data)
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
              if (type === 'resume') {
                setResume(data);
                setFieldValue('Resume', data)
              }
              else if (type === 'CR') {
                setCR(data)
                setFieldValue('CR', data)
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

  const getUserData = values => {
    setLoading(true)
    Axios
      .get(`${API_ENDPOINT}Users/GetUserData?userEmail=${user.UserEmail}&userPassword=${user.UserPassword}`)
      .then(res => {
        console.log("*******************", res.data)
        dispatch(UserData(res.data, true));
        setLoading(false)
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

  const onSubmit = values => {
    let formData = new FormData();
    Object.keys(values).forEach((value, index) => {
      console.log('value ', value, ' values ', values[value]);
      if (values[value] !== undefined) {
        formData.append(value, values[value]);
      }

    });
    setLoading(true);
    console.log("Training provider form data : ", formData)

    Axios
      .post(`${API_ENDPOINT}TrainingProviders?email=${user.UserEmail}`, formData)
      .then(async res => {
        console.log("*******************", res.data)
        setLoading(false)
        await getUserData()
        Navigation.push({ name: 'Success', passProps: { type: 'T', message: `${I18n.t('trainerprovider')}` } })
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

      <View flex stretch row spaceBetween >
        <View stretch flex={0.48}>
          <Text>{I18n.t('type')}</Text>
          <Picker
            {...injectFormProps('TrainingProviderType')}
            placeholder={I18n.t('type')}
            showSearchFilter
            apiRequest={{
              url: `${API_ENDPOINT}TPTypes`,
              params: {},
              responseResolver: response => {
                return {
                  data: response.data,
                };
              },
              transformData: item => ({
                label: rtl ? item.TPTypeNameAr : item.TPTypeNameEn,
                value: item.TPTypeID,
              }),
            }}
          />
        </View>
        <View stretch flex={0.48}>
          <Text>{I18n.t('legalentity')}</Text>
          <Picker
            {...injectFormProps('LegalEntity')}
            placeholder={I18n.t('legalentity')}
            showSearchFilter
            apiRequest={{
              url: `${API_ENDPOINT}TPLegalEntities`,
              params: {},
              responseResolver: response => {
                return {
                  data: response.data,
                };
              },
              transformData: item => ({
                label: rtl ? item.TPLegalEntityNameAr : item.TPLegalEntityNameEn,
                value: item.TPLegalEntityID,
              }),
            }}
          />
        </View>
      </View>
      <Text>{I18n.t('legalname')}</Text>
      <Input
        {...injectFormProps('LegalName')}
        placeholder={I18n.t('legalname')}
      />
      <Text>{I18n.t('website')}</Text>
      <Input
        {...injectFormProps('Website')}
        placeholder={I18n.t('website')}
      />
      <Text>{I18n.t('email')}</Text>
      <Input
        {...injectFormProps('Email')}
        placeholder={I18n.t('email')}
        email
      />
      <Text>{I18n.t('phone')}</Text>
      <View row mt={-2} stretch>
        <CountryPicker
          withFlag
          withCallingCodeButton
          withAlphaFilter
          withCallingCode
          withCurrency
          withEmoji
          withModal
          withFlagButton
          withFilter
          onSelect={(country) => {
            setCallingCode(callingCode)
            setCountryCode(country.cca2)
          }}
          theme={dark ? DARK_THEME : {}}
          {...{
            countryCode,
            excludeCountries: ['SA'],
            preferredCountries: ['EG', 'SA'],
            modalProps: {
              visible,
            },
            onClose: () => setVisible(false),
            onOpen: () => setVisible(true),
          }}
        />
        <View mt={5}>
          <Input
            {...injectFormProps('Phone')}
            placeholder={I18n.t('phone')}
            phone
            width={68}

          />
        </View>
      </View>

      <Text>{I18n.t('nationality')}</Text>
      <Picker
        {...injectFormProps('NationalityID')}
        placeholder={I18n.t('nationality')}
        showSearchFilter
        onChange={(value, label, item) => { console.log(label, item), setFieldValue('NationalityID', item.value) }}
        apiRequest={{
          url: `${API_ENDPOINT}Nationalities`,
          params: {},
          responseResolver: response => {
            // console.log("redddd ", response)
            return {
              data: response.data,
            };
          },
          transformData: item => ({
            label: rtl ? item.NationalityNameAr : item.NationalityNameEn,
            value: item.NationalityID,
          }),
        }}
      />

      <View flex stretch row spaceBetween>
        <View stretch flex={0.48} >
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
        </View>
        <View stretch flex={0.48}>
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
        </View>
      </View>
      <Text>{I18n.t('establishingdata')}</Text>
      <DatePicker
        size={6}
        date
        onSelect={date => {
          setFieldValue('DateOfBirth', moment(date).format('DD/MM/YYYY'))
        }}
        placeholder={I18n.t('establishingdata')}
        momentFormat="YYYY / MM / DD"
        maxDate={new Date()}
        mb={errors.DateOfBirth ? 2 : 5}
        rightItems={<Icon name='calendar' type={'AntDesign'} size={10} color={colors.blue} pr={5} />}
      />
      {errors.DateOfBirth && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('establishingdata')} ${I18n.t('required')}`}</Text>}

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
      <Text>{I18n.t('subspeciality')}</Text>
      <Input
        {...injectFormProps('SubSpeciality')}
        placeholder={I18n.t('subspeciality')}
      />

      <View flex stretch row spaceBetween>
        <View stretch flex={0.48} >
          <Text>{I18n.t('resume')}</Text>
          <View stretch row spaceBetween bw={1} borderRadius={10} p={3}
            backgroundColor='white' bc={colors.blue}
            onPress={() => {
              choiceFiles('resume', setFieldValue)
            }}
          >
            <Text numberOfLines={1} size={resume ? 5 : 7}>{resume ? resume.name : I18n.t('resume')}</Text>
            <Icon name='file-upload' type='FontAwesome5' size={10} color={colors.blue} />
          </View>
          {errors.Resume && <Text size={5.5} color={colors.error}>{`${I18n.t('resume')} ${I18n.t('required')}`}</Text>}
        </View>
        <View stretch flex={0.48}>
          <Text>{I18n.t('CR')}</Text>
          <View stretch row spaceBetween bw={1} borderRadius={10} p={3}
            backgroundColor='white' bc={colors.blue}
            onPress={() => {
              choiceFiles('CR', setFieldValue)
            }}
          >
            <Text numberOfLines={1} size={cr ? 5 : 7}>{cr ? cr.name : I18n.t('CR')}</Text>
            <Icon name='file-upload' type='FontAwesome5' size={10} color={colors.blue} />
          </View>
          {errors.CR && <Text size={5.5} color={colors.error}>{`${I18n.t('CR')} ${I18n.t('required')}`}</Text>}
        </View>
      </View>
      <Text>{I18n.t('prework')}</Text>
      <View stretch row spaceBetween bw={1} borderRadius={10} p={3}
        backgroundColor='white' bc={colors.blue}
        onPress={() => {
          choiceFiles('PreWork', setFieldValue)
        }}
      >
        <Text numberOfLines={1} size={preWork ? 5 : 7}>{preWork ? preWork.name : I18n.t('prework')}</Text>
        <Icon name='file-upload' type='FontAwesome5' size={10} color={colors.blue} />
      </View>
      {errors.PreWork && <Text size={5.5} color={colors.error}>{`${I18n.t('prework')} ${I18n.t('required')}`}</Text>}


      <Button
        title={I18n.t('register')}
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
      <View center >
        <TitleHeader Title={I18n.t('trainerprovider')} />
      </View>
      <ScrollView flex stretch center >
        <Form
          schema={{
            TrainingProviderID: user.UserID,
            TrainingProviderType: '',
            LegalEntity: '',
            LegalName: '',
            Website: '',
            Email: '',
            Phone: '',
            NationalityID: '',
            CountryID: '',
            CityID: '',
            DateOfBirth: '',
            SpecialityID: '',
            SubSpeciality: '',
            Resume: '',
            CR: '',
            PreWork: '',

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
