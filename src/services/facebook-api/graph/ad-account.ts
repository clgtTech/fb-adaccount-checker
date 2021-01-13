import { AdAccount, AdAccountApi } from '../../../stores/ad-account-store';
import { makeRequest } from '../make-request';

/**
 * @see https://developers.facebook.com/docs/marketing-api/reference/ad-account
 */
export type FacebookAdAccount = {
  id: string;
  account_id: string;
  account_status: number;
  disable_reason: number;
  name: string;
  currency: string;
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
          'id',
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
    return response.data.map((facebookAdAccount) => {
      const insights = facebookAdAccount.insights?.data?.[0];
      return new AdAccount({
        id: facebookAdAccount.id,
        accountId: facebookAdAccount.account_id,
        name: facebookAdAccount.name,
        status: facebookAdAccount.account_status,
        disableReason: facebookAdAccount.disable_reason,
        currency: facebookAdAccount.currency,
        spend: insights?.spend,
        ctr: insights?.ctr,
      });
    });
  }
}
