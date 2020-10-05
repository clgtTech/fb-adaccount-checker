import type { User } from 'common-types';
import React, { useState } from 'react';
import classNames from 'classnames';
import { useAdAccounts } from 'context/ad-account-context';
import { Loader } from 'components/loader';
import { FacebookError } from 'components/facebook-error';
import { NonIdealState } from 'components/non-ideal-state';
import { SectionTitle } from 'components/section-title';
import { AdAccountsList } from 'components/ad-accounts-list';
import { Ads } from 'components/ads';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons/faLayerGroup';
import styles from './ad-accounts.module.css';

export type AdAccountsProps = {
  className?: string;
  user: User;
};

export function AdAccounts({ className, user }: AdAccountsProps) {
  const { isLoading, isError, adAccounts, adAccountsLoadError } = useAdAccounts(
    user
  );
  const [selectedAccountId, setSelectedAccountId] = useState('');

  if (isLoading) {
    return <Loader>Загрузка рекламных аккаунтов...</Loader>;
  }

  if (isError && adAccountsLoadError) {
    return <FacebookError error={adAccountsLoadError} />;
  }

  return (
    <div className={classNames(className, styles.container)}>
      <div>
        <SectionTitle className={styles.adAccountsTitle}>
          Рекламные аккаунты
        </SectionTitle>
        <AdAccountsList
          adAccounts={adAccounts}
          selectedAccountId={selectedAccountId}
          onAdAccountSelect={setSelectedAccountId}
        />
      </div>
      <div>
        <SectionTitle className={styles.adsTitle}>Объявления</SectionTitle>
        <div className={styles.adsContents}>
          {selectedAccountId ? (
            <Ads accessToken={user.accessToken} accountId={selectedAccountId} />
          ) : (
            <NonIdealState
              className={styles.noAds}
              icon={faLayerGroup}
              title="Выберите рекламный аккаунт, чтобы посмотреть его объявления."
            />
          )}
        </div>
      </div>
    </div>
  );
}
