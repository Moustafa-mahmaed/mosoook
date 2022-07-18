import RNLanguages from 'react-native-languages';
import ar from '../translations/ar.json';
import en from '../translations/en.json';
import i18n from './i18n';

i18n.locale = RNLanguages.language;
//"ar-EG";
i18n.fallbacks = true;
i18n.translations = { ar, en };

export default i18n;