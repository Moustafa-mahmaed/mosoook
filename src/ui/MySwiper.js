import React, {Component} from 'react';
import {AppRegistry, StyleSheet} from 'react-native';

import Swiper from 'react-native-swiper';
import {View, text, Image, Navigation} from '../ui';
import {connect} from 'react-redux';
import axios from 'axios';
import {API_ENDPOINT} from '../configs';
import {responsiveWidth, responsiveHeight} from './utils/responsiveDimensions';
// import ImageViewer from 'react-native-image-zoom-viewer';

class MySwiper extends Component {
  state = {
    data: [],
    loading: false,
  };

  componentDidMount() {
    if (!this.props.data) this.loadAllChieldrens();
    else this.setState({data: this.props.data});
  }

  loadAllChieldrens() {
    this.setState({loading: true});
    axios
      .get(this.props.uri, {
        headers: {
          'Accept-Language': this.props.lang,
        },
      })
      .then(response => {
        this.setState({
          data: Array.isArray(response.data)
            ? response.data
            : response.data.data,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({loading: false});
      });
  }

  render() {
    return (
      <Swiper
        {...this.props}
        autoplayTimeout={4}
        autoplay={true}
        dot={this.props.dot ? this.props.dot : null}
        removeClippedSubviews={false}
        key={this.state.data.length}
        activeDot={this.props.activeDot ? this.props.activeDot : null}
        activeDotColor={'#F88F12'}
        dotColor={'#faba6b'}
        loop={true}>
        {this.state.data &&
          this.state.data.map((elemnet, index) => {
            if (typeof elemnet === 'object') {
              return (
                <Image
                  resizeMode={
                    this.props.resizeMode ? this.props.resizeMode : 'stretch'
                  }
                  key={index}
                  source={{uri: `${API_ENDPOINT}${elemnet.image}`}}
                  centerSelf={this.props.centerSelf}
                  width={this.props.imageWidth ? this.props.imageWidth : 100}
                  height={this.props.imageHeight ? this.props.imageHeight : 25}
                  borderRadius={
                    this.props.borderRadius ? this.props.borderRadius : 0
                  }
                  onPress={
                    this.props.press
                      ? () => {
                          elemnet.product
                            ? Navigation.push({
                                name: 'ProductDetails',
                                passProps: {
                                  id: elemnet.product.id,
                                  onFav: fav => {},
                                },
                              })
                            : elemnet.category
                            ? Navigation.push({
                                name: 'Category',
                                passProps: {
                                  id: elemnet.category.id,
                                  name: elemnet.category.name,
                                },
                              })
                            : null;
                        }
                      : null
                  }
                />
              );
            } else {
              return (
                <Image
                  resizeMode={
                    this.props.resizeMode ? this.props.resizeMode : 'stretch'
                  }
                  key={index}
                  source={{uri: `${API_ENDPOINT}${elemnet}`}}
                  centerSelf={this.props.centerSelf}
                  width={this.props.imageWidth ? this.props.imageWidth : 100}
                  height={this.props.imageHeight ? this.props.imageHeight : 25}
                  borderRadius={
                    this.props.borderRadius ? this.props.borderRadius : 0
                  }
                />
              );
            }
          })}
      </Swiper>
    );
  }
}

const mapStateToProps = state => {
  return {
    rtl: state.lang.rtl,
    lang: state.lang.lang,
  };
};

export default connect(mapStateToProps)(MySwiper);
