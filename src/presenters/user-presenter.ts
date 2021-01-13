import { User } from '../stores/user-store';
import { Formatters } from '../services/intl';

export class UserPresenter {
  id: string;
  name: string;
  initials: string;
  addedAt: string;
  pictureUrl?: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.displayedName;
    this.initials = UserPresenter.getInitialsFromName(user.displayedName);
    this.addedAt = Formatters.formatShortDate(user.addedAt);
    this.pictureUrl = user.pictureUrl;
  }

  static getInitialsFromName(name: string): string {
    return name
      .split(/ +/)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join('');
  }
}
