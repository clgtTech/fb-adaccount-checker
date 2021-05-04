import * as mobx from 'mobx';
import parseJSON from 'date-fns/parseJSON';
import { Task } from '../../types';
import { Ad } from './ad';
import { EntityGroup } from './entity-group';

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
    this.addedAt = parseJSON(user.addedAt);
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

  get pageAccessTokens(): Map<string, string> {
    const pageTokens = new Map();
    for (const page of this.pages.values()) {
      pageTokens.set(page.id, page.accessToken);
    }
    return pageTokens;
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

  canViewAdComments(ad: Ad): boolean {
    if (ad.creative && ad.creative.pageId && ad.creative.postId) {
      return !!this.pages.get(ad.creative.pageId)?.accessToken;
    }
    return false;
  }

  canModerateAdComments(ad: Ad): boolean {
    const creative = ad.creative;
    if (creative && creative.pageId && creative.postId) {
      return !!this.pages.get(creative.pageId)?.tasks?.includes(Task.MODERATE);
    }
    return false;
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

export interface UserParams {
  customName: string;
  groupId?: EntityGroup['id'];
}
