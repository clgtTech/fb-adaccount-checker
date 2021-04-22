import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { FormattedMessage, useIntl } from 'react-intl';
import { Alert, Icons, NonIdealStateView, SvgIcon } from 'draft-components';
import { AsyncStatus } from '../../types';
import { RouteUrls } from './route-urls';
import { AdAccount, Adset, Campaign } from '../../stores/entities';
import { adStore } from '../../stores';
import { Messages } from '../../services/intl';
import { AdsWorkspace } from './ads-workspace';
import { AdCard } from '../../components/ad-card';

export interface AdsProps {
  adAccount: AdAccount;
  campaign: Campaign;
  adset: Adset;
  urls: RouteUrls;
}

export const Ads = mobxReact.observer(function Ads({
  adAccount,
  campaign,
  adset,
  urls,
}: AdsProps) {
  const intl = useIntl();
  const ads = adStore.getAds(adAccount, { adsetId: adset.id });

  return (
    <AdsWorkspace
      adAccount={adAccount}
      title={intl.formatMessage(Messages.Entities.ads)}
      backLinkUrl={urls.getAdsetsUrl(campaign.id)}
      searchBarPlaceholder={intl.formatMessage({
        id: 'screens.AdAccountExplore.Ads.searchFieldPlaceholder',
        defaultMessage: `Search Ads by name`,
      })}
      toolbarSlot={
        adStore.getAdsInsightsLoadStatus(adAccount) === AsyncStatus.error ? (
          <Alert appearance="error" shouldShowIcon={true}>
            <FormattedMessage
              id="screens.AdAccountExplore.Ads.insightsLoadingFailed"
              defaultMessage="Failed to load ads insights for the selected period. Try to refresh the page."
            />
          </Alert>
        ) : null
      }
    >
      {({ searchLowerCased }) => {
        if (!ads.length) {
          return (
            <NonIdealStateView
              icon={<SvgIcon size="4x" icon={Icons.document} />}
              heading={intl.formatMessage({
                id: 'screens.AdAccountExplore.Ads.noAdsTitle',
                defaultMessage: `No ads found`,
              })}
              description={intl.formatMessage({
                id: 'screens.AdAccountExplore.Ads.noAdsDescription',
                defaultMessage: `This ad set does not have any ads. Try to select another ad set.`,
              })}
            />
          );
        }

        return (
          <ul>
            {ads
              .filter((ad) => ad.name.toLowerCase().includes(searchLowerCased))
              .map((ad) => (
                <li key={ad.id}>
                  <AdCard adAccount={adAccount} ad={ad} />
                </li>
              ))}
          </ul>
        );
      }}
    </AdsWorkspace>
  );
});
