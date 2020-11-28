import type { Ad, AdAccount, User, Page, Comment } from 'common-types';
import {
  AccountDisableReason,
  AccountStatus,
  ActionType,
  AdEffectiveStatus,
  AdStatus,
  CommentsOrder,
  Locale,
  PageTask,
} from 'enums';
import startCase from 'lodash/startCase';
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
export type FbMeNode = {
  id: string;
  name: string;
  picture: {
    data: { width: number; height: number; url: string };
  };
};

export type GetUserParams = {
  accessToken: string;
  locale?: Locale;
};
export async function getUser(params: GetUserParams): Promise<User> {
  const response = await axios.get<FbMeNode>(`${API_URL}/me`, {
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
 * @see https://developers.facebook.com/docs/graph-api/reference/page/#fields
 * @see https://developers.facebook.com/docs/graph-api/reference/user/accounts
 */
export type FbPageNode = {
  id: string;
  access_token: string;
  name: string;
  tasks: PageTask[];
};
export type GetUserPagesParams = {
  accessToken: string;
  userId: string;
  locale?: Locale;
};
export async function getUserPages(
  params: GetUserPagesParams
): Promise<Page[]> {
  const response = await axios.get<{ data: FbPageNode[] }>(
    `${API_URL}/${params.userId}/accounts`,
    {
      params: {
        access_token: params.accessToken,
        locale: params.locale || Locale.Ru,
        limit: 100,
        fields: ['id', 'access_token', 'name', 'tasks'].join(','),
      },
    }
  );
  return response.data.data.map((rawPage) => ({
    id: rawPage.id,
    name: rawPage.name,
    accessToken: rawPage.access_token,
    tasks: rawPage.tasks,
  }));
}

/**
 * @see https://developers.facebook.com/docs/marketing-api/reference/ad-account
 */
export type FbAdAccountNode = {
  id: string;
  account_id: string;
  account_status: AccountStatus;
  disable_reason: AccountDisableReason;
  name: string;
  currency: string;
  insights?: {
    data?: [
      {
        date_start: string;
        date_stop: string;
        spend: string;
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

export type GetAdAccountsParams = {
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
        limit: 100,
        fields: [
          'id',
          'account_id',
          'account_status',
          'disable_reason',
          'name',
          'currency',
          'insights.date_preset(lifetime){spend}',
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
    currency: rawAdAccount.currency,
    spend: Number(rawAdAccount.insights?.data?.[0].spend) || 0,
  }));
}

/**
 * @see https://developers.facebook.com/docs/marketing-api/reference/adgroup
 * @see https://developers.facebook.com/docs/marketing-api/reference/ad-creative
 */
export type FbAdNode = {
  id: string;
  name: string;
  status: AdStatus;
  effective_status: AdEffectiveStatus;
  delivery_info: {
    status: string;
  };
  ad_review_feedback: {
    global: {
      [definition: string]: string;
    };
  };
  creative?: {
    id: string;
    body?: string;
    thumbnail_url?: string;
    effective_object_story_id?: string;
  };
  insights?: {
    data?: [
      {
        date_start: string;
        date_stop: string;
        spend: string;
        results?: [
          {
            indicator: string;
            values?: [
              {
                value: string;
                attribution_windows: string[];
              }
            ];
          }
        ];
        cost_per_result?: [
          {
            indicator: string;
            values?: [
              {
                value: string;
                attribution_windows: string[];
              }
            ];
          }
        ];
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

export type GetAdsParams = {
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
          'status',
          'effective_status',
          'delivery_info',
          'ad_review_feedback{global}',
          'creative.thumbnail_width(200).thumbnail_height(200){body,thumbnail_url,effective_object_story_id}',
          'insights.date_preset(lifetime){spend,results,cost_per_result}',
          'recommendations',
          'issues_info',
        ].join(','),
      },
    }
  );
  return response.data.data.map((rawAd) => {
    const ad: Ad = {
      id: rawAd.id,
      name: rawAd.name,
      status: rawAd.status,
      effectiveStatus: rawAd.effective_status,
      deliveryStatus: rawAd.delivery_info?.status || '',
      reviewFeedback: rawAd.ad_review_feedback?.global || {},
      creativeBody: rawAd.creative?.body || '',
      creativeThumbnailUrl: rawAd.creative?.thumbnail_url || '',
      creativePagePostId: rawAd.creative?.effective_object_story_id || '',
      spend: Number(rawAd.insights?.data?.[0].spend) || 0,
    };

    const results = rawAd.insights?.data?.[0]?.results?.[0];
    const costPerResult = rawAd.insights?.data?.[0]?.cost_per_result?.[0];
    if (
      results?.indicator &&
      costPerResult?.indicator &&
      results.indicator === costPerResult.indicator
    ) {
      const actionType = results.indicator.replace(/^actions:/, '');
      ad.stats = {
        action:
          actionType in ActionType
            ? // @ts-ignore-next-line
              ActionType[actionType]
            : startCase(actionType),
        results: Number(results.values?.[0].value) || 0,
        costPerResult: Number(costPerResult.values?.[0].value) || 0,
      };
    }

    return ad;
  });
}

export type UpdateAdParams = {
  adId: string;
  accessToken: string;
  update: {
    name?: string;
    status?: AdStatus;
  };
  locale?: Locale;
};

export type UpdateAdResult = {
  success: boolean;
};

export async function updateAd(
  params: UpdateAdParams
): Promise<UpdateAdResult> {
  const response = await axios.post<UpdateAdResult>(
    `${API_URL}/${params.adId}`,
    params.update,
    {
      params: {
        access_token: params.accessToken,
        locale: params.locale || Locale.Ru,
      },
    }
  );
  return response.data;
}

/**
 * @see https://developers.facebook.com/docs/graph-api/reference/comment/
 * @see https://developers.facebook.com/docs/graph-api/reference/post/comments/
 */
export type FbCommentNode = {
  id: string;
  message: string;
  permalink_url: string;
  is_hidden: boolean;
  created_time: string;
  from: {
    id: string;
    name: string;
    picture?: {
      data?: {
        width: number;
        height: number;
        url: string;
      };
    };
  };
};

export type GetCommentsParams = {
  accessToken: string;
  pagePostId: string;
  order?: CommentsOrder;
  locale?: string;
};

export async function getPostComments(
  params: GetCommentsParams
): Promise<Comment[]> {
  const response = await axios.get<{ data: FbCommentNode[] }>(
    `${API_URL}/${params.pagePostId}/comments`,
    {
      params: {
        access_token: params.accessToken,
        locale: params.locale || Locale.Ru,
        order: params.order || CommentsOrder.reverse_chronological,
        limit: 100,
        fields: [
          'id',
          'message',
          'permalink_url',
          'is_hidden',
          'created_time',
          'from{id,name,picture.width(64).height(64)}',
        ].join(','),
      },
    }
  );
  return response.data.data.map((rawComment) => ({
    id: rawComment.id,
    message: rawComment.message,
    permalinkUrl: rawComment.permalink_url,
    isHidden: rawComment.is_hidden,
    createdAt: rawComment.created_time,
    from: {
      id: rawComment.from.id,
      name: rawComment.from.name,
      pictureUrl: rawComment.from.picture?.data?.url || '',
    },
  }));
}

export type UpdateCommentParams = {
  commentId: string;
  pageAccessToken: string;
  update: {
    message?: string;
    isHidden?: boolean;
  };
  locale?: Locale;
};

export type UpdateCommentResult = {
  success: boolean;
};

export async function updateComment(
  params: UpdateCommentParams
): Promise<UpdateCommentResult> {
  const response = await axios.post<UpdateCommentResult>(
    `${API_URL}/${params.commentId}`,
    {
      message: params.update.message,
      is_hidden: params.update.isHidden,
    },
    {
      params: {
        access_token: params.pageAccessToken,
        locale: params.locale || Locale.Ru,
      },
    }
  );
  return response.data;
}
