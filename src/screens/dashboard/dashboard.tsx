import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { Route, Switch, useHistory } from 'react-router-dom';
import { classNames } from 'draft-components';
import { stores } from '../../stores';
import { Home } from '../home';
import { Workspace } from '../workspace';
import { Header } from '../../components/header';
import { Sidebar } from '../../components/sidebar';
import styles from './dashboard.module.scss';

export const Dashboard = mobxReact.observer(function Dashboard() {
  const history = useHistory();
  const { uiStore, sessionStore } = stores;

  React.useEffect(() => {
    if (!sessionStore.accessToken) {
      history.replace('/');
    }
  }, [history, sessionStore.accessToken]);

  React.useEffect(() => {
    if (sessionStore.authenticatedUser) {
      history.replace(`/${sessionStore.authenticatedUser.id}`);
    }
  }, [history, sessionStore.authenticatedUser]);

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.isSidebarOpen]: uiStore.state.isSidebarShown,
      })}
    >
      <Sidebar className={styles.sidebar} />
      <div className={styles.mainContent}>
        <Header className={styles.header} />
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/:userId">
            <Workspace />
          </Route>
        </Switch>
      </div>
    </div>
  );
});
