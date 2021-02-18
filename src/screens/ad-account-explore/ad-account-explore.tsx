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
import { adsetStore, adStore, campaignStore, commentStore } from '../../stores';
import { ErrorView } from '../../components/error-view';
import { AdObjectsNav } from './ad-objects-nav';
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
  const params = useParams<AdAccountExploreParams>();
  const history = useHistory();

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

  const activeCampaign = campaignStore.getCampaign(params.campaignId);
  const activeAdset = adsetStore.getAdset(params.adsetId);
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
    };
  }, [adAccount]);

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
    <div className={styles.container}>
      <AdObjectsNav
        className={styles.navigation}
        params={params}
        campaign={activeCampaign}
        adset={activeAdset}
      />
      <div className={styles.content}>
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
                  <Adsets adAccount={adAccount} campaign={activeCampaign} />
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
                  />
                );
              }
            }}
          />
        </Switch>
      </div>
    </div>
  );
});
