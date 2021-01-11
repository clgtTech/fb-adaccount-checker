import * as mobx from 'mobx';
import { AsyncActionStatus, Locale } from '../types';
import { DEFAULT_LOCALE } from '../constants';
import { UserApi, UserStore } from './user-store';

export interface SessionCache {
  saveLocale(locale: Locale): void;
  getLocale(): Locale;
}

export interface ApiConfig {
  setAccessToken(accessToken: string): void;
  setLocale(locale: Locale): void;
}

export class SessionStore {
  accessToken: string = '';
  authenticatedUserId: string = '';
  authStatus: AsyncActionStatus = AsyncActionStatus.idle;
  authError: Error | null = null;
  locale: Locale = DEFAULT_LOCALE;

  constructor(
    private _cache: SessionCache,
    private _apiConfig: ApiConfig,
    private _userApi: UserApi,
    private _userStore: UserStore
  ) {
    mobx.makeAutoObservable(this);
    mobx.runInAction(() => {
      this.locale = this._cache.getLocale();
    });
    mobx.autorun(() => {
      this._apiConfig.setAccessToken(this.accessToken);
    });
    mobx.autorun(() => {
      this._cache.saveLocale(this.locale);
      this._apiConfig.setLocale(this.locale);
    });
  }

  get isAuthValid() {
    return Boolean(this.accessToken && this.authenticatedUserId);
  }

  setAccessToken(accessToken: string) {
    if (!accessToken) {
      this.resetAuth();
    } else {
      this.authenticate(accessToken);
    }
  }

  resetAuth() {
    this.accessToken = '';
    this.authenticatedUserId = '';
    this.authStatus = AsyncActionStatus.idle;
    this.authError = null;
  }

  authenticate(accessToken: string) {
    this.accessToken = accessToken;
    this.authStatus = AsyncActionStatus.pending;
    this._userApi
      .getUserRelatedToAccessToken(accessToken)
      .then((user) => {
        mobx.runInAction(() => {
          this._userStore.addUser(user);
          this.authenticatedUserId = user.id;
          this.authStatus = AsyncActionStatus.success;
          this.authError = null;
        });
      })
      .catch((e) => {
        mobx.runInAction(() => {
          this.authenticatedUserId = '';
          this.authStatus = AsyncActionStatus.error;
          this.authError = e;
        });
      });
  }

  setLocale(locale: Locale) {
    this.locale = locale;
  }
}
