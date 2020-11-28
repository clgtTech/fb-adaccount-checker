import type { User, Page, UserCustomNames } from 'common-types';
import type { ServiceOptions } from './contetx-types';
import type { FbApiError } from 'api/facebook-api';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import { getUser, getUserPages } from 'api/facebook-api';
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

export function useUserPages(
  user: User | null | undefined,
  options?: ServiceOptions<Page[], FbApiError>
) {
  const queryFn = useCallback(
    (key: string, params: { accessToken: string; userId: string }) => {
      return getUserPages(params);
    },
    []
  );
  const queryKey: Parameters<typeof queryFn> = [
    'userPages',
    user
      ? { accessToken: user.accessToken, userId: user.id }
      : { accessToken: '', userId: '' },
  ];
  const query = useQuery<Page[], FbApiError>(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    enabled: Boolean(user),
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
    userPagesLoadStatus: query.status,
    userPagesLoadError: query.error,
    userPages: (query.data || []).reduce(
      (pages, page) => pages.set(page.id, page),
      new Map<string, Page>()
    ),
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

export function useUserCustomNames() {
  const [userCustomNames, setUserCustomNames] = useState(
    getUserCustomNamesFromLocalStorage()
  );
  const saveUserCustomName = useCallback(
    (userId: string, customName: string) => {
      setUserCustomNames((userCustomNames) => {
        userCustomNames = { ...userCustomNames, [userId]: customName };
        saveUserCustomNamesToLocalStorage(userCustomNames);
        return userCustomNames;
      });
    },
    []
  );
  const removeUserCustomName = useCallback((userId: string) => {
    setUserCustomNames((userCustomNames) => {
      userCustomNames = omit(userCustomNames, [userId]);
      saveUserCustomNamesToLocalStorage(userCustomNames);
      return userCustomNames;
    });
  }, []);

  return {
    userCustomNames,
    saveUserCustomName,
    removeUserCustomName,
  };
}

const usersStorageKey = 'FbAdAccountChecker:Users';

function getUsersFromLocalStorage(): User[] {
  try {
    const savedUsersJson = localStorage.getItem(usersStorageKey);
    return savedUsersJson ? JSON.parse(savedUsersJson) : [];
  } catch (e) {
    localStorage.removeItem(usersStorageKey);
    return [];
  }
}

function saveUsersToLocalStorage(users: User[]) {
  localStorage.setItem(usersStorageKey, JSON.stringify(users));
}

const userCustomNamesStorageKey = 'FbAdAccountChecker:UserCustomNames';

function getUserCustomNamesFromLocalStorage(): UserCustomNames {
  try {
    const userCustomNamesJson = localStorage.getItem(userCustomNamesStorageKey);
    return userCustomNamesJson ? JSON.parse(userCustomNamesJson) : {};
  } catch (e) {
    localStorage.removeItem(userCustomNamesStorageKey);
    return {};
  }
}

function saveUserCustomNamesToLocalStorage(userCustomNames: UserCustomNames) {
  localStorage.setItem(
    userCustomNamesStorageKey,
    JSON.stringify(userCustomNames)
  );
}
