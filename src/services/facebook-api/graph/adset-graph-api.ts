import { API_OBJECTS_LIMIT } from '../../../constants';
import { AdsetEffectiveStatus, BidStrategy, Status } from '../../../types';
import { AdsetApi } from '../../../stores/entities';
import { AdAccountGraphApi } from './ad-account-graph-api';
import {
  FacebookInsights,
  adObjectGraphApi,
  prepareInsightFieldsForRequest,
  fetchedInsightsToInsightsDTO,
} from './ad-object-graph-api';
import { makeRequest } from '../make-request';
import { toNumber } from '../helpers';

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

const getAdAccountAdsets: AdsetApi['getAdAccountAdsets'] = async (
  adAccountId,
  params
) => {
  const response = await makeRequest<{ data: FacebookAdset[] }>({
    url: `/${AdAccountGraphApi.getActId(adAccountId)}/adsets`,
    params: {
      limit: params?.limit ?? API_OBJECTS_LIMIT,
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
        prepareInsightFieldsForRequest(params?.insightsDatePreset),
      ],
    },
    options: { shouldUseUserAccessToken: true },
  });
  const deliveryStatuses = await adObjectGraphApi.getDeliveryStatuses(
    response.data.map((adset) => adset.id)
  );

  return response.data.map((adset) => {
    return {
      id: adset.id,
      adAccountId: adset.account_id,
      campaignId: adset.campaign_id,
      deliveryStatus: deliveryStatuses[adset.id],
      effectiveStatus: adset.effective_status,
      status: adset.status,
      name: adset.name,
      adCount: toNumber(adset.ad_count),
      bidStrategy: adset.bid_strategy,
      dailyBudget: adset.daily_budget,
      lifetimeBudget: adset.lifetime_budget,
      insights: fetchedInsightsToInsightsDTO(adset.insights),
    };
  });
};

const getAdAccountAdsetsInsights: AdsetApi['getAdAccountAdsetsInsights'] = async (
  adAccountId,
  params
) => {
  type ResponseItem = Pick<FacebookAdset, 'id' | 'insights'>;

  const response = await makeRequest<{ data: ResponseItem[] }>({
    url: `/${AdAccountGraphApi.getActId(adAccountId)}/adsets`,
    options: { shouldUseUserAccessToken: true },
    params: {
      limit: params?.limit ?? API_OBJECTS_LIMIT,
      fields: ['id', prepareInsightFieldsForRequest(params?.datePreset)],
    },
  });

  const adsetsInsights = new Map();
  for (const item of response.data) {
    const insightsDTO = fetchedInsightsToInsightsDTO(item.insights);
    if (insightsDTO) {
      adsetsInsights.set(item.id, insightsDTO);
    }
  }
  return adsetsInsights;
};

const updateAdset: AdsetApi['updateAdset'] = (id, update) => {
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

export const adsetGraphApi: AdsetApi = {
  getAdAccountAdsets,
  getAdAccountAdsetsInsights,
  updateAdset,
};
