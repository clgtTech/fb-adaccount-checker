import {
  ActionAttributionWindows,
  ActionIndicator,
  ActionType,
  DatePreset,
} from '../../../types';
import { InsightsDTO } from '../../../stores/entities';
import { toNumber } from '../helpers';

/**
 * @see https://developers.facebook.com/docs/marketing-api/insights
 * @see https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group/insights
 * @see https://developers.facebook.com/docs/marketing-api/reference/ad-campaign/insights
 * @see https://developers.facebook.com/docs/marketing-api/reference/adgroup/insights/
 */
export interface FacebookInsights {
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
}

export class InsightsGraphApi {
  static getInsightsField(datePreset = DatePreset.LIFETIME): string {
    return `insights.date_preset(${datePreset}){${[
      'results',
      'cost_per_result',
      'spend',
      'cpc',
      'cpm',
      'ctr',
    ].join(',')}}`;
  }

  static formatFetchedInsights(
    insights: FacebookInsights | undefined
  ): InsightsDTO | undefined {
    if (!insights) {
      return;
    }

    const data = insights?.data?.[0];
    const actionIndicator = data.results?.[0]?.indicator;
    if (!actionIndicator) {
      return;
    }

    return {
      actionType: actionIndicator.replace('actions:', '') as ActionType,
      actionTypeResult: toNumber(data.results[0].values?.[0]?.value),
      costPerActionType: toNumber(
        data.cost_per_result?.[0]?.values?.[0]?.value
      ),
      spend: toNumber(data.spend),
      cpc: toNumber(data.cpc),
      cpm: toNumber(data.cpm),
      ctr: toNumber(data.ctr),
    };
  }
}
