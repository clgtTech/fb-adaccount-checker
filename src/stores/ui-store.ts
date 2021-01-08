import * as mobx from 'mobx';

export interface UiCache {
  saveUiState(uiState: UiState): void;
  getUiState(): UiState;
}

export class UiState {
  constructor(
    public isSidebarShown = false,
    public isHeaderHaveShadow = false
  ) {
    mobx.makeAutoObservable(this);
  }
}

export class UiStore {
  state: UiState = new UiState();

  constructor(private _cache: UiCache) {
    mobx.makeAutoObservable(this);
    mobx.runInAction(() => {
      this.state = this._cache.getUiState();
    });
    mobx.autorun(() => {
      this._cache.saveUiState(this.state);
    });
  }

  toggleSidebarVisibility() {
    this.state.isSidebarShown = !this.state.isSidebarShown;
  }

  showHeaderShadow() {
    this.state.isHeaderHaveShadow = true;
  }

  hideHeaderShadow() {
    this.state.isHeaderHaveShadow = false;
  }
}
