import type { Comment } from 'common-types';
import type { ServiceOptions } from './contetx-types';
import type { FbApiError } from 'api/facebook-api';
import pick from 'lodash/pick';
import { getPostComments } from 'api/facebook-api';
import { useQuery } from 'react-query';
import { useCallback } from 'react';

export function usePostComments(
  accessToken: string,
  pagePostId: string,
  options?: ServiceOptions<Comment[], FbApiError>
) {
  const queryFn = useCallback(
    (key: string, params: { accessToken: string; pagePostId: string }) =>
      getPostComments(params),
    []
  );
  const queryKey: Parameters<typeof queryFn> = [
    'postComments',
    { accessToken, pagePostId },
  ];
  const query = useQuery<Comment[], FbApiError>(queryKey, queryFn, {
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
    postCommentsLoadStatus: query.status,
    postCommentsLoadError: query.error,
    postComments: query.data || [],
  };
}
