import * as mobx from 'mobx';
import { User, UserCache, UserDTO, UserParams } from './entities';
import { RootStore } from './root-store';

export class UserStore {
  usersMap: Map<User['id'], User> = new Map();

  constructor(private _userCache: UserCache, private _stores: RootStore) {
    mobx.makeAutoObservable(this);
    mobx.runInAction(() => {
      this.restoreFromCache();
    });
    mobx.autorun(() => {
      this.saveToCache();
    });
  }

  restoreFromCache() {
    this.usersMap = new Map(
      this._userCache.getUsers().map((user) => [user.id, user])
    );
  }

  saveToCache() {
    this._userCache.saveUsers(this.toArray());
  }

  get(userId: string | number | undefined | null): User | undefined {
    return userId == null ? undefined : this.usersMap.get('' + userId);
  }

  map<T>(mapper: (user: User, userId: User['id']) => T): T[] {
    const users: T[] = [];
    for (const user of this.usersMap.values()) {
      users.push(mapper(user, user.id));
    }
    return users;
  }

  filter(filter: (user: User, userId: User['id']) => boolean): User[] {
    const users: User[] = [];
    for (const user of this.usersMap.values()) {
      if (filter(user, user.id)) {
        users.push(user);
      }
    }
    return users;
  }

  toArray(): User[] {
    return this.map((user) => user);
  }

  addUser(userDTO: UserDTO): User {
    let user: User;
    const userId = '' + userDTO.id;
    const oldUser = this.usersMap.get(userId);

    if (oldUser) {
      user = new User({
        ...userDTO,
        addedAt: oldUser.addedAt,
        customName: oldUser.customName,
      });
      this.usersMap.set(user.id, user);
    } else {
      user = new User(userDTO);
      this.usersMap = new Map([
        [user.id, user],
        ...this.map<[User['id'], User]>((user) => [user.id, user]),
      ]);
    }

    return user;
  }

  updateUser(
    userId: User['id'],
    params: UserParams
  ): [isUpdated: true, user: User] | [isUpdated: false, user: undefined] {
    const user = this.get(userId);
    if (!user) {
      return [false, user];
    }

    user.customName = params.customName;
    this.usersMap.set(user.id, user);

    if (params.groupId) {
      this._stores.userGroupStore.addUsersToGroup(params.groupId, [user.id]);
    } else {
      this._stores.userGroupStore.deleteUsersFromAnyGroup([user.id]);
    }

    return [true, user];
  }

  deleteUser(userId: User['id']): boolean {
    const isDeleted = this.usersMap.delete(userId);
    if (isDeleted && userId === this._stores.sessionStore.authenticatedUserId) {
      this._stores.sessionStore.resetAuth();
    }
    return isDeleted;
  }
}
