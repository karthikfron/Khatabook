import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import te from "./Translation/te/translation.json";
import en from "./Translation/en/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      te: { translation: te }
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;