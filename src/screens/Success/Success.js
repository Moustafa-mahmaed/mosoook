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

const success = (props) => {
  const [loading, setLoading] = useState(false);
  const rtl = useSelector(state => state.lang.rtl);
  const user = useSelector(state => state.auth.user);
  const { message} = props;
  return (
    <Wrapper >
      <Header  />
      <View center >
        <TitleHeader Title={I18n.t('congratulation')} />
        <Text color={colors.blue} size={7} >{I18n.t('msgsuccessfully1')}
        </Text>
        <Text color={colors.blue} size={7} >{message?message:' '}</Text>
        <RNImage
          resizeMode="contain"
          source={require('../../assets/images/surface.png')}
          style={{
            height: 150,
            width: 200,
          }}
        />

        <Button
          title={I18n.t('continue')}
          stretch
          onPress={() => {
            if (user.UserType) {
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
          }
          }
          m={10}
          mh={45}
        />
      </View>

    </Wrapper>
  );
};

export default success;
