import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { FormattedMessage, useIntl } from 'react-intl';
import { classNames, SearchField } from 'draft-components';
import { stores } from '../../stores';
import { UsersNav } from '../users-nav';
import styles from './sidebar.module.scss';

export type SidebarHtmlAttrs = Omit<
  React.ComponentPropsWithoutRef<'nav'>,
  'title'
>;

export interface SidebarProps extends SidebarHtmlAttrs {
  title?: React.ReactNode;
}

export const Sidebar = mobxReact.observer(function Sidebar({
  title,
  className,
  children,
  ...props
}: SidebarProps) {
  const intl = useIntl();
  const { userStore } = stores;

  return (
    <section {...props} className={classNames(className, styles.container)}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          {title ?? (
            <FormattedMessage
              id="components.Sidebar.title"
              defaultMessage="History"
            />
          )}
        </h2>
        <SearchField
          className={styles.searchField}
          hasFullWidth={true}
          placeholder={intl.formatMessage({
            id: 'components.Sidebar.searchFieldPlaceholder',
            defaultMessage: 'Search users by name',
          })}
          value={userStore.searchQuery}
          onChange={(event) => {
            userStore.setSearchQuery(event.target.value);
          }}
        />
      </header>

      <UsersNav
        className={styles.userNav}
        baseUrl="/"
        items={userStore.filteredUsers.map((user) => ({
          id: user.id,
          name: user.displayedName,
          pictureUrl: user.pictureUrl,
          addedAt: user.addedAt,
        }))}
        onUserDelete={(userId) => {
          userStore.deleteUser(userId);
        }}
        onUserNameChange={(userId, customName) => {
          userStore.updateUser(userId, { customName });
        }}
      />
    </section>
  );
});
