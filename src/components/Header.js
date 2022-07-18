/* eslint-disable react-native/no-inline-styles */
import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  Easing,
  Animated,
  StyleSheet,
  Alert,
  Image as RNImage,
  View as ReactView,
} from 'react-native';
import { View, Text, Navigation, Icon, Input, Image } from '../ui';
import { connect } from 'react-redux';
import colors from '../ui/defaults/colors';
import { logout } from '../actions/authActions';

class Header extends Component {
  static propTypes = {
    showMenu: PropTypes.bool,
    hideBack: PropTypes.bool,
  };

  state = {
    // the Green background default value
    defaultScaleValue: new Animated.Value(1),
    // the primary background default value
    searchScaleValue: new Animated.Value(0.01),
    // we will resolve the radius and diameter whitin onLayout callback
    radius: 0,
    diameter: 0,
    // it'll change zIndex after the animation is complete
    order: 'defaultFirst',
    isSearchActive: false,
    searchValue: '',
    spinValue: new Animated.Value(0),
    isVisible: false,
    bgcolor: false,
    total: 0,
    data: null,
    notifPressed: false,
    visibleModalLogin: false,
  };

  //
  onSearchOpenRequested = () => {
    this.animateBackground(this.state.searchScaleValue, () => {
      // this is what we need to do when the animation is completed
      this.state.defaultScaleValue.setValue(0.01);
      // move default background above the search background (higher zIndex)
      this.setState({ order: 'searchFirst' });
    });
  };
  onSearchCloseRequested = () => {
    this.animateBackground(this.state.defaultScaleValue, () => {
      // this is what we need to do when the animation is completed
      this.state.searchScaleValue.setValue(0.01);
      // move default bcakground under the search background (lower zIndex)
      this.setState({ order: 'defaultFirst' });
    });
  };
  onLayout = event => {
    const { width, height } = event.nativeEvent.layout;
    // pythagorean
    const radius = Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2));
    let diameter = radius * 2;
    // because there is issue in react native that we can't set scale value to 0, we need to use
    // 0.01 and it means we still see the point even if the scale set to 0.01
    const bgPosition = width - radius; // the correct left position of circle background
    // we need circle to be bigger, then we won't see the 0.01 scaled point (because it'll be
    // out of screen)
    const pointSize = diameter * 0.01;
    diameter += pointSize;

    this.setState({
      bgPosition,
      radius: diameter,
      diameter,
    });
  };
  animateBackground = (value, onComplete) => {
    Animated.timing(value, {
      toValue: 1,
      duration: 325,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: Platform.OS === 'android',
    }).start(onComplete);
  };

  renderAnimatedBackgrounds = styles => {
    const {
      diameter,
      bgPosition,
      radius,
      defaultScaleValue,
      searchScaleValue,
      order,
    } = this.state;
    const bgStyle = {
      position: 'absolute',
      top: -radius,
      width: diameter,
      height: diameter,
      borderRadius: radius,
    };

    const bgSearch = (
      <Animated.View
        key="searchBackground"
        style={[
          bgStyle,
          {
            left: bgPosition,
            backgroundColor: 'white',
            transform: [{ scale: searchScaleValue }],
          },
        ]}
      />
    );

    const bgDefault = (
      <Animated.View
        key="defaultBackground"
        style={[
          bgStyle,
          {
            right: bgPosition,
            backgroundColor: this.state.bgcolor && '#06134C',
            transform: [{ scale: defaultScaleValue }],
          },
        ]}
      />
    );

    let content = null;

    if (order === 'defaultFirst') {
      content = [bgDefault, bgSearch];
    } else {
      content = [bgSearch, bgDefault];
    }

    return <View style={StyleSheet.absoluteFill}>{content}</View>;
  };

  goBack = () => {
    Navigation.pop();
  };

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  componentWillUnmount() {
    if (this.props.onRef) {
      this.props.onRef(undefined);
    }
  }

  //
  back = () => {
    this.setState({ isSearchActive: false, searchValue: '' });
    this.onSearchCloseRequested();
    this.props.searchRes('');
  };
  //
  renderModalLogout() {
    return this.props.rtl
      ? Alert.alert(
        'هل انت متأكد من تسجيل الخروج ؟',
        '',
        [
          {
            text: 'الغاء',
            onPress: () => { },
            style: 'cancel',
          },
          {
            text: 'تسجيل الخروج',
            onPress: () => {
              this.props.logout();
            },
          },
        ],
        { cancelable: false },
      )
      : Alert.alert(
        'Are you sure you want to sign out ?',
        '',
        [
          {
            text: 'cancel',
            onPress: () => { },
            style: 'cancel',
          },
          {
            text: 'logout',
            onPress: () => {
              this.props.logout();
            },
          },
        ],
        { cancelable: false },
      );
  }
  renderLeft = () => {
    const { showMenu, rtl, onBack, hideBack } = this.props;
    return (
      <View row >
        {!hideBack && (
          <Icon
            name={rtl ? 'keyboard-arrow-right' : 'keyboard-arrow-left'}
            type={'MaterialIcons'}
            size={12}
            color={'white'}
            onPress={onBack ? () => onBack() : this.goBack}
          />
        )}
        {showMenu && (
          <Image
            source={
              require('../assets/images/menu.png')
            }
            height={4}
            width={8}
            style={{ transform: [{ scaleX: rtl ? 1 : -1 }] }}
            resizeMode="contain"
            onPress={() => {
              Navigation.openMenu();
            }}
          />
        )}
      </View>
    );
  };

  renderRight = () => {
    const { rtl, logoutIcon, cartCount, showSearch, showCart } = this.props;
    return (
      <View row reverse mr={5}>
        {logoutIcon && (<Icon
          name="logout"
          type="SimpleLineIcons"
          color="white"
          size={10}
          reverse={!rtl}
          onPress={() => {
            this.renderModalLogout();
          }}
        />)
        }
        {showSearch && (
          <Icon
            p={2}
            name="search"
            type="Feather"
            color="white"
            size={10}
            onPress={() => {
              Navigation.push('Search');
            }}
          />
        )}
      </View>
    );
  };

  getSearchData = () => {
    if (this.state.searchValue === '') {
    } else {
    }
  };

  render() {
    const { showSearch, backgroundColor, title, tc, searchRes } = this.props;
    const { isSearchActive } = this.state;

    return (
      <>
        <View
          stretch
          onLayout={this.onLayout}
          elevation={this.props.elevation}
          backgroundColor={
            isSearchActive
              ? 'secondary'
              : backgroundColor
                ? backgroundColor
                : colors.orange
          }
          row
          spaceBetween
          ph={5}
          pv={5}>
          {showSearch ? this.renderAnimatedBackgrounds() : null}
          {this.state.isSearchActive ? (
            <View row stretch spaceBetween flex pv={1}>
              <Icon
                flip
                name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-arrow-back`}
                type={'Ionicons'}
                size={12}
                color={'black'}
                onPress={this.back}
                p={5}
              />
              <View stretch flex>
                <Input
                  placeholder={'بحث'}
                  placeholderColor={'red'}
                  color={'red'}
                  backgroundColor={'yellow'}
                  size={7}
                  stretch
                  height={7}
                  flex
                  onChangeText={value => {
                    this.setState({ searchValue: value });
                    clearTimeout(this.searchTimeoutId);
                    this.searchTimeoutId = setTimeout(() => {
                      searchRes(value);
                    }, 500);
                  }}
                />
              </View>
              {!this.state.pressed && (
                <Icon
                  name="search"
                  type="Feather"
                  color="black"
                  size={10}
                  p={5}
                />
              )}
            </View>
          ) : (
              <React.Fragment>
                <View row centerY flex>
                  {this.renderLeft()}
                  <View flex row stretch center>
                    {/* <Text color={tc ? tc : 'white'} bold numberOfLines={1}>
                      {title}
                    </Text> */}
                    <RNImage source={require('../assets/images/logo.png')}
                      style={{ width: 50, height: 50, borderRadius: 50, overflow: 'hidden', }}
                    />
                  </View>
                </View>
                <View>{this.renderRight()}</View>
              </React.Fragment>
            )}
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartCount: state.cart.productsCount,
    rtl: state.lang.rtl,
  };
};

export default connect(
  mapStateToProps,
  { logout },
)(Header);
