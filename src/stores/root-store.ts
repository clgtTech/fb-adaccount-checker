import { cache } from 'services/cache';
import { facebookApiConfig, facebookApi } from 'services/facebook-api';
import { UiStore } from './ui-store';
import { SessionStore } from './session-store';
import { UserStore } from './user-store';
import { UserGroupsStore } from './user-group-store';
import { AdAccountStore } from './ad-account-store';
import { CampaignStore } from './campaign-store';
import { AdsetStore } from './adset-store';
import { AdStore } from './ad-store';
import { CommentStore } from './comment-store';

export class RootStore {
  uiStore: UiStore;
  sessionStore: SessionStore;
  userStore: UserStore;
  userGroupStore: UserGroupsStore;
  adAccountStore: AdAccountStore;
  campaignStore: CampaignStore;
  adsetStore: AdsetStore;
  adStore: AdStore;
  commentStore: CommentStore;

  constructor() {
    this.uiStore = new UiStore(cache);
    this.userStore = new UserStore(cache, this);
    this.userGroupStore = new UserGroupsStore(cache, this);
    this.sessionStore = new SessionStore(
      cache,
      facebookApiConfig,
      facebookApi.user,
      this
    );
    this.adAccountStore = new AdAccountStore(facebookApi.adAccount);
    this.campaignStore = new CampaignStore(facebookApi.campaign, this);
    this.adsetStore = new AdsetStore(facebookApi.adset, this);
    this.adStore = new AdStore(facebookApi.ad, this);
    this.commentStore = new CommentStore(facebookApi.comment);
  }
}
