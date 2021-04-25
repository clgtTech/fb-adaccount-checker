import * as mobx from 'mobx';
import {
  AdsetEffectiveStatus,
  BidStrategy,
  DatePreset,
  OperationResult,
  Status,
} from '../../types';
import { CurrencyAmount } from './currency-amount';
import { AdAccount } from './ad-account';
import { BudgetUpdate } from './campaign';
import { Insights, InsightsDTO } from './insights';
import { DeliveryStatus, DeliveryStatusDTO } from './delivery-status';

export class Adset {
  private adsetApi: AdsetApi;

  readonly id: string;
  readonly adAccountId: string;
  readonly campaignId: string;
  readonly deliveryStatus?: DeliveryStatus;
  readonly effectiveStatus: AdsetEffectiveStatus;
  readonly name: string;
  readonly adCount: number;
  readonly bidStrategy?: BidStrategy;

  status: Status;
  isStatusUpdating: boolean = false;
  statusUpdateError: Error | null = null;

  dailyBudget?: CurrencyAmount;
  lifetimeBudget?: CurrencyAmount;
  isBudgetUpdating: boolean = false;
  budgetUpdateError: Error | null = null;

  insights?: Insights;

  constructor(adsetDTO: AdsetDTO, adAccount: AdAccount, adsetApi: AdsetApi) {
    mobx.makeAutoObservable(this, {
      id: false,
      adAccountId: false,
      campaignId: false,
      effectiveStatus: false,
      name: false,
      adCount: false,
      bidStrategy: false,
    });

    this.adsetApi = adsetApi;

    this.id = '' + adsetDTO.id;
    this.adAccountId = '' + adsetDTO.adAccountId;
    this.campaignId = '' + adsetDTO.campaignId;
    this.deliveryStatus = adsetDTO.deliveryStatus
      ? new DeliveryStatus(adsetDTO.deliveryStatus)
      : undefined;
    this.effectiveStatus = adsetDTO.effectiveStatus;
    this.status = adsetDTO.status;
    this.name = adsetDTO.name;
    this.adCount = adsetDTO.adCount;
    this.bidStrategy = adsetDTO.bidStrategy ? adsetDTO.bidStrategy : undefined;
    this.dailyBudget = adsetDTO.dailyBudget
      ? new CurrencyAmount(adsetDTO.dailyBudget, adAccount.currency)
      : undefined;
    this.lifetimeBudget = adsetDTO.lifetimeBudget
      ? new CurrencyAmount(adsetDTO.lifetimeBudget, adAccount.currency)
      : undefined;
    this.insights = adsetDTO.insights
      ? new Insights(adsetDTO.insights)
      : undefined;
  }

  setInsights(insights: AdsetDTO['insights']) {
    this.insights = insights ? new Insights(insights) : undefined;
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
  deliveryStatus?: DeliveryStatusDTO | null;
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
  getAdAccountAdsets(
    adAccountId: AdAccount['id'],
    params?: { insightsDatePreset?: DatePreset; limit?: number }
  ): Promise<AdsetDTO[]>;
  getAdAccountAdsetsInsights(
    adAccountId: AdAccount['id'],
    params?: { datePreset: DatePreset; limit?: number }
  ): Promise<Map<Adset['id'], InsightsDTO>>;
  updateAdset(
    id: Adset['id'],
    update: AdsetUpdate['data']
  ): Promise<OperationResult>;
}
