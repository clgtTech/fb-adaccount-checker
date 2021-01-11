import * as React from 'react';
import * as mobx from 'mobx';
import { RawIntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
import { sessionStore } from './stores';
import { IntlFactory } from './services/intl';
import { App } from './app';

export function AppRoot() {
  const [intl, setIntl] = React.useState(IntlFactory.getIntl());

  React.useEffect(() => {
    mobx.autorun(() => {
      setIntl(IntlFactory.configureIntl(sessionStore.locale));
    });
  }, []);

  return (
    <RawIntlProvider value={intl}>
      <Router>
        <App />
      </Router>
    </RawIntlProvider>
  );
}
