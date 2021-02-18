import * as mobx from 'mobx';
import { AsyncStatus } from '../types';
import { Ad, AdApi, Adset } from './entities';

export class AdStore {
  ads: Map<Ad['id'], Ad> = new Map();
  adsetAds: Map<Adset['id'], Ad['id'][]> = new Map();
  loadStatusOfAdsetAds: Map<Adset['id'], AsyncStatus> = new Map();
  loadErrorOfAdsetAds: Map<Adset['id'], Error | null> = new Map();

  constructor(private adApi: AdApi) {
    mobx.makeAutoObservable(this);
  }

  clear() {
    this.ads.clear();
    this.adsetAds.clear();
    this.loadErrorOfAdsetAds.clear();
    this.loadErrorOfAdsetAds.clear();
  }

  getAd(id: string | number | undefined | null): Ad | undefined {
    return id != null ? this.ads.get('' + id) : undefined;
  }

  getAdsetAds(adset: Adset): Ad[] {
    const adIds = this.adsetAds.get(adset.id) ?? [];
    const ads: Ad[] = [];
    for (const id of adIds) {
      const ad = this.ads.get(id);
      if (ad) {
        ads.push(ad);
      }
    }
    return ads;
  }

  getLoadStatusOfAdsetAds(adset: Adset): AsyncStatus {
    return this.loadStatusOfAdsetAds.get(adset.id) ?? AsyncStatus.idle;
  }

  getLoadErrorOfAdsetAds(adset: Adset): Error | null {
    return this.loadErrorOfAdsetAds.get(adset.id) ?? null;
  }

  shouldLoadAdsetAds(adset: Adset): boolean {
    const loadStatus = this.getLoadStatusOfAdsetAds(adset);
    return loadStatus === AsyncStatus.idle || loadStatus === AsyncStatus.error;
  }

  loadAdsetAds(adset: Adset): void {
    this.loadStatusOfAdsetAds.set(adset.id, AsyncStatus.pending);
    this.adApi
      .getAdsetAds(adset.id)
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
          this.adsetAds.set(adset.id, adIds);
          this.loadErrorOfAdsetAds.delete(adset.id);
          this.loadStatusOfAdsetAds.set(adset.id, AsyncStatus.success);
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.loadErrorOfAdsetAds.set(adset.id, e);
          this.loadStatusOfAdsetAds.set(adset.id, AsyncStatus.error);
        });
      });
  }
}
