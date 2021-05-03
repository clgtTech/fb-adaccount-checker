import * as mobx from 'mobx';
import omitBy from 'lodash/omitBy';
import { User, EntityGroup, EntityGroupParams } from './entities';
import { RootStore } from './root-store';
import { uniqueId } from 'draft-components';

export class UserGroupsStore {
  groupsMap: Map<EntityGroup['id'], EntityGroup> = new Map();
  userPerGroup: Record<User['id'], EntityGroup['id']> = {};

  constructor(private _cache: UserGroupsCache, private _stores: RootStore) {
    mobx.makeAutoObservable(this);
    mobx.runInAction(() => {
      this.restoreFromCache();
    });
    mobx.autorun(() => {
      this.saveToCache();
    });
  }

  saveToCache() {
    this._cache.saveUserGroupsState({
      groups: this.toArray(),
      userPerGroup: this.userPerGroup,
    });
  }

  restoreFromCache() {
    const state = this._cache.getUserGroupsState();
    this.groupsMap = state.groups.reduce(
      (groupsMap, group) => groupsMap.set(group.id, group),
      new Map()
    );
    this.userPerGroup = state.userPerGroup;
  }

  addGroup(params: EntityGroupParams): EntityGroup {
    const newGroup = new EntityGroup({
      id: uniqueId('user-group-'),
      name: params.name,
      color: params.color,
      createdAt: new Date(),
    });
    this.groupsMap = new Map([
      [newGroup.id, newGroup],
      ...Array.from(this.groupsMap),
    ]);
    return newGroup;
  }

  updateGroup(
    groupId: EntityGroup['id'],
    params: Partial<EntityGroupParams>
  ):
    | [isUpdated: true, group: EntityGroup]
    | [isUpdated: false, group: undefined] {
    const group = this.get(groupId);
    if (group) {
      this.groupsMap.set(group.id, { ...group, ...params });
      return [true, group];
    }
    return [false, group];
  }

  deleteGroup(id: EntityGroup['id']): boolean {
    const isDeleted = this.groupsMap.delete(id);
    if (isDeleted) {
      this.userPerGroup = omitBy(
        this.userPerGroup,
        (groupId) => groupId === id
      );
    }
    return isDeleted;
  }

  addUsersToGroup(
    groupId: EntityGroup['id'],
    userIds: User['id'][]
  ):
    | [wereAdded: true, group: EntityGroup]
    | [wereAdded: false, group: undefined] {
    const group = this.get(groupId);
    if (group) {
      userIds.forEach((userId) => {
        this.userPerGroup[userId] = group.id;
      });
      return [true, group];
    }
    return [false, group];
  }

  deleteUsersFromGroup(
    groupId: EntityGroup['id'],
    userIds: User['id'][]
  ):
    | [wereDeleted: true, group: EntityGroup]
    | [wereDeleted: false, group: undefined] {
    const group = this.get(groupId);
    if (group) {
      this.userPerGroup = omitBy(this.userPerGroup, (userId) =>
        userIds.includes(userId)
      );
      return [true, group];
    }
    return [false, group];
  }

  get(id: string | undefined | null): EntityGroup | undefined {
    return this.groupsMap.get(id ?? '');
  }

  map<T>(mapper: (user: EntityGroup, groupId: EntityGroup['id']) => T): T[] {
    const groups: T[] = [];
    for (const group of this.groupsMap.values()) {
      groups.push(mapper(group, group.id));
    }
    return groups;
  }

  toArray(): EntityGroup[] {
    return Array.from(this.groupsMap.values());
  }
}

export interface UserGroupsState {
  groups: EntityGroup[];
  userPerGroup: Record<User['id'], EntityGroup['id']>;
}

export interface UserGroupsCache {
  saveUserGroupsState(state: UserGroupsState): void;

  getUserGroupsState(): UserGroupsState;
}
