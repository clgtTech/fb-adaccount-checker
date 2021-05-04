import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { classNames, ActionsGroup, SvgIcon, Icons } from 'draft-components';
import { User } from '../../stores/entities';
import { UserPresenter } from '../../presenters/user-presenter';
import { CommonTexts } from '../../services/intl/messages';
import { CopiedValue } from '../copied-value';
import { UserAvatar } from './user-avatar';
import styles from './user-nav-link.module.scss';

export interface UserNavLinkProps extends NavLinkProps {
  user: User;
  onDelete(user: User): void;
  onUpdate(user: User): void;
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
              dateTime={userPresenter.addedAtISO}
            >
              {userPresenter.addedAt}
            </time>
          </div>
          <dl className={styles.id}>
            <dt>
              <FormattedMessage
                id="components.UserNavLink.userIdTerm"
                defaultMessage="ID:"
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
        className={classNames(
          styles.actions,
          styles.isActionsVisible && isActionsVisible
        )}
        onFocus={() => setIsActionsVisible(true)}
        onBlur={() => setIsActionsVisible(false)}
      >
        <ActionsGroup.Button
          title={intl.formatMessage(CommonTexts.editButton)}
          icon={<SvgIcon icon={Icons.pencil} />}
          onClick={() => onUpdate(user)}
        />
        <ActionsGroup.Button
          title={intl.formatMessage(CommonTexts.deleteButton)}
          icon={<SvgIcon icon={Icons.trash} />}
          onClick={() => onDelete(user)}
        />
      </ActionsGroup>
    </div>
  );
}
