import * as mobx from 'mobx';
import { AsyncStatus } from '../types';
import { AdAccount, Campaign, CampaignApi } from './entities';

export class CampaignStore {
  campaignsMap: Map<Campaign['id'], Campaign> = new Map();
  loadStatus: AsyncStatus = AsyncStatus.idle;
  loadError: Error | null = null;

  constructor(private campaignApi: CampaignApi) {
    mobx.makeAutoObservable(this);
  }

  get isEmpty() {
    return this.campaignsMap.size === 0;
  }

  resetLoadStatus() {
    this.loadStatus = AsyncStatus.idle;
  }

  loadCampaigns(adAccount: AdAccount) {
    this.loadStatus = AsyncStatus.pending;
    this.campaignApi
      .getAdAccountCampaigns(adAccount.id)
      .then((fetchedCampaigns) => {
        const campaignsMap = new Map(
          fetchedCampaigns.map((fetchedCampaign) => {
            const campaign = new Campaign(
              fetchedCampaign,
              adAccount,
              this.campaignApi
            );
            return [campaign.id, campaign];
          })
        );
        mobx.runInAction(() => {
          this.campaignsMap = campaignsMap;
          this.loadStatus = AsyncStatus.success;
          this.loadError = null;
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.campaignsMap = new Map();
          this.loadStatus = AsyncStatus.error;
          this.loadError = e;
        });
      });
  }

  get(campaignId: string | number | undefined | null): Campaign | undefined {
    return campaignId != null
      ? this.campaignsMap.get('' + campaignId)
      : undefined;
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
