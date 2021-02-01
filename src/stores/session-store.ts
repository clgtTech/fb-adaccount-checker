import * as mobx from 'mobx';
import { AsyncActionStatus, Locale } from '../types';
import { DEFAULT_LOCALE } from '../constants';
import { RootStore } from './root-store';
import { User, UserApi } from './user-store';

export interface SessionCache {
  saveLocale(locale: Locale): void;
  getLocale(): Locale;
}

export interface ApiConfig {
  setAccessToken(accessToken: string): void;
  setLocale(locale: Locale): void;
}

export interface SessionEventListeners {
  authenticate(user: User): void;
  authReset(userId: User['id']): void;
}

export class SessionStore {
  private _eventListeners: {
    [K in keyof SessionEventListeners]: SessionEventListeners[K][];
  } = { authenticate: [], authReset: [] };

  accessToken: string = '';
  authenticatedUserId: string = '';
  authStatus: AsyncActionStatus = AsyncActionStatus.idle;
  authError: Error | null = null;
  locale: Locale = DEFAULT_LOCALE;

  constructor(
    private _cache: SessionCache,
    private _apiConfig: ApiConfig,
    private _userApi: UserApi,
    private _stores: RootStore
  ) {
    mobx.makeAutoObservable(this, {
      addEventListener: false,
      removeEventListener: false,
    });
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

  addEventListener<T extends keyof SessionEventListeners>(
    event: T,
    listener: SessionEventListeners[T]
  ): void {
    this._eventListeners[event].push(listener as any);
  }

  removeEventListener<T extends keyof SessionEventListeners>(
    event: T,
    listener: SessionEventListeners[T]
  ): void {
    const index = this._eventListeners[event].findIndex(
      (cb: any) => cb === listener
    );
    if (~index) {
      this._eventListeners[event].splice(index, 1);
    }
  }

  resetAuth() {
    debugger;
    const authUserId = this.authenticatedUserId;

    this.accessToken = '';
    this.authenticatedUserId = '';
    this.authStatus = AsyncActionStatus.idle;
    this.authError = null;

    this._eventListeners.authReset.forEach((listener) => listener(authUserId));
  }

  authenticate(accessToken: string) {
    this.accessToken = accessToken;
    this.authStatus = AsyncActionStatus.pending;
    this._userApi
      .getUserRelatedToAccessToken(accessToken)
      .then((user) => {
        mobx.runInAction(() => {
          this._stores.userStore.addUser(user);
          this.authenticatedUserId = user.id;
          this.authStatus = AsyncActionStatus.success;
          this.authError = null;
        });

        this._eventListeners.authenticate.forEach((listener) => listener(user));
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
