import type { AdAccount } from 'common-types';
import React from 'react';
import classNames from 'classnames';
import { AccountDisableReason, AccountStatus } from 'enums';
import { copyToClipboard } from 'shared/util';
import { formatMonetaryValue } from 'shared/formatters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons/faCopy';
import styles from './ad-account-item.module.css';

export type AdAccountItemProps = {
  className?: string;
  isSelected?: boolean;
  adAccount: AdAccount;
  onSelect: (id: string) => void;
};

export function AdAccountItem({
  className,
  isSelected,
  adAccount,
  onSelect,
}: AdAccountItemProps) {
  const status = AccountStatus[adAccount.status];
  let icon;
  switch (adAccount.status) {
    case AccountStatus.ACTIVE:
    case AccountStatus.ANY_ACTIVE:
      icon = faCheckCircle;
      break;
    case AccountStatus.ANY_CLOSED:
    case AccountStatus.CLOSED:
    case AccountStatus.DISABLED:
      icon = faBan;
      break;
    case AccountStatus.IN_GRACE_PERIOD:
    case AccountStatus.PENDING_CLOSURE:
    case AccountStatus.PENDING_RISK_REVIEW:
    case AccountStatus.PENDING_SETTLEMENT:
    case AccountStatus.UNSETTLED:
    default:
      icon = faClock;
  }

  return (
    <article
      className={classNames(
        className,
        styles.container,
        styles[`container_${status}`],
        { [styles.container_isSelected]: isSelected }
      )}
      tabIndex={0}
      onClick={() => onSelect(adAccount.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          onSelect(adAccount.id);
        }
      }}
    >
      <h3 className={styles.name}>
        <FontAwesomeIcon className={styles.icon} icon={icon} />
        {adAccount.name}
      </h3>

      <dl className={styles.metadata}>
        <div className={styles.metadataGroup}>
          <dt className={styles.metadataTerm}>Аккаунт №</dt>
          <dd
            className={classNames(
              styles.metadataDefinition,
              styles.metadataDefinition_canCopy
            )}
            tabIndex={0}
            onClick={(event) => {
              event.stopPropagation();
              copyToClipboard(adAccount.accountId);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.stopPropagation();
                event.preventDefault();
                copyToClipboard(adAccount.accountId);
              }
            }}
          >
            {adAccount.accountId}
            <FontAwesomeIcon icon={faCopy} />
          </dd>
        </div>

        <div className={styles.metadataGroup}>
          <dt className={styles.metadataTerm}>Статус</dt>
          <dd className={styles.metadataDefinition}>
            <code>
              {adAccount.status === AccountStatus.DISABLED
                ? `${status} (${AccountDisableReason[adAccount.disableReason]})`
                : status}
            </code>
          </dd>
        </div>

        <div
          className={classNames(
            styles.metadataGroup,
            styles.metadataGroup_important
          )}
        >
          <dt className={styles.metadataTerm}>Спенд</dt>
          <dd className={styles.metadataDefinition}>
            {formatMonetaryValue(adAccount.spend, adAccount.currency)}
          </dd>
        </div>
      </dl>
    </article>
  );
}
