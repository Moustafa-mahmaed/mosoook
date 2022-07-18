/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import Modal from 'react-native-modal';
import I18n from 'react-native-i18n';
import {
  View,
  Text,
  Button,
  Image,
  Icon,
  showError,
  showSuccess,
} from '../../ui';
import {connect} from 'react-redux';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';
import {Platform, Linking} from 'react-native';
import {API_ENDPOINT} from '../../configs';
import axios from 'axios';

class ModalAddOrder extends Component {
  state = {image: '', loading: false};

  choicePicker = func => {
    let permission =
      Platform.OS === 'ios'
        ? func === 'launchImageLibrary'
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
    request(permission).then(result => {
      switch (result) {
        case RESULTS.GRANTED:
          ImagePicker[func]({mediaType: 'photo'}, response1 => {
            if (!response1.didCancel) {
              let data = {
                uri: response1.uri,
                type: response1.type ? response1.type : 'image/png',
                name: 'fileName',
              };
              this.setState({
                image: data,
              });
            } else if (response1.didCancel) {
            } else {
            }
          });
          break;
        default:
          Platform.OS === 'ios'
            ? Linking.openURL('app-settings://Photos')
            : this.choicePicker(func);
      }
    });
  };

  onSubmit = () => {
    let formData = new FormData();
    formData.append('image', this.state.image);
    this.setState({loading: true});
    axios
      .post(`${API_ENDPOINT}/order/maual`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
      })
      .then(res => {
        this.props.changeState(false);
        this.setState({image: '', loading: false});
        showSuccess(I18n.t('Done send request'));
      })
      .catch(error => {
        this.setState({loading: false});
        if (!error.response) {
          showError(I18n.t('ui-networkConnectionError'));
          return;
        } else if (error.response.status === 422) {
          showError(error.response.data.errors[0].msg);
        } else {
          showError(error.response.data.errors);
        }
      });
  };

  render() {
    return (
      <Modal
        isVisible={this.props.visible}
        transparent
        onRequestClose={() => {
          this.props.changeState(false);
          this.setState({image: ''});
        }}
        useNativeDriver
        onBackdropPress={() => {
          this.props.changeState(false);
          this.setState({image: ''});
        }}
        onBackButtonPress={() => {
          this.props.changeState(false);
          this.setState({image: ''});
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View stretch backgroundColor="white" borderRadius={15} p={10} center>
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
              this.props.changeState(false);
              this.setState({image: ''});
            }}
          />
          <Text>{I18n.t('Add an order')}</Text>
          {!this.state.image ? (
            <View row center stretch mt={5}>
              <View
                backgroundColor="#DCDCDC"
                pv={5}
                ph={8}
                borderRadius={15}
                center
                touchableOpacity
                onPress={() => {
                  this.choicePicker('launchCamera');
                }}>
                <Icon
                  name="camera"
                  type="AntDesign"
                  color="primary"
                  size={15}
                />
                <Text size={7} color="primary">
                  {I18n.t('Camera')}
                </Text>
              </View>
              <View
                backgroundColor="#DCDCDC"
                pv={5}
                ph={8}
                borderRadius={15}
                center
                ml={8}
                touchableOpacity
                onPress={() => {
                  this.choicePicker('launchImageLibrary');
                }}>
                <Icon name="photo" type="FontAwesome" color="green" size={15} />
                <Text size={7} color="primary">
                  {I18n.t('The show')}
                </Text>
              </View>
            </View>
          ) : (
            <View center stretch mt={5}>
              <View>
                <Image
                  source={this.state.image}
                  circleRadius={30}
                  resizeMode="stretch"
                  bw={2}
                />
                <Icon
                  type={'AntDesign'}
                  name={'close'}
                  size={7}
                  circleRadius={8}
                  color="red"
                  backgroundColor="#DCDCDC"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  onPress={() => {
                    this.setState({image: ''});
                  }}
                />
              </View>
              <Button
                title={I18n.t('Send')}
                touchableOpacity
                backgroundColor="secondary"
                mt={5}
                onPress={
                  this.state.loading
                    ? null
                    : () => {
                        this.onSubmit();
                      }
                }
                width={70}
                paddingVertical={3}
                borderRadius={10}
                processing={this.state.loading}
              />
            </View>
          )}
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

export default connect(
  mapStateToProps,
  {},
)(ModalAddOrder);
