```jsx
import { DatePreset } from '../../types';
import { DatePresetSelect } from './date-preset-select';

const [datePreset, setDatePreset] = React.useState(DatePreset.LIFETIME);

<DatePresetSelect
  allowedDatePresets={[
    DatePreset.LIFETIME,
    DatePreset.TODAY,
    DatePreset.YESTERDAY,
    DatePreset.LAST_3D,
    DatePreset.LAST_7D,
    DatePreset.LAST_14D,
  ]}
  datePreset={datePreset}
  onDatePresetChange={setDatePreset}
/>;
```

Loading state:

```jsx
import { DatePreset } from '../../types';
import { DatePresetSelect } from './date-preset-select';

const [datePreset, setDatePreset] = React.useState(DatePreset.LIFETIME);

<DatePresetSelect
  isLoading={true}
  allowedDatePresets={[
    DatePreset.LIFETIME,
    DatePreset.TODAY,
    DatePreset.YESTERDAY,
    DatePreset.LAST_3D,
    DatePreset.LAST_7D,
    DatePreset.LAST_14D,
  ]}
  datePreset={datePreset}
  onDatePresetChange={setDatePreset}
/>;
```
