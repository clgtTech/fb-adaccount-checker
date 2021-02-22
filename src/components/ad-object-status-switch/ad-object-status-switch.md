```jsx
import { AsyncStatus, Status } from '../../types';
import { AdObjectStatusSwitch } from './ad-object-status-switch';

const [status, setStatus] = React.useState(Status.ACTIVE);

<AdObjectStatusSwitch
  canUpdate={true}
  status={status}
  isUpdating={AsyncStatus.idle}
  error={null}
  onUpdate={setStatus}
/>;
```
