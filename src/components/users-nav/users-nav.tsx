import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { classNames, SearchField, Dialog } from 'draft-components';
import {
  EntityGroup,
  EntityGroupParams,
  User,
  UserParams,
} from '../../stores/entities';
import { UserToGroupMapping } from '../../stores/user-group-store';
import { SideNav, SideNavProps } from '../side-nav';
import { EntityGroupView } from '../entity-group-view';
import { CreateEntityGroupPopover } from '../create-entity-group-popover';
import { UserNavLink } from './user-nav-link';
import { UserForm } from '../user-form';
import styles from './users-nav.module.scss';

export interface UsersNavProps extends SideNavProps {
  users: User[];
  groups: EntityGroup[];
  userPerGroup: UserToGroupMapping;
  onGroupAdd(params: EntityGroupParams): void;
  onGroupUpdate(groupId: EntityGroup['id'], params: EntityGroupParams): void;
  onGroupDelete(groupId: EntityGroup['id']): void;
  onUserUpdate(userId: User['id'], params: UserParams): void;
  onUserDelete(userId: User['id']): void;
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

  const [userForUpdate, setUserForUpdate] = React.useState<User>();
  const unsetUserForUpdate = () => setUserForUpdate(undefined);
  const deleteUser = (user: User) => {
    const message = intl.formatMessage({
      id: 'components.UserNav.confirmDelete',
      defaultMessage: `Are you sure you want to delete the saved user?`,
    });
    if (window.confirm(message)) {
      onUserDelete(user.id);
    }
  };

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
          onDelete={deleteUser}
          onUpdate={setUserForUpdate}
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

      {userForUpdate && (
        <Dialog
          isOpen={true}
          width={460}
          heading={intl.formatMessage(
            {
              id: 'components.UsersNav.editDialogHeading',
              defaultMessage: 'Edit user #{userId}',
            },
            { userId: userForUpdate.id }
          )}
          onClose={unsetUserForUpdate}
        >
          <UserForm
            user={userForUpdate}
            userPerGroup={userPerGroup}
            groups={groups}
            onCancel={unsetUserForUpdate}
            onSave={(params) => {
              onUserUpdate(userForUpdate.id, params);
              unsetUserForUpdate();
            }}
          />
        </Dialog>
      )}
    </SideNav>
  );
}
