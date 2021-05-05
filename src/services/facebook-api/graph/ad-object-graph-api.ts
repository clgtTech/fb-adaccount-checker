import { makeRequest } from '../make-request';
import {
  ActionAttributionWindows,
  ActionIndicator,
  ActionType,
  DatePreset,
} from '../../../types';
import {
  ActionStats,
  DeliveryStatusDTO,
  InsightsDTO,
} from '../../../stores/entities';
import { toNumber } from '../helpers';

/**
 * @see https://developers.facebook.com/docs/marketing-api/reference/ads-action-stats/
 */
export interface FacebookAdsActionStats {
  action_type: ActionType;
  value: string;
}

/**
 * @see https://developers.facebook.com/docs/marketing-api/insights
 * @see https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group/insights
 * @see https://developers.facebook.com/docs/marketing-api/reference/ad-campaign/insights
 * @see https://developers.facebook.com/docs/marketing-api/reference/adgroup/insights/
 */
export interface FacebookInsights {
  data: [
    {
      results?: [
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
      cost_per_result?: [
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
      actions: FacebookAdsActionStats[];
      cost_per_action_type: FacebookAdsActionStats[];
      spend: string;
      cpc: string;
      cpm: string;
      ctr: string;
      date_start: string;
      date_stop: string;
    }
  ];
}

interface FacebookDeliveryStatus {
  id: string;
  delivery_status: {
    status: string;
    substatuses: string[];
  };
}

const fetchDeliveryStatuses = async (
  ids: string[]
): Promise<Record<string, DeliveryStatusDTO>> => {
  const response = await makeRequest<Record<string, FacebookDeliveryStatus>>({
    url: '/',
    params: {
      ids: ids.join(','),
      fields: `["delivery_status{extra_data,status,substatuses}"]`,
      suppress_http_code: 1,
    },
    options: { shouldUseUserAccessToken: true },
  });

  return ids.reduce<{ [id: string]: DeliveryStatusDTO }>(
    (deliveryStatusDTOs, id) => {
      const data = response[id];
      if (data && data.delivery_status && data.delivery_status.status) {
        deliveryStatusDTOs[id] = {
          status: data.delivery_status.status,
          substatus: data.delivery_status.substatuses?.[0],
        };
      }
      return deliveryStatusDTOs;
    },
    {}
  );
};

export const adObjectGraphApi = {
  fetchDeliveryStatuses,
  helpers: {
    getInsightsFieldForNestedRequest,
    deserializeAdsActionStatsList,
    deserializeInsights,
  },
};

function getInsightsFieldForNestedRequest(
  datePreset = DatePreset.MAXIMUM
): string {
  return `insights.date_preset(${datePreset}){${[
    'results',
    'cost_per_result',
    'actions',
    'cost_per_action_type',
    'spend',
    'cpc',
    'cpm',
    'ctr',
  ].join(',')}}`;
}

function deserializeAdsActionStatsList(
  adsActionStatsList: FacebookAdsActionStats[] | null | undefined
): ActionStats {
  if (!Array.isArray(adsActionStatsList)) {
    return {};
  }

  return adsActionStatsList.reduce<ActionStats>((actionStats, item) => {
    actionStats[item.action_type] = toNumber(item.value);
    return actionStats;
  }, {});
}

function deserializeInsights(
  insights: FacebookInsights | null | undefined
): InsightsDTO | undefined {
  if (!insights) {
    return;
  }

  const data = insights?.data?.[0];
  const targetActionIndicator = data.results?.[0]?.indicator;
  return {
    targetAction: targetActionIndicator
      ? (targetActionIndicator.replace('actions:', '') as ActionType)
      : undefined,
    targetActionResult: toNumber(data.results?.[0].values?.[0]?.value),
    targetActionCost: toNumber(data.cost_per_result?.[0]?.values?.[0]?.value),
    actions: deserializeAdsActionStatsList(data.actions),
    costPerAction: deserializeAdsActionStatsList(data.cost_per_action_type),
    spend: toNumber(data.spend),
    cpc: toNumber(data.cpc),
    cpm: toNumber(data.cpm),
    ctr: toNumber(data.ctr),
  };
}
