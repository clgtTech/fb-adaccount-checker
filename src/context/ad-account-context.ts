import type { AdAccount, User } from 'common-types';
import type { ServiceOptions } from './contetx-types';
import type { FbApiError } from 'api/facebook-api';
import pick from 'lodash/pick';
import { getAdAccounts } from 'api/facebook-api';
import { useQuery } from 'react-query';
import { useCallback } from 'react';

export function useAdAccounts(
  user: User,
  options?: ServiceOptions<AdAccount[], FbApiError>
) {
  const queryFn = useCallback(
    (key: string, params: { accessToken: string; userId: string }) =>
      getAdAccounts(params),
    []
  );
  const queryKey: Parameters<typeof queryFn> = [
    'adAccounts',
    { accessToken: user.accessToken, userId: user.id },
  ];
  const query = useQuery<AdAccount[], FbApiError>(queryKey, queryFn, {
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
    adAccountsLoadStatus: query.status,
    adAccountsLoadError: query.error,
    adAccounts: query.data || [],
  };
}
