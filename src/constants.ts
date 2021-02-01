import { Locale } from 'types';

export const DEFAULT_LOCALE = Locale.enUS;

export const LOCAL_STORAGE_KEYS = {
  uiState: 'fbDash.uiState',
  users: 'fbDash.users',
  locale: 'fbDash.locale',
};

export const FLASH_MESSAGE_DISMISS_TIMEOUT = 15 * 1000; // 15 seconds

export const ROUTES = (function () {
  const HOME = '/';
  const AD_ACCOUNTS = '/users/:userId/ad-accounts';
  const CAMPAIGNS = `${AD_ACCOUNTS}/:adAccountId/campaigns`;
  const ADSETS = `${CAMPAIGNS}/:campaignId/adsets`;
  const ADS = `${ADSETS}/:adsetId/ads`;

  return {
    home: HOME,
    adAccounts: AD_ACCOUNTS,
    campaigns: CAMPAIGNS,
    adsets: ADSETS,
    ads: ADS,
  };
})();
