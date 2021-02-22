import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { FormattedMessage, useIntl } from 'react-intl';
import { Alert, NonIdealStateView, SvgIcon, Icons } from 'draft-components';
import { AsyncStatus } from '../../types';
import { RouteUrls } from './route-urls';
import { AdAccount } from '../../stores/entities';
import { campaignStore } from '../../stores';
import { Messages } from '../../services/intl';
import { AdsWorkspace } from './ads-workspace';
import { CampaignCard } from '../../components/campaign-card';

export interface CampaignsProps {
  adAccount: AdAccount;
  urls: RouteUrls;
}

export const Campaigns = mobxReact.observer(function Campaigns({
  adAccount,
  urls,
}: CampaignsProps) {
  const intl = useIntl();
  const campaigns = campaignStore.getCampaigns(adAccount);

  return (
    <AdsWorkspace
      adAccount={adAccount}
      title={intl.formatMessage(Messages.Entities.campaigns)}
      searchBarPlaceholder={intl.formatMessage({
        id: 'screens.AdAccountExplore.Campaigns.searchFieldPlaceholder',
        defaultMessage: `Search Campaigns by name`,
      })}
      toolbarSlot={
        campaignStore.getCampaignsInsightsLoadStatus(adAccount) ===
        AsyncStatus.error ? (
          <Alert appearance="error" shouldShowIcon={true}>
            <FormattedMessage
              id="screens.AdAccountExplore.Campaigns.insightsLoadingFailed"
              defaultMessage="Failed to load campaigns insights for the selected period. Try to refresh the page."
            />
          </Alert>
        ) : null
      }
    >
      {({ searchLowerCased }) => {
        if (!campaigns.length) {
          return (
            <NonIdealStateView
              icon={<SvgIcon size="4x" icon={Icons.folder} />}
              title={intl.formatMessage({
                id: 'screens.AdAccountExplore.Campaigns.noCampaignsTitle',
                defaultMessage: `No campaigns found`,
              })}
              description={intl.formatMessage({
                id: 'screens.AdAccountExplore.Campaigns.noCampaignsDescription',
                defaultMessage: `This ad account does not have any campaigns. Try to select another account.`,
              })}
            />
          );
        }

        return (
          <ul>
            {campaigns
              .filter((campaign) =>
                campaign.name.toLowerCase().includes(searchLowerCased)
              )
              .map((campaign) => (
                <li key={campaign.id}>
                  <CampaignCard
                    adAccount={adAccount}
                    campaign={campaign}
                    adsetsUrl={urls.getAdsetsUrl(campaign.id)}
                  />
                </li>
              ))}
          </ul>
        );
      }}
    </AdsWorkspace>
  );
});
