import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { FormattedMessage, useIntl } from 'react-intl';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { LoadingView, NonIdealStateView } from 'draft-components';
import { AsyncActionStatus } from '../../types';
import { ROUTES } from '../../constants';
import { adAccountStore, sessionStore } from '../../stores';
import { ErrorView } from '../../components/error-view';
import { AdAccountsNav } from '../../components/ad-accounts-nav';
import { AdAccountExplore } from '../ad-account-explore';
import styles from './ad-accounts.module.scss';

export const AdAccounts = mobxReact.observer(function AdAccounts() {
  const intl = useIntl();
  const authenticatedUserId = sessionStore.authenticatedUserId;
  const { path, url } = useRouteMatch();

  React.useEffect(() => {
    adAccountStore.loadAdAccounts(authenticatedUserId);
    return () => adAccountStore.resetLoadStatus();
  }, [authenticatedUserId]);

  if (
    adAccountStore.loadStatus === AsyncActionStatus.idle ||
    adAccountStore.loadStatus === AsyncActionStatus.pending
  ) {
    return (
      <LoadingView>
        <FormattedMessage
          id="screens.AdAccounts.adAccountsLoading"
          defaultMessage="Ad Accounts loading..."
        />
      </LoadingView>
    );
  }

  if (
    adAccountStore.loadStatus === AsyncActionStatus.error &&
    adAccountStore.loadError
  ) {
    return <ErrorView error={adAccountStore.loadError} />;
  }

  if (
    adAccountStore.loadStatus === AsyncActionStatus.success &&
    adAccountStore.isEmpty
  ) {
    return (
      <NonIdealStateView
        title={intl.formatMessage({
          id: 'screens.AdAccounts.noAdAccountsState.title',
          defaultMessage: `No ad accounts found`,
        })}
        description={intl.formatMessage({
          id: 'screens.AdAccounts.noAdAccountsState.description',
          defaultMessage: `This user does not have any ad accounts. Try to select another user.`,
        })}
      />
    );
  }

  return (
    <div className={styles.layout}>
      <AdAccountsNav
        className={styles.navigation}
        adAccounts={adAccountStore.toArray()}
        getLinkToAdAccount={(adAccountId) => `${url}/${adAccountId}/campaigns`}
      />
      <div className={styles.content}>
        <Switch>
          <Route
            path={path}
            exact={true}
            render={() => {
              return (
                <NonIdealStateView
                  title={intl.formatMessage({
                    id: 'screens.AdAccounts.noAdAccountState.title',
                    defaultMessage: `No ad account select`,
                  })}
                  description={intl.formatMessage({
                    id: 'screens.AdAccounts.noAdAccountState.description',
                    defaultMessage: `← Select the ad account to see his ad campaigns.`,
                  })}
                />
              );
            }}
          />
          <Route
            path={[ROUTES.campaigns, ROUTES.adsets, ROUTES.ads]}
            exact={true}
            render={({ match }) => {
              const adAccount = adAccountStore.get(match.params.adAccountId);
              return adAccount ? (
                <AdAccountExplore adAccount={adAccount} />
              ) : (
                <Redirect to={url} />
              );
            }}
          />
          <Redirect to={url} />
        </Switch>
      </div>
    </div>
  );
});
