import React, { Component, useState } from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, moderateScale, responsiveWidth } from '../../ui';
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
// import forgetpasswordcode from '../../components/forgetpasswordcode';
import CodeInput from 'react-native-confirmation-code-input';

const ForgotPasswordwithcode = (props) => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);

  const onSubmit = values => {
    setLoading(true)
    Axios
      .post(`${API_ENDPOINT}Users/verificationCode?code=${code}&email=${props.email}`)
      .then(res => {
        console.log("*******************", res.data)
        setLoading(false)
        Navigation.push({ name: 'Resetpassword', passProps: { email: props.email } })
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
      <Text color={colors.blue} size={7} >{I18n.t('verificationcodemsg1')}
      </Text>
      <Text color={colors.blue} size={7} >{I18n.t('verificationcodemsg2')}</Text>
      <Text color={colors.blue} size={7} >{I18n.t('verificationcodemsg3')}</Text>
      <CodeInput
        keyboardType="decimal-pad"
        activeColor={colors.primary}
        inactiveColor={colors.grey}
        // ref="codeInputRef1"
        codeLength={4}
        secureTextEntry
        containerStyle={{ alignSelf: 'center' }}
        codeInputStyle={{
          backgroundColor: colors.grey,
          marginHorizontal: moderateScale(10), borderWidth: 2, borderRadius: 10
        }}
        className={'border-box'}
        size={responsiveWidth(15)}
        inputPosition='left'
        onFulfill={(code) => setCode(code)}
      />
      <Button
        title={I18n.t('confirm')}
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
            code: '',
          }}
          onSubmit={onSubmit}
          render={renderForm}
        // validationSchema={validationSchema}
        />
      </ScrollView>

    </Wrapper>
  );
};

export default ForgotPasswordwithcode;
