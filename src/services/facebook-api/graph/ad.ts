import { AdApi, Ad } from '../../../stores/ad-store';
import { AdAccount } from '../../../stores/ad-account-store';
import { makeRequest } from '../make-request';

/**
 * @see https://developers.facebook.com/docs/marketing-api/reference/adgroup
 */
export type FacebookAd = {
  id: string;
  account_id: string;
  campaign_id: string;
  adset_id: string;
  name: string;
};

export class AdGraphApi implements AdApi {
  async getAdAccountAds(
    adAccount: AdAccount,
    limit: number = 100
  ): Promise<Ad[]> {
    const response = await makeRequest<{ data: FacebookAd[] }>({
      url: `/act_${adAccount.id}/ads`,
      params: {
        limit,
        fields: ['id', 'account_id', 'campaign_id', 'adset_id', 'name'],
      },
      options: { needAuthorization: true },
    });

    return response.data.map((ad) => {
      return new Ad(ad.id, adAccount.id, ad.campaign_id, ad.adset_id, ad.name);
    });
  }
}
