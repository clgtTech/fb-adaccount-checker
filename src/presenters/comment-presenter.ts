import formatISO from 'date-fns/formatISO';
import { Comment, CommentActor } from '../stores/entities';
import { UserPresenter } from './user-presenter';
import { Formatters } from '../services/intl';

export class CommentActorPresenter {
  id: string;
  name: string;
  initials: string;
  pictureUrl?: string;

  constructor(commentActor: CommentActor) {
    this.id = commentActor.id;
    this.name = commentActor.name;
    this.initials = UserPresenter.getInitialsFromName(commentActor.name);
    this.pictureUrl = commentActor.pictureUrl;
  }
}

export class CommentPresenter {
  id: string;
  message: string;
  createdTime: string;
  createdTimeISO: string;
  actor: CommentActorPresenter;

  constructor(comment: Comment) {
    this.id = comment.id;
    this.message = comment.message;
    this.createdTime = Formatters.formatDateTime(comment.createdTime);
    this.createdTimeISO = formatISO(comment.createdTime);
    this.actor = new CommentActorPresenter(comment.actor);
  }
}
