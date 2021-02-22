import { API_OBJECTS_LIMIT } from '../../../constants';
import {
  BidStrategy,
  BuyingType,
  CampaignEffectiveStatus,
  DatePreset,
  Objective,
  OperationResult,
  Status,
} from '../../../types';
import {
  AdAccount,
  Campaign,
  CampaignApi,
  CampaignDTO,
  CampaignUpdate,
  InsightsDTO,
} from '../../../stores/entities';
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
    params?: { insightsDatePreset?: DatePreset; limit?: number }
  ): Promise<CampaignDTO[]> {
    const response = await makeRequest<{ data: FacebookCampaign[] }>({
      url: `/${AdAccountGraphApi.getActId(adAccountId)}/campaigns`,
      params: {
        limit: params?.limit ?? API_OBJECTS_LIMIT,
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
          InsightsGraphApi.getInsightsField(params?.insightsDatePreset),
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

  async getAdAccountCampaignsInsights(
    adAccountId: string,
    params: { limit?: number; datePreset: DatePreset }
  ): Promise<Map<Campaign['id'], InsightsDTO>> {
    type ResponseItem = Pick<FacebookCampaign, 'id' | 'insights'>;

    const response = await makeRequest<{ data: ResponseItem[] }>({
      url: `/${AdAccountGraphApi.getActId(adAccountId)}/campaigns`,
      options: { shouldUseUserAccessToken: true },
      params: {
        limit: params?.limit ?? API_OBJECTS_LIMIT,
        fields: ['id', InsightsGraphApi.getInsightsField(params.datePreset)],
      },
    });

    const campaignsInsights = new Map();
    for (const item of response.data) {
      const insightsDTO = InsightsGraphApi.formatFetchedInsights(item.insights);
      if (insightsDTO) {
        campaignsInsights.set(item.id, insightsDTO);
      }
    }
    return campaignsInsights;
  }

  async updateCampaign(
    id: Campaign['id'],
    update: CampaignUpdate['data']
  ): Promise<OperationResult> {
    return makeRequest({
      url: `/${id}`,
      method: 'post',
      data: {
        ...update,
        daily_budget: update.dailyBudget,
        lifetime_budget: update.lifetimeBudget,
      },
      options: { shouldUseUserAccessToken: true },
    });
  }
}
