```jsx
import { CampaignCard } from './campaign-card';
import { MemoryRouter } from 'react-router-dom';
import {
  ActionType,
  BidStrategy,
  BuyingType,
  Currency,
  Objective,
  Status,
} from '../../types';
import { AdAccount } from '../../stores/ad-account-store';
import { Campaign, CampaignInsights } from '../../stores/campaign-store';
import { CurrencyAmount } from '../../stores/entities';

const adAccount = new AdAccount(
  '1583064078093124',
  'East coast Account',
  1,
  0,
  'VND',
  191886
);
const campaign = new Campaign(
  '2384569299108468',
  '251113122760020',
  Currency.VND,
  Status.ACTIVE,
  'Page Likes campaign',
  2,
  Objective.PAGE_LIKES,
  BuyingType.AUCTION,
  BidStrategy.LOWEST_COST_WITH_BID_CAP,
  new CurrencyAmount('40000', Currency.VND),
  undefined,
  undefined,
  new CampaignInsights(
    ActionType.LIKE,
    23,
    40704,
    40704,
    13568,
    740072.727273,
    5.454545
  )
);

<MemoryRouter>
  <CampaignCard
    adAccount={adAccount}
    campaign={campaign}
    getLinkToAdsets={(campaignId) => `/campaigns/${campaignId}`}
  />
</MemoryRouter>;
```
