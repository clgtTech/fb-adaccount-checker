```jsx
import { AsyncActionStatus, Status } from '../../types';
import { AdObjectStatusSwitch } from './ad-object-status-switch';

const [status, setStatus] = React.useState(Status.ACTIVE);

<AdObjectStatusSwitch
  canUpdate={true}
  status={status}
  updateStatus={AsyncActionStatus.idle}
  updateError={null}
  onUpdate={setStatus}
/>;
```
