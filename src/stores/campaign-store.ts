import * as mobx from 'mobx';
import {
  ActionType,
  AsyncActionStatus,
  BidStrategy,
  BuyingType,
  Objective,
  Status,
} from '../types';
import { CurrencyAmount } from './entities';
import { AdAccount } from './ad-account-store';

export interface CampaignApi {
  getAdAccountCampaigns(
    adAccount: AdAccount,
    limit?: number
  ): Promise<Campaign[]>;
}

export class CampaignInsights {
  constructor(
    public readonly actionType: ActionType,
    public readonly actionTypeResult: number,
    public readonly costPerActionType: number,
    public readonly spend: number,
    public readonly cpc: number,
    public readonly cpm: number,
    public readonly ctr: number
  ) {}
}

export class Campaign {
  constructor(
    public readonly id: string,
    public readonly adAccountId: string,
    public status: Status,
    public name: string,
    public readonly adsetCount: number,
    public readonly objective: Objective,
    public readonly buyingType: BuyingType,
    public readonly bidStrategy?: BidStrategy,
    public dailyBudget?: CurrencyAmount,
    public lifetimeBudget?: CurrencyAmount,
    public readonly budgetRemaining?: CurrencyAmount,
    public readonly insights?: CampaignInsights
  ) {
    mobx.makeAutoObservable(this);
  }
}

export class CampaignStore {
  campaignsMap: Map<Campaign['id'], Campaign> = new Map();
  loadStatus: AsyncActionStatus = AsyncActionStatus.idle;
  loadError: Error | null = null;

  constructor(private _campaignApi: CampaignApi) {
    mobx.makeAutoObservable(this);
  }

  get isEmpty() {
    return this.campaignsMap.size === 0;
  }

  resetLoadStatus() {
    this.loadStatus = AsyncActionStatus.idle;
  }

  loadCampaigns(adAccount: AdAccount) {
    this.loadStatus = AsyncActionStatus.pending;
    this._campaignApi
      .getAdAccountCampaigns(adAccount)
      .then((campaigns) => {
        mobx.runInAction(() => {
          const campaignsMap = new Map();
          campaigns.forEach((campaign) => {
            campaignsMap.set(campaign.id, campaign);
          });
          this.campaignsMap = campaignsMap;
          this.loadStatus = AsyncActionStatus.success;
          this.loadError = null;
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.campaignsMap = new Map();
          this.loadStatus = AsyncActionStatus.error;
          this.loadError = e;
        });
      });
  }

  get(id: string | number | undefined | null): Campaign | undefined {
    return id != null ? this.campaignsMap.get('' + id) : undefined;
  }

  map<T>(mapper: (campaign: Campaign, campaignId: Campaign['id']) => T): T[] {
    const mapped: T[] = [];
    for (const campaign of this.campaignsMap.values()) {
      mapped.push(mapper(campaign, campaign.id));
    }
    return mapped;
  }

  filter(
    filter: (campaign: Campaign, campaignId: Campaign['id']) => boolean
  ): Campaign[] {
    const campaigns: Campaign[] = [];
    for (const campaign of this.campaignsMap.values()) {
      if (filter(campaign, campaign.id)) {
        campaigns.push(campaign);
      }
    }
    return campaigns;
  }
}
