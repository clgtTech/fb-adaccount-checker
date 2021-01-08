import axios, { AxiosResponse, Method } from 'axios';
import { FacebookApiError } from './facebook-api-error';
import { facebookApiConfig } from './facebook-api-config';

interface RequestParams {
  [param: string]: string | number | (string | number)[] | undefined;
  fields?: string[];
}

interface RequestOptions {
  headers?: { [header: string]: string | number };
}

interface RequestConfig {
  url: string;
  method?: Method;
  params?: RequestParams;
  options?: RequestOptions;
  data?: any;
}

export async function makeRequest<T = any>({
  url,
  method = 'get',
  params = {},
  options,
  data,
}: RequestConfig): Promise<T> {
  const { fields, ...otherParams } = params;
  try {
    const response: AxiosResponse<T> = await axios({
      url: `https://graph.facebook.com/v9.0/${url.replace(/^\/*/, '')}`,
      method: method || 'get',
      params: {
        locale: facebookApiConfig.locale,
        fields: Array.isArray(fields) ? fields.join(',') : 0,
        ...otherParams,
      },
      headers: options?.headers,
      data,
    });
    return response.data;
  } catch (e) {
    throw FacebookApiError.createFromAxiosError(e);
  }
}
