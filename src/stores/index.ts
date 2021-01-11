import { RootStore } from './root-store';

export const rootStore = new RootStore();
export const stores = rootStore;
export const { uiStore, sessionStore, userStore } = rootStore;
