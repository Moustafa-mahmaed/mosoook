import React, {Component} from 'react';
// import PhotoView from '@merryjs/photo-viewer';
import {View as NativeView, StyleSheet} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';
import {Modal, Icon, View, moderateScale} from '../ui';

export default class LightBox extends Component {
  state = {
    isVisible: false,
  };

  toggleModal = isVisible => {
    this.props.changeState
      ? this.props.changeState(isVisible)
      : this.setState({isVisible});
  };

  render() {
    const {index, data, isVisible, imageComp} = this.props;

    // const {isVisible} = this.state;
    const arrows =
      data.length > 1
        ? {
            renderArrowLeft: () => (
              <View
                center
                height={6}
                backgroundColor="black"
                marginHorizontal={5}
                width={8}
                borderRadius={10}>
                <Icon name="ios-arrow-back" type="Ionicons" color="white" />
              </View>
            ),
            renderArrowRight: () => (
              <View
                center
                height={6}
                backgroundColor="black"
                marginHorizontal={5}
                width={8}
                borderRadius={10}>
                <Icon name="ios-arrow-forward" type="Ionicons" color="white" />
              </View>
            ),
          }
        : {};
    return (
      <Modal
        animationIn="bounceIn"
        animationOut="bounceOut"
        hideModalContentWhileAnimating
        isVisible={imageComp ? this.state.isVisible : isVisible}
        backdropOpacity={0}
        changeState={v => this.toggleModal(v)}>
        <NativeView
          style={{
            ...StyleSheet.absoluteFill,
          }}>
          <ImageViewer
            enableSwipeDown
            onSwipeDown={() => {
              this.toggleModal(false);
            }}
            imageUrls={data.map(i => {
              if (i.uri) {
                return {
                  url: i.uri,
                };
              }
              return {
                props: {
                  source: i,
                },
              };
            })}
            enablePreload
            index={index || 0}
            {...arrows}
          />
          <View
            backgroundColor="#000"
            style={{
              position: 'absolute',
              right: moderateScale(8),
              top: moderateScale(15),
            }}
            circleRadius={10}
            center
            onPress={() => this.toggleModal(false)}
            touchableOpacity>
            <Icon name="close" type="MaterialIcons" size={9} color="white" />
          </View>
        </NativeView>
      </Modal>
    );
  }
}
