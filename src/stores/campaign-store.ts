import * as mobx from 'mobx';
import { AsyncActionStatus } from '../types';
import { AdAccount, Campaign, CampaignApi } from './entities';

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
      .getAdAccountCampaigns(adAccount.id)
      .then((fetchedCampaigns) => {
        mobx.runInAction(() => {
          const campaignsMap: CampaignStore['campaignsMap'] = new Map();
          fetchedCampaigns.forEach((fetchedCampaign) => {
            const campaign = new Campaign(fetchedCampaign, adAccount);
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
