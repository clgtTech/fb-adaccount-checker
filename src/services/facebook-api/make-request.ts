import axios, { AxiosResponse, Method } from 'axios';
import { FacebookApiError } from './facebook-api-error';
import { facebookApiConfig } from './facebook-api-config';

interface RequestParams {
  [param: string]: boolean | string | number | (string | number)[] | undefined;
  fields?: string[] | string;
}

interface RequestOptions {
  shouldUseUserAccessToken?: boolean;
  usePageAccessToken?: string;
  headers?: { [header: string]: string | number };
}

interface RequestConfig {
  url: string;
  method?: Method;
  params?: RequestParams;
  options?: RequestOptions;
  data?: any;
}

export async function makeRequest<T = any>(config: RequestConfig): Promise<T> {
  const params = config.params ?? {};
  const options = config.options ?? {};

  let accessToken: string | undefined;
  if (typeof options?.usePageAccessToken === 'string') {
    accessToken = facebookApiConfig.pageAccessTokens.get(
      options.usePageAccessToken
    );
  } else if (options?.shouldUseUserAccessToken === true) {
    accessToken = facebookApiConfig.accessToken;
  }

  try {
    const { fields, ...otherParams } = params;
    const response: AxiosResponse<T> = await axios({
      url: `https://graph.facebook.com/v9.0/${config.url.replace(/^\/*/, '')}`,
      method: config.method ?? 'get',
      params: {
        access_token: accessToken,
        locale: facebookApiConfig.locale,
        fields: Array.isArray(fields) ? fields.join(',') : fields,
        ...otherParams,
      },
      headers: options.headers,
      data: config.data,
    });
    return response.data;
  } catch (e) {
    throw FacebookApiError.createFromAxiosError(e);
  }
}
