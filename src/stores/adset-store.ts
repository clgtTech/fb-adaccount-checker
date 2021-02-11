import * as mobx from 'mobx';
import { AsyncActionStatus } from '../types';
import { AdAccount, Adset, AdsetApi } from './entities';

export class AdsetStore {
  adsetsMap: Map<Adset['id'], Adset> = new Map();
  loadStatus: AsyncActionStatus = AsyncActionStatus.idle;
  loadError: Error | null = null;

  constructor(private adsetApi: AdsetApi) {
    mobx.makeAutoObservable(this);
  }

  resetLoadStatus() {
    this.loadStatus = AsyncActionStatus.idle;
  }

  loadAdsets(adAccount: AdAccount) {
    this.loadStatus = AsyncActionStatus.pending;
    this.adsetApi
      .getAdAccountAdsets(adAccount.id)
      .then((fetchedAdsets) => {
        const adsetsMap = new Map(
          fetchedAdsets.map((fetchedAdset) => {
            const adset = new Adset(fetchedAdset, adAccount, this.adsetApi);
            return [adset.id, adset];
          })
        );
        mobx.runInAction(() => {
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
