import { cache } from 'services/cache';
import { facebookApiConfig, facebookApi } from 'services/facebook-api';
import { UiStore } from './ui-store';
import { SessionStore } from './session-store';
import { UserStore } from './user-store';
import { AdAccountStore } from './ad-account-store';

export class RootStore {
  uiStore: UiStore;
  sessionStore: SessionStore;
  userStore: UserStore;
  adAccountStore: AdAccountStore;

  constructor() {
    this.uiStore = new UiStore(cache);
    this.userStore = new UserStore(cache);
    this.sessionStore = new SessionStore(
      cache,
      facebookApiConfig,
      facebookApi.user,
      this.userStore
    );
    this.adAccountStore = new AdAccountStore(facebookApi.adAccount);
  }
}
