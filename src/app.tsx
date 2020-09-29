import React, { useState } from 'react';
import { useSavedUsers, useUser } from 'context/users-context';
import { AccessTokenInput } from 'components/access-token-input';
import { TokenHelp } from 'components/token-help';
import { SavedUsers } from 'components/saved-users';
import { Loader } from 'components/loader';
import { FacebookError } from 'components/facebook-error';
import styles from './app.module.css';

export function App() {
  const [accessToken, setAccessToken] = useState('');
  const { users, saveUser, removeUser } = useSavedUsers();
  const { isLoading, isError, isSuccess, user, userLoadError } = useUser(
    accessToken,
    {
      onSuccess: (user) => saveUser(user),
    }
  );

  let content = null;

  if (isLoading) {
    content = (
      <Loader className={styles.loader}>Загрузка пользователя...</Loader>
    );
  } else if (isError && userLoadError) {
    content = <FacebookError className={styles.error} error={userLoadError} />;
  } else if (isSuccess && user) {
    content = <pre>{JSON.stringify(user, null, 2)}</pre>;
  }

  return (
    <main className={styles.container}>
      <AccessTokenInput
        isDisabled={isLoading}
        value={accessToken}
        onValueChange={setAccessToken}
      />

      <TokenHelp className={styles.tokenHelp} />

      {users.length ? (
        <SavedUsers
          className={styles.savedUsers}
          users={users}
          onUserRemove={removeUser}
          onUserSelect={(user) => setAccessToken(user.accessToken)}
        />
      ) : null}

      {content}
    </main>
  );
}
