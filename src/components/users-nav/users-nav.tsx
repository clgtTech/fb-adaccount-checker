import * as React from 'react';
import { classNames } from 'draft-components';
import { UserNavLink, UserNavLinkProps } from './user-nav-link';
import styles from './users-nav.module.scss';

export type UsersNavHtmlAttrs = React.ComponentPropsWithoutRef<'nav'>;

export type UsersNavItem = Pick<
  UserNavLinkProps,
  'id' | 'name' | 'pictureUrl' | 'addedAt'
>;

export interface UsersNavProps extends UsersNavHtmlAttrs {
  baseUrl: string;
  items: UsersNavItem[];
  onUserDelete(id: UsersNavItem['id']): void;
  onUserNameChange(id: UsersNavItem['id'], name: UsersNavItem['name']): void;
}

export function UsersNav({
  baseUrl,
  items,
  onUserDelete,
  onUserNameChange,
  className,
  ...props
}: UsersNavProps) {
  return (
    <nav {...props} className={classNames(className, styles.container)}>
      {items.map((item) => (
        <UserNavLink
          {...item}
          key={item.id}
          to={baseUrl + item.id}
          onDelete={() => onUserDelete(item.id)}
          onNameChange={(name) => onUserNameChange(item.id, name)}
        />
      ))}
    </nav>
  );
}

UsersNav.Link = UserNavLink;
