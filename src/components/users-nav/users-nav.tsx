import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { classNames, SearchField } from 'draft-components';
import { EntityGroup, EntityGroupParams, User } from '../../stores/entities';
import { SideNav, SideNavProps } from '../side-nav';
import { EntityGroupView } from '../entity-group-view';
import { CreateEntityGroupPopover } from '../create-entity-group-popover';
import { UserNavLink, UserNavLinkProps } from './user-nav-link';
import styles from './users-nav.module.scss';

export interface UsersNavProps extends SideNavProps {
  groups: EntityGroup[];
  userPerGroup: Record<User['id'], EntityGroup['id']>;
  onGroupAdd(params: EntityGroupParams): void;
  onGroupUpdate(groupId: EntityGroup['id'], params: EntityGroupParams): void;
  onGroupDelete(groupId: EntityGroup['id']): void;
  users: User[];
  onUserDelete: UserNavLinkProps['onDelete'];
  onUserUpdate: UserNavLinkProps['onUpdate'];
  getLinkToUser(userId: User['id']): string;
}

export function UsersNav({
  groups,
  userPerGroup,
  onGroupAdd,
  onGroupUpdate,
  onGroupDelete,
  users,
  onUserUpdate,
  onUserDelete,
  getLinkToUser,
  className,
  ...props
}: UsersNavProps) {
  const intl = useIntl();

  const [searchValue, setSearchValue] = React.useState('');
  const searchQuery = searchValue.toLowerCase();

  const groupItems: Record<EntityGroup['id'], React.ReactNodeArray> = {};
  const renderedUsers: JSX.Element[] = [];
  for (const user of users) {
    if (!user.displayedName.toLowerCase().includes(searchQuery)) {
      continue;
    }

    const element = (
      <li key={user.id}>
        <UserNavLink
          user={user}
          to={getLinkToUser(user.id)}
          onDelete={getLinkToUser}
          onUpdate={onUserUpdate}
        />
      </li>
    );

    const groupId = userPerGroup[user.id];
    if (groupId) {
      if (groupItems[groupId]) {
        groupItems[groupId].push(element);
      } else {
        groupItems[groupId] = [element];
      }
    } else {
      renderedUsers.push(element);
    }
  }

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

        <div className={styles.toolbar}>
          <CreateEntityGroupPopover onCreate={onGroupAdd} />
        </div>
      </SideNav.Header>
      <SideNav.Content className={styles.content}>
        <nav>
          <ul className={styles.items}>
            {groups.map((group) => (
              <li key={group.id}>
                <EntityGroupView
                  group={group}
                  renderDescription={(numberOfItems) => (
                    <FormattedMessage
                      id="components.UsersNav.groupDescription"
                      defaultMessage="Users: {numberOfItems}"
                      values={{ numberOfItems }}
                    />
                  )}
                  onUpdate={onGroupUpdate}
                  onDelete={onGroupDelete}
                >
                  {groupItems[group.id] ?? []}
                </EntityGroupView>
              </li>
            ))}
            {renderedUsers}
          </ul>
        </nav>
      </SideNav.Content>
    </SideNav>
  );
}
