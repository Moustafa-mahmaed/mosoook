import React, { Component } from 'react'
import { View, Text, Button, responsiveWidth } from '../ui';
import colors from '../ui/defaults/colors';
// import { Text, View } from 'react-native'

// import styles from './styles'

export default class index extends Component {
  render() {
    const { Title } = this.props;
    return (
      <View stretch center>
        <Button stretch title={Title} mh={20} mv={10} />
        <View style={{
          width: responsiveWidth(8),
          height: responsiveWidth(8),
          position: "absolute",
          bottom: responsiveWidth(3),
          zIndex: -100,
          backgroundColor: colors.blue,
          transform: [{ rotate: '45deg' }]
        }} >
        </View>
      </View>
    )
  }
}

