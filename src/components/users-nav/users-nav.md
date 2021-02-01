```jsx
import { UsersNav } from './users-nav';
import { MemoryRouter } from 'react-router-dom';
import { User } from '../../stores/user-store';

<MemoryRouter>
  <UsersNav
    users={[
      new User({
        accessToken: 'xyz',
        id: '108142184621775',
        name: 'West Coast',
        pictureUrl: `https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`,
        addedAt: new Date(),
      }),
      new User({
        accessToken: 'xyz',
        id: '108282184621245',
        name: 'Clever Willson',
        pictureUrl: `https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`,
        addedAt: new Date(),
      }),
    ]}
    getLinkToUser={(user) => `/users/${user.id}`}
    onUserDelete={console.log}
    onUserNameChange={console.log}
  />
</MemoryRouter>;
```
