import { makeRequest } from '../make-request';
import { DeliveryStatusDTO, InsightsDTO } from '../../../stores/entities';
import {
  ActionAttributionWindows,
  ActionIndicator,
  ActionType,
  DatePreset,
} from '../../../types';
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

export const prepareInsightFieldsForRequest = (
  datePreset = DatePreset.LIFETIME
): string => {
  return `insights.date_preset(${datePreset}){${[
    'results',
    'cost_per_result',
    'spend',
    'cpc',
    'cpm',
    'ctr',
  ].join(',')}}`;
};

export const fetchedInsightsToInsightsDTO = (
  insights: FacebookInsights | null | undefined
): InsightsDTO | undefined => {
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
    costPerActionType: toNumber(data.cost_per_result?.[0]?.values?.[0]?.value),
    spend: toNumber(data.spend),
    cpc: toNumber(data.cpc),
    cpm: toNumber(data.cpm),
    ctr: toNumber(data.ctr),
  };
};

interface FacebookDeliveryStatus {
  delivery_status: {
    status: string;
    substatuses: string[];
  };
  id: string;
}

const getDeliveryStatuses = async (
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
  getDeliveryStatuses,
};
