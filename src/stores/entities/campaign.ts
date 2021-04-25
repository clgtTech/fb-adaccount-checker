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
import { DeliveryStatus, DeliveryStatusDTO } from './delivery-status';
import { Insights, InsightsDTO } from './insights';

export class Campaign {
  private campaignApi: CampaignApi;
  readonly id: string;
  readonly adAccountId: string;
  readonly deliveryStatus?: DeliveryStatus;
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
    campaignDTO: CampaignDTO,
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

    this.id = '' + campaignDTO.id;
    this.adAccountId = '' + campaignDTO.adAccountId;
    this.deliveryStatus = campaignDTO.deliveryStatus
      ? new DeliveryStatus(campaignDTO.deliveryStatus)
      : undefined;
    this.effectiveStatus = campaignDTO.effectiveStatus;
    this.status = campaignDTO.status;
    this.name = campaignDTO.name;
    this.adsetCount = campaignDTO.adsetCount;
    this.objective = campaignDTO.objective;
    this.buyingType = campaignDTO.buyingType;
    this.bidStrategy = campaignDTO.bidStrategy
      ? campaignDTO.bidStrategy
      : undefined;
    this.dailyBudget = campaignDTO.dailyBudget
      ? new CurrencyAmount(campaignDTO.dailyBudget, adAccount.currency)
      : undefined;
    this.lifetimeBudget = campaignDTO.lifetimeBudget
      ? new CurrencyAmount(campaignDTO.lifetimeBudget, adAccount.currency)
      : undefined;
    this.insights = campaignDTO.insights
      ? new Insights(campaignDTO.insights)
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
  deliveryStatus?: DeliveryStatusDTO | null;
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
