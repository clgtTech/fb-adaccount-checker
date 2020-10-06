import { Locale } from 'enums';

export function formatMonetaryValue(
  value: number,
  currency: string,
  locale: Locale = Locale.Ru
): string {
  const intl = new window.Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
    currencyDisplay: 'symbol',
    useGrouping: true,
    maximumFractionDigits: 2,
  });
  return intl.format(value);
}

export function toISODate(date: Date): string {
  const [dateISO] = date.toISOString().split(/[ T]/);
  return dateISO;
}
