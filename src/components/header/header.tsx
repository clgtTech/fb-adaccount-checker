import * as React from 'react';
import { classNames } from 'draft-components';
import styles from './header.module.scss';

export type HeaderHtmlAttrs = React.ComponentPropsWithoutRef<'header'>;

export interface HeaderProps extends HeaderHtmlAttrs {
  isBordered?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export const Header = function Header({
  isBordered,
  left,
  right,
  children,
  className,
  ...props
}: HeaderProps) {
  return (
    <header
      {...props}
      className={classNames(className, styles.layout, {
        [styles.isBordered]: isBordered,
      })}
    >
      {left ? <div className={styles.leftColumn}>{left}</div> : null}
      <div className={styles.content}>{children}</div>
      {right ? <div className={styles.rightColumn}>{right}</div> : null}
    </header>
  );
};
