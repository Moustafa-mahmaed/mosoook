import React, { Component, useState } from 'react';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation } from '../../ui';
import { Formik } from 'formik';
import {Image as RNImage} from 'react-native'
import I18n from 'react-native-i18n';
import colors from '../../ui/defaults/colors';

import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import Profile from '../../components/Profile';
import Approved from '../../components/Approved';


const ActiveHome = () => {
     const [loading, setLoading] = useState(false);
  const rtl = useSelector(state => state.lang.rtl);

 
    return (
        <Wrapper >
            <Header  Back  />
             <View   center pv={5} >
         <Profile 
         screenName={'ContactUs'} 
         ProfileName="Taha abd el Rahman"
          ProfileType="Trainer Provider" />
            
            </View>
          <Approved />
      
        </Wrapper>
    );
};

export default ActiveHome ;
