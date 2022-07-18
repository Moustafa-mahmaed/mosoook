import React, { Component } from 'react'
import { View, Text, Icon, Navigation, responsiveHeight, responsiveWidth } from '../ui';
import { Image as RNImage } from 'react-native'

import colors from '../ui/defaults/colors';
import { useSelector } from 'react-redux';
import { MenuProvider } from 'react-native-popup-menu';
// import { UserData } from '../../actions/authActions';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const Profile = () => {
  const user = useSelector(state => state.auth.user);
console.log("user Data :::>>>",user)
  return (
    <View backgroundColor={colors.orange} mt={5}
      mh={5} pv={2} ph={5} borderRadius={5} row

    // onPress={() => Navigation.push("CourseMenu")}
    >


      <View borderRadius={200} m={5} >
        <RNImage
          resizeMode="cover"
          source={user ? { uri: user.ImagePath } : require('../assets/images/avater.png')}
          style={{
            height: 50,
            width: 50,
            backgroundColor: colors.blue,
          }}
        />

      </View>
      <View flex={3} >
        <Text color={colors.white}>{`${user.LegalName?user.LegalName:user.FirstName}`}</Text>
        <Text color={colors.blue}>{user.UserType === 'T' ? "Trainer Provider" : user.UserType === 'V' ? 'Venue Provider' : 'Service Requister'}</Text>
      </View>
      
    </View>

  );
};

export default Profile;



