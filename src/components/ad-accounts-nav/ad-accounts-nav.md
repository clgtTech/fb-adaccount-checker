```jsx
import { MemoryRouter } from 'react-router';
import { AdAccount } from '../../stores/ad-account-store';
import { AdAccountsNav } from './ad-accounts-nav';

const adAccounts = [
  new AdAccount('1583064078093124', 'East coast Account', 1, 0, 'VND', 191886),
  new AdAccount('2511131789234564', 'South coast Account', 2, 1, 'VND', 40704),
  new AdAccount('1010246088360102', 'Lacie Wirth', 2, 1, 'VND', 38611),
  new AdAccount('1012580479680281', 'Clever Willson', 2, 1, 'USD', 0),
];

<MemoryRouter>
  <AdAccountsNav
    adAccounts={adAccounts}
    getLinkToAdAccount={(adAccountId) => `/adaccounts/${adAccountId}`}
  />
</MemoryRouter>;
```
