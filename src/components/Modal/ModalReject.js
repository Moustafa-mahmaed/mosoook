/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Modal from 'react-native-modal';
import {View, Text, Icon} from '../../ui';

export default function ModalReject(props) {
  return (
    <Modal
      isVisible={props.visible}
      transparent
      onRequestClose={() => {
        props.changeState(false);
      }}
      useNativeDriver
      onBackdropPress={() => props.changeState(false)}
      onBackButtonPress={() => props.changeState(false)}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 0,
      }}>
      <View
        stretch
        style={{alignSelf: 'center'}}
        center
        pb={5}
        width={85}
        backgroundColor="white"
        borderRadius={20}
        touchableOpacity
        disabled
        onPress={() => {}}>
        <Icon
          type={'AntDesign'}
          name={'close'}
          size={7}
          circleRadius={8}
          backgroundColor="#DCDCDC"
          m={7}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          onPress={() => {
            props.changeState(false);
          }}
        />
        <Icon
          type={'MaterialIcons'}
          mt={12}
          name={'error-outline'}
          size={50}
          color={'thirdly'}
        />
        <Text size={10} mt={8} mh={8} bold color={'primary'}>
          {props.title}
        </Text>
        <Text size={8} mb={6} mh={8} bold color={'primary'}>
          {props.message}
        </Text>
      </View>
    </Modal>
  );
}
