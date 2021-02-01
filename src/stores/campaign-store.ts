import * as mobx from 'mobx';

export interface CampaignApi {
  getAdAccountCampaigns(
    adAccount: AdAccount,
    limit?: number
  ): Promise<Campaign[]>;
}
export class Campaign {
  constructor(
    public readonly id: string,
    public readonly adAccountId: string,
    public name: string,
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
