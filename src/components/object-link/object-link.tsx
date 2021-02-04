import * as React from 'react';
import { classNames } from 'draft-components';
import styles from './object-link.module.scss';

export type ObjectLinkProps = React.ComponentPropsWithoutRef<'a'>;

export function ObjectLink({ className, children, ...props }: ObjectLinkProps) {
  return (
    <a className={classNames(className, styles.link)} {...props}>
      {children}
    </a>
  );
}
