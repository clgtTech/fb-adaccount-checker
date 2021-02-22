import { API_OBJECTS_LIMIT } from '../../../constants';
import {
  AdEffectiveStatus,
  DatePreset,
  OperationResult,
  Status,
} from '../../../types';
import {
  AdAccount,
  Ad,
  AdApi,
  AdDTO,
  AdUpdate,
  InsightsDTO,
} from '../../../stores/entities';
import { InsightsGraphApi, FacebookInsights } from './insights-graph-api';
import { AdAccountGraphApi } from './ad-account-graph-api';
import { makeRequest } from '../make-request';

/**
 * @see https://developers.facebook.com/docs/marketing-api/reference/adgroup
 */
export type FacebookAd = {
  id: string;
  account_id: string;
  campaign_id: string;
  adset_id: string;
  effective_status: AdEffectiveStatus;
  status: Status;
  name: string;
  delivery_info?: {
    status: string;
  };
  ad_review_feedback?: {
    global: Record<string, string>;
  };
  creative?: {
    id: string;
    effective_object_story_id?: `${string}_${string}`;
    thumbnail_url: string;
    title?: string;
    body?: string;
  };
  insights?: FacebookInsights;
};

export class AdGraphApi implements AdApi {
  async getAdAccountAds(
    adAccountId: AdAccount['id'],
    params: { insightsDatePreset?: DatePreset; limit?: number }
  ): Promise<AdDTO[]> {
    const response = await makeRequest<{ data: FacebookAd[] }>({
      url: `/${AdAccountGraphApi.getActId(adAccountId)}/ads`,
      params: {
        limit: params.limit ?? API_OBJECTS_LIMIT,
        fields: [
          'id',
          'account_id',
          'campaign_id',
          'adset_id',
          'effective_status',
          'status',
          'name',
          'delivery_info',
          'ad_review_feedback{global}',
          `creative.thumbnail_width(200).thumbnail_height(200){${[
            'id',
            'title',
            'body',
            'thumbnail_url',
            'effective_object_story_id',
          ].join(',')}}`,
          InsightsGraphApi.getInsightsField(params.insightsDatePreset),
        ],
      },
      options: { shouldUseUserAccessToken: true },
    });

    return response.data.map((ad) => {
      const creative = ad.creative;
      return {
        id: ad.id,
        adAccountId: ad.account_id,
        campaignId: ad.campaign_id,
        adsetId: ad.adset_id,
        effectiveStatus: ad.effective_status,
        status: ad.status,
        name: ad.name,
        deliveryStatus: ad.delivery_info?.status,
        reviewFeedback: ad.ad_review_feedback?.global,
        creative: creative && {
          id: creative.id,
          pagePostId: creative.effective_object_story_id,
          thumbnailUrl: creative.thumbnail_url,
          title: creative.title,
          body: creative.body,
        },
        insights: InsightsGraphApi.formatFetchedInsights(ad.insights),
      };
    });
  }

  async getAdAccountAdsInsights(
    adAccountId: string,
    params: { datePreset: DatePreset; limit?: number }
  ): Promise<Map<Ad['id'], InsightsDTO>> {
    type ResponseItem = Pick<FacebookAd, 'id' | 'insights'>;

    const response = await makeRequest<{ data: ResponseItem[] }>({
      url: `/${AdAccountGraphApi.getActId(adAccountId)}/ads`,
      options: { shouldUseUserAccessToken: true },
      params: {
        limit: params?.limit ?? API_OBJECTS_LIMIT,
        fields: ['id', InsightsGraphApi.getInsightsField(params.datePreset)],
      },
    });

    const adsInsights = new Map();
    for (const item of response.data) {
      const insightsDTO = InsightsGraphApi.formatFetchedInsights(item.insights);
      if (insightsDTO) {
        adsInsights.set(item.id, insightsDTO);
      }
    }
    return adsInsights;
  }

  updateAd(id: Ad['id'], update: AdUpdate['data']): Promise<OperationResult> {
    return makeRequest({
      url: `/${id}`,
      method: 'post',
      data: update,
      options: { shouldUseUserAccessToken: true },
    });
  }
}
