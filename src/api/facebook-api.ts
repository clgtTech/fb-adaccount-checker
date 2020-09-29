import { Locale } from 'constants/common';
import { FB_API_URL } from 'constants/facebook';
import axios, { AxiosError } from 'axios';

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
export type FbMeNodeResponse = {
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
  const response = await axios.get<FbMeNodeResponse>(`${FB_API_URL}/me`, {
    params: {
      access_token: params.accessToken,
      locale: params.locale || Locale.Ru,
      fields: 'id, name, picture.width(200).height(200)',
    },
  });
  return {
    id: response.data.id,
    name: response.data.name,
    pictureUrl: response.data.picture?.data.url || '',
    accessToken: params.accessToken,
  };
}

export async function getAdAccounts() {}

export async function getAds() {}
