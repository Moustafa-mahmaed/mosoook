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

const Resetpassword = () => {
  const [loading, setLoading] = useState(false);
  const rtl = useSelector(state => state.lang.rtl);

  const onSubmit = values => {
    setLoading(true)
    Axios
      .post(`${API_ENDPOINT}Users/Sendmail?email=${values.password}`)
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
      <Text color={colors.blue} size={7} >{I18n.t('orderpassword')}
      </Text>

      <Text stretch color={colors.blue} mt={15} >{I18n.t('newpassword')}</Text>
      <Input
        {...injectFormProps('newpassword')}
        placeholder={I18n.t('newpassword')}
        secure
        showSecureEye
      />
      <Text stretch color={colors.blue} >{I18n.t('reenterpassword')}</Text>
      <Input
        {...injectFormProps('reenterpassword')}
        placeholder={I18n.t('reenterpassword')}
        secure
        showSecureEye
      />

      <Button
        title={I18n.t('changepassword')}
        stretch
        onPress={loading ? null : handleSubmit}
        onPress={() => Navigation.push({
          name: 'Success', passProps: {
            msg1: `${I18n.t('msgsuccessfully1')}`
            , msg2: `${I18n.t('msgsuccessfully2')}`
          }
        })}
        processing={loading}
        m={10}
        mh={30}
      />


    </View >
  );

  return (
    <Wrapper >
      <Header Back />
      <View center >
        <TitleHeader Title={I18n.t('forgetPassword')} />
      </View>
      <ScrollView flex stretch center >
        <Form
          schema={{
            newpassword: '',
            reenterpassword: ''
          }}
          onSubmit={onSubmit}
          render={renderForm}
          validationSchema={validationSchema}
        />
      </ScrollView>

    </Wrapper>
  );
};

export default Resetpassword;
