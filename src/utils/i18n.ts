import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    backend: {
      loadPath: '/2.0/locales/{{lng}}/{{ns}}.json',
    },
  });


export default i18n;


// add language resource from API response
export const addResources = async (lng: string, translations: any) => {
  i18n.addResourceBundle(lng, 'translation', translations, true, true);
  i18n.changeLanguage(lng);
};
