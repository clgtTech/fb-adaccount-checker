import axios, { AxiosResponse, Method } from 'axios';
import { FacebookApiError } from './facebook-api-error';
import { facebookApiConfig } from './facebook-api-config';

interface RequestParams {
  [param: string]: boolean | string | number | (string | number)[] | undefined;
}

interface RequestOptions {
  shouldUseUserAccessToken?: boolean;
  usePageAccessToken?: string;
  headers?: { [header: string]: string | number };
}

export interface RequestConfig {
  url: string;
  method?: Method;
  params?: RequestParams;
  options?: RequestOptions;
  data?: any;
}

export const GRAPH_API_URL = 'https://graph.facebook.com/v10.0';
export async function makeRequest<T = any>({
  url,
  method = 'get',
  params = {},
  options = {},
  data,
}: RequestConfig): Promise<T> {
  let accessToken: string | undefined;
  if (typeof options.usePageAccessToken === 'string') {
    accessToken = facebookApiConfig.getPageAccessToken(
      options.usePageAccessToken
    );
  } else if (options.shouldUseUserAccessToken === true) {
    accessToken = facebookApiConfig.accessToken;
  }

  try {
    const { access_token, locale, fields, ...otherParams } = params;
    const response: AxiosResponse<T> = await axios({
      url: GRAPH_API_URL + normalizePathname(url),
      method,
      params: {
        access_token: access_token || accessToken,
        locale: locale || facebookApiConfig.locale,
        fields: Array.isArray(fields) ? fields.join(',') : fields,
        ...otherParams,
      },
      headers: options.headers,
      data,
    });
    return response.data;
  } catch (e) {
    throw FacebookApiError.createFromAxiosError(e);
  }
}

function normalizePathname(pathname: string): string {
  return pathname.startsWith('/')
    ? pathname.replace(/^\/*/, '/')
    : '/' + pathname;
}
