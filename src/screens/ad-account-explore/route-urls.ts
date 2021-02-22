import * as React from 'react';
import { generatePath } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { Adset, Campaign } from '../../stores/entities';

export interface RouteParams {
  userId: string;
  adAccountId: string;
  campaignId?: string;
  adsetId?: string;
}

export class RouteUrls {
  readonly baseParams: {
    userId: string;
    adAccountId: string;
  };

  constructor(public params: RouteParams) {
    this.baseParams = {
      userId: params.userId,
      adAccountId: params.adAccountId,
    };
  }

  getCampaignsUrl(): string {
    return generatePath(ROUTES.campaigns, { ...this.baseParams });
  }

  getAdsetsUrl(campaignId: Campaign['id']): string {
    return generatePath(ROUTES.adsets, {
      ...this.baseParams,
      campaignId: campaignId,
    });
  }

  getAdsUrl(campaignId: Campaign['id'], adsetId: Adset['id']): string {
    return generatePath(ROUTES.ads, {
      ...this.baseParams,
      campaignId: campaignId,
      adsetId: adsetId,
    });
  }
}

export function useRouteUrls(params: RouteParams): RouteUrls {
  return React.useMemo(() => new RouteUrls(params), [params]);
}
