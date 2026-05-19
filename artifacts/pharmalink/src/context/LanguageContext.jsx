import { createContext, useContext, useEffect, useState } from "react";
import i18n from "../i18n";

const LanguageContext = createContext({
  language: "en",
  dir: "ltr",
  toggleLanguage: () => {},
  setLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [language, setLang] = useState(() => localStorage.getItem("pharmalink_lang") || "en");
  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    localStorage.setItem("pharmalink_lang", language);
  }, [language, dir]);

  const toggleLanguage = () => setLang((l) => (l === "en" ? "ar" : "en"));
  const setLanguage = (lang) => setLang(lang);

  return (
    <LanguageContext.Provider value={{ language, dir, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
