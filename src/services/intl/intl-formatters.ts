import { MessageDescriptor } from 'react-intl';
import { IntlFactory } from './intl-factory';
import startCase from 'lodash/startCase';
import capitalize from 'lodash/capitalize';
import { CurrencyAmount } from '../../stores/entities';

const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;
const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;
const SECONDS_IN_WEEK = SECONDS_IN_DAY * 7;
const SECONDS_IN_MONTH = SECONDS_IN_DAY * 30;

export function formatNumericValue(
  value: number,
  maximumFractionDigits: number = 2
): string {
  return IntlFactory.getIntl().formatNumber(value, {
    useGrouping: true,
    maximumFractionDigits,
  });
}

export function formatMonetaryValue(value: number, currency: string): string {
  return IntlFactory.getIntl().formatNumber(value, {
    currency,
    style: 'currency',
    currencyDisplay: 'symbol',
    useGrouping: true,
    maximumFractionDigits: 2,
  });
}

export function formatCurrencyAmount(currencyAmount: CurrencyAmount): string {
  return formatMonetaryValue(
    currencyAmount.offsettedAmount,
    currencyAmount.currency
  );
}

export function formatPercentageValue(value: number): string {
  return IntlFactory.getIntl().formatNumber(value, {
    style: 'percent',
    useGrouping: true,
    maximumFractionDigits: 2,
  });
}

export function formatShortDate(value: Date): string {
  return IntlFactory.getIntl().formatDate(value, {
    year: '2-digit',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(value: Date): string {
  return IntlFactory.getIntl().formatDate(value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}

export function formatRelativeDatetime(value: Date): string {
  const seconds = Math.ceil((Date.now() - value.getTime()) / 1000);

  const months = Math.floor(seconds / SECONDS_IN_MONTH);
  if (months > 0) {
    return formatDateTime(value);
  }

  const weeks = Math.floor(seconds / SECONDS_IN_WEEK);
  if (weeks > 0) {
    return IntlFactory.getIntl().formatRelativeTime(-weeks, 'weeks');
  }

  const days = Math.floor(seconds / SECONDS_IN_WEEK);
  if (days > 0) {
    return IntlFactory.getIntl().formatRelativeTime(-days, 'days');
  }

  const hours = Math.floor(seconds / SECONDS_IN_HOUR);
  if (hours > 0) {
    return IntlFactory.getIntl().formatRelativeTime(-hours, 'days');
  }

  const minutes = Math.floor(seconds / SECONDS_IN_MINUTE);
  if (minutes > 0) {
    return IntlFactory.getIntl().formatRelativeTime(-minutes, 'minutes');
  }

  return IntlFactory.getIntl().formatRelativeTime(-seconds, 'seconds');
}

export function formatEnumValue(
  value: string,
  messages?: Record<string, MessageDescriptor>
): string {
  const intl = IntlFactory.getIntl();
  if (messages && value in messages) {
    return intl.formatMessage(messages[value]);
  }
  return capitalize(startCase(value));
}
