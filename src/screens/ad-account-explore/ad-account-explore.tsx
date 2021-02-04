import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import {
  Switch,
  Route,
  useHistory,
  useParams,
  generatePath,
} from 'react-router-dom';
import { LoadingView } from 'draft-components';
import { AsyncActionStatus } from '../../types';
import { AdAccountExploreParams } from './route-params';
import { AdAccount } from '../../stores/entities';
import { ROUTES } from '../../constants';
import { adsetStore, adStore, campaignStore } from '../../stores';
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
  const redirectToCampaigns = () => {
    history.replace(
      generatePath(ROUTES.campaigns, {
        userId: params.userId,
        adAccountId: params.adAccountId,
      })
    );
  };
  const redirectToAdsets = () => {
    history.replace(
      generatePath(ROUTES.adsets, {
        userId: params.userId,
        adAccountId: params.adAccountId,
        campaignId: params.campaignId,
      })
    );
  };

  const loadStatus = [
    campaignStore.loadStatus,
    adsetStore.loadStatus,
    adStore.loadStatus,
  ];
  const loadError =
    campaignStore.loadError || adsetStore.loadError || adStore.loadError;
  React.useEffect(() => {
    campaignStore.loadCampaigns(adAccount);
    adsetStore.loadAdsets(adAccount);
    adStore.loadAdsets(adAccount);
    return () => {
      campaignStore.resetLoadStatus();
      adsetStore.resetLoadStatus();
      adStore.resetLoadStatus();
    };
  }, [adAccount]);

  if (
    loadStatus.includes(AsyncActionStatus.idle) ||
    loadStatus.includes(AsyncActionStatus.pending)
  ) {
    return <LoadingView />;
  }

  if (loadStatus.includes(AsyncActionStatus.error) && loadError) {
    return <ErrorView error={loadError} />;
  }

  const selectedCampaign = campaignStore.get(params.campaignId);
  const selectedAdset = adsetStore.get(params.adsetId);

  return (
    <div className={styles.container}>
      <AdObjectsNav
        className={styles.navigation}
        params={params}
        campaign={selectedCampaign}
        adset={selectedAdset}
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
              if (selectedCampaign == null) {
                redirectToCampaigns();
              } else {
                return (
                  <Adsets adAccount={adAccount} campaign={selectedCampaign} />
                );
              }
            }}
          />
          <Route
            path={ROUTES.ads}
            exact={true}
            render={() => {
              if (selectedCampaign == null) {
                redirectToCampaigns();
              } else if (selectedAdset == null) {
                redirectToAdsets();
              } else {
                return (
                  <Ads
                    adAccount={adAccount}
                    campaign={selectedCampaign}
                    adset={selectedAdset}
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
