import { IntlFactory } from './intl-factory';

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
