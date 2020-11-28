import React, { useEffect, useState } from 'react';
import { useSavedUsers, useUser, useUserPages } from 'context/users-context';
import { AccessTokenInput } from 'components/access-token-input';
import { TokenHelp } from 'components/token-help';
import { SavedUsers } from 'components/saved-users';
import { Loader } from 'components/loader';
import { FacebookError } from 'components/facebook-error';
import { AdAccounts } from 'components/ad-accounts';
import styles from './app.module.css';

export function App() {
  const [accessToken, setAccessToken] = useState(
    window.location.pathname.replace('/', '')
  );
  useEffect(() => {
    window.history.replaceState(
      null,
      window.document.title,
      `/${accessToken || ''}`
    );
  }, [accessToken]);

  const { users, saveUser, removeUser } = useSavedUsers();
  const { user, userLoadError, ...userState } = useUser(accessToken, {
    onSuccess: saveUser,
  });
  const { userPages, userPagesLoadError, ...userPagesState } = useUserPages(
    user
  );

  const isLoading = userState.isLoading || userPagesState.isLoading;
  const isSuccess = userState.isSuccess || userPagesState.isSuccess;
  const loadError = userLoadError || userPagesLoadError;
  let content = null;

  if (userState.isLoading || userPagesState.isLoading) {
    content = (
      <Loader className={styles.loader}>Загрузка пользователя...</Loader>
    );
  } else if (isSuccess && user) {
    content = (
      <AdAccounts
        key={user.id}
        className={styles.adAccounts}
        user={user}
        userPages={userPages}
      />
    );
  } else if (loadError) {
    content = <FacebookError className={styles.error} error={loadError} />;
  }

  return (
    <main className={styles.container}>
      <div className={styles.accessToken}>
        <AccessTokenInput
          isDisabled={isLoading}
          value={accessToken}
          onValueChange={setAccessToken}
        />
        <TokenHelp className={styles.tokenHelp} />
      </div>

      {users.length ? (
        <SavedUsers
          className={styles.savedUsers}
          activeUser={user}
          users={users}
          onUserRemove={removeUser}
          onUserSelect={(user) => setAccessToken(user.accessToken)}
        />
      ) : null}

      {content}
    </main>
  );
}
