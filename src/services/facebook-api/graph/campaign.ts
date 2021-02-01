import {
  Campaign,
  CampaignApi,
} from '../../../stores/campaign-store';
import { makeRequest } from '../make-request';
import { toActionType, toNumber } from '../type-conversions';

/**
 * @see https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group
 */
export type FacebookCampaign = {
  id: string;
  account_id: string;
  name: string;
};

export class CampaignGraphApi implements CampaignApi {
  async getAdAccountCampaigns(
    adAccount: AdAccount,
    limit: number = 100
  ): Promise<Campaign[]> {
    const response = await makeRequest<{ data: FacebookCampaign[] }>({
      url: `/act_${adAccount.id}/campaigns`,
      params: {
        limit,
        fields: [
          'id',
          'account_id',
          'name',
        ],
      },
      options: { needAuthorization: true },
    });

    return response.data.map((campaign) => {
      return new Campaign(
        campaign.id,
        adAccount.id,
        campaign.name,
      );
    });
  }
}
