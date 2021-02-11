import * as React from 'react';
import { classNames } from 'draft-components';
import styles from './header.module.scss';

export interface HeaderProps extends React.ComponentPropsWithoutRef<'header'> {
  description?: React.ReactNode;
}

export function Header({
  className,
  children,
  description,
  ...props
}: HeaderProps) {
  return (
    <header {...props} className={classNames(className, styles.container)}>
      <div className={styles.content}>{children}</div>
      {description ? (
        <div className={styles.description}>{description}</div>
      ) : null}
    </header>
  );
}
