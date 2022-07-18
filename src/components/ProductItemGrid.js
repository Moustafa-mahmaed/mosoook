/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Navigation, Icon, Image, showInfo} from '../ui';
import {connect} from 'react-redux';
import I18n from 'react-native-i18n';
import ModalLogin from './Modal/ModalLogin';
import {API_ENDPOINT} from '../configs';
import {modifyCart} from '../actions/cart';
import {Favourite} from './Favourite';
import {refreshList} from '../actions/list';
import ModalDelete from './Modal/ModalDelete';

const ProductItem = props => {
  let {cartProducts, cartPrice, data, rtl, modifyCart, token} = props;
  const [isFav, setFav] = useState(false);
  const [count, setCount] = useState(0);
  const [visibleModalLogin, setVisibleModalLogin] = useState(false);
  const notInStock = data.quantity === 0 ? true : false;
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);
  useEffect(() => {
    if (data.favorite || props.fav) {
      setFav(true);
    } else {
      setFav(false);
    }
    let _prods = cartProducts.slice();
    let index = _prods.findIndex(x => x.product.id === data.id);
    if (index !== -1) {
      setCount(cartProducts[index].quantity);
    } else {
      setCount(0);
    }
  }, [data, cartProducts, props.fav]);

  let CartPlus = () => {
    if (count === data.quantity) {
      showInfo(
        `${I18n.t('Available quantity now')} ${data.quantity} ${I18n.t(
          'from this product',
        )}`,
      );
      return;
    }
    let _prods = cartProducts.slice();
    let price = data.offer
      ? data.price - parseInt(data.offer * data.price) / 100
      : data.price;

    if (count !== 0) {
      let ind = _prods.findIndex(x => x.product.id === data.id);
      _prods[ind].quantity = count + 1;
      setCount(count + 1);
      modifyCart(_prods, cartPrice + price);
    } else {
      _prods.push({product: data, quantity: 1});
      setCount(1);
      modifyCart(_prods, cartPrice + price);
    }
  };

  let CartMinus = () => {
    if (count === 0) {
      return;
    }
    let _prods = cartProducts.slice();
    let price = data.offer
      ? data.price - parseInt(data.offer * data.price) / 100
      : data.price;
    let ind = _prods.findIndex(x => x.product.id === data.id);
    if (count !== 1) {
      _prods[ind].quantity = count - 1;
      setCount(count - 1);
      modifyCart(_prods, cartPrice - price);
    } else {
      _prods.splice(ind, 1);
      setCount(0);
      modifyCart(_prods, cartPrice - price);
    }
  };

  return (
    <View
      width={42}
      height={42}
      touchableOpacity
      centerX
      mv={props.mv ? props.mv : 5}
      mh={props.mh ? props.mh : props.orderDetails ? 4 : 1}
      backgroundColor={'white'}
      elevation={5}
      borderRadius={15}
      style={[{transform: rtl ? [{scaleX: -1}] : []}, props.itemStyle]}
      onPress={() => {
        Navigation.push(
          {
            name: 'ProductDetails',
            passProps: {
              id: data.id,
              onFav: fav => {
                setFav(fav);
                if (props.search) {
                  props.refreshList(['favList', 'catList']);
                } else if (props.related) {
                  props.refreshList(['favList', 'catList', 'serList']);
                } else {
                  props.refreshList(['favList']);
                }
              },
            },
          },
          false,
          props.related,
        );
      }}>
      <View stretch row style={{alignItems: 'flex-start'}} spaceBetween>
        {props.cart || props.orderDetails ? (
          <Text color="white">{'.'}</Text>
        ) : (
          <Icon
            name={isFav ? 'heart' : 'heart-o'}
            type={'FontAwesome'}
            m={3}
            size={9}
            color={'thirdly'}
            onPress={() => {
              if (!token) {
                setVisibleModalLogin(true);
              } else {
                // fav, cart,cat, orderDetails,related, search
                // favList , catList,serList
                if (isFav) {
                  if (props.fav) {
                    setVisibleModalDelete(true);
                    return;
                  }
                  setFav(false);
                  Favourite(
                    data.id,
                    () => {
                      if (props.search) {
                        props.refreshList(['favList', 'catList']);
                      } else if (props.related) {
                        props.refreshList(['favList', 'catList', 'serList']);
                      } else {
                        props.refreshList(['favList']);
                      }
                    },
                    false,
                    () => {
                      setFav(true);
                    },
                  );
                } else {
                  setFav(true);
                  Favourite(
                    data.id,
                    () => {
                      if (props.search) {
                        props.refreshList(['favList', 'catList']);
                      } else if (props.related) {
                        props.refreshList(['favList', 'catList', 'serList']);
                      } else {
                        props.refreshList(['favList']);
                      }
                    },
                    true,
                    () => {
                      setFav(false);
                    },
                  );
                }
              }
            }}
          />
        )}
        {data.offer ? (
          <View
            center
            backgroundColor={notInStock ? 'grey' : 'thirdly'}
            style={{borderTopLeftRadius: 15, borderBottomRightRadius: 10}}>
            <Text size={5} mv={3} mh={4} color={'white'} bold>
              {`${data.offer}%`}
            </Text>
          </View>
        ) : null}
      </View>
      <Image
        mt={2}
        source={{uri: `${API_ENDPOINT}${data.image}`}}
        width={35}
        height={15}
        resizeMode={'contain'}
      />
      <View stretch flex>
        <View stretch flex mh={3}>
          <Text
            size={7}
            bold
            color={notInStock ? 'grey' : 'black'}
            numberOfLines={1}>
            {data.name}
          </Text>
        </View>
        <View stretch flex row mh={3}>
          <View flex={0.5}>
            <Text size={7} numberOfLines={1} color={'grey'}>
              {data.unit}
            </Text>
          </View>
          <View flex={0.5} style={{alignItems: 'flex-start'}}>
            <Text size={7} numberOfLines={1} color={'grey'}>
              {data.tradeMark.name}
            </Text>
          </View>
        </View>
        <View stretch flex mh={3}>
          <Text
            size={7}
            bold
            numberOfLines={1}
            color={notInStock ? 'grey' : 'thirdly'}>
            {`${
              data.offer
                ? data.price - parseInt(data.offer * data.price) / 100
                : data.price
            } ${I18n.t('EG')}`}
          </Text>
        </View>
        {data.offer ? (
          <View stretch flex mh={3}>
            <Text
              size={6}
              bold
              style={{textDecorationLine: 'line-through'}}
              numberOfLines={1}
              color={'grey'}>
              {`${data.price} ${I18n.t('EG')}`}
            </Text>
          </View>
        ) : null}
        {notInStock ? (
          <View stretch row center backgroundColor={'thirdly'} mt={3}>
            <Text flex size={7} color={'white'} mv={3}>
              {I18n.t('Not in stock')}
            </Text>
          </View>
        ) : props.orderDetails ? null : (
          <View stretch row backgroundColor={'primary'} mt={3}>
            <View flex center>
              <Icon
                type={'Entypo'}
                name={'circle-with-plus'}
                size={14}
                mv={3}
                color={'white'}
                onPress={() => {
                  CartPlus();
                }}
              />
            </View>
            <View flex center>
              <Text size={8} numberOfLines={1} bold color={'white'}>
                {count}
              </Text>
            </View>
            <View flex center>
              <Icon
                type={'Entypo'}
                name={'circle-with-minus'}
                size={14}
                mv={3}
                color={'white'}
                onPress={() => {
                  if (count !== 0) {
                    CartMinus();
                  }
                }}
              />
            </View>
          </View>
        )}
      </View>
      <ModalLogin
        visible={visibleModalLogin}
        changeState={() => {
          setVisibleModalLogin(false);
        }}
      />
      <ModalDelete
        visible={visibleModalDelete}
        changeState={() => {
          setVisibleModalDelete(false);
        }}
        title={I18n.t('Are you want to remove this product from favorite')}
        onDone={() => {
          setLoadingFav(true);
          Favourite(
            data.id,
            () => {
              setLoadingFav(false);
              setVisibleModalDelete(false);
              props.removeItemFromList(props.removeID);
            },
            false,
            () => {},
          );
        }}
        loading={loadingFav}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    rtl: state.lang.rtl,
    cartPrice: state.cart.price,
    cartProducts: state.cart.products,
    cartCount: state.cart.productsCount,
  };
};

export default connect(
  mapStateToProps,
  {modifyCart, refreshList},
)(ProductItem);
