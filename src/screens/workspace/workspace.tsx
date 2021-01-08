import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Spinner } from 'draft-components';
import { AsyncActionStatus } from '../../types';
import { stores } from '../../stores';
import styles from './workspace.module.scss';

export const Workspace = mobxReact.observer(function Workspace() {
  const history = useHistory();
  const { params } = useRouteMatch<{ userId: string }>();
  const { uiStore, sessionStore, userStore } = stores;

  React.useEffect(() => {
    uiStore.showHeaderShadow();
  }, [uiStore]);

  React.useEffect(() => {
    const savedUser = userStore.getUserById(params.userId);

    if (!savedUser) {
      history.replace('/');
    } else if (savedUser !== sessionStore.authenticatedUser) {
      sessionStore.setAccessToken(savedUser.accessToken);
    }
  }, [params.userId, history, sessionStore, userStore]);

  if (sessionStore.authStatus === AsyncActionStatus.pending) {
    return <Spinner />;
  }

  if (sessionStore.authStatus === AsyncActionStatus.error) {
    return (
      <div style={{ color: 'tomato' }}>
        <pre>{JSON.stringify(sessionStore.authError, null, 4)}</pre>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <pre>{JSON.stringify(sessionStore.authenticatedUser, null, 4)}</pre>
    </div>
  );
});
