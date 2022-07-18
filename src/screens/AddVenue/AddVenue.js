import React, { Component, useState, useReducer } from 'react';
import { View, Text, Wrapper, TextArea, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, Picker, DatePicker } from '../../ui';
import { Formik } from 'formik';
import { Image as RNImage, CheckBox } from 'react-native'
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import { validationSchema } from './validation';
import { API_ENDPOINT } from '../../configs';
import { useSelector } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import RadioButtonRN from 'radio-buttons-react-native';
import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import Profile from '../../components/Profile';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};



const AddVenue = () => {
  const [loading, setLoading] = useState(false);
  const rtl = useSelector(state => state.lang.rtl);
  const [resume, setResume] = useState(null);
  const [cr, setCR] = useState(null);
  const [image, setImage] = useState(null);
  const [Snacks, setSnacks] = useState(false);
  const [Diner, setDiner] = useState(false);
  const [Lunch, setLunch] = useState(false);
  const [HeavySnacks, setHeavySnacks] = useState(false);
  const [countryName, setCountryName] = useState('Egypt');
  const [img1files, setimg1files] = useState(null);
  const [img2files, setimg2files] = useState(null);
  const [img3files, setimg3files] = useState(null);
  const [img4files, setimg4files] = useState(null);
  const user = useSelector(state => state.auth.user);

  const selectedImage = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const img = {
        uri: response.uri,
        type: response.type ? response.type : 'image/png',
        name: 'fileName'
      };
      setImage(img)
    }
  };

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
                setFieldValue('Resumefiles', data)
              }
              else if (type === 'CR') {
                setCR(data)
                setFieldValue('CResumfiles', data)
              }
              else if (type === 'img1files') {
                setimg1files(data)
                setFieldValue('img1files', data)
              }
              else if (type === 'img2files') {
                setimg2files(data)
                setFieldValue('img2files', data)
              }
              else if (type === 'img3files') {
                setimg3files(data)
                setFieldValue('img3files', data)
              }
              else if (type === 'img4files') {
                setimg4files(data)
                setFieldValue('img4files', data)
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
                setFieldValue('Resumefiles', data)
              }
              else if (type === 'CR') {
                setCR(data)
                setFieldValue('CResumfiles', data)
              }
              else if (type === 'img1files') {
                setimg1files(data)
                setFieldValue('img1files', data)
              }
              else if (type === 'img2files') {
                setimg2files(data)
                setFieldValue('img2files', data)
              }
              else if (type === 'img3files') {
                setimg3files(data)
                setFieldValue('img3files', data)
              }
              else if (type === 'img4files') {
                setimg4files(data)
                setFieldValue('img4files', data)
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
              if (type === 'resume') {
                setResume(data);
                setFieldValue('Resumefiles', data)
              }
              else if (type === 'CR') {
                setCR(data)
                setFieldValue('CResumfiles', data)
              }
              else if (type === 'img1files') {
                setimg1files(data)
                setFieldValue('img1files', data)
              }
              else if (type === 'img2files') {
                setimg2files(data)
                setFieldValue('img2files', data)
              }
              else if (type === 'img3files') {
                setimg3files(data)
                setFieldValue('img3files', data)
              }
              else if (type === 'img4files') {
                setimg4files(data)
                setFieldValue('img4files', data)
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
    // formData.append('VenuePlace_Name', values['VenuePlace_Name']);
    // formData.append('VenuePlace_Desc', values['VenuePlace_Desc']);
    // formData.append('PlaceTypeID', values['PlaceTypeID']);
    // formData.append('LegalEntityID', values['LegalEntityID']);
    // formData.append('LegalNameID', values['LegalNameID']);

    setLoading(true);
    console.log("Add venue form data : ", formData)

    Axios
      .post(`${API_ENDPOINT}VenuePlaces/VenuePlaces`, formData)
      .then(async res => {
        console.log("*******************", res.data)
        setLoading(false)
        // await getUserData()
   Navigation.push({ name: 'Success', passProps: { type: 'T', message: `${I18n.t('addvenue')}` } })
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

  const renderForm = ({ injectFormProps, handleSubmit, errors, setFieldValue, values }) => (
    <View stretch ph={1} mt={10} mh={5} >



      <View row stretch spaceBetween>
        <View>
          <Text>{I18n.t('type')}</Text>
          <Picker
            size={7}
            width={40}
            {...injectFormProps('PlaceTypeID')}
            placeholder={I18n.t('type')}
            borderColor={colors.blue}
            showSearchFilter
            apiRequest={{
              url: `${API_ENDPOINT}VPTypes`,
              params: {},
              responseResolver: response => {
                return {
                  data: response.data,
                };
              },
              transformData: item => ({
                label: rtl ? item.VPTypeNameAr : item.VPTypeNameEn,
                value: item.VPTypeID,
              }),
            }}
          />
        </View>
        <View>
          <Text>{I18n.t('legalentity')}</Text>
          <Picker
            size={7}
            width={40}
            {...injectFormProps('LegalEntityID')}
            placeholder={I18n.t('legalentity')}
            showSearchFilter
            apiRequest={{
              url: `${API_ENDPOINT}VPLegalEntities`,
              params: {},
              responseResolver: response => {
                return {
                  data: response.data,
                };
              },
              transformData: item => ({
                label: rtl ? item.VPLegalEntityNameAr : item.VPLegalEntityNameEn,
                value: item.VPLegalEntityID,
              }),
            }}
          />
        </View>
      </View>

      <Text>{I18n.t('legalname')}</Text>
      <Picker
            size={7}
            {...injectFormProps('LegalNameID')}
            placeholder={I18n.t('legalname')}
            showSearchFilter
            apiRequest={{
              url: `${API_ENDPOINT}LegalNames`,
              params: {},
              responseResolver: response => {
                console.log('dataaaaaaaaaa:::',response)

                return {
                  data: response.data,
                };
              },
              transformData: item => ({
                label: rtl ? item.LegalNameAr: item.LegalNameEn,
                value: item.LegalNameID,
              }),
            }}
          />

      <View stretch flex >
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
      </View>
      <View row stretch spaceBetween>
        <View stretch width={92}>
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
        {/* <View>
          <Text>{I18n.t('manual')}</Text>
          <Input
            width={40}
            {...injectFormProps('manual')}
            placeholder={I18n.t('manual')}
          />
        </View> */}
      </View>
      <Text>{I18n.t('area')}</Text>
      <Picker
        {...injectFormProps('AreaID')}
        placeholder={I18n.t('area')}
        showSearchFilter
        apiRequest={{
          url: `${API_ENDPOINT}Areas`,
          params: {},
          responseResolver: response => {
            // console.log("redddd ", response)
            return {
              data: response.data,
            };
          },
          transformData: item => ({
            label: rtl ? item.AreaNameAr : item.AreaNameEn,
            value: item.AreaID,
          }),
        }}
      />
      <Text>{I18n.t('chairsNo')}</Text>

      <Input
        {...injectFormProps('ChairsNo')}
        placeholder={I18n.t('chairsNo')}
      />
      <Text>{I18n.t('price')}</Text>

      <Input
        {...injectFormProps('Price')}
        placeholder={I18n.t('price')}
        rightItems={<Text color={colors.graytextC} pr={5} >{'US'}</Text>}

      />

      <Text>{I18n.t('VenuePlace_Desc')}</Text>
      <TextArea
        {...injectFormProps('VenuePlace_Desc')}
        placeholder={I18n.t('VenuePlace_Desc')}
        backgroundColor={colors.white}
        bc={colors.blue}
        bw={1}
        size={7}
      />


      <View row stretch spaceBetween>
        <View>
          <Text>{I18n.t('uploadphoto')}</Text>
          <View stretch row spaceBetween bw={1} borderRadius={10} p={3}
            backgroundColor='white' bc={colors.blue}
            onPress={() => {
              choiceImage('img1files', setFieldValue)
            }}
          >
            <Text numberOfLines={1}  width={25} size={img1files ? 5 : 7}>{img1files ? img1files.name : I18n.t('uploadphoto')}</Text>
            <Icon name='file-upload' type='FontAwesome5' size={10} color={colors.blue} />
          </View>
          {errors.img1files && <Text size={5.5} color={colors.error}>{`${I18n.t('uploadphoto')} ${I18n.t('required')}`}</Text>}
        </View>
        <View>
          <Text>{I18n.t('uploadphoto')}</Text>
          <View stretch row spaceBetween bw={1} borderRadius={10} p={3}
            backgroundColor='white' bc={colors.blue}
            onPress={() => {
              choiceImage('img2files', setFieldValue)
            }}
          >
            <Text numberOfLines={1}  width={25} size={img2files ? 5 : 7}>{img2files ? img2files.name : I18n.t('uploadphoto')}</Text>
            <Icon name='file-upload' type='FontAwesome5' size={10} color={colors.blue} />
          </View>
          {errors.img2files && <Text size={5.5} color={colors.error}>{`${I18n.t('uploadphoto')} ${I18n.t('required')}`}</Text>}
        </View>

      </View>
      <View row stretch mt={5} spaceBetween>
        <View>
          <Text>{I18n.t('uploadphoto')}</Text>
          <View stretch row spaceBetween bw={1} borderRadius={10} p={3}
            backgroundColor='white' bc={colors.blue}
            onPress={() => {
              choiceImage('img3files', setFieldValue)
            }}
          >
            <Text numberOfLines={1}  width={25} size={img3files ? 5 : 7}>{img3files ? img3files.name : I18n.t('uploadphoto')}</Text>
            <Icon name='file-upload' type='FontAwesome5' size={10} color={colors.blue} />
          </View>
          {errors.img3files && <Text size={5.5} color={colors.error}>{`${I18n.t('uploadphoto')} ${I18n.t('required')}`}</Text>}
        </View>
        <View>
          <Text>{I18n.t('uploadphoto')}</Text>
          <View stretch row spaceBetween bw={1} borderRadius={10} p={3}
            backgroundColor='white' bc={colors.blue}
            onPress={() => {
              choiceImage('img4files', setFieldValue)
            }}
          >
            <Text numberOfLines={1}  width={25} size={img4files ? 5 : 7}>{img4files ? img4files.name : I18n.t('uploadphoto')}</Text>
            <Icon name='file-upload' type='FontAwesome5' size={10} color={colors.blue} />
          </View>
          {errors.img4files && <Text size={5.5} color={colors.error}>{`${I18n.t('uploadphoto')} ${I18n.t('required')}`}</Text>}
        </View>

      </View>
      <View flex stretch row spaceBetween mv={5}>
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
          {errors.Resumefiles && <Text size={5.5} color={colors.error}>{`${I18n.t('resume')} ${I18n.t('required')}`}</Text>}
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
          {errors.CResumfiles && <Text size={5.5} color={colors.error}>{`${I18n.t('CR')} ${I18n.t('required')}`}</Text>}
        </View>
      </View>
      <View row stretch flex spaceBetween >
        <View row>
          <CheckBox
            value={Lunch}
            onValueChange={() => {setLunch(!Lunch);setFieldValue('IsLunch', true)}}
            style={{ color: 'red' }}
            color={'red'}
          />
          <Text >Lunch</Text>
        </View>
        {Lunch && <View>
          <Input
            {...injectFormProps('LunchPrice')}
            placeholder={I18n.t('price')}
            width={30}
          />
        </View>}
      </View>
      <View row stretch flex spaceBetween >
        <View row>
          <CheckBox
            value={Diner}
            onValueChange={() => {setDiner(!Diner);setFieldValue('IsDiner', true)}}
          // style={styles.checkbox}
          />
          <Text >Diner</Text>
        </View>
        {Diner && <View>
          <Input
            {...injectFormProps('DinerPrice')}
            placeholder={I18n.t('price')}
            width={30}
          />
        </View>}
      </View>
      <View stretch >
        <View row>
          <CheckBox
            value={Snacks}
            onValueChange={setSnacks}
          // style={styles.checkbox}
          />
          <Text >Snacks</Text>
        </View>
      </View>
      {Snacks && <View row stretch flex spaceBetween >
        <RadioButtonRN
          box={false}
          activeColor={colors.orange}
          data={[
            {
              label: 'Heavy'
            },
            {
              label: 'Light'
            },
          ]}
          initial={1}
          boxStyle={{ width: 200, backgroundColor: "transparent", borderWidth: 0 }}
          deactiveColor={colors.blue}
          selectedBtn={(e) => {
            setSnacks(true);
            e['label'] == 'Heavy' ? (setFieldValue('IsSnaksHeavy', true), setHeavySnacks(true)) : setFieldValue('IsSnaksLight', true)
          }
          }
        />
        {Snacks && <View>
          <Input
            {...injectFormProps(HeavySnacks ? 'SnaksHeavyPrice' : 'IsSnaksLight')}
            placeholder={I18n.t('price')}
            width={30}
          />
        </View>}
      </View>}
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
        <TitleHeader Title={I18n.t('addvenue')} />

        <Form
          schema={{
            UserID:user.UserID,
            CountryID: '',
            CityID: '',
            Resume: '',
            CR: '',
            PlaceTypeID: "1",
            LegalEntityID: "1",
            // VenuePlace_Name: "",
            // manual: "",
            VenuePlace_Desc: '',
            AreaID: "",
            LegalNameID: '1',
            ChairsNo: "",
            img1files: "",
            img2files: "",
            // img3files: "",
            // img4files: "",
            IsSnaksHeavy: false,
            IsSnaksLight: false,
            SnaksHeavyPrice: '',
            SnaksLightPrice: '',
            IsLunch: false,
            LunchPrice: false,
            IsDiner: false,
            DinerPrice: '',
            Price: '',

          }}
          onSubmit={onSubmit}
          render={renderForm}
          validationSchema={validationSchema}
        />
      </ScrollView>


    </Wrapper>
  );
};

export default AddVenue;
