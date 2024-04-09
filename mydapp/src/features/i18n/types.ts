export enum LangCode {
  ES_ES = 'es-ES',
  EN_US = 'en-US',
}

export type SupportedLang = {
  code: LangCode;
  label: string;
};

export type I18NConfig = {
  supportedLanguages: SupportedLang[];
  fallbackLang: SupportedLang;
  urlParam: string;
  debug: boolean;
};
