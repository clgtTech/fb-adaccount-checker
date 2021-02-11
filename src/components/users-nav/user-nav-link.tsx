import * as React from 'react';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { classNames, ActionsGroup, SvgIcon, Icons } from 'draft-components';
import { User } from '../../stores/entities';
import { UserPresenter } from '../../presenters/user-presenter';
import { CopiedValue } from '../copied-value';
import { UserAvatar } from './user-avatar';
import styles from './user-nav-link.module.scss';

export const messages = {
  namePrompt: defineMessage({
    id: 'components.UserNavLink.namePrompt',
    defaultMessage: `Enter new name for the saved user:`,
  }),
  deleteConfirm: defineMessage({
    id: 'components.UserNavLink.deleteConfirm',
    defaultMessage: `Are you sure you want to delete the saved user?`,
  }),
};

export interface UserNavLinkProps extends NavLinkProps {
  user: User;
  onDelete(userId: User['id']): void;
  onUpdate(userId: User['id'], update: Pick<User, 'customName'>): void;
}

export function UserNavLink({
  user,
  onDelete,
  onUpdate,
  className,
  activeClassName,
  ...props
}: UserNavLinkProps) {
  const intl = useIntl();
  const userPresenter = new UserPresenter(user);
  const [isActionsVisible, setIsActionsVisible] = React.useState(false);

  return (
    <div className={classNames(className, styles.wrapper)}>
      <NavLink
        {...props}
        className={styles.navLink}
        activeClassName={classNames(activeClassName, styles.isSelected)}
      >
        <UserAvatar className={styles.picture} userPresenter={userPresenter} />
        <div className={styles.content}>
          <div className={styles.headline}>
            <p className={styles.name}>{userPresenter.name}</p>
            <time
              className={styles.addedAt}
              dateTime={user.addedAt.toISOString()}
            >
              {userPresenter.addedAt}
            </time>
          </div>
          <dl className={styles.id}>
            <dt>
              <FormattedMessage
                id="components.UserNavLink.userIdTerm"
                defaultMessage="User ID:"
              />
            </dt>
            <dd>
              <CopiedValue
                value={user.id}
                onClick={(event) => {
                  event.preventDefault();
                }}
              >
                {userPresenter.id}
              </CopiedValue>
            </dd>
          </dl>
        </div>
      </NavLink>
      <ActionsGroup
        className={classNames(styles.actions, {
          [styles.isActionsVisible]: isActionsVisible,
        })}
        onFocus={() => setIsActionsVisible(true)}
        onBlur={() => setIsActionsVisible(false)}
      >
        <ActionsGroup.Button
          title={intl.formatMessage({
            id: 'components.UserNavLink.changeNameAction',
            defaultMessage: 'Change name',
          })}
          icon={<SvgIcon icon={Icons.pencilIcon} />}
          onClick={() => {
            const customName = window.prompt(
              intl.formatMessage(messages.namePrompt),
              userPresenter.name
            );
            if (customName && customName !== userPresenter.name) {
              onUpdate(user.id, { customName });
            }
          }}
        />
        <ActionsGroup.Button
          title={intl.formatMessage({
            id: 'components.UserNavLink.deleteAction',
            defaultMessage: 'Delete',
          })}
          icon={<SvgIcon icon={Icons.trashIcon} />}
          onClick={() => {
            if (window.confirm(intl.formatMessage(messages.deleteConfirm))) {
              onDelete(user.id);
            }
          }}
        />
      </ActionsGroup>
    </div>
  );
}
