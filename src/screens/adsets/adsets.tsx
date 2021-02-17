import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { useIntl } from 'react-intl';
import { useRouteMatch } from 'react-router-dom';
import { NonIdealStateView, SvgIcon, Icons } from 'draft-components';
import { AdAccount, Campaign, Adset } from '../../stores/entities';
import { adsetStore } from '../../stores';
import { AdsetCard } from '../../components/adset-card';
import styles from '../campaigns/campaigns.module.scss';

export interface AdsetsProps {
  adAccount: AdAccount;
  campaign: Campaign;
}

export const Adsets = mobxReact.observer(function Adsets({
  adAccount,
  campaign,
}: AdsetsProps) {
  const intl = useIntl();
  const { url } = useRouteMatch();
  const getLinkToAds = React.useMemo(() => {
    const baseUrl = url.replace(/\/*$/, '');
    return (adsetId: Adset['id']) => `${baseUrl}/${adsetId}/ads`;
  }, [url]);
  const campaignAdsets = adsetStore.filter(
    (adset) => adset.campaignId === campaign.id
  );

  if (campaignAdsets.length < 1) {
    return (
      <NonIdealStateView
        icon={<SvgIcon size="4x" icon={Icons.stack} />}
        title={intl.formatMessage({
          id: 'screens.Adsets.noAdsets.title',
          defaultMessage: `No ad sets found`,
        })}
        description={intl.formatMessage({
          id: 'screens.Adsets.noAdsets.description',
          defaultMessage: `This campaign does not have any ad sets. Try to select another campaign.`,
        })}
      />
    );
  }

  return (
    <ol className={styles.list}>
      {campaignAdsets.map((adset) => (
        <li key={adset.id}>
          <AdsetCard
            adAccount={adAccount}
            adset={adset}
            getLinkToAds={getLinkToAds}
          />
        </li>
      ))}
    </ol>
  );
});
