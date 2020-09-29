import type { ServiceOptions } from './contetx-types';
import type { FbApiError } from 'api/facebook-api';
import pick from 'lodash/pick';
import { getUser } from 'api/facebook-api';
import { useQuery } from 'react-query';
import { useCallback, useEffect, useState } from 'react';

export function useUser(
  accessToken: string,
  options?: ServiceOptions<User, FbApiError>
) {
  const debouncedAccessToken = useDebouncedValue(accessToken);
  const queryFn = useCallback((key: string, accessToken: string) => {
    return getUser({ accessToken });
  }, []);
  const queryKey: Parameters<typeof queryFn> = ['user', debouncedAccessToken];
  const query = useQuery<User, FbApiError>(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    enabled: Boolean(debouncedAccessToken),
    retry: (failureCount, error) => {
      return error.response?.data.error.type === 'OAuthException'
        ? false
        : failureCount < 2;
    },
    onError: options?.onError,
    onSuccess: options?.onSuccess,
  });

  return {
    ...pick(query, [
      'isIdle',
      'isLoading',
      'isError',
      'isSuccess',
      'clear',
      'refetch',
    ]),
    userLoadStatus: query.status,
    userLoadError: query.error,
    user: query.data,
  };
}

export function useDebouncedValue(value: string, delay: number = 500): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useSavedUsers() {
  const [users, setUsers] = useState(getUsersFromLocalStorage());
  const saveUser = useCallback((user: User) => {
    setUsers((users) => {
      users = users.find((u) => u.id === user.id)
        ? users.map((oldUser) => (oldUser.id === user.id ? user : oldUser))
        : [user, ...users];
      saveUsersToLocalStorage(users);
      return users;
    });
  }, []);
  const removeUser = useCallback((id: string) => {
    setUsers((users) => {
      users = users.filter((user) => user.id !== id);
      saveUsersToLocalStorage(users);
      return users;
    });
  }, []);

  return {
    users,
    saveUser,
    removeUser,
  };
}

const storageKey = 'FbAdAccountChecker:Users';

function getUsersFromLocalStorage(): User[] {
  try {
    const savedUsersJson = localStorage.getItem(storageKey);
    return savedUsersJson ? JSON.parse(savedUsersJson) : [];
  } catch (e) {
    localStorage.removeItem(storageKey);
    return [];
  }
}

function saveUsersToLocalStorage(users: User[]) {
  localStorage.setItem(storageKey, JSON.stringify(users));
}
