import { Page } from 'common-types';
import * as React from 'react';
import classNames from 'classnames';
import { CommentsList } from 'components/comments-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import styles from './comments.module.css';

export type CommentsProps = {
  className?: string;
  accessToken: string;
  pagePostId: string;
  page?: Page;
};

export function Comments({
  className,
  accessToken,
  pagePostId,
  page,
}: CommentsProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <div className={classNames(className, styles.container)}>
      <button
        className={styles.toggle}
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Свернуть комментарии' : 'Развернуть комментарии'}
        <FontAwesomeIcon
          className={styles.toggleIcon}
          icon={isExpanded ? faChevronUp : faChevronDown}
        />
      </button>

      {isExpanded ? (
        <CommentsList
          className={styles.commentsList}
          accessToken={accessToken}
          pagePostId={pagePostId}
          page={page}
        />
      ) : null}
    </div>
  );
}
