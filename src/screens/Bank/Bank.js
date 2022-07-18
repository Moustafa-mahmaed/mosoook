import React, { Component } from 'react';
import { View, Text, Wrapper  ,ScrollView ,Input ,Form , } from '../../ui';
import I18n from 'react-native-i18n';
import { Formik } from 'formik';

import colors from '../../ui/defaults/colors';

import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import Profile from '../../components/Profile';


const Bank = () => {
   

    return (
        <Wrapper >
            <Header />
         <ScrollView flex stretch center pv={5} >
             <Profile 
         screenName={'ContactUs'} 
         ProfileName="Taha abd el Rahman"
          ProfileType="Trainer Provider" />
           
              <TitleHeader Title={I18n.t('bankapi')} />
       
<View mt={10}  backgroundColor={colors.grey}  borderRadius={10} width={90} height={50} >

</View>
      </ScrollView>
      
            
        </Wrapper>
    );
};

export default Bank;
