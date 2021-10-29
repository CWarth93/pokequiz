import { detect } from 'helpers/language';

import { table as de } from './de';
import { table as en } from './en';

const supportedLanguages = ['en', 'de'];
const defaultLanguage = 'en';
const languages = {
  de: de,
  en: en,
};

const getDefaultTexts = () => languages[defaultLanguage];
const getTexts = () => languages[detect(supportedLanguages, defaultLanguage)];

export { supportedLanguages, defaultLanguage, getDefaultTexts, getTexts };
