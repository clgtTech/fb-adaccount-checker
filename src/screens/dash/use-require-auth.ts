import * as React from 'react';
import * as mobx from 'mobx';
import { useHistory } from 'react-router-dom';
import { sessionStore, userStore } from '../../stores';

export function useRequireAuth(userId: string): void {
  const history = useHistory();
  const goToIntroScreen = React.useCallback(() => {
    history.replace('/');
  }, [history]);

  React.useEffect(() => {
    const savedUser = userStore.getUserById(userId);
    if (!savedUser) {
      goToIntroScreen();
    } else if (savedUser.id !== sessionStore.authenticatedUserId) {
      sessionStore.setAccessToken(savedUser.accessToken);
    }
  }, [userId, goToIntroScreen]);

  React.useEffect(() => {
    return mobx.autorun(() => {
      if (!sessionStore.accessToken) {
        goToIntroScreen();
      }
    });
  }, [goToIntroScreen]);
}
