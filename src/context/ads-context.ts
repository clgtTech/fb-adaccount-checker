import type { Ad } from 'common-types';
import type { ServiceOptions } from './contetx-types';
import type { FbApiError } from 'api/facebook-api';
import pick from 'lodash/pick';
import { getAds } from 'api/facebook-api';
import { useQuery } from 'react-query';
import { useCallback } from 'react';

export function useAds(
  accessToken: string,
  accountId: string,
  options?: ServiceOptions<Ad[], FbApiError>
) {
  const queryFn = useCallback(
    (key: string, params: { accessToken: string; accountId: string }) =>
      getAds(params),
    []
  );
  const queryKey: Parameters<typeof queryFn> = [
    'ads',
    { accessToken, accountId },
  ];
  const query = useQuery<Ad[], FbApiError>(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    onError: options?.onError,
    onSuccess: options?.onSuccess,
  });

  return {
    ...pick(query, [
      'isIdle',
      'isLoading',
      'isError',
      'isSuccess',
      'clear',
      'refetch',
    ]),
    adsLoadStatus: query.status,
    adsLoadError: query.error,
    ads: query.data || [],
  };
}
