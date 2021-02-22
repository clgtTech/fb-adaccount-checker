```jsx
import { MemoryRouter } from 'react-router-dom';
import {
  Currency,
  AccountStatus,
  AccountDisableReason,
  Status,
  Objective,
  ActionType,
  BidStrategy,
  BuyingType,
} from '../../types';
import { AdAccount, Campaign } from '../../stores/entities';
import { CampaignCard } from './campaign-card';

const adAccount = new AdAccount({
  id: '1583064078093124',
  name: 'East coast Account',
  status: AccountStatus.ACTIVE,
  disableReason: AccountDisableReason.NONE,
  currency: Currency.VND,
  spend: 191886,
  ctr: 0.32,
});
const campaign = new Campaign(
  {
    id: '2384569299108468',
    adAccountId: '1583064078093124',
    status: Status.ACTIVE,
    name: 'Page Likes campaign',
    adsetCount: 2,
    objective: Objective.PAGE_LIKES,
    buyingType: BuyingType.AUCTION,
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
  <CampaignCard
    adAccount={adAccount}
    campaign={campaign}
    adsetsUrl={`/campaigns/${campaign.id}`}
  />
</MemoryRouter>;
```
