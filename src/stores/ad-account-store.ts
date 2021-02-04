import * as mobx from 'mobx';
import { AsyncActionStatus } from '../types';
import { AdAccount, AdAccountApi } from './entities';

export class AdAccountStore {
  adAccountsMap: Map<AdAccount['id'], AdAccount> = new Map();
  loadStatus: AsyncActionStatus = AsyncActionStatus.idle;
  loadError: Error | null = null;

  constructor(private _adAccountApi: AdAccountApi) {
    mobx.makeAutoObservable(this);
  }

  get isEmpty(): boolean {
    return this.adAccountsMap.size === 0;
  }

  resetLoadStatus() {
    this.loadStatus = AsyncActionStatus.idle;
  }

  loadAdAccounts(userId: string) {
    this.loadStatus = AsyncActionStatus.pending;
    this._adAccountApi
      .getAdAccounts(userId)
      .then((fetchedAccounts) => {
        mobx.runInAction(() => {
          const adAccountsMap: AdAccountStore['adAccountsMap'] = new Map();
          fetchedAccounts.forEach((fetchedAccount) => {
            const adAccount = new AdAccount(fetchedAccount);
            adAccountsMap.set(adAccount.id, adAccount);
          });
          this.adAccountsMap = adAccountsMap;
          this.loadStatus = AsyncActionStatus.success;
          this.loadError = null;
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.adAccountsMap = new Map();
          this.loadStatus = AsyncActionStatus.error;
          this.loadError = e;
        });
      });
  }

  get(id: string | number | null | undefined): AdAccount | undefined {
    return id != null ? this.adAccountsMap.get('' + id) : undefined;
  }

  map<T>(
    mapper: (adAccount: AdAccount, adAccountId: AdAccount['id']) => T
  ): T[] {
    const mapped: T[] = [];
    for (const adAccount of this.adAccountsMap.values()) {
      mapped.push(mapper(adAccount, adAccount.id));
    }
    return mapped;
  }

  toArray(): AdAccount[] {
    return this.map((adAccount) => adAccount);
  }
}
