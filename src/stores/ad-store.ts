import * as mobx from 'mobx';
import { AsyncActionStatus } from '../types';
import { AdAccount } from './ad-account-store';

export interface AdApi {
  getAdAccountAds(adAccount: AdAccount, limit?: number): Promise<Ad[]>;
}

export class AdInsights {}

export class Ad {
  constructor(
    public readonly id: string,
    public readonly adAccountId: string,
    public readonly campaignId: string,
    public readonly adsetId: string,
    public name: string
  ) {
    mobx.makeAutoObservable(this);
  }
}

export class AdStore {
  adsMap: Map<Ad['id'], Ad> = new Map();
  loadStatus: AsyncActionStatus = AsyncActionStatus.idle;
  loadError: Error | null = null;

  constructor(private _adApi: AdApi) {
    mobx.makeAutoObservable(this);
  }

  resetLoadStatus() {
    this.loadStatus = AsyncActionStatus.idle;
  }

  loadAdsets(adAccount: AdAccount) {
    this.loadStatus = AsyncActionStatus.pending;
    this._adApi
      .getAdAccountAds(adAccount)
      .then((ads) => {
        mobx.runInAction(() => {
          const adsMap = new Map();
          ads.forEach((ad) => {
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
