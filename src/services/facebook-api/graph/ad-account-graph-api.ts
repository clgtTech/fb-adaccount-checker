import { API_OBJECTS_LIMIT } from '../../../constants';
import {
  AccountDisableReason,
  AccountStatus,
  Currency,
  FundingSourceType,
} from '../../../types';
import { AdAccount, AdAccountApi } from '../../../stores/entities';
import { makeRequest } from '../make-request';
import { toNumber } from '../helpers';

/**
 * @see https://developers.facebook.com/docs/marketing-api/reference/ad-account
 */
export type FacebookAdAccount = {
  account_id: string;
  account_status: AccountStatus;
  disable_reason: AccountDisableReason;
  name: string;
  currency: Currency;
  adtrust_dsl: string | number;
  timezone_id: string | number;
  timezone_name: string;
  funding_source_details?: {
    id: string;
    type: FundingSourceType;
    display_string: string;
  };
  insights?: {
    data: [
      {
        date_start: string;
        date_stop: string;
        spend: string;
        ctr: string;
        cpc: string;
        cpm: string;
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

const getAdAccounts: AdAccountApi['getAdAccounts'] = async (
  userId,
  limit = API_OBJECTS_LIMIT
) => {
  const { data: adAccounts } = await makeRequest<{ data: FacebookAdAccount[] }>(
    {
      url: `/${userId}/adaccounts`,
      params: {
        limit,
        fields: [
          'account_id',
          'account_status',
          'disable_reason',
          'name',
          'currency',
          'timezone_id',
          'timezone_name',
          'adtrust_dsl',
          'funding_source_details{id,type,display_string}',
          'insights.date_preset(lifetime){spend,ctr,cpc,cpm}',
        ],
      },
      options: { shouldUseUserAccessToken: true },
    }
  );
  return adAccounts.map((adAccount) => {
    const insights = adAccount?.insights?.data?.[0];
    const fundingSourceDetails = adAccount?.funding_source_details;
    return {
      id: adAccount.account_id,
      name: adAccount.name,
      status: adAccount.account_status,
      disableReason: adAccount.disable_reason,
      currency: adAccount.currency,
      limitPerDay: toNumber(adAccount.adtrust_dsl),
      timeZone: adAccount.timezone_name,
      fundingSourceType: fundingSourceDetails?.type,
      displayedPaymentMethod: fundingSourceDetails?.display_string,
      spend: toNumber(insights?.spend),
      ctr: toNumber(insights?.ctr),
      cpc: toNumber(insights?.cpc),
      cpm: toNumber(insights?.cpm),
    };
  });
};

export const adAccountGraphApi = {
  getAdAccounts,
  helpers: {
    getActId,
  },
};

function getActId(accountId: AdAccount['id']): string {
  return `act_${accountId}`;
}
