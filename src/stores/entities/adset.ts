import * as mobx from 'mobx';
import {
  AdsetEffectiveStatus,
  BidStrategy,
  OperationResult,
  Status,
} from '../../types';
import { CurrencyAmount } from './currency-amount';
import { AdAccount } from './ad-account';
import { BudgetUpdate, Campaign } from './campaign';
import { Insights, InsightsDTO } from './insights';

export class Adset {
  private adsetApi: AdsetApi;

  readonly id: string;
  readonly adAccountId: string;
  readonly campaignId: string;
  readonly effectiveStatus: AdsetEffectiveStatus;
  readonly name: string;
  readonly adCount: number;
  readonly bidStrategy?: BidStrategy;
  readonly insights?: Insights;

  status: Status;
  isStatusUpdating: boolean = false;
  statusUpdateError: Error | null = null;

  dailyBudget?: CurrencyAmount;
  lifetimeBudget?: CurrencyAmount;
  isBudgetUpdating: boolean = false;
  budgetUpdateError: Error | null = null;

  constructor(adset: AdsetDTO, adAccount: AdAccount, adsetApi: AdsetApi) {
    mobx.makeAutoObservable(this, {
      id: false,
      adAccountId: false,
      campaignId: false,
      effectiveStatus: false,
      name: false,
      adCount: false,
      bidStrategy: false,
      insights: false,
    });

    this.adsetApi = adsetApi;

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

  canUpdate(adAccount: AdAccount): boolean {
    return (
      adAccount.isAdRunningOrInReview() &&
      this.effectiveStatus !== AdsetEffectiveStatus.DELETED &&
      this.effectiveStatus !== AdsetEffectiveStatus.ARCHIVED
    );
  }

  async updateStatus(status: Status) {
    const oldStatus = this.status;

    this.isStatusUpdating = true;
    this.status = status;
    try {
      await this.adsetApi.updateAdset(this.id, { status });
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
      await this.adsetApi.updateAdset(this.id, {
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

export interface AdsetUpdate {
  adsetId: Adset['id'];
  data: {
    status?: Status;
    dailyBudget?: number | string;
    lifetimeBudget?: number | string;
  };
}

export interface AdsetApi {
  getCampaignAdsets(
    campaignId: Campaign['id'],
    limit?: number
  ): Promise<AdsetDTO[]>;
  updateAdset(
    id: Adset['id'],
    update: AdsetUpdate['data']
  ): Promise<OperationResult>;
}
