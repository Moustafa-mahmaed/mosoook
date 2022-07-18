/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import Modal from 'react-native-modal';
import I18n from 'react-native-i18n';
import {
  View,
  Text,
  Button,
  DatePicker,
  Input,
  Form,
  responsiveWidth,
  Icon,
} from '../../ui';
import {connect} from 'react-redux';

class ModalTakePhoto extends Component {
  state = {};

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
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View stretch backgroundColor="white" borderRadius={15} p={10}>
          <Text>{I18n.t('chooseImage')}</Text>
          <View row spaceBetween stretch mt={5}>
            <Button
              title={I18n.t('camera')}
              touchableOpacity
              onPress={() => {
                this.props.onDone('launchCamera');
              }}
              width={34}
              paddingVertical={3}
              borderRadius={10}
            />
            <Button
              title={I18n.t('library')}
              touchableOpacity
              onPress={() => {
                this.props.onDone('launchImageLibrary');
              }}
              width={34}
              paddingVertical={3}
              borderRadius={10}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
const mapStateToProps = state => {
  return {
    rtl: state.lang.rtl,
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, {})(ModalTakePhoto);
