import * as mobx from 'mobx';
import { AdsetEffectiveStatus, BidStrategy, Status } from '../../types';
import { CurrencyAmount } from './currency-amount';
import { AdAccount } from './ad-account';
import { Insights, InsightsDTO } from './insights';

export interface AdsetApi {
  getAdAccountAdsets(
    adAccountId: AdAccount['id'],
    limit?: number
  ): Promise<AdsetDTO[]>;
}

export class Adset {
  readonly id: string;
  readonly adAccountId: string;
  readonly campaignId: string;
  readonly effectiveStatus: AdsetEffectiveStatus;
  status: Status;
  name: string;
  readonly adCount: number;
  readonly bidStrategy?: BidStrategy;
  dailyBudget?: CurrencyAmount;
  lifetimeBudget?: CurrencyAmount;
  readonly insights?: Insights;

  constructor(adset: AdsetDTO, adAccount: AdAccount) {
    mobx.makeAutoObservable(this);
    this.id = '' + adset.id;
    this.adAccountId = '' + adset.adAccountId;
    this.campaignId = '' + adset.campaignId;
    this.effectiveStatus = adset.effectiveStatus;
    this.status = adset.status;
    this.name = adset.name;
    this.adCount = adset.adCount;
    this.bidStrategy = adset.bidStrategy ? adset.bidStrategy : undefined;
    this.dailyBudget = adset.dailyBudget
      ? new CurrencyAmount(adset.dailyBudget, adAccount.currency)
      : undefined;
    this.lifetimeBudget = adset.lifetimeBudget
      ? new CurrencyAmount(adset.lifetimeBudget, adAccount.currency)
      : undefined;
    this.insights = adset.insights ? new Insights(adset.insights) : undefined;
  }
}

export interface AdsetDTO {
  id: string | number;
  adAccountId: string | number;
  campaignId: string | number;
  effectiveStatus: AdsetEffectiveStatus;
  status: Status;
  name: string;
  adCount: number;
  bidStrategy?: BidStrategy | null;
  dailyBudget?: string | number | null;
  lifetimeBudget?: string | number | null;
  insights?: InsightsDTO | null;
}
