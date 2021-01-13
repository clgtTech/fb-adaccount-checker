import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { classNames } from 'draft-components';
import { AsyncActionStatus } from '../../types';
import { stores } from '../../stores';
import { SidebarSwitch } from '../sidebar-switch';
import { AccessTokenField } from '../access-token-field';
import styles from './header.module.scss';

export type HeaderHtmlAttrs = React.ComponentPropsWithoutRef<'header'>;

export interface HeaderProps extends HeaderHtmlAttrs {
  isBordered?: boolean;
}

export const Header = mobxReact.observer(function Header({
  isBordered,
  className,
  ...props
}: HeaderProps) {
  const { uiStore, sessionStore } = stores;
  return (
    <header
      {...props}
      className={classNames(className, styles.container, {
        [styles.isBordered]: isBordered,
      })}
    >
      <SidebarSwitch
        className={styles.sidebarSwitch}
        isActive={uiStore.state.isSidebarOpen}
        onClick={() => uiStore.toggleSidebarVisibility()}
      />
      <AccessTokenField
        className={styles.tokenField}
        isLoading={sessionStore.authStatus === AsyncActionStatus.pending}
        value={sessionStore.accessToken}
        onValueChange={(accessToken) =>
          sessionStore.setAccessToken(accessToken)
        }
      />
    </header>
  );
});
