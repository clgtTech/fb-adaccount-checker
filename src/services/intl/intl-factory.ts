import {
  createIntl as createIntlShape,
  createIntlCache,
  IntlShape,
  IntlFormatters,
} from 'react-intl';
import { Locale } from '../../types';
import { DEFAULT_LOCALE } from '../../constants';
import enUS from '../../translations/en-US.json';
import ruRU from '../../translations/ru-RU.json';

let intl = createIntl(DEFAULT_LOCALE);

export const IntlFactory = {
  _(...args: Parameters<IntlFormatters['formatMessage']>): string {
    return intl.formatMessage(...args);
  },
  getIntl() {
    return intl;
  },
  configureIntl(locale: Locale): IntlShape {
    if (locale !== intl.locale) {
      intl = createIntl(locale);
    }
    return intl;
  },
};

function getMessages(locale: Locale): Record<string, string> {
  switch (locale) {
    case Locale.ruRU:
      return ruRU;
    default:
      return enUS;
  }
}

function createIntl(locale: Locale): IntlShape {
  const cache = createIntlCache();
  return createIntlShape(
    {
      locale,
      messages: getMessages(locale),
      defaultLocale: Locale.enUS,
    },
    cache
  );
}
