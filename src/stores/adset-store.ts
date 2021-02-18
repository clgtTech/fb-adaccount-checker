import * as mobx from 'mobx';
import { AsyncStatus } from '../types';
import { AdAccount, Adset, AdsetApi, Campaign } from './entities';

export class AdsetStore {
  adsets: Map<Adset['id'], Adset> = new Map();
  campaignAdsets: Map<Campaign['id'], Adset['id'][]> = new Map();
  loadStatusOfCampaignAdsets: Map<Campaign['id'], AsyncStatus> = new Map();
  loadErrorOfCampaignAdsets: Map<Campaign['id'], Error | null> = new Map();

  constructor(private adsetApi: AdsetApi) {
    mobx.makeAutoObservable(this);
  }

  clear(): void {
    this.adsets.clear();
    this.campaignAdsets.clear();
    this.loadErrorOfCampaignAdsets.clear();
    this.loadStatusOfCampaignAdsets.clear();
  }

  getAdset(id: string | number | undefined | null): Adset | undefined {
    return id != null ? this.adsets.get('' + id) : undefined;
  }

  getCampaignAdsets(campaign: Campaign): Adset[] {
    const adsetIds = this.campaignAdsets.get(campaign.id) ?? [];
    const adsets = [];
    for (const id of adsetIds) {
      const adset = this.adsets.get(id);
      if (adset) {
        adsets.push(adset);
      }
    }
    return adsets;
  }

  getLoadStatusOfCampaignAdsets(campaign: Campaign): AsyncStatus {
    return this.loadStatusOfCampaignAdsets.get(campaign.id) ?? AsyncStatus.idle;
  }

  getLoadErrorOfCampaignAdsets(campaign: Campaign): Error | null {
    return this.loadErrorOfCampaignAdsets.get(campaign.id) ?? null;
  }

  shouldLoadCampaignAdsets(campaign: Campaign): boolean {
    const loadStatus = this.getLoadStatusOfCampaignAdsets(campaign);
    return loadStatus === AsyncStatus.idle || loadStatus === AsyncStatus.error;
  }

  loadCampaignAdsets(adAccount: AdAccount, campaign: Campaign): void {
    this.loadStatusOfCampaignAdsets.set(campaign.id, AsyncStatus.pending);
    this.adsetApi
      .getCampaignAdsets(campaign.id)
      .then((fetchedAdsets) => {
        const adsets = new Map();
        const adsetIds: Adset['id'][] = [];
        for (const fetchedAdset of fetchedAdsets) {
          const adset = new Adset(fetchedAdset, adAccount, this.adsetApi);
          adsets.set(adset.id, adset);
          adsetIds.push(adset.id);
        }
        mobx.runInAction(() => {
          this.adsets = new Map([...this.adsets, ...adsets]);
          this.campaignAdsets.set(campaign.id, adsetIds);
          this.loadErrorOfCampaignAdsets.delete(campaign.id);
          this.loadStatusOfCampaignAdsets.set(campaign.id, AsyncStatus.success);
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.loadErrorOfCampaignAdsets.set(campaign.id, e);
          this.loadStatusOfCampaignAdsets.set(campaign.id, AsyncStatus.error);
        });
      });
  }
}
