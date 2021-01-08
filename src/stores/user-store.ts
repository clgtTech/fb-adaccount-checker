import * as mobx from 'mobx';

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

  constructor(private _cache: UserCache) {
    mobx.makeAutoObservable(this);
    mobx.runInAction(() => {
      this.users = this._cache.getUsers();
    });
    mobx.autorun(() => {
      this._cache.saveUsers(this.users);
    });
  }

  get numberOfUsers() {
    return this.users.length;
  }

  get filteredUsers() {
    const query = this.searchQuery.toLowerCase();
    return this.users.filter((user) => {
      return user.displayedName.toLowerCase().includes(query);
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
      this.users.unshift(newUser);
    }
  }

  updateUser(userId: User['id'], update: { customName: string }) {
    this.users.forEach((user) => {
      if (user.id === userId) {
        Object.assign(user, update);
      }
    });
  }

  deleteUser(id: User['id']) {
    this.users = this.users.filter((oldUser) => oldUser.id !== id);
  }
}
