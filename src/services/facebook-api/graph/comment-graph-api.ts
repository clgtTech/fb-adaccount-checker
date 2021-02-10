import { CommentsOrder } from '../../../types';
import {
  CommentApi,
  CommentDTO,
  CommentUpdate,
  CommentUpdateResult,
  OperationResult,
} from '../../../stores/entities';
import { makeRequest } from '../make-request';
import { toRequestBody } from '../helpers';
import { FacebookApiError } from '../facebook-api-error';

/**
 * @see https://developers.facebook.com/docs/graph-api/reference/comment
 * @see https://developers.facebook.com/docs/graph-api/reference/post/comments
 */
export interface FacebookComment {
  id: string;
  message: string;
  is_hidden: boolean;
  created_time: string;
  from: {
    id: string;
    name: string;
    picture?: {
      data: {
        width: number;
        height: number;
        url: string;
      };
    };
  };
}

export class CommentGraphApi implements CommentApi {
  async getPostComments(
    pageId: string,
    pagePostId: string,
    limit: number = 1000
  ): Promise<CommentDTO[]> {
    const response = await makeRequest<{ data: FacebookComment[] }>({
      url: `/${pagePostId}/comments`,
      params: {
        limit,
        order: CommentsOrder.REVERSE_CHRONOLOGICAL,
        filter: 'toplevel',
        summary: 'total_count',
        fields: [
          'id',
          'message',
          'is_hidden',
          'created_time',
          'from{id,name,picture.width(64).height(64)}',
        ],
      },
      options: {
        usePageAccessToken: pageId,
      },
    });
    return response.data.map((comment) => {
      const from = comment.from;
      return {
        id: comment.id,
        message: comment.message,
        isHidden: comment.is_hidden,
        createdTime: comment.created_time,
        actor: {
          id: from.id,
          name: from.name,
          pictureUrl: from.picture?.data?.url,
        },
      };
    });
  }

  async updateComment(
    pageId: string,
    update: CommentUpdate
  ): Promise<OperationResult> {
    return makeRequest<OperationResult>({
      url: update.commentId,
      method: 'post',
      data: {
        is_hidden: update.data.isHidden,
      },
      options: {
        usePageAccessToken: pageId,
      },
    });
  }

  async batchUpdateComments(
    pageId: string,
    updates: CommentUpdate[]
  ): Promise<CommentUpdateResult[]> {
    const batch = updates.map((update) => {
      return {
        method: 'POST',
        relative_url: update.commentId,
        body: toRequestBody({ is_hidden: update.data.isHidden }),
      };
    });
    const responses = await makeRequest<
      ({ code: number; body: string } | null)[]
    >({
      url: '',
      method: 'post',
      params: {
        batch: JSON.stringify(batch),
        include_headers: false,
      },
      options: {
        usePageAccessToken: pageId,
      },
    });
    return updates.map((update, index) => {
      const response = responses[index];
      if (response == null) {
        return {
          ...update,
          success: false,
          error: new Error('Request timed out.'),
        };
      }

      try {
        const code = response.code;
        const body = JSON.parse(response.body);
        return code === 200
          ? { ...update, success: true }
          : {
              ...update,
              success: false,
              error: new FacebookApiError(
                body.error?.message,
                body.error?.code,
                code,
                body.error?.error_user_title,
                body.error?.error_user_msg
              ),
            };
      } catch (e) {
        return { ...update, success: false, error: e };
      }
    });
  }
}
