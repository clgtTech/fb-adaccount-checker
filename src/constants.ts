import { DatePreset, Locale } from 'types';

export const FB_API_URL = process.env.REACT_APP_FB_API_URL;

export const NO_VALUE_PLACEHOLDER = '--';

export const DEFAULT_LOCALE = Locale.enUS;
export const DEFAULT_DATE_PRESET = DatePreset.MAXIMUM;

export const API_OBJECTS_LIMIT = 1000;

export const LOCAL_STORAGE_KEYS = {
  uiState: 'fbDash.uiState',
  users: 'fbDash.users',
  userGroups: 'fbDash.userGroups',
  locale: 'fbDash.locale',
  insightsDatePreset: 'fbDash.insightsDatePreset',
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
