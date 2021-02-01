import { Currency } from '../../../types';
import { AdAccount, AdAccountApi } from '../../../stores/ad-account-store';
import { makeRequest } from '../make-request';
import { toNumber } from '../type-conversions';

/**
 * @see https://developers.facebook.com/docs/marketing-api/reference/ad-account
 */
export type FacebookAdAccount = {
  id: string;
  account_id: string;
  account_status: number;
  disable_reason: number;
  name: string;
  currency: Currency;
  insights?: {
    data?: [
      {
        date_start: string;
        date_stop: string;
        spend: string;
        ctr: string;
      }
    ];
    paging: {
      cursors: {
        before: string;
        after: string;
      };
    };
  };
};

export class AdAccountGraphApi implements AdAccountApi {
  async getAdAccounts(userId: string): Promise<AdAccount[]> {
    const response = await makeRequest<{ data: FacebookAdAccount[] }>({
      url: `/${userId}/adaccounts`,
      params: {
        limit: 100,
        fields: [
          'account_id',
          'account_status',
          'disable_reason',
          'name',
          'currency',
          'insights.date_preset(lifetime){spend,ctr}',
        ],
      },
      options: { needAuthorization: true },
    });
    return response.data.map((adAccount) => {
      const insights = adAccount.insights?.data?.[0];
      return new AdAccount(
        adAccount.account_id,
        adAccount.name,
        adAccount.account_status,
        adAccount.disable_reason,
        adAccount.currency,
        toNumber(insights?.spend),
        toNumber(insights?.ctr)
      );
    });
  }
}
