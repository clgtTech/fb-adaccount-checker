import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { useIntl } from 'react-intl';
import { useRouteMatch } from 'react-router-dom';
import { NonIdealStateView, SvgIcon, Icons } from 'draft-components';
import { AdAccount, Campaign } from '../../stores/entities';
import { campaignStore } from '../../stores';
import { CampaignCard } from '../../components/campaign-card';
import styles from './campaigns.module.scss';

export interface CampaignsProps {
  adAccount: AdAccount;
}

export const Campaigns = mobxReact.observer(function Campaigns({
  adAccount,
}: CampaignsProps) {
  const intl = useIntl();
  const { url } = useRouteMatch();
  const getLinkToAdsets = React.useMemo(() => {
    const baseUrl = url.replace(/\/*$/, '');
    return (campaignId: Campaign['id']) => `${baseUrl}/${campaignId}/adsets`;
  }, [url]);

  if (campaignStore.isEmpty) {
    return (
      <NonIdealStateView
        icon={<SvgIcon size="4x" icon={Icons.folderIcon} />}
        title={intl.formatMessage({
          id: 'screens.Campaigns.noCampaigns.title',
          defaultMessage: `No campaigns found`,
        })}
        description={intl.formatMessage({
          id: 'screens.Campaigns.noCampaigns.description',
          defaultMessage: `This ad account does not have any campaigns. Try to select another account.`,
        })}
      />
    );
  }

  return (
    <ol className={styles.list}>
      {campaignStore.map((campaign) => (
        <li key={campaign.id}>
          <CampaignCard
            adAccount={adAccount}
            campaign={campaign}
            getLinkToAdsets={getLinkToAdsets}
          />
        </li>
      ))}
    </ol>
  );
});
