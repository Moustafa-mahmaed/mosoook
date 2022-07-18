/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { SafeAreaView, Dimensions, ImageBackground } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import colors from './defaults/colors';
import { View } from '../ui';

const { width, height } = Dimensions.get('screen');

class Wrapper extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const { children, loading } = this.props;
    return (
      <MenuProvider>
        <SafeAreaView
          style={[
            {
              flex: 1,
              alignSelf: 'stretch',
              backgroundColor: colors.statusBar,
            },
          ]}>
          <ImageBackground
            source={require('../assets/images/background.png')}
            resizeMode='cover'
            style={{ width: '100%', height: '100%', backgroundColor: colors.white, }}
          >
            {children}
          </ImageBackground>
        </SafeAreaView>
      </MenuProvider>
    );
  }
}

const mapStateToProps = state => ({
  isConnected: state.network.isConnected,
});

export default connect(mapStateToProps)(Wrapper);
