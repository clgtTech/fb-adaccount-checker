import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { classNames, Badge, SvgIcon } from 'draft-components';
import { AdAccount } from '../../stores/ad-account-store';
import { AdAccountPresenter } from '../../presenters/ad-account-presenter';
import { CopiedValue } from '../copied-value';
import styles from './ad-account-nav-link.module.scss';

export interface AdAccountNavLinkProps extends NavLinkProps {
  adAccount: AdAccount;
}

export function AdAccountNavLink({
  adAccount,
  className,
  activeClassName,
  ...props
}: AdAccountNavLinkProps) {
  const adAccountPresenter = new AdAccountPresenter(adAccount);
  return (
    <NavLink
      {...props}
      className={classNames(
        className,
        styles.container,
        adAccountPresenter.isActive && styles.isActive
      )}
      activeClassName={classNames(activeClassName, styles.isSelected)}
    >
      <svg
        className={styles.statusIndicator}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        width={20}
        height={20}
      >
        <circle r={10} cx={10} cy={10} />
      </svg>
      <div className={styles.body}>
        <div className={styles.headline}>
          <h3 className={styles.name}>{adAccountPresenter.name}</h3>
          <span className={styles.spend}>{adAccountPresenter.spend}</span>
        </div>

        <CopiedValue
          className={styles.accountId}
          value={adAccountPresenter.id}
          onClick={(event) => event.preventDefault()}
        >
          <FormattedMessage
            id="components.AdAccountNavLink.accountId"
            defaultMessage="Account ID: {accountId}"
            values={adAccountPresenter}
          />
        </CopiedValue>

        <dl className={styles.meta}>
          <dt>
            <FormattedMessage
              id="components.AdAccountNavLink.status"
              defaultMessage="Status:"
            />
          </dt>
          <dd>
            {adAccountPresenter.status}{' '}
            {adAccountPresenter.shouldShowDisableReason
              ? `(${adAccountPresenter.disableReason})`
              : null}
          </dd>

          <dt>
            <FormattedMessage
              id="components.AdAccountNavLink.ctr"
              defaultMessage="CTR:"
            />
          </dt>
          <dd>{adAccountPresenter.ctr}</dd>
        </dl>
      </div>
    </NavLink>
  );
}
