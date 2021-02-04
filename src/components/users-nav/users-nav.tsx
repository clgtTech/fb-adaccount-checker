import * as React from 'react';
import { useIntl } from 'react-intl';
import { classNames, SearchField } from 'draft-components';
import { User } from '../../stores/entities';
import { SideNav, SideNavProps } from '../side-nav';
import { UserNavLink, UserNavLinkProps } from './user-nav-link';
import styles from './users-nav.module.scss';

export interface UsersNavProps extends SideNavProps {
  users: User[];
  onUserDelete: UserNavLinkProps['onDelete'];
  onUserUpdate: UserNavLinkProps['onUpdate'];
  getLinkToUser(userId: User['id']): string;
}

export function UsersNav({
  users,
  onUserDelete,
  onUserUpdate,
  getLinkToUser,
  className,
  ...props
}: UsersNavProps) {
  const intl = useIntl();
  const [searchValue, setSearchValue] = React.useState('');
  const searchQuery = searchValue.toLowerCase();

  return (
    <SideNav {...props} className={classNames(className, styles.container)}>
      <SideNav.Header
        className={styles.header}
        title={intl.formatMessage({
          id: 'components.UsersNav.title',
          defaultMessage: 'History',
        })}
      >
        <SearchField
          placeholder={intl.formatMessage({
            id: 'components.UsersNav.searchFieldPlaceholder',
            defaultMessage: 'Search users by name',
          })}
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
        />
      </SideNav.Header>
      <SideNav.Content className={styles.content}>
        <nav>
          <ul className={styles.linkList}>
            {users
              .filter((user) => {
                return user.displayedName.toLowerCase().includes(searchQuery);
              })
              .map((user) => (
                <li key={user.id}>
                  <UserNavLink
                    user={user}
                    to={getLinkToUser(user.id)}
                    onDelete={onUserDelete}
                    onUpdate={onUserUpdate}
                  />
                </li>
              ))}
          </ul>
        </nav>
      </SideNav.Content>
    </SideNav>
  );
}
