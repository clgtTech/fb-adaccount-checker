import * as React from 'react';
import { classNames } from 'draft-components';
import styles from './side-nav-content.module.scss';

export type SideNavContentProps = React.ComponentPropsWithoutRef<'div'>;

export function SideNavContent({ className, ...props }: SideNavContentProps) {
  return <div {...props} className={classNames(className, styles.container)} />;
}
