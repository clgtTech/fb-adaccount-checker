import * as mobx from 'mobx';
import { AsyncActionStatus } from '../types';
import { AdAccount, Ad, AdApi } from './entities';

export class AdStore {
  adsMap: Map<Ad['id'], Ad> = new Map();
  loadStatus: AsyncActionStatus = AsyncActionStatus.idle;
  loadError: Error | null = null;

  constructor(private adApi: AdApi) {
    mobx.makeAutoObservable(this);
  }

  resetLoadStatus() {
    this.loadStatus = AsyncActionStatus.idle;
  }

  loadAdsets(adAccount: AdAccount) {
    this.loadStatus = AsyncActionStatus.pending;
    this.adApi
      .getAdAccountAds(adAccount.id)
      .then((fetchedAds) => {
        mobx.runInAction(() => {
          const adsMap: AdStore['adsMap'] = new Map();
          fetchedAds.forEach((fetchedAd) => {
            const ad = new Ad(fetchedAd);
            adsMap.set(ad.id, ad);
          });
          this.adsMap = adsMap;
          this.loadStatus = AsyncActionStatus.success;
          this.loadError = null;
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.adsMap = new Map();
          this.loadStatus = AsyncActionStatus.error;
          this.loadError = e;
        });
      });
  }

  get(id: string | number | undefined | null): Ad | undefined {
    return id != null ? this.adsMap.get('' + id) : undefined;
  }

  map<T>(mapper: (ad: Ad, adId: Ad['id']) => T): T[] {
    const mapped = [];
    for (const ad of this.adsMap.values()) {
      mapped.push(mapper(ad, ad.id));
    }
    return mapped;
  }

  filter(filter: (ad: Ad, adId: Ad['id']) => boolean): Ad[] {
    const ads: Ad[] = [];
    for (const ad of this.adsMap.values()) {
      if (filter(ad, ad.id)) {
        ads.push(ad);
      }
    }
    return ads;
  }
}
