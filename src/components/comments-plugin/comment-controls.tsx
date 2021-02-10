import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { classNames, Button } from 'draft-components';
import styles from './comment-controls.module.scss';

export interface CommentControlsProps
  extends React.ComponentPropsWithoutRef<'div'> {
  isDisabled?: boolean;
  onShowButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  onHideButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function CommentControls({
  isDisabled,
  onShowButtonClick,
  onHideButtonClick,
  className,
  ...props
}: CommentControlsProps) {
  return (
    <div {...props} className={classNames(className, styles.container)}>
      <Button size="sm" disabled={isDisabled} onClick={onShowButtonClick}>
        <FormattedMessage
          id="components.CommentControls.showCommentsButton"
          defaultMessage="Show"
        />
      </Button>
      <Button size="sm" disabled={isDisabled} onClick={onHideButtonClick}>
        <FormattedMessage
          id="components.CommentControls.hideCommentsButton"
          defaultMessage="Hide"
        />
      </Button>
    </div>
  );
}
