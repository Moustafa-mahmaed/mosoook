import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const customIcons = {};

export const registerCustomIconType = (id, customIcon) => {
  const IcoMoonIcon = createIconSetFromIcoMoon(customIcon);

  customIcons[id] = IcoMoonIcon;
};

export const getIconType = type => {
  switch (type) {
    case 'AntDesign':
      return AntDesign;
    case 'Fontisto':
      return Fontisto;
    case 'Entypo':
      return Entypo;
    case 'EvilIcons':
      return EvilIcons;
    case 'Feather':
      return Feather;
    case 'FontAwesome':
      return FontAwesome;
    case 'FontAwesome5':
      return FontAwesome5;
    case 'Foundation':
      return Foundation;
    case 'Ionicons':
      return Ionicons;
    case 'MaterialIcons':
      return MaterialIcons;
    case 'MaterialCommunityIcons':
      return MaterialCommunityIcons;
    case 'Octicons':
      return Octicons;
    case 'Zocial':
      return Zocial;
    case 'SimpleLineIcons':
      return SimpleLineIcons;
    default:
      if (Object.prototype.hasOwnProperty.call(customIcons, type)) {
        return customIcons[type];
      }
  }
  return null;
};

export const getIconSizeScaleFix = type => {
  switch (type) {
    case 'ant':
      return 0.9;
    case 'entypo':
      return 1;
    case 'evil':
      return 1.3;
    case 'feather':
      return 0.95;
    case 'font-awesome':
      return 1.1;
    case 'font-awesome5':
      return 1.1;
    case 'foundation':
      return 1.1;
    case 'ion':
      return 1;
    case 'material':
      return 1.05;
    case 'material-community':
      return 1;
    case 'oct':
      return 0.9;
    case 'zocial':
      return 0.8;
    case 'simple-line':
      return 1.1;
    default:
      return 1;
  }
};
