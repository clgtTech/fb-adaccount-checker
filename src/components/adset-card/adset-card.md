```jsx
import { MemoryRouter } from 'react-router-dom';
import {
  Currency,
  AccountStatus,
  AccountDisableReason,
  AdsetEffectiveStatus,
  Status,
  ActionType,
  BidStrategy,
} from '../../types';
import { AdAccount, Adset } from '../../stores/entities';
import { AdsetCard } from './adset-card';

const adAccount = new AdAccount({
  id: '1583064078093124',
  name: 'East coast Account',
  status: AccountStatus.ACTIVE,
  disableReason: AccountDisableReason.NONE,
  currency: Currency.VND,
  spend: 191886,
  ctr: 0.32,
});
const adset = new Adset(
  {
    id: '2384569299108476',
    adAccountId: adAccount.id,
    campaignId: '2384569299108468',
    effectiveStatus: AdsetEffectiveStatus.ACTIVE,
    status: Status.ACTIVE,
    name: 'Ad set card example',
    adCount: 2,
    bidStrategy: BidStrategy.LOWEST_COST_WITH_BID_CAP,
    dailyBudget: '40000',
    insights: {
      actionType: ActionType.LIKE,
      actionTypeResult: 23,
      costPerActionType: 40704,
      spend: 40704,
      cpc: 13568,
      cpm: 740072.727273,
      ctr: 5.454545,
    },
  },
  adAccount
);

<MemoryRouter>
  <AdsetCard adAccount={adAccount} adset={adset} adsUrl={`/ads/${adset.id}`} />
</MemoryRouter>;
```
