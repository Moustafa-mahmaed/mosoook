/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import I18n from 'react-native-i18n';
import {View, Text, Button, Icon, List} from '../../ui';
import RadioButton from '../RadioButton';
import {API_ENDPOINT} from '../../configs';

export const FilterRow = props => {
  const [checked, setChecked] = useState(props.checked);
  const {status, item, onCheck} = props;

  useEffect(() => {
    setChecked(status);
  }, [status]);

  return (
    <View
      row
      m={4}
      touchableOpacity
      onPress={val => {
        onCheck(checked);
      }}>
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

export default function ModalFilter(props) {
  const [checkedId, setCheckedId] = useState([]);

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

        <View stretch height={22}>
          {/* <ScrollView flex stretch> */}
          <List
            flatList
            rowRenderer={(item, index) => (
              <FilterRow
                item={item}
                index={index}
                onCheck={flag => {
                  if (flag) {
                    let ind = checkedId.indexOf(item.id);
                    let arr = checkedId.slice();
                    arr.splice(ind, 1);
                    setCheckedId(arr);
                  } else {
                    let arr = checkedId.slice();
                    arr.push(item.id);
                    setCheckedId(arr);
                  }
                }}
                status={checkedId.indexOf(item.id) !== -1}
              />
            )}
            apiRequest={{
              url: `${API_ENDPOINT}/trade-mark`,
              responseResolver: response => {
                return {
                  data: response.data.data,
                  pageCount: response.data.pageCount,
                };
              },
              onError: error => {
                I18n.t('ui-error-happened');
              },
            }}
          />
          {/* </ScrollView> */}
        </View>

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
