import * as React from 'react';
import { stores } from '../../stores';
import { AccessTokenHelp } from '../../components/access-token-help';
import styles from './home.module.scss';

export interface HomeProps {}

export function Home(props: HomeProps) {
  const { uiStore } = stores;

  React.useEffect(() => {
    uiStore.hideHeaderShadow();
  }, [uiStore]);

  return (
    <div {...props} className={styles.container}>
      <AccessTokenHelp />
    </div>
  );
}
