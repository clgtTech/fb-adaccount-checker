import { AccountStatus, AccountDisableReason } from './enums';

export type User = {
  id: string;
  name: string;
  pictureUrl: string;
  accessToken: string;
};

export type AdAccount = {
  id: string;
  accountId: string;
  name: string;
  status: AccountStatus;
  disableReason: AccountDisableReason;
};

export type Ad = {};
