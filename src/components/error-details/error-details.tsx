import * as React from 'react';
import { classNames, SvgIcon, Icons } from 'draft-components';
import styles from './error-details.module.scss';

export interface ErrorDetailsProps
  extends React.ComponentPropsWithoutRef<'details'> {
  summary: React.ReactNode;
}

export function ErrorDetails({
  summary,
  className,
  children,
  ...props
}: ErrorDetailsProps) {
  return (
    <details {...props} className={classNames(className, styles.container)}>
      <summary className={styles.summary}>
        <SvgIcon
          className={styles.summaryIcon}
          size="base"
          icon={Icons.errorIcon}
        />
        <span>{summary}</span>
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
