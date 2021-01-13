import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { generatePath, useRouteMatch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { LoadingView } from 'draft-components';
import { AsyncActionStatus } from '../../types';
import { sessionStore, adAccountStore } from '../../stores';
import { ErrorView } from '../../components/error-view';
import { AdAccountsNav } from '../../components/ad-accounts-nav';
import styles from './ad-accounts-view.module.scss';

export const AdAccountsView = mobxReact.observer(function AdAccountsView() {
  const match = useRouteMatch();
  const url = match.url.replace(/\/*$/, '');
  const userId = sessionStore.authenticatedUserId;

  React.useEffect(() => {
    adAccountStore.loadAdAccounts(userId);
    return () => adAccountStore.resetLoadStatus();
  }, [userId]);

  if (
    adAccountStore.loadStatus === AsyncActionStatus.idle ||
    adAccountStore.loadStatus === AsyncActionStatus.pending
  ) {
    return (
      <LoadingView>
        <FormattedMessage
          id="screens.AdAccountsView.adAccountsLoading"
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

  return (
    <div className={styles.layout}>
      <AdAccountsNav
        className={styles.sidebar}
        adAccounts={adAccountStore.adAccounts}
        getAdAccountPath={(adAccount) => {
          return generatePath(`${url}/:id`, { id: adAccount.id });
        }}
      />
      <div style={{ overflowY: 'auto' }}>Campaigns, ad sets and ads</div>
    </div>
  );
});
