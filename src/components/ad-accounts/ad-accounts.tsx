import type { AdAccount, User, Page } from 'common-types';
import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import { formatISODate } from 'shared/formatters';
import { useAdAccounts } from 'context/ad-account-context';
import { Loader } from 'components/loader';
import { FacebookError } from 'components/facebook-error';
import { NonIdealState } from 'components/non-ideal-state';
import { SectionTitle } from 'components/section-title';
import { AdAccountsList } from 'components/ad-accounts-list';
import { Ads } from 'components/ads';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons/faFileDownload';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons/faLayerGroup';
import styles from './ad-accounts.module.css';

export type AdAccountsProps = {
  className?: string;
  user: User;
  userPages: Map<string, Page>;
};

export function AdAccounts({ className, user, userPages }: AdAccountsProps) {
  const { isLoading, isError, adAccounts, adAccountsLoadError } = useAdAccounts(
    user
  );
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const selectedAdAccount = useMemo(() => {
    return adAccounts.find((adAccount) => adAccount.id === selectedAccountId);
  }, [adAccounts, selectedAccountId]);

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
          <a
            className={styles.downloadLink}
            title="Экспортировать аккаунты"
            href={generateCsvObjectUrl(adAccounts)}
            download={`ad-accounts-${formatISODate(new Date())}.csv`}
          >
            <FontAwesomeIcon icon={faFileDownload} />
          </a>
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
          {selectedAdAccount ? (
            <Ads
              accessToken={user.accessToken}
              adAccount={selectedAdAccount}
              userPages={userPages}
            />
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

function generateCsvObjectUrl(adAccounts: AdAccount[]): string {
  let contents = '"Account Name","Account ID","Currency","Amount Spent"\n';
  adAccounts.forEach((adAccount) => {
    contents += `\n"${adAccount.name}","${adAccount.accountId}","${adAccount.currency}","${adAccount.spend}"`;
  });
  return URL.createObjectURL(new Blob([contents], { type: 'text/plain' }));
}
