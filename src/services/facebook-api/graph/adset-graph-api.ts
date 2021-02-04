import { API_OBJECTS_LIMIT } from '../../../constants';
import { AdsetEffectiveStatus, BidStrategy, Status } from '../../../types';
import { AdAccount, AdsetDTO, AdsetApi } from '../../../stores/entities';
import { AdAccountGraphApi } from './ad-account-graph-api';
import { InsightsGraphApi, FacebookInsights } from './insights-graph-api';
import { makeRequest } from '../make-request';
import { toNumber } from '../type-conversions';

/**
 * @see https://developers.facebook.com/docs/marketing-api/reference/ad-campaign
 */
export type FacebookAdset = {
  id: string;
  account_id: string;
  campaign_id: string;
  effective_status: AdsetEffectiveStatus;
  status: Status;
  name: string;
  ad_count: number;
  bid_strategy?: BidStrategy;
  daily_budget?: string;
  lifetime_budget?: string;
  insights?: FacebookInsights;
};

export class AdsetGraphApi implements AdsetApi {
  async getAdAccountAdsets(
    adAccountId: AdAccount['id'],
    limit: number = API_OBJECTS_LIMIT
  ): Promise<AdsetDTO[]> {
    const response = await makeRequest<{ data: FacebookAdset[] }>({
      url: `/${AdAccountGraphApi.getActId(adAccountId)}/adsets`,
      params: {
        limit,
        fields: [
          'id',
          'account_id',
          'campaign_id',
          'effective_status',
          'status',
          'name',
          'ad_count',
          'bid_strategy',
          'daily_budget',
          'lifetime_budget',
          InsightsGraphApi.insightsQueryField,
        ],
      },
      options: { needAuthorization: true },
    });

    return response.data.map((adset) => {
      return {
        id: adset.id,
        adAccountId: adset.account_id,
        campaignId: adset.campaign_id,
        effectiveStatus: adset.effective_status,
        status: adset.status,
        name: adset.name,
        adCount: toNumber(adset.ad_count),
        bidStrategy: adset.bid_strategy,
        dailyBudget: adset.daily_budget,
        lifetimeBudget: adset.lifetime_budget,
        insights: InsightsGraphApi.formatFetchedInsights(adset.insights),
      };
    });
  }
}
