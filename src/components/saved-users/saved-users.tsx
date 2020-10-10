import type { User } from 'common-types';
import React from 'react';
import classNames from 'classnames';
import { useUserCustomNames } from 'context/users-context';
import { SectionTitle } from 'components/section-title';
import { UserItem } from 'components/user-item';
import styles from './saved-users.module.css';

export type SavedUsersProps = {
  className?: string;
  activeUser?: User | null;
  users: User[];
  onUserSelect: (user: User) => void;
  onUserRemove: (userId: string) => void;
};

export function SavedUsers({
  className,
  activeUser,
  users,
  onUserSelect,
  onUserRemove,
}: SavedUsersProps) {
  const {
    userCustomNames,
    saveUserCustomName,
    removeUserCustomName,
  } = useUserCustomNames();
  return (
    <div className={classNames(className)}>
      <SectionTitle className={styles.title}>История</SectionTitle>
      <ul className={styles.list}>
        {users.map((user) => (
          <li key={user.id}>
            <UserItem
              user={user}
              customName={userCustomNames[user.id]}
              isActive={activeUser?.id === user.id}
              onSelect={onUserSelect}
              onRemove={(userId) => {
                removeUserCustomName(userId);
                onUserRemove(userId);
              }}
              onNameChange={(customName) => {
                saveUserCustomName(user.id, customName);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
