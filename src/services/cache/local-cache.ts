import { Locale } from '../../types';
import { LOCAL_STORAGE_KEYS, DEFAULT_LOCALE } from '../../constants';
import { UiCache, UiState } from '../../stores/ui-store';
import { User, UserCache } from '../../stores/user-store';
import { SessionCache } from '../../stores/session-store';

export class LocalCache implements UiCache, UserCache, SessionCache {
  saveUiState(uiState: UiState): void {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.uiState,
      JSON.stringify(uiState)
    );
  }

  getUiState(): UiState {
    const uiState = new UiState();
    try {
      const uiStateJson = window.localStorage.getItem(
        LOCAL_STORAGE_KEYS.uiState
      );

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
  }

  saveUsers(users: User[]) {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.users,
      JSON.stringify(users)
    );
  }

  getUsers(): User[] {
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
  }

  saveLocale(locale: Locale) {
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.locale, locale);
  }

  getLocale(): Locale {
    const savedLocale = window.localStorage.getItem(LOCAL_STORAGE_KEYS.locale);
    const isLocaleValid = (locale: any): locale is Locale => {
      return Object.values(Locale).includes(locale);
    };

    if (isLocaleValid(savedLocale)) {
      return savedLocale;
    }

    return DEFAULT_LOCALE;
  }
}
