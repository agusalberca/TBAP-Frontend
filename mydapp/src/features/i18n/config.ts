import { I18NConfig, LangCode, SupportedLang } from './types';

const langENUS: SupportedLang = {
  code: LangCode.EN_US,
  label: 'English (US)',
};

const langESES: SupportedLang = {
  code: LangCode.ES_ES,
  label: 'Español',
};

export const i18nConfig: I18NConfig = {
  supportedLanguages: [langENUS, langESES],
  fallbackLang: langENUS,
  urlParam: 'lang',
  debug: false,
};
