import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { stores } from '../../stores';
import { createErrorPresenter } from '../../presenters/error-presenter';
import { AccessTokenHelp } from '../../components/access-token-help';
import styles from './home.module.scss';

export const Home = mobxReact.observer(function Home() {
  const { uiStore, sessionStore } = stores;

  React.useEffect(() => {
    uiStore.hideHeaderShadow();
  }, [uiStore]);

  React.useEffect(() => {
    const authError = sessionStore.authError;
    if (authError) {
      const errorViewModel = createErrorPresenter(authError);
      uiStore.showFlashMessage({
        message: errorViewModel.userMessage,
        title: errorViewModel.userTitle,
        type: 'error',
      });
    }
  }, [uiStore, sessionStore.authError]);

  return (
    <div className={styles.container}>
      <AccessTokenHelp />
    </div>
  );
});
