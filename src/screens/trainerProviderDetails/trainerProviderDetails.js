import React, { Component, useState } from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation } from '../../ui';
import { Formik } from 'formik';
import { Image as RNImage } from 'react-native'
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';

import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';

const trainerProviderDetails = () => {
  const [loading, setLoading] = useState(false);
  const rtl = useSelector(state => state.lang.rtl);
  const user = useSelector(state => state.auth.user);

  return (
    <Wrapper >
      <Header Back />
      <View center >
      <TitleHeader Title="trainerProviderDetails" />
       
        <Text> ⌛   🔥</Text>
        
      </View>

    </Wrapper>
  );
};

export default trainerProviderDetails;
