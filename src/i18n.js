// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Students": "Students",
      "Teachers": "Teachers",
      "Subjects": "Subjects",
    }
  },
  es: {
    translation: {
      "Students": "Estudiantes",
      "Teachers": "Docentes",
      "Subjects": "Materias",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // default language
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
