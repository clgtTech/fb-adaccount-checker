import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { Redirect } from 'react-router-dom';
import { sessionStore } from '../../stores';
import { useBorderedHeader } from '../../components/header';
import { useShowError } from '../../components/flash-message-view';
import { AccessTokenHelp } from '../../components/access-token-help';
import styles from './intro.module.scss';

export const Intro = mobxReact.observer(function Intro() {
  const [isHeaderBordered, setIsHeaderBordered] = React.useState(false);

  useBorderedHeader(isHeaderBordered);
  useShowError(sessionStore.authError);

  if (sessionStore.authenticatedUserId) {
    return (
      <Redirect to={`/${sessionStore.authenticatedUserId}`} push={false} />
    );
  }

  return (
    <div
      className={styles.container}
      onScroll={(event) => {
        setIsHeaderBordered(event.currentTarget.scrollTop > 0);
      }}
    >
      <div className={styles.content}>
        <AccessTokenHelp />
      </div>
    </div>
  );
});
