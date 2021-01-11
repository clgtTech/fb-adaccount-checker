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
  const [isHeaderHaveShadow, setIsHeaderHaveShadow] = React.useState(false);

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.isSidebarOpen]: uiStore.state.isSidebarShown,
      })}
    >
      <Sidebar className={styles.sidebar} />
      <div className={styles.mainContent}>
        <Header className={styles.header} hasShadow={isHeaderHaveShadow} />
        <Switch>
          <Route
            path="/"
            exact={true}
            render={() => {
              defer(() => setIsHeaderHaveShadow(false));
              return <Intro />;
            }}
          />
          <Route
            path="/:userId"
            render={() => {
              defer(() => setIsHeaderHaveShadow(true));
              return <Dash />;
            }}
          />
        </Switch>
      </div>
      <FlashMessageView />
    </div>
  );
});

function defer(cb: Function): void {
  window.setTimeout(cb, 0);
}
