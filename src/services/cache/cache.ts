import { UiCache } from '../../stores/ui-store';
import { SessionCache } from '../../stores/session-store';
import { UserCache } from '../../stores/entities';
import { UserGroupsCache } from '../../stores/user-group-store';

export interface Cache
  extends UiCache,
    SessionCache,
    UserCache,
    UserGroupsCache {}
