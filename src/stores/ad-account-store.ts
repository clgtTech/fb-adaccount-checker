import * as mobx from 'mobx';
import { AsyncStatus } from '../types';
import { AdAccount, AdAccountApi } from './entities';

export class AdAccountStore {
  adAccountsMap: Map<AdAccount['id'], AdAccount> = new Map();
  loadStatus: AsyncStatus = AsyncStatus.idle;
  loadError: Error | null = null;

  constructor(private adAccountApi: AdAccountApi) {
    mobx.makeAutoObservable(this);
  }

  get isEmpty(): boolean {
    return this.adAccountsMap.size === 0;
  }

  resetLoadStatus() {
    this.loadStatus = AsyncStatus.idle;
  }

  loadAdAccounts(userId: string) {
    this.loadStatus = AsyncStatus.pending;
    this.adAccountApi
      .getAdAccounts(userId)
      .then((fetchedAccounts) => {
        mobx.runInAction(() => {
          const adAccountsMap: AdAccountStore['adAccountsMap'] = new Map();
          fetchedAccounts.forEach((fetchedAccount) => {
            const adAccount = new AdAccount(fetchedAccount);
            adAccountsMap.set(adAccount.id, adAccount);
          });
          this.adAccountsMap = adAccountsMap;
          this.loadStatus = AsyncStatus.success;
          this.loadError = null;
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.adAccountsMap = new Map();
          this.loadStatus = AsyncStatus.error;
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
