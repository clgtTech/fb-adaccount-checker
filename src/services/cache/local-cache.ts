import { DatePreset, Locale } from '../../types';
import {
  LOCAL_STORAGE_KEYS,
  DEFAULT_LOCALE,
  DEFAULT_DATE_PRESET,
} from '../../constants';
import { Cache } from './cache';
import { User, EntityGroup } from '../../stores/entities';
import { UserGroupsState } from '../../stores/user-group-store';
import { UiState } from '../../stores/ui-store';

const saveUiState: Cache['saveUiState'] = (uiState) => {
  window.localStorage.setItem(
    LOCAL_STORAGE_KEYS.uiState,
    JSON.stringify(uiState)
  );
};

const getUiState: Cache['getUiState'] = () => {
  const uiState = new UiState();
  try {
    const uiStateJson = window.localStorage.getItem(LOCAL_STORAGE_KEYS.uiState);

    if (!uiStateJson) {
      return uiState;
    }

    const savedUiState: Partial<UiState> = JSON.parse(uiStateJson);

    if (typeof savedUiState.isSidebarOpen === 'boolean') {
      uiState.isSidebarOpen = savedUiState.isSidebarOpen;
    }

    return uiState;
  } catch (e) {
    return uiState;
  }
};

const saveUsers: Cache['saveUsers'] = (users) => {
  window.localStorage.setItem(
    LOCAL_STORAGE_KEYS.users,
    JSON.stringify(users.map((user) => user.serialize()))
  );
};

const getUsers: Cache['getUsers'] = () => {
  try {
    const usersJson = window.localStorage.getItem(LOCAL_STORAGE_KEYS.users);

    if (!usersJson) {
      return [];
    }

    const savedUsers: Partial<User> = JSON.parse(usersJson);

    if (!Array.isArray(savedUsers)) {
      return [];
    }

    return savedUsers
      .filter((savedUser) => {
        return (
          savedUser != null &&
          typeof savedUser === 'object' &&
          typeof savedUser.accessToken === 'string' &&
          typeof savedUser.id === 'string' &&
          typeof savedUser.name === 'string' &&
          typeof savedUser.addedAt === 'string'
        );
      })
      .map((savedUser) => new User(savedUser));
  } catch (e) {
    return [];
  }
};

const saveLocale: Cache['saveLocale'] = (locale) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEYS.locale, locale);
};

const getLocale: Cache['getLocale'] = () => {
  const savedLocale = window.localStorage.getItem(LOCAL_STORAGE_KEYS.locale);
  const isLocaleValid = (value: any): value is Locale => {
    return Object.values(Locale).includes(value);
  };
  return isLocaleValid(savedLocale) ? savedLocale : DEFAULT_LOCALE;
};

const saveInsightsDatePreset: Cache['saveInsightsDatePreset'] = (
  datePreset
) => {
  window.localStorage.setItem(
    LOCAL_STORAGE_KEYS.insightsDatePreset,
    datePreset
  );
};

const getInsightsDatePreset: Cache['getInsightsDatePreset'] = () => {
  const savedDatePreset = window.localStorage.getItem(
    LOCAL_STORAGE_KEYS.insightsDatePreset
  );
  const isDatePresetValid = (value: any): value is DatePreset => {
    return Object.values(DatePreset).includes(value);
  };
  return isDatePresetValid(savedDatePreset)
    ? savedDatePreset
    : DEFAULT_DATE_PRESET;
};

const saveUserGroupsState: Cache['saveUserGroupsState'] = (state) => {
  window.localStorage.setItem(
    LOCAL_STORAGE_KEYS.userGroups,
    JSON.stringify(state)
  );
};

const getUserGroupsState: Cache['getUserGroupsState'] = () => {
  const state: UserGroupsState = {
    groups: [],
    userPerGroup: {},
  };
  const stateJson = window.localStorage.getItem(LOCAL_STORAGE_KEYS.userGroups);
  if (!stateJson) {
    return state;
  }

  const savedState = JSON.parse(stateJson);
  if (Array.isArray(savedState.groups)) {
    savedState.groups.forEach((maybeGroupDTO: any) => {
      if (
        maybeGroupDTO &&
        typeof maybeGroupDTO === 'object' &&
        (typeof maybeGroupDTO.id === 'string' ||
          typeof maybeGroupDTO.id === 'number') &&
        typeof maybeGroupDTO.name === 'string' &&
        typeof maybeGroupDTO.color === 'string' &&
        (maybeGroupDTO.createdAt instanceof Date ||
          typeof maybeGroupDTO.createdAt === 'string' ||
          typeof maybeGroupDTO.createdAt === 'number')
      ) {
        state.groups.push(new EntityGroup(maybeGroupDTO));
      }
    });
  }
  if (savedState.userPerGroup && typeof savedState.userPerGroup === 'object') {
    state.userPerGroup = savedState.userPerGroup;
  }

  return state;
};

export const localCache: Cache = {
  saveUiState,
  getUiState,
  saveUsers,
  getUsers,
  saveLocale,
  getLocale,
  saveInsightsDatePreset,
  getInsightsDatePreset,
  saveUserGroupsState,
  getUserGroupsState,
};
