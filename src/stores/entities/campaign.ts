import * as mobx from 'mobx';
import {
  AsyncActionStatus,
  BidStrategy,
  BuyingType,
  CampaignEffectiveStatus,
  Objective,
  OperationResult,
  Status,
} from '../../types';
import { CurrencyAmount } from './currency-amount';
import { AdAccount } from './ad-account';
import { Insights, InsightsDTO } from './insights';

export class Campaign {
  private campaignApi: CampaignApi;
  readonly id: string;
  readonly adAccountId: string;
  readonly effectiveStatus: CampaignEffectiveStatus;
  readonly name: string;
  readonly adsetCount: number;
  readonly objective: Objective;
  readonly buyingType: BuyingType;
  readonly bidStrategy?: BidStrategy;
  readonly insights?: Insights;

  status: Status;
  updateStatusOfStatus: AsyncActionStatus = AsyncActionStatus.idle;
  updateErrorOfStatus: Error | null = null;

  dailyBudget?: CurrencyAmount;
  lifetimeBudget?: CurrencyAmount;
  updateStatusOfBudget: AsyncActionStatus = AsyncActionStatus.idle;
  updateErrorOfBudget: Error | null = null;

  constructor(
    campaign: CampaignDTO,
    adAccount: AdAccount,
    campaignApi: CampaignApi
  ) {
    mobx.makeAutoObservable(this, {
      id: false,
      adAccountId: false,
      effectiveStatus: false,
      name: false,
      adsetCount: false,
      objective: false,
      buyingType: false,
      bidStrategy: false,
      insights: false,
    });

    this.campaignApi = campaignApi;

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

  canUpdate(adAccount: AdAccount): boolean {
    return (
      adAccount.isAdRunningOrInReview() &&
      this.effectiveStatus !== CampaignEffectiveStatus.ARCHIVED &&
      this.effectiveStatus !== CampaignEffectiveStatus.DELETED
    );
  }

  async updateStatus(status: Status) {
    const oldStatus = this.status;
    this.updateStatusOfStatus = AsyncActionStatus.pending;
    this.status = status;
    try {
      await this.campaignApi.updateCampaign(this.id, { status });
      mobx.runInAction(() => {
        this.updateErrorOfStatus = null;
        this.updateStatusOfStatus = AsyncActionStatus.success;
      });
    } catch (e) {
      mobx.runInAction(() => {
        this.status = oldStatus;
        this.updateErrorOfStatus = e;
        this.updateStatusOfStatus = AsyncActionStatus.error;
      });
    }
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

export interface CampaignUpdate {
  campaignId: Campaign['id'];
  data: {
    status?: Status;
    dailyBudget?: number | string;
    lifetimeBudget?: number | string;
  };
}

export interface CampaignApi {
  getAdAccountCampaigns(
    adAccountId: AdAccount['id'],
    limit?: number
  ): Promise<CampaignDTO[]>;
  updateCampaign(
    id: Campaign['id'],
    update: CampaignUpdate['data']
  ): Promise<OperationResult>;
}
