import type { User, AdAccount, Ad } from 'common-types';
import {
  Locale,
  AccountStatus,
  AccountDisableReason,
  AdEffectiveStatus,
} from 'enums';
import axios, { AxiosError } from 'axios';

const API_URL = 'https://graph.facebook.com/v8.0';

/**
 * @see https://developers.facebook.com/docs/graph-api/using-graph-api/error-handling/
 */
export type FbApiErrorResponse = {
  error: {
    message: string;
    type: string;
    code: string;
    error_subcode: string;
    error_user_title: string;
    error_user_msg: string;
    fbtrace_id: string;
  };
};
export type FbApiError = AxiosError<FbApiErrorResponse>;

/**
 * @see https://developers.facebook.com/docs/graph-api/using-graph-api#me
 * @see https://developers.facebook.com/docs/graph-api/reference/user
 */
type FbMeNodeResponse = {
  id: string;
  name: string;
  picture: {
    data: { width: number; height: number; url: string };
  };
};

type GetUserParams = {
  accessToken: string;
  locale?: Locale;
};
export async function getUser(params: GetUserParams): Promise<User> {
  const response = await axios.get<FbMeNodeResponse>(`${API_URL}/me`, {
    params: {
      access_token: params.accessToken,
      locale: params.locale || Locale.Ru,
      fields: ['id', 'name', 'picture.width(200).height(200)'].join(','),
    },
  });
  return {
    id: response.data.id,
    name: response.data.name,
    pictureUrl: response.data.picture?.data.url || '',
    accessToken: params.accessToken,
  };
}

/**
 * @see https://developers.facebook.com/docs/marketing-api/reference/ad-account
 */
type FbAdAccountNode = {
  id: string;
  account_id: string;
  account_status: AccountStatus;
  disable_reason: AccountDisableReason;
  name: string;
};

type GetAdAccountsParams = {
  accessToken: string;
  userId: string;
  locale?: Locale;
};

export async function getAdAccounts(
  params: GetAdAccountsParams
): Promise<AdAccount[]> {
  const response = await axios.get<{ data: FbAdAccountNode[] }>(
    `${API_URL}/${params.userId}/adaccounts`,
    {
      params: {
        access_token: params.accessToken,
        locale: params.locale || Locale.Ru,
        fields: [
          'id',
          'account_id',
          'account_status',
          'disable_reason',
          'name',
        ].join(','),
      },
    }
  );
  return response.data.data.map((rawAdAccount) => ({
    id: rawAdAccount.id,
    accountId: rawAdAccount.account_id,
    name: rawAdAccount.name,
    status: rawAdAccount.account_status,
    disableReason: rawAdAccount.disable_reason,
  }));
}

/**
 * @see https://developers.facebook.com/docs/marketing-api/reference/adgroup
 */
type FbAdNode = {
  id: string;
  name: string;
  effective_status: AdEffectiveStatus;
  delivery_info: {
    status: string;
  };
  ad_review_feedback: {
    global: {
      [definition: string]: string;
    };
  };
  creative: {
    id: string;
    body?: string;
    thumbnail_url?: string;
  };
};

type GetAdsParams = {
  accessToken: string;
  accountId: string;
  locale?: Locale;
};

export async function getAds(params: GetAdsParams): Promise<Ad[]> {
  const response = await axios.get<{ data: FbAdNode[] }>(
    `${API_URL}/${params.accountId}/ads`,
    {
      params: {
        access_token: params.accessToken,
        locale: params.locale || Locale.Ru,
        fields: [
          'id',
          'name',
          'effective_status',
          'delivery_info',
          'ad_review_feedback{global}',
          'creative.thumbnail_width(200).thumbnail_height(200){body,thumbnail_url}',
        ].join(','),
      },
    }
  );
  return response.data.data.map((rawAd) => ({
    id: rawAd.id,
    name: rawAd.name,
    effectiveStatus: rawAd.effective_status,
    deliveryStatus: rawAd.delivery_info?.status || '',
    reviewFeedback: rawAd.ad_review_feedback?.global || {},
    creativeBody: rawAd.creative?.body || '',
    creativeThumbnailUrl: rawAd.creative?.thumbnail_url || '',
  }));
}
