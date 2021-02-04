import { API_OBJECTS_LIMIT } from '../../../constants';
import { AccountDisableReason, AccountStatus, Currency } from '../../../types';
import {
  AdAccount,
  AdAccountApi,
  AdAccountDTO,
} from '../../../stores/entities';
import { makeRequest } from '../make-request';
import { toNumber } from '../type-conversions';

/**
 * @see https://developers.facebook.com/docs/marketing-api/reference/ad-account
 */
export type FacebookAdAccount = {
  account_id: string;
  account_status: AccountStatus;
  disable_reason: AccountDisableReason;
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
  static getActId(accountId: AdAccount['id']): string {
    return `act_${accountId}`;
  }

  async getAdAccounts(
    userId: string,
    limit: number = API_OBJECTS_LIMIT
  ): Promise<AdAccountDTO[]> {
    const response = await makeRequest<{ data: FacebookAdAccount[] }>({
      url: `/${userId}/adaccounts`,
      params: {
        limit,
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
      return {
        id: adAccount.account_id,
        name: adAccount.name,
        status: adAccount.account_status,
        disableReason: adAccount.disable_reason,
        currency: adAccount.currency,
        spend: toNumber(insights?.spend),
        ctr: toNumber(insights?.ctr),
      };
    });
  }
}
