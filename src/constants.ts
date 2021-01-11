import { Locale } from 'types';

export const DEFAULT_LOCALE = Locale.enUS;

export const LOCAL_STORAGE_KEYS = {
  uiState: 'fbDash.uiState',
  users: 'fbDash.users',
  locale: 'fbDash.locale',
};

export const FLASH_MESSAGE_DISMISS_TIMEOUT = 15 * 1000; // 15 seconds
