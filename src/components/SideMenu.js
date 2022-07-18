import React, { Component } from 'react';
import { Alert, Platform } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { logout } from '../actions/authActions';
import { View, Text, Icon, Image, Navigation, ScrollView, Button } from '../ui';
import ModalLogin from '../components/Modal/ModalLogin';
import Share from 'react-native-share';
import colors from '../ui/defaults/colors';
import axios from 'axios';
import { API_ENDPOINT } from '../configs';
import { Navigation as NativeNavigation } from 'react-native-navigation';

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false,
      showDetail: false,
      friends: 0,
      modalLogin: false,
      data: null,
      visibleModalLogin: false,
    };
    this.passInput = React.createRef();
  }

  renderItem = (
    name,
    iconName,
    iconType,
    onPress = () => { },
    numOfFruiends,
    num,
    iconSize,
    iconColor,
    reverse
  ) => (
      <View flex stretch ph={5} row onPress={onPress} bbw={1} bc={colors.white}>
        <View stretch center pv={6}>
          <Icon
            name={iconName}
            type={iconType}
            color={iconColor ? iconColor : 'white'}
            size={iconSize ? iconSize : 12}
            flip={reverse}
          />
        </View>
        <View
          flex
          stretch
          pl={5}
          row={numOfFruiends ? true : false}
          centerY={!numOfFruiends}
          centerX={numOfFruiends}>
          <Text color={iconColor ? iconColor : 'white'} size={8}>
            {name}
          </Text>
          {numOfFruiends && num > 0 && (
            <View
              backgroundColor={'red'}
              ph={4}
              borderRadius={10}
              mh={5}
              pt={Platform.OS === 'ios' ? 2 : undefined}>
              <Text color={'white'} size={5} stopTranslateNumbers>
                {num + ''}
              </Text>
            </View>
          )}
        </View>
      </View>
    );

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

  render() {
    let { token, user } = this.props;
    let { visibleModalLogin } = this.state;
    return (
      <View flex stretch >
        <View stretch height={10} />
        <ScrollView flex stretch backgroundColor={colors.blue}>
          {this.renderItem(
            I18n.t('home'),
            'home',
            'Feather',
            () => {
              Navigation.closeMenu();
            },
          )}
          {this.props.user.IsActive && user.UserType === 'S' &&this.renderItem(
            I18n.t('myProfile'),
            'user-tie',
            'FontAwesome5',
            () => {
              Navigation.push('ServiceProfile');

              Navigation.closeMenu();
            },
          )}
          {/* {this.renderItem(
            I18n.t('trainingProvider'),
            'user-tie',
            'FontAwesome5',
            () => {
              Navigation.closeMenu();
            },
            true,
            0,
            9,
          )}

          {this.renderItem(
            I18n.t('venueProvider'),
            'building-o',
            'FontAwesome',
            () => {
              // Navigation.push('Notifications');
              Navigation.closeMenu();
            },
            true,
            this.props.NotificationsCount,
          )
          }

          {this.renderItem(
            I18n.t('serviceRequistor'),
            'clipboard-notes',
            'Foundation',
            () => {
              // Navigation.push('Chat');
              Navigation.closeMenu();
            },
            true,
            this.props.messageCount,
          )
          } */}

          {this.props.user.IsActive && this.renderItem(
            I18n.t('EditProfileData'),
            'edit',
            'AntDesign',
            () => {
              Navigation.push('EditProfileData');
              Navigation.closeMenu();
            },
            true,
            this.props.messageCount,
          )
          }

          {/* {user.IsActive&&user.UserType === 'T'&&this.renderItem(
            I18n.t('myCourses'),
            'edit',
            'AntDesign',
            () => {
              // Navigation.push('EditProfileData');
              Navigation.closeMenu();
            },
            true,
            this.props.messageCount,
          )
          } */}
          {this.props.user.IsActive && user.UserType === 'T' && this.renderItem(
            I18n.t('addNewCourse'),
            'add-circle-outline',
            'MaterialIcons',
            () => {
              Navigation.push('AddCourse');
              Navigation.closeMenu();
            },
            true,
            this.props.messageCount,
          )
          }

          {this.props.user.IsActive && user.UserType === 'V' && this.renderItem(
            I18n.t('addNewPlace'),
            'pluscircleo',
            'AntDesign',
            () => {
              Navigation.push('AddVenue');
              Navigation.closeMenu();
            },
            true,
            this.props.messageCount,
          )
          }



          {this.props.user.IsActive && user.UserType === 'V' && this.renderItem(
            I18n.t('Reservation'),
            'history',
            'FontAwesome',
            () => {
              Navigation.push('Reservation');
              Navigation.closeMenu();
            },
            true,
            this.props.messageCount,
          )
          }
          {this.props.user.IsActive && user.UserType === 'S' && this.renderItem(
            I18n.t('history'),
            'history',
            'FontAwesome',
            () => {
              Navigation.push('History');
              Navigation.closeMenu();
            },
            true,
            this.props.messageCount,
          )
          }
           {this.props.user.IsActive && user.UserType === 'S' && this.renderItem(
            I18n.t('bankapi'),
            'wallet',
            'Entypo',
            () => {
              Navigation.push('PointWallets');
              Navigation.closeMenu();
            },
            true,
            this.props.messageCount,
          )
          }
          {this.renderItem(
            I18n.t('aboutUs'),
            'exclamationcircleo',
            'AntDesign',
            () => {
              // Navigation.push('EditProfile');
              Navigation.closeMenu();
            },
          )
          }

          {this.renderItem(
            I18n.t('help'),
            'help-circle',
            'Feather',
            () => {
              // Navigation.push('ContactUs');
              Navigation.closeMenu();
            },
          )}
          {this.renderItem(
            I18n.t('customerService'),
            'phone-in-talk',
            'MaterialIcons',
            () => {
              Navigation.push('ContactUs');
              Navigation.closeMenu();
            },
          )}

          {this.renderItem(
            I18n.t('logout'),
            'logout',
            'SimpleLineIcons',
            () => {
              this.renderModalLogout();
              Navigation.closeMenu();
            },
            true,
            0,
            12,
            'white',
            true
          )
          }
        </ScrollView>
        <ModalLogin
          visible={visibleModalLogin}
          changeState={() => {
            this.setState({ visibleModalLogin: false });
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    rtl: state.lang.rtl,
    lang: state.lang.lang,
    user: state.auth.user,
    token: state.auth.token,
    company: state.company.company,
    sideMenu: state.list.sideMenu,
    home: state.list.home,
    processing: state.auth.processing,
    cartCount: state.cart.productsCount,
    NotificationsCount: state.socket.NotificationsCount,
    messageCount: state.count.messageCount,
  };
};

export default connect(
  mapStateToProps,
  { logout },
)(SideMenu);
