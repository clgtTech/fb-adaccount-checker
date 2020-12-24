import type { AdAccount, Page } from 'common-types';
import * as React from 'react';
import classNames from 'classnames';
import { useAds, useUpdateAd } from 'context/ads-context';
import { Loader } from '_deprecated-components/loader';
import { FacebookError } from '_deprecated-components/facebook-error';
import { NonIdealState } from '_deprecated-components/non-ideal-state';
import { AdItem } from '_deprecated-components/ad-item';
import { Comments } from '_deprecated-components/comments';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons/faFolderOpen';
import styles from './ads.module.css';

export type AdsProps = {
  className?: string;
  accessToken: string;
  adAccount: AdAccount;
  userPages: Map<string, Page>;
};

export function Ads({
  className,
  accessToken,
  adAccount,
  userPages,
}: AdsProps) {
  const { isLoading, isError, ads, adsLoadError } = useAds(
    accessToken,
    adAccount.id
  );
  const [updateAd] = useUpdateAd({
    onError: (error) => {
      alert(
        error.response?.data.error.error_user_msg ||
          'Не удалось обновить рекламное объявление.'
      );
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
              ad={ad}
              adAccount={adAccount}
              onAdUpdate={async (update) => {
                await updateAd({ adId: ad.id, accessToken, update });
              }}
            />
            <Comments
              className={styles.comments}
              accessToken={accessToken}
              pagePostId={ad.creativePagePostId}
              page={userPages.get(ad.creativePagePostId.split('_')[0])}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
