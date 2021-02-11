```jsx
import { Currency } from '../../types';
import { CurrencyAmount } from '../../stores/entities';
import { AdBudget } from './ad-budget';

<AdBudget
  fallbackMessage="Budget is not defined"
  bidStrategy="Lowest cost"
  dailyBudget={new CurrencyAmount(50000, Currency.USD)}
  onUpdate={console.log}
/>;
```
