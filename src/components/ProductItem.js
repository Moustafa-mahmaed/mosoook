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
  let {cartProducts, cartPrice, data, modifyCart, token} = props;
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
      setCount(_prods[index].quantity);
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
      stretch
      centerX
      mt={5}
      backgroundColor={'white'}
      touchableOpacity
      elevation={5}
      mh={1}
      borderRadius={15}
      style={[props.itemStyle]}
      onPress={() => {
        Navigation.push({
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
        });
      }}>
      <Icon
        name={isFav ? 'heart' : 'heart-o'}
        type={'FontAwesome'}
        m={4}
        size={9}
        color={'thirdly'}
        style={{position: 'absolute', top: 0, right: 0, zIndex: 1}}
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
      {data.offer ? (
        <View
          center
          backgroundColor={notInStock ? 'grey' : 'thirdly'}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            borderTopLeftRadius: 15,
            borderBottomRightRadius: 10,
          }}>
          <Text size={5} mv={3} mh={4} color={'white'} bold>
            {`${data.offer}${'%'}`}
          </Text>
        </View>
      ) : null}
      <View stretch row>
        <View>
          <Image
            source={{uri: `${API_ENDPOINT}${data.image}`}}
            width={30}
            height={15}
            resizeMode={'contain'}
          />
        </View>
        <View stretch flex mv={5}>
          <View flex={0.8}>
            <Text
              size={7}
              bold
              color={notInStock ? 'grey' : 'black'}
              numberOfLines={1}>
              {data.name}
            </Text>
          </View>
          <View stretch flex row>
            <View flex={0.4}>
              <Text size={7} numberOfLines={1} bold color={'grey'}>
                {data.unit}
              </Text>
            </View>
            <View flex={0.5}>
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
        </View>
      </View>
      {notInStock ? (
        <View stretch row center backgroundColor={'thirdly'} mt={3}>
          <Text size={7} color={'white'} bold mv={3}>
            {I18n.t('Not in stock')}
          </Text>
        </View>
      ) : (
        <View stretch row center backgroundColor={'primary'} mt={3}>
          <Icon
            type={'Entypo'}
            mh={5}
            name={'circle-with-plus'}
            size={14}
            mv={3}
            color={'white'}
            onPress={() => {
              CartPlus();
            }}
          />
          <Text size={8} mh={2} numberOfLines={1} bold color={'white'}>
            {count}
          </Text>
          <Icon
            type={'Entypo'}
            mh={5}
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
      )}
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
