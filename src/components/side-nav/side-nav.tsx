import * as React from 'react';
import { classNames } from 'draft-components';
import { SideNavHeader } from './side-nav-header';
import { SideNavContent } from './side-nav-content';
import styles from './side-nav.module.scss';

export type SideNavProps = React.ComponentPropsWithoutRef<'aside'>;

export function SideNav({ className, ...props }: SideNavProps) {
  return (
    <aside {...props} className={classNames(className, styles.container)} />
  );
}

SideNav.Header = SideNavHeader;
SideNav.Content = SideNavContent;
