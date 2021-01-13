import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { generatePath } from 'react-router-dom';
import { classNames } from 'draft-components';
import { userStore } from '../../stores';
import { UsersNav } from '../users-nav';
import styles from './sidebar.module.scss';

export type SidebarProps = React.ComponentPropsWithoutRef<'aside'>;

export const Sidebar = mobxReact.observer(function Sidebar({
  className,
  ...props
}: SidebarProps) {
  return (
    <UsersNav
      {...props}
      className={classNames(className, styles.container)}
      users={userStore.users}
      getUserPath={(user) => generatePath('/:userId', { userId: user.id })}
      onUserDelete={(userId) => {
        userStore.deleteUser(userId);
      }}
      onUserNameChange={(userId, customName) => {
        userStore.updateUser(userId, { customName });
      }}
    />
  );
});
