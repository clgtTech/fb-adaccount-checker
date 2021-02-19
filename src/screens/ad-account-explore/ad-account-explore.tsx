import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { FormattedMessage } from 'react-intl';
import {
  generatePath,
  Route,
  Switch,
  useHistory,
  useParams,
} from 'react-router-dom';
import { LoadingView } from 'draft-components';
import { AsyncStatus } from '../../types';
import { AdAccountExploreParams } from './route-params';
import { AdAccount } from '../../stores/entities';
import { ROUTES } from '../../constants';
import {
  adsetStore,
  adStore,
  campaignStore,
  commentStore,
  insightsStore,
} from '../../stores';
import { usePagePaths } from './use-page-paths';
import { ErrorView } from '../../components/error-view';
import { Campaigns } from '../campaigns';
import { Adsets } from '../adsets';
import { Ads } from '../ads';
import styles from './ad-account-explore.module.scss';

export interface AdAccountExploreProps {
  adAccount: AdAccount;
}

export const AdAccountExplore = mobxReact.observer(function AdAccountReview({
  adAccount,
}: AdAccountExploreProps) {
  const history = useHistory();
  const params = useParams<AdAccountExploreParams>();
  const activeCampaign = campaignStore.getCampaign(params.campaignId);
  const activeAdset = adsetStore.getAdset(params.adsetId);
  const pagePaths = usePagePaths({
    params,
    campaign: activeCampaign,
    adset: activeAdset,
  });

  function shouldShowLoadingView(status: AsyncStatus): boolean {
    return status === AsyncStatus.idle || status === AsyncStatus.pending;
  }

  function redirectToCampaigns() {
    history.replace(
      generatePath(ROUTES.campaigns, {
        userId: params.userId,
        adAccountId: params.adAccountId,
      })
    );
  }

  function redirectToAdsets() {
    history.replace(
      generatePath(ROUTES.adsets, {
        userId: params.userId,
        adAccountId: params.adAccountId,
        campaignId: params.campaignId,
      })
    );
  }

  React.useEffect(() => {
    if (campaignStore.shouldLoadAdAccountCampaigns(adAccount)) {
      campaignStore.loadAdAccountCampaigns(adAccount);
    }
    if (activeCampaign && adsetStore.shouldLoadCampaignAdsets(activeCampaign)) {
      adsetStore.loadCampaignAdsets(adAccount, activeCampaign);
    }
    if (activeAdset && adStore.shouldLoadAdsetAds(activeAdset)) {
      adStore.loadAdsetAds(activeAdset);
    }
  }, [adAccount, activeCampaign, activeAdset]);
  React.useEffect(() => {
    return () => {
      campaignStore.clear();
      adsetStore.clear();
      adStore.clear();
      commentStore.clear();
      insightsStore.clear();
    };
  }, [adAccount]);

  return (
    <div className={styles.container}>
      {(function () {
        if (
          shouldShowLoadingView(
            campaignStore.getLoadStatusOfAdAccountCampaigns(adAccount)
          )
        ) {
          return (
            <LoadingView>
              <FormattedMessage
                id="screens.AdAccountExplore.loadingCampaigns"
                defaultMessage="Loading Campaigns..."
              />
            </LoadingView>
          );
        } else if (
          activeCampaign &&
          shouldShowLoadingView(
            adsetStore.getLoadStatusOfCampaignAdsets(activeCampaign)
          )
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
          activeAdset &&
          shouldShowLoadingView(adStore.getLoadStatusOfAdsetAds(activeAdset))
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
          campaignStore.getLoadErrorOfAdAccountCampaigns(adAccount) ||
          (activeCampaign &&
            adsetStore.getLoadErrorOfCampaignAdsets(activeCampaign)) ||
          (activeAdset && adStore.getLoadErrorOfAdsetAds(activeAdset));
        if (loadError) {
          return <ErrorView error={loadError} />;
        }

        return (
          <Switch>
            <Route
              path={ROUTES.campaigns}
              exact={true}
              render={() => <Campaigns adAccount={adAccount} />}
            />
            <Route
              path={ROUTES.adsets}
              exact={true}
              render={() => {
                if (activeCampaign == null) {
                  redirectToCampaigns();
                } else {
                  return (
                    <Adsets
                      adAccount={adAccount}
                      campaign={activeCampaign}
                      campaignsPagePath={pagePaths.campaigns}
                    />
                  );
                }
              }}
            />
            <Route
              path={ROUTES.ads}
              exact={true}
              render={() => {
                if (activeCampaign == null) {
                  redirectToCampaigns();
                } else if (activeAdset == null) {
                  redirectToAdsets();
                } else {
                  return (
                    <Ads
                      adAccount={adAccount}
                      campaign={activeCampaign}
                      adset={activeAdset}
                      adsetsPagePath={pagePaths.adsets}
                    />
                  );
                }
              }}
            />
          </Switch>
        );
      })()}
    </div>
  );
});
