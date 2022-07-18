import React, { Component, useState } from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation, DatePicker, Picker } from '../../ui';
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import { validationSchema } from './validation';
import { API_ENDPOINT } from '../../configs';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';

const SignUp = (props) => {
  const [loading, setLoading] = useState(false);
  const rtl = useSelector(state => state.lang.rtl);

  const onSubmit = values => {
    console.log("vvvvvvvvvvvv ", values)
    let newValues = {
      FirstName: values.FirstName,
      LastName: values.LastName,
      Gender: values.Gender,
      Birthday: values.Birthday + '',
      PhoneNumber: values.PhoneNumber
    }
    let data = { ...props.data, ...newValues };
    console.log("dddddddddddddddd ", data)
    Navigation.push({ name: 'ImgPickerScreen', passProps: { data: data } })

  };

  const renderForm = ({ injectFormProps, handleSubmit, setFieldValue }) => (
    <View stretch ph={1} mt={5} mh={5} >
      <Text>{I18n.t('firstname')}</Text>
      <Input
        {...injectFormProps('FirstName')}
        placeholder={I18n.t('firstname')}
      />
      <Text>{I18n.t('lastname')}</Text>
      <Input
        {...injectFormProps('LastName')}
        placeholder={I18n.t('lastname')}
      />
      <Text>{I18n.t('gender')}</Text>
      <Picker
        {...injectFormProps('Gender')}
        placeholder={I18n.t('gender')}
        data={[{ label: I18n.t('male'), value: 'Male' }, { label: I18n.t('female'), value: 'Female' }]}
      />
      <Text>{I18n.t('birthday')}</Text>
      <DatePicker
        size={6}
        date
        onSelect={date => {
          setFieldValue('Birthday', date)
        }}
        placeholder={I18n.t('birthday')}
        momentFormat="YYYY / MM / DD"
        maxDate={new Date()}
        mb={5}
        rightItems={<Icon name='calendar' type={'AntDesign'} size={10} color={colors.blue} pr={5} />}
      />
      <Text>{I18n.t('phonenumber')}</Text>
      <Input
        {...injectFormProps('PhoneNumber')}
        placeholder={I18n.t('phonenumber')}
        phone
      />

      <Button
        title={I18n.t('next')}
        stretch
        onPress={loading ? null : handleSubmit}
        processing={loading}
        mb={10} mt={5}
        mh={45}
      />


    </View >
  );

  return (
    <Wrapper >
      <Header Back />
      <ScrollView flex stretch center >
        <TitleHeader Title={I18n.t('welcomeNewUser')} />
        <Form
          schema={{
            FirstName: '',
            LastName: '',
            Gender: '',
            Birthday: '',
            PhoneNumber: ''
          }}
          onSubmit={onSubmit}
          render={renderForm}
          validationSchema={validationSchema}
        />
      </ScrollView>

    </Wrapper>
  );
};

export default SignUp;
