import type { User, AdAccount } from 'common-types';
import { Locale, AccountStatus, AccountDisableReason } from 'enums';
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
        fields: 'id, account_id, account_status, disable_reason, name',
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

export async function getAds() {}
