```jsx
import { MemoryRouter } from 'react-router';
import { AdAccount } from '../../stores/ad-account-store';
import { AdAccountsNav } from './ad-accounts-nav';

const adAccounts = [
  new AdAccount({
    id: 'act_1583064078093124',
    accountId: '1583064078093124',
    name: 'East coast Ad Account',
    status: 1,
    disableReason: 0,
    currency: 'VND',
    spend: 191886,
  }),
  new AdAccount({
    id: 'act_2511131789234564',
    accountId: '2511131789234564',
    name: 'South coast Ad Account',
    status: 2,
    disableReason: 1,
    currency: 'VND',
    spend: 40704,
  }),
  new AdAccount({
    id: 'act_1010246088360102',
    accountId: '1010246088360102',
    name: 'Lacie Wirth',
    status: 2,
    disableReason: 1,
    currency: 'VND',
    spend: 38611,
  }),
  new AdAccount({
    id: 'act_1012580479680281',
    accountId: '1012580479680281',
    name: 'Clever Willson',
    status: 2,
    disableReason: 1,
    currency: 'USD',
    spend: 0,
  }),
];

<MemoryRouter>
  <AdAccountsNav
    adAccounts={adAccounts}
    getLinkToAdAccount={(adAccountId) => `/adaccounts/${adAccountId}`}
  />
</MemoryRouter>;
```
