import * as mobx from 'mobx';
import { RootStore } from './root-store';

export interface UserApi {
  getUserRelatedToAccessToken(accessToken: string): Promise<User>;
}

export interface UserCache {
  saveUsers(users: User[]): void;
  getUsers(): User[];
}

export class User {
  accessToken: string;
  id: string;
  name: string;
  pictureUrl?: string;
  customName?: string;
  addedAt: Date;

  constructor(data: {
    accessToken: string;
    id: string | number;
    name: string;
    pictureUrl?: string;
    customName?: string;
    addedAt: Date | string;
  }) {
    mobx.makeAutoObservable(this, {
      id: false,
    });
    this.accessToken = data.accessToken;
    this.id = String(data.id);
    this.name = data.name;
    this.pictureUrl = data.pictureUrl || '';
    this.customName = data.customName || '';
    this.addedAt = new Date(data.addedAt);
  }

  get displayedName() {
    return this.customName || this.name;
  }
}

export class UserStore {
  users: User[] = [];
  searchQuery: string = '';

  constructor(private _cache: UserCache, private _stores: RootStore) {
    mobx.makeAutoObservable(this);
    mobx.runInAction(() => {
      this.users = this._cache.getUsers();
    });
    mobx.autorun(() => {
      this._cache.saveUsers(this.users);
    });
  }

  setSearchQuery(searchQuery: string): void {
    this.searchQuery = searchQuery;
  }

  getUserById(userId: User['id']): User | undefined {
    return this.users.find((user) => user.id === userId);
  }

  addUser(newUser: User) {
    const index = this.users.findIndex((user) => user.id === newUser.id);
    if (~index) {
      const { customName, addedAt, ...userData } = newUser;
      Object.assign(this.users[index], userData);
    } else {
      this.users = [newUser, ...this.users];
    }
  }

  updateUser(userId: User['id'], update: Partial<User>) {
    this.users.forEach((user) => {
      if (user.id === userId) {
        Object.assign(user, update);
      }
    });
  }

  deleteUser(id: User['id']) {
    this.users = this.users.filter((oldUser) => oldUser.id !== id);
    if (id === this._stores.sessionStore.authenticatedUserId) {
      this._stores.sessionStore.resetAuth();
    }
  }
}
