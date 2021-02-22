import * as mobx from 'mobx';
import { AsyncStatus, DatePreset } from '../types';
import { AdAccount, Adset, AdsetApi } from './entities';
import { RootStore } from './root-store';

export class AdsetStore {
  adsets: Map<Adset['id'], Adset> = new Map();
  accountAdsetIds: Map<AdAccount['id'], Adset['id'][]> = new Map();
  accountAdsetsLoadStatus: Map<AdAccount['id'], AsyncStatus> = new Map();
  accountAdsetsLoadError: Map<AdAccount['id'], Error | null> = new Map();
  adsetsInsightsLoadStatus: Map<AdAccount['id'], AsyncStatus> = new Map();
  adsetsInsightsLoadError: Map<AdAccount['id'], Error | null> = new Map();

  constructor(private adsetApi: AdsetApi, private stores: RootStore) {
    mobx.makeAutoObservable(this);
  }

  clear(): void {
    this.adsets.clear();
    this.accountAdsetIds.clear();
    this.accountAdsetsLoadStatus.clear();
    this.accountAdsetsLoadError.clear();
    this.adsetsInsightsLoadStatus.clear();
    this.adsetsInsightsLoadError.clear();
  }

  getById(id: string | number): Adset | undefined {
    return this.adsets.get('' + id);
  }

  getAdsets(adAccount: AdAccount, params?: { campaignId?: string }): Adset[] {
    const ids = this.accountAdsetIds.get(adAccount.id) ?? [];
    const campaignId = params?.campaignId;
    const adsets = [];
    for (const id of ids) {
      const adset = this.adsets.get(id);
      if (adset && !(campaignId && adset.campaignId !== campaignId)) {
        adsets.push(adset);
      }
    }
    return adsets;
  }

  getAdsetsLoadStatus(adAccount: AdAccount): AsyncStatus {
    return this.accountAdsetsLoadStatus.get(adAccount.id) ?? AsyncStatus.idle;
  }

  getAdsetsLoadError(adAccount: AdAccount): Error | null {
    return this.accountAdsetsLoadError.get(adAccount.id) ?? null;
  }

  getAdsetsInsightsLoadStatus(adAccount: AdAccount): AsyncStatus {
    return this.adsetsInsightsLoadStatus.get(adAccount.id) ?? AsyncStatus.idle;
  }

  getAdsetsInsightsLoadError(adAccount: AdAccount): Error | null {
    return this.adsetsInsightsLoadError.get(adAccount.id) ?? null;
  }

  canStartLoading(adAccount: AdAccount): boolean {
    const loadStatus = this.getAdsetsLoadStatus(adAccount);
    return loadStatus === AsyncStatus.idle || loadStatus === AsyncStatus.error;
  }

  loadAdsets(adAccount: AdAccount): void {
    this.accountAdsetsLoadStatus.set(adAccount.id, AsyncStatus.pending);
    this.adsetApi
      .getAdAccountAdsets(adAccount.id, {
        insightsDatePreset: this.stores.sessionStore.insightsDatePreset,
      })
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
          this.accountAdsetIds.set(adAccount.id, adsetIds);
          this.accountAdsetsLoadError.delete(adAccount.id);
          this.accountAdsetsLoadStatus.set(adAccount.id, AsyncStatus.success);
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.accountAdsetsLoadError.set(adAccount.id, e);
          this.accountAdsetsLoadStatus.set(adAccount.id, AsyncStatus.error);
        });
      });
  }

  updateAdsetsInsights(adAccount: AdAccount, datePreset: DatePreset) {
    const adsets = this.getAdsets(adAccount);
    if (!adsets.length) {
      return;
    }

    this.adsetsInsightsLoadStatus.set(adAccount.id, AsyncStatus.pending);
    this.adsetApi
      .getAdAccountAdsetsInsights(adAccount.id, { datePreset })
      .then((fetchedInsights) => {
        for (const adset of adsets) {
          adset.setInsights(fetchedInsights.get(adset.id));
        }
        mobx.runInAction(() => {
          this.adsetsInsightsLoadError.delete(adAccount.id);
          this.adsetsInsightsLoadStatus.set(adAccount.id, AsyncStatus.success);
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.adsetsInsightsLoadError.set(adAccount.id, e);
          this.adsetsInsightsLoadStatus.set(adAccount.id, AsyncStatus.error);
        });
      });
  }
}
