import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/translation.json";
import ruTranslation from "./locales/ru/translation.json";

interface Resources {
  [key: string]: {
    translation: any;
  };
}

const resources: Resources = {
  en: {
    translation: enTranslation,
  },
  ru: {
    translation: ruTranslation,
  },
};

const languageDetector = new LanguageDetector(null, {
  order: ["navigator"],
  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  caches: ["localStorage"],
});

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    detection: {
      order: ["navigator"],
      caches: ["localStorage"],
    },
    resources,
  });

export default i18next;