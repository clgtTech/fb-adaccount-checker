import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import {
  Route,
  Redirect,
  Switch,
  useHistory,
  generatePath,
} from 'react-router-dom';
import { classNames, Select } from 'draft-components';
import { AsyncActionStatus, Locale } from './types';
import { ROUTES } from './constants';
import { SessionEventListeners } from './stores/session-store';
import { sessionStore, uiStore, userStore } from './stores';
import { UsersNav } from './components/users-nav';
import { Header } from './components/header';
import { SidebarSwitch } from './components/sidebar-switch';
import { AccessTokenField } from './components/access-token-field';
import { FlashMessageView } from './components/flash-message-view';
import { Home } from './screens/home';
import { Authenticator } from './screens/authenticator';
import { AdAccounts } from './screens/ad-accounts';
import styles from './app.module.scss';


export const App = mobxReact.observer(function App() {
  const history = useHistory();
  const { isSidebarOpen, isHeaderBordered } = uiStore.state;

  React.useEffect(() => {
    const onAuthenticate: SessionEventListeners['authenticate'] = (user) => {
      const location = history.location;
      const nextUrl = getLinkToUserReview(user.id);
      history.replace({
        pathname: location.pathname.startsWith(nextUrl)
          ? location.pathname
          : nextUrl,
        search: location.search,
      });
    };
    const onAuthReset: SessionEventListeners['authReset'] = () => {
      history.replace(ROUTES.home);
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
          users={userStore.toArray()}
          onUserDelete={(userId) => {
            userStore.deleteUser(userId);
          }}
          onUserUpdate={(userId, update) => {
            userStore.updateUser(userId, update);
          }}
          getLinkToUser={getLinkToUserReview}
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
          right={
            <Select
              value={sessionStore.locale}
              onChange={(event) => {
                sessionStore.setLocale(event.currentTarget.value as Locale);
              }}
            >
              <option value={Locale.enUS}>🇺🇸 English</option>
              <option value={Locale.ruRU}>🇷🇺 Русский</option>
            </Select>
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
            <Route path={ROUTES.home} exact={true} render={() => <Home />} />
            <Route
              path={ROUTES.adAccounts}
              render={() => (
                <Authenticator>
                  <AdAccounts />
                </Authenticator>
              )}
            />
            <Redirect to={ROUTES.home} />
          </Switch>
        </div>
      </main>
      <FlashMessageView />
    </div>
  );
});

function getLinkToUserReview(userId: string): string {
  return generatePath(ROUTES.adAccounts, { userId });
}
