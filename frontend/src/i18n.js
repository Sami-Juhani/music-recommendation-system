import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector"; // Import the 'LanguageDetector' module
import { initReactI18next } from "react-i18next"; // Import the 'initReactI18next' module

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "ru",
        resources: {
            ru: {
                translation: require("./locales/ru/translation.json"),
            }
        },
    });

export default i18next;