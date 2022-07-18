import React, { Component, useState } from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, Picker, DatePicker } from '../../ui';
import { Formik } from 'formik';
import { Image as RNImage } from 'react-native'
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import { validationSchema } from './validation';
import { API_ENDPOINT } from '../../configs';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import DocumentPicker from 'react-native-document-picker';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import Profile from '../../components/Profile';

const ServiceProvider = () => {
  const [loading, setLoading] = useState(false);
   const [resume, setResume] = useState(null);
  const [cr, setCR] = useState(null);
  const user = useSelector(state => state.auth.user);
  console.log("uuuuuuuuuuuuuuuuuuuuuu ", user)
  const rtl = useSelector(state => state.lang.rtl);




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
      formData.append(value, values[value]);
    });
    setLoading(true);
    console.log("service provider form data : ", formData)

    Axios
      .post(`${API_ENDPOINT}ServiceRequesters?email=${user.UserEmail}`, { formData })
      .then(res => {
        console.log("*******************", res.data)
        setLoading(false)
        Navigation.push({ name: 'Success', })
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

      
      <Text>{I18n.t('speciality')}</Text>
      <Input
        {...injectFormProps('speciality')}
        placeholder={I18n.t('speciality')}
      />
      <Text>{I18n.t('coursetitle')}</Text>
      <Input
        {...injectFormProps('coursetitle')}
        placeholder={I18n.t('coursetitle')}
      />



<View row width={90} style={{ justifyContent: 'space-between' }}>
<View>
 <Text>{I18n.t('fromdate')}</Text>
      <DatePicker
        size={6}
        width={40}
        date
        onSelect={date => {
          setFieldValue('DateOfBirth', date)
        }}
        placeholder={I18n.t('fromdate')}
        momentFormat="YYYY / MM / DD"
        maxDate={new Date()}
        mb={errors.DateOfBirth ? 2 : 5}
        rightItems={<Icon name='calendar' type={'AntDesign'} size={10} color={colors.blue} pr={5} />}
      />
      {errors.DateOfBirth && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('establishingdata')} ${I18n.t('required')}`}</Text>}
</View>
<View>

 <Text>{I18n.t('todate')}</Text>
      <DatePicker
        size={6}
        width={40}
        date
        onSelect={date => {
          setFieldValue('DateOfBirth', date)
        }}
        placeholder={I18n.t('todate')}
        momentFormat="YYYY / MM / DD"
        maxDate={new Date()}
        mb={errors.DateOfBirth ? 2 : 5}
        rightItems={<Icon name='calendar' type={'AntDesign'} size={10} color={colors.blue} pr={5} />}
      />
      {errors.DateOfBirth && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('establishingdata')} ${I18n.t('required')}`}</Text>}
</View>


</View>




<View row width={90} style={{ justifyContent: 'space-between' }}>
<View>
 <Text>{I18n.t('fromtime')}</Text>
      <DatePicker
        size={6}
        width={40}
        time
        onSelect={date => {
          setFieldValue('DateOfBirth', date)
        }}
        placeholder={I18n.t('fromtime')}
        momentFormat="hh: mm"
        maxDate={new Date()}
        mb={errors.DateOfBirth ? 2 : 5}
        rightItems={<Icon name='calendar' type={'AntDesign'} size={10} color={colors.blue} pr={5} />}
      />
      {errors.DateOfBirth && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('establishingdata')} ${I18n.t('required')}`}</Text>}
</View>
<View>

 <Text>{I18n.t('totime')}</Text>
      <DatePicker
        size={6}
        width={40}
        time
        onSelect={date => {
          setFieldValue('DateOfBirth', date)
        }}
        placeholder={I18n.t('totime')}
        momentFormat="hh: mm"
        maxDate={new Date()}
        mb={errors.DateOfBirth ? 2 : 5}
        rightItems={<Icon name='calendar' type={'AntDesign'} size={10} color={colors.blue} pr={5} />}
      />
      {errors.DateOfBirth && <Text size={5.5} mb={5} color={colors.error}>{`${I18n.t('establishingdata')} ${I18n.t('required')}`}</Text>}
</View>


</View>


<Text>{I18n.t('country')}</Text>
      <Picker
        {...injectFormProps('CountryID')}
        placeholder={I18n.t('country')}
        showSearchFilter
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

 <Text>{I18n.t('instructorname')}</Text>
           <Input
        {...injectFormProps('instructorname')}
        placeholder={I18n.t('instructorname')}
      />

 <Text>{I18n.t('hours')}</Text>
           <Input
        {...injectFormProps('hours')}
        placeholder={I18n.t('hours')}
      />

      
 <Text>{I18n.t('objective')}</Text>
           <Input
        {...injectFormProps('objective')}
        placeholder={I18n.t('objective')}
        height={15}
      />

      
 <Text>{I18n.t('advantage')}</Text>
           <Input
        {...injectFormProps('advantage')}
        placeholder={I18n.t('advantage')}
        height={15}
      />

 <Text>{I18n.t('forhow')}</Text>
           <Input
        {...injectFormProps('forhow')}
        placeholder={I18n.t('forhow')}
        height={15}
      />

<View row width={90} style={{ justifyContent: 'space-between' }}>
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
</View>
 <View flex stretch row spaceBetween>
        <View stretch flex={0.48} >
          <Text>{I18n.t('instructorresume')}</Text>
          <View stretch row spaceBetween bw={1} borderRadius={10} p={3}
            backgroundColor='white' bc={colors.blue}
            onPress={() => {
              choiceFiles('resume', setFieldValue)
            }}
          >
            <Text numberOfLines={1} size={resume ? 5 : 7}>{resume ? resume.name : I18n.t('uploadfile')}</Text>
            <Icon name='file-upload' type='FontAwesome5' size={10} color={colors.blue} />
          </View>
          {errors.Resume && <Text size={5.5} color={colors.error}>{`${I18n.t('resume')} ${I18n.t('required')}`}</Text>}
        </View>
        <View stretch flex={0.48}>
          <Text>{I18n.t('Trainerdetails')}</Text>
          <View stretch row spaceBetween bw={1} borderRadius={10} p={3}
            backgroundColor='white' bc={colors.blue}
            onPress={() => {
              choiceFiles('CR', setFieldValue)
            }}
          >
            <Text numberOfLines={1} size={cr ? 5 : 7}>{cr ? cr.name : I18n.t('uploadfile')}</Text>
            <Icon name='file-upload' type='FontAwesome5' size={10} color={colors.blue} />
          </View>
          {errors.CR && <Text size={5.5} color={colors.error}>{`${I18n.t('CR')} ${I18n.t('required')}`}</Text>}
        </View>
      </View>


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
      <View center >
      <TitleHeader Title='Add new course' />
        {/* <Profile 
         screenName={'VenuProvider'} 
         ProfileName="Taha abd el Rahman"
          ProfileType="Trainer Provider" /> */}
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
