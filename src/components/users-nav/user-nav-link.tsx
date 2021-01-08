import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { classNames, Avatar, ActionsGroup, SvgIcon } from 'draft-components';
import { CopiedValue } from '../copied-value';
import styles from './user-nav-link.module.scss';

export const messages = {
  nameChange: 'Введите новое имя для сохранённого пользователя:',
  deleteConfirm: 'Вы действительно хотите удалить сохранённого пользователя?',
};

export type UserNavLinkBaseProps = Pick<
  NavLinkProps,
  'to' | 'className' | 'activeClassName'
>;

export interface UserNavLinkProps extends UserNavLinkBaseProps {
  id: string;
  name: string;
  pictureUrl?: string;
  addedAt: Date;
  onDelete(): void;
  onNameChange(name: string): void;
}

export function UserNavLink({
  to,
  id,
  name,
  pictureUrl,
  addedAt,
  className,
  activeClassName,
  onDelete,
  onNameChange,
}: UserNavLinkProps) {
  const intl = useIntl();
  const [isActionsVisible, setIsActionsVisible] = React.useState(false);

  return (
    <div className={classNames(className, styles.wrapper)}>
      <NavLink
        to={to}
        className={styles.navLink}
        activeClassName={classNames(activeClassName, styles.isNavLinkActive)}
      >
        <Avatar
          className={styles.picture}
          size="lg"
          src={pictureUrl}
          altText={name}
          initials={nameToInitials(name)}
        />
        <div className={styles.content}>
          <div className={styles.headline}>
            <p className={styles.name}>{name}</p>
            <time className={styles.addedAt} dateTime={addedAt.toISOString()}>
              {intl.formatDate(addedAt, {
                year: '2-digit',
                month: 'short',
                day: 'numeric',
              })}
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
                value={id}
                onClick={(event) => {
                  event.preventDefault();
                }}
              />
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
            const newName = window.prompt(messages.nameChange, name);
            if (newName && newName !== name) {
              onNameChange(newName);
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
            if (window.confirm(messages.deleteConfirm)) {
              onDelete();
            }
          }}
        />
      </ActionsGroup>
    </div>
  );
}

function nameToInitials(name: string): string {
  return name
    .split(/ +/)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}
