import * as mobx from 'mobx';
import { uniqueId } from 'draft-components';
import { FLASH_MESSAGE_DISMISS_TIMEOUT } from '../constants';

export interface UiCache {
  saveUiState(uiState: UiState): void;
  getUiState(): UiState;
}

export class UiState {
  constructor(public isSidebarShown = false) {
    mobx.makeAutoObservable(this);
  }
}

export class FlashMessage {
  readonly id: string;

  constructor(
    public message: string,
    public title?: string,
    public type?: 'error' | 'warning' | 'info' | 'success'
  ) {
    this.id = uniqueId('flash-message-');
  }
}

export class UiStore {
  state: UiState = new UiState();
  flashMessage: FlashMessage | null = null;
  flashMessageTimeoutId: number = -1;

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

  showFlashMessage(
    flashMessageParams: Omit<FlashMessage, 'id'>,
    options?: FlashMessageDisplayOpts
  ) {
    window.clearTimeout(this.flashMessageTimeoutId);

    this.flashMessage = new FlashMessage(
      flashMessageParams.message,
      flashMessageParams.title,
      flashMessageParams.type
    );

    if (options?.shouldHideAutomatically ?? true) {
      this.flashMessageTimeoutId = window.setTimeout(() => {
        this.hideFlashMessage();
      }, options?.timeout ?? FLASH_MESSAGE_DISMISS_TIMEOUT);
    }
  }

  hideFlashMessage() {
    this.flashMessage = null;
  }
}

export interface FlashMessageDisplayOpts {
  shouldHideAutomatically?: boolean;
  timeout?: number;
}
