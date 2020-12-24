import React, { useEffect, useState } from 'react';
import { useSavedUsers, useUser, useUserPages } from 'context/users-context';
import { AccessTokenInput } from '_deprecated-components/access-token-input';
import { TokenHelp } from '_deprecated-components/token-help';
import { SavedUsers } from '_deprecated-components/saved-users';
import { Loader } from '_deprecated-components/loader';
import { FacebookError } from '_deprecated-components/facebook-error';
import { AdAccounts } from '_deprecated-components/ad-accounts';
import styles from './_deprecated-app.module.css';

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
