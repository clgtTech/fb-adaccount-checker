import * as mobx from 'mobx';
import { AsyncActionStatus } from '../types';

export interface AdAccountApi {
  getAdAccounts(userId: string): Promise<AdAccount[]>;
}

export class AdAccount {
  public readonly id: string;
  public readonly accountId: string;
  public readonly name: string;
  public readonly status: number;
  public readonly disableReason: number;
  public readonly currency: string;
  public readonly spend: number;
  public readonly ctr: number;

  constructor(props: {
    id: string;
    accountId: string;
    name: string;
    status: number;
    disableReason: number;
    currency: string;
    spend?: string | number;
    ctr?: string | number;
  }) {
    this.id = props.id;
    this.accountId = props.accountId;
    this.name = props.name;
    this.status = props.status;
    this.disableReason = props.disableReason;
    this.currency = props.currency;
    this.spend = Number(props.spend) || 0;
    this.ctr = Number(props.ctr) || 0;
  }

  isAdRunningOrInReview() {
    return this.status === 1 || this.status === 8 || this.status === 9;
  }
}

export class AdAccountStore {
  adAccounts: AdAccount[] = [];
  loadStatus: AsyncActionStatus = AsyncActionStatus.idle;
  loadError: Error | null = null;

  constructor(private _adAccountApi: AdAccountApi) {
    mobx.makeAutoObservable(this);
  }

  resetLoadStatus() {
    this.loadStatus = AsyncActionStatus.idle;
  }

  loadAdAccounts(userId: string) {
    this.loadStatus = AsyncActionStatus.pending;
    this._adAccountApi
      .getAdAccounts(userId)
      .then((adAccounts) => {
        mobx.runInAction(() => {
          this.adAccounts = adAccounts;
          this.loadStatus = AsyncActionStatus.success;
          this.loadError = null;
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.adAccounts = [];
          this.loadStatus = AsyncActionStatus.error;
          this.loadError = e;
        });
      });
  }
}
