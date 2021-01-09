import * as mobx from 'mobx';
import { AsyncActionStatus, Locale } from '../types';
import { DEFAULT_LOCALE } from '../constants';
import { UserApi, UserStore } from './user-store';

export interface SessionCache {
  saveLocale(locale: Locale): void;
  getLocale(): Locale;
}

export class SessionStore {
  accessToken: string = '';
  authenticatedUserId: string = '';
  authStatus: AsyncActionStatus = AsyncActionStatus.idle;
  authError: Error | null = null;
  locale: Locale = DEFAULT_LOCALE;

  constructor(
    private _cache: SessionCache,
    private _userStore: UserStore,
    private _userApi: UserApi
  ) {
    mobx.makeAutoObservable(this);
    mobx.runInAction(() => {
      this.locale = this._cache.getLocale();
    });
    mobx.autorun(() => {
      this._cache.saveLocale(this.locale);
    });
  }

  get authenticatedUser() {
    return this._userStore.getUserById(this.authenticatedUserId);
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
