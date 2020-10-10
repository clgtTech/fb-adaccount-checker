import type { User } from 'common-types';
import React from 'react';
import classNames from 'classnames';
import { InlineEdit } from 'components/inline-edit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import styles from './user-item.module.css';

export type UserItemProps = {
  user: User;
  customName?: string;
  isActive: boolean;
  onSelect: (user: User) => void;
  onRemove: (userId: string) => void;
  onNameChange: (name: string) => void;
};

export function UserItem({
  user,
  customName,
  isActive,
  onSelect,
  onRemove,
  onNameChange,
}: UserItemProps) {
  const displayedName = customName || user.name;
  return (
    <article
      className={classNames(styles.container, {
        [styles.container_active]: isActive,
      })}
      tabIndex={isActive ? -1 : 0}
      onClick={() => onSelect(user)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.stopPropagation();
          onSelect(user);
        }
      }}
    >
      <img
        className={styles.picture}
        src={user.pictureUrl}
        alt={user.name}
        width={160}
        height={160}
      />
      <button
        className={styles.removeBtn}
        onKeyDown={(event) => {
          event.stopPropagation();
        }}
        onClick={(event) => {
          event.stopPropagation();
          onRemove(user.id);
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <div
        className={styles.nameContainer}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <InlineEdit
          label="Название"
          initialValue={displayedName}
          onValueChange={onNameChange}
        >
          <h2 className={styles.name}>{displayedName}</h2>
        </InlineEdit>
      </div>
      {customName ? <h3 className={styles.subName}>{user.name}</h3> : null}
      <p className={styles.id}>ID: {user.id}</p>
    </article>
  );
}
