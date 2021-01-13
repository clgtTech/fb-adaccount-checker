```jsx
import { SideNav } from './side-nav';
import { SearchField } from 'draft-components';

<SideNav>
  <SideNav.Header title="Overview" description="Recent activity">
    <SearchField placeholder="Search" />
  </SideNav.Header>
  <SideNav.Content>
    <ul
      style={{
        display: 'grid',
        gridRowGap: '0.5rem',
        margin: '0',
        padding: '0',
        listStyle: 'none',
      }}
    >
      <li>Quatz ・ 12/18/2020</li>
      <li>Linklinks ・ 1/9/2021</li>
      <li>Shuffletag ・ 4/24/2020</li>
      <li>Youspan ・ 12/21/2020</li>
      <li>Agivu ・ 2/14/2020</li>
    </ul>
  </SideNav.Content>
</SideNav>;
```
