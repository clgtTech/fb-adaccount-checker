import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { Route, Switch, useHistory } from 'react-router-dom';
import { classNames } from 'draft-components';
import { AsyncActionStatus } from './types';
import { SessionEventListeners } from './stores/session-store';
import { sessionStore, uiStore, userStore } from './stores';
import { Intro } from './screens/intro';
import { Dash } from './screens/dash';
import { UsersNav } from './components/users-nav';
import { Header } from './components/header';
import { SidebarSwitch } from './components/sidebar-switch';
import { AccessTokenField } from './components/access-token-field';
import { FlashMessageView } from './components/flash-message-view';
import styles from './app.module.scss';

export const App = mobxReact.observer(function App() {
  const history = useHistory();
  const { isSidebarOpen, isHeaderBordered } = uiStore.state;

  React.useEffect(() => {
    const onAuthenticate: SessionEventListeners['authenticate'] = (user) => {
      history.replace(`/${user.id}`);
    };
    const onAuthReset: SessionEventListeners['authReset'] = () => {
      history.replace('/');
    };

    sessionStore.addEventListener('authenticate', onAuthenticate);
    sessionStore.addEventListener('authReset', onAuthReset);

    return () => {
      sessionStore.removeEventListener('authenticate', onAuthenticate);
      sessionStore.removeEventListener('authReset', onAuthReset);
    };
  }, [history]);

  return (
    <div
      className={classNames(
        styles.layout,
        isSidebarOpen && styles.isSidebarOpen
      )}
    >
      {isSidebarOpen ? (
        <UsersNav
          className={styles.sidebar}
          users={userStore.users}
          onUserDelete={(userId) => {
            userStore.deleteUser(userId);
          }}
          onUserUpdate={(userId, update) => {
            userStore.updateUser(userId, update);
          }}
          getUserPath={(user) => `/${user.id}`}
        />
      ) : null}
      <main className={styles.main}>
        <Header
          className={styles.header}
          isBordered={isHeaderBordered}
          left={
            <SidebarSwitch
              isActive={isSidebarOpen}
              onClick={() => {
                uiStore.toggleSidebarVisibility();
              }}
            />
          }
        >
          <AccessTokenField
            value={sessionStore.accessToken}
            isLoading={sessionStore.authStatus === AsyncActionStatus.pending}
            onValueChange={(accessToken) => {
              if (accessToken) {
                sessionStore.authenticate(accessToken);
              } else {
                sessionStore.resetAuth();
              }
            }}
          />
        </Header>
        <div className={styles.content}>
          <Switch>
            <Route path="/" exact={true}>
              <Intro />
            </Route>
            <Route path="/:userId/:adAccountId?">
              <Dash />
            </Route>
          </Switch>
        </div>
      </main>
      <FlashMessageView />
    </div>
  );
});
