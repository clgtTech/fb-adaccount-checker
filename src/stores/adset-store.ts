import * as mobx from 'mobx';
import { AsyncActionStatus } from '../types';
import { AdAccount } from './ad-account-store';

export interface AdsetApi {
  getAdAccountAdsets(adAccount: AdAccount, limit?: number): Promise<Adset[]>;
}

export class AdsetInsights {}

export class Adset {
  constructor(
    public readonly id: string,
    public readonly adAccountId: string,
    public readonly campaignId: string,
    public name: string
  ) {
    mobx.makeAutoObservable(this);
  }
}

export class AdsetStore {
  adsetsMap: Map<Adset['id'], Adset> = new Map();
  loadStatus: AsyncActionStatus = AsyncActionStatus.idle;
  loadError: Error | null = null;

  constructor(private _adsetApi: AdsetApi) {
    mobx.makeAutoObservable(this);
  }

  resetLoadStatus() {
    this.loadStatus = AsyncActionStatus.idle;
  }

  loadAdsets(adAccount: AdAccount) {
    this.loadStatus = AsyncActionStatus.pending;
    this._adsetApi
      .getAdAccountAdsets(adAccount)
      .then((adsets) => {
        mobx.runInAction(() => {
          const adsetsMap = new Map();
          adsets.forEach((adset) => {
            adsetsMap.set(adset.id, adset);
          });
          this.adsetsMap = adsetsMap;
          this.loadStatus = AsyncActionStatus.success;
          this.loadError = null;
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.adsetsMap = new Map();
          this.loadStatus = AsyncActionStatus.error;
          this.loadError = e;
        });
      });
  }

  get(id: string | number | undefined | null): Adset | undefined {
    return id != null ? this.adsetsMap.get('' + id) : undefined;
  }

  map<T>(mapper: (adset: Adset, adsetId: Adset['id']) => T): T[] {
    const mapped = [];
    for (const adset of this.adsetsMap.values()) {
      mapped.push(mapper(adset, adset.id));
    }
    return mapped;
  }

  filter(filter: (adset: Adset, adsetId: Adset['id']) => boolean): Adset[] {
    const adsets: Adset[] = [];
    for (const adset of this.adsetsMap.values()) {
      if (filter(adset, adset.id)) {
        adsets.push(adset);
      }
    }
    return adsets;
  }
}
