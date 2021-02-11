```jsx
import { MemoryRouter } from 'react-router-dom';
import {
  Currency,
  AccountStatus,
  AccountDisableReason,
  AdEffectiveStatus,
  Status,
  ActionType,
} from '../../types';
import { AdAccount, Ad } from '../../stores/entities';
import { AdCard } from './ad-card';

const adAccount = new AdAccount({
  id: '1583064078093124',
  name: 'East coast Account',
  status: AccountStatus.ACTIVE,
  disableReason: AccountDisableReason.NONE,
  currency: Currency.VND,
  spend: 191886,
  ctr: 0.32,
});
const ad = new Ad(
  {
    id: '2384569299108490',
    adAccountId: adAccount.id,
    campaignId: '2384569299108468',
    adsetId: '2384569299108476',
    effectiveStatus: AdEffectiveStatus.DISAPPROVED,
    status: Status.ACTIVE,
    name: 'Ad card example',
    deliveryStatus: 'rejected',
    reviewFeedback: {
      'Page Not Allowed to Advertise': `Ad DisabledThis ad was disabled because this Page isn't allowed to advertise.See details`,
    },
    creative: {
      id: '467478398473',
      pagePostId: '564783434673_465783431233',
      thumbnailUrl: `https://images.unsplash.com/photo-1531929796702-8dcf9c4e49d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80`,
      title: `Do not waste your time!`,
      body: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
    },
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
  <AdCard adAccount={adAccount} ad={ad} />
</MemoryRouter>;
```
