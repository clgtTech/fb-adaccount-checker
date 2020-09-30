import type { AdAccount } from 'common-types';
import type { AdAccountItemProps } from 'components/ad-account-item';
import React from 'react';
import classNames from 'classnames';
import { AdAccountItem } from 'components/ad-account-item';
import styles from './ad-accounts-list.module.css';

export type AdAccountsListProps = {
  className?: string;
  adAccounts: AdAccount[];
  selectedAccountId: string;
  onAdAccountSelect: AdAccountItemProps['onSelect'];
};

export function AdAccountsList({
  className,
  adAccounts,
  selectedAccountId,
  onAdAccountSelect,
}: AdAccountsListProps) {
  return (
    <ul className={classNames(className, styles.container)}>
      {adAccounts.map((adAccount) => (
        <li key={adAccount.id}>
          <AdAccountItem
            isSelected={adAccount.id === selectedAccountId}
            adAccount={adAccount}
            onSelect={onAdAccountSelect}
          />
        </li>
      ))}
    </ul>
  );
}
