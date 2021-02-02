import { Currency } from '../../types';

const CurrencyOffsets: { [K in Currency]: number } = {
  [Currency.DZD]: 100,
  [Currency.ARS]: 100,
  [Currency.AUD]: 100,
  [Currency.BDT]: 100,
  [Currency.BOB]: 100,
  [Currency.BRL]: 100,
  [Currency.GBP]: 100,
  [Currency.CAD]: 100,
  [Currency.CLP]: 1,
  [Currency.CNY]: 100,
  [Currency.COP]: 1,
  [Currency.CRC]: 1,
  [Currency.CZK]: 100,
  [Currency.DKK]: 100,
  [Currency.EGP]: 100,
  [Currency.EUR]: 100,
  [Currency.GTQ]: 100,
  [Currency.HNL]: 100,
  [Currency.HKD]: 100,
  [Currency.HUF]: 1,
  [Currency.ISK]: 1,
  [Currency.INR]: 100,
  [Currency.IDR]: 1,
  [Currency.ILS]: 100,
  [Currency.JPY]: 1,
  [Currency.KES]: 100,
  [Currency.KRW]: 1,
  [Currency.MOP]: 100,
  [Currency.MYR]: 100,
  [Currency.MXN]: 100,
  [Currency.NZD]: 100,
  [Currency.NIO]: 100,
  [Currency.NGN]: 100,
  [Currency.NOK]: 100,
  [Currency.PKR]: 100,
  [Currency.PYG]: 1,
  [Currency.PEN]: 100,
  [Currency.PHP]: 100,
  [Currency.PLN]: 100,
  [Currency.QAR]: 100,
  [Currency.RON]: 100,
  [Currency.RUB]: 100,
  [Currency.SAR]: 100,
  [Currency.SGD]: 100,
  [Currency.ZAR]: 100,
  [Currency.SEK]: 100,
  [Currency.CHF]: 100,
  [Currency.TWD]: 1,
  [Currency.THB]: 100,
  [Currency.TRY]: 100,
  [Currency.AED]: 100,
  [Currency.USD]: 100,
  [Currency.UYU]: 100,
  [Currency.VEF]: 100,
  [Currency.VND]: 1,
};

export class CurrencyAmount {
  private _amount: number;
  private readonly _currency: Currency;

  constructor(amount: string | number, currency: Currency) {
    this._amount = CurrencyAmount.toInt(amount);
    this._currency = currency;
  }

  static toInt(value: string | number): number {
    return Number.parseInt(String(value)) || 0;
  }

  set amount(amount: string | number) {
    this._amount = CurrencyAmount.toInt(amount);
  }

  get amount() {
    return this._amount;
  }

  get currency() {
    return this._currency;
  }

  get offsettedAmount() {
    return this._amount / (CurrencyOffsets[this._currency] || 1);
  }

  toJSON() {
    return {
      amount: this._amount,
      offsettedAmount: this.offsettedAmount,
      currency: this._currency,
    };
  }
}
