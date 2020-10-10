import type { AdAccount } from 'common-types';
import React from 'react';
import classNames from 'classnames';
import { useAds, useUpdateAd } from 'context/ads-context';
import { Loader } from 'components/loader';
import { FacebookError } from 'components/facebook-error';
import { NonIdealState } from 'components/non-ideal-state';
import { AdItem } from 'components/ad-item';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons/faFolderOpen';
import styles from './ads.module.css';

export type AdsProps = {
  className?: string;
  accessToken: string;
  adAccount: AdAccount;
};

export function Ads({ className, accessToken, adAccount }: AdsProps) {
  const { isLoading, isError, ads, adsLoadError } = useAds(
    accessToken,
    adAccount.id
  );
  const [updateAd] = useUpdateAd({
    onError: (error) => {
      alert(error.response?.data.error.error_user_msg);
    },
  });

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
            <AdItem
              adAccount={adAccount}
              ad={ad}
              onAdUpdate={async (update) => {
                await updateAd({ adId: ad.id, accessToken, update });
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
