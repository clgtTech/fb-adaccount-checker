```jsx
import { Currency } from '../../types';
import { CurrencyAmount } from '../../stores/entities';
import { CurrencyAmountField } from './currency-amount-field';

<CurrencyAmountField
  value={new CurrencyAmount(50000, Currency.USD)}
  onCancel={console.log}
  onSave={console.log}
/>;
```
