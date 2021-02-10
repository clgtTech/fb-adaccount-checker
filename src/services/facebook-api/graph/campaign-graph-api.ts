import { API_OBJECTS_LIMIT } from '../../../constants';
import {
  BidStrategy,
  BuyingType,
  CampaignEffectiveStatus,
  Objective,
  Status,
} from '../../../types';
import { AdAccount, CampaignApi, CampaignDTO } from '../../../stores/entities';
import { AdAccountGraphApi } from './ad-account-graph-api';
import { InsightsGraphApi, FacebookInsights } from './insights-graph-api';
import { makeRequest } from '../make-request';

/**
 * @see https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group
 */
export type FacebookCampaign = {
  id: string;
  account_id: string;
  effective_status: CampaignEffectiveStatus;
  status: Status;
  name: string;
  adset_count: number;
  objective: Objective;
  buying_type: BuyingType;
  bid_strategy?: BidStrategy;
  daily_budget?: string;
  lifetime_budget?: string;
  insights?: FacebookInsights;
};

export class CampaignGraphApi implements CampaignApi {
  async getAdAccountCampaigns(
    adAccountId: AdAccount['id'],
    limit: number = API_OBJECTS_LIMIT
  ): Promise<CampaignDTO[]> {
    const response = await makeRequest<{ data: FacebookCampaign[] }>({
      url: `/${AdAccountGraphApi.getActId(adAccountId)}/campaigns`,
      params: {
        limit,
        fields: [
          'id',
          'account_id',
          'effective_status',
          'status',
          'name',
          'adset_count',
          'objective',
          'buying_type',
          'bid_strategy',
          'daily_budget',
          'lifetime_budget',
          InsightsGraphApi.insightsQueryField,
        ],
      },
      options: { shouldUseUserAccessToken: true },
    });

    return response.data.map((campaign) => {
      return {
        id: campaign.id,
        adAccountId: campaign.account_id,
        effectiveStatus: campaign.effective_status,
        status: campaign.status,
        name: campaign.name,
        adsetCount: campaign.adset_count,
        objective: campaign.objective,
        buyingType: campaign.buying_type,
        bidStrategy: campaign.bid_strategy,
        dailyBudget: campaign.daily_budget,
        lifetimeBudget: campaign.lifetime_budget,
        insights: InsightsGraphApi.formatFetchedInsights(campaign.insights),
      };
    });
  }
}
