import * as React from 'react';
import { classNames } from 'draft-components';
import { CopiedValue } from '../copied-value';
import styles from './object-name.module.scss';

export interface ObjectNameProps extends React.ComponentPropsWithoutRef<'h2'> {
  objectId: string;
}

export function ObjectName({
  objectId,
  className,
  children,
  ...props
}: ObjectNameProps) {
  return (
    <h2 {...props} className={classNames(className, styles.container)}>
      <span className={styles.text}>{children}</span>
      <CopiedValue className={styles.objectId} value={objectId} />
    </h2>
  );
}
