import { Currency, AccountStatus, AccountDisableReason } from '../../types';

export interface AdAccountApi {
  getAdAccounts(userId: string, limit?: number): Promise<AdAccountDTO[]>;
}

export class AdAccount {
  readonly id: string;
  readonly name: string;
  readonly status: AccountStatus;
  readonly disableReason: AccountDisableReason;
  readonly currency: Currency;
  readonly spend: number;
  readonly ctr: number;

  constructor(adAccount: AdAccountDTO) {
    this.id = '' + adAccount.id;
    this.name = adAccount.name;
    this.status = adAccount.status;
    this.disableReason = adAccount.disableReason;
    this.currency = adAccount.currency;
    this.spend = adAccount.spend || 0;
    this.ctr = adAccount.ctr || 0;
  }

  isAdRunningOrInReview() {
    return (
      this.status === AccountStatus.ACTIVE ||
      this.status === AccountStatus.PENDING_SETTLEMENT ||
      this.status === AccountStatus.IN_GRACE_PERIOD
    );
  }
}

export interface AdAccountDTO {
  id: string | number;
  name: string;
  status: AccountStatus;
  disableReason: AccountDisableReason;
  currency: Currency;
  spend?: number | null;
  ctr?: number | null;
}
