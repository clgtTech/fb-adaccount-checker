import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { AdAccount } from '../../stores/ad-account-store';
import { Campaign } from '../../stores/campaign-store';
import { Adset } from '../../stores/adset-store';
import { adStore } from '../../stores';
import styles from './ads.module.scss';

export interface AdsProps {
  adAccount: AdAccount;
  campaign: Campaign;
  adset: Adset;
}

export const Ads = mobxReact.observer(function Ads({ adset }: AdsProps) {
  return (
    <ol className={styles.list}>
      {adStore
        .filter((ad) => ad.adsetId === adset.id)
        .map((ad) => (
          <li key={ad.id}>
            Ad: {ad.name} #{ad.id}
          </li>
        ))}
    </ol>
  );
});
