/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  TextInput as NativeInput,
  View as RNView,
  TouchableWithoutFeedback,
  Animated,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import axios from 'axios';
import {
  BasePropTypes,
  paddingStyles,
  fontSizeStyles,
  fontFamilyStyles,
  textDirectionStyles,
  colorStyles,
  borderStyles,
} from './Base';

import {View, Icon, Text} from '../ui';
import {getTheme} from './Theme';
import InputError from './micro/InputError';
import {convertNumbers} from './utils/numbers';
import {
  moderateScale,
  responsiveHeight,
  responsiveFontSize,
} from './utils/responsiveDimensions';

import {showError} from './utils/localNotifications';

class Input extends PureComponent {
  static propTypes = {
    ...BasePropTypes,
    initialValue: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    placeholder: PropTypes.string,
    placeholderColor: PropTypes.string,
    secure: PropTypes.bool,
    leftItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    rightItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    activeColor: PropTypes.string,
    inactiveColor: PropTypes.string,
    color: PropTypes.string,
    error: PropTypes.string,
    showSecureEye: PropTypes.bool,
    nextInput: PropTypes.objectOf(PropTypes.any),
    noValidation: PropTypes.bool,
    asyncErrorResolver: PropTypes.func,
    asyncDataResolver: PropTypes.func,
  };

