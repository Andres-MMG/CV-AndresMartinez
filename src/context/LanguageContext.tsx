import React, { createContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import es from '../locales/es.json';
import ptBR from '../locales/pt-BR.json';

export type SupportedLocale = 'en' | 'es' | 'pt-BR';
interface LanguageContextProps {
  locale: SupportedLocale;
  setLocale: (loc: SupportedLocale) => void;
  t: (key: string) => any;
}

const translations: Record<SupportedLocale, Record<string, any>> = {
  en,
  es,
  'pt-BR': ptBR,
};

export const LanguageContext = createContext<LanguageContextProps>({
  locale: 'es',
  setLocale: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<SupportedLocale>('es');
  useEffect(() => {
    const saved = localStorage.getItem('locale') as SupportedLocale | null;
    if (saved && translations[saved]) {
      setLocaleState(saved);
    } else {
      // Detectar idioma del navegador
      const browserLang = navigator.language;
      if (browserLang.startsWith('es')) {
        setLocaleState('es');
      } else if (browserLang.startsWith('pt')) {
        setLocaleState('pt-BR');
      } else if (browserLang.startsWith('en')) {
        setLocaleState('en');
      }
      // Si no coincide con ninguno de los soportados, se mantiene el valor por defecto
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  const setLocale = (loc: SupportedLocale) => {
    if (translations[loc]) setLocaleState(loc);
  };

  const t = (key: string): any => {
    const keys = key.split('.');
    let result: any = translations[locale];
    for (const k of keys) {
      result = result?.[k];
      if (result == null) return key;
    }
    // Return the resolved translation, which may be string, array, or object
    return result;
  };
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
