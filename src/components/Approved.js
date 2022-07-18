import React, { Component } from 'react'
// import { View, Text, Button, responsiveWidth } from '../ui';
import { View, Text, Wrapper, label, Input, showError, Icon, Button, Form, ScrollView, Image, Navigation } from '../ui';

import colors from '../ui/defaults/colors';
// import { Text, View } from 'react-native'

// import styles from './styles'

export default class index extends Component {
  render() {
    const { ProfileName ,ProfileType } = this.props;
    return (
      <View stretch center>
         <View backgroundColor={colors.blue} center style={{justifyContent: 'space-around',}}  width={80} height={25}  borderRadius={10} >
           <Icon
            //  style={{flex:.25}}
            name="error-outline"
            type={'MaterialIcons'}
            size={20}
            
            color={colors.orange}
          />
            <Text size={8}  color={colors.white}>Your account  isn't approved yet </Text>

         </View>
      
      </View>
    )
  }
}

