import { AdsetApi, Adset } from '../../../stores/adset-store';
import { AdAccount } from '../../../stores/ad-account-store';
import { makeRequest } from '../make-request';

/**
 * @see https://developers.facebook.com/docs/marketing-api/reference/ad-campaign
 */
export type FacebookAdset = {
  id: string;
  account_id: string;
  campaign_id: string;
  name: string;
};

export class AdsetGraphApi implements AdsetApi {
  async getAdAccountAdsets(
    adAccount: AdAccount,
    limit: number = 100
  ): Promise<Adset[]> {
    const response = await makeRequest<{ data: FacebookAdset[] }>({
      url: `/act_${adAccount.id}/adsets`,
      params: {
        limit,
        fields: ['id', 'account_id', 'campaign_id', 'name'],
      },
      options: { needAuthorization: true },
    });

    return response.data.map((adset) => {
      return new Adset(adset.id, adAccount.id, adset.campaign_id, adset.name);
    });
  }
}
