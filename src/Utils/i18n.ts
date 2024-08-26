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
      "notes": "Notes",
      "map": "Map",
      "earth": "Earth",
      "hybrid": "Hybrid",
      "terrain": "Terrain",
      "current_location": "Current Location",
      "mark_location": "Mark Location",
      "delete_polygon": "Delete Polygon"
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
      "notes": "নোট",
      "map": "ম্যাপ",
      "earth": "আর্থ",
      "hybrid": "হাইব্রিড",
      "terrain": "ভূখণ্ড",
      "current_location": "বর্তমান অবস্থান",
      "mark_location": "অবস্থান চিহ্নিত করুন",
      "delete_polygon": "পলিগন সরান"
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
