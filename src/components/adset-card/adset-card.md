```jsx
import { AdsetCard } from './adset-card';
import { MemoryRouter } from 'react-router-dom';
import {
  ActionType,
  BidStrategy,
  Currency,
  Objective,
  AdsetEffectiveStatus,
  Status,
} from '../../types';
import { AdAccount } from '../../stores/ad-account-store';
import { Adset, AdsetInsights } from '../../stores/adset-store';
import { CurrencyAmount } from '../../stores/entities';

const adAccount = new AdAccount(
  '1583064078093124',
  'East coast Account',
  1,
  0,
  Currency.VND,
  191886
);
const adset = new Adset(
  '2384590388373801',
  '1583064078093124',
  '2384590388364124',
  AdsetEffectiveStatus.ACTIVE,
  Status.ACTIVE,
  'Adset card example',
  1,
  BidStrategy.LOWEST_COST_WITH_BID_CAP,
  new CurrencyAmount('40000', Currency.VND),
  undefined,
  new AdsetInsights(ActionType.LIKE, 0, 0, 36405, 0, 455062.5, 0)
);

<MemoryRouter>
  <AdsetCard
    adAccount={adAccount}
    adset={adset}
    getLinkToAds={(adsetId) => `/ads/${adsetId}`}
  />
</MemoryRouter>;
```
