import React, { Component } from 'react'

import { Image as RNImage } from 'react-native'
import { View, Text, Button, responsiveWidth, Navigation } from '../ui';
import colors from '../ui/defaults/colors';

export default class Carditem extends Component {

  render() {
    const { Title } = this.props;
    console.log(this.props);
    return (
      <View stretch center width={40} mh={5} p={5}
        onPress={() => Navigation.push(this.props.screenName)}
        style={{
          borderRadius: 10,
          overflow: 'hidden',
          borderColor: '#999',
          borderWidth: 0.5,
          backgroundColor: '#FFF',
          elevation: 4
        }}
      >
        <RNImage
          source={this.props.imgName}
          style={{
            height: 100,
            width: 100,
          }}
          resizeMode={'contain'}
        />
        <Text color={colors.blue} bold size={7}>{this.props.Title}</Text>
      </View>
    )
  }
}
