import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import styles from './saved-users.module.css';

export type SavedUsersProps = {
  className?: string;
  users: User[];
  onUserSelect: (user: User) => void;
  onUserRemove: (id: string) => void;
};

export function SavedUsers({
  className,
  users,
  onUserSelect,
  onUserRemove,
}: SavedUsersProps) {
  return (
    <div className={classNames(className)}>
      <h2 className={styles.title}>Недавно добавленные</h2>
      <ul className={styles.list}>
        {users.map((user) => (
          <li key={user.id}>
            <article
              className={styles.user}
              tabIndex={0}
              onClick={() => onUserSelect(user)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  onUserSelect(user);
                }
              }}
            >
              <img
                className={styles.userImage}
                src={user.pictureUrl}
                alt={user.name}
                width={160}
                height={160}
              />
              <button
                className={styles.userRemoveBtn}
                onKeyDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  onUserRemove(user.id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <h2 className={styles.userName}>{user.name}</h2>
              <p className={styles.userId}>{user.id}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
