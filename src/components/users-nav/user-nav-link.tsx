import * as React from 'react';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { classNames, Avatar, ActionsGroup, SvgIcon } from 'draft-components';
import { CopiedValue } from '../copied-value';
import { User } from '../../stores/user-store';
import { UserPresenter } from '../../presenters/user-presenter';
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
  onNameChange(userId: User['id'], name: string): void;
}

export function UserNavLink({
  user,
  onDelete,
  onNameChange,
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
        <Avatar
          className={styles.picture}
          size="lg"
          src={userPresenter.pictureUrl}
          altText={userPresenter.name}
          initials={userPresenter.initials}
        />
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
          icon={<SvgIcon icon="pencil" />}
          onClick={() => {
            const name = window.prompt(
              intl.formatMessage(messages.namePrompt),
              userPresenter.name
            );
            if (name && name !== userPresenter.name) {
              onNameChange(user.id, name);
            }
          }}
        />
        <ActionsGroup.Button
          title={intl.formatMessage({
            id: 'components.UserNavLink.deleteAction',
            defaultMessage: 'Delete',
          })}
          icon={<SvgIcon icon="trash" />}
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
