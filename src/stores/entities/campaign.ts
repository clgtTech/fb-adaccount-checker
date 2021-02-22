import * as mobx from 'mobx';
import {
  BidStrategy,
  BuyingType,
  CampaignEffectiveStatus,
  DatePreset,
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

  status: Status;
  isStatusUpdating: boolean = false;
  statusUpdateError: Error | null = null;

  dailyBudget?: CurrencyAmount;
  lifetimeBudget?: CurrencyAmount;
  isBudgetUpdating: boolean = false;
  budgetUpdateError: Error | null = null;

  insights?: Insights;

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

  setInsights(insights: CampaignDTO['insights']) {
    this.insights = insights ? new Insights(insights) : undefined;
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

    this.isStatusUpdating = true;
    this.status = status;
    try {
      await this.campaignApi.updateCampaign(this.id, { status });
      mobx.runInAction(() => {
        this.statusUpdateError = null;
        this.isStatusUpdating = false;
      });
    } catch (e) {
      mobx.runInAction(() => {
        this.status = oldStatus;
        this.statusUpdateError = e;
        this.isStatusUpdating = false;
      });
    }
  }

  async updateBudget({ dailyBudget, lifetimeBudget }: BudgetUpdate) {
    if (!dailyBudget && !lifetimeBudget) {
      return;
    }

    const oldDailyBudget = this.dailyBudget;
    const oldLifetimeBudget = this.lifetimeBudget;

    this.isBudgetUpdating = true;
    this.dailyBudget = dailyBudget;
    this.lifetimeBudget = lifetimeBudget;
    try {
      await this.campaignApi.updateCampaign(this.id, {
        lifetimeBudget: lifetimeBudget?.amount,
        dailyBudget: dailyBudget?.amount,
      });
      mobx.runInAction(() => {
        this.budgetUpdateError = null;
        this.isBudgetUpdating = false;
      });
    } catch (e) {
      mobx.runInAction(() => {
        this.dailyBudget = oldDailyBudget;
        this.lifetimeBudget = oldLifetimeBudget;
        this.budgetUpdateError = e;
        this.isBudgetUpdating = false;
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

export interface BudgetUpdate {
  dailyBudget?: CurrencyAmount;
  lifetimeBudget?: CurrencyAmount;
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
    params?: {
      insightsDatePreset?: DatePreset;
      limit?: number;
    }
  ): Promise<CampaignDTO[]>;
  getAdAccountCampaignsInsights(
    adAccountId: AdAccount['id'],
    params: {
      datePreset: DatePreset;
      limit?: number;
    }
  ): Promise<Map<Campaign['id'], InsightsDTO>>;
  updateCampaign(
    id: Campaign['id'],
    update: CampaignUpdate['data']
  ): Promise<OperationResult>;
}
