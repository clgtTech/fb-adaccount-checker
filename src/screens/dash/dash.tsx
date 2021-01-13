import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { FormattedMessage } from 'react-intl';
import { useRouteMatch } from 'react-router-dom';
import { LoadingView } from 'draft-components';
import { AsyncActionStatus } from '../../types';
import { sessionStore } from '../../stores';
import { useBorderedHeader } from '../../components/header';
import { useRequireAuth } from './use-require-auth';
import { ErrorView } from '../../components/error-view';
import { AdAccountsView } from './ad-accounts-view';

interface DashRouteParams {
  userId: string;
}

export const Dash = mobxReact.observer(function Dash() {
  const { params } = useRouteMatch<DashRouteParams>();

  useBorderedHeader(true);
  useRequireAuth(params.userId);

  if (
    sessionStore.authStatus === AsyncActionStatus.idle ||
    sessionStore.authStatus === AsyncActionStatus.pending
  ) {
    return (
      <LoadingView>
        <FormattedMessage
          id="screens.Dash.authenticating"
          defaultMessage="Access Token checking..."
        />
      </LoadingView>
    );
  }

  if (
    sessionStore.authStatus === AsyncActionStatus.error &&
    sessionStore.authError
  ) {
    return <ErrorView error={sessionStore.authError} />;
  }

  return <AdAccountsView />;
});
