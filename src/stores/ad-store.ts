import * as mobx from 'mobx';
import { AsyncStatus } from '../types';
import { AdAccount, Ad, AdApi } from './entities';

export class AdStore {
  adsMap: Map<Ad['id'], Ad> = new Map();
  loadStatus: AsyncStatus = AsyncStatus.idle;
  loadError: Error | null = null;

  constructor(private adApi: AdApi) {
    mobx.makeAutoObservable(this);
  }

  resetLoadStatus() {
    this.loadStatus = AsyncStatus.idle;
  }

  loadAdsets(adAccount: AdAccount) {
    this.loadStatus = AsyncStatus.pending;
    this.adApi
      .getAdAccountAds(adAccount.id)
      .then((fetchedAds) => {
        const adsMap = new Map(
          fetchedAds.map((fetchedAd) => {
            const ad = new Ad(fetchedAd, this.adApi);
            return [ad.id, ad];
          })
        );
        mobx.runInAction(() => {
          this.adsMap = adsMap;
          this.loadStatus = AsyncStatus.success;
          this.loadError = null;
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.adsMap = new Map();
          this.loadStatus = AsyncStatus.error;
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
