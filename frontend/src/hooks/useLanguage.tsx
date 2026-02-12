import { createContext, useContext, useState, type ReactNode } from "react";
import { type Language } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "pt",
  toggleLanguage: () => { },
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("pt");
  const toggleLanguage = () => setLanguage((l) => (l === "pt" ? "en" : "pt"));

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
