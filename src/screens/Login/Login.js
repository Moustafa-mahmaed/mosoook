import React, { Component, useState } from 'react';
import { View, Text, Wrapper, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation } from '../../ui';
import { Formik } from 'formik';
import { Image as RNImage } from 'react-native'
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import { validationSchema } from './validation';
import { API_ENDPOINT } from '../../configs';
import { useSelector, useDispatch } from 'react-redux';
import { UserData } from '../../actions/authActions';

const Login = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const rtl = useSelector(state => state.lang.rtl);

  const onSubmit = values => {
    setLoading(true)
    Axios
      .get(`${API_ENDPOINT}Users/GetUserData?userEmail=${values.email}&userPassword=${values.password}`)
      .then(res => {
        console.log("*******************", res.data)
        dispatch(UserData(res.data, true));
        setLoading(false)
        if (res.data.UserType) {
          Navigation.init('MAIN_STACK', {
            rtl: rtl,
            sideMenu: 'SideMenu',
            name: 'ActiveHome',
          });
        }
        else {
          Navigation.init('MAIN_STACK', {
            rtl: rtl,
            sideMenu: 'SideMenu',
            name: 'Home',
          });
        }
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
    <View stretch ph={1} center mt={10} mh={5} >
      <RNImage source={require('../../assets/images/splash.png')}
        style={{
          height: 150,
          width: 300,
          borderRadius: 20,
        }}

      />
      <Text bold color={colors.blue} size={15} mv={5}>{I18n.t('login')}</Text>
      <Input
        email
        {...injectFormProps('email')}
        placeholder={I18n.t('email')}
        leftItems={
          <Icon
            name="user"
            type={'EvilIcons'}
            size={12}
            pl={5}
            color={colors.grey}
          />
        }
      />
      <Input
        leftItems={
          <Icon
            name="lock"
            type={'EvilIcons'}
            size={12}
            pl={5}
            color={colors.grey}
          />
        }
        {...injectFormProps('password')}
        placeholder={I18n.t('password')}
        secure
        showSecureEye
      />

      <Button
        title={I18n.t('login')}
        stretch
        onPress={loading ? null : handleSubmit}
        processing={loading}
        m={10}
      />

      <Text color={colors.white} size={8} >{I18n.t('noAccount')}
        <Text color={colors.blue} size={8}
          onPress={() => Navigation.push('NewUser')}
          style={{ textDecorationLine: 'underline' }} > {I18n.t('createOne')}</Text>
      </Text>
      <Text color={colors.white}
        onPress={() => Navigation.push('ForgetPassword')}
      >{I18n.t('forgetPassword')}</Text>
    </View >
  );


  return (
    <Wrapper >
      <ScrollView flex stretch center backgroundColor={colors.orange}>
        <Form
          schema={{
            email: '',
            password: '',
          }}
          onSubmit={onSubmit}
          render={renderForm}
          validationSchema={validationSchema}
        />
      </ScrollView>
    </Wrapper>
  );
};

export default Login;