  static defaultProps = {
    leftItems: [],
    rightItems: [],
    masks: [],
    initialValue: '',
    noValidation: false,
    ...getTheme().input,
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      secure: props.secure,
      text: props.initialValue,
      color: props.color || props.inactiveColor,
      isFocused: !!props.initialValue,
      isTouched: false,
      textFontSize: responsiveFontSize(props.fontSize) || responsiveFontSize(7),
    };
    this._animatedIsFocused = new Animated.Value(props.initialValue ? 1 : 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset !== this.props.reset) {
      this.clear();
    }
  }

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.state.text !== '' ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }

  getAsyncValidationScheme = value => {
    if (!value) {
      return;
    }

    const {asyncDataResolver, asyncErrorResolver} = this.props;

    const {url, data} = asyncDataResolver(value);
    axios
      .put(url, data)
      .then(res => {
        const errText = asyncErrorResolver(res) || null;
        if (this.props.setError) {
          this.props.setError(this.props.name, errText);
        }

        clearTimeout(this.asyncErrorTimer);
        this.asyncErrorTimer = null;
      })
      .catch(error => {
        showError(error[1].message);
        clearTimeout(this.asyncErrorTimer);
        this.asyncErrorTimer = null;
      });
  };

  onChangeText = (text, noValidate) => {
    this.setState({
      textFontSize: responsiveFontSize(7),
    });
    if (!this.state.isTouched) {
      this.setState({
        isTouched: true,
      });
    }
    const {name, onChange, asyncDataResolver} = this.props;

    this.setState({
      text,
    });

    if (onChange) {
      if (name) {
        onChange(name, text, noValidate);
      } else {
        onChange(text);
      }
    }
    if (asyncDataResolver) {
      clearTimeout(this.asyncErrorTimer);
      this.asyncErrorTimer = setTimeout(() => {
        this.getAsyncValidationScheme(text);
      }, 1000);
    }
  };

  onBlur = () => {
    const {name, onBlur, color, inactiveColor} = this.props;
    this.setState({
      textFontSize: responsiveFontSize(this.props.fontSize || 7),
    });

    if (!color) {
      this.setState({
        color: inactiveColor,
      });
    }
    if (!this.state.isTouched) {
      this.setState({
        isTouched: true,
      });
    }
    this.setState({
      isFocused: false,
    });

    if (onBlur) {
      if (name) {
        onBlur(name, this.state.text);
      } else {
        onBlur(this.state.text);
      }
    }
  };

  onFocus = () => {
    const {name, onFocus, color, activeColor} = this.props;

    if (!color) {
      this.setState({
        color: activeColor,
      });
    }

    this.setState({
      isFocused: true,
    });

    if (onFocus) {
      if (name) {
        onFocus(name, this.state.text);
      } else {
        onFocus(this.state.text);
      }
    }
  };

  onSubmitEditing = () => {
    const {name, nextInput, onSubmitEditing} = this.props;

    if (nextInput) {
      nextInput.current.focus();
    }

    if (onSubmitEditing) {
      if (name) {
        onSubmitEditing(name, this.state.text);
      } else {
        onSubmitEditing(this.state.text);
      }
    }
  };

  focus = () => {
    this.inputRef.current.focus();
  };

  blur = () => {
    this.inputRef.current.blur();
  };

  clear = () => {
    this.inputRef.current.clear();

    this.onChangeText('', true);
  };

  renderSecureEyeButton = () => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        this.setState(prevState => ({secure: !prevState.secure}));
      }}
      style={{
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <RNView
        style={borderStyles({
          rtl: this.props.rtl,
          borderLeftColor: '#8A8A8A',
          // borderLeftWidth: 1,
        })}>
        <Icon
          size={this.props.size * 1.4}
          paddingHorizontal={5}
          type="Feather"
          name={this.state.secure ? 'eye' : 'eye-off'}
          color="gray"
        />
      </RNView>
    </TouchableOpacity>
  );

  renderErrorIcon = () => (
    <Icon
      color="red"
      name="error-outline"
      type="MaterialIcons"
      onPress={this.focus}
      marginHorizontal={5}
      size={7}
    />
  );

  renderItems = items => {
    const {size} = this.props;

    const nodes = items.map(item => {
      if (
        item.type.WrappedComponent &&
        (item.type.WrappedComponent.displayName === 'Button' ||
          item.type.WrappedComponent.displayName === 'Icon')
      ) {
        return React.cloneElement(item, {
          key: String(Math.random()),
          transparent: true,
          stretch: item.type.WrappedComponent.displayName === 'Button',
          color: item.props.color || this.state.color,
          size: item.props.size || size * 1.5,
          backgroundColor: 'transparent',
          paddingHorizontal: item.props.paddingHorizontal || size / 1.5,
          paddingVertical: 0,
        });
      }
      return React.cloneElement(item, {
        key: String(Math.random()),
      });
    });

    return nodes;
  };

  renderCover = () => (
    <TouchableWithoutFeedback
      onPress={() => {
        this.focus();
      }}>
      <RNView
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      />
    </TouchableWithoutFeedback>
  );

  getDistance = items => {
    let total = 0;
    const {size} = this.props;
    for (let i = 0; i < items.length; i++) {
      total +=
        (items[i].props.size || size) +
        (items[i].props.paddingHorizontal || size) +
        (items[i].props.marginHorizontal || 0);
    }
    return total * 2;
  };

  getColor = () => {
    if (this.props.error) {
      return '#FF0050';
    } else {
      !this.state.isTouched || this.props.noValidation;
    }

    return '#8A8A8A';
  };

  render() {
    const {
      size,
      secure,
      placeholderColor,
      width,
      height,
      backgroundColor,
      borderRadius,
      elevation,
      rtl,
      nextInput,
      showSecureEye,
      placeholder,
      translateNumbers,
      noValidation,
      error,
      flex,
      margin,
      marginHorizontal,
      marginVertical,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      borderWidth,
      borderTopWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderRightWidth,
      borderColor,
      borderTopColor,
      borderBottomColor,
      borderLeftColor,
      borderRightColor,
      email,
      phone,
      number,
      label,
      errorTextMarginHorizontal,
      noBorder,
      maxLength,
      style,
      stopEditable,
      notBlurOnSubmit,
      notMultiline,
      noMargin,
      ...rest
    } = this.props;

    let {leftItems, rightItems} = this.props;
    const paddingText = moderateScale(2);
    const assignedColor = this.getColor();
    const labelOffset = rtl
      ? leftItems.length > 0
        ? 0
        : 15
      : rightItems.length > 0
      ? 0
      : 15;
    const labelStyle = [
      {
        position: 'absolute',
        top: responsiveHeight(height) / 5,
        bottom: responsiveHeight(height) / 5,
        borderRadius: moderateScale(2),
        backgroundColor,
        justifyContent: 'center',
        alignItems: rtl ? 'flex-end' : 'flex-start',
        padding: paddingText,
        transform: [
          {
            translateY: this._animatedIsFocused.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -responsiveHeight(height) / 2],
            }),
          },
          {
            scale: this._animatedIsFocused.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.8],
            }),
          },
          {
            translateX: this._animatedIsFocused.interpolate({
              inputRange: [0, 1],
              outputRange: [
                0,
                rtl
                  ? responsiveFontSize(size) - 15
                  : -responsiveFontSize(size) + 15,
              ],
            }),
          },
        ],
      },
      !rtl ? {left: labelOffset} : {right: labelOffset},
    ];

    if (leftItems && !leftItems.map) {
      leftItems = [leftItems];
    }
    if (rightItems && !rightItems.map) {
      rightItems = [rightItems];
    }

    let keyboardType = 'default';
    if (number) {
      keyboardType = 'phone-pad';
    }
    if (phone) {
      keyboardType = 'phone-pad';
    }
    if (email) {
      keyboardType = 'email-address';
    }

    const scrollFixProps = {};

    if (Platform.OS === 'android' && rtl && keyboardType === 'default') {
      scrollFixProps.multiline = secure ? false : true;
      scrollFixProps.maxLength = maxLength || 40;
    }

    return (
      <View
        stretch
        flex={flex}
        margin={margin}
        marginHorizontal={marginHorizontal}
        marginVertical={noMargin ? 0 : marginVertical}
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        width={width}>
        <View
          stretch
          row
          height={height}
          backgroundColor={backgroundColor}
          borderRadius={borderRadius}
          elevation={elevation}
          borderWidth={borderWidth}
          borderTopWidth={borderTopWidth}
          borderBottomWidth={borderBottomWidth}
          borderLeftWidth={borderLeftWidth}
          borderRightWidth={borderRightWidth}
          borderTopColor={borderTopColor}
          borderBottomColor={borderBottomColor}
          borderLeftColor={borderLeftColor}
          borderRightColor={borderRightColor}
          borderColor={borderColor ? borderColor : assignedColor}
          style={[{overflow: 'visible'}, style]}
          {...(this.state.isFocused && this.props.onFocusBorderHighlight
            ? this.props.onFocusBorderHighlight
            : null)}>
          {leftItems.length ? this.renderItems(leftItems) : null}
          <View flex stretch>
            {label && (
              <Animated.View pointerEvents="none" style={labelStyle}>
                <Text pointerEvents="none" color={assignedColor} size={size}>
                  {label}
                </Text>
              </Animated.View>
            )}
            {!secure ? null : this.renderCover()}
            <NativeInput
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  this.expDate--;
                }
              }}
              returnKeyType={nextInput ? 'next' : 'done'}
              {...rest}
              placeholder={convertNumbers(
                placeholder,
                translateNumbers ? rtl : false,
              )}
              editable={stopEditable ? false : true}
              placeholderTextColor={placeholderColor}
              blurOnSubmit={notBlurOnSubmit ? false : true}
              multiline={notMultiline ? false : secure ? false : true}
              // onContentSizeChange={(event) => {
              //   this.setState({ height: event.nativeEvent.contentSize.height })
              // }}
              ref={this.inputRef}
              value={this.props.value ? this.props.value : this.state.text}
              underlineColorAndroid="transparent"
              textAlign={this.props.centerText ? 'center' : undefined}
              secureTextEntry={this.state.secure}
              onChangeText={this.onChangeText}
              onBlur={this.onBlur}
              keyboardType={keyboardType}
              onFocus={this.onFocus}
              maxLength={maxLength}
              onSubmitEditing={this.onSubmitEditing}
              style={[
                textDirectionStyles(this.props),
                fontSizeStyles(this.props),
                fontFamilyStyles(this.props),
                colorStyles({color: this.state.color}),
                paddingStyles(this.props),
                {
                  //height: this.state.heigh + 5,
                  flex: 1,
                  alignSelf: 'stretch',
                  textAlignVertical: 'center',
                  // paddingTop: multiline ? 0 : 0,
                },
              ]}
            />
          </View>

          {error && this.renderErrorIcon()}

          {rightItems.length ? this.renderItems(rightItems) : null}
          {secure && showSecureEye
            ? this.renderItems([this.renderSecureEyeButton()])
            : null}
          {/* {(this.state.asyncError || error) && this.renderErrorIcon()} */}
        </View>
        {!noValidation && error && (
          <InputError
            error={error}
            errorTextMarginHorizontal={errorTextMarginHorizontal}
            size={size}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(
  mapStateToProps,
  null,
  null,
  // { forwardRef: true },
)(Input);
