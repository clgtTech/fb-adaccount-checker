import * as mobx from 'mobx';
import { Task } from '../../types';
import { Ad } from './ad';

export class Page {
  readonly id: string;
  readonly accessToken: string;
  readonly name: string;
  readonly tasks: Task[];

  constructor(page: PageDTO) {
    this.id = '' + page.id;
    this.accessToken = page.accessToken;
    this.name = page.name;
    this.tasks = Array.isArray(page.tasks) ? page.tasks : [];
  }
}

export class User {
  id: string;
  accessToken: string;
  name: string;
  addedAt: Date;
  pictureUrl?: string;
  customName?: string;
  pages: Map<Page['id'], Page>;

  constructor(user: UserDTO) {
    mobx.makeAutoObservable(this);
    this.id = '' + user.id;
    this.accessToken = user.accessToken;
    this.name = user.name;
    this.addedAt = new Date(user.addedAt);
    this.pictureUrl = user.pictureUrl ?? undefined;
    this.customName = user.customName ?? undefined;
    this.pages = new Map(
      Array.isArray(user.pages)
        ? user.pages.map((pageDTO) => {
            const page = new Page(pageDTO);
            return [page.id, page];
          })
        : []
    );
  }

  get displayedName() {
    return this.customName || this.name;
  }

  serialize() {
    return {
      id: this.id,
      accessToken: this.accessToken,
      name: this.name,
      addedAt: this.addedAt,
      pictureUrl: this.pictureUrl ?? '',
      customName: this.customName ?? '',
    };
  }

  canModerateAdComments(ad: Ad): boolean {
    const pageId = ad.creative?.pageId;
    if (!pageId) {
      return false;
    }

    const page = this.pages.get(pageId);
    if (!page) {
      return false;
    }

    return page.tasks.includes(Task.MODERATE);
  }
}

export interface UserCache {
  saveUsers(users: User[]): void;
  getUsers(): User[];
}

export interface UserApi {
  getUserRelatedToAccessToken(accessToken: string): Promise<UserDTO>;
}

export interface UserDTO {
  id: string | number;
  accessToken: string;
  name: string;
  addedAt: Date | string | number;
  pictureUrl?: string | null;
  customName?: string | null;
  pages?: PageDTO[];
}

export interface PageDTO {
  id: string | number;
  name: string;
  accessToken: string;
  tasks?: Task[];
}
