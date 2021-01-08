import * as React from 'react';
import * as mobx from 'mobx';
import { RawIntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { stores } from './stores';
import { IntlFactory } from './services/intl';
import { facebookApiConfig } from './services/facebook-api';
import { Dashboard } from './screens/dashboard';

export function App() {
  const [intl, setIntl] = React.useState(IntlFactory.getIntl());
  const { sessionStore } = stores;

  React.useEffect(() => {
    mobx.autorun(() => {
      facebookApiConfig.setAccessToken(sessionStore.locale);
      setIntl(IntlFactory.configureIntl(sessionStore.locale));
    });
    mobx.autorun(() => {
      facebookApiConfig.setAccessToken(sessionStore.accessToken);
    });
  }, [sessionStore]);

  return (
    <RawIntlProvider value={intl}>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </RawIntlProvider>
  );
}
