import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { FormattedMessage } from 'react-intl';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { LoadingView } from 'draft-components';
import { AsyncActionStatus } from '../../types';
import { sessionStore, userStore } from '../../stores';
import { useBorderedHeader } from '../../components/header';
import { ErrorView } from '../../components/error-view';
import { AdAccounts } from '../ad-accounts';

interface DashRouteParams {
  userId: string;
}

export const Dash = mobxReact.observer(function Dash() {
  const history = useHistory();
  const { params } = useRouteMatch<DashRouteParams>();

  useBorderedHeader(true);

  React.useEffect(() => {
    const savedUser = userStore.getUserById(params.userId);
    const authUser = userStore.getUserById(sessionStore.authenticatedUserId);
    if (!savedUser) {
      history.replace('/');
    } else if (savedUser !== authUser) {
      sessionStore.authenticate(savedUser.accessToken);
    }
  }, [params.userId, history]);

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

  return <AdAccounts />;
});
