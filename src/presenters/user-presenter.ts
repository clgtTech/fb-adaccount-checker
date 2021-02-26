import formatISO from 'date-fns/formatISO';
import { User } from '../stores/entities';
import { Formatters } from '../services/intl';

export class UserPresenter {
  id: string;
  name: string;
  initials: string;
  addedAt: string;
  addedAtISO: string;
  pictureUrl?: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.displayedName;
    this.initials = UserPresenter.getInitialsFromName(user.displayedName);
    this.addedAt = Formatters.formatShortDate(user.addedAt);
    this.addedAtISO = formatISO(user.addedAt);
    this.pictureUrl = user.pictureUrl;
  }

  static getInitialsFromName(name: string): string {
    return name
      .split(/ +/)
      .slice(0, 2)
      .map((word) => {
        const firstChar = word?.[0];
        return firstChar ? firstChar.toUpperCase() : '';
      })
      .join('');
  }
}
