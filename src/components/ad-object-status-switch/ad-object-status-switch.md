```jsx
import { Status } from '../../types';
import { AdObjectStatusSwitch } from './ad-object-status-switch';

const [status, setStatus] = React.useState(Status.ACTIVE);

<AdObjectStatusSwitch status={status} onStatusChange={setStatus} />;
```
