import React, { Component } from 'react';
import { View, Text, Wrapper, Navigation } from '../../ui';
import { Image as RNImage } from 'react-native'
import colors from '../../ui/defaults/colors';

import Header from '../../components/Header';
import Carditem from '../../components/Carditem';
import I18n from 'react-native-i18n';


import TitleHeader from '../../components/TitleHeader';
const CourseMenu = () => {
  return (
    <Wrapper >
      <Header />
      <TitleHeader Title={I18n.t('CourseMenu')} />
      <View flex stretch style={{ alignItems: 'center', }} >

        <View
          center
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            borderColor: '#999',
            borderWidth: 0.5,
            backgroundColor: '#FFF',
            elevation: 4,
            width: "95%",
            height: "10%",
            paddingVertical: 10,
            marginTop: 10,


          }}

          onPress={() => Navigation.pop()}>
          <Text size={10}>my courses</Text>
        </View>

        <View
          center
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            borderColor: '#999',
            borderWidth: 0.5,
            backgroundColor: '#FFF',
            elevation: 4,
            width: "95%",
            height: "10%",
            paddingVertical: 10,
            marginTop: 10,


          }}
          onPress={() => Navigation.push("AddtrainProvider")}>
          <Text>Add new</Text>
        </View>


        <View
          center
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            borderColor: '#999',
            borderWidth: 0.5,
            backgroundColor: '#FFF',
            elevation: 4,
            width: "95%",
            height: "10%",
            paddingVertical: 10,
            marginTop: 10,

          }}

          onPress={() => Navigation.push("ContactUs")}>
          <Text>customer support</Text>
        </View>



        <View
          center
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            borderColor: '#999',
            borderWidth: 0.5,
            backgroundColor: '#FFF',
            elevation: 4,
            width: "95%",
            height: "10%",
            paddingVertical: 10,
            marginTop: 10,


          }}
          onPress={() => Navigation.push("EditProfile")}>
          <Text>edit profile</Text>
        </View>


      </View>
    </Wrapper>
  );
};

export default CourseMenu;
