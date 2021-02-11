import * as React from 'react';
import { classNames } from 'draft-components';
import styles from './side-nav-header.module.scss';

export type SideNavHeaderHtmlAttrs = Omit<
  React.ComponentPropsWithoutRef<'header'>,
  'title'
>;

export interface SideNavHeaderProps extends SideNavHeaderHtmlAttrs {
  title: React.ReactNode;
  description?: React.ReactNode;
  isBordered?: boolean;
}

export function SideNavHeader({
  title,
  description,
  isBordered,
  className,
  children,
  ...props
}: SideNavHeaderProps) {
  return (
    <header
      {...props}
      className={classNames(className, styles.container, {
        [styles.isBordered]: isBordered,
      })}
    >
      <h2 className={styles.title}>{title}</h2>
      {description ? (
        <div className={styles.description}>{description}</div>
      ) : null}
      {children ? <div className={styles.content}>{children}</div> : null}
    </header>
  );
}
