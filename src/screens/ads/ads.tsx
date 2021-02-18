import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { useIntl } from 'react-intl';
import { NonIdealStateView, SvgIcon, Icons } from 'draft-components';
import { AdAccount, Campaign, Adset } from '../../stores/entities';
import { adStore } from '../../stores';
import { AdCard } from '../../components/ad-card';
import styles from '../campaigns/campaigns.module.scss';

export interface AdsProps {
  adAccount: AdAccount;
  campaign: Campaign;
  adset: Adset;
}

export const Ads = mobxReact.observer(function Ads({
  adAccount,
  adset,
}: AdsProps) {
  const intl = useIntl();
  const ads = adStore.getAdsetAds(adset);

  if (!ads.length) {
    return (
      <NonIdealStateView
        icon={<SvgIcon size="4x" icon={Icons.document} />}
        title={intl.formatMessage({
          id: 'screens.Ads.noAds.title',
          defaultMessage: `No ads found`,
        })}
        description={intl.formatMessage({
          id: 'screens.Ads.noAds.description',
          defaultMessage: `This ad set does not have any ads. Try to select another ad set.`,
        })}
      />
    );
  }

  return (
    <ol className={styles.list}>
      {ads.map((ad) => (
        <li key={ad.id}>
          <AdCard adAccount={adAccount} ad={ad} />
        </li>
      ))}
    </ol>
  );
});
