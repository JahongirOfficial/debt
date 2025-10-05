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
  
  const translate = (key, defaultValue = key, params) => {
    const keys = key.split('.');
    let value = t;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue;
      }
    }

    let str = typeof value === 'string' ? value : defaultValue;

    // Simple interpolation for placeholders like {{var}}
    if (params && typeof params === 'object') {
      Object.entries(params).forEach(([paramKey, paramVal]) => {
        const pattern = new RegExp(`\\{\\{\\s*${paramKey}\\s*\\}\\}`, 'g');
        str = str.replace(pattern, String(paramVal));
      });
    }

    return str;
  };
  
  return translate;
};