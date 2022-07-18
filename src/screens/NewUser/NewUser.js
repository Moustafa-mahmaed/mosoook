import React, { Component, useState } from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation } from '../../ui';
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

const NewUser = () => {
  const [loading, setLoading] = useState(false);
  const rtl = useSelector(state => state.lang.rtl);

  const onSubmit = values => {
    console.log("values ", values)
    let data = {
      UserEmail: values.UserEmail,
      UserPassword: values.UserPassword,
      FirstName:values.FirstName
      // confirmpassword: values.confirmpassword
    }
    console.log("ddddddddddd ", data)
    Navigation.push({ name: 'ImgPickerScreen', passProps: { data: data } })
  }

  const renderForm = ({ injectFormProps, handleSubmit }) => (
    <View stretch ph={1} mt={10} mh={5} >
       <Text>{I18n.t('userName')}</Text>
      <Input
        {...injectFormProps('FirstName')}
        placeholder={I18n.t('userName')}
      />
      <Text >{I18n.t('email')}</Text>
      <Input
        {...injectFormProps('UserEmail')}
        placeholder={I18n.t('email')}
        email
      />
      <Text >{I18n.t('password')}</Text>
      <Input
        {...injectFormProps('UserPassword')}
        placeholder={I18n.t('password')}
        secure
        showSecureEye
      />
      <Text >{I18n.t('confirmpassword')}</Text>
      <Input
        {...injectFormProps('confirmpassword')}
        placeholder={I18n.t('confirmpassword')}
        secure
        showSecureEye
      />

      <Button
        title={I18n.t('next')}
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
        <TitleHeader Title={I18n.t('createone')} />
      </View>
      <ScrollView flex stretch center >
        <Form
          schema={{
            FirstName: '',
            LastName: ' ',
            Gender: ' ',
            Birthday: ' ',
            PhoneNumber: ' ',
            UserEmail: '',
            UserPassword: '',
            confirmpassword: ''
          }}
          onSubmit={onSubmit}
          render={renderForm}
          validationSchema={validationSchema}
        />
      </ScrollView>

    </Wrapper>
  );
};

export default NewUser;
