```jsx
import { MemoryRouter } from 'react-router';
import { AccountStatus, AccountDisableReason, Currency } from '../../types';
import { AdAccount } from '../../stores/entities';
import { AdAccountsNav } from './ad-accounts-nav';

const adAccounts = [
  new AdAccount({
    id: '1583064078093124',
    name: 'East coast Account',
    status: AccountStatus.ACTIVE,
    disableReason: AccountDisableReason.NONE,
    currency: Currency.VND,
    spend: 191886,
    ctr: 0.7698,
  }),
  new AdAccount({
    id: '2511131789234564',
    name: 'South coast Account',
    status: AccountStatus.DISABLED,
    disableReason: AccountDisableReason.ADS_INTEGRITY_POLICY,
    currency: Currency.VND,
    spend: 40704,
    ctr: 0.2451,
  }),
  new AdAccount({
    id: '1010246088360102',
    name: 'Lacie Wirth',
    status: AccountStatus.DISABLED,
    disableReason: AccountDisableReason.ADS_INTEGRITY_POLICY,
    currency: Currency.VND,
    spend: 38611,
    ctr: 0.11398,
  }),
  new AdAccount({
    id: '1012580479680281',
    name: 'Clever Willson',
    status: AccountStatus.ACTIVE,
    disableReason: AccountDisableReason.NONE,
    currency: Currency.USD,
  }),
];

<MemoryRouter>
  <AdAccountsNav
    adAccounts={adAccounts}
    getLinkToAdAccount={(adAccountId) => `/adaccounts/${adAccountId}`}
  />
</MemoryRouter>;
```
