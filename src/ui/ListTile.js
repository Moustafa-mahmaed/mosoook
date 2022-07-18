import React, {Component} from 'react';
import I18n from 'react-native-i18n';
import PropTypes from 'prop-types';

import {View, Text} from '.';

class ItemMore extends Component {
  static defaultProps = {
    titleSize: 6,
    titleColor: '#303030',
    subTitleSize: 4.3,
    subTitleColor: '#AEAEAE',
  };

  static propTypes = {
    borderBottomColor: PropTypes.string,
    borderBottomWidth: PropTypes.number,
    onPress: PropTypes.func,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    title: PropTypes.string,
    titleSize: PropTypes.number,
    titleColor: PropTypes.string,
    subTitle: PropTypes.string,
    subTitleSize: PropTypes.number,
    subTitleColor: PropTypes.string,
  };

  render() {
    const {
      borderBottomcolor,
      borderBottomWidth,
      onPress,
      prefix,
      suffix,
      width,
      title,
      titleSize,
      titleColor,
      subTitle,
      subTitleSize,
      subTitleColor,
      ...rest
    } = this.props;

    return (
      <View
        {...rest}
        stretch
        borderBottomcolor={borderBottomcolor}
        borderBottomWidth={borderBottomWidth}
        onPress={onPress}>
        <View stretch spaceBetween row>
          {prefix && (
            <View
              width={10}
              stretch
              marginTop={2}
              style={{alignItems: 'flex-start'}}>
              {prefix}
            </View>
          )}
          <View width={prefix ? 57 : 67}>
            <Text size={titleSize} color={titleColor}>
              {title}
            </Text>
            {subTitle && (
              <Text size={subTitleSize} color={subTitleColor}>
                {subTitle}
              </Text>
            )}
          </View>
          <View
            width={25}
            stretch
            marginTop={2}
            style={{alignItems: 'flex-start'}}>
            {suffix}
          </View>
        </View>
      </View>
    );
  }
}

export default ItemMore;
