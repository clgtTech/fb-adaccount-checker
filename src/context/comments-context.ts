import type { Comment } from 'common-types';
import type { ServiceOptions } from './contetx-types';
import type {
  FbApiError,
  UpdateCommentParams,
  UpdateCommentResult,
} from 'api/facebook-api';
import pick from 'lodash/pick';
import { getPostComments, updateComment } from 'api/facebook-api';
import { useMutation, useQuery, useQueryCache } from 'react-query';
import { useCallback } from 'react';

type CommentsQueryData = Comment[] | undefined;

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

type UseUpdateCommentOptions = {
  onError?: (error: FbApiError) => void;
  onSuccess?: (result: UpdateCommentResult) => void;
};
export function useUpdateComment(options?: UseUpdateCommentOptions) {
  const queryCache = useQueryCache();
  return useMutation<
    UpdateCommentResult,
    FbApiError,
    UpdateCommentParams,
    () => void
  >(updateComment, {
    onMutate: ({ commentId, update }) => {
      const queries = queryCache.getQueries<CommentsQueryData, FbApiError>(
        'postComments'
      );
      const queriesData = queries.map((query) => {
        return queryCache.getQueryData<CommentsQueryData>(query.queryKey);
      });

      queries.forEach((query) => {
        queryCache.setQueryData<CommentsQueryData>(
          query.queryKey,
          (oldComments) => {
            return oldComments
              ? oldComments.map((oldComment) => {
                  return oldComment.id === commentId
                    ? { ...oldComment, ...update }
                    : oldComment;
                })
              : oldComments;
          }
        );
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
  });
}
