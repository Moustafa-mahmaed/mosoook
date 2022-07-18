/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import Modal from 'react-native-modal';
import I18n from 'react-native-i18n';
import {View, Text, Button, Navigation, Image} from '../../ui';

export default class ModalLogin extends Component {
  state = {
    processing: false,
  };

  render() {
    return (
      <Modal
        isVisible={this.props.visible}
        transparent
        onRequestClose={() => {
          this.props.changeState(false);
        }}
        useNativeDriver
        onBackdropPress={() => this.props.changeState(false)}
        onBackButtonPress={() => this.props.changeState(false)}
        style={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}>
        <View
          stretch
          center
          style={{alignSelf: 'center'}}
          width={100}
          backgroundColor="transparent">
          <View
            stretch
            backgroundColor="white"
            center
            mt={2}
            borderRadius={10}
            width={100}>
            <Image
              source={require('../../assets/images/logo.png')}
              width={30}
              height={15}
              borderRadius={15}
              elevation={5}
              resizeMode={'stretch'}
              mv={5}
            />
            <Text pt={5} color="gray" bold>
              {I18n.t('loginFirst')}
            </Text>
            <Button
              title={I18n.t('Login')}
              backgroundColor="primary"
              width={75}
              touchableOpacity
              borderRadius={10}
              pv={2}
              mv={5}
              bw={0}
              onPress={() => {
                Navigation.push('Login');
                this.props.changeState(false);
              }}
            />
          </View>
          <View
            backgroundColor="white"
            stretch
            center
            borderRadius={10}
            width={100}
            mt={5}>
            <Text
              stretch
              center
              size={8}
              p={5}
              color="gray"
              bold
              onPress={() => this.props.changeState(false)}>
              {I18n.t('Cancel')}
            </Text>
          </View>
        </View>
      </Modal>
    );
  }
}
