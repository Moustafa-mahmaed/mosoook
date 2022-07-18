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

const venueProviderDetails = () => {
  const [loading, setLoading] = useState(false);
  const rtl = useSelector(state => state.lang.rtl);
  const user = useSelector(state => state.auth.user);

  return (
  <Wrapper >
      <Header Back />
      <View center >
           <TitleHeader Title="venueProviderDetails" />
      </View>
      <View width={20} row mv={5} mh={10} onPress={()=>Navigation.push('EditProfile')}>
                  <Icon
                    name="edit"
                    type={'AntDesign'}
                    size={12}
                    color={colors.blue}
                  />
                  <Text size={8} mh={3} color={colors.orange} >{I18n.t('edit')}</Text>
                 </View>

      <Text center> ⌛   🔥</Text>

    </Wrapper>
  );
};

export default venueProviderDetails;
