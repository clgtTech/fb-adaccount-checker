import { API_OBJECTS_LIMIT } from '../../../constants';
import {
  BidStrategy,
  BuyingType,
  CampaignEffectiveStatus,
  Objective,
  Status,
} from '../../../types';
import { CampaignApi } from '../../../stores/entities';
import { AdAccountGraphApi } from './ad-account-graph-api';
import { FacebookInsights, adObjectGraphApi } from './ad-object-graph-api';
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

const getAdAccountCampaigns: CampaignApi['getAdAccountCampaigns'] = async (
  adAccountId,
  params
) => {
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
        'cost_per_mobile_app_install',
        adObjectGraphApi.helpers.getInsightsFieldForNestedRequest(
          params?.insightsDatePreset
        ),
      ],
    },
    options: { shouldUseUserAccessToken: true },
  });
  const deliveryStatuses = await adObjectGraphApi.fetchDeliveryStatuses(
    response.data.map((campaign) => campaign.id)
  );

  return response.data.map((campaign) => {
    return {
      id: campaign.id,
      adAccountId: campaign.account_id,
      deliveryStatus: deliveryStatuses[campaign.id],
      effectiveStatus: campaign.effective_status,
      status: campaign.status,
      name: campaign.name,
      adsetCount: campaign.adset_count,
      objective: campaign.objective,
      buyingType: campaign.buying_type,
      bidStrategy: campaign.bid_strategy,
      dailyBudget: campaign.daily_budget,
      lifetimeBudget: campaign.lifetime_budget,
      insights: adObjectGraphApi.helpers.deserializeInsights(campaign.insights),
    };
  });
};

const getAdAccountCampaignsInsights: CampaignApi['getAdAccountCampaignsInsights'] = async (
  adAccountId,
  params
) => {
  type DataItem = Pick<FacebookCampaign, 'id' | 'insights'>;

  const response = await makeRequest<{ data: DataItem[] }>({
    url: `/${AdAccountGraphApi.getActId(adAccountId)}/campaigns`,
    options: { shouldUseUserAccessToken: true },
    params: {
      limit: params?.limit ?? API_OBJECTS_LIMIT,
      fields: [
        'id',
        adObjectGraphApi.helpers.getInsightsFieldForNestedRequest(
          params.datePreset
        ),
      ],
    },
  });

  const campaignsInsights = new Map();
  for (const item of response.data) {
    const insightsDTO = adObjectGraphApi.helpers.deserializeInsights(
      item.insights
    );
    if (insightsDTO) {
      campaignsInsights.set(item.id, insightsDTO);
    }
  }
  return campaignsInsights;
};

const updateCampaign: CampaignApi['updateCampaign'] = async (id, update) => {
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
};

export const campaignGraphApi: CampaignApi = {
  getAdAccountCampaigns,
  getAdAccountCampaignsInsights,
  updateCampaign,
};
