import type { Comment as CommentType, Page } from 'common-types';
import { PageTask } from 'enums';
import * as React from 'react';
import classNames from 'classnames';
import { formatDateTime } from 'shared/formatters';
import { useUpdateComment } from 'context/comments-context';
import styles from './comment.module.css';

export type CommentProps = {
  className?: string;
  comment: CommentType;
  page?: Page;
};

export const Comment = React.memo<CommentProps>(function Comment({
  className,
  comment,
  page,
}) {
  const isEditable = Boolean(
    page && page.accessToken && page.tasks.includes(PageTask.MODERATE)
  );
  const [updateComment] = useUpdateComment({
    onError: (error) => {
      alert(
        error.response?.data.error.error_user_msg ||
          'Не удалось обновить комментарий.'
      );
    },
  });

  return (
    <div
      className={classNames(
        className,
        styles.container,
        comment.isHidden && styles.container_isHidden
      )}
    >
      <img
        className={styles.profileImage}
        src={comment.from.pictureUrl}
        alt={comment.from.name}
        width={32}
        height={32}
      />
      <div className={styles.innerWrapper}>
        <div className={styles.contents}>
          <address className={styles.author}>{comment.from.name}</address>
          <time className={styles.createdTime} dateTime={comment.createdAt}>
            {formatDateTime(new Date(comment.createdAt))}
          </time>
          <a
            className={styles.message}
            href={comment.permalinkUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {comment.message}
          </a>
        </div>
        {isEditable ? (
          <button
            className={styles.actionBtn}
            type="button"
            onClick={() => {
              return updateComment({
                commentId: comment.id,
                pageAccessToken: (page as Page).accessToken,
                update: { isHidden: !comment.isHidden },
              });
            }}
          >
            {comment.isHidden ? 'Показать комментарий' : 'Скрыть комментарий'}
          </button>
        ) : null}
      </div>
    </div>
  );
});
