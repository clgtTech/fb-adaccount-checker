import { AdAccount } from '../stores/ad-account-store';

type FieldDescriptor = [keyof AdAccount, string];
type FieldsSchema = FieldDescriptor[];

export class AdAccountsPresenter {
  constructor(
    public adAccounts: AdAccount[],
    public fieldsSchema: FieldsSchema = AdAccountsPresenter.defaultFieldsSchema
  ) {}

  static defaultFieldsSchema: FieldsSchema = [
    ['id', 'ID'],
    ['accountId', 'Account ID'],
    ['status', 'Account Status'],
    ['name', 'Account Name'],
    ['currency', 'Currency'],
    ['spend', 'Amount Spent'],
    ['ctr', 'CTR'],
  ];

  toCSV() {
    const serialize = (value: any): string => {
      return `"${value != null ? String(value) : ''}"`;
    };

    const header = this.fieldsSchema
      .map(([, fieldName]) => serialize(fieldName))
      .join(',');
    const records = this.adAccounts.map((adAccount) => {
      return this.fieldsSchema
        .map(([prop]) => serialize(adAccount[prop]))
        .join(',');
    });

    return [header, '', ...records].join('\n');
  }
}
