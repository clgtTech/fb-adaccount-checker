import * as mobx from 'mobx';
import { AsyncActionStatus, Locale } from '../types';
import { DEFAULT_LOCALE } from '../constants';
import { User, UserApi } from './entities';
import { RootStore } from './root-store';

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
    private sessionCache: SessionCache,
    private apiConfig: ApiConfig,
    private userApi: UserApi,
    private stores: RootStore
  ) {
    mobx.makeAutoObservable(this, {
      addEventListener: false,
      removeEventListener: false,
    });
    mobx.runInAction(() => {
      this.locale = this.sessionCache.getLocale();
    });
    mobx.autorun(() => {
      const authUser = this.stores.userStore.get(this.authenticatedUserId);
      if (authUser) {
        this.apiConfig.setAccessToken(authUser.accessToken);
        this.apiConfig.setPageAccessTokens(authUser.pageAccessTokens);
      } else {
        this.apiConfig.setAccessToken('');
        this.apiConfig.setPageAccessTokens(new Map());
      }
    });
    mobx.autorun(() => {
      this.sessionCache.saveLocale(this.locale);
      this.apiConfig.setLocale(this.locale);
    });
  }

  get isAuthValid() {
    return Boolean(this.accessToken && this.authenticatedUserId);
  }

  get authUser(): User | undefined {
    return this.stores.userStore.get(this.authenticatedUserId);
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
    this.userApi
      .getUserRelatedToAccessToken(accessToken)
      .then((userDTO) => {
        mobx.runInAction(() => {
          const user = this.stores.userStore.addUser(userDTO);
          this.authenticatedUserId = user.id;
          this.authStatus = AsyncActionStatus.success;
          this.authError = null;
          this._eventListeners.authenticate.forEach((onAuthenticate) =>
            onAuthenticate(user)
          );
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

export interface SessionCache {
  saveLocale(locale: Locale): void;
  getLocale(): Locale;
}

export interface ApiConfig {
  setAccessToken(accessToken: string): void;
  setPageAccessTokens(pageAccessTokens: Map<string, string>): void;
  setLocale(locale: Locale): void;
}

export interface SessionEventListeners {
  authenticate(user: User): void;
  authReset(userId: string): void;
}
