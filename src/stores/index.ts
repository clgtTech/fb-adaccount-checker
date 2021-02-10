import { RootStore } from './root-store';

export * as Entities from './entities';
export const rootStore = new RootStore();
export const {
  uiStore,
  sessionStore,
  userStore,
  adAccountStore,
  campaignStore,
  adsetStore,
  adStore,
  commentStore,
} = rootStore;
