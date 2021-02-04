import * as mobx from 'mobx';
import {
  BidStrategy,
  BuyingType,
  CampaignEffectiveStatus,
  Objective,
  Status,
} from '../../types';
import { CurrencyAmount } from './currency-amount';
import { AdAccount } from './ad-account';
import { Insights, InsightsDTO } from './insights';

export interface CampaignApi {
  getAdAccountCampaigns(
    adAccountId: AdAccount['id'],
    limit?: number
  ): Promise<CampaignDTO[]>;
}

export class Campaign {
  readonly id: string;
  readonly adAccountId: string;
  readonly effectiveStatus: CampaignEffectiveStatus;
  status: Status;
  name: string;
  readonly adsetCount: number;
  readonly objective: Objective;
  readonly buyingType: BuyingType;
  readonly bidStrategy?: BidStrategy;
  dailyBudget?: CurrencyAmount;
  lifetimeBudget?: CurrencyAmount;
  readonly insights?: Insights;

  constructor(campaign: CampaignDTO, adAccount: AdAccount) {
    mobx.makeAutoObservable(this);
    this.id = '' + campaign.id;
    this.adAccountId = '' + campaign.adAccountId;
    this.effectiveStatus = campaign.effectiveStatus;
    this.status = campaign.status;
    this.name = campaign.name;
    this.adsetCount = campaign.adsetCount;
    this.objective = campaign.objective;
    this.buyingType = campaign.buyingType;
    this.bidStrategy = campaign.bidStrategy ? campaign.bidStrategy : undefined;
    this.dailyBudget = campaign.dailyBudget
      ? new CurrencyAmount(campaign.dailyBudget, adAccount.currency)
      : undefined;
    this.lifetimeBudget = campaign.lifetimeBudget
      ? new CurrencyAmount(campaign.lifetimeBudget, adAccount.currency)
      : undefined;
    this.insights = campaign.insights
      ? new Insights(campaign.insights)
      : undefined;
  }
}

export interface CampaignDTO {
  id: string | number;
  adAccountId: string | number;
  effectiveStatus: CampaignEffectiveStatus;
  status: Status;
  name: string;
  adsetCount: number;
  objective: Objective;
  buyingType: BuyingType;
  bidStrategy?: BidStrategy | null;
  dailyBudget?: string | number | null;
  lifetimeBudget?: string | number | null;
  insights?: InsightsDTO | null;
}
