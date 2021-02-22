import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { FormattedMessage } from 'react-intl';
import { Route, Redirect, Switch, useParams } from 'react-router-dom';
import { LoadingView } from 'draft-components';
import { AsyncStatus } from '../../types';
import { AdAccount } from '../../stores/entities';
import { ROUTES } from '../../constants';
import { adsetStore, adStore, campaignStore, commentStore } from '../../stores';
import { useRouteUrls, RouteParams } from './route-urls';
import { ErrorView } from '../../components/error-view';
import { Campaigns } from './campaigns';
import { Adsets } from './adsets';
import { Ads } from './ads';
import styles from './ad-account-explore.module.scss';

export interface AdAccountExploreProps {
  adAccount: AdAccount;
}

export const AdAccountExplore = mobxReact.observer(function AdAccountReview({
  adAccount,
}: AdAccountExploreProps) {
  const params = useParams<RouteParams>();
  const urls = useRouteUrls(params);
  const selectedCampaign = params.campaignId
    ? campaignStore.getById(params.campaignId)
    : undefined;
  const selectedAdset = params.adsetId
    ? adsetStore.getById(params.adsetId)
    : undefined;

  function isLoading(status: AsyncStatus): boolean {
    return status === AsyncStatus.idle || status === AsyncStatus.pending;
  }

  React.useEffect(() => {
    if (campaignStore.canStartLoading(adAccount)) {
      campaignStore.loadCampaigns(adAccount);
    }
    if (selectedCampaign && adsetStore.canStartLoading(adAccount)) {
      adsetStore.loadAdsets(adAccount);
    }
    if (selectedAdset && adStore.canStartLoading(adAccount)) {
      adStore.loadAds(adAccount);
    }
  }, [adAccount, selectedCampaign, selectedAdset]);

  React.useEffect(() => {
    return () => {
      campaignStore.clear();
      adsetStore.clear();
      adStore.clear();
      commentStore.clear();
    };
  }, [adAccount]);

  return (
    <div className={styles.container}>
      {(function () {
        if (isLoading(campaignStore.getCampaignsLoadStatus(adAccount))) {
          return (
            <LoadingView>
              <FormattedMessage
                id="screens.AdAccountExplore.loadingCampaigns"
                defaultMessage="Loading Campaigns..."
              />
            </LoadingView>
          );
        } else if (
          selectedCampaign &&
          isLoading(adsetStore.getAdsetsLoadStatus(adAccount))
        ) {
          return (
            <LoadingView>
              <FormattedMessage
                id="screens.AdAccountExplore.loadingAdsets"
                defaultMessage="Loading Ad Sets..."
              />
            </LoadingView>
          );
        } else if (
          selectedAdset &&
          isLoading(adStore.getAdsLoadStatus(adAccount))
        ) {
          return (
            <LoadingView>
              <FormattedMessage
                id="screens.AdAccountExplore.loadingAds"
                defaultMessage="Loading Ads..."
              />
            </LoadingView>
          );
        }

        const loadError =
          campaignStore.getCampaignsLoadError(adAccount) ||
          (selectedCampaign && adsetStore.getAdsetsLoadError(adAccount)) ||
          (selectedAdset && adStore.getAdsLoadError(adAccount));
        if (loadError) {
          return <ErrorView error={loadError} />;
        }

        return (
          <Switch>
            <Route
              exact={true}
              path={ROUTES.campaigns}
              render={() => <Campaigns adAccount={adAccount} urls={urls} />}
            />
            <Route
              exact={true}
              path={ROUTES.adsets}
              render={() => {
                if (!selectedCampaign) {
                  return <Redirect to={urls.getCampaignsUrl()} />;
                }
                return (
                  <Adsets
                    adAccount={adAccount}
                    campaign={selectedCampaign}
                    urls={urls}
                  />
                );
              }}
            />
            <Route
              exact={true}
              path={ROUTES.ads}
              render={() => {
                if (!selectedCampaign) {
                  return <Redirect to={urls.getCampaignsUrl()} />;
                }
                if (!selectedAdset) {
                  return (
                    <Redirect to={urls.getAdsetsUrl(selectedCampaign.id)} />
                  );
                }
                return (
                  <Ads
                    adAccount={adAccount}
                    campaign={selectedCampaign}
                    adset={selectedAdset}
                    urls={urls}
                  />
                );
              }}
            />
          </Switch>
        );
      })()}
    </div>
  );
});
