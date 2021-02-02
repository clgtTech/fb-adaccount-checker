import * as React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { LoadingView } from 'draft-components';
import { AsyncActionStatus } from '../../types';
import { ROUTES } from '../../constants';
import { sessionStore, userStore } from '../../stores';
import { useBorderedHeader } from '../../components/header';
import { ErrorView } from '../../components/error-view';

export interface AuthenticatorProps {
  children: JSX.Element;
}

export function Authenticator({ children }: AuthenticatorProps) {
  const history = useHistory();
  const { params } = useRouteMatch<{ userId: string }>();

  useBorderedHeader(true);

  React.useEffect(() => {
    const savedUser = userStore.getUserById(params.userId);
    const authUser = userStore.getUserById(sessionStore.authenticatedUserId);
    if (!savedUser) {
      history.replace(ROUTES.home);
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
          id="screens.Authenticator.authenticating"
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

  return children;
}
