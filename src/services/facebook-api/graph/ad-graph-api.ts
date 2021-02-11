import { API_OBJECTS_LIMIT } from '../../../constants';
import { AdEffectiveStatus, OperationResult, Status } from '../../../types';
import {
  Ad,
  AdAccount,
  AdApi,
  AdDTO,
  AdUpdate,
} from '../../../stores/entities';
import { AdAccountGraphApi } from './ad-account-graph-api';
import { InsightsGraphApi, FacebookInsights } from './insights-graph-api';
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
    limit: number = API_OBJECTS_LIMIT
  ): Promise<AdDTO[]> {
    const response = await makeRequest<{ data: FacebookAd[] }>({
      url: `/${AdAccountGraphApi.getActId(adAccountId)}/ads`,
      params: {
        limit,
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
          InsightsGraphApi.insightsQueryField,
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

  updateAd(id: Ad['id'], update: AdUpdate['data']): Promise<OperationResult> {
    return makeRequest({
      url: `/${id}`,
      method: 'post',
      data: update,
      options: { shouldUseUserAccessToken: true },
    });
  }
}
