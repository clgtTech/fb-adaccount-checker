import { MessageDescriptor } from 'react-intl';
import { IntlFactory } from './intl-factory';
import startCase from 'lodash/startCase';
import capitalize from 'lodash/capitalize';
import { CurrencyAmount } from '../../stores/entities';

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
