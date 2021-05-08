import axios, { AxiosResponse } from 'axios';
import { makeRequest, GRAPH_API_URL, RequestConfig } from '../make-request';
import { facebookApiConfig } from '../facebook-api-config';
import { Locale } from '../../../types';
import { FacebookApiError } from '../facebook-api-error';

jest.mock('axios');
const axiosMock = axios as jest.MockedFunction<typeof axios>;

afterEach(() => {
  facebookApiConfig.reset();
  axiosMock.mockClear();
});

it('should call facebook graph API with user access token', async () => {
  const userAccessToken = 'xyz';
  const config: RequestConfig = {
    url: '/me',
    options: {
      shouldUseUserAccessToken: true,
    },
  };
  const axiosResponse: AxiosResponse = {
    status: 200,
    statusText: '',
    data: { id: '123', name: 'John Doe' },
    config: {
      url: GRAPH_API_URL + config.url,
      method: 'get',
      params: {
        locale: 'en_US',
        access_token: userAccessToken,
        fields: undefined,
      },
      headers: undefined,
      data: undefined,
    },
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
    },
  };
  axiosMock.mockResolvedValue(axiosResponse);
  facebookApiConfig.setAccessToken(userAccessToken);
  facebookApiConfig.setLocale(Locale.enUS);

  const user = await makeRequest(config);

  expect(axiosMock).toHaveBeenCalledTimes(1);
  expect(axiosMock).toHaveBeenCalledWith(axiosResponse.config);
  expect(user).toBe(axiosResponse.data);
});

it('should call facebook graph API with page access token', async () => {
  const pageId = '456';
  const pageAccessToken = 'abc';
  const pageAccessTokens = new Map([[pageId, pageAccessToken]]);
  const fields = ['id', 'name'];
  const config: RequestConfig = {
    url: pageId,
    params: { fields },
    options: {
      usePageAccessToken: pageId,
    },
  };
  const axiosResponse: AxiosResponse = {
    status: 200,
    statusText: '',
    data: { id: pageId, name: 'Test Page' },
    config: {
      url: GRAPH_API_URL + '/' + pageId,
      method: 'get',
      params: {
        locale: '',
        access_token: pageAccessToken,
        fields: fields.join(','),
      },
      headers: undefined,
      data: undefined,
    },
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
    },
  };
  axiosMock.mockResolvedValue(axiosResponse);
  facebookApiConfig.setPageAccessTokens(pageAccessTokens);

  const user = await makeRequest(config);

  expect(axiosMock).toHaveBeenCalledTimes(1);
  expect(axiosMock).toHaveBeenCalledWith(axiosResponse.config);
  expect(user).toBe(axiosResponse.data);
});

it('should call facebook graph API without access token', async () => {
  const config: RequestConfig = { url: '/' };
  const axiosResponse: AxiosResponse = {
    status: 400,
    statusText: 'Bad request',
    data: {
      error: {
        message: 'Unsupported get request.',
        type: 'GraphMethodException',
        code: 1,
        error_subcode: 2,
        fbtrace_id: 'xyz',
      },
    },
    config: {
      url: GRAPH_API_URL + '/',
      method: 'get',
      params: {
        locale: '',
        access_token: undefined,
        fields: undefined,
      },
      headers: undefined,
      data: undefined,
    },
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
    },
  };
  const axiosError = Object.assign(new Error('Request error.'), {
    name: 'AxiosError',
    isAxiosError: true,
    config: axiosResponse.config,
    response: axiosResponse,
  });
  axiosMock.mockRejectedValue(axiosError);

  expect.assertions(3);
  await expect(makeRequest(config)).rejects.toEqual(
    FacebookApiError.createFromAxiosError(axiosError)
  );
  expect(axiosMock).toHaveBeenCalledTimes(1);
  expect(axiosMock).toHaveBeenCalledWith(axiosResponse.config);
});
