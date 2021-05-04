import {
  Currency,
  AccountStatus,
  AccountDisableReason,
  FundingSourceType,
} from '../../types';

export interface AdAccountApi {
  getAdAccounts(userId: string, limit?: number): Promise<AdAccountDTO[]>;
}

export class AdAccount {
  readonly id: string;
  readonly name: string;
  readonly status: AccountStatus;
  readonly disableReason: AccountDisableReason;
  readonly currency: Currency;
  readonly limitPerDay: number;
  readonly timeZone: string;
  readonly fundingSourceType?: FundingSourceType;
  readonly displayedPaymentMethod?: string;
  readonly spend: number;
  readonly ctr: number;
  readonly cpc: number;
  readonly cpm: number;

  constructor(adAccountDTO: AdAccountDTO) {
    this.id = '' + adAccountDTO.id;
    this.name = adAccountDTO.name;
    this.status = adAccountDTO.status;
    this.disableReason = adAccountDTO.disableReason;
    this.currency = adAccountDTO.currency;
    this.limitPerDay = adAccountDTO.limitPerDay;
    this.timeZone = adAccountDTO.timeZone;
    this.fundingSourceType = adAccountDTO.fundingSourceType || undefined;
    this.displayedPaymentMethod =
      adAccountDTO.displayedPaymentMethod || undefined;
    this.spend = adAccountDTO.spend || 0;
    this.ctr = adAccountDTO.ctr || 0;
    this.cpc = adAccountDTO.cpc || 0;
    this.cpm = adAccountDTO.cpm || 0;
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
  limitPerDay: number;
  timeZone: string;
  fundingSourceType?: FundingSourceType;
  displayedPaymentMethod?: string;
  spend?: number | null;
  ctr?: number | null;
  cpc?: number | null;
  cpm?: number | null;
}
