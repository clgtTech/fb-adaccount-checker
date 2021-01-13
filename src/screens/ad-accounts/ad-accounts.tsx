import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { FormattedMessage, useIntl } from 'react-intl';
import { generatePath, useRouteMatch } from 'react-router-dom';
import { LoadingView, NonIdealStateView } from 'draft-components';
import { AsyncActionStatus } from '../../types';
import { adAccountStore, sessionStore } from '../../stores';
import { ErrorView } from '../../components/error-view';
import { AdAccountsNav } from '../../components/ad-accounts-nav';
import { AdAccountReview } from '../ad-account-review';
import styles from './ad-accounts.module.scss';

export interface AdAccountsRouteParams {
  userId: string;
  adAccountId?: string;
}

export const AdAccounts = mobxReact.observer(function AdAccounts() {
  const intl = useIntl();
  const userId = sessionStore.authenticatedUserId;
  const { params } = useRouteMatch<AdAccountsRouteParams>();

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
    !adAccountStore.adAccounts.length
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
        adAccounts={adAccountStore.adAccounts}
        getAdAccountPath={(adAccount) => {
          return generatePath(`/${userId}/:adAccountId`, {
            adAccountId: adAccount.id,
          });
        }}
      />
      <div className={styles.content}>
        {params.adAccountId ? (
          <AdAccountReview adAccountId={params.adAccountId} />
        ) : (
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
        )}
      </div>
    </div>
  );
});
