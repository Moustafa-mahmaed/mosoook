import React, { Component, useState } from 'react';
import { View, Text, Wrapper  ,ScrollView ,Input ,Form , } from '../../ui';
import I18n from 'react-native-i18n';
import { Formik } from 'formik';

import colors from '../../ui/defaults/colors';
import { validationSchema } from './validation';
import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import Profile from '../../components/Profile';
import CountryPicker, { getAllCountries, getCallingCode, DARK_THEME } from 'react-native-country-picker-modal';


const ContactUs = () => {
  const [callingCode, setCallingCode] = useState('966');
  const [countryCode, setCountryCode] = useState('SA')
  const [dark, setDark] = useState(false)
  const [visible, setVisible] = useState(false)
   
  const onSubmit = values => {
    setLoading(true)
    Axios
      .get(``)
      .then(res => {
        console.log("*******************", res.data)
        dispatch(UserData(res.data, true));
        setLoading(false)
        Navigation.init();
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

  const renderForm = ({ injectFormProps, handleSubmit }) => (
    <View stretch ph={1} center mt={2} mh={5} >
   
      <Input
        email
        {...injectFormProps('email')}
        placeholder={I18n.t('email')}
      
      />
      <View row mt={-2} stretch>
        <View mr={5}>
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
        </View>
        <View mt={5}>
          <Input
            {...injectFormProps('Phone')}
            placeholder={I18n.t('phone')}
            phone
            width={68}

          />
        </View>
      </View>

      {/* <Button
        title={I18n.t('login')}
        stretch
        onPress={loading ? null : handleSubmit}
        processing={loading}
        m={10}
      /> */}

     
    
    </View >
  );



    return (
        <Wrapper >
            <Header />
         <ScrollView flex stretch center pv={5} >
             {/* <Profile 
         screenName={'ContactUs'} 
         ProfileName="Taha abd el Rahman"
          ProfileType="Trainer Provider" /> */}
           
              <TitleHeader Title={I18n.t('contactUs')} />
        <Form
          schema={{
            email: '',
            phone: '',
          }}
          onSubmit={onSubmit}
          render={renderForm}
          validationSchema={validationSchema}
        />
              <TitleHeader Title={I18n.t('chatbox')} />

      </ScrollView>
      
            
        </Wrapper>
    );
};

export default ContactUs;
