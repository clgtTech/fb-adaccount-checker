import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { Route, Switch } from 'react-router-dom';
import { classNames } from 'draft-components';
import { uiStore } from './stores';
import { Intro } from './screens/intro';
import { Dash } from './screens/dash';
import { Header } from './components/header';
import { Sidebar } from './components/sidebar';
import { FlashMessageView } from './components/flash-message-view';
import styles from './app.module.scss';

export const App = mobxReact.observer(function App() {
  const { isSidebarOpen, isHeaderBordered } = uiStore.state;

  return (
    <div
      className={classNames(
        styles.layout,
        isSidebarOpen && styles.isSidebarOpen
      )}
    >
      {isSidebarOpen ? <Sidebar className={styles.sidebar} /> : null}
      <main className={styles.main}>
        <Header className={styles.header} isBordered={isHeaderBordered} />
        <div className={styles.content}>
          <Switch>
            <Route path="/" exact={true}>
              <Intro />
            </Route>
            <Route path="/:userId">
              <Dash />
            </Route>
          </Switch>
        </div>
      </main>
      <FlashMessageView />
    </div>
  );
});
