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

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const rtl = useSelector(state => state.lang.rtl);

  const onSubmit = values => {
    setLoading(true)
    Axios
      .post(`${API_ENDPOINT}Users/Sendmail?email=${values.email}`)
      .then(res => {
        console.log("*******************", res.data)
        setLoading(false)
        Navigation.push({ name: 'ForgotPasswordwithcode', passProps: { email: res.data.UserEmail } })
      })
      .catch(error => {
        setLoading(false)
        console.log("error ", error)
        console.log("error ", error.response)
        if (!error.response) {
          showError(I18n.t('ui-networkConnectionError'));
          return;
        } else {
          showError(error.response.data);
        }
      });
  };

  const renderForm = ({ injectFormProps, handleSubmit }) => (
    <View stretch ph={1} center mt={10} mh={5} >
      <Text color={colors.blue} size={7} >{I18n.t('requestemailandpassword1')}
      </Text>
      <Text color={colors.blue} size={7} >{I18n.t('requestemailandpassword2')}</Text>
      <Text color={colors.blue}  stretch mt={15} >{I18n.t('enterEmail')}</Text>
      <Input
        email
        {...injectFormProps('email')}
        placeholder={I18n.t('enterEmail')}
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
      <ScrollView flex stretch center >
        <TitleHeader Title={I18n.t('forgetPassword')} />
        <Form
          schema={{
            email: '',
          }}
          onSubmit={onSubmit}
          render={renderForm}
          validationSchema={validationSchema}
        />
      </ScrollView>

    </Wrapper>
  );
};

export default ForgetPassword;
