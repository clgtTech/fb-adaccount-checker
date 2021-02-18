import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { FormattedMessage } from 'react-intl';
import { Avatar, Button, Checkbox } from 'draft-components';
import { Comment, CommentUpdate } from '../../stores/entities';
import { CommentPresenter } from '../../presenters/comment-presenter';
import styles from './comment-row.module.scss';
import { AsyncStatus } from '../../types';

export interface CommentRowProps {
  isSelected?: boolean;
  comment: Comment;
  onUpdate(id: Comment['id'], data: CommentUpdate['data']): void;
  onSelect(id: Comment['id'], isSelected: boolean): void;
}

export const CommentRow = mobxReact.observer(function CommentRow({
  isSelected = false,
  comment,
  onUpdate,
  onSelect,
}: CommentRowProps) {
  const commentPresenter = new CommentPresenter(comment);
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <Checkbox
          className={styles.checkbox}
          name={comment.id}
          checked={isSelected}
          onChange={(event) => {
            const target = event.target;
            onSelect(target.name, target.checked);
          }}
        />
        <Avatar
          className={styles.avatar}
          isRounded={true}
          size="sm"
          src={commentPresenter.actor.pictureUrl}
          altText={commentPresenter.actor.name}
          initials={commentPresenter.actor.initials}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.bubble}>
          <span className={styles.name}>{commentPresenter.actor.name}</span>
          <br />
          {commentPresenter.message}
        </div>
        <div className={styles.metaAndActions}>
          <Button
            className={styles.visibilityToggle}
            size="xs"
            appearance="minimal"
            isLoading={comment.updateStatus === AsyncStatus.pending}
            onClick={() => {
              onUpdate(comment.id, { isHidden: !comment.isHidden });
            }}
          >
            {comment.isHidden ? (
              <FormattedMessage
                id="components.CommentRow.showCommentButton"
                defaultMessage="Show"
              />
            ) : (
              <FormattedMessage
                id="components.CommentRow.hideCommentButton"
                defaultMessage="Hide"
              />
            )}
          </Button>
          {comment.updateError ? (
            <span className={styles.updateError}>
              <FormattedMessage
                id="components.CommentRow.updateError"
                defaultMessage="Failed to update comment"
              />
            </span>
          ) : null}
          <time
            className={styles.createdTime}
            dateTime={commentPresenter.createdTimeISO}
          >
            {commentPresenter.createdTime}
          </time>
        </div>
      </div>
    </div>
  );
});
