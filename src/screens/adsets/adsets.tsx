import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { Link, useRouteMatch } from 'react-router-dom';
import { AdAccount } from '../../stores/ad-account-store';
import { Campaign } from '../../stores/campaign-store';
import { Adset } from '../../stores/adset-store';
import { adsetStore } from '../../stores';
import styles from './adsets.module.scss';

export interface AdsetsProps {
  adAccount: AdAccount;
  campaign: Campaign;
}

export const Adsets = mobxReact.observer(function Adsets({
  campaign,
}: AdsetsProps) {
  const { url } = useRouteMatch();
  const linkToAds = React.useMemo(() => {
    const baseUrl = url.replace(/\/*$/, '');
    return (adsetId: Adset['id']) => `${baseUrl}/${adsetId}/ads`;
  }, [url]);
  return (
    <ol className={styles.list}>
      {adsetStore
        .filter((adset) => adset.campaignId === campaign.id)
        .map((adset) => (
          <li key={adset.id}>
            <Link to={linkToAds(adset.id)}>
              Adset: {adset.name} #{adset.id}
            </Link>
          </li>
        ))}
    </ol>
  );
});
