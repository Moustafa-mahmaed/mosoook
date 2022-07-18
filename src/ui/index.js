import './Base/polyfill';

export {default as View} from './View';
export {default as ScrollView} from './ScrollView';
export {default as Text} from './Text';
export {default as Icon} from './Icon';
export {default as Spinner} from './Indicator';
export {default as Button} from './Button';
export {default as Image} from './Image';
export {default as List} from './List';
export {default as Form} from './Form';
// export {default as Swiper} from './Swiper';
export {default as Swiper} from './MySwiper';

// export { default as AppTabs } from './Tabs';
export {default as Input} from './Input';
// export { default as AppFormLocation } from './FormLocation';
export {default as TextArea} from './TextArea';
export {default as DatePicker} from './DatePicker';
// export { default as AppWheelPicker } from './WheelPicker';
// export { default as AppRadioGroup } from './RadioGroup';
export {default as RadioButton} from './RadioButton';
// export { default as CheckBoxGroup } from './CheckBoxGroup';
export {default as CheckBox} from './CheckBox';
// export { default as AppDropDown } from './DropDown';
export {default as Modal} from './Modal';
export {default as Navigation} from './Navigation';
export {default as CreateStackNavigation} from './StackNavigation';
export {default as AnimatedText} from './AppAnimatedText';
export {default as InputError} from './micro/InputError';
export {registerCustomIconType} from './utils/icon';
export {getColors, getColor, getTheme, getFonts} from './Theme';
export {showInfo, showSuccess, showError} from './utils/localNotifications';
export {default as SelectionOptionsGroup} from './SelectionOptionsGroup';
export {default as ImageViewer} from './ImageViewer';

export {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  moderateScale,
  windowWidth,
  windowHeight,
  screenWidth,
  screenHeight,
  statusBarHeight,
} from './utils/responsiveDimensions';
export {default as LocaleEn} from './defaults/en.json';
export {default as LocaleAr} from './defaults/ar.json';
export {default as Slider} from './AppSlider';
export {default as StarRating} from './AppStarRating';
export {default as Picker} from './Picker';
export {default as Wrapper} from './Wrapper';
