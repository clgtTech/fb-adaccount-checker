import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { Link, useRouteMatch } from 'react-router-dom';
import { AdAccount } from '../../stores/ad-account-store';
import { Campaign } from '../../stores/campaign-store';
import { campaignStore } from '../../stores';
import styles from './campaigns.module.scss';

export interface CampaignsProps {
  adAccount: AdAccount;
}

export const Campaigns = mobxReact.observer(function Campaigns(
  props: CampaignsProps
) {
  const { url } = useRouteMatch();
  const linkToAdsets = React.useMemo(() => {
    const baseUrl = url.replace(/\/*$/, '');
    return (campaignId: Campaign['id']) => `${baseUrl}/${campaignId}/adsets`;
  }, [url]);
  return (
    <ol className={styles.list}>
      {campaignStore.map((campaign) => (
        <li key={campaign.id}>
          <Link to={linkToAdsets(campaign.id)}>
            Campaign: {campaign.name} #{campaign.id}
          </Link>
        </li>
      ))}
    </ol>
  );
});
