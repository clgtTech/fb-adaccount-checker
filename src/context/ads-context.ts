import type { Ad } from 'common-types';
import type { ServiceOptions } from './contetx-types';
import type {
  FbApiError,
  UpdateAdParams,
  UpdateAdResult,
} from 'api/facebook-api';
import pick from 'lodash/pick';
import { getAds, updateAd } from 'api/facebook-api';
import { useMutation, useQuery, useQueryCache } from 'react-query';
import { useCallback } from 'react';

type AdsQueryData = Ad[] | undefined;

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

type UseUpdateAdOptions = {
  onError?: (error: FbApiError) => void;
  onSuccess?: (result: UpdateAdResult) => void;
};
export function useUpdateAd(options?: UseUpdateAdOptions) {
  const queryCache = useQueryCache();
  return useMutation<UpdateAdResult, FbApiError, UpdateAdParams, () => void>(
    updateAd,
    {
      onMutate: ({ adId, update }) => {
        const queries = queryCache.getQueries<AdsQueryData, FbApiError>('ads');
        const queriesData = queries.map((query) => {
          return queryCache.getQueryData<AdsQueryData>(query.queryKey);
        });

        queries.forEach((query) => {
          queryCache.setQueryData<AdsQueryData>(query.queryKey, (oldAds) => {
            return oldAds
              ? oldAds.map((oldAd) => {
                  return oldAd.id === adId ? { ...oldAd, ...update } : oldAd;
                })
              : oldAds;
          });
        });

        return () => {
          queries.forEach((query, index) => {
            queryCache.setQueryData(query.queryKey, queriesData[index]);
          });
        };
      },
      onError: (error, params, rollback) => {
        rollback();
        options?.onError?.(error);
      },
      onSuccess: (data) => {
        options?.onSuccess?.(data);
      },
    }
  );
}
