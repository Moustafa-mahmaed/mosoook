import React, { Component, useState } from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, Picker, DatePicker } from '../../ui';
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

const ServiceProvider = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.auth.user);
  // console.log("uuuuuuuuuuuuuuuuuuuuuu ", user)
  const rtl = useSelector(state => state.lang.rtl);
  const [callingCode, setCallingCode] = useState('966');
  const [countryCode, setCountryCode] = useState('SA')
  const [dark, setDark] = useState(false)
  const [visible, setVisible] = useState(false)
  const [countryName, setCountryName] = useState('Egypt');

  const dispatch = useDispatch();

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
    console.log("service provider form data : ", "DateOfBirth", values.DateOfBirth,)
    Axios.post(`${API_ENDPOINT}ServiceRequesters?email=${user.UserEmail}`,
      {
        "ServiceRequesterID": values.ServiceRequesterID,
        "ServiceRequesterType": values.ServiceRequesterType,
        "LegalEntity": values.LegalEntity,
        "LegalName": values.LegalName,
        "Website": values.Website,
        "Email": values.Email,
        "Phone": values.Phone,
        "NationalityID": values.NationalityID,
        "CountryID": values.CountryID,
        "CityID": values.CityID,
        "Manual": values.Manual,
        "DateOfBirth": values.DateOfBirth,
        "SpecialityID": values.SpecialityID,
        "SubSpeciality": values.SubSpeciality,
      })
      .then(async res => {
        console.log("*******************", res.data)
        setLoading(false)
        await getUserData();
        Navigation.push({ name: 'Success', passProps: { type: 'S', message: `${I18n.t('servicerequister')}` } })
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
            {...injectFormProps('ServiceRequesterType')}
            placeholder={I18n.t('type')}
            showSearchFilter
            apiRequest={{
              url: `${API_ENDPOINT}SRTypes`,
              params: {},
              responseResolver: response => {
                return {
                  data: response.data,
                };
              },
              transformData: item => ({
                label: rtl ? item.SRTypeNameAr : item.SRTypeNameEn,
                value: item.SRTypeID,
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
              url: `${API_ENDPOINT}SRLegalEntities`,
              params: {},
              responseResolver: response => {
                return {
                  data: response.data,
                };
              },
              transformData: item => ({
                label: rtl ? item.SRLegalEntityNameAr : item.SRLegalEntityNameEn,
                value: item.SRLegalEntityID,
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
            // console.log("redddd ", response)
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
      <View flex stretch row spaceBetween >
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
        <View stretch flex={0.48}>
          <Text>{I18n.t('manual')}</Text>
          <Input
            {...injectFormProps('Manual')}
            placeholder={I18n.t('manual')}
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
        <TitleHeader Title={I18n.t('servicerequister')} />
      </View>
      <ScrollView flex stretch center >
        <Form
          schema={{
            ServiceRequesterID: user.UserID,
            ServiceRequesterType: '',
            LegalEntity: '',
            LegalName: '',
            Website: '',
            Email: '',
            Phone: '',
            NationalityID: '',
            CountryID: '',
            CityID: '',
            Manual: '',
            DateOfBirth: '',
            SpecialityID: '',
            SubSpeciality: '',
          }}
          onSubmit={onSubmit}
          render={renderForm}
          validationSchema={validationSchema}
        />
      </ScrollView>

    </Wrapper>
  );
};

export default ServiceProvider;
