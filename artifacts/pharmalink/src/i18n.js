import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.js";
import ar from "./translations/ar.js";

i18n.use(initReactI18next).init({
  resources: { en, ar },
  lng: localStorage.getItem("pharmalink_lang") || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
