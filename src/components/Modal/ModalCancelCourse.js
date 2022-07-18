/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Modal from 'react-native-modal';
import I18n from 'react-native-i18n';
import {View, Text, Button, Icon, Image} from '../../ui';
import colors from '../../ui/defaults/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function ModalDelete(props) {
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
        width={90}
        backgroundColor="white"
        borderRadius={20}
        touchableOpacity
        disabled
        onPress={() => {}}>
        <View stretch center mt={15}>
          {/* {props.noImage ? null : (
            <Image
              source={require('../../assets/images/del.png')}
              height={8}
              width={16}
              resizeMode="contain"
            />
          )} */}
          <Text center size={9} mv={7} color={Colors.blue}>
            {props.title}
          </Text>
        </View>
        <Icon
          type={'AntDesign'}
          name={'close'}
          color="white"
          backgroundColor="#E62C20"
          circleRadius={8}
          size={7}
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

        <Button
          stretch
          mh={10}
          mb={10}
          backgroundColor={'#E62C20'}
          title={'Cancel Course'}
          color={'white'}
          borderRadius={14}
          touchableOpacity
          elevation={9}
          onPress={() => {
            props.onDone();
            props.changeState()
          }}
          processing={props.loading}
        />
      </View>
    </Modal>
  );
}
