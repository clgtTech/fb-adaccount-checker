import React from 'react';
import classNames from 'classnames';
import { useAds } from 'context/ads-context';
import { Loader } from 'components/loader';
import { FacebookError } from 'components/facebook-error';
import { NonIdealState } from 'components/non-ideal-state';
import { AdItem } from 'components/ad-item';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons/faFolderOpen';
import styles from './ads.module.css';

export type AdsProps = {
  className?: string;
  accessToken: string;
  accountId: string;
};

export function Ads({ className, accessToken, accountId }: AdsProps) {
  const { isLoading, isError, ads, adsLoadError } = useAds(
    accessToken,
    accountId
  );

  if (isLoading) {
    return <Loader>Загрузка объявлений...</Loader>;
  }

  if (isError && adsLoadError) {
    return <FacebookError error={adsLoadError} />;
  }

  if (!ads.length) {
    return (
      <NonIdealState
        icon={faFolderOpen}
        title="У рекламного аккаунта нет объявлений"
      />
    );
  }

  return (
    <div className={classNames(className, styles.container)}>
      <ul className={styles.adsList}>
        {ads.map((ad) => (
          <li key={ad.id}>
            <AdItem ad={ad} />
          </li>
        ))}
      </ul>
    </div>
  );
}
