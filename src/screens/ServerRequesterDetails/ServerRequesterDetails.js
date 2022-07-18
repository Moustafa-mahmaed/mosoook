import React, { Component, useState } from 'react';
import { View, Text, Wrapper, Input, Navigation ,Icon } from '../../ui';
import { Formik } from 'formik';
import { Image as RNImage } from 'react-native'
import Axios from 'axios';
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';
import Carditem from '../../components/Carditem';
import Article from '../../components/Article';

import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';

const ServerRequesterDetails = () => {
  const [loading, setLoading] = useState(false);
  const rtl = useSelector(state => state.lang.rtl);
  const user = useSelector(state => state.auth.user);

  return (
    <Wrapper >
      <Header Back />
      <View center >
        <TitleHeader Title="Server Requester Details" />
       
      </View>


    </Wrapper>
  );
};

export default ServerRequesterDetails;
