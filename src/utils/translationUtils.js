import { useState, useEffect } from 'react';

// Translation system
const translations = {
  uz: () => import('../../lang/uz.json'),
  ru: () => import('../../lang/ru.json'),
  en: () => import('../../lang/en.json'),
  tjk: () => import('../../lang/tjk.json')
};

// Translation hook
export const useTranslation = (language) => {
  const [t, setT] = useState({});
  
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationLoader = translations[language];
        if (translationLoader) {
          const module = await translationLoader();
          const translation = module.default || module;
          setT(translation);
        }
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to Uzbek if loading fails
        if (language !== 'uz') {
          try {
            const module = await translations.uz();
            const fallback = module.default || module;
            setT(fallback);
          } catch (fallbackError) {
            console.error('Failed to load fallback translations:', fallbackError);
          }
        }
      }
    };
    
    loadTranslations();
  }, [language]);
  
  const translate = (key, defaultValue = key) => {
    const keys = key.split('.');
    let value = t;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue;
      }
    }
    
    return typeof value === 'string' ? value : defaultValue;
  };
  
  return translate;
};