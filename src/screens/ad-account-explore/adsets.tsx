import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { FormattedMessage, useIntl } from 'react-intl';
import { Alert, Icons, NonIdealStateView, SvgIcon } from 'draft-components';
import { AsyncStatus } from '../../types';
import { RouteUrls } from './route-urls';
import { AdAccount, Campaign } from '../../stores/entities';
import { adsetStore } from '../../stores';
import { Messages } from '../../services/intl';
import { AdsWorkspace } from './ads-workspace';
import { AdsetCard } from '../../components/adset-card';

export interface AdsetsProps {
  adAccount: AdAccount;
  campaign: Campaign;
  urls: RouteUrls;
}

export const Adsets = mobxReact.observer(function Adsets({
  adAccount,
  campaign,
  urls,
}: AdsetsProps) {
  const intl = useIntl();
  const adsets = adsetStore.getAdsets(adAccount, { campaignId: campaign.id });

  return (
    <AdsWorkspace
      adAccount={adAccount}
      title={intl.formatMessage(Messages.Entities.adsets)}
      backLinkUrl={urls.getCampaignsUrl()}
      searchBarPlaceholder={intl.formatMessage({
        id: 'screens.AdAccountExplore.Adsets.searchFieldPlaceholder',
        defaultMessage: `Search Ad Sets by name`,
      })}
      toolbarSlot={
        adsetStore.getAdsetsInsightsLoadStatus(adAccount) ===
        AsyncStatus.error ? (
          <Alert appearance="error" shouldShowIcon={true}>
            <FormattedMessage
              id="screens.AdAccountExplore.Adsets.insightsLoadingFailed"
              defaultMessage="Failed to load ad sets insights for the selected period. Try to refresh the page."
            />
          </Alert>
        ) : null
      }
    >
      {({ searchLowerCased }) => {
        if (!adsets.length) {
          return (
            <NonIdealStateView
              icon={<SvgIcon size="4x" icon={Icons.stack} />}
              title={intl.formatMessage({
                id: 'screens.AdAccountExplore.Adsets.noAdsetsTitle',
                defaultMessage: `No ad sets found`,
              })}
              description={intl.formatMessage({
                id: 'screens.AdAccountExplore.Adsets.noAdsetsDescription',
                defaultMessage: `This campaign does not have any ad sets. Try to select another campaign.`,
              })}
            />
          );
        }

        return (
          <ul>
            {adsets
              .filter((adset) =>
                adset.name.toLowerCase().includes(searchLowerCased)
              )
              .map((adset) => (
                <li key={adset.id}>
                  <AdsetCard
                    adAccount={adAccount}
                    adset={adset}
                    adsUrl={urls.getAdsUrl(campaign.id, adset.id)}
                  />
                </li>
              ))}
          </ul>
        );
      }}
    </AdsWorkspace>
  );
});
