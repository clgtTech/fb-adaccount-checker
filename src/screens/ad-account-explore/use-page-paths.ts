import { generatePath } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { Adset, Campaign } from '../../stores/entities';
import { AdAccountExploreParams } from './route-params';

export interface UsePagePathsOptions {
  params: AdAccountExploreParams;
  campaign?: Campaign;
  adset?: Adset;
}

export function usePagePaths({ params, campaign, adset }: UsePagePathsOptions) {
  return {
    campaigns: generatePath(ROUTES.campaigns, {
      userId: params.userId,
      adAccountId: params.adAccountId,
    }),
    adsets: campaign
      ? generatePath(ROUTES.adsets, {
          userId: params.userId,
          adAccountId: params.adAccountId,
          campaignId: campaign.id,
        })
      : '',
    ads:
      campaign && adset
        ? generatePath(ROUTES.ads, {
            userId: params.userId,
            adAccountId: params.adAccountId,
            campaignId: campaign.id,
            adsetId: adset.id,
          })
        : '',
  };
}
