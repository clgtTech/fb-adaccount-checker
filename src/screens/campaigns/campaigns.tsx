import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { useIntl } from 'react-intl';
import { useRouteMatch } from 'react-router-dom';
import {
  NonIdealStateView,
  SvgIcon,
  Icons,
  SearchField,
} from 'draft-components';
import { AdAccount, Campaign } from '../../stores/entities';
import { campaignStore } from '../../stores';
import { Messages } from '../../services/intl';
import { CampaignCard } from '../../components/campaign-card';
import { Workspace } from './workspace';

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
  const campaigns = campaignStore.getAdAccountCampaigns(adAccount);

  return (
    <Workspace
      title={intl.formatMessage(Messages.Entities.campaigns)}
      searchBarSlot={
        <SearchField
          hasFullWidth={true}
          placeholder={intl.formatMessage({
            id: 'screens.Campaigns.searchFieldPlaceholder',
            defaultMessage: `Search Campaigns by name`,
          })}
        />
      }
    >
      {(function () {
        if (!campaigns.length) {
          return (
            <NonIdealStateView
              icon={<SvgIcon size="4x" icon={Icons.folder} />}
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
          <ul>
            {campaigns.map((campaign) => (
              <li key={campaign.id}>
                <CampaignCard
                  adAccount={adAccount}
                  campaign={campaign}
                  getLinkToAdsets={getLinkToAdsets}
                />
              </li>
            ))}
          </ul>
        );
      })()}
    </Workspace>
  );
});
