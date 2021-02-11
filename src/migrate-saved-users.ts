import { LOCAL_STORAGE_KEYS } from './constants';

export function migrateSavedUsers() {
  try {
    const savedUsersJson = localStorage.getItem('FbAdAccountChecker:Users');
    const savedUsers = JSON.parse(savedUsersJson ?? '');

    if (Array.isArray(savedUsers)) {
      const users = [];
      for (const savedUser of savedUsers) {
        if (
          savedUser &&
          /^\d+$/.test('' + savedUser.id) &&
          savedUser.accessToken &&
          savedUser.name
        ) {
          users.push({
            id: savedUser.id,
            accessToken: savedUser.accessToken,
            addedAt: new Date(),
            name: savedUser.name,
            customName: '',
            pictureUrl: savedUser.pictureUrl || '',
          });
        }
      }

      localStorage.setItem(LOCAL_STORAGE_KEYS.users, JSON.stringify(users));
      localStorage.removeItem('FbAdAccountChecker:UserCustomNames');
      localStorage.removeItem('FbAdAccountChecker:shouldShowHiddenComments');
      localStorage.removeItem('FbAdAccountChecker:Users');
    }
  } catch (e) {
    console.log(`Failed to migrate saved users: ${e.message}`);
  }
}

migrateSavedUsers();
