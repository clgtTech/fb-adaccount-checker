import React, { useEffect, useState } from 'react';
import { useSavedUsers, useUser } from 'context/users-context';
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
  const {
    isLoading,
    isError,
    isSuccess,
    user,
    userLoadError,
  } = useUser(accessToken, { onSuccess: saveUser });

  let content = null;

  if (isLoading) {
    content = (
      <Loader className={styles.loader}>Загрузка пользователя...</Loader>
    );
  } else if (isError && userLoadError) {
    content = <FacebookError className={styles.error} error={userLoadError} />;
  } else if (isSuccess && user) {
    content = (
      <AdAccounts key={user.id} className={styles.adAccounts} user={user} />
    );
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
