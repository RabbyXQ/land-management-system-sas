import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const getCurrentLanguage = (): string => {
    return i18n.language;
  };

const resources = {
  en: {
    translation: {
      "welcome": "Welcome",
      "landDetails": "Land Details",
      "name": "Name",
      "location": "Location",
      "size": "Size",
      "owner": "Owner",
      "landType": "Land Type",
      "marketValue": "Market Value",
      "notes": "Notes"
    }
  },
  bn: {
    translation: {
      "welcome": "স্বাগতম",
      "landDetails": "জমির বিবরণ",
      "name": "নাম",
      "location": "ঠিকানা",
      "size": "পরিমাণ",
      "owner": "মালিক",
      "landType": "জমির ধরন",
      "marketValue": "বাজার মূল্য",
      "notes": "নোট"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
