import * as mobx from 'mobx';
import { AsyncStatus } from '../types';
import { AdAccount, Campaign, CampaignApi } from './entities';

export class CampaignStore {
  campaigns: Map<Campaign['id'], Campaign> = new Map();
  adAccountCampaigns: Map<AdAccount['id'], Campaign['id'][]> = new Map();
  loadStatusOfAdAccountCampaigns: Map<AdAccount['id'], AsyncStatus> = new Map();
  loadErrorOfAdAccountCampaigns: Map<AdAccount['id'], Error | null> = new Map();

  constructor(private campaignApi: CampaignApi) {
    mobx.makeAutoObservable(this);
  }

  clear(): void {
    this.campaigns.clear();
    this.adAccountCampaigns.clear();
    this.loadErrorOfAdAccountCampaigns.clear();
    this.loadStatusOfAdAccountCampaigns.clear();
  }

  getCampaign(id: string | number | undefined | null): Campaign | undefined {
    return id != null ? this.campaigns.get('' + id) : undefined;
  }

  getAdAccountCampaigns(adAccount: AdAccount): Campaign[] {
    const campaignIds = this.adAccountCampaigns.get(adAccount.id) ?? [];
    const campaigns = [];
    for (const id of campaignIds) {
      const campaign = this.campaigns.get(id);
      if (campaign) {
        campaigns.push(campaign);
      }
    }
    return campaigns;
  }

  getLoadStatusOfAdAccountCampaigns(adAccount: AdAccount): AsyncStatus {
    return (
      this.loadStatusOfAdAccountCampaigns.get(adAccount.id) ?? AsyncStatus.idle
    );
  }

  getLoadErrorOfAdAccountCampaigns(adAccount: AdAccount): Error | null {
    return this.loadErrorOfAdAccountCampaigns.get(adAccount.id) ?? null;
  }

  shouldLoadAdAccountCampaigns(adAccount: AdAccount): boolean {
    const loadStatus = this.getLoadStatusOfAdAccountCampaigns(adAccount);
    return loadStatus === AsyncStatus.idle || loadStatus === AsyncStatus.error;
  }

  loadAdAccountCampaigns(adAccount: AdAccount): void {
    this.loadStatusOfAdAccountCampaigns.set(adAccount.id, AsyncStatus.pending);
    this.campaignApi
      .getAdAccountCampaigns(adAccount.id)
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
          this.adAccountCampaigns.set(adAccount.id, campaignIds);
          this.loadErrorOfAdAccountCampaigns.delete(adAccount.id);
          this.loadStatusOfAdAccountCampaigns.set(
            adAccount.id,
            AsyncStatus.success
          );
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.loadErrorOfAdAccountCampaigns.set(adAccount.id, e);
          this.loadStatusOfAdAccountCampaigns.set(
            adAccount.id,
            AsyncStatus.error
          );
        });
      });
  }
}
