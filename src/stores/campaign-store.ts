import * as mobx from 'mobx';
import { AsyncStatus, DatePreset } from '../types';
import { AdAccount, Campaign, CampaignApi } from './entities';
import { RootStore } from './root-store';

export class CampaignStore {
  campaigns: Map<Campaign['id'], Campaign> = new Map();
  accountCampaignIds: Map<AdAccount['id'], Campaign['id'][]> = new Map();
  accountCampaignsLoadStatus: Map<AdAccount['id'], AsyncStatus> = new Map();
  accountCampaignsLoadError: Map<AdAccount['id'], Error | null> = new Map();
  campaignsInsightsLoadStatus: Map<AdAccount['id'], AsyncStatus> = new Map();
  campaignsInsightsLoadError: Map<AdAccount['id'], Error | null> = new Map();

  constructor(private campaignApi: CampaignApi, private stores: RootStore) {
    mobx.makeAutoObservable(this);
  }

  clear(): void {
    this.campaigns.clear();
    this.accountCampaignIds.clear();
    this.accountCampaignsLoadStatus.clear();
    this.accountCampaignsLoadError.clear();
    this.campaignsInsightsLoadStatus.clear();
    this.campaignsInsightsLoadError.clear();
  }

  getById(id: string | number): Campaign | undefined {
    return this.campaigns.get('' + id);
  }

  getCampaigns(adAccount: AdAccount): Campaign[] {
    const ids = this.accountCampaignIds.get(adAccount.id) ?? [];
    const campaigns = [];
    for (const id of ids) {
      const campaign = this.campaigns.get(id);
      if (campaign) {
        campaigns.push(campaign);
      }
    }
    return campaigns;
  }

  getCampaignsLoadStatus(adAccount: AdAccount): AsyncStatus {
    return (
      this.accountCampaignsLoadStatus.get(adAccount.id) ?? AsyncStatus.idle
    );
  }

  getCampaignsLoadError(adAccount: AdAccount): Error | null {
    return this.accountCampaignsLoadError.get(adAccount.id) ?? null;
  }

  getCampaignsInsightsLoadStatus(adAccount: AdAccount): AsyncStatus {
    return (
      this.campaignsInsightsLoadStatus.get(adAccount.id) ?? AsyncStatus.idle
    );
  }

  getCampaignsInsightsLoadError(adAccount: AdAccount): Error | null {
    return this.campaignsInsightsLoadError.get(adAccount.id) ?? null;
  }

  canStartLoading(adAccount: AdAccount): boolean {
    const loadStatus = this.getCampaignsLoadStatus(adAccount);
    return loadStatus === AsyncStatus.idle || loadStatus === AsyncStatus.error;
  }

  loadCampaigns(adAccount: AdAccount): void {
    this.accountCampaignsLoadStatus.set(adAccount.id, AsyncStatus.pending);
    this.campaignApi
      .getAdAccountCampaigns(adAccount.id, {
        insightsDatePreset: this.stores.sessionStore.insightsDatePreset,
      })
      .then((fetchedCampaigns) => {
        const campaigns = new Map();
        const campaignIds: Campaign['id'][] = [];
        for (const fetchedCampaign of fetchedCampaigns) {
          const campaign = new Campaign(
            fetchedCampaign,
            adAccount,
            this.campaignApi
          );
          campaigns.set(campaign.id, campaign);
          campaignIds.push(campaign.id);
        }
        mobx.runInAction(() => {
          this.campaigns = new Map([...this.campaigns, ...campaigns]);
          this.accountCampaignIds.set(adAccount.id, campaignIds);
          this.accountCampaignsLoadError.delete(adAccount.id);
          this.accountCampaignsLoadStatus.set(
            adAccount.id,
            AsyncStatus.success
          );
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.accountCampaignsLoadError.set(adAccount.id, e);
          this.accountCampaignsLoadStatus.set(adAccount.id, AsyncStatus.error);
        });
      });
  }

  updateCampaignsInsights(adAccount: AdAccount, datePreset: DatePreset): void {
    const campaigns = this.getCampaigns(adAccount);
    if (!campaigns.length) {
      return;
    }

    this.campaignsInsightsLoadStatus.set(adAccount.id, AsyncStatus.pending);
    this.campaignApi
      .getAdAccountCampaignsInsights(adAccount.id, { datePreset })
      .then((fetchedInsights) => {
        for (const campaign of campaigns) {
          campaign.setInsights(fetchedInsights.get(campaign.id));
        }
        mobx.runInAction(() => {
          this.campaignsInsightsLoadError.delete(adAccount.id);
          this.campaignsInsightsLoadStatus.set(
            adAccount.id,
            AsyncStatus.success
          );
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.campaignsInsightsLoadError.set(adAccount.id, e);
          this.campaignsInsightsLoadStatus.set(adAccount.id, AsyncStatus.error);
        });
      });
  }
}
