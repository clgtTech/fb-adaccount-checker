import {
  ActionAttributionWindows,
  ActionIndicator,
  BidStrategy,
  BuyingType,
  Objective,
  Status,
} from '../../../types';
import { CurrencyAmount } from '../../../stores/entities';
import {
  Campaign,
  CampaignApi,
  CampaignInsights,
} from '../../../stores/campaign-store';
import { AdAccount } from '../../../stores/ad-account-store';
import { makeRequest } from '../make-request';
import { toActionType, toNumber } from '../type-conversions';

/**
 * @see https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group
 */
export type FacebookCampaign = {
  id: string;
  account_id: string;
  status: Status;
  name: string;
  adset_count: number;
  objective: Objective;
  buying_type: BuyingType;
  bid_strategy?: BidStrategy;
  daily_budget?: string;
  lifetime_budget?: string;
  budget_remaining?: string;
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
          'status',
          'name',
          'adset_count',
          'objective',
          'buying_type',
          'bid_strategy',
          'daily_budget',
          'lifetime_budget',
          'budget_remaining',
          'insights.date_preset(lifetime){results,cost_per_result,spend,cpc,cpm,ctr}',
        ],
      },
      options: { needAuthorization: true },
    });

    return response.data.map((campaign) => {
      const insights = campaign.insights?.data?.[0];
      const targetActionIndicator = insights?.results?.[0]?.indicator;
      return new Campaign(
        campaign.id,
        adAccount.id,
        campaign.status,
        campaign.name,
        campaign.adset_count,
        campaign.objective,
        campaign.buying_type,
        campaign.bid_strategy,
        campaign.daily_budget
          ? new CurrencyAmount(campaign.daily_budget, adAccount.currency)
          : undefined,
        campaign.lifetime_budget
          ? new CurrencyAmount(campaign.lifetime_budget, adAccount.currency)
          : undefined,
        insights && targetActionIndicator
          ? new CampaignInsights(
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
