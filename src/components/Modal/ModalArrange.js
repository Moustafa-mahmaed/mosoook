/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import I18n from 'react-native-i18n';
import {View, Text, Button, Icon} from '../../ui';
import RadioButton from '../RadioButton';

export const FilterRow = props => {
  const [checked, setChecked] = useState(props.checked);
  const {status, item, onCheck} = props;

  useEffect(() => {
    setChecked(status);
  }, [status]);

  return (
    <View stretch style={{alignItems: 'center'}} row m={4}>
      <RadioButton
        onPress={val => {
          onCheck(checked);
        }}
        status={checked}
        value={checked}
        square
        color={checked ? 'primary' : 'gray'}
      />
      <Text size={8} color={checked ? 'primary' : 'gray'} bold>
        {item.name}
      </Text>
    </View>
  );
};

export default function ModalArrange(props) {
  const [checkedId, setCheckedId] = useState();

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
        width={85}
        backgroundColor="white"
        borderRadius={20}
        touchableOpacity
        disabled
        onPress={() => {}}>
        <View stretch center>
          <Text bold size={9} mv={3}>
            {props.title}
          </Text>
        </View>
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

        {props.filterObjects.map(item => {
          return (
            <FilterRow
              item={item}
              onCheck={flag => {
                if (flag) {
                  setCheckedId('');
                } else {
                  setCheckedId(item.id);
                }
              }}
              status={checkedId === item.id}
            />
          );
        })}
        <Button
          stretch
          m={10}
          backgroundColor={'secondary'}
          title={I18n.t('apply')}
          color={'white'}
          borderRadius={14}
          touchableOpacity
          elevation={9}
          onPress={() => {
            props.onDone(checkedId);
          }}
        />
      </View>
    </Modal>
  );
}
