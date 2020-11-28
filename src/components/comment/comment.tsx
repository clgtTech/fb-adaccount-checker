import type { Comment as CommentType } from 'common-types';
import * as React from 'react';
import classNames from 'classnames';
import { formatDateTime } from 'shared/formatters';
import styles from './comment.module.css';

export type CommentProps = {
  className?: string;
  comment: CommentType;
};

export function Comment({ className, comment }: CommentProps) {
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
      </div>
    </div>
  );
}
