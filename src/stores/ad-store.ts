import * as mobx from 'mobx';
import { AsyncStatus, DatePreset } from '../types';
import { Ad, AdAccount, AdApi } from './entities';
import { RootStore } from './root-store';

export class AdStore {
  ads: Map<Ad['id'], Ad> = new Map();
  accountAdIds: Map<AdAccount['id'], Ad['id'][]> = new Map();
  accountAdsLoadStatus: Map<AdAccount['id'], AsyncStatus> = new Map();
  accountAdsLoadError: Map<AdAccount['id'], Error | null> = new Map();
  adsInsightsLoadStatus: Map<AdAccount['id'], AsyncStatus> = new Map();
  adsInsightsLoadError: Map<AdAccount['id'], Error | null> = new Map();

  constructor(private adApi: AdApi, private stores: RootStore) {
    mobx.makeAutoObservable(this);
  }

  clear() {
    this.ads.clear();
    this.accountAdIds.clear();
    this.accountAdsLoadStatus.clear();
    this.accountAdsLoadError.clear();
    this.adsInsightsLoadStatus.clear();
    this.adsInsightsLoadError.clear();
  }

  getById(id: string | number | undefined | null): Ad | undefined {
    return id != null ? this.ads.get('' + id) : undefined;
  }

  getAds(
    adAccount: AdAccount,
    params?: { campaignId?: string; adsetId?: string }
  ): Ad[] {
    const ids = this.accountAdIds.get(adAccount.id) ?? [];
    const campaignId = params?.campaignId;
    const adsetId = params?.adsetId;
    const ads: Ad[] = [];
    for (const id of ids) {
      const ad = this.ads.get(id);
      if (
        ad &&
        !(
          (campaignId && campaignId !== ad.campaignId) ||
          (adsetId && adsetId !== ad.adsetId)
        )
      ) {
        ads.push(ad);
      }
    }
    return ads;
  }

  getAdsLoadStatus(adAccount: AdAccount): AsyncStatus {
    return this.accountAdsLoadStatus.get(adAccount.id) ?? AsyncStatus.idle;
  }

  getAdsLoadError(adAccount: AdAccount): Error | null {
    return this.accountAdsLoadError.get(adAccount.id) ?? null;
  }

  getAdsInsightsLoadStatus(adAccount: AdAccount): AsyncStatus {
    return this.adsInsightsLoadStatus.get(adAccount.id) ?? AsyncStatus.idle;
  }

  getAdsInsightsLoadError(adAccount: AdAccount): Error | null {
    return this.adsInsightsLoadError.get(adAccount.id) ?? null;
  }

  canStartLoading(adAccount: AdAccount): boolean {
    const loadStatus = this.getAdsLoadStatus(adAccount);
    return loadStatus === AsyncStatus.idle || loadStatus === AsyncStatus.error;
  }

  loadAds(adAccount: AdAccount): void {
    this.accountAdsLoadStatus.set(adAccount.id, AsyncStatus.pending);
    this.adApi
      .getAdAccountAds(adAccount.id, {
        insightsDatePreset: this.stores.sessionStore.insightsDatePreset,
      })
      .then((fetchedAds) => {
        const ads = new Map();
        const adIds: Ad['id'][] = [];
        for (const fetchedAd of fetchedAds) {
          const ad = new Ad(fetchedAd, this.adApi);
          ads.set(ad.id, ad);
          adIds.push(ad.id);
        }
        mobx.runInAction(() => {
          this.ads = new Map([...this.ads, ...ads]);
          this.accountAdIds.set(adAccount.id, adIds);
          this.accountAdsLoadError.delete(adAccount.id);
          this.accountAdsLoadStatus.set(adAccount.id, AsyncStatus.success);
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.accountAdsLoadError.set(adAccount.id, e);
          this.accountAdsLoadStatus.set(adAccount.id, AsyncStatus.error);
        });
      });
  }

  updateAdsInsights(adAccount: AdAccount, datePreset: DatePreset) {
    const ads = this.getAds(adAccount);
    if (!ads.length) {
      return;
    }

    this.adsInsightsLoadStatus.set(adAccount.id, AsyncStatus.pending);
    this.adApi
      .getAdAccountAdsInsights(adAccount.id, { datePreset })
      .then((fetchedInsights) => {
        for (const ad of ads) {
          ad.setInsights(fetchedInsights.get(ad.id));
        }
        mobx.runInAction(() => {
          this.adsInsightsLoadError.delete(adAccount.id);
          this.adsInsightsLoadStatus.set(adAccount.id, AsyncStatus.success);
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.adsInsightsLoadError.set(adAccount.id, e);
          this.adsInsightsLoadStatus.set(adAccount.id, AsyncStatus.error);
        });
      });
  }
}
