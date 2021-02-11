import * as React from 'react';
import { classNames } from 'draft-components';
import { DisapprovalReason } from '../../presenters/ad-presenter';
import styles from './review-feedback.module.scss';

export interface ReviewFeedbackProps
  extends React.ComponentPropsWithoutRef<'ul'> {
  disapprovalReasons: DisapprovalReason[];
}

export function ReviewFeedback({
  className,
  disapprovalReasons,
  ...props
}: ReviewFeedbackProps) {
  return (
    <ul {...props} className={classNames(className, styles.items)}>
      {disapprovalReasons.map((disapprovalReason, key) => (
        <li className={styles.item} key={`disapproval-reason-${key}`}>
          <h4 className={styles.itemTitle}>{disapprovalReason.title}</h4>
          <div className={styles.itemDescription}>
            {disapprovalReason.description}
          </div>
        </li>
      ))}
    </ul>
  );
}
