import {
  ActionAttributionWindows,
  ActionIndicator,
  AdsetEffectiveStatus,
  BidStrategy,
  Status,
} from '../../../types';
import { CurrencyAmount } from '../../../stores/entities';
import { AdsetApi, Adset, AdsetInsights } from '../../../stores/adset-store';
import { AdAccount } from '../../../stores/ad-account-store';
import { makeRequest } from '../make-request';
import { toActionType, toNumber } from '../type-conversions';

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
  insights?: {
    data: [
      {
        results: [
          {
            indicator: ActionIndicator;
            values?: [
              {
                value: string;
                attribution_windows: ActionAttributionWindows[];
              }
            ];
          }
        ];
        cost_per_result: [
          {
            indicator: ActionIndicator;
            values?: [
              {
                value: string;
                attribution_windows: ActionAttributionWindows[];
              }
            ];
          }
        ];
        spend: string;
        cpc: string;
        cpm: string;
        ctr: string;
        date_start: string;
        date_stop: string;
      }
    ];
  };
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
          'insights.date_preset(lifetime){results,cost_per_result,spend,cpc,cpm,ctr}',
        ],
      },
      options: { needAuthorization: true },
    });

    return response.data.map((adset) => {
      const insights = adset.insights?.data?.[0];
      const targetActionIndicator = insights?.results?.[0]?.indicator;
      return new Adset(
        adset.id,
        adAccount.id,
        adset.campaign_id,
        adset.effective_status,
        adset.status,
        adset.name,
        toNumber(adset.ad_count),
        adset.bid_strategy,
        adset.daily_budget
          ? new CurrencyAmount(adset.daily_budget, adAccount.currency)
          : undefined,
        adset.lifetime_budget
          ? new CurrencyAmount(adset.lifetime_budget, adAccount.currency)
          : undefined,
        insights && targetActionIndicator
          ? new AdsetInsights(
              toActionType(targetActionIndicator),
              toNumber(insights.results[0].values?.[0]?.value),
              toNumber(insights.cost_per_result?.[0]?.values?.[0]?.value),
              toNumber(insights.spend),
              toNumber(insights.cpc),
              toNumber(insights.cpm),
              toNumber(insights.ctr)
            )
          : undefined
      );
    });
  }
}
