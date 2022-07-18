import React, { Component } from 'react';
import { View, Text, Wrapper  ,ScrollView  ,Button } from '../../ui';
import I18n from 'react-native-i18n';
import { Formik } from 'formik';

import colors from '../../ui/defaults/colors';

import Header from '../../components/Header';
import TitleHeader from '../../components/TitleHeader';
import Profile from '../../components/Profile';


const PointWallets = () => {
   

    return (
        <Wrapper >
            <Header />
         <ScrollView flex stretch center pv={5} >
             <Profile 
         screenName={'ContactUs'} 
         ProfileName="Taha abd el Rahman"
          ProfileType="Trainer Provider" />
           
              <TitleHeader Title={I18n.t('bankapi')} />
       
<View mv={10}  pv={10} style={{

    borderColor: colors.orange,
    borderTopWidth:2,
    borderLeftWidth:2,
    borderRightWidth:2,
    borderBottomWidth:2,
    borderRadius: 10,
    backgroundColor: colors.white,

}}  width={90} height={40}  center ph={10}>
<Text size={16}> Balance</Text>
<Text color={colors.orange}>( 358 ) <Text>Pts</Text></Text>
<Text  center> 
<Text color={colors.darkgrey}  size={7}>{I18n.t('coast1')}</Text>
<Text color={colors.darkgrey}  size={7} >...</Text>
<Text color={colors.darkgrey}  size={7} >{I18n.t('coast2')}</Text>
</Text>
<Button stretch title={I18n.t('agree')} mh={20} mv={8} />

</View>
      </ScrollView>
      
            
        </Wrapper>
    );
};

export default PointWallets;
