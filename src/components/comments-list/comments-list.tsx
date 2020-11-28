import type { Page } from 'common-types';
import * as React from 'react';
import classNames from 'classnames';
import { usePostComments } from 'context/comments-context';
import { Loader } from 'components/loader';
import { NonIdealState } from 'components/non-ideal-state';
import { Comment } from 'components/comment';
import styles from './comments-list.module.css';
import { useState } from 'react';

export type CommentsListProps = {
  className?: string;
  accessToken: string;
  pagePostId: string;
  page?: Page;
};

export function CommentsList({
  className,
  accessToken,
  pagePostId,
  page,
}: CommentsListProps) {
  const {
    isLoading,
    isError,
    isSuccess,
    postComments,
    postCommentsLoadError,
  } = usePostComments(accessToken, pagePostId);
  // TODO: Temporary solution. Need to rewrite!
  const commentsPreferencesKey = 'FbAdAccountChecker:shouldShowHiddenComments';
  const [shouldShowHiddenComments, setShouldShowHiddenComments] = useState(
    localStorage.getItem(commentsPreferencesKey) === 'true'
  );

  let content = null;
  if (isLoading) {
    content = <Loader>Загрузка комментариев...</Loader>;
  } else if (isError) {
    content = (
      <NonIdealState title="Не удалось загрузить комментарии">
        {postCommentsLoadError?.response?.data.error.error_user_msg}
      </NonIdealState>
    );
  } else if (isSuccess) {
    content = postComments.length ? (
      <div className={styles.comments}>
        <label>
          <input
            type="checkbox"
            checked={shouldShowHiddenComments}
            onChange={(event) => {
              const isChecked = event.target.checked;
              setShouldShowHiddenComments(isChecked);
              localStorage.setItem(commentsPreferencesKey, String(isChecked));
            }}
          />
          Показать скрытые комментарии
        </label>
        {postComments
          .filter((comment) =>
            shouldShowHiddenComments ? true : !comment.isHidden
          )
          .map((comment) => (
            // TODO: find how to pass page object without prop drilling
            <Comment key={comment.id} comment={comment} page={page} />
          ))}
      </div>
    ) : (
      <NonIdealState title="Комментарии отсутствуют" />
    );
  }

  return (
    <div className={classNames(className, styles.container)}>{content}</div>
  );
}
